const Commands = require(`../Structures/Commands`);
const { MessageEmbed, version } = require(`discord.js`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { homepage } = require(`../../../package.json`);
const { execSync } = require(`child_process`);
const { parse } = require(`path`);
const { type, release, uptime } = require(`os`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: true,
			cooldownTime: 30,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Shows bot & OS info`,
			usage: `BotInfo`,
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

				.addField(`Node (NPM) Versions`, `${process.version} (${String(execSync(`npm -v`)).replace(`\n`, ``)})`, true)
				.addField(`Discord.JS Version`, version, true)
				.addField(`OS Type (Release)`, `${type} v${release}`, true)

				.addField(`OS Uptime`, `${client.formatTime(uptime)}`, true)
				.addField(`OS CPU Usage`, `${await cpuLoad()}% used`, true)
				.addField(`OS RAM Usage`, `${await memoryUsage()}${process.env.LOCAL ? `% used of 8GB` : `% used of 512MB`}`, true)

				.addField(`Bot Uptime`, client.formatTime(process.uptime()), true)
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
	}
}

module.exports = Command;
