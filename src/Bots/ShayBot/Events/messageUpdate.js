const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, oldMessage, newMessage) {
		if (newMessage.channel.type !== `text` || newMessage.author.bot) return false;
		if (!client.codeblock.test(newMessage.content)) return false;
		if (!newMessage.channel.permissionsFor(client.user).has([`ADD_REACTIONS`, `READ_MESSAGE_HISTORY`])) return false;
		const parsed = client.codeblock.exec(newMessage.content);
		const code = {
			code: parsed[3].trim(),
			lang: parsed[2]
		};
		client.commands.get(`lint`).run(client, newMessage, undefined, code, true, true);
		return true;
	}
}

module.exports = Event;
