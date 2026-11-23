import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT = 'scripts/audit-shots/pirpassive-infrared-sensor-testing'
fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/pirpassive-infrared-sensor-testing', {
  waitUntil: 'networkidle',
})
await page.waitForTimeout(900)
await page.addStyleTag({ content: '.nav,.fab{visibility:hidden!important}' })

const sections = page.locator('.migrated-page > section')
const count = await sections.count()
for (let i = 0; i < count; i++) {
  const sec = sections.nth(i)
  const h = await sec
    .locator('h1, h2')
    .first()
    .textContent()
    .catch(() => 'band')
  const imgs = await sec.locator('img').evaluateAll((els) =>
    els.map((e) => e.getAttribute('src')).filter(Boolean),
  )
  const cls = (await sec.getAttribute('class')) || ''
  const label = String(h || 'band').trim()
  console.log(
    String(i + 1).padStart(2, '0'),
    label.slice(0, 42),
    `imgs=${imgs.length}`,
    cls.split(' ').slice(0, 2).join(' '),
  )
  if (i >= 2 && i <= 11) {
    const name = `${String(i + 1).padStart(2, '0')}-${label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 42)}`
    await sec.screenshot({ path: path.join(OUT, `${name}.png`) }).catch(() => {})
  }
}
await page.screenshot({ path: path.join(OUT, '00-full.png'), fullPage: true })
await browser.close()
