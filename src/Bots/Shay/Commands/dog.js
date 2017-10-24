const Commands = require(`../../../__Global/Structures/Commands`);
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
			description: `Random dog picture`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		get(`https://random.dog/woof`).then(data => {
			client.send(message, { files: [`http://random.dog/${data.text}`] });
		});
		return true;
	}
}

module.exports = Command;
