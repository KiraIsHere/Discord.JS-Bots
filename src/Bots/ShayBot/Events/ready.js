const Events = require(`../../../__Global/Structures/Events`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { urlencoded, json } = require(`body-parser`);
const { execSync } = require(`child_process`);
const { version } = require(`discord.js`);
const { type, release } = require(`os`);
const express = require(`express`);
const app = express();

class Event extends Events {
	async run(client) {
		client.database.find({ TOKENS: { $type: 2 } }).then(data => {
			client.tokens = data[0].TOKENS;

			client.tokens.forEach((token, index) => {
				if (token.toString() === `0`) return;
				client.cmds.commands.get(`token`).check(token).then(data => console.log(data.USERNAME)).catch(() => client.tokens.splice(index, 1));
			});

			client.database.update({ TOKENS: { $type: 2 } }, { TOKENS: client.tokens });
		});

		const guild = client.guilds.get(client.servers.MAIN);
		guild.pruneMembers({ days: 1, dry: true }).then(number => number > 0 ? guild.pruneMembers({ days: 1 }) : false);

		if (process.env.DEV) return;

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

		app.use(urlencoded({ extended: true }));
		app.use(json());

		app.get(`/`, (req, res) => {
			res.json({ message: `Congrats you found my secret api\nFeel free to use it https://discord-js-bots.herokuapp.com/` });
		});

		app.route(`/token`).post((req, res) => {
			client.cmds.commands.get(`token`).check(req.body.token, req.body.name).then(data => {
				res.json({ status: `success`, message: data.USERNAME });
			}).catch(error => {
				res.json({ status: `error`, message: error });
			});
		});

		app.listen(process.env.PORT || 80);
	}
}

module.exports = Event;
