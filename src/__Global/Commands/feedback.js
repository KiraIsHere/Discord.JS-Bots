const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { parse } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: true,
			cooldownTime: 600,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Submits feedback ideas to be voted on`,
			usage: `Feedback [Idea]`,
			aliases: [`idea`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);
		if (args.join(` `).length > 1000) return client.send(message, `Message too long, 1000 Characters or less`);

		const embed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription(args.join(` `))
			.setFooter(`Vote on the suggestion`);

		client.channels.get(`368572194667888646`).send({ embed }).then(async m => {
			await m.react(`👍`);
			await m.react(`👎`);
		});


		client.send(message,
			`Thank you for your feedback!\n` +
			`Please note: If you requested anything stupid or spam this, you will be blacklisted from using the bot.`
		);
	}
}

module.exports = Command;
