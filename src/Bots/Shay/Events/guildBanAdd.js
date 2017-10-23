const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, guild, user) {
		if (process.env.LOCAL) return false;
		if (guild.id !== `361532026354139156`) return false;

		const embed = new MessageEmbed()
			.setAuthor(user.username, user.displayAvatarURL())
			.setColor(0xFF0000)
			.setFooter(`Banned`)
			.setTimestamp();
		client.channels.get(client.channelList.MOD_LOG).send({ embed });
		return true;
	}
}

module.exports = Event;
