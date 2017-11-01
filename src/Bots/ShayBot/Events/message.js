const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, message) {
		const codeblock = /(`{3})(js|javascript)?\n([\s\S]*)\1/i;
		if (message.channel.type !== `text` || message.author.bot) return false;
		if (!codeblock.test(message.content)) return false;
		if (!message.channel.permissionsFor(client.user).has([`ADD_REACTIONS`, `READ_MESSAGE_HISTORY`])) return false;
		const parsed = codeblock.exec(message.content);
		const code = {
			code: parsed[3].trim(),
			lang: parsed[2]
		};
		client.commands.get(`lint`).run(client, message, undefined, code, true);

		if (process.env.LOCAL) return false;

		if (message.channel.name === `bots`) {
			if (message.content.startsWith(`-`)) message.delete({ timeout: 500 });
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
