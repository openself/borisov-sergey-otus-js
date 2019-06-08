function getPath(input) {
    if (!(input instanceof HTMLElement)) {
        throw new Error('The input value isn\'t a HTMLElement node.')
    }

    const inputTag = input.tagName.toLowerCase()
    if ('html' === inputTag) {
        return inputTag
    }

    const rootDocument = input.ownerDocument
    let path = ''

    const elementId = input.getAttribute('id')
    if (elementId) {
        const selector = '#' + elementId
        if (isUnique(selector, rootDocument)) {
            return selector
        }
    }

    const classes = Array.from(input.classList).join('.')
    if (classes) {
        const selector = '.' + classes
        if (isUnique(selector, rootDocument)) {
            return selector
        }
    }

    let node = input;

    while (node) {
        let name = node.tagName.toLowerCase()

        name += ':nth-child(' + getIndexInSiblings(node) + ')'

        path = name + (path ? '>' + path : '')
        if (isUnique(path, rootDocument)) {
            return path
        }
        node = node.parentNode
    }
    return path
}

function isUnique(path, rootDocument) {
    return rootDocument.querySelectorAll(path).length === 1
}

function getIndexInSiblings(elem) {
    let index = 1
    let sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType === 1 && index++;
    }

    return index;
}

module.exports = {getPath}
