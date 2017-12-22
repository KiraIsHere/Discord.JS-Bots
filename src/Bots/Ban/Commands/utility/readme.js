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
			description: `Use this command`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		message.channel.send(`If you are seeing this the bot fucked up.`);
		return true;
	}
}

module.exports = Command;
