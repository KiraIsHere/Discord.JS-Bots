const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	async run(client, message) {
		client.runLint(message, false);

		if (process.env.LOCAL) return false;

		if (message.channel.name !== `welcome`) return false;
		if (message.author.bot) return false;
		await message.delete({ timeout: 500 });
		if (!message.content.toLowerCase().includes(`i agree`)) return message.member.kick();
		message.member.addRole(message.guild.roles.find(`name`, `Verified`)).catch(error => client.error(error));
		return true;
	}
}

module.exports = Event;
