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
			description: `Quotes a message`,
			usage: `[MessageID] [ChannelID]`,
			aliases: [`q`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) throw new Error(this.usage);

		const messageID = args[0];
		const channelID = args[1] ? args[1] : message.channel.id;

		client.channels.get(channelID).messages.fetch(messageID).then(quote => {
			const embed = new MessageEmbed()
				.setAuthor(quote.author.username, quote.author.displayAvatarURL())
				.addField(`Message: `, quote.content)
				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp();
			client.send(message, { embed });
		});
		return true;
	}
}

module.exports = Command;
