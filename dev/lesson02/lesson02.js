const promiseReduce = async (asyncFunctions, reduce, initialValue) => {
    let accum = initialValue
    for (let func of asyncFunctions) {
        let funcResult = await func()
        accum = await reduce(accum, funcResult)
    }

    return accum
}

export default promiseReduce

