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
			description: `Shows the hex value in an embed`,
			usage: `[Hex Value]`,
			aliases: [`color`, `colour`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		if (/[0-9A-F]{6}/i.test(args)) {
			client.send(message, new MessageEmbed()
				.setTitle(`#${args.join(` `).replace(`#`, ``)}`)
				.setColor(parseInt(args.join(` `).replace(`#`, ``), 16))
			);
		}
		return true;
	}
}

module.exports = Command;
