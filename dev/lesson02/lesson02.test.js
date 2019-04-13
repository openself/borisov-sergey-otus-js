import promiseReduce from './lesson02'

const TimeoutPromise = time => {
    return new Promise(resolve => window.setTimeout(resolve, time))
}

const fn1 = () => {
    console.log('fn1')
    return TimeoutPromise(500).then(() => -10)
}

const fn2 = () => {
    console.log('fn2')
    return TimeoutPromise(200).then(() => 20)
}

const fn3 = () => {
    console.log('fn3')
    return TimeoutPromise(1000).then(() => 2)
}

const reduceFn = (memo, value) => {
    console.log('reduce')
    return TimeoutPromise(100).then(() => (memo * value) - value)
}

test('promiseReduce result = -1642', async () => {
    expect.assertions(1)
    const data = await promiseReduce([fn1, fn2, fn3], reduceFn, 5)
    expect(data).toBe(-1642)
})

