const Commands = require(`../../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: true,
			cooldownAmount: 1,
			cooldownTime: 600,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Submits feedback ideas to be voted on`,
			usage: `[Idea]`,
			aliases: [`idea`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		if (args.join(` `).length > 1000) return client.send(message, `Message too long, 1000 characters or less`);

		client.channels.get(client.channelList.FEEDBACK).send(new MessageEmbed()
			.setAuthor(`${message.author.username} (${message.author.id})`, message.author.displayAvatarURL())
			.setDescription(args.join(` `))
			.setFooter(`From ${message.channel.name} In ${message.guild.name} (${message.guild.id})`)
		).then(async m => {
			await m.react(`👍`);
			await m.react(`👎`);
		});

		client.send(message,
			`Thank you for your feedback!\n` +
			`Please note: If you requested anything stupid or spam this, you will be blacklisted from using the bot.`
		);
		return true;
	}
}

module.exports = Command;
