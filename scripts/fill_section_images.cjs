/**
 * Ensure every pack has enough unique page-section images for later bands
 * (Section 03, 04, …). Caps at MAX_SLOTS. Uses AI section-masters pool.
 *
 *   node scripts/fill_section_images.cjs
 *   node scripts/fill_section_images.cjs --max=8
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

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const MAX_SLOTS = Math.max(6, Math.min(20, Number(args.max) || 16))

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
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

function wantsMedia(sec) {
  if ((sec.paragraphs || []).length > 0) return true
  if ((sec.bullets || []).length > 0) return true
  if ((sec.tables || []).length > 0) return true
  return false
}

function slotsNeeded(data) {
  const secs = (data.sections || []).filter((s) => !/conclu/i.test(s.heading))
  const after = secs.slice(1)
  const want = after.filter(wantsMedia).length
  // intro + every narrative band that wants art (floor 6 for polish)
  return Math.min(MAX_SLOTS, Math.max(6, 1 + want))
}

async function ensureMaster(src, destBase) {
  const dest = path.join(MASTER_DIR, `${destBase}.webp`)
  if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) return dest
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

;(async () => {
  // Import any new AI assets
  if (fs.existsSync(ASSETS)) {
    for (const f of fs.readdirSync(ASSETS)) {
      if (!/^ai-section-.*\.(jpg|jpeg|png|webp)$/i.test(f)) continue
      const base = f.replace(/\.(jpg|jpeg|png|webp)$/i, '')
      await ensureMaster(path.join(ASSETS, f), base)
    }
  }
  for (const dir of [LEGACY, HEROES]) {
    if (!fs.existsSync(dir)) continue
    for (const f of fs.readdirSync(dir)) {
      if (!/\.webp$/i.test(f) || /-portrait\.webp$/i.test(f)) continue
      await ensureMaster(path.join(dir, f), `legacy-${f.replace(/\.webp$/i, '')}`)
    }
  }

  const masters = fs
    .readdirSync(MASTER_DIR)
    .filter((f) => f.endsWith('.webp'))
    .map((f) => ({
      path: path.join(MASTER_DIR, f),
      cat: catHint(f),
    }))
  const byCat = { all: masters.map((m) => m.path) }
  for (const m of masters) {
    ;(byCat[m.cat] ||= []).push(m.path)
  }
  console.log('masters', masters.length, 'maxSlots', MAX_SLOTS)

  const counters = {}
  const packs = fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.json')).sort()
  let made = 0
  let updated = 0

  for (const file of packs) {
    const fp = path.join(PACK_DIR, file)
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'))
    const slug = (data.slug || file.replace(/\.json$/, ''))
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .slice(0, 100)
    const cat = data.category || 'general'
    const pool = byCat[cat]?.length ? byCat[cat] : byCat.all
    const need = slotsNeeded(data)
    const sections = []

    for (let slot = 1; slot <= need; slot++) {
      const name = `${slug}-s${slot}.webp`
      const dest = path.join(OUT, name)
      const publicPath = `/images/page-sections/${name}`
      if (!fs.existsSync(dest) || fs.statSync(dest).size < 4000) {
        const key = `${cat}:fill:${slot}`
        const idx = counters[key] || 0
        counters[key] = idx + 1
        const pick =
          pool[(idx + parseInt(hash(slug + ':s' + slot).slice(0, 4), 16)) % pool.length]
        await variant(pick, dest, hash(`${data.path || slug}:s${slot}:fill`))
        made++
      }
      sections.push(publicPath)
    }

    data.generatedSections = sections
    data.generatedIntro = sections[0]
    data.generatedMid = sections[1] || sections[0]
    fs.writeFileSync(fp, JSON.stringify(data, null, 2))
    updated++
    if (updated % 50 === 0) console.log('updated', updated, 'new files', made)
  }

  console.log(JSON.stringify({ packs: updated, newFiles: made, maxSlots: MAX_SLOTS }, null, 2))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
