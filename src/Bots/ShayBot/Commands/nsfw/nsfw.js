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
			description: `Toggles the NSFW channels`,
			usage: ``,
			aliases: []
		})
	}

	run(client, message) {
		const NSFW = message.guild.roles.find(`name`, `NSFW`)

		if (message.member.roles.has(NSFW.id)) {
			message.member.removeRole(NSFW)
				.then(() => message.channel.send(`Successfully Hidden NSFW Channels`))
				.catch(error => message.channel.send(error, { codeblock: `` }))
		} else {
			message.member.addRole(NSFW)
				.then(() => message.channel.send(`Successfully Shown NSFW Channels`))
				.catch(error => message.channel.send(error, { codeblock: `` }))
		}
		return true
	}
}

module.exports = Command
