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
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		const role = message.member.roles.find(`name`, `USER-${message.member.id}`);

		const embed = new MessageEmbed();
		if (role) {
			if (!message.guild.me.hasPermission([`MANAGE_ROLES`])) {
				embed
					.setTitle(`❌ **ERROR**`)
					.setDescription(
						`Invalid permissions\n` +
						`\`MANAGE_ROLES\``
					)
					.setColor(0xFF0000)
					.setFooter(client.botName)
					.setTimestamp();
				return false;
			}

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
