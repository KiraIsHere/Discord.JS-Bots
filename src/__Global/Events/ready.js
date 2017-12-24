const Events = require(`../Structures/Events`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { type, release, uptime } = require(`os`);
const { execSync } = require(`child_process`);
const { version } = require(`discord.js`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		client.updateActivity();

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

		if (client.user.id !== `361541917672210433`) return;

		const channel = client.guilds.get(client.servers.MAIN).channels.find(`name`, `statistics`);
		channel.messages.fetch().then(messages => messages.map(message => message.delete()));
		channel.send(`Starting...`).then(message => {
			edit().catch(error => client.error(error));
			async function edit() {
				const usedMemory = await memoryUsage();
				const maxMemory = process.env.DEV ? 8096 : 512;

				message.edit(
					`= STATISTICS =\n` +

					`\nVersions\n` +
					`• Discord.js       :: ${version}\n` +
					`• Node             :: ${process.version}\n` +
					`• NPM              :: ${String(execSync(`npm -v`)).replace(`\n`, ``)}\n` +

					`\nSystem\n` +
					`• Uptime           :: ${client.formatTime(process.env.DEV ? uptime : process.uptime())}\n` +
					`• OS Type          :: ${String(type).replace(`_`, ` `)} v${release}\n` +
					`• System CPU Usage :: ${await cpuLoad()}%\n` +
					`• System RAM Usage :: ${usedMemory}% (${Math.round((usedMemory / 100) * maxMemory)} MB / ${process.env.DEV ? `8 GB` : `512 MB`})\n`,
					{ code: `asciidoc` }
				);

				setTimeout(() => edit(), 1000 * 60 * 10);
			}

		});

	}
}

module.exports = Event;
