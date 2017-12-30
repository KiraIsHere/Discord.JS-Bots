const Events = require(`../../../__Global/Structures/Events`);
const { post, get } = require(`snekfetch`);

class Event extends Events {
	run(client) {
		// Token Checks

		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			client.tokens = data[0].TOKENS;

			client.tokens.forEach((token, index) => {
				if (token.toString() === `0`) return;
				post(`${client.apiURL}/api/token`, { headers: { "Content-Type": `application/json` } }).send({ token }).then(data => console.log(data.body.USERNAME)).catch(() => client.tokens.splice(index, 1));
			});

			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		// Prune Members

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);

		if (process.env.DEV) return;

		setInterval(() => {
			get(`https://discord-js-bots.herokuapp.com/`).then(() => null);
		}, 900000);
	}
}

module.exports = Event;
