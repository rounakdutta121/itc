/**
 * Import Cursor-generated AI section masters + rebuild unique per-page images.
 * Each pack gets 3 unique file paths; masters are round-robined so pages
 * do not share the same source look consecutively.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const ASSETS = path.join(ROOT, 'assets') // D: project assets (C: is full)
const MASTER_DIR = path.join(ROOT, 'public/images/section-masters')
const PACK_DIR = path.join(ROOT, 'public/data/migrated')
const OUT = path.join(ROOT, 'public/images/page-sections')
const LEGACY = path.join(ROOT, 'public/images/migrated-sections')
const HEROES = path.join(ROOT, 'public/images/migrated-heroes')

fs.mkdirSync(MASTER_DIR, { recursive: true })
fs.mkdirSync(OUT, { recursive: true })

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

async function toMaster(src, destBase) {
  const dest = path.join(MASTER_DIR, `${destBase}.webp`)
  await sharp(src)
    .resize(1280, 960, { fit: 'cover', position: 'attention' })
    .webp({ quality: 85 })
    .toFile(dest)
  return dest
}

async function variant(src, dest, seed) {
  const n = parseInt(seed.slice(0, 8), 16)
  const positions = [
    'centre',
    'entropy',
    'attention',
    'north',
    'south',
    'east',
    'west',
    'northeast',
    'northwest',
    'southeast',
    'southwest',
  ]
  await sharp(src)
    .resize(960, 720, {
      fit: 'cover',
      position: positions[n % positions.length],
    })
    .modulate({
      brightness: 0.9 + ((n >> 3) % 16) / 100,
      saturation: 0.88 + ((n >> 7) % 20) / 100,
      hue: ((n >> 11) % 25) - 12,
    })
    .webp({ quality: 82 })
    .toFile(dest)
}

function catHint(name) {
  const n = name.toLowerCase()
  if (n.includes('emc')) return 'emc'
  if (n.includes('battery')) return 'battery'
  if (n.includes('medical')) return 'medical'
  if (n.includes('photometry')) return 'photometry'
  if (n.includes('electrical')) return 'electrical'
  if (n.includes('mechanical')) return 'mechanical'
  if (n.includes('chemical')) return 'chemical'
  if (n.includes('calibrat')) return 'calibration'
  if (n.includes('ip')) return 'ip'
  return 'general'
}

;(async () => {
  // 1) Import AI assets
  const aiFiles = fs
    .readdirSync(ASSETS)
    .filter((f) => /^ai-section-.*\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()

  const imported = []
  for (const f of aiFiles) {
    const base = f.replace(/\.(jpg|jpeg|png|webp)$/i, '')
    const dest = await toMaster(path.join(ASSETS, f), base)
    imported.push({ path: dest, cat: catHint(base) })
    console.log('imported', base)
  }

  // 2) Also include existing category section + hero masters
  for (const dir of [LEGACY, HEROES]) {
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) {
      if (!/\.webp$/i.test(f)) continue
      if (/-portrait\.webp$/i.test(f)) continue
      const base = `legacy-${f.replace(/\.webp$/i, '')}`
      const dest = path.join(MASTER_DIR, `${base}.webp`)
      if (!fs.existsSync(dest)) {
        await sharp(path.join(dir, f))
          .resize(1280, 960, { fit: 'cover' })
          .webp({ quality: 84 })
          .toFile(dest)
      }
      imported.push({ path: dest, cat: catHint(f) })
    }
  }

  const masters = [...new Map(imported.map((m) => [m.path, m])).values()]
  console.log('masters', masters.length)

  const byCat = {}
  for (const m of masters) {
    ;(byCat[m.cat] ||= []).push(m.path)
    ;(byCat.all ||= []).push(m.path)
  }

  // 3) Rebuild unique page-sections — round-robin within category pool
  const counters = {}
  const packs = fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.json')).sort()
  let n = 0
  for (const file of packs) {
    const fp = path.join(PACK_DIR, file)
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'))
    const slug = (data.slug || file.replace(/\.json$/, ''))
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .slice(0, 100)
    const cat = data.category || 'general'
    const pool = byCat[cat]?.length ? byCat[cat] : byCat.all
    const sections = []

    for (let slot = 1; slot <= 3; slot++) {
      const key = `${cat}:${slot}`
      const idx = counters[key] || 0
      counters[key] = idx + 1
      // Also offset by pack hash so same-category pages diverge across slots
      const pick = pool[(idx + parseInt(hash(slug + slot).slice(0, 4), 16)) % pool.length]
      const name = `${slug}-s${slot}.webp`
      const dest = path.join(OUT, name)
      await variant(pick, dest, hash(`${data.path || slug}:s${slot}:v2`))
      sections.push(`/images/page-sections/${name}`)
    }

    data.generatedSections = sections
    data.generatedIntro = sections[0]
    data.generatedMid = sections[1]
    fs.writeFileSync(fp, JSON.stringify(data, null, 2))
    n++
    if (n % 50 === 0) console.log('rebuilt', n)
  }

  console.log(
    JSON.stringify(
      { packs: n, masters: masters.length, aiImported: aiFiles.length, out: OUT },
      null,
      2,
    ),
  )
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
