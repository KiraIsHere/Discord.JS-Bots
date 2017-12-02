const Commands = require(`../../../../__Global/Structures/Commands`);

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
			description: `Toggles the NSFW channels`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		const NSFW = message.guild.roles.find(`name`, `NSFW`);

		if (message.member.roles.has(NSFW.id)) {
			message.member.removeRole(NSFW)
				.then(() => client.send(message, `Successfully Hidden NSFW Channels`))
				.catch(error => client.send(message, error, { codeblock: `` }));
		} else {
			message.member.addRole(NSFW)
				.then(() => client.send(message, `Successfully Shown NSFW Channels`))
				.catch(error => client.send(message, error, { codeblock: `` }));
		}
		return true;
	}
}

module.exports = Command;
