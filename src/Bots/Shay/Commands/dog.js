const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
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
			usage: `Dog`,
			aliases: []
		});
	}

	run(client, message) {
		get(`https://random.dog/woof`).then(data => {
			const embed = new MessageEmbed()
				.setImage(`http://random.dog/${data.text}`);
			client.send(message, { embed });
		});
		return true;
	}
}

module.exports = Command;
