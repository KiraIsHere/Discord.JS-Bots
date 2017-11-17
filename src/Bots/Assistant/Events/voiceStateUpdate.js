const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	run(client, oldMember, newMember) {
		if (newMember.user !== client.user && newMember.guild.me.voiceChannel && !newMember.guild.me.voiceChannel.name.match(/assistant/ig)) {
			newMember.guild.me.voiceChannel.leave();
		}
		if (newMember.guild.me.voiceChannelID) return false;
		if (!newMember.voiceChannel.name.match(/assistant/ig)) return false;

		newMember.voiceChannel.join().then(connection => {
			const receiver = connection.createReceiver();
			const stream = receiver.createPCMStream(newMember);
		}).catch(console.error);
		return true;
	}
}

module.exports = Event;
