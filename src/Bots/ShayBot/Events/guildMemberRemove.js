const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, member) {
		if (process.env.DEV) return;
		if (member.guild.id !== `361532026354139156`) return;

		client.guilds.get(client.servers.MAIN).channels.find(`name`, `member-log`).send(new MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setColor(0xFF0000)
			.setFooter(`Left`)
			.setTimestamp()
		);
	}
}

module.exports = Event;
