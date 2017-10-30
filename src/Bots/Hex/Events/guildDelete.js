const Events = require(`../../../__Global/Structures/Events`);
const { post } = require(`snekfetch`);

class Event extends Events {
	run(client) {
		post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
			.send({ server_count: client.guilds.size	}); // eslint-disable-line camelcase
	}
}

module.exports = Event;
