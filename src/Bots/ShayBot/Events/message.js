const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, message) {
		client.commands.get(`lint`).check(client, message, false);

		if (process.env.LOCAL) return false;

		if (message.channel.name === `bots`) {
			if (message.content.startsWith(`-`)) message.delete({ timeout: 1000 * 300 }).catch(() => null);
			if (message.author.id === `234395307759108106`) message.delete({ timeout: 1000 * 300 }).catch(() => null);
		}

		if (message.channel.name === `welcome`) {
			message.delete({ timeout: 500 });
			if (message.author.bot) return false;
			if (message.content.toLowerCase().includes(`i agree`)) {
				message.member.addRole(message.guild.roles.find(`name`, `Verified`));
			} else {
				message.member.kick();
			}
		}
		return true;
	}
}

module.exports = Event;
