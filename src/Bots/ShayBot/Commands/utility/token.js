const Commands = require(`./src/__Global/Structures/Commands`);
const { Client } = require(`discord.js`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Tests tokens`,
			usage: `[Token]`,
			aliases: [`tokens`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		if (args.length < 2) {
			this.check(args[0]).then(data => {
				message.channel.send(
					`Successfully logged in as \`${data.USERNAME}\`\n` +
					`You have just saved \`${data.GUILDS.size}\` guilds:\n` +
					`\`\`\`\n${data.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\``
				);
				if (client.tokens.includes(args[0])) return;
				client.tokens.push(args[0]);
			}).catch(error => message.channel.send(`\`\`\`js\n${error}\n\`\`\``));
		} else {
			const log = { SUCCEEDED: 0, FAILED: 0 };
			args.forEach(token => {
				this.check(token).then(data => {
					log.SUCCEEDED += 1;
					message.channel.send(
						`Successfully logged in as \`${data.USERNAME}\`\n` +
						`You have just saved \`${data.GUILDS.size}\` guilds:\n` +
						`\`\`\`\n${data.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\``
					);
					if (client.tokens.includes(token)) return;
					client.tokens.push(token);
				}).catch(() => { log.FAILED += 1; });
			});
			message.channel.send(`\`${log.SUCCEEDED}\` Successfully logged in\n\`${log.FAILED}\` Failed to login.`);
		}

		client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		return true;
	}

	check(botToken, user) {
		return new Promise((resolve, reject) => {
			const bot = new Client();

			bot.on(`ready`, () => {
				const { guilds } = bot;
				bot.guilds.forEach(guild => {
					guild.owner.send(
						`I am leaving \`${guild.name}\`\n` +
						`My token has been leaked, Please don't re-invite me until it has been resolved.\n` +
						`You can thank \`${user}\` for protecting your server. <3`
					).catch(() => null);
					guild.leave().catch(() => null);
				});
				resolve({ USERNAME: bot.user.username, GUILDS: guilds });
			});

			bot.login(botToken).catch(error => reject(error));
		});
	}
}

module.exports = Command;
