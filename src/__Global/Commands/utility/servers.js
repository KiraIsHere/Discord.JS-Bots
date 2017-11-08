const Commands = require(`../../Structures/Commands`);
const { basename } = require(`path`);

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
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Lists all servers`,
			usage: ``,
			aliases: [`guilds`]
		});
	}

	run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) throw new Error(`Sorry, you do not have permission for this command`);

		const servers = [];
		client.guilds.forEach(guild => servers.push(`${guild.name} (${guild.id})\n`));

		client.send(message, servers.sort().join(``), { code: `` });
		return true;
	}
}

module.exports = Command;
