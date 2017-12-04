const Commands = require(`../../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);

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
			description: `Shows role permissions`,
			usage: `[Role Name]`,
			aliases: [`perms`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		const role = message.guild.roles.find(`name`, args.join(` `));
		if (!role) return false;
		const permissions = role.permissions.serialize();

		let longestString = 0;
		for (const key in permissions) {
			if (key.length > longestString) {
				longestString = key.length;
			}
		}

		let content = ``;
		Object.keys(permissions).forEach(key => {
			content += `${` `.repeat(longestString - key.length)}${key} ${permissions[key]}\n`;
		});

		client.send(message, new MessageEmbed()
			.setTitle(role.name)
			.setDescription(`\`\`\`${content}\`\`\``)
			.setColor(role.color)
			.setFooter(client.botName)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Command;
