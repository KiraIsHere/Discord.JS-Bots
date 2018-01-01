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
			description: `Random picture of butts`,
			usage: ``,
			aliases: [`butt`]
		})
	}

	run(client, message) {
		if (!message.channel.nsfw) return message.channel.send(`Must use in a NSFW channel`)
		get(`http://api.obutts.ru/butts/0/1/random`).then(data => {
			message.channel.send({ files: [`http://media.obutts.ru/${data.body[0].preview}`] })
		})
		return true
	}
}

module.exports = Command
