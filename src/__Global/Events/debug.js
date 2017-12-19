const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, info) {
		if (process.env.LOCAL || process.env.LOCAL_TESTING) return false;
		console.log(info);
		return true;
	}
}

module.exports = Event;
