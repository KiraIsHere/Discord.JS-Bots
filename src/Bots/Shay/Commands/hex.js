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
			description: `Shows the hex value in an embed`,
			usage: `Hex [Hex Value]`,
			aliases: [`color`, `colour`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		if (/[0-9A-F]{6}/i.test(args)) {
			const embed = new MessageEmbed()
				.setTitle(`#${args.join(` `).replace(`#`, ``)}`)
				.setColor(parseInt(args.join(` `).replace(`#`, ``), 16));
			client.send(message, { embed });
		}
		return true;
	}
}

module.exports = Command;
