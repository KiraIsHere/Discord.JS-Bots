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
			description: `Clears 1-100 messages`,
			usage: `[1-100]`,
			aliases: [`prune`, `purge`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		if (!message.guild.me.hasPermission(`MANAGE_MESSAGES`) || !message.member.hasPermission(`MANAGE_MESSAGES`)) return client.send(message, `Missing Permissions "MANAGE_MESSAGES"`);
		if (args[0] < 1 || args[0 > 100]) return client.send(message, `Number between 1 and 100`);

		message.channel.bulkDelete(args[0]);
		return true;
	}
}

module.exports = Command;
