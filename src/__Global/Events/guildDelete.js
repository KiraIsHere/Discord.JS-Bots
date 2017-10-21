const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);
// const { post } = require(`snekfetch`);

class Event extends Events {
	run(client, guild) {
		if (process.env.LOCAL) return;

		// post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
		// 	.send({ server_count: client.guilds.size	}); // eslint-disable-line camelcase

		const embed = new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor(0x00FF00)
			.setFooter(`Left`)
			.setTimestamp();
		client.channels.get(client.channelList.GUILD_LOG).send({ embed });
	}
}

module.exports = Event;
