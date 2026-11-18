import fs from 'fs'
const h = fs.readFileSync('D:/Temp/itc-home.html', 'utf8')
const i1 = h.indexOf('id="footer-col1"')
const i2 = h.indexOf('id="footer-col2"')
const col1 = h.slice(i1, i2)
fs.writeFileSync('D:/Temp/footer-col1.html', col1)
console.log(col1)
