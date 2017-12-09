const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, oldMessage, newMessage) {
		client.runLint(newMessage, true);
		return true;
	}
}

module.exports = Event;
