const Events = require(`../../../__Global/Structures/Events`);
const GoogleAssistant = require(`google-assistant-node`);
const { auth } = require(`googleapis`);
const { Constants } = GoogleAssistant;
const { Encoding } = Constants;

class Event extends Events {
	run(client, oldMember, newMember) {
		if (newMember.user === client.user) return false;
		if (newMember.guild.me.voiceChannelID && newMember.guild.me.voiceChannel.members.size < 2) newMember.guild.me.voiceChannel.leave();
		if (newMember.guild.me.voiceChannelID) return false;
		if (!newMember.voiceChannel.name.match(/assistant/ig)) return false;

		newMember.voiceChannel.join().then(connection => {
			const receiver = connection.createReceiver();
			const stream = receiver.createPCMStream(newMember);

			const jwtClient = new auth.JWT(
				process.env.GOOGLE_ASSISTANT_EMAIL,
				null,
				process.env.GOOGLE_ASSISTANT_KEY,
				[`https://www.googleapis.com/auth/assistant-sdk-prototype`],
				null
			);

			const assistant = new GoogleAssistant({
				input: {
					encoding: Encoding.LINEAR16,
					sampleRateHertz: 16000
				},
				output: {
					encoding: Encoding.MP3,
					sampleRateHertz: 16000,
					volumePercentage: 50
				}
			});

			jwtClient.authorize(error => {
				if (error) client.error(error);
			});

			// Audio Data (bytes)
			assistant.on(`audio-data`, data => {
				connection.playFile(data);
			});

			//  Reponse Text (string)
			assistant.on(`response-text`, text => {
				console.log(`Response: ${text}`);
			});

			//  Request Text (string)
			assistant.on(`request-text`, text => {
				console.log(`Request: ${text}`);
			});

			//  Conversation State (bytes)
			assistant.on(`state`, state => {
				console.log(`State: ${Buffer.from(state).toString(`ascii`)}`);
			});

			//  Microphone Mode (int)
			assistant.on(`mic-mode`, mode => {
				console.log(`Mode: ${mode}`);
			});

			// Authorization error (error)
			// E.g. Did not authenticate with OAuth client
			assistant.on(`unauthorized`, error => {
				if (error) client.error(error);
			});

			//  Error (error)
			assistant.on(`error`, error => {
				if (error) client.error(error);
			});

			// Assistant is ready to accept audio data. NOTE: .once() is used.
			assistant.once(`ready`, wstream => {
				wstream.pipe(stream);
				console.log(`Start`);
			});

			// Current conversation is over.
			// NOTE: 'end' will be called even if there is a 'follow-on' event.
			assistant.once(`end`, () => {
				console.log(`End`);
			});

			// Assistant is expecting a follow-on response from user.
			assistant.on(`follow-on`, () => {
				// Setup follow-on 'ready' and 'end' event handler to change audio source
				// if desired (or if you used .once()).
				assistant.once(`ready`, wstream => {
					wstream.pipe(stream);
					console.log(`Follow On Started`);
				});

				// Handle follow-on conversation end.
				assistant.once(`end`, () => {
					console.log(`Follow On Ended`);
				});

				// Don't forget to call .converse() to resume conversation
				assistant.converse();
			});

			// Use Google OAuth Client to authenticate:
			// https://github.com/google/google-auth-library-nodejs
			// or
			// https://github.com/google/google-api-nodejs-client
			assistant.authenticate(jwtClient);

			// Start conversation
			assistant.converse();
		}).catch(console.error);
		return true;
	}
}

module.exports = Event;
