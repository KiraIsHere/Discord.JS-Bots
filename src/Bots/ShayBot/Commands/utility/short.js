const Commands = require(`../../../../__Global/Structures/Commands`);
const { basename } = require(`path`);
const googl = require(`goo.gl`);
googl.setKey(process.env.GOOGLE_URL_API);

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
			group: basename(__dirname, `.js`),
			description: `Shortens the URL`,
			usage: `[URL]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		googl.shorten(args[0]).then(url => {
			client.send(message, url);
		});
		return true;
	}
}

module.exports = Command;
