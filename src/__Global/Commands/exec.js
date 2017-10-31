const Commands = require(`../Structures/Commands`);
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
			description: `Executes bash/batch commands`,
			usage: `[Command]`,
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
			post(`https://developer.github.com/v3/gists/`)
				.set(`Authorization`, process.env.GITHUB_API)
				.send({
					description: `EXEC Output`,
					public: true,
					files: { "EXEC.md": { content: `\`\`\`js\n${input}\n\`\`\`` } }
				});
		}
		console.error(input);
		return `Error, failed to create paste`;
	}
}

module.exports = Command;
