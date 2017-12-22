const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run() {
		if (process.env.DEV) return true;
		return true;
	}
}

module.exports = Event;
