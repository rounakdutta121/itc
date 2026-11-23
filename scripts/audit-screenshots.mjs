/**
 * Visual audit: full-page + per-section screenshots for key migrated packs.
 * Run: node scripts/audit-screenshots.mjs
 */
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = process.env.AUDIT_BASE || 'http://localhost:5173'
const OUT = path.resolve('scripts/audit-shots')
const PAGES = [
  '/atex-testing-certification',
  '/battery-testing',
  '/emc-emi-testing',
  '/iec-60601-1-testing',
  '/environmental-testing-services',
  '/cable-tray-testing-laboratory',
  '/flame-testing-on-cable-iec-60332-1-2-iec-60332-1-1',
  '/iec-61010-1-testing',
  // MigratedPage packs (skip /salt-spray-testing — redirects to handcrafted /salt-testing)
  '/rohs-testing',
  '/explosion-proof-test',
  '/iec-62368-1-2023-testing',
  '/chemical-testing-and-analysis',
  '/drone-testing-services-by-itc-india',
  '/face-mask-testing-lab',
]

fs.mkdirSync(OUT, { recursive: true })

function slugify(s) {
  return String(s || 'section')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

async function auditPage(browser, route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const name = route.replace(/^\//, '') || 'home'
  const dir = path.join(OUT, name)
  fs.mkdirSync(dir, { recursive: true })

  const url = `${BASE}${route}`
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  if (!res || !res.ok()) {
    console.log(`FAIL ${route} status=${res?.status()}`)
    await page.close()
    return { route, ok: false, issues: [`HTTP ${res?.status()}`] }
  }

  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(dir, '00-full.png'), fullPage: true })

  const sections = await page.$$('main section, .migrated-page > section, .vib.migrated-page > section')
  const issues = []
  let i = 0
  for (const sec of sections) {
    i += 1
    const box = await sec.boundingBox()
    const cls = (await sec.getAttribute('class')) || ''
    const heading = await sec
      .$eval('h1, h2', (el) => el.textContent?.trim() || '')
      .catch(() => '')
    const label = `${String(i).padStart(2, '0')}-${slugify(heading || cls.split(' ')[0] || 'band')}`
    if (box && box.height > 40 && box.width > 40) {
      await sec.screenshot({ path: path.join(dir, `${label}.png`) }).catch(() => {})
    }

    // Heuristics: empty right column / collapsed grids
    const overflow = await sec.evaluate((el) => {
      const problems = []
      const style = getComputedStyle(el)
      const elCls = el.className || ''
      if (el.scrollWidth > el.clientWidth + 8) problems.push('horizontal-overflow')
      const pairs = el.querySelectorAll(
        '.migrated-intro__pair, .migrated-split--media, .migrated-stack__table',
      )
      for (const p of pairs) {
        const r = p.getBoundingClientRect()
        if (r.width < 120) problems.push('collapsed-pair')
        const kids = [...p.children]
        if (kids.length >= 2) {
          const w0 = kids[0].getBoundingClientRect().width
          const w1 = kids[1].getBoundingClientRect().width
          if (w0 > 0 && w1 > 0 && w0 / (w0 + w1) > 0.82) {
            problems.push('unbalanced-split')
          }
        }
      }
      const lightBg =
        elCls.includes('vib-types') ||
        elCls.includes('--light') ||
        elCls.includes('vib-intro') ||
        elCls.includes('migrated-related--light')
      if (lightBg) {
        const whites = [...el.querySelectorAll('h2, p, a, li, td, th')].filter((n) => {
          const c = getComputedStyle(n).color
          return c === 'rgb(255, 255, 255)' || /^rgba\(255,\s*255,\s*255/.test(c)
        })
        if (whites.length > 2) problems.push(`white-on-light:${whites.length}`)
      }
      return { problems, cls: elCls }
    })
    if (overflow.problems.length) {
      issues.push({ section: label, ...overflow })
    }
  }

  // Mobile pass for overview collapse
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(dir, '00-mobile-full.png'), fullPage: true })
  const intro = await page.$('.migrated-intro')
  if (intro) {
    await intro.screenshot({ path: path.join(dir, '00-mobile-intro.png') }).catch(() => {})
  }

  await page.close()
  console.log(`OK ${route} sections=${i} issues=${issues.length}`)
  return { route, ok: true, sections: i, issues }
}

const browser = await chromium.launch({ headless: true })
const report = []
for (const route of PAGES) {
  try {
    report.push(await auditPage(browser, route))
  } catch (err) {
    console.log(`ERR ${route}: ${err.message}`)
    report.push({ route, ok: false, issues: [String(err.message)] })
  }
}
await browser.close()

const summaryPath = path.join(OUT, 'report.json')
fs.writeFileSync(summaryPath, JSON.stringify(report, null, 2))
console.log(`Wrote ${summaryPath}`)
const bad = report.filter((r) => !r.ok || (r.issues && r.issues.length))
console.log(`Done. ${report.length} pages, ${bad.length} with findings.`)
