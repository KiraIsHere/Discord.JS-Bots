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
			description: `Random neko picture`,
			usage: ``,
			aliases: []
		});
	}

	async run(client, message) {
		client.send(message, { files: [await get(`http://nekos.life/api/neko`).body.neko] });
		return true;
	}
}

module.exports = Command;
