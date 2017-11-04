const Commands = require(`../../../../__Global/Structures/Commands`);
const eslintConfig = require(`../../../../../.eslintrc-default.json`);
const { stripIndents } = require(`common-tags`);
const { basename } = require(`path`);
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
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Lint the codeblock in a message`,
			usage: `[Message ID]`,
			aliases: []
		});
	}

	async run(client, message, args, code, pattern, updated) {
		if (!code) {
			if (pattern) return false;
			return message.reply(`Invalid message!`);
		}
		const errors = linter.verify(code.code, eslintConfig);
		if (pattern && updated) {
			if (message.reactions.has(`❌`) && message.reactions.get(`❌`).users.has(this.client.user.id)) await message.reactions.get(`❌`).remove();
			if (message.reactions.has(`✅`) && message.reactions.get(`✅`).users.has(this.client.user.id)) await message.reactions.get(`✅`).remove();
		}
		if (!errors.length) {
			if (pattern) {
				await message.react(`✅`);
				return false;
			}
			return message.reply(`✅`);
		}
		if (pattern) {
			await message.react(`❌`);
			return false;
		}
		let errorMap = errors.map(err => `\`[${err.line}:${err.column}] ${err.message}\``);
		if (errorMap.length > 10) {
			const len = errorMap.length - 10;
			errorMap = errorMap.slice(0, 10);
			errorMap.push(`...${len} more.`);
		}
		client.send(message, stripIndents`${errorMap.join(`\n`)}`);
		return true;
	}
}

module.exports = Command;
