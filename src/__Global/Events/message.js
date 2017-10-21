const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, message) {
		if (message.author.bot) return;
		if (!client.user.bot && !client.ownerIDs.includes(message.author.id)) return;
		if (client.blacklist.includes(message.author.id) || client.inMemBlacklist.includes(message.author.id)) return;

		const args = message.content.split(/\s+/g);
		let commandName = null;

		if (message.content.toLowerCase().indexOf(client.botPrefix) > -1) {
			commandName = args.shift().slice(client.botPrefix.length).toLowerCase();
		} else if (message.content.toLowerCase().indexOf(`${client.botName.toLowerCase()}!`) > -1) {
			commandName = args.shift().slice(`${client.botName.toLowerCase()}!`.length).toLowerCase();
		}

		const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

		if (!command) return;
		if (!command.enabled) return;
		if (!client.whitelist.indexOf(message.author.id) > -1 && client.checkCooldown(message.author.id, commandName)) return client.send(message, `Cooldown, Please wait ${client.checkCooldownTime(message.author.id, commandName)} seconds from the last use.`);
		if (command.cooldown) client.addCooldown(message.author.id, commandName, command.cooldownTime, new Date);
		if (message.author === client.user) client.addCooldown(message.author.id, commandName, 1, new Date);
		if (command.limit) {
			const userLimits = client.limits.get(message.author.id);
			if (userLimits) {
				if (userLimits[command.name]) {
					if (userLimits[command.name] >= command.limitAmount) {
						client.inMemBlacklist.push(message.author.id);
						client.log(`${message.author.username} (${message.author.id}) has been blocked from ${command.name} for using it ${command.limitAmount} in less than an hour`);
						return client.send(message, `You have been temporarily blacklisted due to overusing this command!`);
					} else {
						userLimits[command.name]++;
						setTimeout(() => {
							const userLimitsUpdated = client.limits.get(message.author.id);
							userLimitsUpdated[command.name]--;
							client.limits.set(message.author.id, userLimitsUpdated);
						}, 3600000);
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
