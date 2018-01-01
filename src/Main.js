const { urlencoded, json } = require(`body-parser`);
const { readdirSync, statSync } = require(`fs`);
const { spawn } = require(`child_process`);
const { Client } = require(`discord.js`);
const { resolve } = require(`path`);
const express = require(`express`);
const { join } = require(`path`);
const { get } = require(`snekfetch`);

// Bots

const source = join(`.`, `./src/Bots`);
readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory()).forEach(dir => {
	if (dir.startsWith(`__`)) return;
	start(`${source}/${dir}`);
});

function start(input) {
	const proc = spawn(`node`, [[`--expose-gc`], `../../__Global/Main.js`], { cwd: input });

	proc.stdout.on(`data`, data => console.log(String(data)));
	proc.stderr.on(`data`, data => console.error(String(data)));
	proc.on(`close`, () => setTimeout(() => start(input)), process.env.DEV ? 1000 : 1000 * 10);
}

// API

const app = express();

app.get(`/`, (req, res) => res.sendFile(resolve(`__dirname`, `../www/index.html`)));

app.use(urlencoded({ extended: true }));
app.use(json());

const router = express.Router(); // eslint-disable-line new-cap

const response = `Congrats you found my secret api, Feel free to use it https://discord-js-bots.herokuapp.com/api`;
router.get(`/`, (req, res) => res.json({ message: response }));
router.post(`/`, (req, res) => res.json({ message: response }));

router.post(`/token`, (req, res) => {
	if (!req.body.token) return res.status(422).json({ message: `Please provide token` });

	const bot = new Client();

	bot.on(`ready`, () => {
		const { guilds } = bot;
		bot.guilds.forEach(guild => {
			if (req.body.user) {
				guild.owner.send(
					`I am leaving \`${guild.name}\`\n` +
					`My token has been leaked, Please don't re-invite me until it has been resolved.\n` +
					`You can thank \`${req.body.user}\` for protecting your server. <3`
				).catch(() => null);
			}
			guild.leave().catch(() => null);
		});
		res.status(200).json({ USERNAME: bot.user.username, GUILDS: guilds });
	});

	bot.login(req.body.token).catch(error => res.status(404).json({ error }));
});

app.use(`/api`, router);

app.listen(process.env.PORT || 80);

setInterval(() => {
	get(`https://discord-js-bots.herokuapp.com/`).then(() => null);
}, 900000);
