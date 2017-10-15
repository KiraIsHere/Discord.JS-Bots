const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, info) {
		client.debug(info);
	}
}

module.exports = Event;
