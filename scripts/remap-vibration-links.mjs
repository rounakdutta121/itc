import fs from 'fs'

const path = 'D:/itcindia/src/data/siteMenu.ts'
let s = fs.readFileSync(path, 'utf8')

const map = {
  'https://www.itcindia.org/jss-55555-testing/': '/jss-55555-testing',
  'https://www.itcindia.org/jss-5855-11-testing-2/': '/jss-5855-11-testing',
  'https://www.itcindia.org/jss-50101-testing/': '/jss-50101-testing',
  'https://www.itcindia.org/rdso-tl-0091-testing/': '/rdso-tl-0091-testing',
  'https://www.itcindia.org/mil-std-810h-vibration-shock-testing/':
    '/mil-std-810h-vibration-shock-testing',
  'https://www.itcindia.org/iec-61373-vibration-testing/': '/iec-61373-vibration-testing',
  'https://www.itcindia.org/iec-60068-2-6-vibration-testing-2-2/':
    '/vibration-testing/iec-60068-2-6',
  'https://www.itcindia.org/ista-2a-2b-2c/': '/ista-2a-2b-2c',
  'https://www.itcindia.org/ista-1a-1b-1c-1d-testing/': '/ista-1a-1b-1c-1d-testing',
  'https://www.itcindia.org/astm-d999-vibration-testing-of-shipping-containers/':
    '/vibration-testing',
}

for (const [from, to] of Object.entries(map)) {
  s = s.split(JSON.stringify(from)).join(JSON.stringify(to))
}

fs.writeFileSync(path, s)
console.log('vibration links remapped')
