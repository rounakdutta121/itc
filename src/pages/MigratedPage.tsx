import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../data/content'
import { QuoteStrip } from '../components/QuoteStrip'
import { Metrics } from '../components/Metrics'
import { SiteLink } from '../components/SiteLink'
import './VibrationTestingPage.css'
import './MigratedPage.css'

type ContentTable = {
  headers: string[]
  rows: string[][]
}

type ImageRef = { src: string; alt: string }

type Section = {
  heading: string
  paragraphs: string[]
  bullets: string[]
  tables?: ContentTable[]
  images?: ImageRef[]
}

type RelatedLink = { href: string; label: string }

export type MigratedPack = {
  path: string
  slug: string
  action: string
  ok: boolean
  title: string
  h1: string
  description: string
  sections: Section[]
  images: ImageRef[]
  scrapedImages?: ImageRef[]
  hero: string | null
  heroPortrait?: string | null
  generatedIntro?: string | null
  generatedMid?: string | null
  /** Unique per-page section art — never shared across packs */
  generatedSections?: string[]
  category?: string
  source: string
  note?: string
  relatedLinks?: RelatedLink[]
}

const ANCHOR_SPLIT = /(<a\s+href="[^"]*">[^<]*<\/a>)/gi
const ANCHOR_MATCH = /^<a\s+href="([^"]*)">([^<]*)<\/a>$/i

function plainText(s: string) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function LinkedText({ text }: { text: string }) {
  if (!text.includes('<a ')) return <>{text}</>
  const parts = text.split(ANCHOR_SPLIT)
  const nodes: ReactNode[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue
    const m = part.match(ANCHOR_MATCH)
    if (m) {
      nodes.push(
        <SiteLink key={`a-${i}`} href={m[1]} className="migrated-inline-link">
          {m[2]}
        </SiteLink>,
      )
    } else {
      nodes.push(<Fragment key={`t-${i}`}>{part}</Fragment>)
    }
  }
  return <>{nodes}</>
}

function SectionTables({ tables, dark }: { tables?: ContentTable[]; dark?: boolean }) {
  if (!tables?.length) return null
  return (
    <>
      {tables.map((table, ti) => (
        <div
          key={`table-${ti}`}
          className={
            dark
              ? 'migrated-table-wrap migrated-table-wrap--on-dark'
              : 'migrated-table-wrap'
          }
          role="region"
          aria-label="Reference table"
        >
          <table className="migrated-table">
            {table.headers?.length ? (
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={`r-${ri}`}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={`c-${ci}`} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`c-${ci}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

/** Break wall-of-text scraped copy into readable paragraphs. */
function splitReadable(paragraphs: string[]): string[] {
  const out: string[] = []
  for (const raw of paragraphs) {
    let text = raw.trim()
    if (!text) continue
    // Fix missing space after periods common in scraped packs
    text = unglue(text)
    if (plainText(text).length < 280 || text.includes('<a ')) {
      out.push(text)
      continue
    }
    const parts = text.split(/(?<=\.)\s+(?=[A-Z0-9“"(])/)
    if (parts.length < 2) {
      out.push(text)
      continue
    }
    let buf = ''
    for (const part of parts) {
      const next = buf ? `${buf} ${part}` : part
      if (plainText(next).length > 240 && buf) {
        out.push(buf.trim())
        buf = part
      } else {
        buf = next
      }
    }
    if (buf.trim()) out.push(buf.trim())
  }
  return out.length ? out : paragraphs
}

/** Timeline steps only when the source already has structured lists. */
function howStepsFrom(sec: Section): string[] {
  if (sec.bullets.length > 1) return sec.bullets
  if (sec.paragraphs.length > 2) {
    return sec.paragraphs.map((p) => unglue(p))
  }
  const numbered = extractNumberedPoints(sec.paragraphs)
  if (numbered.length >= 3) return numbered
  return []
}

/** Normalize scraped glue: "end.Next" / "end.2)" → spaced. */
function unglue(text: string) {
  return text
    .replace(/\.([A-Z])/g, '. $1')
    .replace(/\.(\d+[).])/g, '. $1')
    .replace(/:(\d+[).])/g, ': $1')
}

/** Pull "1) … 2) …" style points into cards when present. */
function extractNumberedPoints(paragraphs: string[]): string[] {
  const blob = unglue(plainText(paragraphs.join(' ')))
  const matches = [
    ...blob.matchAll(/(?:^|[\s:])(\d+)[).]\s*(.+?)(?=(?:\s+\d+[).]\s*)|$)/g),
  ]
  if (matches.length < 3) return []
  return matches
    .map((m) =>
      m[2]
        .replace(/\s+/g, ' ')
        .replace(/\s*(?:Investing in|Ultimately|So if you) .*$/i, '')
        .trim(),
    )
    .filter((t) => t.length > 12 && t.length < 320)
    .slice(0, 8)
}

/** Terms / definitions / symbols glossary bands (not benefit cards). */
function isGlossarySection(heading: string) {
  return /\bterms?\b|\bdefinitions?\b|\bsymbols?\b|\babbreviations?\b|\babbreviated terms\b/i.test(
    heading,
  )
}

/** Short service/page cue for eyebrows — e.g. “Motor torque”, “PIR”, “ATEX”. */
function serviceCue(topic: string) {
  const t = topic
    .replace(/\(.*?\)/g, ' ')
    .replace(/\b(testing|test|certification|laboratory|lab|services?|standard)\b/gi, ' ')
    .replace(/[&|/–—,:]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const words = t.split(' ').filter(Boolean)
  if (!words.length) return 'Lab'
  if (words[0].length <= 5 && words.length >= 2) return words.slice(0, 2).join(' ')
  return words.slice(0, Math.min(3, words.length)).join(' ').slice(0, 22)
}

function normLabel(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

/**
 * Unique eyebrow per band: never equals the H2, never repeats on the page,
 * and carries service + section meaning. Handcrafted pages do not use this.
 */
function claimSectionEyebrow(
  heading: string,
  topic: string,
  used: Set<string>,
  kind: 'story' | 'how' | 'glossary' = 'story',
) {
  const h = heading.replace(/\s+/g, ' ').trim()
  const cue = serviceCue(topic || h)
  const headingNorm = normLabel(h)

  const role = (() => {
    if (kind === 'glossary' || isGlossarySection(h)) return 'Definitions'
    if (kind === 'how' || /how (to|we|do|does|is|are)\b|procedure|step[- ]by[- ]step|testing process/i.test(h)) {
      return 'Procedure'
    }
    if (/^why\b|importance|why it matters|benefits?\b/i.test(h)) return 'Impact'
    if (/^what is\b|^what are\b|^overview\b|^introduction\b|^about\b/i.test(h)) return 'Overview'
    if (/scope|field of application|coverage|applicability/i.test(h)) return 'Scope'
    if (/normative references|references\b/i.test(h)) return 'References'
    if (/classificat/i.test(h)) return 'Classification'
    if (/require|complian|conform/i.test(h)) return 'Requirements'
    if (/method|approach|technique/i.test(h)) return 'Methods'
    if (/what we (check|evaluate|test)|test checks|laboratory capability|what we evaluate/i.test(h)) {
      return 'Checks'
    }
    if (/in practice|key considerations/i.test(h)) return 'Practice'
    if (/when to\b|when should|timing/i.test(h)) return 'Timing'
    if (/type of|types of|kinds of/i.test(h)) return 'Types'
    if (/packaging|transport|marking|document/i.test(h)) return 'Documents'
    if (/safety|hazard|risk/i.test(h)) return 'Safety'
    if (/calibration|metrology/i.test(h)) return 'Calibration'
    if (/reference table/i.test(h)) return 'Reference'
    if (/conclusion|summary|wrap[- ]?up/i.test(h)) return 'Wrap-up'
    return ''
  })()

  const headingBits = h
    .replace(/\(.*?\)/g, ' ')
    .replace(/[|/–—,:]+/g, ' ')
    .replace(
      /\b(the|a|an|of|and|for|to|in|on|with|from|how|what|why|is|are|we|it|this|these|those|our|your)\b/gi,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((w) => w.length > 2)

  const roleAlts: Record<string, string[]> = {
    Impact: ['Business value', 'Payoff', 'Value case', 'Why test'],
    Checks: ['Lab checks', 'Evaluation', 'Specimen checks', 'Verification'],
    Overview: ['At a glance', 'Service brief', 'Context', 'Introduction'],
    Procedure: ['Test steps', 'How we test', 'Work method', 'Process'],
    Methods: ['Approach', 'Technique', 'Protocol', 'Test method'],
    Definitions: ['Glossary', 'Key terms', 'Nomenclature', 'Lexicon'],
    Reference: ['Data table', 'Clause list', 'Spec table', 'Annex'],
    Scope: ['Coverage', 'Applicability', 'Field of use', 'Boundaries'],
    Timing: ['When to book', 'Test timing', 'Use cases', 'Cadence'],
  }

  const candidates = [
    role && cue ? `${cue} · ${role}` : '',
    role && cue ? `${role} · ${cue}` : '',
    ...(roleAlts[role] || []).flatMap((alt) =>
      cue ? [`${cue} · ${alt}`, alt, `${alt} · ${cue}`] : [alt],
    ),
    role ? `${role} focus` : '',
    cue && role ? `${cue} ${role.toLowerCase()}` : '',
    headingBits.length >= 2 ? headingBits.slice(0, 2).join(' ') : '',
    headingBits.length >= 3 ? headingBits.slice(0, 3).join(' ') : '',
    cue ? `${cue} insight` : '',
    cue ? `${cue} detail` : '',
    cue ? `${cue} notes` : '',
    role || '',
    cue || '',
    'Lab insight',
    'Service note',
    'Test focus',
    'Compliance note',
  ]
    .map((c) => c.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((c) => (c.length > 28 ? c.slice(0, 28).replace(/\s+\S*$/, '').trim() : c))

  const overlapsHeading = (label: string) => {
    const n = normLabel(label)
    if (!n) return true
    if (n === headingNorm) return true
    // Avoid “Why it matters” eyebrow over the same H2
    if (headingNorm.startsWith(n) && n.length >= 8) return true
    if (n.startsWith(headingNorm) && headingNorm.length >= 8) return true
    return false
  }

  for (const c of candidates) {
    const n = normLabel(c)
    if (overlapsHeading(c) || used.has(n)) continue
    used.add(n)
    return c
  }

  // Guaranteed unique fallback
  for (let n = 1; n < 40; n++) {
    const label = `${cue} · note ${String(n).padStart(2, '0')}`
    const key = normLabel(label)
    if (overlapsHeading(label) || used.has(key)) continue
    used.add(key)
    return label
  }
  const last = `${cue} · band`
  used.add(normLabel(last))
  return last
}

type GlossaryEntry = { code: string; term: string; body: string }

/** Parse glossary blobs: "1.1 Term Def…", "Term: Def", or "–Term: Def". */
function extractGlossaryEntries(
  paragraphs: string[],
  bullets: string[] = [],
): GlossaryEntry[] {
  const out: GlossaryEntry[] = []
  const push = (code: string, term: string, body: string) => {
    const t = term.replace(/^[-–—•]+\s*/, '').trim()
    const b = body.replace(/\s+/g, ' ').trim()
    if (t.length < 2 || b.length < 6) return
    out.push({ code, term: t, body: b })
  }

  const blob = unglue(plainText(paragraphs.join(' '))).trim()

  // Style A — IEC "1.1 TermName Definition…"
  if (/\d+\.\d+\s+[A-Za-z]/.test(blob)) {
    const trimmed = blob.replace(/^.*?(?=\d+\.\d+\s+[A-Za-z])/i, '')
    const chunks = trimmed
      .split(/(?=\d+\.\d+\s+)/)
      .map((c) => c.trim())
      .filter(Boolean)
    for (const chunk of chunks) {
      const m = chunk.match(/^(\d+\.\d+)\s+(.+)$/)
      if (!m) continue
      const rest = m[2].replace(/\s+/g, ' ').trim()
      const split =
        rest.match(
          /^((?:[A-Z][A-Za-z0-9/()’-]*(?:\s+[A-Za-z0-9/()’-]*){0,5}?))\s+((?:A|An|The|Safe|medical|Medical|equipment|Equipment|A\s).+)$/,
        ) || rest.match(/^(.{3,72}?)\s+([A-Z].{12,})$/)
      const term = (split?.[1] || rest.split(/\s+/).slice(0, 4).join(' ')).trim()
      const body = (split?.[2] || rest.slice(term.length).trim() || rest).trim()
      push(m[1], term, body)
    }
  }

  // Style B — "Term: definition" (inline or bullet)
  if (out.length < 2) {
    const sources = [
      ...blob.split(/(?=(?:^|[\s–—-])[A-Z][A-Za-z0-9/()’\s-]{1,40}:\s+)/),
      ...bullets.map((b) => plainText(b)),
    ]
    let n = 0
    for (const raw of sources) {
      const m = plainText(raw)
        .replace(/^[-–—•*\d.]+\s*/, '')
        .match(/^([A-Za-z][A-Za-z0-9/()’\s.-]{1,48}?):\s*(.{6,})$/)
      if (!m) continue
      n += 1
      push(String(n).padStart(2, '0'), m[1].trim(), m[2].trim())
    }
  }

  return out.slice(0, 20)
}

function CopyBlock({
  paragraphs,
  bullets,
}: {
  paragraphs: string[]
  bullets?: string[]
}) {
  const readable = splitReadable(paragraphs)
  return (
    <>
      {readable.map((p, i) => (
        <p key={`${plainText(p).slice(0, 40)}-${i}`}>
          <LinkedText text={p} />
        </p>
      ))}
      {bullets?.length ? (
        <ul className="migrated-bullets">
          {bullets.map((b, i) => (
            <li key={`${plainText(b).slice(0, 40)}-${i}`}>
              <LinkedText text={b} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

/**
 * Character budget for copy beside a featured image so left text height
 * matches the fixed media frame on every migrated page.
 * Calibrated to ~8 body lines in the split column (~58ch).
 */
const MEDIA_COPY_CHARS = 560
const MEDIA_COPY_MIN = 420

function truncateToBudget(text: string, budget: number): string {
  const plain = plainText(text)
  if (plain.length <= budget) return text
  // Prefer sentence boundary inside budget
  const slice = plain.slice(0, budget)
  const sentenceEnd = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('? '),
    slice.lastIndexOf('! '),
  )
  if (sentenceEnd > budget * 0.55) {
    return plain.slice(0, sentenceEnd + 1).trim()
  }
  const wordEnd = slice.lastIndexOf(' ')
  const cut = wordEnd > budget * 0.5 ? slice.slice(0, wordEnd) : slice
  return `${cut.trim()}…`
}

function padMediaCopy(text: string, topic: string, budget: number): string {
  const fillers = [
    `ITC India evaluates ${topic} against the applicable Indian and international methods in our NABL-aligned laboratory.`,
    `Share the specimen details, target market and acceptance criteria — we will confirm scope, method and turnaround.`,
    `Reports are issued for design verification, type testing and regulatory submissions with clear pass/fail criteria.`,
  ]
  let out = text.trim()
  for (const extra of fillers) {
    if (plainText(out).length >= MEDIA_COPY_MIN) break
    const next = out ? `${out} ${extra}` : extra
    if (plainText(next).length > budget) break
    out = next
  }
  return out
}

/** Fit section paragraphs to the media-column character budget. */
function fitMediaCopy(
  paragraphs: string[],
  topic: string,
  opts?: { pad?: boolean; truncate?: boolean },
): string[] {
  const pad = opts?.pad === true
  const truncate = opts?.truncate === true
  const readable = splitReadable(paragraphs)
  const topicShort =
    topic.replace(/\s*[|\-–—].*$/, '').trim().slice(0, 64) || 'this product family'
  let blob = readable.map((p) => plainText(p)).filter(Boolean).join(' ')
  if (!blob) {
    if (!pad) return []
    blob = padMediaCopy('', topicShort, MEDIA_COPY_CHARS)
    return splitReadable([blob])
  }
  // Default: keep every scraped word. Only truncate/pad when explicitly requested.
  if (truncate && plainText(blob).length > MEDIA_COPY_CHARS) {
    blob = truncateToBudget(blob, MEDIA_COPY_CHARS)
  } else if (pad && plainText(blob).length < MEDIA_COPY_MIN) {
    blob = padMediaCopy(blob, topicShort, MEDIA_COPY_CHARS)
  }
  return splitReadable(readable.length ? readable : [blob])
}

function isShortBullet(b: string) {
  return plainText(b).length < 95
}

/** Drop scraped empty/duplicate “link blob” bullets. */
function cleanBullets(bullets: string[] | undefined): string[] {
  if (!bullets?.length) return []
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of bullets) {
    const text = plainText(raw)
    if (text.length < 4) continue
    const key = text.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(raw)
  }
  return out
}

/** Promote tiny “heading” paragraphs into the following copy context. */
function cleanParagraphs(paragraphs: string[] | undefined): string[] {
  if (!paragraphs?.length) return []
  const out: string[] = []
  for (const raw of paragraphs) {
    const text = plainText(raw).trim()
    if (!text) continue
    // Skip orphan mini-headings that were scraped as paragraphs
    if (text.length < 40 && !/[.!?]$/.test(text) && !text.includes('<a ')) continue
    out.push(unglue(raw.trim()))
  }
  return out.length ? out : paragraphs.map((p) => unglue(p.trim())).filter(Boolean)
}

function isLongChecklist(sec: Section) {
  const bullets = sec.bullets || []
  return (
    bullets.length > 4 ||
    bullets.some((b) => plainText(b).length > 140)
  )
}

/** Side/feature media for copy or list bands — tables alone stay full-bleed. */
function wantsSideMedia(sec: Section) {
  if ((sec.paragraphs || []).length > 0) return true
  if ((sec.bullets || []).length > 0) return true
  return false
}

function BulletCards({
  bullets,
  dark,
}: {
  bullets: string[]
  dark: boolean
}) {
  const short = bullets.every(isShortBullet)
  if (short) {
    return (
      <ul className={`migrated-chips ${dark ? 'migrated-chips--dark' : ''}`}>
        {bullets.map((b, i) => (
          <li key={`${plainText(b).slice(0, 36)}-${i}`}>
            <LinkedText text={b} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={`migrated-details ${dark ? 'migrated-details--dark' : ''}`}>
      {bullets.map((b, i) => {
        const text = plainText(b)
        const colon = text.indexOf(':')
        const hasTitle = colon > 0 && colon < 72
        const title = hasTitle ? text.slice(0, colon).trim() : null
        const body = hasTitle ? b.slice(b.indexOf(':') + 1).trim() : b
        return (
          <article key={`${text.slice(0, 36)}-${i}`} className="migrated-detail">
            <span className="migrated-detail__num">{String(i + 1).padStart(2, '0')}</span>
            <div className="migrated-detail__body">
              {title ? <h3>{title}</h3> : null}
              <p>
                <LinkedText text={body} />
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function packUrlForPath(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, '') || 'home'
  const safe = slug.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 120)
  return `/data/migrated/${safe}.json`
}

function quoteFor(h1: string) {
  const short = h1.replace(/\s*[|\-–—].*$/, '').trim()
  return `Need help with ${short}? Tell us the standard and target market.`
}

function pageHeading(pack: MigratedPack) {
  const raw = (pack.h1 || pack.title || '').trim()
  if (
    !raw ||
    /^electrical safety testing laboratory$/i.test(raw) ||
    /^itc india$/i.test(raw)
  ) {
    return (pack.slug || 'Testing')
      .replace(/[-_/]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }
  return raw.replace(/\s*[|\-–—]\s*ITC India.*$/i, '').trim() || raw
}

const FALLBACK_HERO = '/images/migrated-heroes/general.webp'
const FALLBACK_SECTION = '/images/migrated-sections/general-1.webp'

function isConclusion(heading: string) {
  return /conclu/i.test(heading)
}

function isFaqSection(sec: Section) {
  const h = sec.heading.trim()
  if (!/\?\s*$/.test(h)) return false
  if ((sec.tables?.length || 0) > 0 || (sec.images?.length || 0) > 0) return false
  if ((sec.bullets?.length || 0) > 4) return false
  const body = plainText((sec.paragraphs || []).join(' '))
  return sec.paragraphs.length <= 2 && body.length > 0 && body.length < 420
}

function isHowSection(sec: Section) {
  return /how (is|are|do|does|we|to)|testing (procedure|process|method)|procedure|step[- ]by[- ]step/i.test(
    sec.heading,
  )
}

type ContentBlock =
  | { kind: 'story'; sec: Section }
  | { kind: 'how'; sec: Section }
  | { kind: 'faq'; sec: Section }

const STORY_HEADS = [
  'Scope of testing',
  'What we evaluate',
  'Why it matters',
  'Methods and approach',
  'Laboratory capability',
  'Key considerations',
]

/** Split a single oversized section into intro + story bands for page rhythm. */
function expandThinSection(sec: Section): { intro: Section; stories: Section[] } {
  const readable = splitReadable(sec.paragraphs)
  const tables = sec.tables || []
  const bullets = sec.bullets || []

  if (readable.length <= 2 && !tables.length && bullets.length <= 4) {
    return { intro: sec, stories: [] }
  }

  // Keep a short lead on intro; only the first table stays in overview
  const leadCount = readable.length >= 5 ? 2 : 1
  const lead = readable.slice(0, leadCount)
  const remainder = readable.slice(leadCount)
  const introTables = tables.slice(0, 1)
  const extraTables = tables.slice(1)

  const intro: Section = {
    heading: sec.heading,
    paragraphs: lead.length ? lead : readable.slice(0, 1),
    bullets: remainder.length ? [] : bullets,
    tables: introTables.length ? introTables : undefined,
    images: sec.images,
  }

  const stories: Section[] = []
  if (!remainder.length && bullets.length) {
    stories.push({
      heading: STORY_HEADS[0],
      paragraphs: [],
      bullets,
    })
  } else {
    const chunkSize = remainder.length <= 4 ? 2 : 3
    for (let i = 0; i < remainder.length; i += chunkSize) {
      const chunk = remainder.slice(i, i + chunkSize)
      const idx = stories.length
      stories.push({
        heading: STORY_HEADS[idx % STORY_HEADS.length],
        paragraphs: chunk,
        bullets: [],
      })
    }
    if (bullets.length && stories.length) {
      stories[stories.length - 1] = {
        ...stories[stories.length - 1],
        bullets,
      }
    } else if (bullets.length) {
      stories.push({
        heading: STORY_HEADS[0],
        paragraphs: [],
        bullets,
      })
    }
  }

  // Extra tables become their own bands — never stack 5 tables beside one photo.
  // Reserve slots so tables are not dropped when copy expands into many stories.
  const tableStories: Section[] = extraTables.map((table, ti) => ({
    heading: `Reference table ${String(ti + 2).padStart(2, '0')}`,
    paragraphs: [],
    bullets: [],
    tables: [table],
  }))
  const maxText = Math.max(2, 8 - tableStories.length)
  return { intro, stories: [...stories.slice(0, maxText), ...tableStories].slice(0, 10) }
}

/** Preserve source order; classify blocks; expand thin single-section packs. */
function structurePack(sections: Section[]) {
  if (!sections.length) {
    return {
      intro: null as Section | null,
      blocks: [] as ContentBlock[],
      conclusion: null as Section | null,
    }
  }

  const conclusion = sections.find((s) => isConclusion(s.heading)) || null
  const withoutConclusion = sections.filter((s) => !isConclusion(s.heading))

  let intro = withoutConclusion[0]
    ? {
        ...withoutConclusion[0],
        paragraphs: cleanParagraphs(withoutConclusion[0].paragraphs),
        bullets: cleanBullets(withoutConclusion[0].bullets),
      }
    : null
  let rest = withoutConclusion.slice(1).map((sec) => ({
    ...sec,
    paragraphs: cleanParagraphs(sec.paragraphs),
    bullets: cleanBullets(sec.bullets),
  }))

  // One fat section → invent a professional multi-band rhythm
  if (intro && rest.length === 0) {
    const bodyLen = plainText((intro.paragraphs || []).join(' ')).length
    const tableCount = intro.tables?.length || 0
    if (
      bodyLen > 520 ||
      (intro.paragraphs?.length || 0) > 2 ||
      (intro.bullets?.length || 0) > 3 ||
      tableCount > 0
    ) {
      const expanded = expandThinSection(intro)
      intro = expanded.intro
      rest = expanded.stories
    }
  }

  // Packs with real scraped headings already have relevant structure — keep them.
  const richPack = withoutConclusion.length >= 3

  const rawBlocks: ContentBlock[] = rest.map((sec) => {
    if (isFaqSection(sec)) return { kind: 'faq', sec }
    if (isHowSection(sec)) return { kind: 'how', sec }
    return { kind: 'story', sec }
  })

  // Split table+bullets / essay+long-list into separate bands so nothing looks crammed
  const blocks: ContentBlock[] = []
  for (const block of rawBlocks) {
    if (block.kind !== 'story' && block.kind !== 'how') {
      blocks.push(block)
      continue
    }
    const cleaned: Section = {
      ...block.sec,
      paragraphs: cleanParagraphs(block.sec.paragraphs),
      bullets: cleanBullets(block.sec.bullets),
    }
    if (block.kind === 'how') {
      blocks.push({ kind: 'how', sec: cleaned })
      continue
    }

    const bullets = cleaned.bullets
    const hasTable = (cleaned.tables?.length || 0) > 0
    const paraChars = plainText((cleaned.paragraphs || []).join(' ')).length

    if (hasTable && bullets.length >= 3) {
      blocks.push({
        kind: 'story',
        sec: {
          heading: cleaned.heading,
          paragraphs: cleaned.paragraphs,
          bullets: [],
          tables: cleaned.tables,
          images: cleaned.images,
        },
      })
      blocks.push({
        kind: 'story',
        sec: {
          heading: 'Test checks covered',
          paragraphs: [],
          bullets,
        },
      })
      continue
    }

    // Thin packs only: split huge checklist essays. Rich scrapes keep source headings.
    if (
      !richPack &&
      bullets.length >= 6 &&
      (cleaned.paragraphs.length >= 2 || paraChars > 400)
    ) {
      const paras = cleaned.paragraphs
      if (paras.length >= 4 || paraChars > 1100) {
        const leadParas = paras.slice(0, 2)
        const moreParas = paras.slice(2)
        blocks.push({
          kind: 'story',
          sec: {
            heading: cleaned.heading,
            paragraphs: leadParas,
            bullets: [],
            tables: cleaned.tables,
            images: cleaned.images,
          },
        })
        if (moreParas.length) {
          blocks.push({
            kind: 'story',
            sec: {
              heading: `${cleaned.heading} · continued`,
              paragraphs: moreParas,
              bullets: [],
            },
          })
        }
      } else {
        blocks.push({
          kind: 'story',
          sec: {
            heading: cleaned.heading,
            paragraphs: cleaned.paragraphs,
            bullets: [],
            tables: cleaned.tables,
            images: cleaned.images,
          },
        })
      }
      blocks.push({
        kind: 'story',
        sec: {
          heading: /method/i.test(cleaned.heading) ? 'Methods at a glance' : 'What we check',
          paragraphs: [],
          bullets,
        },
      })
      continue
    }

    // Thin packs only: break walls of text. Keep original heading on every chunk.
    if (
      !richPack &&
      !hasTable &&
      bullets.length <= 2 &&
      (cleaned.paragraphs.length >= 4 || paraChars > 1100)
    ) {
      const readable = splitReadable(cleaned.paragraphs)
      const chunkSize = readable.length <= 5 ? 2 : 3
      for (let pi = 0; pi < readable.length; pi += chunkSize) {
        const chunk = readable.slice(pi, pi + chunkSize)
        const idx = Math.floor(pi / chunkSize)
        blocks.push({
          kind: 'story',
          sec: {
            heading: idx === 0 ? cleaned.heading : `${cleaned.heading} · continued`,
            paragraphs: chunk,
            bullets: idx === 0 ? bullets : [],
            tables: idx === 0 ? cleaned.tables : undefined,
            images: idx === 0 ? cleaned.images : undefined,
          },
        })
      }
      continue
    }

    blocks.push({ kind: 'story', sec: cleaned })
  }

  return { intro, blocks: mergeChecklistBlocks(blocks), conclusion }
}

/** Synthetic checklist bands we emit when splitting fat sections. */
function isChecklistBand(sec: Section) {
  return /^(what we check|test checks covered|methods at a glance)$/i.test(
    sec.heading.trim(),
  )
}

/** Club duplicate “What we check” (etc.) bands into a single checklist section. */
function mergeChecklistBlocks(blocks: ContentBlock[]): ContentBlock[] {
  const checklists = blocks.filter(
    (b) => b.kind === 'story' && isChecklistBand(b.sec),
  )
  if (checklists.length <= 1) return blocks

  const mergedBullets = cleanBullets(checklists.flatMap((b) => b.sec.bullets || []))
  const allMethods = checklists.every((b) => /method/i.test(b.sec.heading))
  const mergedHeading = allMethods ? 'Methods at a glance' : 'What we check'

  let placed = false
  const out: ContentBlock[] = []
  for (const block of blocks) {
    if (block.kind === 'story' && isChecklistBand(block.sec)) {
      if (placed) continue
      placed = true
      out.push({
        kind: 'story',
        sec: {
          heading: mergedHeading,
          paragraphs: [],
          bullets: mergedBullets,
        },
      })
      continue
    }
    out.push(block)
  }
  return out
}

/**
 * One unique image per slot on the page (hero / intro / each narrative / how).
 * Scraped photos first, then pack-generated art, then category fillers — never repeats.
 */
function resolveImages(pack: MigratedPack, structured: ReturnType<typeof structurePack>) {
  const used = new Set<string>()
  const take = (src: string | null | undefined) => {
    if (!src || used.has(src)) return null
    used.add(src)
    return src
  }
  const takeFirst = (candidates: (string | null | undefined)[]) => {
    for (const c of candidates) {
      const hit = take(c)
      if (hit) return hit
    }
    return null
  }

  const hero = take(pack.hero) || take(FALLBACK_HERO) || FALLBACK_HERO
  used.add(hero)
  const heroPortrait =
    pack.heroPortrait && pack.heroPortrait !== pack.hero && !used.has(pack.heroPortrait)
      ? pack.heroPortrait
      : hero

  const scraped = pack.scrapedImages?.length
    ? pack.scrapedImages
    : pack.images || []
  const introOwn = structured.intro?.images || []

  // Intro shows exactly one photo — prefer scraped, then this pack’s unique art
  const introImg =
    takeFirst([
      introOwn[0]?.src,
      scraped[0]?.src,
      pack.generatedIntro,
      ...(pack.generatedSections || []),
      FALLBACK_SECTION,
    ]) || FALLBACK_SECTION

  // Remaining scraped images (not used on intro) feed later sections once each
  const leftoverScraped = [
    ...introOwn.slice(1).map((i) => i.src),
    ...scraped.map((i) => i.src),
  ].filter((src) => src && !used.has(src))

  // Per-page unique section art only — never share category fillers across packs
  const pageUnique = [
    ...(pack.generatedSections || []),
    pack.generatedMid,
    pack.generatedIntro,
  ].filter(Boolean) as string[]

  const fillerPool = [...leftoverScraped, ...pageUnique]

  const storyBlocks = structured.blocks.filter((b) => b.kind === 'story')
  // Prefer unused generatedSections in order so Section 03/04… always get art
  const orderedUnique = [...pageUnique].filter((src, i, arr) => arr.indexOf(src) === i)

  // Pass 1 — lock each band’s own art first so pool fills cannot steal it
  const reserved: (string | null)[] = structured.blocks.map((block) => {
    if (block.kind === 'faq') return null
    const own = (block.sec.images || []).map((im) => im.src).filter(Boolean)
    const hit = takeFirst(own)
    if (hit) return hit
    // Still show attached art even if that file was already used earlier on the page
    return own[0] || null
  })

  const blockImgs: (string | null)[] = structured.blocks.map((block, bi) => {
    if (block.kind === 'faq') return null
    if (reserved[bi]) return reserved[bi]
    if (block.kind === 'story' && !wantsSideMedia(block.sec)) return null
    if (block.kind === 'how' || block.kind === 'story') {
      const fresh = takeFirst(orderedUnique) || takeFirst(fillerPool)
      if (fresh) return fresh
      // Soft reuse so late bands never render as empty text stacks
      const cycle = pageUnique.filter(Boolean)
      return cycle.length ? cycle[bi % cycle.length] : null
    }
    return null
  })

  return {
    hero,
    heroPortrait,
    introImg,
    introAlt: introOwn[0]?.alt || scraped[0]?.alt || pack.h1,
    blockImgs,
    storyCount: storyBlocks.length,
  }
}

function bandClass(dark: boolean, withMedia: boolean) {
  if (dark) {
    return withMedia
      ? 'vib-standards factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on'
      : 'vib-why factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on'
  }
  return 'vib-types factory-bg factory-bg--hex is-pattern-on'
}

function splitClass(imageLeft: boolean) {
  return imageLeft
    ? 'wrap migrated-split migrated-split--media migrated-split--flip'
    : 'wrap migrated-split migrated-split--media'
}

function StorySection({
  sec,
  index: _index,
  dark,
  mediaSrc,
  imageLeft = true,
  topic = 'testing',
  eyebrow,
}: {
  sec: Section
  index: number
  dark: boolean
  mediaSrc: string | null
  imageLeft?: boolean
  topic?: string
  eyebrow?: string
}) {
  const glossary = isGlossarySection(sec.heading)
    ? extractGlossaryEntries(sec.paragraphs, sec.bullets)
    : []
  // Glossary bands never use the 3-col points grid — that crushes long definitions
  const points =
    isGlossarySection(sec.heading) || glossary.length >= 2
      ? []
      : extractNumberedPoints(sec.paragraphs)
  const bullets = sec.bullets || []
  const hasTable = Boolean(sec.tables?.length)
  const hasMedia = Boolean(mediaSrc)
  const label =
    eyebrow ||
    claimSectionEyebrow(
      sec.heading,
      topic || sec.heading,
      new Set(),
      isGlossarySection(sec.heading) ? 'glossary' : 'story',
    )
  const onlyBullets = bullets.length > 0 && !sec.paragraphs.length && !hasTable
  const longList = isLongChecklist(sec)
  // Full scraped copy — never drop words to match image height
  const mediaParas = fitMediaCopy(sec.paragraphs, topic || sec.heading, {
    pad: false,
    truncate: false,
  })
  const mediaBullets = bullets

  const head = (
    <header className="migrated-section-heading">
      <p className="eyebrow">{label}</p>
      <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
    </header>
  )

  const figure = hasMedia ? (
    <figure className="migrated-split__figure">
      <img
        src={mediaSrc!}
        alt={sec.heading}
        width={900}
        height={700}
        loading="lazy"
      />
    </figure>
  ) : null

  // Terms/definitions/symbols — stacked glossary rows (never cramped 3-col cards)
  if (isGlossarySection(sec.heading)) {
    const entries = glossary.length >= 2 ? glossary : []
    return (
      <section className={bandClass(dark, Boolean(mediaSrc))}>
        <div className="wrap migrated-glossary">
          <header className="migrated-glossary__head">
            <p className="eyebrow">{label}</p>
            <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
          </header>
          {mediaSrc ? (
            <figure className="migrated-glossary__feature">
              <img
                src={mediaSrc}
                alt={sec.heading}
                width={1200}
                height={700}
                loading="lazy"
              />
            </figure>
          ) : null}
          {entries.length >= 2 ? (
            <dl
              className={
                dark
                  ? 'migrated-glossary__list migrated-glossary__list--dark'
                  : 'migrated-glossary__list'
              }
            >
              {entries.map((entry) => (
                <div key={`${entry.code}-${entry.term}`} className="migrated-glossary__item">
                  <dt>
                    <span className="migrated-glossary__code">{entry.code}</span>
                    <span className="migrated-glossary__term">{entry.term}</span>
                  </dt>
                  <dd>{entry.body}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="migrated-glossary__fallback">
              <CopyBlock paragraphs={sec.paragraphs} bullets={bullets} />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (points.length >= 3) {
    if (hasMedia) {
      return (
        <section className={bandClass(dark, true)}>
          <div className={splitClass(imageLeft)}>
            <div className="migrated-split__copy">
              {head}
              <div
                className={`migrated-points__grid migrated-points__grid--compact ${
                  dark ? 'migrated-points__grid--dark' : ''
                }`}
              >
                {points.map((pt, i) => (
                  <article key={`${pt.slice(0, 24)}-${i}`} className="migrated-point">
                    <span className="migrated-point__num">{String(i + 1).padStart(2, '0')}</span>
                    <p>{pt}</p>
                  </article>
                ))}
              </div>
            </div>
            {figure}
          </div>
        </section>
      )
    }
    return (
      <section className={bandClass(dark, false)}>
        <div className="wrap migrated-points">
          <header className="migrated-points__head">
            <p className="eyebrow">{label}</p>
            <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
          </header>
          <div className={`migrated-points__grid ${dark ? 'migrated-points__grid--dark' : ''}`}>
            {points.map((pt, i) => (
              <article key={`${pt.slice(0, 24)}-${i}`} className="migrated-point">
                <span className="migrated-point__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{pt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Bullet / checklist band — featured image + cards
  if (onlyBullets || (longList && !hasTable)) {
    if (hasMedia) {
      return (
        <section className={bandClass(dark, true)}>
          <div className={splitClass(imageLeft)}>
            <div className="migrated-split__copy">
              {head}
              <div className="migrated-narrative__body">
                <CopyBlock paragraphs={mediaParas} />
              </div>
              <BulletCards bullets={mediaBullets} dark={dark} />
            </div>
            {figure}
          </div>
        </section>
      )
    }
    return (
      <section className={bandClass(dark, false)}>
        <div className="wrap migrated-stack">
          <header className="migrated-stack__head">
            <p className="eyebrow">{label}</p>
            <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
          </header>
          {sec.paragraphs.length ? (
            <div className="migrated-stack__lead">
              <CopyBlock paragraphs={sec.paragraphs} />
            </div>
          ) : null}
          <BulletCards bullets={bullets} dark={dark} />
        </div>
      </section>
    )
  }

  // Tables — stacked; optional featured image above table
  if (hasTable) {
    return (
      <section className={bandClass(dark, Boolean(mediaSrc))}>
        <div className="wrap migrated-stack">
          <header className="migrated-stack__head">
            <p className="eyebrow">{label}</p>
            <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
          </header>
          {mediaSrc ? (
            <figure className="migrated-stack__feature">
              <img src={mediaSrc} alt={sec.heading} width={1200} height={700} loading="lazy" />
            </figure>
          ) : null}
          {sec.paragraphs.length ? (
            <div className="migrated-stack__lead">
              <CopyBlock paragraphs={sec.paragraphs} />
            </div>
          ) : null}
          <div className="migrated-stack__table">
            <SectionTables tables={sec.tables} dark={dark} />
          </div>
          {bullets.length ? <BulletCards bullets={bullets} dark={dark} /> : null}
        </div>
      </section>
    )
  }

  if (!hasMedia) {
    return (
      <section className={bandClass(dark, false)}>
        <div className="wrap migrated-stack migrated-stack--narrow">
          <header className="migrated-stack__head">
            <p className="eyebrow">{label}</p>
            <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
          </header>
          <div className="migrated-stack__lead">
            <CopyBlock paragraphs={sec.paragraphs} bullets={bullets} />
          </div>
        </div>
      </section>
    )
  }

  // Alternate: even → text left / image right; odd → image left / text right
  return (
    <section className={bandClass(dark, true)}>
      <div className={splitClass(imageLeft)}>
        <div className="migrated-split__copy">
          {head}
          <div className="migrated-narrative__body">
            <CopyBlock paragraphs={mediaParas} bullets={mediaBullets} />
          </div>
        </div>
        {figure}
      </div>
    </section>
  )
}

function HowBand({
  sec,
  dark,
  mediaSrc,
  imageLeft = false,
  topic = 'testing',
  eyebrow,
}: {
  sec: Section
  dark: boolean
  mediaSrc: string | null
  imageLeft?: boolean
  topic?: string
  eyebrow?: string
}) {
  const steps = howStepsFrom(sec)
  const label =
    eyebrow || claimSectionEyebrow(sec.heading, topic || sec.heading, new Set(), 'how')

  if (steps.length > 1) {
    return (
      <section
        className={
          dark
            ? 'vib-process factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on'
            : 'vib-process vib-process--light factory-bg factory-bg--hex is-pattern-on'
        }
      >
        <div className="wrap vib-process__layout">
          <aside className="vib-process__aside">
            <header className="vib-process__head">
              <p className="eyebrow">{label}</p>
              <h2 className="display migrated-section-heading__title">{sec.heading}</h2>
              <p>Testing is performed to the applicable harmonized methods in our laboratory.</p>
            </header>
            {mediaSrc ? (
              <figure className="migrated-split__figure migrated-how__figure">
                <img
                  src={mediaSrc}
                  alt={sec.heading}
                  width={900}
                  height={700}
                  loading="lazy"
                />
              </figure>
            ) : null}
          </aside>
          <ol className="vib-timeline">
            {steps.map((step, si) => (
              <li key={`${plainText(step).slice(0, 36)}-${si}`}>
                <span className="vib-timeline__node" aria-hidden="true" />
                <div>
                  <span className="vib-timeline__step">
                    Step {String(si + 1).padStart(2, '0')}
                  </span>
                  <p>
                    <LinkedText text={step} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <StorySection
      sec={sec}
      index={0}
      dark={dark}
      mediaSrc={mediaSrc}
      imageLeft={imageLeft}
      topic={topic}
      eyebrow={label}
    />
  )
}

function FaqBand({ items, dark }: { items: Section[]; dark: boolean }) {
  return (
    <section
      className={
        dark
          ? 'vib-faq factory-bg factory-bg--dots factory-bg--on-dark is-pattern-on'
          : 'vib-faq vib-faq--light factory-bg factory-bg--hex is-pattern-on'
      }
    >
      <div className="wrap vib-faq__layout">
        <header className="vib-faq__head">
          <h2 className="display">Frequently asked questions</h2>
          <p>
            Still unsure about scope? Call{' '}
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a> or{' '}
            <Link to="/contact-us">send an inquiry</Link>.
          </p>
        </header>
        <div className="vib-faq__list">
          {items.map((item, fi) => (
            <details key={item.heading} className="vib-faq__item" open={fi === 0}>
              <summary>
                {fi + 1}. {item.heading}
              </summary>
              <div>
                {item.paragraphs.map((p, pi) => (
                  <p key={`${plainText(p).slice(0, 40)}-${pi}`}>
                    {pi === 0 ? <strong>Answer: </strong> : null}
                    <LinkedText text={p} />
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MigratedPage() {
  const { pathname } = useLocation()
  const [pack, setPack] = useState<MigratedPack | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    let cancelled = false
    setPack(null)
    setError(false)

    fetch(packUrlForPath(pathname))
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((data: MigratedPack) => {
        if (cancelled) return
        setPack(data)
        const heading = pageHeading(data)
        document.title = heading.includes('ITC India')
          ? heading
          : `${heading} | ITC India`
        const meta = document.querySelector('meta[name="description"]')
        if (meta && data.description) {
          meta.setAttribute('content', data.description)
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })

    return () => {
      cancelled = true
    }
  }, [pathname])

  if (error) {
    return (
      <section className="placeholder factory-bg factory-bg--grid">
        <div className="wrap placeholder__inner">
          <p className="eyebrow">Page</p>
          <h1 className="display">Content unavailable</h1>
          <p>This migrated page could not be loaded. Try again or contact the lab.</p>
          <div className="placeholder__actions">
            <Link className="btn btn-solid" to="/">
              Back home
            </Link>
            <a className="btn btn-line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    )
  }

  if (!pack) {
    return (
      <section className="migrated-loading factory-bg factory-bg--grid">
        <div className="wrap">
          <p className="eyebrow">ITC India · Laboratory</p>
          <p>Loading…</p>
        </div>
      </section>
    )
  }

  const structured = structurePack(pack.sections || [])
  const imgs = resolveImages(pack, structured)
  const heading = pageHeading(pack)
  const quote = quoteFor(heading)
  const { intro, blocks, conclusion } = structured
  const related = pack.relatedLinks || []

  // After light intro + navy QuoteStrip, first content band must be light
  // so we never stack navy-on-navy (quote → story). Rhythm: beige ↔ navy.
  let nextDark = false
  const takeDark = () => {
    const dark = nextDark
    nextDark = !nextDark
    return dark
  }

  /** Track field tone so QuoteStrips never stack on navy / each other. */
  type BandTone = 'light' | 'dark' | 'quote'
  let lastBand: BandTone = 'light'

  const contentNodes: ReactNode[] = []
  const faqItems: Section[] = []
  const usedEyebrows = new Set<string>()
  const introEye = intro
    ? claimSectionEyebrow(intro.heading || 'Overview', heading, usedEyebrows, 'story')
    : ''
  // Reserve end-matter labels so story bands cannot steal them
  usedEyebrows.add(normLabel('Wrap-up'))
  usedEyebrows.add(normLabel('Related testing'))
  usedEyebrows.add(normLabel('Internal links'))
  let storyOrdinal = 0
  let mediaOrdinal = 0
  let quoteAfterStories = false
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]
    // Collect FAQs — always rendered after Conclusion to keep chronology
    if (block.kind === 'faq') {
      while (i < blocks.length && blocks[i].kind === 'faq') {
        faqItems.push(blocks[i].sec)
        i += 1
      }
      continue
    }

    const mediaSrc = imgs.blockImgs[i] || null
    // Alternate: 0 text|image, 1 image|text, 2 text|image…
    const imageLeft = Boolean(mediaSrc) && mediaOrdinal % 2 === 1
    if (mediaSrc) mediaOrdinal += 1

    if (block.kind === 'how') {
      const dark = takeDark()
      lastBand = dark ? 'dark' : 'light'
      const eye = claimSectionEyebrow(block.sec.heading, heading, usedEyebrows, 'how')
      contentNodes.push(
        <HowBand
          key={`how-${block.sec.heading}-${i}`}
          sec={block.sec}
          dark={dark}
          mediaSrc={mediaSrc}
          imageLeft={imageLeft}
          topic={heading}
          eyebrow={eye}
        />,
      )
      i += 1
      continue
    }

    storyOrdinal += 1
    const dark = takeDark()
    lastBand = dark ? 'dark' : 'light'
    const eye = claimSectionEyebrow(
      block.sec.heading,
      heading,
      usedEyebrows,
      isGlossarySection(block.sec.heading) ? 'glossary' : 'story',
    )
    contentNodes.push(
      <StorySection
        key={`story-${block.sec.heading}-${i}`}
        sec={block.sec}
        index={storyOrdinal - 1}
        dark={dark}
        mediaSrc={mediaSrc}
        eyebrow={eye}
        imageLeft={imageLeft}
        topic={heading}
      />,
    )

    // Mid-page quote only after a light band (never navy → quote).
    // Sole story, or 2nd+ light beat (usually story 3 when story 2 was navy).
    // After the strip, force the next content band light (same as intro quote).
    if (
      !quoteAfterStories &&
      !dark &&
      (storyOrdinal >= 2 || (storyOrdinal === 1 && imgs.storyCount === 1))
    ) {
      quoteAfterStories = true
      lastBand = 'quote'
      nextDark = false
      contentNodes.push(
        <QuoteStrip
          key="mid-quote"
          text={`Need help with ${heading.split(' ').slice(0, 4).join(' ')}? Tell us the standard and target market.`}
          href="/contact-us"
        />,
      )
    }
    i += 1
  }

  // Thin packs: only intro — still give a professional second band
  if (!blocks.length && intro) {
    const dark = takeDark()
    lastBand = dark ? 'dark' : 'light'
    contentNodes.push(
      <section
        key="thin-lab"
        className={bandClass(dark, Boolean(imgs.introImg))}
      >
        <div className="wrap migrated-split migrated-split--media">
          <div className="migrated-split__copy">
            <header className="migrated-section-heading">
              <p className="eyebrow">Laboratory</p>
              <h2 className="display migrated-section-heading__title">
                Accredited testing at ITC India
              </h2>
            </header>
            <div className={dark ? 'vib-why__body migrated-narrative__body' : 'migrated-narrative__body'}>
              <p>
                Specimens are evaluated against the applicable Indian and international
                methods in our NABL-aligned laboratory. Share the standard, specimen
                details, and target market — we will confirm scope and turnaround.
              </p>
              <div className="migrated-intro__actions" style={{ justifyContent: 'flex-start' }}>
                <Link className="btn btn-solid" to="/contact-us">
                  Book an appointment now
                </Link>
                <a className="btn btn-line" href={`tel:${company.phone}`}>
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <figure className="migrated-split__figure">
            <img
              src={imgs.introImg}
              alt={imgs.introAlt}
              width={900}
              height={700}
              loading="lazy"
            />
          </figure>
        </div>
      </section>,
    )
  }

  // Related = light, Conclusion = navy. Break with a quote strip when the
  // previous band would otherwise share the same field.
  const faqDark = faqItems.length
    ? Boolean(conclusion ? false : related.length ? true : takeDark())
    : false
  const showRelatedBreak = related.length > 0 && lastBand === 'light'
  let endTone: BandTone = lastBand
  if (related.length) endTone = 'light'
  if (conclusion) endTone = 'dark'
  if (faqItems.length) endTone = faqDark ? 'dark' : 'light'
  const showClosingQuote = endTone === 'light'

  return (
    <div className="vib migrated-page">
      <section className="vib-hero" id="top">
        <div className="vib-hero__media" aria-hidden="true">
          <div className="vib-hero__frame">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={imgs.heroPortrait}
                width={1080}
                height={1920}
              />
              <img
                src={imgs.hero}
                alt=""
                width={1920}
                height={1080}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
          <div className="vib-hero__veil" />
        </div>
        <div className="vib-hero__content">
          <p className="eyebrow vib-hero__eyebrow">ITC India · Laboratory</p>
          <h1 className="display vib-hero__title migrated-hero-title">{heading}</h1>
          <div className="vib-hero__actions">
            <a className="btn btn-solid" href="#get-testing">
              Book an appointment now
            </a>
            <a className="btn btn-line vib-hero__line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Metrics />

      {intro ? (
        <section
          className="vib-intro factory-bg factory-bg--grid is-pattern-on migrated-intro"
          id="get-testing"
        >
          <div className="wrap migrated-intro__stack">
            <header className="migrated-intro__head">
              <p className="eyebrow">{introEye}</p>
              <h2 className="display">{intro.heading}</h2>
            </header>

            {intro.tables?.length ? (
              <>
                {/* Copy + media first — never pin a tall table beside an empty column */}
                <div className="migrated-intro__pair migrated-intro__pair--copy-media">
                  <div className="migrated-intro__lead">
                    <CopyBlock
                      paragraphs={fitMediaCopy(intro.paragraphs, heading, {
                        pad: false,
                        truncate: false,
                      })}
                      bullets={(intro.bullets || []).slice(0, 4)}
                    />
                    <div className="migrated-intro__actions">
                      <Link className="btn btn-solid" to="/contact-us">
                        Book an appointment now
                      </Link>
                      <a className="btn btn-line" href={`tel:${company.phone}`}>
                        {company.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <figure className="migrated-intro__media">
                    <img
                      src={imgs.introImg}
                      alt={imgs.introAlt}
                      width={900}
                      height={700}
                      loading="lazy"
                    />
                    <figcaption>From the laboratory · ITC India</figcaption>
                  </figure>
                </div>
                <div className="migrated-intro__tables">
                  <SectionTables tables={intro.tables.slice(0, 1)} />
                </div>
              </>
            ) : (
              <div className="migrated-intro__pair migrated-intro__pair--copy-media">
                <div className="migrated-intro__lead">
                  <CopyBlock
                    paragraphs={fitMediaCopy(intro.paragraphs, heading, {
                      pad: false,
                      truncate: false,
                    })}
                    bullets={(intro.bullets || []).slice(0, 4)}
                  />
                  <div className="migrated-intro__actions">
                    <Link className="btn btn-solid" to="/contact-us">
                      Book an appointment now
                    </Link>
                    <a className="btn btn-line" href={`tel:${company.phone}`}>
                      {company.phoneDisplay}
                    </a>
                  </div>
                </div>
                <figure className="migrated-intro__media">
                  <img
                    src={imgs.introImg}
                    alt={imgs.introAlt}
                    width={900}
                    height={700}
                    loading="lazy"
                  />
                  <figcaption>From the laboratory · ITC India</figcaption>
                </figure>
              </div>
            )}
          </div>
        </section>
      ) : null}

      <QuoteStrip text={quote} />
      {/* Intro quote is always navy — content starts light via nextDark=false */}

      {contentNodes}

      {/* Related is light — break only if previous band was also light */}
      {showRelatedBreak ? (
        <QuoteStrip
          text={`Need help with ${heading.split(' ').slice(0, 4).join(' ')}? Tell us the standard and target market.`}
          href="/contact-us"
        />
      ) : null}

      {related.length ? (
        <section className="vib-types factory-bg factory-bg--hex is-pattern-on migrated-related migrated-related--light">
          <div className="wrap">
            <header className="migrated-related__head">
              <p className="eyebrow">Internal links</p>
              <h2 className="display">Related testing</h2>
              <p>Continue to connected services and standards on this site.</p>
            </header>
            <ol className="vib-dir vib-dir--compact">
              {related.map((item, ri) => (
                <li key={item.href}>
                  <span className="vib-dir__num">{String(ri + 1).padStart(2, '0')}</span>
                  <div className="vib-dir__body">
                    <p className="vib-dir__code">{item.label}</p>
                  </div>
                  <SiteLink className="vib-dir__link" href={item.href}>
                    View
                  </SiteLink>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Conclusion is navy — white card provides the beat; do not insert another navy QuoteStrip */}
      {conclusion ? (
        <section className="migrated-conclusion migrated-conclusion--dark factory-bg factory-bg--grid factory-bg--on-dark is-pattern-on">
          <div className="wrap">
            <div
              className={
                plainText(conclusion.paragraphs.join(' ')).length > 280
                  ? 'migrated-conclusion__card migrated-conclusion__card--tall'
                  : 'migrated-conclusion__card'
              }
            >
              <p className="eyebrow">Wrap-up</p>
              <h2 className="display">Conclusion</h2>
              <div className="migrated-conclusion__copy">
                <CopyBlock paragraphs={conclusion.paragraphs} bullets={conclusion.bullets} />
              </div>
              <SectionTables tables={conclusion.tables} />
              <div className="migrated-conclusion__actions">
                <Link className="btn btn-solid" to="/contact-us">
                  Book an appointment now
                </Link>
                <a className="btn btn-line" href={`tel:${company.phone}`}>
                  {company.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ always after Conclusion: opposite of navy wrap-up → light; else continue rhythm */}
      {faqItems.length ? <FaqBand items={faqItems} dark={faqDark} /> : null}

      {/* Closing quote only after a light band — never quote→quote or navy→quote */}
      {showClosingQuote ? (
        <QuoteStrip text="Ready to book testing? Tell us your specimen details and timeline." />
      ) : null}

      <section className="vib-cta factory-bg factory-bg--grid is-pattern-on">
        <div className="wrap vib-cta__inner">
          <h2 className="display">Book an appointment now</h2>
          <p>{pack.description || quote}</p>
          <div className="vib-cta__actions">
            <Link className="btn btn-solid" to="/contact-us">
              Get a Quote
            </Link>
            <a className="btn btn-line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
