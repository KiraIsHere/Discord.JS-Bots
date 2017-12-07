const Commands = require(`../../Structures/Commands`);
const { inspect } = require(`util`);
const { VM } = require(`vm2`);

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
			description: `Evaluates javascript code`,
			usage: `[Code]`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id) && client.whitelist.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, this);
		let content = await this.addToContent(client, args.join(` `), `Input`);
		try {
			let evaled;

			if (client.ownerIDs.includes(message.author.id)) {
				evaled = eval(args.join(` `));
			} else if ((client.user.id === `361541917672210433` || client.user.id === `361542082080407553`) && client.whitelist.includes(message.author.id)) {
				evaled = new VM().run(args.join(` `));
			} else {
				client.send(message, `Sorry, you do not have permission for this command`);
			}

			if (evaled instanceof Promise) evaled = await evaled;
			if (evaled instanceof Object || evaled instanceof Function) evaled = inspect(evaled, { showHidden: true, showProxy: true, depth: 0 });

			content += await this.addToContent(client, evaled, `Output`);
		} catch (error) {
			content += await this.addToContent(client, error, `Error`);
		}
		client.send(message, content);
		return true;
	}

	addToContent(client, input, type) {
		return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n${String(input).length < 1024 ? `\`\`\`js\n${client.clean(input)}\n\`\`\`\n` : `${client.haste(client.clean(input))}.js`}`;
	}
}

module.exports = Command;
