const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, guild) {
		if (process.env.LOCAL) return false;

		if (client.user.bot) client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`} | By Shayne Hartford (ShayBox)`);

		client.guilds.get(client.guild).channels.find(`name`, `guild-log`).send(new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor(0x00FF00)
			.setFooter(`Joined`)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Event;
