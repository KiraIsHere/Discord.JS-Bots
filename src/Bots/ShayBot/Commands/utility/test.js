const Commands = require(`../../../../__Global/Structures/Commands`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Generates an invite to the TestServer`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.guilds.get(`382223688118042625`).channels.first().createInvite().then(invite => {
			client.send(message,
				`If you would like to join the TestServer, heres the link ${invite.url}\n` +
				`This server has no rules besides don't ping people for no reason.\n` +
				`Change any setting, invite any bot, anything.`
			);
		});
		return true;
	}
}

module.exports = Command;
