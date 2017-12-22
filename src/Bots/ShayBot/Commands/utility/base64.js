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
			description: `Encodes or Decodes base64`,
			usage: `[Encode/Decode] [Text/Base64]`,
			aliases: [`b64`, `64`]
		});
	}

	run(client, message, args) {
		if (args.length < 2) return client.missingArgs(message, this);

		const action = args.shift();
		let output;
		switch (action.toLowerCase()) {
			case `encode`:
				output = Buffer.from(args.join(` `)).toString(`base64`);
				break;

			case `decode`:
				output = Buffer.from(args.join(` `), `base64`).toString(`ascii`);
				break;

			default:
				output = `Sorry, you didn't enter a valid option, encode or decode`;
				break;
		}
		message.channel.send(output, { code: `` });
		return true;
	}
}

module.exports = Command;
