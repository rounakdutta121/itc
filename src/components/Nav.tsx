import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { company, navMenu, type NavItem } from '../data/content'
import { SiteLink } from './SiteLink'
import './Nav.css'

/** Keeps flyout open while pointer is on trigger or panel; closes after a short leave delay. */
function useFlyoutOpen() {
  const [open, setOpen] = useState(false)
  const timer = useRef<number | null>(null)
  const navLock = useRef(false)
  const { pathname, search, hash, key } = useLocation()

  const clear = () => {
    if (timer.current != null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }

  const blurNavFocus = () => {
    const active = document.activeElement
    if (active instanceof HTMLElement && active.closest('.nav__item')) {
      active.blur()
    }
  }

  const show = () => {
    if (navLock.current) return
    clear()
    setOpen(true)
  }

  const hideSoon = () => {
    clear()
    timer.current = window.setTimeout(() => setOpen(false), 220)
  }

  const hideNow = () => {
    clear()
    setOpen(false)
    blurNavFocus()
  }

  /** Mouse left the trigger/panel — allow open again on next enter. */
  const leave = () => {
    navLock.current = false
    hideSoon()
  }

  // Close on every navigation and block reopen from a stuck hover/focus
  useEffect(() => {
    clear()
    setOpen(false)
    blurNavFocus()
    navLock.current = true
    const unlock = window.setTimeout(() => {
      navLock.current = false
    }, 450)
    return () => window.clearTimeout(unlock)
  }, [pathname, search, hash, key])

  useEffect(() => () => clear(), [])

  return { open, show, hideSoon, hideNow, leave }
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const children = item.children ?? []
  const isMega = item.label === 'Testing Services'
  const { open, show, hideSoon, hideNow, leave } = useFlyoutOpen()

  if (!children.length) {
    return (
      <SiteLink href={item.href} className="nav__link">
        {item.label}
      </SiteLink>
    )
  }

  if (isMega) {
    return <MegaMenu item={item} />
  }

  return (
    <div
      className={`nav__item has-panel${open ? ' is-open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={leave}
    >
      <SiteLink
        href={item.href}
        className="nav__link"
        onClick={hideNow}
        onFocus={show}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node | null)) {
            hideSoon()
          }
        }}
      >
        {item.label}
        <span className="nav__caret" aria-hidden="true" />
      </SiteLink>
      <div
        className="nav__fly"
        role="region"
        aria-label={item.label}
        onMouseEnter={show}
        onMouseLeave={leave}
      >
        <div className="nav__fly-inner nav__fly-inner--simple">
          <div className="nav__fly-simple">
            <div className="nav__fly-head">
              <p className="nav__fly-kicker">Explore</p>
              <SiteLink href={item.href} className="nav__fly-title" onClick={hideNow}>
                {item.label}
              </SiteLink>
            </div>
            <ul className="nav__fly-grid" role="list">
              {children.map((child) => (
                <li key={child.label}>
                  <SiteLink href={child.href} onClick={hideNow}>
                    {child.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function MegaMenu({ item }: { item: NavItem }) {
  const categories = item.children ?? []
  const [active, setActive] = useState(0)
  const [nested, setNested] = useState<NavItem | null>(null)
  const { open, show, hideSoon, hideNow, leave } = useFlyoutOpen()
  const current = categories[active]
  const nestedKids = nested?.children ?? []

  const selectCategory = (index: number) => {
    setActive(index)
    const firstWithKids = categories[index]?.children?.find((c) => c.children?.length)
    setNested(firstWithKids ?? null)
  }

  return (
    <div
      className={`nav__item has-mega${open ? ' is-open' : ''}`}
      onMouseEnter={show}
      onMouseLeave={leave}
    >
      <SiteLink
        href={item.href}
        className="nav__link"
        onClick={hideNow}
        onFocus={show}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node | null)) {
            hideSoon()
          }
        }}
      >
        {item.label}
        <span className="nav__caret" aria-hidden="true" />
      </SiteLink>
      <div
        className="nav__fly nav__fly--mega"
        role="region"
        aria-label="Testing Services"
        data-lenis-prevent
        onMouseEnter={show}
        onMouseLeave={leave}
      >
        <div className="nav__fly-inner nav__fly-inner--mega">
          <aside className="nav__fly-cats" data-lenis-prevent>
            <p className="nav__fly-kicker">Disciplines</p>
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                className={`nav__fly-cat${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => selectCategory(i)}
                onFocus={() => selectCategory(i)}
              >
                <span>{cat.label}</span>
                {cat.children?.length ? (
                  <span className="nav__fly-chevron" aria-hidden="true" />
                ) : null}
              </button>
            ))}
          </aside>

          <div className="nav__fly-stage" data-lenis-prevent>
            <div className="nav__fly-stage-head">
              <p className="nav__fly-kicker">Category</p>
              <SiteLink href={current.href} onClick={hideNow}>
                {current.label}
              </SiteLink>
              <span className="nav__fly-count">
                {current.children?.length ?? 0} services
              </span>
            </div>
            {current.children?.length ? (
              <ul className="nav__fly-services" role="list">
                {current.children.map((child) => {
                  const hasKids = Boolean(child.children?.length)
                  const isOpen = nested?.label === child.label
                  return (
                    <li key={child.label}>
                      <SiteLink
                        href={child.href}
                        className={
                          hasKids
                            ? `nav__fly-service${isOpen ? ' is-open' : ''}`
                            : 'nav__fly-service'
                        }
                        onClick={hideNow}
                        onMouseEnter={() => setNested(hasKids ? child : null)}
                        onFocus={() => setNested(hasKids ? child : null)}
                      >
                        <span>{child.label}</span>
                        {hasKids ? (
                          <span className="nav__fly-chevron" aria-hidden="true" />
                        ) : null}
                      </SiteLink>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="nav__fly-empty">Browse this category overview.</p>
            )}
          </div>

          <div className="nav__fly-detail" data-lenis-prevent>
            {nestedKids.length ? (
              <>
                <div className="nav__fly-stage-head">
                  <p className="nav__fly-kicker">Standards</p>
                  <SiteLink href={nested!.href} onClick={hideNow}>
                    {nested!.label}
                  </SiteLink>
                </div>
                <ul className="nav__fly-standards" role="list">
                  {nestedKids.map((child) => (
                    <li key={child.label}>
                      <SiteLink href={child.href} onClick={hideNow}>
                        {child.label}
                      </SiteLink>
                      {child.children?.length ? (
                        <ul className="nav__fly-deep" role="list">
                          {child.children.map((deep) => (
                            <li key={deep.label}>
                              <SiteLink href={deep.href} onClick={hideNow}>
                                {deep.label}
                              </SiteLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="nav__fly-placeholder">
                <p className="nav__fly-kicker">Detail</p>
                <h3>Select a service</h3>
                <p>
                  Hover a service with an arrow to open its standards and related
                  tests in this panel.
                </p>
                <SiteLink
                  href={current.href}
                  className="btn btn-solid"
                  onClick={hideNow}
                >
                  View {current.label}
                </SiteLink>
              </div>
            )}
          </div>
        </div>
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
      <SiteLink
        href={item.href}
        className={`nav__drawer-link${depth ? ` is-depth-${Math.min(depth, 3)}` : ''}`}
        onClick={onNavigate}
      >
        {item.label}
      </SiteLink>
    )
  }

  return (
    <div className={`nav__acc${open ? ' is-open' : ''}${depth ? ` is-depth-${Math.min(depth, 3)}` : ''}`}>
      <div className="nav__acc-row">
        <SiteLink
          href={item.href}
          className="nav__drawer-link"
          onClick={onNavigate}
        >
          {item.label}
        </SiteLink>
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
  const { pathname } = useLocation()

  const close = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="wrap nav__bar">
        <SiteLink
          className="nav__brand"
          href="/"
          aria-label={`${company.name} home`}
          onClick={close}
        >
          <img src="/logo.webp" alt="ITC India" width={150} height={48} />
        </SiteLink>

        <nav className="nav__links" aria-label="Primary">
          {navMenu.map((item) => (
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="nav__end">
          <SiteLink className="btn btn-solid nav__cta" href="/#contact">
            Get a Quote
          </SiteLink>
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
        <div className="nav__drawer-top">
          <SiteLink
            className="nav__brand"
            href="/"
            aria-label={`${company.name} home`}
            onClick={close}
          >
            <img src="/logo.webp" alt="ITC India" width={150} height={48} />
          </SiteLink>
          <button
            type="button"
            className="nav__drawer-close"
            aria-label="Close menu"
            onClick={close}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="nav__drawer-scroll">
          {navMenu.map((item) => (
            <MobileBranch key={item.label} item={item} onNavigate={close} />
          ))}
        </div>

        <div className="nav__drawer-foot">
          <SiteLink
            className="btn btn-solid"
            href="/#contact"
            onClick={close}
          >
            Get a Quote
          </SiteLink>
        </div>
      </div>
    </header>
  )
}
