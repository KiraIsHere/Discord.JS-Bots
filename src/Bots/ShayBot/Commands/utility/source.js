const Commands = require(`../../../../__Global/Structures/Commands`);
const { homepage } = require(`../../../../../package.json`);

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
			description: `Shows GitHub Repo URL`,
			usage: ``,
			aliases: [`repo`, `github`]
		});
	}

	run(client, message) {
		message.channel.send(`<${homepage}>`);
		return true;
	}
}

module.exports = Command;
