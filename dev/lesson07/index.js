const {Readable, Transform, Writable} = require('stream')

const opts = {objectMode: true, highWaterMark: 1}

const getRandomNumber = () => Math.random()

const readableStream = new Readable({
    ...opts,
    read() {
        for (let i = 0; i < 5; i++) {
            const num = getRandomNumber()
            console.log('Add random number on start:', num)
            this.push(num)
        }
        this.push(null)
    }
})

const transformStream = new Transform({
    ...opts,
    transform(chunk, encoding, done) {
        const num = getRandomNumber()
        console.log('Add random number on transform:', num)
        this.push(chunk + num)
        done()
    }
})

const writableStream = new Writable({
    ...opts,
    write(chunk, encoding, next) {
        console.log('Number as result:', chunk)
        next()
    }
})

readableStream.pipe(transformStream)
    .pipe(writableStream)

