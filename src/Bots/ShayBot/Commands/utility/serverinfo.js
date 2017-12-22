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
			description: `Shows server info`,
			usage: ``,
			aliases: [`server`]
		});
	}

	async run(client, message) {
		const { guild } = message;
		await guild.members.fetch();

		client.send(message,
			`= Server Info =\n` +
			`\n` +
			`Owner\n` +
			`• Name               :: ${guild.owner.user.username}\n` +
			`• Nickname           :: ${guild.owner.nickname ? guild.owner.nickname : `No Nickname`}\n` +
			`• ID                 :: ${guild.owner.id}\n` +
			`• Creation Date      :: ${guild.owner.user.createdAt}\n` +
			`\n` +
			`Guild\n` +
			`• Name               :: ${guild.name}\n` +
			`• ID                 :: ${guild.id}\n` +
			`• Creation Date      :: ${guild.createdAt}\n` +
			`• Verification Level :: ${this.resolveVerificationLevel(guild.verificationLevel)}\n` +
			`• Explicit Level     :: ${this.resolveExplicitLevel(guild.explicitContentFilter)}\n` +
			`• Voice Region       :: ${guild.region.toUpperCase()}\n` +
			`• Categories         :: ${this.getChannelTypeSize(guild.channels, `category`)}\n` +
			`• Text Channels      :: ${this.getChannelTypeSize(guild.channels, `text`)}\n` +
			`• Voice Channels     :: ${this.getChannelTypeSize(guild.channels, `voice`)}\n` +
			`• Total Members      :: ${client.formatNumbers(guild.members.size)}\n` +
			`• Users              :: ${client.formatNumbers(guild.members.filter(member => !member.user.bot).size)}\n` +
			`• Bots               :: ${client.formatNumbers(guild.members.filter(member => member.user.bot).size)}\n` +
			`• Emojis             :: ${guild.emojis.size}\n` +
			`• Roles              :: ${await client.haste(guild.roles.map(role => `${role.name}`).sort().join(`\n`).replace(/@/g, ``))}`,
			{ code: `asciidoc` }
		);
		return true;
	}

	resolveVerificationLevel(level) {
		return level.toString()
			.replace(`0`, `None`)
			.replace(`1`, `Low`)
			.replace(`2`, `Medium`)
			.replace(`3`, `(╯°□°）╯︵ ┻━┻`)
			.replace(`4`, `┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻`);
	}

	resolveExplicitLevel(level) {
		return level.toString()
			.replace(`0`, `Scan nobody`)
			.replace(`1`, `Scan members without role`)
			.replace(`2`, `Scan everyone`);
	}

	getChannelTypeSize(channels, type) {
		return channels.filter(channel => channel.type === type).size;
	}
}

module.exports = Command;
