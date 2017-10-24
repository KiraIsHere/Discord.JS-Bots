const Commands = require(`../Structures/Commands`);
const { MessageEmbed, version } = require(`discord.js`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { homepage } = require(`../../../package.json`);
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

			const embed = new MessageEmbed()
				.setAuthor(`GitHub Repo`, `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png`)
				.setTitle(homepage)

				.addField(`Node (NPM)`, `${process.version} (${String(execSync(`npm -v`)).replace(`\n`, ``)})`, true)
				.addField(`Discord.JS`, version, true)
				.addField(`OS Type`, `${type} v${release}`, true)

				.addField(`System Uptime`, client.formatTime(process.env.LOCAL ? uptime : process.uptime()), true)
				.addField(`System CPU Usage`, `${await cpuLoad()}% used`, true)
				.addField(`System RAM Usage`, `${await memoryUsage()}% used of ${process.env.LOCAL ? `8GB` : `512MB`}`, true)

				.addField(`${client.botName} Uptime`, client.formatTime(process.uptime()), true)
				.addField(`Heartbeat Ping`, `${Math.round(client.ping)}ms`, true)
				.addField(`Message Ping`, `${Math.round(sent.createdTimestamp - message.createdTimestamp)}ms`, true)

				.addField(`Guilds`, client.guilds.size, true)
				.addField(`Channels`, client.formatNumbers(client.channels.size), true)
				.addField(`Members`, client.formatNumbers(memberCount), true)

				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp();
			sent.edit({ embed });
		});
		return true;
	}
}

module.exports = Command;
