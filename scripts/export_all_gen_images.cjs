const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const assets = 'C:/Users/Admin/.cursor/projects/d-itcindia/assets'
const heroOut = path.join(__dirname, '../public/images/migrated-heroes')
const sectionOut = path.join(__dirname, '../public/images/migrated-sections')
fs.mkdirSync(heroOut, { recursive: true })
fs.mkdirSync(sectionOut, { recursive: true })

const cats = [
  'electrical',
  'emc',
  'photometry',
  'battery',
  'medical',
  'calibration',
  'ip',
  'chemical',
  'mechanical',
  'general',
]

async function exportHero(src, base) {
  await sharp(src)
    .resize(1920, 1080, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(path.join(heroOut, `${base}.webp`))
  await sharp(src)
    .resize(1080, 1920, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(heroOut, `${base}-portrait.webp`))
  console.log('hero', base)
}

async function exportSection(src, base) {
  await sharp(src)
    .resize(1400, 1050, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(path.join(sectionOut, `${base}.webp`))
  console.log('section', base)
}

;(async () => {
  for (const c of cats) {
    const a = path.join(assets, `hero-${c}.jpg`)
    const b = path.join(assets, `hero-${c}-2.jpg`)
    if (fs.existsSync(a)) await exportHero(a, c)
    if (fs.existsSync(b)) await exportHero(b, `${c}-2`)
    const s1 = path.join(assets, `section-${c}-1.jpg`)
    const s2 = path.join(assets, `section-${c}-2.jpg`)
    if (fs.existsSync(s1)) await exportSection(s1, `${c}-1`)
    if (fs.existsSync(s2)) await exportSection(s2, `${c}-2`)
  }
})()
