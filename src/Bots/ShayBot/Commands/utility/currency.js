const Commands = require(`../../../../__Global/Structures/Commands`);
const { get } = require(`snekfetch`);

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
			description: `Converts input currency to USD`,
			usage: `[COIN]`,
			aliases: [`coin`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);
		get(`https://min-api.cryptocompare.com/data/all/coinlist`).then(data => {
			if (!(args[0].toUpperCase() in data.body.Data)) return client.send(message, `Not a valid currency`);
			get(`https://min-api.cryptocompare.com/data/price?fsym=${args[0].toUpperCase()}&tsyms=USD`).then(data => {
				client.send(message, `$${data.body.USD} USD`);
			});
			return true;
		});
		return true;
	}
}

module.exports = Command;
