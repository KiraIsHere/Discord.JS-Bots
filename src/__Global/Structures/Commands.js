class Commands {
	constructor(client, info) {
		if (!client) return new Error(`A client must be specified.`)
		this.client = client
		this.enabled = info.enabled
		this.show = info.show
		this.cooldown = info.cooldown
		this.cooldownAmount = info.cooldownAmount
		this.cooldownTime = info.cooldownTime
		this.limit = info.limit
		this.limitAmount = info.limitAmount
		this.limitTime = info.limitTime
		this.name = info.name
		this.group = info.group
		this.description = info.description
		this.usage = info.usage
		this.aliases = info.aliases
	}
}

module.exports = Commands
