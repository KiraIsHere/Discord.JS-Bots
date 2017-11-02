const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, reaction, user) {
		const { message } = reaction;
		if (message.author.id !== user.id) return false;
		if (reaction.emoji.name !== `❌`) return false;
		if (!message.reactions.has(`❌`)) return false;
		if (!message.reactions.get(`❌`).users.has(client.user.id)) return false;
		if (!client.codeblock.test(message.content)) return false;
		const parsed = client.codeblock.exec(message.content);
		const code = {
			code: parsed[3].trim(),
			lang: parsed[2]
		};
		client.commands.get(`lint`).run(client, message, undefined, code);
		return true;
	}
}

module.exports = Event;
