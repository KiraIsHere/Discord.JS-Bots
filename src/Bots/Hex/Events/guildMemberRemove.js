const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, member) {
		const role = member.roles.find(`name`, `USER-${member.id}`);
		if (role) role.delete();
	}
}

module.exports = Event;
