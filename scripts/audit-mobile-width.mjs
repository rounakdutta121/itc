import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'

const OUT = 'scripts/audit-shots/mobile-width'
fs.mkdirSync(OUT, { recursive: true })
const routes = [
  '/atex-testing-certification',
  '/battery-testing',
  '/emc-emi-testing',
]

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })

for (const route of routes) {
  const name = route.replace(/^\//, '')
  await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.addStyleTag({ content: '.fab{opacity:0.35!important}' })

  const metrics = await page.evaluate(() => {
    const vw = window.innerWidth
    const wrap = document.querySelector('.migrated-intro .wrap, .migrated-page .wrap')
    const media = document.querySelector('.migrated-intro__media')
    const lead = document.querySelector('.migrated-intro__lead')
    const table = document.querySelector('.migrated-table-wrap')
    const rect = (el) => (el ? el.getBoundingClientRect() : null)
    const wr = rect(wrap)
    const mr = rect(media)
    const lr = rect(lead)
    const tr = rect(table)
    return {
      vw,
      wrapW: wr?.width ?? null,
      wrapRightGap: wr ? vw - wr.right : null,
      mediaW: mr?.width ?? null,
      leadW: lr?.width ?? null,
      tableW: tr?.width ?? null,
      tableRightGap: tr ? vw - tr.right : null,
    }
  })
  console.log(name, JSON.stringify(metrics))

  const intro = page.locator('.migrated-intro')
  if (await intro.count()) {
    await intro.scrollIntoViewIfNeeded()
    await intro.screenshot({ path: path.join(OUT, `${name}-intro.png`) })
  }
}

await browser.close()
