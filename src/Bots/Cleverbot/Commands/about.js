const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
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
			description: `Information about me`,
			usage: `About`,
			aliases: []
		});
	}

	run(client, message) {
		if (message.channel.name.includes(`cleverbot`)) return;
		const embed = new MessageEmbed()
			.setTitle(`About`)
			.setDescription(
				`Hello, I am Cleverbot!\n` +
				`I was created by **Shayne Hartford (ShayBox)**.\n` +
				`To use me, create a channel with "cleverbot" in the name and start talking 😄\n` +
				`Please donate to increase our calls, All donations go twords buying more!\n` +
				`<htps://paypal.me/hydarbolt>`
			)
			.setColor(0x00FF00)
			.setFooter(client.botName)
			.setTimestamp();
		client.send(message, { embed });
	}
}

module.exports = Command;
