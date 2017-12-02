const Commands = require(`../../Structures/Commands`);

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
			description: `Lists all emojis`,
			usage: ``,
			aliases: [`emotes`]
		});
	}

	run(client, message) {
		client.send(message, client.emojis.map(e => e).join(` `), { split: { char: ` ` } });
		return true;
	}
}

module.exports = Command;
