import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const srcDir = 'C:/Users/Admin/.cursor/projects/d-itcindia/assets'
const outDir = 'D:/itcindia/public/images/decor'
fs.mkdirSync(outDir, { recursive: true })

const files = fs
  .readdirSync(srcDir)
  .filter((f) => f.startsWith('decor-') && /\.jpe?g$/i.test(f))

function removeNearWhite(data, info, threshold = 242, soft = 22) {
  const out = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const avg = (r + g + b) / 3
    const lowChroma = max - min <= 14
    const isBg = lowChroma && avg >= threshold - soft

    out[j] = r
    out[j + 1] = g
    out[j + 2] = b

    if (isBg) {
      if (avg >= threshold) {
        out[j + 3] = 0
      } else {
        out[j + 3] = Math.round(255 * ((threshold - avg) / soft))
      }
    } else {
      out[j + 3] = 255
    }
  }
  return out
}

for (const file of files) {
  const input = path.join(srcDir, file)
  const name = file.replace(/\.jpe?g$/i, '.webp')
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const rgba = removeNearWhite(data, info)
  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(outDir, name))

  console.log('ok', name)
}

// cleanup wrongly named leftovers
for (const leftover of fs.readdirSync(outDir)) {
  if (leftover.endsWith('.jpg')) {
    fs.unlinkSync(path.join(outDir, leftover))
    console.log('removed', leftover)
  }
}
