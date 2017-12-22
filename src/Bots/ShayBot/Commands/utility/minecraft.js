const Commands = require(`../../../../__Global/Structures/Commands`);
const { username } = require(`mojang`);
const { MessageEmbed } = require(`discord.js`);

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
			description: `Player info`,
			usage: `[Name]`,
			aliases: [`mc`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		if (args[0] < 3 || args[0] > 32) return message.channel.send(`Please input valid name`);

		username(args[0]).then(data => {
			message.channel.send(new MessageEmbed()
				.setAuthor(`${data.name} (UUID: ${data.id})`, `https://visage.surgeplay.com/face/${data.id}`)
				.setImage(`https://visage.surgeplay.com/full/512/${data.id}`)
				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp()
			);
		}).catch(() => message.channel.send(`Invalid name, Please input valid name`));
		return true;
	}
}

module.exports = Command;
