const Commands = require(`../../../../__Global/Structures/Commands`);
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
			group: basename(__dirname, `.js`),
			description: `Shows support message`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.send(message, new MessageEmbed()
			.setTitle(`Thank you for inviting me to your server!`)
			.setDescription(`` +
				`**Note:**\n` +
				`\`You must set the color of every role to "Default" for me to work!\`\n` +
				`\`If you would like more support join my discord\` https://discord.io/shaybox`
			)
		);
		return true;
	}
}

module.exports = Command;
