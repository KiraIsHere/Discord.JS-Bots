const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, guild) {
		guild.leave();
		return true;
	}
}

module.exports = Event;
