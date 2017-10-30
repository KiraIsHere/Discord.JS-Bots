const Events = require(`../../../__Global/Structures/Events`);
const { post } = require(`snekfetch`);

class Event extends Events {
	async run(client, guild) {
		if (process.env.LOCAL) return false;
		// post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
		// 	.set(`Authorization`, process.env.DISCORDBOTS_ORG_API)
		// 	.send({ server_count: client.guilds.size }); // eslint-disable-line camelcase

		// post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
		// 	.set(`Authorization`, process.env.DISCORDBOTS_PW_API)
		// 	.send({ server_count: client.guilds.size	}); // eslint-disable-line camelcase

		if (guild.id === `110373943822540800`) return false;
		if (guild.memberCount > 200) return false;
		await guild.members.fetch();
		if (guild.roles.size > 200) return client.defaultChannel(guild).send(`This server has more than 200 roles, This bot will not work.`);
		if (guild.memberCount - guild.members.filter(member => member.user.bot).size > 200) return client.defaultChannel(guild).send(`This server has more than 200 non-bot members, You may experience issues with the max role size`);
		return true;
	}
}

module.exports = Event;
