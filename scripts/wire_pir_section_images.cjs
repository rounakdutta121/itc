/**
 * Import generated PIR AI images → section masters + unique page-section slots
 * and assign them on the PIR migrated pack.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const ASSETS = path.join(ROOT, 'assets')
const CURSOR_ASSETS = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/d-itcindia/assets',
)
const MASTER_DIR = path.join(ROOT, 'public/images/section-masters')
const OUT = path.join(ROOT, 'public/images/page-sections')
const PACK = path.join(
  ROOT,
  'public/data/migrated/pirpassive-infrared-sensor-testing.json',
)
const SLUG = 'pirpassive-infrared-sensor-testing'

fs.mkdirSync(MASTER_DIR, { recursive: true })
fs.mkdirSync(OUT, { recursive: true })

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

async function toMaster(src, base) {
  const dest = path.join(MASTER_DIR, `${base}.webp`)
  await sharp(src)
    .resize(1280, 960, { fit: 'cover', position: 'attention' })
    .webp({ quality: 86 })
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
      brightness: 0.92 + ((n >> 3) % 12) / 100,
      saturation: 0.9 + ((n >> 7) % 16) / 100,
      hue: ((n >> 11) % 17) - 8,
    })
    .webp({ quality: 84 })
    .toFile(dest)
}

function findPirSources() {
  const dirs = [ASSETS, CURSOR_ASSETS].filter((d) => fs.existsSync(d))
  const hits = []
  for (const dir of dirs) {
    for (const f of fs.readdirSync(dir)) {
      if (!/^ai-section-pir-\d+\.(jpg|jpeg|png|webp)$/i.test(f)) continue
      hits.push(path.join(dir, f))
    }
  }
  hits.sort((a, b) => a.localeCompare(b))
  return hits
}

;(async () => {
  const sources = findPirSources()
  if (!sources.length) {
    console.error('No ai-section-pir-* images found')
    process.exit(1)
  }
  console.log('sources', sources.length, sources.map((s) => path.basename(s)))

  const masters = []
  for (const src of sources) {
    const base = path.basename(src).replace(/\.(jpg|jpeg|png|webp)$/i, '')
    masters.push(await toMaster(src, base))
  }

  // Also copy masters into project assets for fill pipeline
  for (const src of sources) {
    const dest = path.join(ASSETS, path.basename(src).replace(/\.png$/i, '.jpg'))
    if (!fs.existsSync(dest) && fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, dest)
      } catch {
        /* ignore */
      }
    }
  }

  const need = 8
  const sections = []
  for (let slot = 1; slot <= need; slot++) {
    const name = `${SLUG}-s${slot}.webp`
    const dest = path.join(OUT, name)
    const master = masters[(slot - 1) % masters.length]
    await variant(master, dest, hash(`${SLUG}:s${slot}:pir`))
    sections.push(`/images/page-sections/${name}`)
    console.log('wrote', name, fs.statSync(dest).size)
  }

  const data = JSON.parse(fs.readFileSync(PACK, 'utf8'))
  data.generatedSections = sections
  data.generatedIntro = sections[0]
  data.generatedMid = sections[1]

  // Attach unique art onto story sections that lack images
  const secs = data.sections || []
  let slot = 1 // s1 reserved for intro media via generatedIntro
  for (let i = 1; i < secs.length; i++) {
    const sec = secs[i]
    if (/conclu/i.test(sec.heading || '')) continue
    const has = (sec.images || []).some((im) => im?.src)
    if (has) continue
    const src = sections[Math.min(slot, sections.length - 1)]
    sec.images = [
      {
        src,
        alt: `${sec.heading || 'PIR testing'} — ITC India laboratory`,
      },
    ]
    slot += 1
  }

  fs.writeFileSync(PACK, JSON.stringify(data, null, 2))
  console.log(JSON.stringify({ sections, attached: slot - 1 }, null, 2))
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
