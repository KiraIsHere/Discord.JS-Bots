const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, message) {
		if (process.env.DEV) return true;
		message.channel.send(message.content).catch(() => null);
		return true;
	}
}

module.exports = Event;
