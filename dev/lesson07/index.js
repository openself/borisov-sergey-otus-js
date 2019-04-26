const {Readable, Transform, Writable} = require('stream')

const opts = {objectMode: true, highWaterMark: 1}
const readableStream = new Readable(opts)
const transformStream = new Transform(opts)
const writableStream = new Writable(opts)

const getRandomNumber = () => Math.random()


readableStream._read = function () {

    for (let i = 0; i < 5; i++) {
        const num = getRandomNumber()
        console.log('Add random number on start:', num)
        this.push(num)
    }
    this.push(null)
}

transformStream._transform = function (chunk, encoding, done) {

    const num = getRandomNumber()
    console.log('Add random number on transform:', num)
    this.push(chunk + num)
    done()

}

writableStream._write = (chunk, encoding, next) => {
    console.log('Number as result:', chunk)
    next()
}


readableStream.pipe(transformStream)
    .pipe(writableStream)

