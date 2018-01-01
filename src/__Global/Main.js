const Client = require(`./Structures/Client`)
const Loader = require(`./Structures/Loader`)
const { resolve, join } = require(`path`)
const Options = require(join(resolve(`.`), `./Options`))

const client = new Client(Options)
const loader = new Loader

loader.init(client).then(() => {
	client.login(process.env[client.botName]).catch(error => { throw error })
}).catch(error => { throw error })

// noinspection JSUnresolvedFunction
process.on(`uncaughtException`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`))
	process.exit()
})

// noinspection JSUnresolvedFunction
process.on(`unhandledRejection`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`))
})
