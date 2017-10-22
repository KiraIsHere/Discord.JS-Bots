const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, message) {
		if (message.author.bot) return;
		if (!client.user.bot && !client.ownerIDs.includes(message.author.id)) return;
		if (client.blacklist.includes(message.author.id)) return;

		const args = message.content.split(/\s+/g);

		let commandName = null;
		if (message.content.toLowerCase().indexOf(client.botPrefix) > -1) {
			commandName = args.shift().slice(client.botPrefix.length).toLowerCase();
		} else if (message.content.toLowerCase().indexOf(`${client.botName.toLowerCase()}!`) > -1) {
			commandName = args.shift().slice(`${client.botName.toLowerCase()}!`.length).toLowerCase();
		}

		const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

		if (!command || !command.enabled) return;
		if (client.whitelist.indexOf(message.author.id) > -1) {
			// Stupid fucking javascript
		} else if (client.checkCooldown(message.author.id, commandName)) { return client.send(message, `Cooldown, Please wait ${client.checkCooldownTime(message.author.id, commandName)} seconds from the last use.`); }
		if (command.cooldown) client.addCooldown(message.author.id, commandName, command.cooldownTime, new Date);
		if (message.author === client.user) client.addCooldown(message.author.id, commandName, 1, new Date);

		if (command.limit) {
			const userLimits = client.limits.get(message.author.id);
			if (userLimits) {
				if (userLimits[command.name]) {
					if (userLimits[command.name] >= command.limitAmount) {
						client.addCooldown(message.author.id, commandName, 86400, new Date);
						client.log(`${message.author.username} (${message.author.id}) has been blocked from using ${command.name} for 24 hours for using it more than ${command.limitAmount} times in more than an hour`);
						return client.send(message,
							`You have been temporarily blacklisted from using this command!\n` +
							`You will be un-blacklisted in 24 hours or the next time the bot restarts.`
						);
					} else {
						userLimits[command.name]++;
						setTimeout(() => {
							const userLimitsUpdated = client.limits.get(message.author.id);
							userLimitsUpdated[command.name]--;
							client.limits.set(message.author.id, userLimitsUpdated);
						}, 86400 * 1000);
					}
				} else {
					userLimits[command.name] = 1;
				}
			} else {
				client.limits.set(message.author.id, { [command.name]: 1 });
			}
		}

		command.run(client, message, args);
	}
}

module.exports = Event;
