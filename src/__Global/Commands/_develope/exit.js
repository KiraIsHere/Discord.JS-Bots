const Commands = require(`../../Structures/Commands`)

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Runs process.exit()`,
			usage: ``,
			aliases: [`process.exit()`, `exit`, `restart`]
		})
	}

	run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) return message.channel.send(`Sorry, you do not have permission for this command`)
		process.exit()
		return true
	}
}

module.exports = Command
