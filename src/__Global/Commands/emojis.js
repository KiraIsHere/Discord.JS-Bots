const Commands = require(`../Structures/Commands`);
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
			description: `Lists all emojis`,
			usage: `Emojis`,
			aliases: [`emotes`]
		});
	}

	run(client, message) {
		console.log(client.emojis.map(c => c.toString()).join(` | `).length);
		client.send(message, client.emojis.map(c => c.toString()).join(` `), { split: { char: ` ` } });
	}
}

module.exports = Command;
