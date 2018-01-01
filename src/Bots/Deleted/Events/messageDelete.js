const Events = require(`../../../__Global/Structures/Events`)

class Event extends Events {
	async run(client, message) {
		if (process.env.DEV) return
		if (process.env.DEV && message.channel.id !== `382977665998520323`) return
		if (!process.env.DEV && message.channel.id === `382977665998520323`) return
		if (client.user === message.author) return
		await message.guild.members.fetch(message.author)
		message.channel.createWebhook(message.member.displayName, { avatar: message.author.displayAvatarURL() }).then(webhook => {
			webhook.send(message.content).then(() => {
				webhook.delete().catch(error => message.channel.send(error, { code: `js` }))
			}).catch(() => null)
		}).catch(error => {
			message.guild.owner.send(error, { code: `js` }).catch(() => message.channel.send(error, { code: `js` }).catch(() => null))
			message.channel.send(`From: ${message.member.displayName}\n${message.content}`).catch(() => null)
		})
	}
}

module.exports = Event
