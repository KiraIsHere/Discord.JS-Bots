const { Client, MessageEmbed, Collection } = require(`discord.js`);
const { readdirSync, statSync } = require(`fs`);
const { sep, resolve } = require(`path`);
const { post } = require(`snekfetch`);
const { inspect } = require(`util`);
const Database = require(`./Database`);
const moment = require(`moment`);

class CustomClient extends Client {
	constructor(options) {
		super(options);
		this.blacklist = [];
		this.botName = resolve(`.`).split(sep).slice(-1).toString();
		this.botPrefix = `${this.botName.toLowerCase().charAt(0)}!`;
		this.cmds = {
			aliases: new Collection(),
			commands: new Collection(),
			usages: new Collection()
		};
		this.cooldown = [];
		this.database = new Database;
		this.groups = [];
		this.ownerIDs = [`358558305997684739`];
		this.servers = {
			MAIN: `361532026354139156`,
			TEST: `382223688118042625`
		};
		this.whitelist = [];
	}

	console(input, type) {
		this.guilds.get(this.servers.MAIN).channels.find(`name`, `console`).send(new MessageEmbed()
			.setDescription(input)
			.setColor(type === `Log` ? 0x00FF00 : 0xFF0000)
			.setFooter(`${type} | ${this.botName}`)
			.setTimestamp()
		);
	}

	log(input) {
		console.log(input);
		if (process.env.LOCAL) return false;
		this.console(input, `Log`);
		return true;
	}

	error(input) {
		console.error(input);
		if (process.env.LOCAL) return false;
		this.console(input, `Error`);
		return true;
	}

	warn(input) {
		console.warn(input);
		if (process.env.LOCAL) return false;
		this.console(input, `Warn`);
		return true;
	}

	addCooldown(userID, commandName, time, date) {
		this.cooldown.push({ ID: userID, COMMAND: commandName, TIME: time, DATE: date });
		this.removeCooldown(userID, commandName, time);
	}

	removeCooldown(userID, commandName, time) {
		let index = null;
		for (let i = 0; i < this.cooldown.length; i++) {
			if (this.cooldown[i].ID === userID && this.cooldown[i].COMMAND === commandName) {
				index = i;
				break;
			}
		}

		setTimeout(() => {
			this.cooldown = this.cooldown.splice(index, 0);
		}, time * 1000);
	}

	checkCooldown(userID, commandName) {
		let returnValue = false;
		for (let i = 0; i < this.cooldown.length; i++) {
			if (this.cooldown[i].ID === userID && this.cooldown[i].COMMAND === commandName) returnValue = true;
		}
		return returnValue;
	}

	checkCooldownTime(userID, commandName) {
		let returnValue = false;
		for (let i = 0; i < this.cooldown.length; i++) {
			if (this.cooldown[i].ID === userID && this.cooldown[i].COMMAND === commandName) returnValue = (moment(this.cooldown[i].DATE).add(this.cooldown[i].TIME, `seconds`) - new Date).toString().slice(0, -3);
		}
		return returnValue;
	}

	haste(input) {
		return post(`https://www.hastebin.com/documents`).send(String(input))
			.then(data => `https://www.hastebin.com/${data.body.key}.js`)
			.catch(error => `\`\`\`js\n${error}\n\`\`\`\n`);
	}

	send(message, ...content) {
		return new Promise((resolve, reject) => {
			if (message.author !== this.user) {
				message.channel.send(...content).then(message => resolve(message)).catch(error => reject(error));
			} else {
				setTimeout(() => {
					message.edit(...content).then(message => resolve(message)).catch(error => reject(error));
				}, 500);
			}
		});
	}

	missingArgs(message, command, customMessage) {
		this.send(message,
			`❌ Invalid Arguments\n` +
			`\`\`\`\n${this.upperCase(command.name)} ${customMessage ? customMessage : command.usage}\n\`\`\``
		);
	}

	upperCase(input) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	}

	clean(input) {
		const SECRET = `[SECRET!]`;
		if (typeof input !== `string`) { input = inspect(input, { depth: 0 }); }
		input = input
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);

		for (const env in process.env) {
			if (env.includes(`WEBHOOK_`)) input = input.replace(process.env[env], SECRET);
			if (env.includes(`_API`)) input = input.replace(process.env[env], SECRET);
		}

		isDirectory(resolve(`../../Bots`)).forEach(dir => {
			if (dir.startsWith(`_`)) return false;
			input = input.replace(process.env[dir], SECRET);
			return true;
		});

		function isDirectory(source) {
			return readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory());
		}

		return input;
	}

	formatTime(input, toggle) {
		const days = Math.floor(input / 86400);
		const hours = Math.floor((input % 86400) / 3600);
		const minutes = Math.floor(((input % 86400) % 3600) / 60);
		const seconds = Math.floor(((input % 86400) % 3600) % 60);

		const output = [];

		let dayStr = `d`;
		let hourStr = `h`;
		let minuteStr = `m`;
		let secondStr = `s`;

		if (toggle) {
			dayStr = ` days`;
			hourStr = ` hours`;
			minuteStr = ` minutes`;
			secondStr = ` seconds`;
		}

		if (days > 0) output.push(`${days}${dayStr}`);
		if (hours > 0) output.push(`${hours}${hourStr}`);
		if (minutes > 0) output.push(`${minutes}${minuteStr}`);
		if (seconds > 0) output.push(`${seconds}${secondStr}`);

		return output.join(` `);
	}

	formatNumbers(input) {
		return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
	}

	// formatBytes(input) {
	// 	const sizes = [`Bytes`, `KB`, `MB`, `GB`, `TB`];
	// 	if (input === 0) return `0 Bytes`;
	// 	const i = parseInt(Math.floor(Math.log(input) / Math.log(1024)));
	// 	return `${Math.round(input / Math.pow(1024, i), 2)} ${sizes[i]}`;
	// }

	defaultChannel(guild) {
		return guild.channels
			.filter(c => c.type === `text` &&
					c.permissionsFor(guild.me).has(`SEND_MESSAGES`))
			.sort()
			.first();
	}

	updateActivity() {
		if (this.user.bot) this.user.setActivity(`${this.botPrefix}help | ${this.guilds.size} ${this.guilds.size > 1 ? `Guilds` : `Guild`} | By Shayne Hartford (ShayBox)`).catch(error => this.error(error));
	}
}

module.exports = CustomClient;
