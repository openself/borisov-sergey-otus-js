const sum = (num) => {
    let addResult = num

    const add = (num) => {
        if (num === undefined) {
            return addResult
        }
        addResult += num
        return add
    }

    if (num === undefined) {
        return (addResult === undefined) ? 0 : addResult
    }
    return add
}

export default sum