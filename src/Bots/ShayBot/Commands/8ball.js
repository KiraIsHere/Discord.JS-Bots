const Commands = require(`../../../__Global/Structures/Commands`);
const { basename } = require(`path`);

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
			name: basename(__filename, `.js`),
			description: ``,
			usage: `Ask the 8 ball a question`,
			aliases: []
		});
	}

	run(client, message) {
		const responses = [
			`Nope`,
			`I don't know, m8`,
			`Hell naw`,
			`Most likely`,
			`Without a doubt!`,
			`Yes, definitely!`,
			`Most likely!`,
			`Doubtful...`,
			`YES YES YES!`,
			`In your dreams!`,
			`You already know the answer to that...`,
			`Oh god, no.`,
			`If that's what you want...`
		];

		client.send(message, responses[Math.floor(Math.random() * responses.length)]);
		return true;
	}
}

module.exports = Command;
