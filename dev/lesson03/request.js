const rp = require('request-promise-native')
const log4js = require('log4js')
log4js.configure({
    appenders: {
        console: { type: 'console' }
    },
    categories: {
        ping: { appenders: ['console'], level: 'info' },
        default: { appenders: ['console'], level: 'info' }
    }
});
const logger = log4js.getLogger('ping')

const argv = require('yargs')
    .usage('Usage: $0 -n <number> -t <type>')
    .example('$0 -n 5 -t seq', 'Ping the server 5 times with sequential requests')
    .example('$0 -n 10 -t par', 'Ping the server 10 times with parallel requests')
    .options({
        'n': {
            alias: 'number',
            nargs: 1,
            default: 1,
            describe: 'Number of requests',
            type: 'number'
        },
        't': {
            alias: 'type',
            nargs: 1,
            default: 'seq',
            describe: 'Type of requests: "seq" for sequential or "par" for parallel requests.',
            type: 'string',
            choices: ['seq', 'par']
        }
    })
    .check(argv1 = argv => {
        if (!argv.n > 0) {
            throw new Error('Error: the "n" option value must be a number >= 1')
        }
        return true
    })
    .help('h')
    .alias('h', 'help')
    .argv;

const host = '127.0.0.1'
const port = 3000

const options = {uri: `http://${host}:${port}`}

async function testServer() {
    let response
    try {
        response = await rp(options)
        logger.info('Server reponse:', response)
    } catch (err) {
        logger.log('Server error', err)
    }
}



if (argv.t === "par") {
    Promise.all(
        new Array(argv.n).fill(0).map(() => testServer())
    )
}
else {
    (async testSequently => {
        for (i = 0; i < argv.n; i++){
            await testServer()
        }
    })()
}

