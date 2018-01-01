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
			description: `Random dog picture`,
			usage: ``,
			aliases: []
		})
	}

	async run(client, message) {
		message.channel.send({ files: [`http://random.dog/${await get(`https://random.dog/woof`).text}`] })
		return true
	}
}

module.exports = Command
