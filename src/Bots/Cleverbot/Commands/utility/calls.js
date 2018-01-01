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
			description: `Lists Used API Calls vs Total API Calls`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message) {
		client.database.find({}).then(data => message.channel.send(`${data[0].USED_API_CALLS} / ${data[0].TOTAL_API_CALLS}\n`))
		return true
	}
}

module.exports = Command
