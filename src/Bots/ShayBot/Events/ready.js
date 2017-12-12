const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client) {
		if (process.env.LOCAL) return true;
		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);
		return true;
	}
}

module.exports = Event;
