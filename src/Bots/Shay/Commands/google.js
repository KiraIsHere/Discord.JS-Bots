const Commands = require(`../../../__Global/Structures/Commands`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			name: basename(__filename, `.js`),
			description: `Converts the text into a lmgtfu URL`,
			usage: `Google [Text]`,
			aliases: [`lmgtfu`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		client.send(message, `<http://lmgtfy.com/?q=${args.join(`+`)}>`);
	}
}

module.exports = Command;
