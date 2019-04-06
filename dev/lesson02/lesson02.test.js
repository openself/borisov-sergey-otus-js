import promiseReduce from './lesson02'

const fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

const fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

const reduceFn = (memo, value) => {
    console.log('reduce')
    return memo * value
}

test('promiseReduce result = 2', async () => {
    expect.assertions(1)
    const data = await promiseReduce([fn1, fn2], reduceFn, 1)
    expect(data).toBe(2)
})

