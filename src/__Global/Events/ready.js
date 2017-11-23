const Events = require(`../Structures/Events`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { type, release, uptime } = require(`os`);
const { execSync } = require(`child_process`);
const { version } = require(`discord.js`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		if (client.user.bot) client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`}`);

		client.database.find({ BLACKLISTED_USERS: { $type: 2 } }).then(data => {
			client.blacklist = data[0].BLACKLISTED_USERS;
		});

		client.database.find({ WHITELISTED_USERS: { $type: 2 } }).then(data => {
			client.whitelist = data[0].WHITELISTED_USERS;
		});

		if (global.gc) {
			setInterval(() => {
				global.gc();
			}, 1000 * 60);
		} else {
			console.log(`You must run node with --expose-gc`);
		}

		if (client.user.id !== `361541917672210433`) return true;

		const channel = client.guilds.get(client.guild).channels.find(`name`, `statistics`);
		channel.messages.fetch().then(messages => {
			messages.delete();
			channel.send(`Starting...`).then(message => {
				message.delete().then(() => edit());
				async function edit() {
					const usedMemory = await memoryUsage();
					const maxMemory = process.env.LOCAL ? 8096 : 512;

					message.edit(
						`= STATISTICS =\n` +

						`\nVersions\n` +
						`• Discord.js       :: ${version}\n` +
						`• Node             :: ${process.version}\n` +
						`• NPM              :: ${String(execSync(`npm -v`)).replace(`\n`, ``)}\n` +

						`\nSystem\n` +
						`• Uptime           :: ${client.formatTime(process.env.LOCAL ? uptime : process.uptime)}\n` +
						`• OS Type          :: ${String(type).replace(`_`, ` `)} v${release}\n` +
						`• System CPU Usage :: ${await cpuLoad()}%\n` +
						`• System RAM Usage :: ${usedMemory}% (${Math.round((usedMemory / 100) * maxMemory)} MB / ${process.env.LOCAL ? `8 GB` : `512 MB`})\n`,
						{ code: `asciidoc` }
					);

					setTimeout(() => edit(), 1000 * 60 * 10);
				}
				return true;
			});
		});
		return true;
	}
}

module.exports = Event;
