const {getPath} = require('../index')
const fs = require("fs")
const path = require('path')

function check(html) {
    document.write(html)

    // Bug in jsdom: svg can't be queried.
    for (let node of document.querySelectorAll('*:not(svg):not(path):not(circle):not(title):not(g):not(rect)')) {
        const selector = getPath(node)

        // selected only one node
        expect(document.querySelectorAll(selector).length).toBe(1)
        //selected target node
        expect(document.querySelector(selector)).toBe(node)
    }
}

test('GitHub', () => {
        const file = path.resolve(__dirname, './pages/GitHub.html')
        let fileContent = fs.readFileSync(file, "utf8")
        check(fileContent)
    }
)

test('OTUS', () => {
        const file = path.resolve(__dirname, './pages/OTUS.html')
        let fileContent = fs.readFileSync(file, "utf8")
        check(fileContent)
    }
)

test('simlpe 1', () => {
        const html = `
  <div>
    <span>
      <p></p>
    </span>
  </div>
  <div>
    <p></p>
    <p></p>
    <p><b>some text</p>
  </div>
  <b>bad tag
  <div>
    <p id="test_id"></p>
    <p></p>
    <p class="test1 test2 test3"></p>
    bad text
    <br>
  </div>
  `
        check(html)
    }
)

