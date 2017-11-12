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
			description: `Roll the dice`,
			usage: ``,
			aliases: [`dice`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.send(message, `You didn't specify how many sides`);
		client.send(message, Math.floor(Math.random() * parseInt(args[0])));
		return true;
	}
}

module.exports = Command;
