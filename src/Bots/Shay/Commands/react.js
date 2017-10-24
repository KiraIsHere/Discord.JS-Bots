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
			description: `Reacts to a message with emojis`,
			usage: `[Text] (MessageID) (ChannelID)`,
			aliases: [`r`]
		});
	}

	async run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);
		if (!message.guild.me.hasPermission(`ADD_REACTIONS`) || !message.member.hasPermission(`ADD_REACTIONS`)) return client.errorEmbed(message, null, `Missing Permissions`);

		let emojis = { a: `🇦`, b: `🇧`, c: `🇨`, d: `🇩`, e: `🇪`, f: `🇫`, g: `🇬`, h: `🇭`, i: `🇮`, j: `🇯`, k: `🇰`, l: `🇱`, m: `🇲`, n: `🇳`, o: `🇴`, p: `🇵`, q: `🇶`, r: `🇷`, s: `🇸`, t: `🇹`, u: `🇺`, v: `🇻`, w: `🇼`, x: `🇽`, y: `🇾`, z: `🇿` };

		for (let char of args.join(` `)) {
			if (emojis[char]) await message.react(emojis[char]); // eslint-disable-line no-await-in-loop
		}
		return true;
	}
}

module.exports = Command;
