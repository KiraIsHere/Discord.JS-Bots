const Commands = require(`../../Structures/Commands`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Adds, Removes, Lists and Checks the whitelist for a User ID`,
			usage: `[Add/Remove/List/Check] (UserID)`,
			aliases: []
		});
	}

	async run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return message.channel.send(`Sorry, you do not have permission for this command`);
		if (args[0] === `list`) {
			if (args.length < 1) return client.missingArgs(message, this);
		} else if (args.length < 2) { return client.missingArgs(message, this); }

		let output;
		switch (args[0]) {
			case `add`:
				this.addToArray(client.whitelist, args[1]);
				client.database.update({ WHITELISTED_USERS: { $type: 2 } }, { WHITELISTED_USERS: client.whitelist });
				output = `Added ${args[1]} to whitelist`;
				break;

			case `remove`:
				this.removeFromArray(client.whitelist, args[1]);
				client.database.update({ WHITELISTED_USERS: { $type: 2 } }, { WHITELISTED_USERS: client.whitelist });
				output = `Removed ${args[1]} from whitelist`;
				break;

			case `check`:
				output = `The user ${args[1]} ${client.whitelist.indexOf(args[1]) > -1 ? `is whitelisted` : `is not whitelisted`}`;
				break;

			case `list`:
				await client.database.find({ WHITELISTED_USERS: { $type: 2 } }).then(data => {
					output = data[0].WHITELISTED_USERS;
				});
				break;

			default:
				output = `Sorry, you didn't enter a valid option, add, remove, list, or check`;
				break;
		}

		message.channel.send(output);
		return true;
	}

	removeFromArray(array, item) {
		let found = array.indexOf(item);

		while (found !== -1) {
			array.splice(found, 1);
			found = array.indexOf(item);
		}
	}

	addToArray(array, item) {
		array.push(item);
	}
}

module.exports = Command;
