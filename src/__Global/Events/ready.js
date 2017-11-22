const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		if (client.user.bot) client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`}`);

		client.database.find({ BLACKLISTED_USERS: { $type: 2 } }).then(data => {
			client.blacklist = data[0].BLACKLISTED_USERS;
		});

		client.database.find({ WHITELISTED_USERS: { $type: 2 } }).then(data => {
			client.whitelist = data[0].WHITELISTED_USERS;
		});

		setTimeout(() => {
			const channel = client.guilds.get(client.guild).channels.find(`name`, `statistics`);
			channel.messages.fetch().then(messages => {
				messages.forEach(message => {
					if (message.author !== client.user) return false;
					setInterval(() => {
						client.cmds.commands.get(`botinfo`).send(client, message);
					}, 1000 * 60 * 10);
					return true;
				});
			});
		}, 1000 * 5);

		if (global.gc) {
			setInterval(() => {
				global.gc();
			}, 1000 * 60);
		} else {
			console.log(`You must run node with --expose-gc`);
		}
	}
}

module.exports = Event;
