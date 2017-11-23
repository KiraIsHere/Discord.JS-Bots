const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, guild, user) {
		if (guild.id !== client.servers.TEST) return false;
		guild.unban(user, `Nobody can ban on this server`);
		return true;
	}
}

module.exports = Event;
