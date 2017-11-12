const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, message) {
		client.cmds.commands.get(`lint`).check(client, message, false);

		if (process.env.LOCAL) return false;

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
