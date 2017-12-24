const Events = require(`../../../__Global/Structures/Events`);
const { post } = require(`snekfetch`);

class Event extends Events {
	run(client) {
		if (process.env.DEV) return;
		post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
			.set(`Authorization`, process.env.HEX_DISCORDBOTS_ORG_API)
			.send({ server_count: client.guilds.size }) // eslint-disable-line camelcase
			.end();

		post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
			.set(`Authorization`, process.env.DISCORDBOTS_PW_API)
			.send({ server_count: client.guilds.size	}) // eslint-disable-line camelcase
			.end();
		
	}
}

module.exports = Event;
