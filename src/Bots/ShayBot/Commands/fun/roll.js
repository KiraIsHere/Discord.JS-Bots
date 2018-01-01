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
			description: `Roll the dice`,
			usage: ``,
			aliases: [`dice`]
		})
	}

	run(client, message, args) {
		if (args.length < 1) return message.channel.send(`You didn't specify how many sides`)
		if (args[0].match(/[A-Z]/ig)) return message.channel.send(`Please use numbers like 6`)
		message.channel.send(Math.floor(Math.random() * parseInt(args[0])))
		return true
	}
}

module.exports = Command
