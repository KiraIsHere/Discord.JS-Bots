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

	run(client, message) {
		get(`http://nekos.life/api/neko`).then(data => client.send(message, { files: [data.body.neko] }));
		return true;
	}
}

module.exports = Command;
