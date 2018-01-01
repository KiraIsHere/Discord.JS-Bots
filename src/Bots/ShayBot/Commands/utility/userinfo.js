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
			description: `Shows guild information on the mentioned user`,
			usage: `[Mention/ID]`,
			aliases: [`user`]
		})
	}

	async run(client, message, args) {
		let { member } = message
		if (message.mentions.members.size > 0) {
			member = message.mentions.members.first()
		} else if (args.length > 1) {
			member = message.guild.members.get(args[0])
		}

		message.channel.send(
			`= User Info =\n` +
			`\n` +
			`User\n` +
			`• Name               :: ${member.user.username}\n` +
			`• Nickname           :: ${member.nickname ? member.nickname : `No Nickname`}\n` +
			`• ID                 :: ${member.id}\n` +
			`• Status             :: ${this.resolveStatus(message.author)}\n` +
			`• Creation Date      :: ${member.creationDate}\n` +
			`• Join Date          :: ${member.joinedTimestamp}\n` +
			`• Roles              :: ${await client.haste(message.member.roles.map(role => `${role.name}`).sort().join(`\n`).replace(/@/g, ``))}`,
			{ code: `asciidoc` }
		)
		return true
	}

	resolveStatus(user) {
		return user.presence.status
			.replace(`online`, `Online`)
			.replace(`offline`, `Offline`)
			.replace(`idle`, `Away`)
			.replace(`dnd`, `Do Not Disturb`)
	}
}

module.exports = Command
