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
await page.waitForTimeout(800)
await page.addStyleTag({ content: '.nav,.fab{visibility:hidden!important}' })

const want = [
  'When to use PIR testing',
  'Why PIR testing is important',
  'How to properly test a PIR sensor',
  'PIR testing procedure',
]
for (const title of want) {
  const sec = page.locator('.migrated-page > section').filter({ hasText: title }).first()
  const imgs = await sec.locator('.migrated-split__figure img, .migrated-how__figure img, img').count()
  const name = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 48)
  console.log(title, 'imgs=', imgs)
  await sec.screenshot({ path: path.join(OUT, `key-${name}.png`) })
}
await browser.close()
