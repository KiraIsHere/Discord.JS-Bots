const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, info) {
		console.log(info);
	}
}

module.exports = Event;
