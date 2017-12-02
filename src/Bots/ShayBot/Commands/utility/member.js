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
