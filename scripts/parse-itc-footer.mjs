import fs from 'fs'

const html = fs.readFileSync('D:/Temp/itc-home.html', 'utf8')

const footerStart = html.indexOf('<div id="footer">')
const subStart = html.indexOf('<div id="sub-footer">')
const footerHtml = html.slice(footerStart, subStart)
const subHtml = html.slice(subStart, html.indexOf('</footer>', subStart))

function stripTags(s) {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Col1 text
const col1 = footerHtml.match(/id="footer-col1"[\s\S]*?(?=id="footer-col2")/)?.[0] || ''
const col2 = footerHtml.match(/id="footer-col2"[\s\S]*?(?=id="footer-col3")/)?.[0] || ''
const col3 = footerHtml.match(/id="footer-col3"[\s\S]*?(?=id="footer-col4")/)?.[0] || ''
const col4 = footerHtml.match(/id="footer-col4"[\s\S]*$/)?.[0] || ''

const aboutPs = [...col1.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]))
const social = [...col1.matchAll(/href="(https?:\/\/[^"]+)"[^>]*>(?:<[^>]+>)*?\s*(Facebook|Twitter|LinkedIn|Instagram|YouTube|X)/gi)]
  .map((m) => ({ label: m[2], href: m[1] }))

const inquiryTitle = stripTags(col2.match(/footer-widget-title[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || '')
const inquiryFields = [...col2.matchAll(/placeholder="([^"]+)"/gi)].map((m) => m[1])
const captcha = /captcha/i.test(col2)

const subscribeTitle = stripTags(col3.match(/footer-widget-title[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || '')
const subscribePlaceholder = col3.match(/placeholder="([^"]+)"/i)?.[1] || 'Email address'

const contactTitle = stripTags(col4.match(/footer-widget-title[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || '')
const contactPs = [...col4.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1]))
const contactLinks = [...col4.matchAll(/href="(mailto:[^"]+|tel:[^"]+|https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
  (m) => ({ href: m[1], label: stripTags(m[2]) }),
)

// footer menu
const footerMenu = [...subHtml.matchAll(/<li[^>]*>\s*<a href="([^"]+)">([^<]+)<\/a>/gi)].map((m) => ({
  href: m[1],
  label: stripTags(m[2]),
}))

const copyright = stripTags(subHtml.match(/class="copyright"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || '')

const out = {
  about: aboutPs,
  social,
  inquiry: { title: inquiryTitle, fields: inquiryFields, hasCaptcha: captcha },
  subscribe: { title: subscribeTitle, placeholder: subscribePlaceholder },
  contact: { title: contactTitle, paragraphs: contactPs, links: contactLinks },
  footerMenu,
  copyrightSkipped: copyright,
}

fs.writeFileSync('D:/itcindia/src/data/itc-footer.json', JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))
