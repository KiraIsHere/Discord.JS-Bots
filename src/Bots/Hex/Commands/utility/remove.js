const Commands = require(`../../../../__Global/Structures/Commands`);
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
			group: basename(__dirname, `.js`),
			description: `Deletes color role`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		const role = message.member.roles.find(`name`, `USER-${message.member.id}`);

		if (!role) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(`You dont have one!`)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
		}
		if (!message.guild.me.hasPermission([`MANAGE_ROLES`])) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`Invalid permissions\n` +
					`\`\`\`\nMANAGE_ROLES\n\`\`\``
				)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		}
		if (role.position > message.guild.me.highestRole.position) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`Invalid permissions\n` +
					`Cannot delete role \`\`\`\n${role.name}\n\`\`\``
				)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		}

		role.delete().then(role => {
			client.send(message, new MessageEmbed()
				.setTitle(`✅ **Removed ${role.hexColor.toUpperCase().replace(`#`, ``)}**`)
				.setColor(role.color)
				.setFooter(client.botName)
				.setTimestamp()
			);
		}).catch(error => {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(`\`\`\`\n${error}\n\`\`\``)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		});
		return true;
	}
}

module.exports = Command;
