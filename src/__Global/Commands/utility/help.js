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
		let content;
		if (args.length < 1) {
			const longest = Array.from(client.cmds.commands.keys()).reduce((long, str) => Math.max(long, str.length), 0);
			content = `${client.cmds.commands.sort().map(c => c.show ? `${c.name}${` `.repeat(longest - c.name.length)} :: ${c.description}\n` : null).join(``)}`;
		} else {
			let command = args[0];
			if (client.cmds.commands.has(command)) {
				command = client.cmds.commands.get(command);
				content =
					`= ${command.name} = \n` +
					`${command.description}\n` +
					`usage::${command.name.charAt(0).toUpperCase() + command.name.slice(1)} ${command.usage}`;
			}
		}
		client.send(message, content, { code: `asciidoc` });
		return true;
	}
}

module.exports = Command;
