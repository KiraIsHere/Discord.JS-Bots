const ObjectAutocorrect = require(`object-autocorrect`);
const Commands = require(`../../Structures/Commands`);
const { basename } = require(`path`);
const { post } = require(`snekfetch`);
const { inspect } = require(`util`);

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

	async run(_client, message, args) {
		const client = new ObjectAutocorrect(_client);
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, client.usage);

		let content = await this.addToContent(client, args.join(` `), `Input`);
		try {
			let evaled = eval(args.join(` `));
			if (evaled instanceof Promise) evaled = await evaled;
			if (evaled instanceof Object || evaled instanceof Function) evaled = inspect(evaled, { showHidden: true, showProxy: true, depth: 100 });

			content += await this.addToContent(client, client.clean(evaled), `Output`);
		} catch (error) {
			content += await this.addToContent(client, error, `Error`);
		}
		client.send(message, content);
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
