const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		if (client.user.bot) client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`} | By Shayne Hartford (ShayBox)`);

		client.database.find({ BLACKLISTED_USERS: { $type: 2 } }).then(data => {
			client.blacklist = data[0].BLACKLISTED_USERS;
		});

		client.database.find({ WHITELISTED_USERS: { $type: 2 } }).then(data => {
			client.whitelist = data[0].WHITELISTED_USERS;
		});
	}
}

module.exports = Event;
