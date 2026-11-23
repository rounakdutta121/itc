import { chromium } from 'playwright'
import path from 'node:path'

const OUT = 'scripts/audit-shots/atex-testing-certification'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5173/atex-testing-certification', {
  waitUntil: 'networkidle',
})
await page.waitForTimeout(700)
await page.addStyleTag({ content: '.nav,.fab{visibility:hidden!important}' })
const intro = page.locator('.migrated-intro')
await intro.scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
await intro.screenshot({ path: path.join(OUT, '03-overview-clean.png') })

await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(400)
await page.addStyleTag({ content: '.nav,.fab{visibility:hidden!important}' })
await intro.scrollIntoViewIfNeeded()
await page.waitForTimeout(200)
await intro.screenshot({ path: path.join(OUT, '00-mobile-intro-clean.png') })
console.log('ok')
await browser.close()
