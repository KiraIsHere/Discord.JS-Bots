const Commands = require(`../../../../__Global/Structures/Commands`)
const { post } = require(`snekfetch`)

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
			description: `Tests tokens`,
			usage: `[Token]`,
			aliases: [`tokens`]
		})
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this)

		if (args.length < 2) {
			post(`${client.apiURL}/api/token`, { headers: { "Content-Type": `application/json` } }).send({ token: args[0] }).then(data => {
				message.channel.send(
					`Successfully logged in as \`${data.body.USERNAME}\`\n` +
					`${data.body.GUILDS.size > 0 ? `You have just saved \`${data.body.GUILDS.size}\` guilds:\n\`\`\`\n${data.body.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\`` : `No Guilds`}`
				)
			}).catch(error => message.channel.send(`\`\`\`js\n${error}\n\`\`\``))
		} else {
			const log = { SUCCEEDED: 0, FAILED: 0 }
			args.forEach(token => {
				post(`${client.apiURL}/api/token`, { headers: { "Content-Type": `application/json` } }).send({ token }).then(data => {
					log.SUCCEEDED += 1
					message.channel.send(
						`Successfully logged in as \`${data.body.USERNAME}\`\n` +
						`${data.body.GUILDS.size > 0 ? `You have just saved \`${data.body.GUILDS.size}\` guilds:\n\`\`\`\n${data.body.GUILDS.map(guild => guild.name).join(`\n`)}\n\`\`\`` : `No Guilds`}`
					)
				}).catch(() => { log.FAILED += 1 })
			})
			message.channel.send(`\`${log.SUCCEEDED}\` Successfully logged in\n\`${log.FAILED}\` Failed to login.`)
		}
		return true
	}
}

module.exports = Command
