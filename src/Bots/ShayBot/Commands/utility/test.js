const Commands = require(`../../../../__Global/Structures/Commands`);

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
			description: `Generates an invite to the TestServer`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.guilds.get(`382223688118042625`).channels.first().createInvite().then(invite => {
			message.channel.send(
				`If you would like to join the TestServer, heres the link ${invite.url}\n` +
				`This server has no rules besides don't ping people for no reason.\n` +
				`Change any setting, invite any bot, anything.`
			);
		});
		return true;
	}
}

module.exports = Command;
