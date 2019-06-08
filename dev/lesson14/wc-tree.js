class Tree extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `<h2>Self-Building Tree</h2><slot></slot>`
    }

    connectedCallback() {
        if (!this.hasAttribute('tree-data')) {
            return
        }
        try {
            let textData = this.getAttribute('tree-data')
            let treeData = JSON.parse(textData)
            if (typeof treeData !== 'object') {
                return
            }
            if ('items' in treeData) {
                let wcNode = document.createElement('wc-node')
                wcNode.setAttribute('tree-data', textData)
                this.appendChild(wcNode)
            } else {
                let wcLeaf = document.createElement('wc-leaf')
                wcLeaf.setAttribute('tree-data', textData)
                this.appendChild(wcLeaf)
            }

        } catch (e) {
            console.log(e)
            return
        }
    }
}

class Node extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.hasAttribute('tree-data')) {
            return
        }
        try {
            let textData = this.getAttribute('tree-data')
            let treeData = JSON.parse(textData)
            if (typeof treeData !== 'object') {
                return
            }
            let id = 'n/a'
            if ('id' in treeData) {
                id = `${treeData['id']}`
                this.setAttribute('id', `wc-tree-id-${id}`)
            }
            let innerHTML = `<p>Tree node: id = ${id}</p>`
            this.innerHTML = innerHTML
            if (!'items' in treeData) {
                return;
            }
            let items = treeData['items']
            if (Object.prototype.toString.call(items) !== '[object Array]') {
                return
            }
            items.forEach((item) => {
                let element
                if ('items' in item) {
                    element = document.createElement('wc-node')
                } else {
                    element = document.createElement('wc-leaf')
                }
                element.setAttribute('tree-data', JSON.stringify(item))
                this.appendChild(element)
            })
        } catch (e) {
            console.log(e)
            return
        }
    }
}

class Leaf extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        if (!this.hasAttribute('tree-data')) {
            return
        }
        try {
            let treeData = JSON.parse(this.getAttribute('tree-data'))
            if (typeof treeData !== 'object') {
                this.innerHTML = `<p>Tree leaf</p>`
                return
            }
            let id = 'n/a'
            if ('id' in treeData) {
                id = `${treeData['id']}`
                this.setAttribute('id', `wc-tree-id-${id}`)
            }
            let innerHTML = `<p>Tree leaf: id = ${id}</p>`
            this.innerHTML = innerHTML

        } catch (e) {
            console.log(e)
            return
        }
    }
}

customElements.define('wc-tree', Tree)
customElements.define('wc-node', Node)
customElements.define('wc-leaf', Leaf)
