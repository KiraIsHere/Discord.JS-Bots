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
			description: `Random neko picture`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message) {
		get(`http://nekos.life/api/neko`).then(data => {
			message.channel.send({ files: [data.body.neko] })
		})
		return true
	}
}

module.exports = Command
