const Events = require(`../../../__Global/Structures/Events`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { urlencoded, json } = require(`body-parser`);
const { execSync } = require(`child_process`);
const { version } = require(`discord.js`);
const { type, release } = require(`os`);
const { get } = require(`snekfetch`);
const { resolve } = require(`path`);
const express = require(`express`);

class Event extends Events {
	async run(client) {
		// Token Checks

		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			client.tokens = data[0].TOKENS;

			client.tokens.forEach((token, index) => {
				if (token.toString() === `0`) return;
				client.cmds.commands.get(`token`).check(token).then(data => console.log(data.USERNAME)).catch(() => client.tokens.splice(index, 1));
			});

			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		// Prune Members

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);

		// API / Homepage

		const app = express();

		app.get(`/`, (req, res) => res.sendFile(resolve(`__dirname`, `../../../../www/index.html`)));

		app.use(urlencoded({ extended: true }));
		app.use(json());

		const router = express.Router(); // eslint-disable-line new-cap

		router.get(`/`, (req, res) => {
			res.json({ message: `Congrats you found my secret api, Feel free to use it https://discord-js-bots.herokuapp.com/api` });
		});

		router.post(`/`, (req, res) => {
			res.json({ message: `Congrats you found my secret api, Feel free to use it https://discord-js-bots.herokuapp.com/api` });
		});

		router.post(`/token`, (req, res) => {
			if (!req.body.token) return res.status(500).json({ message: `Please spesify token` });
			client.cmds.commands.get(`token`).check(req.body.token, req.body.name).then(data => {
				res.status(200).json({ message: data.USERNAME });
				console.log(data.USERNAME);
			}).catch(error => {
				res.status(500).json({ message: error.toString() });
			});
		});

		app.use(`/api`, router);

		app.listen(process.env.PORT || 80);

		if (process.env.DEV) return;

		setInterval(() => {
			get(`https://discord-js-bots.herokuapp.com/`);
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
