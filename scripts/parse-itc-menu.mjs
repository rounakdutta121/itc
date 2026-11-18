import fs from 'fs'

const html = fs.readFileSync('D:/Temp/itc-home.html', 'utf8')

function decode(s) {
  return s
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function parseList(ulHtml, depth = 0) {
  const items = []
  // Match each top-level <li>...</li> carefully with nesting awareness is hard via regex.
  // Split by <li at this depth using a stack parser.
  let i = 0
  while (i < ulHtml.length) {
    const liStart = ulHtml.indexOf('<li', i)
    if (liStart === -1) break
    // find end of opening tag
    const openEnd = ulHtml.indexOf('>', liStart)
    const openTag = ulHtml.slice(liStart, openEnd + 1)
    // find matching close </li>
    let depthLi = 1
    let j = openEnd + 1
    while (j < ulHtml.length && depthLi > 0) {
      const nextOpen = ulHtml.indexOf('<li', j)
      const nextClose = ulHtml.indexOf('</li>', j)
      if (nextClose === -1) break
      if (nextOpen !== -1 && nextOpen < nextClose) {
        depthLi++
        j = nextOpen + 3
      } else {
        depthLi--
        if (depthLi === 0) {
          const inner = ulHtml.slice(openEnd + 1, nextClose)
          const a = inner.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i)
          if (a) {
            const label = decode(a[2].replace(/<[^>]+>/g, ''))
            const href = a[1]
            const subUlMatch = inner.match(/<ul[^>]*class="[^"]*sub-menu[^"]*"[^>]*>([\s\S]*)<\/ul>\s*$/i)
              || inner.match(/<ul[^>]*>([\s\S]*)<\/ul>\s*$/i)
            let children
            if (openTag.includes('menu-item-has-children') || openTag.includes('page_item_has_children')) {
              // find first nested ul
              const ulStart = inner.search(/<ul[\s>]/i)
              if (ulStart !== -1) {
                // extract that ul with stack
                let d = 1
                let k = inner.indexOf('>', ulStart) + 1
                let end = k
                while (k < inner.length && d > 0) {
                  const o = inner.indexOf('<ul', k)
                  const c = inner.indexOf('</ul>', k)
                  if (c === -1) break
                  if (o !== -1 && o < c) {
                    d++
                    k = o + 3
                  } else {
                    d--
                    end = c
                    k = c + 5
                  }
                }
                const ulInner = inner.slice(inner.indexOf('>', ulStart) + 1, end)
                children = parseList(ulInner, depth + 1)
              }
            }
            items.push({
              label,
              href,
              ...(children?.length ? { children } : {}),
            })
          }
          i = nextClose + 5
          break
        }
        j = nextClose + 5
      }
    }
    if (depthLi !== 0) break
  }
  return items
}

const menuStart = html.indexOf('id="menu-menu-1"')
const from = html.indexOf('>', menuStart) + 1
// find closing of this ul - stack from menu-menu-1
let d = 1
let k = from
let end = from
while (k < html.length && d > 0) {
  const o = html.indexOf('<ul', k)
  const c = html.indexOf('</ul>', k)
  if (c === -1) break
  if (o !== -1 && o < c) {
    d++
    k = o + 3
  } else {
    d--
    end = c
    k = c + 5
  }
}
const menuInner = html.slice(from, end)
const tree = parseList(menuInner)

function summarize(nodes, depth = 0) {
  for (const n of nodes) {
    console.log(`${'  '.repeat(depth)}${n.children ? '+' : '-'} ${n.label} (${n.children?.length || 0})`)
    if (n.children && depth < 2) summarize(n.children, depth + 1)
  }
}
summarize(tree)
fs.writeFileSync('D:/itcindia/src/data/itc-nav.json', JSON.stringify(tree, null, 2))
console.log('wrote', tree.length, 'top items, json bytes', fs.statSync('D:/itcindia/src/data/itc-nav.json').size)
