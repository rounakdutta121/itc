import fs from 'fs'

const path = 'D:/itcindia/src/data/siteMenu.ts'
let s = fs.readFileSync(path, 'utf8')

const map = {
  'https://www.itcindia.org/': '/',
  'https://www.itcindia.org/about-us/': '/about-us',
  'https://www.itcindia.org/nabl-scope-certificate-india/': '/nabl-scope-certificate-india',
  'https://www.itcindia.org/about-us/tec-fee-schedule/': '/about-us/tec-fee-schedule',
  'https://www.itcindia.org/terms-conditions/': '/terms-conditions',
  'https://www.itcindia.org/products/': '/',
  '#services': '/services',
  '#products': '/',
  '#contact': '/contact-us',
  '#top': '/',
  'https://www.itcindia.org/customer-support/': '/customer-support',
  'https://www.itcindia.org/inquiry/': '/inquiry',
  'https://www.itcindia.org/jobs/': '/careers',
  'https://www.itcindia.org/mil-std-810h-vibration-shock-testing-laboratory-in-india/':
    '/mil-std-810h-vibration-shock-testing',
  'https://www.itcindia.org/iec-61373-vibration-shock-testing-for-railway-equipment/':
    '/iec-61373-vibration-testing',
  'https://www.itcindia.org/iec-60068-2-6-sine-vibration-testing-services-in-india/':
    '/vibration-testing/iec-60068-2-6',
  'https://www.itcindia.org/jss-55555-testing-laboratory-in-india-itc-india/':
    '/jss-55555-testing',
  'https://www.itcindia.org/jss-5855-11-environmental-testing-services/':
    '/jss-5855-11-testing',
  'https://www.itcindia.org/jss-50101-environmental-testing-for-electronic-components/':
    '/jss-50101-testing',
  'https://www.itcindia.org/rdso-tl-0091-testing-for-railway-led-luminaires-in-india/':
    '/rdso-tl-0091-testing',
}

for (const [from, to] of Object.entries(map)) {
  s = s.split(JSON.stringify(from)).join(JSON.stringify(to))
}

s = s.replace(
  /("label": "Vibration Testing Lab",\s*"href": )"[^"]+"/,
  '$1"/vibration-testing"',
)

s = s.replace(
  /("label": "IEC 60068- Environmental Conditioning",\s*"href": )"[^"]+"/,
  '$1"/vibration-testing"',
)

fs.writeFileSync(path, s)
console.log('siteMenu remapped')
