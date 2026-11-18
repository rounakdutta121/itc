export const company = {
  name: 'ITC India',
  legalName: 'Institute of Testing & Certification India Pvt. Ltd.',
  shortName: 'ITC India Pvt. Ltd.',
  tagline: 'Electrical Safety Testing Laboratory',
  phone: '+919316473033',
  phoneDisplay: '+91 93164 73033',
  email: 'info@itcindia.org',
  whatsapp: '919316473033',
  address:
    'Plot No. 146, JLPL Industrial Area, Sector 82, Mohali, Punjab, 160062',
  about:
    'ITC India operates a NABL-accredited testing and calibration facility built like a precision factory — disciplined bays, calibrated instruments, and documented methods that move products from sample intake to certified market access.',
}

export { siteNav as navMenu, type NavItem } from './siteMenu'
export { siteFooter } from './siteFooter'

/** Flat primary links kept for any simple consumers. */
export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: 'https://www.itcindia.org/about-us/' },
  { label: 'Products', href: '#products' },
  { label: 'Testing Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Career in ITC', href: 'https://www.itcindia.org/jobs/' },
]

export const metrics = [
  { value: '17025', label: 'ISO/IEC aligned methods' },
  { value: '12', label: 'Testing disciplines' },
  { value: 'NABL', label: 'Accredited laboratory' },
  { value: 'BIS', label: 'CRS scheme support' },
]

export const services = [
  {
    id: 'electrical',
    code: 'EL',
    title: 'Electrical',
    description: 'Electrical safety, performance and regulatory testing services.',
    image: '/images/svc-electrical.webp',
  },
  {
    id: 'electro-medical',
    code: 'EM',
    title: 'Electro-Medical',
    description: 'Safety and compliance testing for medical electrical equipment.',
    image: '/images/svc-medical.webp',
  },
  {
    id: 'laboratory',
    code: 'LA',
    title: 'Laboratory',
    description: 'Testing for laboratory, measuring and indicating equipment.',
    image: '/images/laboratory.webp',
  },
  {
    id: 'environmental',
    code: 'EI',
    title: 'Environmental / IP',
    description: 'Environmental durability and ingress-protection testing services.',
    image: '/images/svc-ip.webp',
  },
  {
    id: 'mechanical',
    code: 'MC',
    title: 'Mechanical / Chemical',
    description: 'Mechanical performance and chemical evaluation for products.',
    image: '/images/mechanical.webp',
  },
  {
    id: 'calibration',
    code: 'CA',
    title: 'Calibration',
    description: 'Reliable calibration services for instruments and equipment.',
    image: '/images/svc-calibration.webp',
  },
  {
    id: 'electronic',
    code: 'EC',
    title: 'Electronic',
    description: 'Testing and compliance services for electronic products.',
    image: '/images/svc-electronics.webp',
  },
  {
    id: 'photometry',
    code: 'PH',
    title: 'Photometry',
    description: 'Photometric measurement and lighting-performance evaluation.',
    image: '/images/svc-photometry.webp',
  },
  {
    id: 'emc',
    code: 'EMC',
    title: 'EMC',
    description: 'Electromagnetic compatibility and interference testing.',
    image: '/images/svc-emc.webp',
  },
  {
    id: 'packaging',
    code: 'PA',
    title: 'Packaging',
    description: 'Packaging durability, transport and performance testing.',
    image: '/images/packaging.webp',
  },
  {
    id: 'software',
    code: 'SO',
    title: 'Software',
    description: 'Software quality, functionality and compliance assessment.',
    image: '/images/svc-software.webp',
  },
  {
    id: 'info-security',
    code: 'IS',
    title: 'Information Security',
    description: 'Cybersecurity and information-security testing services.',
    image: '/images/svc-security.webp',
  },
]

export const capabilities = [
  {
    title: 'Accredited methods',
    text: 'Documented procedures aligned to ISO/IEC 17025 with clear evidence trails.',
  },
  {
    title: 'Purpose-built bays',
    text: 'Dedicated setups for safety, EMC, IP, photometry and calibration work.',
  },
  {
    title: 'Regulatory pathway',
    text: 'Guidance for BIS, CE and notified-body readiness without guesswork.',
  },
  {
    title: 'Production cadence',
    text: 'Slot planning and status updates that protect your launch timeline.',
  },
]

export const processSteps = [
  { step: '01', title: 'Requirement intake', text: 'Share product scope, standards and target markets.' },
  { step: '02', title: 'Scope & quotation', text: 'Receive a clear test plan, timeline and commercial path.' },
  { step: '03', title: 'Bay scheduling', text: 'Book samples into calibrated laboratory slots.' },
  { step: '04', title: 'Execute & evaluate', text: 'Run accredited tests with progress visibility.' },
  { step: '05', title: 'Report & certify', text: 'Deliver reports ready for market access decisions.' },
]

export const productCategories = [
  {
    code: '60204',
    title: 'Machinery Equipment',
    text: 'Metalworking, food, plastic, printing, wood, textile and construction machinery.',
  },
  {
    code: '60598',
    title: 'Lighting & Entertainment',
    text: 'Road lighting, emergency lighting, luminaires and lighting chains.',
  },
  {
    code: '60601',
    title: 'Electro Medical',
    text: 'Hospital systems, infusion devices, autoclaves and stimulators.',
  },
  {
    code: '61215',
    title: 'Photovoltaic Modules',
    text: 'Crystalline silicon PV design qualification and type approval.',
  },
  {
    code: '61427',
    title: 'Cells & Batteries',
    text: 'Secondary cells and batteries for photovoltaic energy systems.',
  },
]
