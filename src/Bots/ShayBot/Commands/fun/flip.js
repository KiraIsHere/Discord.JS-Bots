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
			description: `Flip a coin`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.send(message, Math.random() < 0.5 ? `Tails` : `Heads`);
		return true;
	}
}

module.exports = Command;
