const Commands = require(`../../../../__Global/Structures/Commands`)
const { get } = require(`snekfetch`)

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
			description: `Cat facts`,
			usage: ``,
			aliases: [`catfacts`]
		})
	}

	async run(client, message) {
		message.channel.send(await get(`https://catfact.ninja/fact`).body.fact)
		return true
	}
}

module.exports = Command
