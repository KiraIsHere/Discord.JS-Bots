const Commands = require(`../Structures/Commands`);
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
			usage: `[Code]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, client.usage);

		let content = this.addToContent(client, args.join(` `), `Input`);
		try {
			const evaled = client.clean(eval(args.join(` `)));

			content += this.addToContent(client, evaled, `Output`);
		} catch (error) {
			content += this.addToContent(client, error, `Error`);
		}
		client.send(message, content);
		return true;
	}

	addToContent(client, input, type) {
		if (input.length < 1024) {
			return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n\`\`\`js\n${input}\n\`\`\`\n`;
		} else {
			pastebin.createPaste(input, type, null, 1, `1D`).then(data => `❌ Error\nOutput was too long, ${data}`).fail(error => {
				console.error(error);
				return `❌ Error\nPastebin upload error, ${error}`;
			});
		}
		console.error(input);
		return `Error, failed to create paste`;
	}
}

module.exports = Command;
