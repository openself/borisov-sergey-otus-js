const path = require('path')
const klaw = require('klaw')

const yargs = require('yargs')
    .usage('Usage: $0 -- [path]')
    .example('$0 -- somepath', 'Return JSON object with files and folders of the "somepath" dir')
    .help('h')
    .alias('h', 'help')
    .argv;

const baseDir = yargs._.length > 0 ? yargs._[0] : '.'
const baseLen = (path.resolve(baseDir)).length
const lastDir = baseDir.substr((path.dirname(baseDir)).length + 1)

const dirs = [], files = []

klaw(baseDir)
    .on('data', item => {
        const name = path.normalize(path.join(lastDir, item.path.substr(baseLen)))
        item.stats.isDirectory() ? dirs.push(name) : files.push(name)
    })
    .on('error', err => console.log(err.message))
    .on('end', () => console.log(JSON.stringify({'files': files, 'dirs': dirs}, null, 4)))

