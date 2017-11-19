const Commands = require(`../../Structures/Commands`);
const { MessageEmbed, version } = require(`discord.js`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { homepage } = require(`../../../../package.json`);
const { execSync } = require(`child_process`);
const { basename } = require(`path`);
const { type, release, uptime } = require(`os`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: true,
			cooldownAmount: 1,
			cooldownTime: 30,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			group: basename(__dirname, `.js`),
			description: `Shows bot & OS info`,
			usage: ``,
			aliases: [`bot`]
		});
	}

	run(client, message) {
		if (!client.user.bot) message.delete({ timeout: 500 });

		message.channel.send(`Loading...`).then(async sent => {
			let memberCount = 0;
			client.guilds.forEach(guild => {
				memberCount += guild.memberCount;
			});

			const usedMemory = await memoryUsage();
			const maxMemory = process.env.LOCAL ? 8096 : 512;

			sent.edit(new MessageEmbed()
				.setAuthor(`GitHub Repo`, `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png`)
				.setTitle(homepage)

				.addField(`Node (NPM)`, `${process.version} (${String(execSync(`npm -v`)).replace(`\n`, ``)})`, true)
				.addField(`Discord.JS`, version, true)
				.addField(`OS Type`, `${type} v${release}`, true)

				.addField(`System Uptime`, client.formatTime(process.env.LOCAL ? uptime : process.uptime()), true)
				.addField(`System CPU Usage`, `${await cpuLoad()}%`, true)
				.addField(`System RAM Usage`, `${usedMemory}% (${Math.round((usedMemory / 100) * maxMemory)} MB / ${process.env.LOCAL ? `8 GB` : `512 MB`})`, true)

				.addField(`Bot Uptime`, client.formatTime(process.uptime()), true)
				.addField(`Heartbeat Ping`, `${Math.round(client.ping)}ms`, true)
				.addField(`Message Ping`, `${Math.round(sent.createdTimestamp - message.createdTimestamp)}ms`, true)

				.addField(`Guilds`, client.guilds.size, true)
				.addField(`Members`, client.formatNumbers(memberCount), true)
				.addField(`Emojis`, client.formatNumbers(memberCount), true)

				.addField(`Text`, client.formatNumbers(client.channels.filter(channel => channel.type === `text`).size), true)
				.addField(`Voice`, client.formatNumbers(client.channels.filter(channel => channel.type === `voice`).size), true)
				.addField(`Categories`, client.formatNumbers(client.channels.filter(channel => channel.type === `category`).size), true)

				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp()
			);
		});
		return true;
	}
}

module.exports = Command;
