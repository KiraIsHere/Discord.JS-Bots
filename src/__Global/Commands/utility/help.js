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
			description: `Displays all the commands`,
			usage: `(Command)`,
			aliases: [`?`]
		});
	}

	run(client, message, args) {
		if (args[0]) {
			if (args[0] === `command`) {
				if (!client.cmds.commands.has(args[1])) return false;

				const command = client.cmds.commands.get(args[1]);
				message.channel.send(`= ${client.upperCase(command.name)} = \ndescription :: ${command.description}\nusage       :: ${client.botPrefix}${client.upperCase(command.name)} ${command.usage}`, {
					code: `asciidoc`,
					split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
				});
				return true;
			}

			const groupCommands = client.cmds.commands.filter(c => c.group === args[0] && c.show === true).sort();
			if (groupCommands.size === 0) return false;
			const commandNames = groupCommands.keyArray();
			const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

			message.channel.send(`= Command List =\n\n[Use ${client.botPrefix}help command [commandname] for details]\n\n${groupCommands.map(c => `${client.upperCase(c.name)}${` `.repeat(longest - c.name.length)} :: ${c.description}`).join(`\n`)}`, {
				code: `asciidoc`,
				split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
			});

			return true;
		}

		message.channel.send(`= Group List =\n\n[Use ${client.botPrefix}help [groupname] for details]\n\n${client.groups.join(`\n`)}`, {
			code: `asciidoc`,
			split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
		});
		return true;
	}
}

module.exports = Command;
