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
			description: `Picks a random guild member`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.send(message, this.pickMember(message).user.username);
		return true;
	}

	pickMember(message) {
		const member = message.guild.members.random();
		if (member.user.bot) return this.pickMember();
		return member;
	}
}

module.exports = Command;
