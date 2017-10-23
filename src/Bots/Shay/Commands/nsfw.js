const Commands = require(`../../../__Global/Structures/Commands`);
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
			description: `Toggles the NSFW channels`,
			usage: `NSFW`,
			aliases: []
		});
	}

	run(client, message) {
		const NSFW = message.guild.roles.find(`name`, `NSFW`);

		if (message.member.roles.has(NSFW.id)) {
			message.member.removeRole(NSFW);
			client.send(message, `Successfully Disabled NSFW Channels`);
		} else {
			message.member.addRole(NSFW);
			client.send(message, `Successfully Enabled NSFW Channels`);
		}
	}
}

module.exports = Command;
