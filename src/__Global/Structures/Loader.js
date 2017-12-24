const { readdir } = require(`fs`);
const { walk } = require(`file`);
const { join, resolve } = require(`path`);

class Util {
	async init(client) {
		await this.localCommands(client);
		await this.globalCommands(client);
		await this.localEvents(client);
		await this.globalEvents(client);
	}

	localCommands(client) {
		return new Promise((res, rej) => {
			walk(join(`.`, `./Commands/`), (error, dirPath, dirs) => {
				if (error) rej(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) rej(error);
						files.forEach(file => {
							if (file.split(`.`).slice(-1)[0] !== `js`) return;
							const Name = file.split(`.`)[0];
							const Group = dir.replace(dirPath, ``);
							const CommandClass = require(join(resolve(`.`), `/Commands/${Group}/${file}`));
							const Command = new CommandClass(client);
							client.cmds.commands.set(Name, Command);
							Command.name = Name;
							Command.group = Group;
							Command.aliases.forEach(alias => { // eslint-disable-line max-nested-callbacks
								client.cmds.aliases.set(alias, Name);
							});
							if (!client.groups.includes(Group) && !Group.startsWith(`_`)) client.groups.push(Group);
						});
					});
				});
				res();
			});
		});
	}

	globalCommands(client) {
		return new Promise((res, rej) => {
			walk(join(__dirname, `../Commands/`), (error, dirPath, dirs) => {
				if (error) rej(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) rej(error);
						files.forEach(file => {
							if (file.split(`.`).slice(-1)[0] !== `js`) return;
							const Name = file.split(`.`)[0];
							const Group = dir.replace(dirPath, ``);
							const CommandClass = require(join(__dirname, `../Commands/${Group}/${file}`));
							const Command = new CommandClass(client);
							client.cmds.commands.set(Name, Command);
							Command.name = Name;
							Command.group = Group;
							Command.aliases.forEach(alias => { // eslint-disable-line max-nested-callbacks
								client.cmds.aliases.set(alias, Name);
							});
							if (!client.groups.includes(Group) && !Group.startsWith(`_`)) client.groups.push(Group);
						});
					});
				});
				res();
			});
		});
	}

	localEvents(client) {
		return new Promise((res, rej) => {
			readdir(join(`.`, `./Events/`), (error, files) => {
				if (error) rej(error);
				files.forEach(file => {
					const Name = file.split(`.`)[0];
					const EventClass = require(join(resolve(`.`), `/Events/${file}`));
					const Event = new EventClass(client);
					client.on(Name, (...args) => Event.run(client, ...args));
				});
			});
			res();
		});
	}

	globalEvents(client) {
		return new Promise((res, rej) => {
			readdir(join(__dirname, `../Events/`), (error, files) => {
				if (error) rej(error);
				files.forEach(file => {
					const Name = file.split(`.`)[0];
					const EventClass = require(join(__dirname, `../Events/${file}`));
					const Event = new EventClass(client);
					client.on(Name, (...args) => Event.run(client, ...args));
				});
			});
			res();
		});
	}
}

module.exports = Util;
