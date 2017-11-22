const Commands = require(`../../Structures/Commands`);
const { basename } = require(`path`);
const { post } = require(`snekfetch`);
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
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Evaluates javascript code`,
			usage: `[Code]`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (client.ownerIDs.includes(message.author.id) || client.whitelist.includes(message.author.id)) {
			if (args.length < 1) return client.missingArgs(message, this);
			let content = await this.addToContent(args.join(` `), `Input`);
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

				content += await this.addToContent(client.clean(evaled), `Output`);
			} catch (error) {
				content += await this.addToContent(error, `Error`);
			}
			client.send(message, content);
		} else {
			client.send(message, `Sorry, you do not have permission for this command`);
		}
		return true;
	}

	async addToContent(input, type) {
		return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n${await this.checkSize(input)}`;
	}

	checkSize(input) {
		if (String(input).length < 1024) {
			return `\`\`\`js\n${input}\n\`\`\`\n`;
		} else {
			return post(`https://www.hastebin.com/documents`).send(String(input))
				.then(data => `https://www.hastebin.com/${data.body.key}.js`)
				.catch(error => `\`\`\`bash\n${error}\n\`\`\`\n`);
		}
	}
}

module.exports = Command;
