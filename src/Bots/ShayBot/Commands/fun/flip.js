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
			description: `Flip a coin`,
			usage: ``,
			aliases: [`coin`]
		});
	}

	run(client, message) {
		client.send(message, Math.random() < 0.5 ? `Tails` : `Heads`);
		return true;
	}
}

module.exports = Command;
