const Commands = require(`../../../../__Global/Structures/Commands`);

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
			description: `Random number between min and max`,
			usage: `[Min] [Max]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 2) return client.missingArgs(message, this);

		message.channel.send(Math.round((Math.random() * args[1]) + args[0]), { code: `` });
		return true;
	}
}

module.exports = Command;
