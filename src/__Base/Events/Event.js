const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run() {
		if (process.env.LOCAL) return false;
		return true;
	}
}

module.exports = Event;
