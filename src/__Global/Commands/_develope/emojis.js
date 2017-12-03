const Commands = require(`../../Structures/Commands`);

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
			description: `Lists all emojis`,
			usage: `(Page)`,
			aliases: [`emotes`]
		});
	}

	run(client, message, args) {
		const pages = this.split(client.emojis.map(e => e).join(` `), 2000);
		if (pages.length < 2) args[0] = 1;
		if (args.length < 1 || Number.isInteger(args[0]) || args[0] < 1 || args[0] > pages.size) return client.missingArgs(message, this, `[1-${pages.length}]`);
		client.send(message, pages[args[0] - 1]);
		return true;
	}

	split(input, length) {
		var strs = [];
		while (input.length > length) {
			var pos = input.substring(0, length).lastIndexOf(` `);
			pos = pos <= 0 ? length : pos;
			strs.push(input.substring(0, pos));
			var i = input.indexOf(` `, pos) + 1;
			if (i < pos || i > pos + length) { i = pos; }
			input = input.substring(i);
		}
		strs.push(input);
		return strs;
	}
}

module.exports = Command;
