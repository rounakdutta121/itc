import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const OUT = 'scripts/audit-shots/atex-testing-certification'
fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/atex-testing-certification', {
  waitUntil: 'networkidle',
  timeout: 60000,
})
await page.waitForTimeout(900)
await page.screenshot({ path: path.join(OUT, '00-full.png'), fullPage: true })
const intro = await page.$('.migrated-intro')
if (intro) await intro.screenshot({ path: path.join(OUT, '03-overview.png') })
const headings = await page.$$eval(
  '.migrated-page > section h2',
  (els) => els.map((e) => e.textContent.trim()),
)
const tables = await page.$$eval('.migrated-table-wrap', (els) => els.length)
console.log('headings', headings)
console.log('tables', tables)
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(400)
if (intro) await intro.screenshot({ path: path.join(OUT, '00-mobile-intro.png') })
await browser.close()
