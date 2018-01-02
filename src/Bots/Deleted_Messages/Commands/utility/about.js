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
			description: `What the bot does`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message) {
		message.channel.send(`I re-send any deleted messages I have read & send permissions in.`)
		return true
	}
}

module.exports = Command
