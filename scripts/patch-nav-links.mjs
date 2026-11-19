import fs from 'fs'

const path = 'D:/itcindia/src/components/Nav.tsx'
let s = fs.readFileSync(path, 'utf8')

s = s.replace(
  `import { company, navMenu, type NavItem } from '../data/content'\nimport './Nav.css'`,
  `import { company, navMenu, type NavItem } from '../data/content'\nimport { SiteLink } from './SiteLink'\nimport './Nav.css'`,
)

s = s.replace(
  /function isExternal\(href: string\) \{[\s\S]*?\n\}\n\nfunction linkProps\(href: string\) \{[\s\S]*?\n\}\n\n/,
  '',
)

// Convert <a ... {...linkProps(x)}> to <SiteLink href={x} ...>
s = s.replace(/<a([^>]*)\{\.\.\.linkProps\(([^)]+)\)\}([^>]*)>/g, '<SiteLink href={$2}$1$3>')
s = s.replace(/<\/a>/g, '</SiteLink>')

// Brand / CTA / contact already converted if they used <a href=
// Fix brand which uses href="#top"
s = s.replace(
  /<SiteLink\s+className="nav__brand"\s+href="#top"/,
  '<SiteLink className="nav__brand" href="/"',
)
s = s.replace(/href="#contact"/g, 'href="/contact-us"')
s = s.replace(/href="#top"/g, 'href="/"')

fs.writeFileSync(path, s)
console.log('Nav patched')
