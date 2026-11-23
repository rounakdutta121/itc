import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const packs = [
  'iec-e2-80-8260601-2-212020-medical-electrical-equipment-particular-requirements-for-the-basic-safety-and-essential-perfo.json',
  'iso-10218-1-industrial-robots.json',
  'iso-80601-2-612017-particular-requirements-for-basic-safety-and-essential-performance-of-pulse-oximeter-equipments.json',
  'iec-60601-2-192020-medical-electrical-equipment-particular-requirements-for-the-basic-safety-and-essential-performance-o.json',
]

const OUT = 'scripts/audit-shots/glossary-fix'
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const file of packs) {
  const data = JSON.parse(
    fs.readFileSync(path.join('public/data/migrated', file), 'utf8'),
  )
  const route = data.path
  console.log('\n==>', route)
  const res = await page.goto(`http://localhost:5173${route}`, {
    waitUntil: 'networkidle',
    timeout: 60000,
  })
  console.log('status', res?.status())
  await page.waitForTimeout(700)
  await page.addStyleTag({ content: '.nav,.fab{visibility:hidden!important}' })
  const heads = await page.locator('.migrated-page > section h2').allTextContents()
  console.log('heads', heads.slice(0, 8))
  console.log(
    'glossary',
    await page.locator('.migrated-glossary').count(),
    'points',
    await page.locator('.migrated-points__grid').count(),
  )
  const gloss = page.locator('.migrated-glossary').first()
  if ((await gloss.count()) > 0) {
    await gloss.scrollIntoViewIfNeeded()
    await gloss.screenshot({
      path: path.join(OUT, `${(data.slug || file).slice(0, 60)}.png`),
    })
  } else {
    const sec = page
      .locator('.migrated-page > section')
      .filter({ hasText: /terms|definitions/i })
      .first()
    if ((await sec.count()) > 0) {
      await sec.scrollIntoViewIfNeeded()
      await sec.screenshot({
        path: path.join(OUT, `fallback-${(data.slug || file).slice(0, 50)}.png`),
      })
      const info = await sec.evaluate((el) => ({
        h2: el.querySelector('h2')?.textContent,
        cls: el.className,
        points: el.querySelectorAll('.migrated-point').length,
        paras: el.querySelectorAll('p').length,
      }))
      console.log('fallback section', info)
    }
  }
}

await browser.close()
