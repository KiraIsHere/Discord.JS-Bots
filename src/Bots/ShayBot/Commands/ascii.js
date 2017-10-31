const Commands = require(`../../../__Global/Structures/Commands`);
const asciify = require(`asciify`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			description: `Converts the text to an ascii`,
			usage: `[Text]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		asciify(args.join(` `), `standard`, (error, response) => {
			if (error) return client.send(message, error, { code: `` });

			return client.send(message, response, { code: `` });
		});
		return true;
	}
}

module.exports = Command;
