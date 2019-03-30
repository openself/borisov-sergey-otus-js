import sum from './lesson01'

test('sum() = 0', () => {
    expect(sum()).toBe(0)
})

test('sum(1)() = 1', () => {
    expect(sum(1)()).toBe(1)
})

test('sum(10)(20)(30)() = 60', () => {
    expect(sum(1)()).toBe(1)
})
