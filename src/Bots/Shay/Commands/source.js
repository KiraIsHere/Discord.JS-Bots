const Commands = require(`../../../__Global/Structures/Commands`);
const { homepage } = require(`../../../../package.json`);
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
			description: `Shows GitHub Repo URL`,
			usage: `Source`,
			aliases: [`repo`, `github`]
		});
	}

	run(client, message) {
		client.send(message, `<${homepage}>`);
	}
}

module.exports = Command;
