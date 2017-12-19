const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client) {
		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			client.tokens = data[0].TOKENS;

			client.tokens.forEach((token, index) => {
				if (token.toString() === `0`) return false;
				client.cmds.commands.get(`token`).check(token).then(data => console.log(data.USERNAME)).catch(() => client.tokens.splice(index, 1));
				return true;
			});

			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		if (process.env.LOCAL) return false;

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);
		return true;
	}
}

module.exports = Event;
