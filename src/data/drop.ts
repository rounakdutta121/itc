import { company } from './content'

export const dropHeroImage = {
  landscape: '/images/drop/hero-slide-1.webp',
  portrait: '/images/drop/hero-slide-1-portrait.webp',
}

export const dropLabImages = [
  '/images/drop/lab-1.webp',
  '/images/drop/lab-2.webp',
  '/images/drop/lab-3.webp',
  '/images/drop/lab-4.webp',
  '/images/drop/lab-5.webp',
  '/images/drop/lab-6.webp',
  '/images/drop/lab-7.webp',
  '/images/drop/lab-8.webp',
  '/images/drop/lab-9.webp',
  '/images/drop/lab-10.webp',
]

export const dropGallery = [
  {
    src: '/images/drop/lab-2.webp',
    title: 'Free-fall release over steel plate',
    detail:
      'Specimen positioned above a bolted hard steel plate on concrete — height and orientation taken from the referred drop standard.',
  },
  {
    src: '/images/drop/lab-3.webp',
    title: 'Edge / corner orientation setup',
    detail:
      'Face, edge and corner drops as used in IEC 60068-2-31 style programmes, with one drop per orientation where specified.',
  },
  {
    src: '/images/drop/lab-4.webp',
    title: 'Impact plate and fixing detail',
    detail:
      'Hard, properly bolted impact surface used for military and commercial free-fall trials (JSS / IEC / IS families).',
  },
  {
    src: '/images/drop/lab-5.webp',
    title: 'Pre-test visual examination',
    detail:
      'Baseline visual, electrical and mechanical checks before the first trial so post-test change can be scored clearly.',
  },
  {
    src: '/images/drop/lab-6.webp',
    title: 'Height reference for trials',
    detail:
      'Drop height markers aligned to condition tables (for example JSS 25–1000 mm or IT equipment 750–1000 mm bands).',
  },
  {
    src: '/images/drop/lab-7.webp',
    title: 'Edge-lift return sequence',
    detail:
      'QM-333 style edge lift to 45° or 100 mm with free return onto the steel platform across four drops.',
  },
  {
    src: '/images/drop/lab-8.webp',
    title: 'Post-drop inspection',
    detail:
      'After trials, specimens are checked for cracks, earthing continuity, insulation spacing and moving-part integrity.',
  },
  {
    src: '/images/drop/lab-9.webp',
    title: 'Unpackaged DUT staging',
    detail:
      'Unpacked, switched-off staging with normal wiring positions before transfer into the drop zone.',
  },
  {
    src: '/images/drop/lab-10.webp',
    title: 'Drop floor overview',
    detail:
      'Mohali drop bay overview — steel plate, handling clearances and operator access for multi-trial programmes.',
  },
]

export const dropStandards = [
  {
    slug: 'iec-60950-1',
    code: 'IEC 60950-1 · 4.2.6',
    title: 'IT & telecom free fall',
    href: '/drop-testing/iec-60950-1',
    summary:
      'Safety drop for information technology and telecommunication equipment — three free-fall trials on a hard surface, typically 750–1000 mm, with post-test checks against key safety clauses.',
  },
  {
    slug: 'is-13252',
    code: 'IS 13252 · Part 1',
    title: 'Indian IT equipment drop',
    href: '/drop-testing/is-13252',
    summary:
      'Indian Standard aligned with IEC 60950-1 drop practice for IT equipment — free-fall trials and compliance review after impact.',
  },
  {
    slug: 'jss-55555-13',
    code: 'JSS 55555 · Test 13',
    title: 'Military rough-handling drop',
    href: '/drop-testing/jss-55555-13',
    summary:
      'Defense environmental drop for electronic and electrical equipment — unpacked, switched off, free fall onto a bolted hard surface with condition heights from 25 mm to 1000 mm.',
  },
  {
    slug: 'qm-333-10',
    code: 'QM-333 · Test 10',
    title: 'TEC radio transmission drop',
    href: '/drop-testing/qm-333-10',
    summary:
      'TEC environmental drop for radio transmission gear — edge lift to 45° or 100 mm (whichever first), four free returns onto a hard steel platform.',
  },
  {
    slug: 'iec-60068-2-31',
    code: 'IEC 60068-2-31',
    title: 'Drop, topple & free fall',
    href: '/drop-testing/iec-60068-2-31',
    summary:
      'Environmental handling shocks — dropping, toppling and free-fall procedures with heights from 25 mm to 1500 mm by specimen size, covering face, edge and corner orientations.',
  },
  {
    slug: 'iec-60079-0-26-4-2',
    code: 'IEC 60079-0 · 26.4.2',
    title: 'Explosive atmospheres drop',
    href: '/drop-testing/iec-60079-0-26-4-2',
    summary:
      'Drop requirements under IEC 60079-0 for equipment intended for explosive atmospheres — impact resistance as part of the type-test suite.',
  },
  {
    slug: 'iec-60079-0-26-4-3',
    code: 'IEC 60079-0 · 26.4.3',
    title: 'Explosive atmospheres impact',
    href: '/drop-testing/iec-60079-0-26-4-3',
    summary:
      'Related IEC 60079-0 impact / drop clause coverage for Ex equipment — verifies structural integrity after defined handling shocks.',
  },
]

export const dropTypes = [
  {
    title: 'Free-fall drop',
    aka: 'Gravity release',
    text: 'The unpacked specimen is held with its lowest point at the specified height, then released to fall under gravity onto a hard steel plate over a concrete block — with minimal disturbance at release.',
  },
  {
    title: 'Drop, topple & edge return',
    aka: 'Handling simulation',
    text: 'Depending on the standard, programmes include face / edge / corner free falls, topple sequences, or edge-lift returns (for example QM-333: 45° or 100 mm) that replicate rough handling in transport and service.',
  },
]

export const dropProcess = [
  'Derive purpose from the referred standard — confirm the equipment can survive the shock impacts it will face; note drop height, orientation and number of trials.',
  'Complete pre-test visual and functional (mechanical and electrical) examination; record initial readings. Bring the specimen unpacked, switches off, wiring in normal position.',
  'Set up on a large hard steel plate fixed over a solid concrete block. Position the specimen at the required orientation with its lowest point at the trial height.',
  'Release the specimen to fall under gravity with minimal disturbance. Repeat for the required trials, varying height and orientation as the standard demands.',
  'After trials, perform post-test visual and functional examination, compare with the baseline, and submit inputs for the test report.',
]

export const dropFailCriteria = [
  'Cracks or breaks expose bare parts that can be touched under hazardous voltage or operating conditions.',
  'An accessible part loses contact with the earthing terminal.',
  'Insulation is damaged so that spacing is reduced and electric strength is affected.',
  'Cords or moving parts are compromised.',
]

export const dropFaqs = [
  {
    q: 'How is drop testing a suitable method of environmental testing?',
    a: 'Drop testing simulates real-world mishandling and falling conditions, stressing the specimen to check durability and impact resistance against free-fall collisions.',
  },
  {
    q: 'Why choose ITC India for drop testing?',
    a: 'ITC India is NABL-accredited with a broad testing scope. Our team provides pre-test guidance, empirical analysis and efficient floor support for drop programmes across commercial and defense standards.',
  },
  {
    q: 'How do height variations make standards work differently?',
    a: 'Drop height sets the impact force on the specimen and is chosen from mass, utility and function. That is why many environmental standards include an applicability clause for drop.',
  },
  {
    q: 'I have an electronic product — which drop test do I need?',
    a: `If you are unsure which standard fits, contact our experts at ${company.phoneDisplay} for guidance on scope and method.`,
  },
  {
    q: 'How many drop testing standards does ITC India cover?',
    a: `We offer a wide variety of drop-related methods — around 10+ programmes that incorporate drop testing. Email ${company.email} to start a booking.`,
  },
]

export const dropIntro = {
  eyebrow: 'Environmental / IP · Drop',
  title: 'Drop testing',
  lede: 'Prove impact resistance under replicated rough handling — free fall, topple and edge-return programmes reported against recognised commercial, telecom and defense standards.',
  body: [
    'Drop testing is a common constituent of several internationally recognised environmental testing standards. It examines the impact-resistance of the equipment under test by monitoring functional and structural response when exposed to replicated rough-handling situations.',
    'During transportation or in service, devices often face improper handling and falls that can affect functionality. Drop testing addresses that risk for primarily electric and electronic products. ITC India provides expert-backed drop facilities with pre-test guidelines and post-test feedback support.',
  ],
  why: 'Electrical and electronic devices are often handled roughly. Jerks and short drops can cause functional and structural change. Drop testing subjects the specimen to a chosen height and orientation from the referred standard, then observes the response so improvement can be made before service.',
}

export const dropCompare = [
  {
    code: 'IEC 60950-1 / IS 13252',
    method: 'Free fall × 3',
    sector: 'IT & telecom',
    focus: '750–1000 mm hard-surface trials; post-test safety clause checks.',
  },
  {
    code: 'JSS 55555 · 13',
    method: 'Free fall conditions A–F',
    sector: 'Military electronics',
    focus: '25–1000 mm onto bolted hard surface; omit if drop is unlikely in service.',
  },
  {
    code: 'QM-333 · 10',
    method: 'Edge lift / return × 4',
    sector: 'TEC radio transmission',
    focus: '45° or 100 mm edge lift onto hard steel; visual, electrical and mechanical compare.',
  },
  {
    code: 'IEC 60068-2-31',
    method: 'Drop, topple, free fall',
    sector: 'Electronic components / equipment',
    focus: '25–1500 mm by size; face, edge and corner orientations.',
  },
  {
    code: 'IEC 60079-0',
    method: 'Drop / impact clauses',
    sector: 'Explosive atmospheres',
    focus: 'Type-test drop and impact integrity for Ex equipment.',
  },
]
