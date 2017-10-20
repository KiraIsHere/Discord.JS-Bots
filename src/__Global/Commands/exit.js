const Commands = require(`../Structures/Commands`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownTime: 3,
			name: basename(__filename, `.js`),
			description: `Runs process.exit()`,
			usage: `Exit`,
			aliases: [`process.exit()`]
		});
	}

	run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		process.exit();
	}
}

module.exports = Command;
