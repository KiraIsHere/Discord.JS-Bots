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
			description: `Clears 1-100 messages`,
			usage: `[1-100]`,
			aliases: [`prune`, `purge`]
		})
	}

	run(client, message, args) {
		if (args.length < 1 || Number.isInteger(args[0]) || args[0] < 1 || args[0] > 100) return client.missingArgs(message, this)
		if (!message.guild.me.hasPermission(`MANAGE_MESSAGES`) || !message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`Missing Permissions "MANAGE_MESSAGES"`)

		message.channel.bulkDelete(args[0] + 1, { filterOld: true })
		return true
	}
}

module.exports = Command
