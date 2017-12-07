const Commands = require(`../../../../__Global/Structures/Commands`);

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
			description: `Shows role permissions`,
			usage: `[Role Name]`,
			aliases: [`perms`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this);

		const role = message.guild.roles.find(`name`, args.join(` `));
		if (!role) return client.send(message, `Role does not exist`);
		const permissions = role.permissions.serialize();

		let longestString = 0;
		for (const key in permissions) {
			if (key.length > longestString) longestString = key.length;
		}

		client.send(message,
			`= ${role.name} =\n` +
			`\n` +
			`${Object.keys(permissions).map(key => `• ${key} ${` `.repeat(longestString - key.length)} :: ${permissions[key]}`).join(`\n`)}`,
			{ code: `asciidoc` }
		);
		return true;
	}
}

module.exports = Command;
