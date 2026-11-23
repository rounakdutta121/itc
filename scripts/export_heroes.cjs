const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const assets = 'C:/Users/Admin/.cursor/projects/d-itcindia/assets'
const out = path.join(__dirname, '../public/images/migrated-heroes')
fs.mkdirSync(out, { recursive: true })

const names = [
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

;(async () => {
  for (const n of names) {
    const src = path.join(assets, `hero-${n}.jpg`)
    if (!fs.existsSync(src)) {
      console.log('missing', n)
      continue
    }
    await sharp(src)
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(out, `${n}.webp`))
    await sharp(src)
      .resize(1080, 1920, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(out, `${n}-portrait.webp`))
    console.log('ok', n)
  }
})()
