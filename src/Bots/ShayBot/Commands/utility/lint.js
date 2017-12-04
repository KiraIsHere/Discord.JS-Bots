const Commands = require(`../../../../__Global/Structures/Commands`);
const config = require(`../../../../../.eslintrc-default.json`);
const { stripIndents } = require(`common-tags`);
const { Linter } = require(`eslint`);
const linter = new Linter();

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: false,
			show: false,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			description: `Lint the codeblock in a message`,
			usage: `[Message ID]`,
			aliases: []
		});
		this.codeblock = /```(?:(js|javascript)\n)?\s*([^]+?)\s*```/i;
	}

	async run(client, message, code, pattern, updated) {
		if (!code) {
			if (pattern) return false;
			return client.send(message, `Invalid message!`);
		}
		const errors = linter.verify(code.code, config);
		if (pattern && updated) {
			if (message.reactions.has(`❌`) && message.reactions.get(`❌`).users.has(this.client.user.id)) {
				await message.reactions.get(`❌`).remove();
			}
			if (message.reactions.has(`✅`) && message.reactions.get(`✅`).users.has(this.client.user.id)) {
				await message.reactions.get(`✅`).remove();
			}
		}
		if (!errors.length) {
			if (pattern) {
				await message.react(`✅`);
				return true;
			}
			client.send(message, `✅`);
			return true;
		}
		let errorMap = errors.map(err => `\`[${err.line}:${err.column}] ${err.message}\``);
		if (errorMap.length > 10) {
			const len = errorMap.length - 10;
			errorMap = errorMap.slice(0, 10);
			errorMap.push(`...${len} more.`);
		}
		if (pattern) {
			await message.react(`❌`);
			const filter = (reaction, user) => user.id === message.author.id && reaction.emoji.name === `❌`;
			const reactions = await message.awaitReactions(filter, {
				max: 1,
				time: 30000
			});
			if (!reactions.size) return false;
		}
		client.send(message, stripIndents`${errorMap.join(`\n`)}`);
		return true;
	}

	check(client, message, updated) {
		if (message.channel.type !== `text` || message.author.bot) return false;
		if (!this.codeblock.test(message.content)) return false;
		if (!message.channel.permissionsFor(message.client.user).has([`ADD_REACTIONS`, `READ_MESSAGE_HISTORY`])) return false;
		const parsed = this.codeblock.exec(message.content);
		const code = {
			code: parsed[2],
			lang: parsed[1]
		};
		this.run(client, message, code, true, updated).catch(error => client.error(error));
		return true;
	}
}

module.exports = Command;
