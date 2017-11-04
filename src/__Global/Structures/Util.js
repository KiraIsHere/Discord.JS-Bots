const { readdir } = require(`fs`);
const { walk } = require(`file`);
const { join } = require(`path`);
const path = require(`path`);

class Util {
	async init(client) {
		await this.localCommands(client);
		await this.globalCommands(client);
		await this.localEvents(client);
		await this.globalEvents(client);
	}

	localCommands(client) {
		return new Promise((resolve, reject) => {
			walk(join(`.`, `./Commands/`), (error, dirPath, dirs) => {
				if (error) reject(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) reject(error);
						files.forEach(file => {
							if (file.split(`.`).slice(-1)[0] !== `js`) return false;
							const Name = file.split(`.`)[0];
							const Folders = dir.replace(`/`, `\\`).split(`\\`);
							const Group = Folders[Folders.length - 1];
							const CommandClass = require(join(path.resolve(`.`), `./Commands/${Group}/${file}`));
							const Command = new CommandClass(client);
							client.commands.set(Name, Command);
							Command.aliases.forEach(alias => { // eslint-disable-line max-nested-callbacks
								client.aliases.set(alias, Name);
							});
							return true;
						});
					});
				});
				resolve();
			});
		});
	}

	globalCommands(client) {
		return new Promise((resolve, reject) => {
			walk(join(__dirname, `../Commands/`), (error, dirPath, dirs) => {
				if (error) reject(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) reject(error);
						files.forEach(file => {
							if (file.split(`.`).slice(-1)[0] !== `js`) return false;
							const Name = file.split(`.`)[0];
							const Folders = dir.split(`\\`);
							const Group = Folders[Folders.length - 1];
							const CommandClass = require(join(__dirname, `../Commands/${Group}/${file}`));
							const Command = new CommandClass(client);
							client.commands.set(Name, Command);
							Command.aliases.forEach(alias => { // eslint-disable-line max-nested-callbacks
								client.aliases.set(alias, Name);
							});
							return true;
						});
					});
				});
				resolve();
			});
		});
	}

	localEvents(client) {
		return new Promise((resolve, reject) => {
			walk(join(`.`, `./Events/`), (error, dirPath, dirs) => {
				if (error) reject(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) reject(error);
						files.forEach(file => {
							const Name = file.split(`.`)[0];
							const EventClass = require(join(path.resolve(`.`), `./Events/${file}`));
							const Event = new EventClass(client);
							client.on(Name, (...args) => Event.run(client, ...args)); // eslint-disable-line max-nested-callbacks
							return true;
						});
					});
				});
				resolve();
			});
		});
	}

	globalEvents(client) {
		return new Promise((resolve, reject) => {
			walk(join(__dirname, `../Events/`), (error, dirPath, dirs) => {
				if (error) reject(error);
				dirs.forEach(dir => {
					readdir(dir, (error, files) => {
						if (error) reject(error);
						files.forEach(file => {
							const Name = file.split(`.`)[0];
							const EventClass = require(join(__dirname, `../Events/${file}`));
							const Event = new EventClass(client);
							client.on(Name, (...args) => Event.run(client, ...args)); // eslint-disable-line max-nested-callbacks
							return true;
						});
					});
				});
				resolve();
			});
		});
	}
}

module.exports = Util;
