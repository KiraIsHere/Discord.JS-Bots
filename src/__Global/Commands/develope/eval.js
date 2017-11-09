const ObjectAutocorrect = require(`object-autocorrect`);
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
			let content = await this.addToContent(client, args.join(` `), `Input`);
			try {
				let evaled;
				const _client = client;
				const _message = message;
				client = new ObjectAutocorrect(client);
				message = new ObjectAutocorrect(message);
				
				if (client.ownerIDs.includes(message.author.id)) {
					evaled = eval(args.join(` `));
				} else if ((client.user.id === `361541917672210433` || client.user.id === `361542082080407553`) && client.whitelist.includes(message.author.id)) {
					evaled = new VM().run(args.join(` `));
				} else {
					client.send(message, `Sorry, you do not have permission for this command`);
				}
				
				if (typeof evaled.getTarget === 'function') evaled = evaled.getTarget();

				if (evaled instanceof Promise) evaled = await evaled;
				if (evaled instanceof Object || evaled instanceof Function) evaled = inspect(evaled, { showHidden: true, showProxy: true, depth: 0 });

				content += await this.addToContent(client, client.clean(evaled), `Output`);
			} catch (error) {
				console.log(`1`);
				content += await this.addToContent(client, error, `Error`);
			}
			client.send(message, content);
		} else {
			client.send(message, `Sorry, you do not have permission for this command`);
		}
		return true;
	}

	async addToContent(client, input, type) {
		let returnValue;
		if (String(input).length < 1024) {
			return `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n\`\`\`js\n${input}\n\`\`\`\n`;
		} else {
			await post(`https://www.hastebin.com/documents`)
				.send(String(input))
				.then(data => {
					console.log(data);
					returnValue = `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\nhttps://www.hastebin.com/${data.body.key}.js`;
				})
				.catch(error => {
					console.error(error);
					returnValue = `${type === `Input` ? `📥` : type === `Output` ? `📤` : `❌`} ${type}\n\`\`\`js\n${error}\n\`\`\`\n`;
				});
		}
		return returnValue;
	}
}

module.exports = Command;
