const Commands = require(`../../Structures/Commands`)
const { MessageEmbed } = require(`discord.js`)

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
			description: `Responds message and heartbeat ping`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message) {
		if (!client.user.bot) message.delete({ timeout: 500 })

		message.channel.send(`Loading...`).then(sent => {
			sent.edit(``, new MessageEmbed()
				.addField(`Heartbeat`, `${Math.round(client.ping)}ms`, true)
				.addField(`Message`, `${Math.round(sent.createdTimestamp - message.createdTimestamp)}ms`, true)
				.setColor(0x00FFFF)
				.setFooter(client.botName)
				.setTimestamp()
			)
		})
		return true
	}
}

module.exports = Command
