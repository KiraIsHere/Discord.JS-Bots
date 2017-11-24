const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client) {
		if (process.env.LOCAL) return true;
		client.guilds.get(client.servers.MAIN).pruneMembers({ days: 1, dry: true }).then(number => {
			if (number > 0) client.guilds.get(client.servers.MAIN).pruneMembers({ days: 1 });
		});
		return true;
	}
}

module.exports = Event;
