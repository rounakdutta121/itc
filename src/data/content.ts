export const company = {
  name: 'ITC India',
  legalName: 'Institute of Testing & Certification India Pvt. Ltd.',
  shortName: 'ITC India Pvt. Ltd.',
  tagline: 'Electrical Safety Testing Laboratory',
  phone: '+919316473033',
  phoneDisplay: '+91 93164 73033',
  email: 'info@itcindia.org',
  whatsapp: '919316473033',
  whatsappHref: 'https://wa.me/919316473033',
  whatsappLabel: 'WhatsApp +91 93164 73033',
  address:
    'Plot No. 146, JLPL Industrial Area, Sector 82, Mohali, Punjab 160062',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=Plot+No.+146+JLPL+Industrial+Area+Sector+82+Mohali+Punjab+160062',
}

export { siteNav as navMenu, type NavItem } from './siteMenu'
export { siteFooter } from './siteFooter'

/** Flat primary links kept for any simple consumers. */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Testing Services', href: '/services' },
  { label: 'Vibration Testing Lab', href: '/vibration-testing' },
  { label: 'Salt Spray Testing Lab', href: '/salt-spray-testing' },
  { label: 'JSS 55555 Testing Laboratory in India | ITC India', href: '/jss-55555-testing' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Career in ITC', href: '/careers' },
]

export const homeSeo = {
  title: 'NABL Accredited Electrical Safety Testing Lab | ITC India',
  description:
    'NABL-accredited electrical safety & product testing lab in Mohali, India. EMC, IP, vibration, battery, medical & calibration testing. Get a quote.',
  canonical: 'https://www.itcindia.org/',
}

export const heroContent = {
  eyebrow: 'NABL-Accredited Lab · Mohali, India',
  title: 'Electrical Safety & Product Testing Laboratory',
  lede: 'NABL-accredited testing and calibration for manufacturers and exporters. Get test reports for BIS, CE and global market approvals from one lab in Mohali, Punjab.',
  primaryCta: 'Get a Testing Quote',
  primaryHref: '/contact-us',
  secondaryCta: 'Call +91 93164 73033',
  slides: [
    {
      landscape: '/images/hero-cinematic.webp',
      portrait: '/images/hero-cinematic-portrait.webp',
      line1: 'Electrical Safety &',
      line2: 'Product Testing',
      line2Break: 'Laboratory',
    },
    {
      landscape: '/images/hero-slide-1.webp',
      portrait: '/images/hero-slide-1-portrait.webp',
      line1: 'Medical Device',
      line2: 'Testing (IEC 60601)',
    },
    {
      landscape: '/images/hero-slide-2.webp',
      portrait: '/images/hero-slide-2-portrait.webp',
      line1: 'EMC / EMI',
      line2: 'Testing',
    },
    {
      landscape: '/images/hero-slide-3.webp',
      portrait: '/images/hero-slide-3-portrait.webp',
      line1: 'IP & Environmental',
      line2: 'Testing',
    },
    {
      landscape: '/images/hero-slide-4.webp',
      portrait: '/images/hero-slide-4-portrait.webp',
      line1: 'NABL',
      line2: 'Calibration',
    },
  ],
}

/** Confirmed tiles only — unconfirmed counts left out per brief. */
export const metrics = [
  { value: 'NABL', label: 'Accredited to ISO/IEC 17025' },
  { value: 'BIS', label: 'Lab under CRS' },
  { value: '12', label: 'Testing disciplines' },
  { value: '2009', label: 'Testing since' },
]

export const services = [
  {
    id: 'electrical',
    code: 'EL',
    title: 'Electrical Testing',
    description:
      'Safety testing for appliances, cables, enclosures, switchgear, batteries and solar products to IEC and IS standards.',
    image: '/images/svc-electrical.webp',
    href: '/electrical-testing',
    cta: 'View Electrical Testing tests',
  },
  {
    id: 'electro-medical',
    code: 'EM',
    title: 'Electro-Medical Testing',
    description:
      'IEC 60601 safety and essential performance testing for medical electrical equipment and patient monitors.',
    image: '/images/svc-medical.webp',
    href: '/iec-60601-testing',
    cta: 'View Electro-Medical Testing tests',
  },
  {
    id: 'electronic',
    code: 'EC',
    title: 'Electronic Testing',
    description:
      'IEC 62368-1 testing for IT, audio-video, power supplies, UPS and inverters.',
    image: '/images/svc-electronics.webp',
    href: '/electronic-testing',
    cta: 'View Electronic Testing tests',
  },
  {
    id: 'emc',
    code: 'EMC',
    title: 'EMC / EMI Testing',
    description:
      'Emission and immunity testing to CISPR 11, CISPR 15, IEC 61000 and EN 301 489.',
    image: '/images/svc-emc.webp',
    href: '/emc-emi-testing',
    cta: 'View EMC / EMI Testing tests',
  },
  {
    id: 'environmental',
    code: 'EI',
    title: 'Environmental & IP Testing',
    description:
      'IP41 to IP69K, vibration, shock, salt spray, solar radiation, JSS 55555 and MIL-STD-810H.',
    image: '/images/svc-ip.webp',
    href: '/environmental-testing-services',
    cta: 'View Environmental & IP Testing tests',
  },
  {
    id: 'photometry',
    code: 'PH',
    title: 'Photometry Testing',
    description:
      'LM-79, LM-80 and RDSO photometry for LED luminaires and lighting products.',
    image: '/images/svc-photometry.webp',
    href: '/photometry-testing',
    cta: 'View Photometry Testing tests',
  },
  {
    id: 'calibration',
    code: 'CA',
    title: 'Calibration Services',
    description:
      'NABL calibration for temperature, humidity, pressure, energy meters, glassware and EMC generators.',
    image: '/images/svc-calibration.webp',
    href: '/energy-meter-calibration-testing-nabl',
    cta: 'View Calibration Services tests',
  },
  {
    id: 'laboratory',
    code: 'LA',
    title: 'Laboratory Equipment',
    description:
      'IEC 61010 safety testing for lab, measuring, IVD and control equipment.',
    image: '/images/laboratory.webp',
    href: '/iec-61010-1-testing',
    cta: 'View Laboratory Equipment tests',
  },
  {
    id: 'mechanical',
    code: 'MC',
    title: 'Mechanical & Chemical',
    description:
      'PPE, robot safety (ISO 10218, ISO 13482), RoHS and chemical composition testing.',
    image: '/images/mechanical.webp',
    href: '/mechanical-testing',
    cta: 'View Mechanical & Chemical tests',
  },
  {
    id: 'packaging',
    code: 'PA',
    title: 'Packaging Testing',
    description:
      'ISTA 1A–1D and 2A–2C transit tests: vibration, drop and compression.',
    image: '/images/packaging.webp',
    href: '/packaging',
    cta: 'View Packaging Testing tests',
  },
  {
    id: 'software',
    code: 'SO',
    title: 'Software Testing',
    description: 'IEC 62304 medical device software and Bluetooth testing.',
    image: '/images/svc-software.webp',
    href: '/software-testing',
    cta: 'View Software Testing tests',
  },
  {
    id: 'info-security',
    code: 'IS',
    title: 'Information Security',
    description:
      'Drone and IoT security testing, plus our cybersecurity division.',
    image: '/images/svc-security.webp',
    href: '/drone-information-security-testing',
    cta: 'View Information Security tests',
  },
]

export const aboutSection = {
  eyebrow: 'About ITC India',
  title: 'NABL-Accredited Testing Laboratory in Mohali, Serving All of India',
  paragraphs: [
    'ITC India Pvt Ltd (Institute of Testing and Certification India) is an independent testing and calibration laboratory in Mohali, Punjab, near Chandigarh. We are accredited by NABL to ISO/IEC 17025.',
    'Manufacturers, importers and exporters send us products to check them against Indian (IS), international (IEC, ISO, EN) and defence (JSS, MIL-STD) standards. Our reports support BIS registration, CE marking, tenders and export approvals.',
    'Our Mohali facility has dedicated set-ups for electrical safety, EMC, IP and environmental testing, vibration, photometry and calibration. That means fewer labs to manage, one point of contact, and faster reports for your launch.',
  ],
  bullets: [
    {
      label: 'NABL accreditation under ISO/IEC 17025',
      href: '/nabl-scope-certificate-india',
    },
    {
      label: 'TEC fee schedule',
      href: '/about-us/tec-fee-schedule',
    },
  ],
  cta: 'Plan a Lab Visit',
  ctaHref: '/contact-us',
}

export const capabilities = [
  {
    title: 'Accredited, accepted reports',
    text: 'NABL-accredited methods and traceable calibration, so your reports stand up with regulators and buyers.',
  },
  {
    title: '12 disciplines under one roof',
    text: 'Safety, EMC, IP, environmental, photometry and calibration in one place. One sample, one quote, one report pack.',
  },
  {
    title: 'Help with the right standard',
    text: 'Not sure what your product needs? Our engineers map the IS, IEC or EN standards for your target market.',
  },
  {
    title: 'Clear timelines',
    text: 'Fixed test plan, booked slot and status updates, so your launch date does not slip.',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Share your product',
    text: 'Send product details, standards and target market.',
  },
  {
    step: '02',
    title: 'Get a quote and test plan',
    text: 'We confirm the standards, timeline and cost.',
  },
  {
    step: '03',
    title: 'Send samples',
    text: 'We book your product into a test slot.',
  },
  {
    step: '04',
    title: 'Testing',
    text: 'Accredited tests with progress updates.',
  },
  {
    step: '05',
    title: 'Get your report',
    text: 'Test report ready for BIS, CE or buyer approval.',
  },
]

export const popularTests = [
  {
    label: 'IP Testing (IP65, IP66, IP67, IP68, IP69K)',
    href: '/ip-testing-laboratory-india',
  },
  { label: 'Vibration Testing Lab', href: '/vibration-testing' },
  {
    label: 'Battery Testing IS 16046 / IEC 62133',
    href: '/batteries-for-portable-products-testing-lab-is-16046-iec-62133',
  },
  {
    label: 'UN 38.3 Lithium Battery Testing',
    href: '/un-38-3-lithium-ion-batteries-transpotation-testing',
  },
  {
    label: 'IEC 60601 Medical Device Testing',
    href: '/iec-60601-testing',
  },
  {
    label: 'IEC 60335 Household Appliance Testing',
    href: '/iec-60335-1-safety-testing-india',
  },
  {
    label: 'LM-79 Testing',
    href: '/lm-79-testing',
  },
  { label: 'JSS 55555 Environmental Testing', href: '/jss-55555-testing' },
  { label: 'Salt Spray Testing', href: '/salt-spray-testing' },
  {
    label: 'ATEX Testing',
    href: '/atex-testing-certification',
  },
  {
    label: 'Energy Meter Calibration (NABL)',
    href: '/energy-meter-calibration-testing-nabl',
  },
  {
    label: 'Calibration of Volumetric Glassware',
    href: '/calibration-of-volumetric-glassware',
  },
]

export const productCategories = [
  {
    code: '60204',
    title: 'IEC 60204 Machinery',
    text: 'Metalworking, food, plastic, printing, wood, textile and construction machinery.',
    href: '/machinery-equipment-testing-2',
  },
  {
    code: '60598',
    title: 'IEC 60598 Lighting',
    text: 'Road lighting, emergency lighting, luminaires and lighting chains.',
    href: '/electrical-safety-testing-for-lighting-products',
  },
  {
    code: '60601',
    title: 'IEC 60601 Medical',
    text: 'Hospital systems, infusion devices, autoclaves and stimulators.',
    href: '/iec-60601-testing',
  },
  {
    code: '61215',
    title: 'IEC 61215 PV Modules',
    text: 'Crystalline silicon PV design qualification and type approval.',
    href: '/photovoltatc-pv-modules-testing',
  },
  {
    code: '61427',
    title: 'IEC 61427 Batteries',
    text: 'Secondary cells and batteries for photovoltaic energy systems.',
    href: '/battery-testing',
  },
]

export const industries = [
  'Home Appliances',
  'Lighting & LED',
  'Medical Devices',
  'Solar & Energy Storage',
  'Electric Vehicles & Batteries',
  'Defence & Aerospace',
  'Railways (RDSO)',
  'IT & Telecom',
  'Industrial Machinery',
  'Packaging & Logistics',
]

export const homeFaqs = [
  {
    q: 'Is ITC India an NABL-accredited lab?',
    a: 'Yes. ITC India is accredited by NABL to ISO/IEC 17025 for testing and calibration. You can view our scope and certificate on the Accreditations page.',
  },
  {
    q: 'Can I get BIS (CRS) testing done at ITC India?',
    a: 'Share your product details so we can confirm whether it falls under our BIS CRS testing scope and advise the next step.',
  },
  {
    q: 'What products can you test?',
    a: 'Electrical appliances, lighting, medical devices, IT and electronic equipment, batteries, solar modules, enclosures, cables, packaging and more, across 12 testing disciplines.',
  },
  {
    q: 'How long does testing take?',
    a: 'It depends on the standard and product. We give a firm timeline with your quote after we review your samples and scope.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Send your product details, target standard and market through the inquiry form, email or WhatsApp. We reply with a test plan and price.',
  },
  {
    q: 'Do you test for export markets like Europe or the Middle East?',
    a: 'Yes. We test to IEC, EN and ISO standards used for CE marking and other international approvals.',
  },
]

export const contactSection = {
  eyebrow: 'Inquiry',
  title: 'Get a Testing Quote',
  text: 'Tell us the product and target market. Our engineers reply with the right standards, a timeline and a price.',
  submit: 'Get a Quote',
  submitted: 'Request received',
}
