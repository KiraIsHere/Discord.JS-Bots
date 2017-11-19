const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, guild) {
		if (process.env.LOCAL) return false;

		if (client.user.bot) client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`} | By Shayne Hartford (ShayBox)`);

		client.channels.get(client.channelList.GUILD_LOG).send(new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor(0xFF0000)
			.setFooter(`Left`)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Event;
