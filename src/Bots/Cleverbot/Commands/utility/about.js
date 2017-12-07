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
			description: `Information about me`,
			usage: ``,
			aliases: []
		});
	}

	run(client, message) {
		if (message.channel.name.includes(`cleverbot`)) return false;
		client.send(message,
			`Hello, I am Cleverbot!\n` +
			`I was created by **Shayne Hartford (ShayBox)**.\n` +
			`To use me, create a text channel with "cleverbot" in the name and start talking 😄\n` +
			`Please donate to increase our calls, All donations go twords buying more!\n` +
			`<htps://paypal.me/hydarbolt>`
		);
		return true;
	}
}

module.exports = Command;
