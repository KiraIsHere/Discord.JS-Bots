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
			usage: `[Coin]`,
			aliases: [`coin`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		get(`https://min-api.cryptocompare.com/data/all/coinlist`).then(data => {
			if (!(args[0].toUpperCase() in data.body.Data)) return message.channel.send(`Not a valid currency`);
			get(`https://min-api.cryptocompare.com/data/price?fsym=${args[0].toUpperCase()}&tsyms=USD`).then(data => {
				message.channel.send(`$${data.body.USD} USD`);
			});
		});
		return true;
	}
}

module.exports = Command;
