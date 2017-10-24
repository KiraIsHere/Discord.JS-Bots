const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { exec } = require(`child_process`);
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
			description: `Executes bash/batch commands`,
			usage: `Exec [Command]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, client.usage);

		let content = this.addToContent(client, args.join(` `), `Input`);
		exec(args.join(` `), { cwd: `../../` }, (error, stdout, stderr) => {
			if (stderr) {
				content += this.addToContent(client, stderr, `Error`);
			} else if (error) {
				content += this.addToContent(client, error, `Error`);
			} else {
				content += this.addToContent(client, stdout, `Output`);
			}
			client.send(message, content);
		});
		return true;
	}

	addToContent(client, input, type) {
		if (input.length < 1024) {
			return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n\`\`\`js\n${input}\n\`\`\`\n`;
		} else {
			pastebin.createPaste(input, type, null, 1, `1D`).then(data => `❌ Error\nOutput was too long, ${data}`).fail(error => `❌ Error\nPastebin upload error, ${error}`);
		}
		return `Error, failed to create paste`;
	}
}

module.exports = Command;
