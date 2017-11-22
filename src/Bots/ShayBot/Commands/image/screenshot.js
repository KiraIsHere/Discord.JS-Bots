const Commands = require(`../../../../__Global/Structures/Commands`);
const { post } = require(`snekfetch`);
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
			group: basename(__dirname, `.js`),
			description: `Takes screenshot of url`,
			usage: `[URL]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		post(`https://tvde1-api.herokuapp.com/api/other/screenshot`, { headers: { Authorization: process.env.TVDE_API } })
			.send({ args: { url: args[0] } })
			.then(data => {
				if (data.success) return client.send(message, { files: [Buffer.from(data.body.result.image, `base64`)] });
				client.send(message, data.message);
				return true;
			})
			.catch(error => client.send(message, error, { code: `` }));
		return true;
	}
}

module.exports = Command;
