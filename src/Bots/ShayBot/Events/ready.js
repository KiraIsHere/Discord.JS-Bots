const Events = require(`../../../__Global/Structures/Events`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { execSync } = require(`child_process`);
const { version } = require(`discord.js`);
const { type, release } = require(`os`);
const { post, get } = require(`snekfetch`);


class Event extends Events {
	async run(client) {
		// Token Checks

		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			client.tokens = data[0].TOKENS;

			client.tokens.forEach((token, index) => {
				if (token.toString() === `0`) return;
				post(`${client.apiURL}/api/token`, { headers: { "Content-Type": `application/json` } }).send({ token }).then(data => console.log(data.body.USERNAME)).catch(() => client.tokens.splice(index, 1));
			});

			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		// Prune Members

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);

		if (process.env.DEV) return;

		setInterval(() => {
			get(`https://discord-js-bots.herokuapp.com/`).then(() => null);
		}, 900000);

		// Statistics Channel

		const channel = client.guilds.get(client.servers.MAIN).channels.find(`name`, `statistics`);
		channel.messages.fetch().then(messages => messages.map(message => message.delete()));
		const usedMemory = await memoryUsage();
		const maxMemory = process.env.DEV ? 8096 : 512;

		channel.send(
			`= STATISTICS =\n` +

			`\nVersions\n` +
			`• Discord.js       :: ${version}\n` +
			`• Node             :: ${process.version}\n` +
			`• NPM              :: ${String(execSync(`npm -v`)).replace(`\n`, ``)}\n` +

			`\nSystem\n` +
			`• OS Type          :: ${String(type).replace(`_`, ` `)} v${release}\n` +
			`• System CPU Usage :: ${await cpuLoad()}%\n` +
			`• System RAM Usage :: ${usedMemory}% (${Math.round((usedMemory / 100) * maxMemory)} MB / ${process.env.DEV ? `8 GB` : `512 MB`})\n`,
			{ code: `asciidoc` }
		);
	}
}

module.exports = Event;
