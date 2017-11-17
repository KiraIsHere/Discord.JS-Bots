const Client = require(`../__Global/Structures/Client`);
const Util = require(`../__Global/Structures/Util`);
const Loader = new Util;

const client = new Client({
	messageCacheMaxSize: 100,
	messageCacheLifetime: 600,
	messageSweepInterval: 10,
	disabledEvents: [
		`CHANNEL_CREATE`,
		`CHANNEL_DELETE`,
		`CHANNEL_PINS_UPDATE`,
		`CHANNEL_UPDATE`,
		// `GUILD_BAN_ADD`,
		// `GUILD_BAN_REMOVE`,
		// `GUILD_CREATE`,
		// `GUILD_DELETE`,
		// `GUILD_MEMBERS_CHUNK`,
		// `GUILD_MEMBER_ADD`,
		// `GUILD_MEMBER_REMOVE`,
		`GUILD_MEMBER_UPDATE`,
		`GUILD_ROLE_CREATE`,
		`GUILD_ROLE_DELETE`,
		`GUILD_ROLE_UPDATE`,
		`GUILD_SYNC`,
		`GUILD_UPDATE`,
		// `MESSAGE_CREATE`,
		`MESSAGE_DELETE_BULK`,
		`MESSAGE_DELETE`,
		// `MESSAGE_REACTION_ADD`,
		`MESSAGE_REACTION_REMOVE_ALL`,
		`MESSAGE_REACTION_REMOVE`,
		// `MESSAGE_UPDATE`,
		`PRESENCE_UPDATE`,
		// `READY`,
		`RELATIONSHIP_ADD`,
		`RELATIONSHIP_REMOVE`,
		// `RESUMED`,
		`TYPING_START`,
		`USER_NOTE_UPDATE`,
		`USER_SETTINGS_UPDATE`,
		`USER_UPDATE`
		// `VOICE_SERVER_UPDATE`,
		// `VOICE_STATE_UPDATE`
	]
});

Loader.init(client).then(() => {
	client.login(process.env[client.botName]).catch(error => { throw error; });
}).catch(error => { throw error; });

process.on(`uncaughtException`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`));
	process.exit();
});

process.on(`unhandledRejection`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`));
});
