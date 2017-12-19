const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client) {
		// if (process.env.LOCAL) return true;

		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			data[0].TOKENS.forEach(token => {
				if (token === 0) return false;
				client.cmds.commands.get(`token`).check(token, `ShayBot Automatic Check`).then(() => {
					client.tokens.push(token);
				}).catch(error => client.error(error));
				return true;
			});
			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);
		return true;
	}
}

module.exports = Event;
