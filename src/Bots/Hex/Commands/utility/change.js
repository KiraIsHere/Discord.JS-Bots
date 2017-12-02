const Commands = require(`../../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const randomColor = require(`randomcolor`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: true,
			cooldownAmount: 10,
			cooldownTime: 30,
			limit: true,
			limitAmount: 30,
			limitTime: 86400,
			description: `Changes the color role's color`,
			usage: `[Hex Value or RANDOM]`,
			aliases: [`hex`, `color`, `colour`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		if (args[0].toLowerCase().includes(`random`)) args[0] = randomColor();
		if (!/^(|#|0x)[0-9A-F]{6}$/i.test(args[0])) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`**Invalid hex value**\n` +
					`Please input a value, \`#000000\`, \`0x000000\`, \`000000\`, or \`RANDOM\``
				)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		}
		if (!message.guild.me.hasPermission([`MANAGE_ROLES`])) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`**Missing permissions**\n` +
					`\`\`\`\nMANAGE_ROLES\n\`\`\``
				)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		}

		const roleName = `USER-${message.author.id}`;
		const roleColor = parseInt(args[0].replace(`#`, ``).replace(`0x`, ``), 16);
		const { colorRole } = message.member;

		if (colorRole.position > message.guild.me.highestRole.position) {
			client.send(message, new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`Invalid permissions\n` +
					`Cannot edit role \`\`\`\n${colorRole.name}\n\`\`\`\n` +
					`Please move the role below Hex's role.`
				)
				.setColor(0xFF0000)
				.setFooter(client.botName)
				.setTimestamp()
			);
			return false;
		}

		if (!colorRole) {
			message.guild.createRole({
				data: {
					name: roleName,
					color: roleColor
				}
			}).then(role => {
				message.member.addRole(role).catch(error => this.error(client, message, error));
				return this.success(client, message, roleColor);
			}).catch(error => this.error(client, message, error));
		} else if (colorRole.name === roleName) {
			message.member.colorRole.setColor(roleColor)
				.then(() => this.success(client, message, roleColor))
				.catch(error => this.error(client, message, error));
		} else if (colorRole.name !== roleName) {
			return this.error(client, message,
				`The role ${colorRole.name} is not set to DEFAULT\n` +
				`Please change the color of that role and try again.`
			);
		}
		return true;
	}

	success(client, message, roleColor) {
		client.send(message, new MessageEmbed()
			.setTitle(`✅ **Changed to #${roleColor}**`)
			.setColor(roleColor)
			.setFooter(client.botName)
			.setTimestamp()
		);
		return true;
	}

	error(client, message, error) {
		client.send(message, new MessageEmbed()
			.setTitle(`❌ **ERROR**`)
			.setDescription(`\`\`\`\n${error}\n\`\`\``)
			.setColor(0xFF0000)
			.setFooter(client.botName)
			.setTimestamp()
		);
		return false;
	}
}

module.exports = Command;
