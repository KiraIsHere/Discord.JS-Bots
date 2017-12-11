const Events = require(`../../../__Global/Structures/Events`);
const { get } = require(`snekfetch`);

class Event extends Events {
	run(client) {
		if (process.env.LOCAL) return true;
		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);

		setInterval(() => {
			client.users.get(`90323448357736448`).send(
				`$BTC: ${this.getCoin(`BTC`)} USD\n` +
				`$ETH: ${this.getCoin(`ETH`)} USD\n` +
				`$LTC: ${this.getCoin(`LTC`)} USD\n` +
				`$MONA: ${this.getCoin(`MONA`)} USD\n`
			);
		}, 1000 * 10 * 30);
		return true;
	}

	getCoin(coin) {
		return get(`https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD`).then(data => data.body.USD);
	}
}

module.exports = Event;
