const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
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
			description: `Deletes color role`,
			usage: `Remove`,
			aliases: []
		});
	}

	run(client, message) {
		let role = message.member.roles.find(`name`, `USER-${message.member.id}`);

		let embed = new MessageEmbed();
		if (role) {
			role.delete();

			embed
				.setTitle(`✅ **Removed ${role.hexColor.toUpperCase().replace(`#`, ``)}**`)
				.setColor(role.color)
				.setFooter(client.botName)
				.setTimestamp();
		} else {
			embed
				.setTitle(`❌ **ERROR**`)
				.setDescription(`You dont have one!`)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp();
			return false;
		}
		client.send(message, { embed });
		return true;
	}
}

module.exports = Command;
