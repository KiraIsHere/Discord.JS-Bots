const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { basename } = require(`path`);
const PastebinAPI = require(`pastebin-js`);
const pastebin = new PastebinAPI(process.env.PASTEBIN_API);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			description: `Evaluates javascript code`,
			usage: `Eval [Code]`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, client.usage);

		let embed = new MessageEmbed()
			.setFooter(client.botName)
			.setTimestamp();

		if (args.join(` `).length < 1024) {
			embed.addField(`📥 Input`, `\`\`\`js\n${args.join(` `)}\n\`\`\``);
		} else {
			pastebin.createPaste(args.join(` `), `Input`, null, 1, `1D`).then(data => {
				embed.addField(`❌ Error`, `Input was too long, ${data}`);
			}).fail(error => {
				client.error(error);
				client.send(message, `Pastebin Upload`);
			});
		}

		try {
			const evaled = await client.clean(eval(args.join(` `)));

			embed.setColor(0x00FF00);

			if (evaled.length < 1024) {
				embed.addField(`📤 Output`, `\`\`\`js\n${evaled}\n\`\`\``);
			} else {
				pastebin.createPaste(args.join(` `), `Output`, null, 1, `1D`).then(data => {
					embed.addField(`❌ Error`, `Output was too long, ${data}`);
				}).fail(error => {
					client.error(error);
					embed.addField(`❌ Error`, `Pastebin upload error, ${error}`);
				});
			}
		} catch (error) {
			embed.setColor(0xFF0000);

			if (String(error).length < 1024) {
				embed.addField(`❌ Error`, `\`\`\`js\n${error}\n\`\`\``);
			} else {
				pastebin.createPaste(error, `Error`, null, 1, `1D`).then(data => {
					embed.addField(`❌ Error`, `Error was too long, ${data}`);
				}).fail(error => {
					client.error(error);
					embed.addField(`❌ Error`, `Pastebin upload error, ${error}`);
				});
			}
		}
		client.send(message, { embed });
		return true;
	}
}

module.exports = Command;
