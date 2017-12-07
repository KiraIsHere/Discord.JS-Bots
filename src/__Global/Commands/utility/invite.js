const Commands = require(`../../Structures/Commands`);
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
			description: `Gives bot invite link`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		client.send(message, new MessageEmbed()
			.setAuthor(client.user.username, client.user.displayAvatarURL())
			.setTitle(client.user.bot ? `Invite Link` : `I'm a user account, I can't be invited`)
			.setURL(client.user.bot ? `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8` : `http://lmgtfy.com/?q=Didn%27t+you+read+the+damn+text`)
			.setFooter(`Note: I may be a private bot`)
			.setColor(0x00FFFF)
		);
		return true;
	}
}

module.exports = Command;
