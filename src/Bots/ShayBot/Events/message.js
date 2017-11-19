const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, message) {
		client.cmds.commands.get(`lint`).check(client, message, false);

		if (process.env.LOCAL) return false;

		if (message.channel.name !== `welcome`) return false;
		message.delete({ timeout: 500 });
		if (message.author.bot) return false;
		if (!message.content.toLowerCase().includes(`i agree`)) return message.member.kick();
		message.member.addRole(message.guild.roles.find(`name`, `Verified`));
		return true;
	}
}

module.exports = Event;
