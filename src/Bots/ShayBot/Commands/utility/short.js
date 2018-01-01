const Commands = require(`../../../../__Global/Structures/Commands`)
const googl = require(`goo.gl`)
googl.setKey(process.env.GOOGLE_URL_API)

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
			description: `Shortens the URL`,
			usage: `[URL]`,
			aliases: []
		})
	}

	async run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this)

		message.channel.send(await googl.shorten(args[0]))
		return true
	}
}

module.exports = Command
