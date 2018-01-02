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
				webhook.delete().catch(() => null)
			}).catch(() => null)
		}).catch(() => {
			const msg = `Sorry, I don't have permissions to create/delete webhooks on your server ${message.guild.name}`
			message.guild.owner.send(msg).catch(() => message.channel.send(msg).catch(() => message.guild.leave()))
		})
	}
}

module.exports = Event
