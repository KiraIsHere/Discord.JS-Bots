const Commands = require(`../../../../__Global/Structures/Commands`)

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
			description: `Converts the text into a lmgtfu URL`,
			usage: `[Text]`,
			aliases: [`lmgtfu`]
		})
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this)

		message.channel.send(`<http://lmgtfy.com/?q=${args.join(`+`)}>`)
		return true
	}
}

module.exports = Command
