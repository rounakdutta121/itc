import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../data/content'
import { Metrics } from '../components/Metrics'
import { SiteLink } from '../components/SiteLink'
import { migratedPaths } from '../data/migratedIndex'
import './VibrationTestingPage.css'
import '../components/Hero.css'
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
  generatedSections?: string[]
  category?: string
  source: string
  note?: string
  relatedLinks?: RelatedLink[]
}

const ANCHOR_SPLIT = /(<a\s+href="[^"]*">[^<]*<\/a>)/gi
const ANCHOR_MATCH = /^<a\s+href="([^"]*)">([^<]*)<\/a>$/i

const HANDCRAFTED = new Set([
  '/',
  '/about-us',
  '/vibration-testing',
  '/drop-testing',
  '/salt-testing',
  '/salt-spray-testing',
  '/jss-55555',
  '/jss-55555-testing',
  '/contact-us',
])

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

function unglue(text: string) {
  return text
    .replace(/\.([A-Z])/g, '. $1')
    .replace(/\.(\d+[).])/g, '. $1')
    .replace(/:(\d+[).])/g, ': $1')
}

function splitReadable(paragraphs: string[]): string[] {
  const out: string[] = []
  for (const raw of paragraphs) {
    let text = raw.trim()
    if (!text) continue
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

function cleanParagraphs(paragraphs: string[] | undefined): string[] {
  if (!paragraphs?.length) return []
  const out: string[] = []
  for (const raw of paragraphs) {
    const text = plainText(raw).trim()
    if (!text) continue
    if (text.length < 40 && !/[.!?]$/.test(text) && !text.includes('<a ')) continue
    out.push(unglue(raw.trim()))
  }
  return out.length ? out : paragraphs.map((p) => unglue(p.trim())).filter(Boolean)
}

function realTables(tables?: ContentTable[]): ContentTable[] {
  return (tables || []).filter((t) => (t.rows?.length || 0) > 0)
}

function SectionTables({ tables }: { tables?: ContentTable[] }) {
  const list = realTables(tables)
  if (!list.length) return null
  return (
    <>
      {list.map((table, ti) => (
        <div
          key={`table-${ti}`}
          className="vib-distinctions__table-wrap migrated-article__table"
          role="region"
          aria-label="Reference table"
        >
          <table className="vib-distinctions__table">
            {table.headers?.length ? (
              <thead>
                <tr>
                  {table.headers.map((h, hi) => (
                    <th key={`${h}-${hi}`} scope="col">
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
                        <LinkedText text={cell} />
                      </th>
                    ) : (
                      <td key={`c-${ci}`}>
                        <LinkedText text={cell} />
                      </td>
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

function packUrlForPath(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, '') || 'home'
  const safe = slug.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 120)
  return `/data/migrated/${safe}.json`
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

function labelFromPath(path: string) {
  return path
    .replace(/^\/+|\/+$/g, '')
    .replace(/[-_/]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function isFaqSection(sec: Section) {
  const h = sec.heading.trim()
  if (!/\?\s*$/.test(h)) return false
  if ((sec.tables?.length || 0) > 0 || (sec.images?.length || 0) > 0) return false
  if ((sec.bullets?.length || 0) > 4) return false
  const body = plainText((sec.paragraphs || []).join(' '))
  return sec.paragraphs.length <= 2 && body.length > 0 && body.length < 420
}

function isConclusion(heading: string) {
  return /conclu/i.test(heading)
}

/** True for AI / pack art — never shown in article content. */
function isGeneratedArt(src: string) {
  return (
    /\/images\/page-sections\//.test(src) ||
    /\/images\/migrated-sections\//.test(src) ||
    /\/images\/page-heroes\//.test(src) ||
    /\/images\/migrated-heroes\//.test(src)
  )
}

/** Content images only — live-site scrapes. Heroes stay on the banner. */
function collectScrapedImages(pack: MigratedPack, heading: string): ImageRef[] {
  const seen = new Set<string>()
  const out: ImageRef[] = []
  const add = (src: string | null | undefined, alt?: string) => {
    if (!src || seen.has(src) || isGeneratedArt(src)) return
    seen.add(src)
    out.push({ src, alt: alt || heading })
  }

  for (const sec of pack.sections || []) {
    for (const im of sec.images || []) add(im.src, im.alt || sec.heading)
  }
  for (const im of pack.scrapedImages || []) add(im.src, im.alt || heading)
  for (const im of pack.images || []) add(im.src, im.alt || heading)
  return out
}

function scrapedOnly(images: ImageRef[] | undefined): ImageRef[] {
  return (images || []).filter((im) => im.src && !isGeneratedArt(im.src))
}

function normalizeSections(sections: Section[]) {
  return (sections || []).map((sec) => ({
    ...sec,
    paragraphs: splitReadable(cleanParagraphs(sec.paragraphs)),
    bullets: cleanBullets(sec.bullets),
  }))
}

function buildSidebarLinks(
  pack: MigratedPack,
  currentPath: string,
): RelatedLink[] {
  const seen = new Set<string>()
  const out: RelatedLink[] = []
  const push = (href: string, label: string) => {
    const path = href.replace(/\/$/, '') || '/'
    if (!path.startsWith('/')) return
    if (HANDCRAFTED.has(path) || path === currentPath) return
    if (seen.has(path)) return
    seen.add(path)
    out.push({ href: path, label: label.replace(/^["“]|["”]$/g, '').trim() || labelFromPath(path) })
  }

  for (const item of pack.relatedLinks || []) push(item.href, item.label)
  for (const path of migratedPaths) {
    if (out.length >= 14) break
    push(path, labelFromPath(path))
  }
  return out.slice(0, 14)
}

function ArticleFigure({ image }: { image: ImageRef }) {
  return (
    <figure className="migrated-article__figure">
      <img
        src={image.src}
        alt={image.alt || ''}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
      />
      {image.alt ? <figcaption>{image.alt}</figcaption> : null}
    </figure>
  )
}

function ArticleSectionBlock({
  sec,
  images,
  index,
}: {
  sec: Section
  images: ImageRef[]
  index: number
}) {
  const tables = realTables(sec.tables)
  return (
    <section className="migrated-article__block">
      <header className="migrated-article__block-head">
        <span className="migrated-article__index" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <h2 className="migrated-article__heading">{sec.heading}</h2>
      </header>
      <div className="migrated-article__block-body">
        {sec.paragraphs.map((p, i) => (
          <p key={`${plainText(p).slice(0, 36)}-${i}`}>
            <LinkedText text={p} />
          </p>
        ))}
        {sec.bullets.length ? (
          <ul className="migrated-article__bullets">
            {sec.bullets.map((b, i) => (
              <li key={`${plainText(b).slice(0, 36)}-${i}`}>
                <LinkedText text={b} />
              </li>
            ))}
          </ul>
        ) : null}
        <SectionTables tables={tables} />
        {images.map((im) => (
          <ArticleFigure key={im.src} image={im} />
        ))}
      </div>
    </section>
  )
}

export function MigratedPage() {
  const { pathname } = useLocation()
  const currentPath = pathname.replace(/\/$/, '') || '/'
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

  const heading = pack ? pageHeading(pack) : ''
  const sections = useMemo(
    () => (pack ? normalizeSections(pack.sections || []) : []),
    [pack],
  )
  const allImages = useMemo(
    () => (pack ? collectScrapedImages(pack, heading) : []),
    [pack, heading],
  )
  const sidebar = useMemo(
    () => (pack ? buildSidebarLinks(pack, currentPath) : []),
    [pack, currentPath],
  )
  const storySections = useMemo(
    () => sections.filter((s) => !isFaqSection(s) && !isConclusion(s.heading)),
    [sections],
  )
  const faqSections = useMemo(() => sections.filter(isFaqSection), [sections])
  const conclusion = useMemo(
    () => sections.find((s) => isConclusion(s.heading)) || null,
    [sections],
  )
  const { assignedExtras, orphanImages } = useMemo(() => {
    const ownedSrc = new Set<string>()
    for (const sec of [...storySections, ...(conclusion ? [conclusion] : [])]) {
      for (const im of scrapedOnly(sec.images)) ownedSrc.add(im.src)
    }
    const extras = allImages.filter((im) => !ownedSrc.has(im.src)).slice(0, 8)
    const assigned: ImageRef[][] = storySections.map(() => [])
    extras.forEach((im, i) => {
      if (!storySections.length) return
      assigned[i % storySections.length].push(im)
    })
    return {
      assignedExtras: assigned,
      orphanImages: storySections.length ? [] : allImages.slice(0, 8),
    }
  }, [storySections, conclusion, allImages])

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

  const heroSrc = pack.hero || pack.heroPortrait || ''
  const heroPortrait = pack.heroPortrait || pack.hero || ''

  return (
    <div className="migrated-page migrated-page--article">
      <section className="hero migrated-hero" id="top">
        <div className="hero__media" aria-hidden="true">
          <div className="hero__slides">
            <div className="hero__slide is-active">
              <picture>
                {heroPortrait ? (
                  <source
                    media="(max-width: 767px)"
                    srcSet={heroPortrait}
                    width={1080}
                    height={1920}
                  />
                ) : null}
                <img
                  src={heroSrc}
                  alt=""
                  width={1920}
                  height={1080}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
          <div className="hero__veil" />
        </div>
        <div className="wrap hero__content">
          <p className="eyebrow hero__eyebrow">ITC India · Laboratory</p>
          <h1 className="display hero__title migrated-hero__title">{heading}</h1>
          {pack.description ? (
            <p className="hero__lede">{plainText(pack.description)}</p>
          ) : null}
          <div className="hero__actions">
            <a className="btn btn-solid" href="#page-content">
              Read the guide
            </a>
            <a className="btn btn-line hero__line" href={`tel:${company.phone}`}>
              {company.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Metrics />

      <div className="migrated-article-band">
        <div className="migrated-article" id="page-content">
          <article className="migrated-article__main">
            <div className="migrated-dash-bar" aria-hidden="true">
              <span className="migrated-dash-bar__live" />
              <span>Lab dossier</span>
              <span className="migrated-dash-bar__sep" />
              <span>{storySections.length} modules</span>
              <span className="migrated-dash-bar__sep" />
              <span>{Math.min(allImages.length, 8)} media</span>
            </div>

            {storySections.map((sec, si) => (
              <ArticleSectionBlock
                key={`${sec.heading}-${si}`}
                sec={sec}
                index={si + 1}
                images={[
                  ...scrapedOnly(sec.images).slice(0, 2),
                  ...(assignedExtras[si] || []),
                ].slice(0, 3)}
              />
            ))}

            {orphanImages.map((im) => (
              <ArticleFigure key={im.src} image={im} />
            ))}

            {conclusion ? (
              <ArticleSectionBlock
                sec={conclusion}
                index={storySections.length + 1}
                images={scrapedOnly(conclusion.images)}
              />
            ) : null}

            {faqSections.length ? (
              <section className="migrated-article__faq">
                <header className="migrated-article__block-head">
                  <span className="migrated-article__index" aria-hidden="true">
                    FAQ
                  </span>
                  <h2 className="migrated-article__heading">Frequently asked questions</h2>
                </header>
                <div className="migrated-article__faq-list">
                  {faqSections.map((item, fi) => (
                    <details
                      key={item.heading}
                      className="migrated-article__faq-item"
                      open={fi === 0}
                    >
                      <summary>
                        {fi + 1}. {item.heading}
                      </summary>
                      {item.paragraphs.map((p, pi) => (
                        <p key={`${plainText(p).slice(0, 36)}-${pi}`}>
                          {pi === 0 ? <strong>Answer: </strong> : null}
                          <LinkedText text={p} />
                        </p>
                      ))}
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="migrated-article__cta">
              <header className="migrated-article__block-head">
                <span className="migrated-article__index" aria-hidden="true">
                  CTA
                </span>
                <h2 className="migrated-article__heading">Book an appointment now</h2>
              </header>
              <p>
                Share your specimen details, target standard and timeline — we will
                confirm scope and turnaround.
              </p>
              <div className="migrated-article__cta-actions">
                <Link className="btn btn-solid" to="/contact-us">
                  Get a Quote
                </Link>
                <a className="btn btn-line" href={`tel:${company.phone}`}>
                  {company.phoneDisplay}
                </a>
              </div>
            </section>
          </article>

          <aside className="migrated-article__side" aria-label="Other testing services">
            <div className="migrated-side">
              <header className="migrated-side__head">
                <div className="migrated-side__status">
                  <span className="migrated-side__pulse" aria-hidden="true" />
                  <span>Live index</span>
                </div>
                <h2>Other Testing Services</h2>
                <p>
                  {sidebar.length} suggestions · related standards &amp; articles
                </p>
              </header>
              <nav className="migrated-side__nav" data-lenis-prevent>
                <ul>
                  {sidebar.map((item, i) => (
                    <li key={item.href}>
                      <Link to={item.href}>
                        <span className="migrated-side__num">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="migrated-side__label">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
