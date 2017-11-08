const Commands = require(`../../../../__Global/Structures/Commands`);
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
			description: `Encodes/Decodes binary`,
			usage: `[Encode/Decode] [Text/Binary]`,
			aliases: [`b`]
		});
	}

	run(client, message, args) {
		if (args.length < 2) throw new Error(this.usage);

		const action = args.shift();
		let output;
		switch (action.toLowerCase()) {
			case `encode`:
				output = this.asciiToBin(args.join(` `));
				break;

			case `decode`:
				output = this.binToAscii(args.join(` `));
				break;

			default:
				output = `Sorry, you didn't enter a valid option, encode or decode`;
				break;
		}

		client.send(message, output, { code: `` });
		return true;
	}

	asciiToBin(input) {
		const pad = `00000000`;

		return input.replace(/./g, c => {
			const bin = c.charCodeAt(0).toString(2);
			return pad.substring(bin.length) + bin;
		});
	}

	binToAscii(input) {
		return input.replace(/[01]{8}/g, value => String.fromCharCode(parseInt(value, 2)));
	}
}

module.exports = Command;
