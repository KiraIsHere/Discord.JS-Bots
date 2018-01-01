class Events {
	constructor(client) {
		if (!client) return new Error(`A client must be specified.`)
		this.client = client
	}
}

module.exports = Events
