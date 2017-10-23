const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, member) {
		if (process.env.LOCAL) return false;
		if (member.guild.id !== `361532026354139156`) return false;

		const embed = new MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setFooter(`Joined`)
			.setTimestamp();
		client.channels.get(client.channelList.MEMBER_LOG).send({ embed });
		return true;
	}
}

module.exports = Event;
