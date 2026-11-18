import fs from 'fs'

const nav = JSON.parse(fs.readFileSync('D:/itcindia/src/data/itc-nav.json', 'utf8'))
const footer = JSON.parse(fs.readFileSync('D:/itcindia/src/data/itc-footer.json', 'utf8'))

const localMap = {
  'https://www.itcindia.org/': '#top',
  'https://www.itcindia.org/home/': '#top',
  'https://www.itcindia.org/products/': '#products',
  '#itc-services': '#services',
  'https://www.itcindia.org/contact-us/': '#contact',
}

function remap(nodes) {
  return nodes.map((n) => {
    const href = localMap[n.href] || n.href
    const children = n.children ? remap(n.children) : undefined
    return children ? { label: n.label, href, children } : { label: n.label, href }
  })
}

const remapped = remap(nav)
const footerMenu = footer.footerMenu.map((item) => ({
  label: item.label,
  href: localMap[item.href] || item.href,
}))

const aboutText = footer.about.filter(Boolean)

const siteMenu = `export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export const siteNav: NavItem[] = ${JSON.stringify(remapped, null, 2)}
`

const siteFooter = `export const siteFooter = {
  about: ${JSON.stringify(aboutText, null, 2)},
  inquiry: {
    title: ${JSON.stringify(footer.inquiry.title)},
    fields: ${JSON.stringify(footer.inquiry.fields.filter((f) => f !== 'Enter Captcha'))},
  },
  subscribe: {
    title: ${JSON.stringify(footer.subscribe.title)},
    placeholder: ${JSON.stringify(footer.subscribe.placeholder)},
  },
  contact: {
    title: ${JSON.stringify(footer.contact.title)},
    company: 'ITC India Pvt Ltd.',
    address: 'Plot No. 146, JLPL Industrial Area, Sector 82, Mohali, Punjab,160062',
    phoneDisplay: '09316473033',
    phoneHref: 'tel:+919316473033',
    email: 'info@itcindia.org',
  },
  footerMenu: ${JSON.stringify(footerMenu, null, 2)} as { label: string; href: string }[],
} as const
`

fs.writeFileSync('D:/itcindia/src/data/siteMenu.ts', siteMenu)
fs.writeFileSync('D:/itcindia/src/data/siteFooter.ts', siteFooter)
console.log('generated siteMenu.ts and siteFooter.ts')
