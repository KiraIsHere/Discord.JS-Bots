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
			description: `Dog facts`,
			usage: ``,
			aliases: [`dogfacts`]
		});
	}

	async run(client, message) {
		message.channel.send(await get(`https://dog-api.kinduff.com/api/facts`).body.facts[0]);
		return true;
	}
}

module.exports = Command;
