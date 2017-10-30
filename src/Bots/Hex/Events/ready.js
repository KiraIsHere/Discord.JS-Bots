const Events = require(`../../../__Global/Structures/Events`);
const { post } = require(`snekfetch`);

class Event extends Events {
	run(client) {
		if (process.env.LOCAL) return false;
		// post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
		// 	.set(`Authorization`, process.env.DISCORDBOTS_ORG_API)
		// 	.send({ server_count: client.guilds.size }); // eslint-disable-line camelcase

		// post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
		// 	.set(`Authorization`, process.env.DISCORDBOTS_PW_API)
		// 	.send({ server_count: client.guilds.size	}); // eslint-disable-line camelcase
		return true;
	}
}

module.exports = Event;
