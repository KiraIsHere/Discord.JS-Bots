const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	async run(client, message) {
		await client.runLint(message, false);

		if (process.env.DEV) return;

		if (message.channel.name !== `welcome`) return;
		if (message.author.bot) return;
		await message.delete({ timeout: 500 });
		if (!message.content.toLowerCase().includes(`i agree`)) return message.member.kick();
		message.member.addRole(message.guild.roles.find(`name`, `Verified`)).catch(error => client.error(error));
	}
}

module.exports = Event;
