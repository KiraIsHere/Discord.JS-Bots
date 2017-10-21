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
			description: ``,
			usage: `Command [Required] (Optional)`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);
		// Code
	}
}

module.exports = Command;
