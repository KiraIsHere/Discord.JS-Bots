const Commands = require(`../../../../__Global/Structures/Commands`);
const { get } = require(`snekfetch`);
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
			description: `Dog facts`,
			usage: ``,
			aliases: [`dogfacts`]
		});
	}

	run(client, message) {
		get(`https://dog-api.kinduff.com/api/facts`).then(data => {
			client.send(message, data.body.facts[0]);
		});
		return true;
	}
}

module.exports = Command;
