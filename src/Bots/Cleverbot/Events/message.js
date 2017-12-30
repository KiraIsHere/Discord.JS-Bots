const Events = require(`../../../__Global/Structures/Events`);
const Cleverbot = require(`cleverbot-node`);
const cleverbot = new Cleverbot;
cleverbot.configure({ botapi: process.env.CLEVERBOT_API });

class Event extends Events {
	run(client, message) {
		if (!message.channel.name.includes(`cleverbot`)) return;
		if (message.author.bot) return;
		if (!message.content.match(/[A-Z0-9]/i)) return;
		if (client.checkCooldown(message.author.id)) return message.channel.send(`Cooldown, please wait!`).then(m => m.delete({ timeout: 1000 }));
		client.addCooldown(message.author.id, `2`);

		message.channel.startTyping();
		cleverbot.write(message.content, response => {
			message.channel.send(response.output);
			message.channel.stopTyping();
			client.database.find({ USED_API_CALLS: { $type: 16 } }).then(data => {
				client.database.update({ USED_API_CALLS: { $type: 16 } }, { USED_API_CALLS: data[0].USED_API_CALLS + 1 });
			});
		});
	}
}

module.exports = Event;
