const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, oldMessage, newMessage) {
		client.cmds.commands.get(`lint`).check(client, newMessage, true);
		return true;
	}
}

module.exports = Event;
