const Commands = require(`../../../../__Global/Structures/Commands`);
const { get } = require(`snekfetch`);

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
			description: `Random cat picture`,
			usage: ``,
			aliases: []
		});
	}

	async run(client, message) {
		message.channel.send({ files: [await get(`http://random.cat/meow`).body.file] });
		return true;
	}
}

module.exports = Command;
