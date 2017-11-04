const Commands = require(`../../../../__Global/Structures/Commands`);
const { homepage } = require(`../../../../../package.json`);
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
			description: `Shows GitHub Repo URL`,
			usage: ``,
			aliases: [`repo`, `github`]
		});
	}

	run(client, message) {
		client.send(message, `<${homepage}>`);
		return true;
	}
}

module.exports = Command;
