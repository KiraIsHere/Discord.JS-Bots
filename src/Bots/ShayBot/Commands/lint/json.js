const Commands = require(`../../../../__Global/Structures/Commands`);
const json = require(`eslint-plugin-json`).processors[`.json`];
const { stripIndents } = require(`common-tags`);
const { Linter } = require(`eslint`);
const linter = new Linter();

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
			usage: `[Required] (Optional)`,
			aliases: []
		});
	}

	async run(client, message, code, pattern, updated) {
		if (!code) {
			if (pattern) return null;
			return message.reply(`Invalid message!`);
		}
		if (code.lang && code.lang !== `json`) {
			if (pattern) return null;
			return message.reply(`Only \`json\` codeblocks should be linted with this command.`);
		}
		const errors = linter.verify(code.code, undefined, {
			filename: `file.json`,
			preprocess: json.preprocess,
			postprocess: json.postprocess
		});
		if (pattern && updated) {
			if (message.reactions.has(`❌`) && message.reactions.get(`❌`).users.has(client.user.id)) {
				await message.reactions.get(`❌`).remove();
			}
			if (message.reactions.has(`✅`) && message.reactions.get(`✅`).users.has(client.user.id)) {
				await message.reactions.get(`✅`).remove();
			}
		}
		if (!errors.length) {
			if (pattern) {
				await message.react(`✅`);
				return null;
			}
			return message.reply(`✅`);
		}
		const errorMap = this.trimArray(errors.map(err => `\`[${err.line}:${err.column}] ${err.message}\``));
		if (pattern) {
			await message.react(`❌`);
			const filter = (reaction, user) => user.id === message.author.id && reaction.emoji.id === `❌`;
			const reactions = await message.awaitReactions(filter, {
				max: 1,
				time: 30000
			});
			if (!reactions.size) return null;
		}
		return message.reply(stripIndents`❌ ${errorMap.join(`\n`)}`);
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}
}

module.exports = Command;
