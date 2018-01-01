const Events = require(`../Structures/Events`)

class Event extends Events {
	run(client) {
		console.log(client.user.username)

		client.updateActivity()

		client.database.find({ BLACKLISTED_USERS: { $type: 2 } }).then(data => {
			client.blacklist = data[0].BLACKLISTED_USERS
		})

		client.database.find({ WHITELISTED_USERS: { $type: 2 } }).then(data => {
			client.whitelist = data[0].WHITELISTED_USERS
		})

		if (global.gc) {
			setInterval(() => {
				global.gc()
			}, 1000 * 60)
		} else {
			console.log(`You must run node with --expose-gc`)
		}
	}
}

module.exports = Event
