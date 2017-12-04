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
			description: `Random lewd neko picture`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		if (!message.channel.nsfw) return client.send(message, `Must use in a NSFW channel`);
		get(`http://nekos.life/api/lewd/neko`).then(data => {
			client.send(message, { files: [data.body.neko] });
		});
		return true;
	}
}

module.exports = Command;
