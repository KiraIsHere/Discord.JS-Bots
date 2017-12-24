const Commands = require(`../../Structures/Commands`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Lists all servers`,
			usage: ``,
			aliases: [`guilds`]
		});
	}

	run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) return message.channel.send(`Sorry, you do not have permission for this command`);

		const longestCount = client.guilds.map(g => g.memberCount.toString().length).reduce((long, str) => Math.max(long, str), 0);
		const longestID = client.guilds.map(g => g.id.toString().length).reduce((long, str) => Math.max(long, str), 0);
		message.channel.send(client.guilds.sort().map(g => `${g.memberCount}${` `.repeat(longestCount - g.memberCount.toString().length)} | ${g.id}${` `.repeat(longestID - g.id.toString().length)} | ${g.name}`).join(`\n`), { code: ``, split: true });
		return true;
	}
}

module.exports = Command;
