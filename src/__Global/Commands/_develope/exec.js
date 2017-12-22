const Commands = require(`../../Structures/Commands`);
const { exec } = require(`child_process`);

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
			description: `Executes bash/batch commands`,
			usage: `[Command]`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return message.channel.send(`Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, this);

		let content = await this.addToContent(client, args.join(` `), `Input`);
		exec(args.join(` `), { cwd: `../../` }, async (error, stdout, stderr) => {
			if (stderr) {
				content += await this.addToContent(client, stderr, `Error`);
			} else if (error) {
				content += await this.addToContent(client, error, `Error`);
			} else {
				content += await this.addToContent(client, stdout, `Output`);
			}
			message.channel.send(content);
		});
		return true;
	}

	addToContent(client, input, type) {
		return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n${String(input).length < 1024 ? `\`\`\`js\n${client.clean(input)}\n\`\`\`\n` : client.haste(client.clean(input))}`;
	}
}

module.exports = Command;
