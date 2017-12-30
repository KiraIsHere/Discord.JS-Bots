const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client) {
		if (process.env.DEV) return;
		client.updateActivity();
	}
}

module.exports = Event;
