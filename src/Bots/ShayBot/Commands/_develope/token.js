const Commands = require(`../../../../__Global/Structures/Commands`);
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

	async run(client, message, args) {
		if (!client.whitelist.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message);

		for (const token of args) {
			await this.check(token, message.author.username).then(data => {
				client.send(message,
					`Successfully logged in as \`${data.USERNAME}\`\n` +
					`You have just saved \`${data.GUILDS.size}\` guilds:\n` +
					`\`\`\`\n${data.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\``
				);
				if (client.tokens.includes(token)) return false;
				client.tokens.push(token);
				return true;
			}).catch(error => {
				client.send(message, error, { code: `` });
			});
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
