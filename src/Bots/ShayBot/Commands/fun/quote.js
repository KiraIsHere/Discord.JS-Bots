const Commands = require(`../../../../__Global/Structures/Commands`);
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
			description: `Quotes a message`,
			usage: `[MessageID] [ChannelID]`,
			aliases: [`q`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		const messageID = args[0];
		const channelID = args[1] ? args[1] : message.channel.id;

		client.channels.get(channelID).messages.fetch(messageID).then(quote => {
			message.channel.send(new MessageEmbed()
				.setAuthor(quote.author.username, quote.author.displayAvatarURL())
				.addField(`Message: `, quote.content)
				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp()
			);
		});
		return true;
	}
}

module.exports = Command;
