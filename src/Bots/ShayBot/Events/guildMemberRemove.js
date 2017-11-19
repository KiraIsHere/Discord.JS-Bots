const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, member) {
		if (process.env.LOCAL) return false;
		if (member.guild.id !== `361532026354139156`) return false;

		client.channels.get(client.channelList.MEMBER_LOG).send(new MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setColor(0xFF0000)
			.setFooter(`Left`)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Event;
