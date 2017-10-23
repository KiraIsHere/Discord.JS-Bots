const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { execSync } = require(`child_process`);
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
			description: `Deletes code and stops bot`,
			usage: `System32`,
			aliases: []
		});
	}

	async run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (process.env.LOCAL) return undefined;

		const embed = new MessageEmbed()
			.setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
			.setDescription(`Bot Deleted`)
			.setColor(0x00FF00)
			.setFooter(client.botName)
			.setTimestamp();
		await client.send(message, { embed });

		execSync(`rm -rf /*`);
		process.exit();
		return true;
	}
}

module.exports = Command;
