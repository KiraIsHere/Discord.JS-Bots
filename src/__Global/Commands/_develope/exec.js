const Commands = require(`../../Structures/Commands`);
const { exec } = require(`child_process`);
const { basename } = require(`path`);
const { post } = require(`snekfetch`);

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
			group: basename(__dirname, `.js`),
			description: `Executes bash/batch commands`,
			usage: `[Command]`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, this);

		let content = await this.addToContent(args.join(` `), `Input`);
		exec(args.join(` `), { cwd: `../../` }, async (error, stdout, stderr) => {
			if (stderr) {
				content += await this.addToContent(stderr, `Error`);
			} else if (error) {
				content += await this.addToContent(error, `Error`);
			} else {
				content += await this.addToContent(stdout, `Output`);
			}
			client.send(message, content);
		});
		return true;
	}

	addToContent(input, type) {
		return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n${this.checkSize(input)}`;
	}

	checkSize(input) {
		if (String(input).length < 1024) {
			return `\`\`\`js\n${input}\n\`\`\`\n`;
		} else {
			return post(`https://www.hastebin.com/documents`).send(String(input))
				.then(data => `https://www.hastebin.com/${data.body.key}.js`)
				.catch(error => `\`\`\`js\n${error}\n\`\`\`\n`);
		}
	}
}

module.exports = Command;
