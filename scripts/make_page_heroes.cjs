/**
 * Create a unique hero (and portrait) per migrated page from category masters.
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const PACK_DIR = path.join(ROOT, 'public/data/migrated')
const MASTER = path.join(ROOT, 'public/images/migrated-heroes')
const OUT = path.join(ROOT, 'public/images/page-heroes')
fs.mkdirSync(OUT, { recursive: true })

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

async function variant(src, dest, w, h, seed) {
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
  const brightness = 0.94 + ((n >> 3) % 12) / 100
  const saturation = 0.92 + ((n >> 7) % 16) / 100

  await sharp(src)
    .resize(w, h, { fit: 'cover', position })
    .modulate({ brightness, saturation })
    .webp({ quality: 82 })
    .toFile(dest)
}

;(async () => {
  const packs = fs.readdirSync(PACK_DIR).filter((f) => f.endsWith('.json'))
  let i = 0
  for (const file of packs) {
    const data = JSON.parse(fs.readFileSync(path.join(PACK_DIR, file), 'utf8'))
    const cat = data.category || 'general'
    const masterBase = (data.hero || '').includes('-2.webp') ? `${cat}-2` : cat
    let master = path.join(MASTER, `${masterBase}.webp`)
    if (!fs.existsSync(master)) master = path.join(MASTER, `${cat}.webp`)
    if (!fs.existsSync(master)) master = path.join(MASTER, 'general.webp')

    const slug = (data.slug || file.replace(/\.json$/, ''))
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .slice(0, 100)
    const seed = hash(data.path || slug)
    const land = path.join(OUT, `${slug}.webp`)
    const port = path.join(OUT, `${slug}-portrait.webp`)
    await variant(master, land, 1920, 1080, seed)
    await variant(master, port, 1080, 1920, `${seed}p`)

    data.hero = `/images/page-heroes/${slug}.webp`
    data.heroPortrait = `/images/page-heroes/${slug}-portrait.webp`
    fs.writeFileSync(path.join(PACK_DIR, file), JSON.stringify(data, null, 2))
    i++
    if (i % 50 === 0) console.log('heroes', i)
  }
  console.log('unique page heroes', i)
})()
