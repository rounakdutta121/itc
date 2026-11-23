/**
 * Instant unique page-section files from category masters (sharp variants).
 * Ensures no shared SECTION_ART reuse while AI generation catches up.
 * Later: node scripts/make_page_sections.cjs --force overwrites with AI.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const PACK_DIR = path.join(ROOT, 'public/data/migrated')
const MASTER = path.join(ROOT, 'public/images/migrated-sections')
const HERO_MASTER = path.join(ROOT, 'public/images/migrated-heroes')
const OUT = path.join(ROOT, 'public/images/page-sections')
fs.mkdirSync(OUT, { recursive: true })

const SLOTS = 3

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

function masterFor(cat, slot) {
  const candidates = [
    path.join(MASTER, `${cat}-${slot}.webp`),
    path.join(MASTER, `${cat}-1.webp`),
    path.join(MASTER, `general-${((slot - 1) % 2) + 1}.webp`),
    path.join(HERO_MASTER, `${cat}.webp`),
    path.join(HERO_MASTER, 'general.webp'),
    path.join(MASTER, 'general-1.webp'),
  ]
  return candidates.find((p) => fs.existsSync(p))
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
  const position = positions[n % positions.length]
  const brightness = 0.92 + ((n >> 3) % 14) / 100
  const saturation = 0.9 + ((n >> 7) % 18) / 100
  const hue = ((n >> 11) % 21) - 10

  await sharp(src)
    .resize(960, 720, { fit: 'cover', position })
    .modulate({ brightness, saturation, hue })
    .webp({ quality: 82 })
    .toFile(dest)
}

;(async () => {
  const files = fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.json')).sort()
  let n = 0
  for (const file of files) {
    const fp = path.join(PACK_DIR, file)
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'))
    const slug = (data.slug || file.replace(/\.json$/, ''))
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .slice(0, 100)
    const cat = data.category || 'general'
    const sections = []

    for (let slot = 1; slot <= SLOTS; slot++) {
      const name = `${slug}-s${slot}.webp`
      const dest = path.join(OUT, name)
      const src = masterFor(cat, slot)
      if (!src) continue
      // Skip if a real AI file already exists and is large enough
      if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) {
        sections.push(`/images/page-sections/${name}`)
        continue
      }
      await variant(src, dest, hash(`${data.path || slug}:s${slot}`))
      sections.push(`/images/page-sections/${name}`)
    }

    if (!sections.length) continue
    data.generatedSections = sections
    data.generatedIntro = sections[0]
    data.generatedMid = sections[1] || sections[0]
    fs.writeFileSync(fp, JSON.stringify(data, null, 2))
    n++
    if (n % 50 === 0) console.log('bootstrapped', n)
  }
  console.log('bootstrapped packs', n, '→', OUT)
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
