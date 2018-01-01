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
			description: `Generates an invite to the guild`,
			usage: `[GuildID]`,
			aliases: []
		})
	}

	run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return message.channel.send(`Sorry, you do not have permission for this command`)
		if (args.length < 1) return client.missingArgs(message, this)

		client.defaultChannel(client.guilds.get(args[0])).createInvite({ maxAge: 1 })
			.then(invite => message.channel.send(invite.url))
			.catch(error => message.channel.send(error, { code: `` }))
		return true
	}
}

module.exports = Command
