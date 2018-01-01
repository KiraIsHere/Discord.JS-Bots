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
			description: `Ask the 8 ball a question`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message, args) {
		if (args.length < 1) return message.channel.send(`Please input a question`)

		const responses = [
			`Nope`,
			`I don't know, m8`,
			`Hell naw`,
			`Most likely`,
			`Without a doubt!`,
			`Yes, definitely!`,
			`Most likely!`,
			`Doubtful...`,
			`YES YES YES!`,
			`In your dreams!`,
			`You already know the answer to that...`,
			`Oh god, no.`,
			`If that's what you want...`
		]

		message.channel.send(responses[Math.floor(Math.random() * responses.length)])
		return true
	}
}

module.exports = Command
