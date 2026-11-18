import { useEffect, useId, useRef, useState } from 'react'
import { company, navMenu, type NavItem } from '../data/content'
import './Nav.css'

function isExternal(href: string) {
  return href.startsWith('http')
}

function linkProps(href: string) {
  return isExternal(href)
    ? { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href }
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const children = item.children ?? []
  const isMega = item.label === 'Testing Services'

  if (!children.length) {
    return (
      <a className="nav__link" {...linkProps(item.href)}>
        {item.label}
      </a>
    )
  }

  if (isMega) {
    return <MegaMenu item={item} />
  }

  return (
    <div className="nav__item has-menu">
      <a className="nav__link" {...linkProps(item.href)}>
        {item.label}
        <span className="nav__caret" aria-hidden="true" />
      </a>
      <ul className="nav__dropdown" role="list">
        {children.map((child) => (
          <li key={child.label}>
            <a {...linkProps(child.href)}>{child.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MegaMenu({ item }: { item: NavItem }) {
  const categories = item.children ?? []
  const [active, setActive] = useState(0)
  const [nested, setNested] = useState<NavItem | null>(null)
  const current = categories[active]
  const hasNested = Boolean(nested?.children?.length)

  const selectCategory = (index: number) => {
    setActive(index)
    setNested(null)
  }

  return (
    <div className="nav__item has-mega">
      <a className="nav__link" {...linkProps(item.href)}>
        {item.label}
        <span className="nav__caret" aria-hidden="true" />
      </a>
      <div
        className={`nav__mega${hasNested ? ' has-nested' : ''}`}
        role="region"
        aria-label="Testing Services"
        data-lenis-prevent
      >
        <div className="nav__mega-cats" role="list" data-lenis-prevent>
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`nav__mega-cat${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => selectCategory(i)}
            >
              <a {...linkProps(cat.href)} onFocus={() => selectCategory(i)}>
                {cat.label}
              </a>
              {cat.children?.length ? (
                <span className="nav__mega-arrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="nav__mega-panel" data-lenis-prevent>
          <div className="nav__mega-panel-head">
            <a {...linkProps(current.href)}>{current.label}</a>
          </div>
          {current.children?.length ? (
            <ul className="nav__mega-list" role="list">
              {current.children.map((child) => {
                const hasKids = Boolean(child.children?.length)
                const isOpen = nested?.label === child.label
                return (
                  <li
                    key={child.label}
                    className={
                      hasKids
                        ? `has-kids${isOpen ? ' is-open' : ''}`
                        : undefined
                    }
                    onMouseEnter={() => setNested(hasKids ? child : null)}
                  >
                    <a
                      {...linkProps(child.href)}
                      onFocus={() => setNested(hasKids ? child : null)}
                    >
                      {child.label}
                      {hasKids ? (
                        <span className="nav__mega-arrow" aria-hidden="true" />
                      ) : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="nav__mega-empty">Open category overview</p>
          )}
        </div>

        {hasNested ? (
          <div className="nav__mega-nested" data-lenis-prevent>
            <div className="nav__mega-panel-head">
              <a {...linkProps(nested!.href)}>{nested!.label}</a>
            </div>
            <ul className="nav__mega-list" role="list">
              {nested!.children!.map((child) => {
                const hasKids = Boolean(child.children?.length)
                return (
                  <li key={child.label} className={hasKids ? 'has-kids' : undefined}>
                    <a {...linkProps(child.href)}>
                      {child.label}
                      {hasKids ? (
                        <span className="nav__mega-arrow" aria-hidden="true" />
                      ) : null}
                    </a>
                    {hasKids ? (
                      <ul className="nav__mega-sublist" role="list">
                        {child.children!.map((deep) => (
                          <li key={deep.label}>
                            <a {...linkProps(deep.href)}>{deep.label}</a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function MobileBranch({
  item,
  onNavigate,
  depth = 0,
}: {
  item: NavItem
  onNavigate: () => void
  depth?: number
}) {
  const [open, setOpen] = useState(false)
  const kids = item.children ?? []
  const panelId = useId()

  if (!kids.length) {
    return (
      <a
        className="nav__drawer-link"
        style={{ paddingLeft: `${0.4 + depth * 0.75}rem` }}
        {...linkProps(item.href)}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div className={`nav__acc${open ? ' is-open' : ''}`}>
      <div
        className="nav__acc-row"
        style={{ paddingLeft: `${0.4 + depth * 0.75}rem` }}
      >
        <a {...linkProps(item.href)} onClick={onNavigate}>
          {item.label}
        </a>
        <button
          type="button"
          className="nav__acc-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
      <div id={panelId} className="nav__acc-panel" hidden={!open}>
        {kids.map((child) => (
          <MobileBranch
            key={child.label}
            item={child}
            onNavigate={onNavigate}
            depth={depth + 1}
          />
        ))}
      </div>
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1100) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      ref={headerRef}
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="wrap nav__bar">
        <a
          className="nav__brand"
          href="#top"
          aria-label={`${company.name} home`}
          onClick={close}
        >
          <img src="/logo.webp" alt="ITC India" width={150} height={48} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navMenu.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="nav__end">
          <a className="btn btn-solid nav__cta" href="#contact">
            Book a consultation
          </a>
          <button
            className={`nav__toggle${open ? ' is-active' : ''}`}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`nav__drawer${open ? ' is-open' : ''}`}
        hidden={!open}
        data-lenis-prevent
      >
        {navMenu.map((item) => (
          <MobileBranch key={item.label} item={item} onNavigate={close} />
        ))}
        <a className="btn btn-solid" href="#contact" onClick={close}>
          Book a consultation
        </a>
      </div>

      {open ? (
        <button
          type="button"
          className="nav__backdrop"
          aria-label="Close menu"
          onClick={close}
        />
      ) : null}
    </header>
  )
}
