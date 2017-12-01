const Commands = require(`../../Structures/Commands`);
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
			group: basename(__dirname, `.js`),
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
				message.channel.send(`= ${client.upperCase(command.name)} = \ndescription :: ${command.description}\nusage       :: ${command.usage}`, {
					code: `asciidoc`,
					split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
				});
				return true;
			}

			const groupCommands = client.cmds.commands.filter(c => c.group === args[0]);
			if (groupCommands.size === 0) return false;
			const commandNames = groupCommands.keyArray();
			const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

			message.channel.send(`= Command List =\n\n[Use ${client.botPrefix}help command [commandname] for details]\n\n${groupCommands.map(c => c.show ? `${client.upperCase(c.name)}${` `.repeat(longest - c.name.length)} :: ${c.description}` : null).join(`\n`)}`, {
				code: `asciidoc`,
				split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
			});

			return true;
		}

		const groups = [];
		for (const command of client.cmds.commands.values()) {
			if (!command.group.startsWith(`_`)) break;
			if (!groups.includes(command.group)) break;
			groups.push(command.group);
		}

		message.channel.send(`= Group List =\n\n[Use ${client.botPrefix}help [groupname] for details]\n\n${groups.join(`\n`)}`, {
			code: `asciidoc`,
			split: { prepend: `\`\`\`asciidoc\n`, append: `\`\`\`` }
		});
		return true;
	}
}

module.exports = Command;
