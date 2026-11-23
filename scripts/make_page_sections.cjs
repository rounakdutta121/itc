/**
 * Generate unique AI section images per migrated pack (no reuse across pages).
 * Uses Pollinations (Flux) → sharp webp → assigns generatedSections / intro / mid.
 *
 * Usage:
 *   node scripts/make_page_sections.cjs           # all packs, 3 slots each
 *   node scripts/make_page_sections.cjs --limit=20
 *   node scripts/make_page_sections.cjs --slots=3 --concurrency=3
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const PACK_DIR = path.join(ROOT, 'public/data/migrated')
const OUT = path.join(ROOT, 'public/images/page-sections')
fs.mkdirSync(OUT, { recursive: true })

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  }),
)
const SLOTS = Math.max(2, Math.min(5, Number(args.slots) || 3))
const LIMIT = args.limit ? Number(args.limit) : Infinity
const CONCURRENCY = Math.max(1, Math.min(6, Number(args.concurrency) || 3))
const FORCE = Boolean(args.force)

const PROMPTS = {
  emc: [
    'professional EMC EMI test laboratory anechoic chamber with antenna and RF equipment, documentary photo, no text',
    'engineer measuring electromagnetic emissions on electronic device in lab, realistic photo, no text',
    'spectrum analyzer and EMI receiver on test bench in accredited lab, documentary, no text',
  ],
  photometry: [
    'integrating sphere photometry laboratory measuring LED luminaire, professional photo, no text',
    'technician aligning optical goniophotometer for lighting test, documentary lab photo, no text',
    'LED lighting product under photometric measurement in dark lab, realistic, no text',
  ],
  battery: [
    'battery testing laboratory with cyclers and environmental chambers, professional photo, no text',
    'engineer inspecting lithium ion cells on safety test rig, documentary, no text',
    'stationary lead acid battery bank under capacity test, realistic lab photo, no text',
  ],
  medical: [
    'medical device electrical safety testing laboratory IEC 60601, professional photo, no text',
    'biomedical engineer testing patient monitor on lab bench, documentary, no text',
    'hospital medical equipment compliance test setup, realistic photo, no text',
  ],
  calibration: [
    'precision calibration laboratory with reference instruments, professional photo, no text',
    'metrology technician calibrating sensor on certified bench, documentary, no text',
    'calibration of electrical measuring equipment in NABL lab, realistic, no text',
  ],
  ip: [
    'IP ingress protection water spray test chamber for electronics, professional photo, no text',
    'dust chamber IP testing of industrial enclosure, documentary lab photo, no text',
    'waterproof product under rain test nozzle in laboratory, realistic, no text',
  ],
  chemical: [
    'chemical analysis laboratory fume hood with glassware, professional photo, no text',
    'scientist performing RoHS material compliance testing, documentary, no text',
    'analytical chemistry instruments for product safety testing, realistic, no text',
  ],
  mechanical: [
    'mechanical vibration and shock test laboratory with shaker table, professional photo, no text',
    'motor torque and speed testing dynamometer in industrial lab, documentary, no text',
    'drop impact testing equipment for product packaging, realistic lab photo, no text',
  ],
  electrical: [
    'electrical safety testing laboratory high voltage bench, professional photo, no text',
    'engineer performing dielectric withstand test on appliance, documentary, no text',
    'switchgear and cable testing in accredited electrical lab, realistic, no text',
  ],
  general: [
    'modern accredited product testing laboratory India, professional documentary photo, no text',
    'quality engineer inspecting industrial specimen in test lab, realistic photo, no text',
    'environmental test chamber in compliance laboratory, professional photo, no text',
  ],
}

function hash(s) {
  return crypto.createHash('md5').update(s).digest('hex')
}

function seedInt(key) {
  return parseInt(hash(key).slice(0, 8), 16)
}

function promptFor(cat, slot, slug) {
  const list = PROMPTS[cat] || PROMPTS.general
  const base = list[slot % list.length]
  // Slight topic hint from slug so images differ even within category
  const hint = slug.replace(/-/g, ' ').slice(0, 48)
  return `${base}, related to ${hint}, unique composition, natural lighting`
}

function pollinationsUrl(prompt, seed) {
  const q = encodeURIComponent(prompt)
  return `https://image.pollinations.ai/prompt/${q}?width=1024&height=768&seed=${seed}&nologo=true&enhance=true&model=flux`
}

async function downloadToWebp(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ITCIndia-section-gen/1.0' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.byteLength < 4000) throw new Error(`too small ${buf.byteLength}`)
  await sharp(buf)
    .resize(960, 720, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toFile(dest)
}

async function mapPool(items, concurrency, worker) {
  let i = 0
  const runners = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++
      await worker(items[idx], idx)
    }
  })
  await Promise.all(runners)
}

;(async () => {
  const files = fs
    .readdirSync(PACK_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .slice(0, LIMIT)

  const jobs = []
  for (const file of files) {
    const fp = path.join(PACK_DIR, file)
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'))
    const slug = (data.slug || file.replace(/\.json$/, ''))
      .replace(/[\\/]+/g, '-')
      .replace(/[^a-zA-Z0-9._-]+/g, '-')
      .slice(0, 100)
    const cat = data.category || 'general'

    for (let slot = 1; slot <= SLOTS; slot++) {
      const name = `${slug}-s${slot}.webp`
      const dest = path.join(OUT, name)
      const publicPath = `/images/page-sections/${name}`
      const exists = fs.existsSync(dest) && fs.statSync(dest).size > 4000
      jobs.push({
        fp,
        file,
        data,
        slug,
        cat,
        slot,
        dest,
        publicPath,
        skip: exists && !FORCE,
      })
    }
  }

  // Deduplicate pack writes: process downloads first, then write JSON once per pack
  let done = 0
  let failed = 0
  const byPack = new Map()

  await mapPool(
    jobs.filter((j) => !j.skip),
    CONCURRENCY,
    async (job) => {
      const prompt = promptFor(job.cat, job.slot - 1, job.slug)
      const seed = seedInt(`${job.slug}:s${job.slot}:${job.cat}`)
      const url = pollinationsUrl(prompt, seed)
      try {
        await downloadToWebp(url, job.dest)
        done++
        if (done % 10 === 0) console.log('generated', done, 'failed', failed)
      } catch (e) {
        failed++
        console.warn('fail', job.publicPath, e.message)
        // retry once with different seed
        try {
          await downloadToWebp(pollinationsUrl(prompt, seed + 97), job.dest)
          done++
          failed--
        } catch (e2) {
          console.warn('retry fail', job.publicPath, e2.message)
        }
      }
    },
  )

  // Assign paths into packs — only files that exist
  for (const job of jobs) {
    if (!byPack.has(job.fp)) byPack.set(job.fp, { data: job.data, paths: [] })
  }
  for (const job of jobs) {
    if (fs.existsSync(job.dest) && fs.statSync(job.dest).size > 4000) {
      byPack.get(job.fp).paths[job.slot - 1] = job.publicPath
    }
  }

  let assigned = 0
  for (const [fp, { data, paths }] of byPack) {
    const sections = paths.filter(Boolean)
    if (!sections.length) continue
    data.generatedSections = sections
    data.generatedIntro = sections[0]
    data.generatedMid = sections[1] || sections[0]
    // Clear shared category fillers so resolveImages cannot reuse them
    fs.writeFileSync(fp, JSON.stringify(data, null, 2))
    assigned++
  }

  console.log(
    JSON.stringify(
      {
        packs: files.length,
        slots: SLOTS,
        generated: done,
        failed,
        assigned,
        out: OUT,
      },
      null,
      2,
    ),
  )
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
