const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, member) {
		if (process.env.DEV) return false;
		if (member.guild.id !== `361532026354139156`) return false;

		client.guilds.get(client.servers.MAIN).channels.find(`name`, `member-log`).send(new MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setColor(0x00FF00)
			.setFooter(`Joined`)
			.setTimestamp()
		);
		return true;
	}
}

module.exports = Event;
