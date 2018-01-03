const Events = require(`../../../__Global/Structures/Events`)

class Event extends Events {
	run(client) {
		// Prune Members

		const guild = client.guilds.get(client.servers.MAIN)
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false)
	}
}

module.exports = Event
