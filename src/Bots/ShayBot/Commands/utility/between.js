const Commands = require(`../../../../__Global/Structures/Commands`);
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
			group: basename(__dirname, `.js`),
			description: `Random number between min and max`,
			usage: `[Min] [Max]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 2) throw new Error(this.usage);

		client.send(message, Math.round((Math.random() * args[1]) + args[0]), { code: `` });
		return true;
	}
}

module.exports = Command;
