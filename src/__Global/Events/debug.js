const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, info) {
		console.debug(info);
	}
}

module.exports = Event;
