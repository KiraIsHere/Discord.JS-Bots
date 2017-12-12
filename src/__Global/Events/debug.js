const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, info) {
		client.log(info);
	}
}

module.exports = Event;
