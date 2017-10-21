const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			name: basename(__filename, `.js`),
			description: `Shows role permissions`,
			usage: `Permissions [Role Name]`,
			aliases: [`perms`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		if (!message.guild.roles.find(`name`, args.join(` `))) return;

		let role = message.guild.roles.find(`name`, args.join(` `));
		let permissions = role.permissions.serialize();

		let longestString = 0;
		for (var key in permissions) {
			if (key.length > longestString) {
				longestString = key.length;
			}
		}

		let content = ``;
		Object.keys(permissions).forEach(key => {
			content += `${` `.repeat(longestString - key.length)}${key} ${permissions[key]}\n`;
		});

		const embed = new MessageEmbed()
			.setTitle(role.name)
			.setDescription(`\`\`\`${content}\`\`\``)
			.setColor(role.color)
			.setFooter(client.botName)
			.setTimestamp();

		client.send(message, { embed });
	}
}

module.exports = Command;
