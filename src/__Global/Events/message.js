/* eslint complexity: off */
const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client, message) {
		if (message.author.bot) return false;
		if (!client.user.bot && !client.ownerIDs.includes(message.author.id)) return false;
		if (client.blacklist.includes(message.author.id)) return false;

		const args = message.content.split(/\s+/g);

		let commandName = null;
		if (message.content.toLowerCase().indexOf(client.botPrefix) > -1) {
			commandName = args.shift().slice(client.botPrefix.length).toLowerCase();
		} else if (message.content.toLowerCase().indexOf(`${client.botName.toLowerCase()}!`) > -1) {
			commandName = args.shift().slice(`${client.botName.toLowerCase()}!`.length).toLowerCase();
		}

		const command = client.cmds.commands.get(commandName) || client.cmds.commands.get(client.cmds.aliases.get(commandName));

		if (!command || !command.enabled) return false;
		if (client.whitelist.indexOf(message.author.id) > -1) {
			// Can't just if (!) because it doesn't work that way
		} else if (client.checkCooldown(message.author.id, commandName)) {
			return client.send(message, `Cooldown, Please wait ${client.formatTime(client.checkCooldownTime(message.author.id, commandName), true)}`);
		}

		try {
			if (!command.run(client, message, args)) return false;
		} catch (error) {
			client.send(message, error, { code: `` });
		}

		if (command.cooldown) {
			const userLimits = client.cmds.usages.get(message.author.id);
			if (userLimits) {
				if (userLimits[command.name]) {
					if (userLimits[command.name] >= command.cooldownAmount) {
						client.addCooldown(message.author.id, commandName, command.cooldownTime, new Date);
					} else {
						userLimits[command.name]++;
						setTimeout(() => {
							const userLimitsUpdated = client.cmds.usages.get(message.author.id);
							userLimitsUpdated[command.name]--;
							client.cmds.usages.set(message.author.id, userLimitsUpdated);
						}, command.cooldownTime * 1000);
					}
				} else {
					userLimits[command.name] = 1;
				}
			} else {
				client.cmds.usages.set(message.author.id, { [command.name]: 1 });
			}
		}

		if (command.limit) {
			const userLimits = client.cmds.usages.get(message.author.id);
			if (userLimits) {
				if (userLimits[command.name]) {
					if (userLimits[command.name] >= command.limitAmount) {
						client.addCooldown(message.author.id, commandName, 86400, new Date);
						client.log(`${message.author.username} (${message.author.id}) has been blocked from using ${command.name} for 24 hours for using it more than ${command.limitAmount} times in more than an hour`);
						client.send(message,
							`You have been temporarily blacklisted from using this command!\n` +
							`You will be un-blacklisted in 24 hours or the next time the bot restarts.`
						);
					} else {
						userLimits[command.name]++;
						setTimeout(() => {
							const userLimitsUpdated = client.cmds.usages.get(message.author.id);
							userLimitsUpdated[command.name]--;
							client.cmds.usages.set(message.author.id, userLimitsUpdated);
						}, command.limitTime * 1000);
					}
				} else {
					userLimits[command.name] = 1;
				}
			} else {
				client.cmds.usages.set(message.author.id, { [command.name]: 1 });
			}
		}

		if (message.author === client.user) client.addCooldown(message.author.id, commandName, 1, new Date);
		return true;
	}
}

module.exports = Event;
