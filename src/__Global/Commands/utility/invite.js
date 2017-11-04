const Commands = require(`../../Structures/Commands`);
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
			description: `Gives bot invite link`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		const embed = new MessageEmbed()
			.setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
			.setFooter(`Note: I may be a private bot`)
			.setColor(0x00FFFF);

		if (client.user.bot) {
			embed
				.setTitle(`Invite Link`);
		} else {
			embed
				.setTitle(`I'm a user account, I can't be invited`);
		}
		client.send(message, { embed });
		return true;
	}
}

module.exports = Command;
