const promiseReduce = (asyncFunctions, reduce, initialValue) => {
    console.log('fn1')
    console.log('reduce')
    console.log('fn2')
    console.log('reduce')
    return Promise.resolve(2)
}

export default promiseReduce

