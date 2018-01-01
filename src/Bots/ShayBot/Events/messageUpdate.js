const Events = require(`../../../__Global/Structures/Events`)

class Event extends Events {
	async run(client, oldMessage, newMessage) {
		await client.runLint(newMessage, true)
	}
}

module.exports = Event
