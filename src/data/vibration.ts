import { company } from './content'

export const vibrationHeroImage = {
  landscape: '/images/vibration/hero-slide-1.webp',
  portrait: '/images/vibration/hero-slide-1-portrait.webp',
}

export const vibrationLabImages = [
  '/images/vibration/lab-1.webp',
  '/images/vibration/lab-2.webp',
  '/images/vibration/lab-3.webp',
  '/images/vibration/lab-4.webp',
  '/images/vibration/lab-5.webp',
  '/images/vibration/lab-6.webp',
  '/images/vibration/lab-7.webp',
  '/images/vibration/lab-8.webp',
  '/images/vibration/lab-9.webp',
  '/images/vibration/lab-10.webp',
]

export const vibrationGallery = [
  {
    src: '/images/vibration/lab-2.webp',
    title: 'Response investigation & resonance dwell',
    detail:
      'Frequency sweep and dwell setup used to find critical resonance, bandwidth and Q-factor before endurance on the shaker.',
  },
  {
    src: '/images/vibration/lab-3.webp',
    title: 'RDSO railway vibration & shock diagram',
    detail:
      'Method view aligned to RDSO/PE/SPEC/TL/0091 vibration and shock expectations for railway and rolling-stock equipment.',
  },
  {
    src: '/images/vibration/lab-4.webp',
    title: 'Multi-axis severity protocol',
    detail:
      'Three-axis vibration severity layout used when programmes call for sequential X, Y and Z exposure under JSS or similar methods.',
  },
  {
    src: '/images/vibration/lab-5.webp',
    title: 'Electrodynamic shaker fixture',
    detail:
      'Rigid clamping and control/response accelerometer placement for coherent sine or random drive on the electrodynamic shaker.',
  },
  {
    src: '/images/vibration/lab-6.webp',
    title: 'High-frequency enclosure mount',
    detail:
      'Enclosure-on-shaker configuration for broadband or high-frequency programmes with fixture stiffness matched to the DUT.',
  },
  {
    src: '/images/vibration/lab-7.webp',
    title: 'Benchtop control & waveform review',
    detail:
      'Operator console view for profile verification, abort limits and live channel monitoring during a run.',
  },
  {
    src: '/images/vibration/lab-8.webp',
    title: 'Shaker bay facility layout',
    detail:
      'Bay overview showing shaker, control room adjacency and handling clearances used on the Mohali vibration floor.',
  },
  {
    src: '/images/vibration/lab-9.webp',
    title: 'Acceleration spectral density tolerance',
    detail:
      'ASD shape with upper/lower tolerance bands for random vibration control against the referred severity.',
  },
  {
    src: '/images/vibration/lab-10.webp',
    title: 'Compliance matrix snapshot',
    detail:
      'Standards mapping graphic used to shortlist sine, random, railway and packaging vibration programmes.',
  },
]

export const vibrationStandards = [
  {
    slug: 'iec-60068-2-6',
    code: 'IEC 60068-2-6',
    title: 'Sinusoidal vibration',
    href: '/vibration-testing/iec-60068-2-6',
    summary:
      'Sine testing for components and equipment exposed to harmonic vibration during transport or service — an internationally recognised method for industrial and commercial products.',
  },
  {
    slug: 'iec-60068-2-64',
    code: 'IEC 60068-2-64',
    title: 'Broadband random vibration',
    href: '/vibration-testing/iec-60068-2-64',
    summary:
      'Random vibration method verifying DUT strength under stochastic vibration with single or multiple control points across a defined frequency spectrum.',
  },
  {
    slug: 'jss-55555',
    code: 'JSS 55555 · Test 28',
    title: 'Military environmental vibration',
    href: '/vibration-testing/jss-55555',
    summary:
      'Joint Services Specification environmental procedures for military electronic and electrical equipment, covering both sinusoidal and random vibration systems.',
  },
  {
    slug: 'jss-50101',
    code: 'JSS 50101 · Test 23',
    title: 'Defense electronic components',
    href: '/vibration-testing/jss-50101',
    summary:
      'Sinusoidal vibration severities for electronic devices and components used in defense services, focused on early failure-mode exposure.',
  },
  {
    slug: 'jss-5855-11',
    code: 'JSS 5855-11 · Test 20',
    title: 'Environmental vibration service',
    href: '/vibration-testing/jss-5855-11',
    summary:
      'Defense environmental vibration requirements used to qualify equipment against service vibration profiles.',
  },
  {
    slug: 'mil-std-810h',
    code: 'MIL-STD-810H · 514.8',
    title: 'Vibration & shock method',
    href: '/vibration-testing/mil-std-810h',
    summary:
      'US military environmental engineering method for vibration and shock qualification of materiel in laboratory conditions.',
  },
  {
    slug: 'rdso-tl-0091',
    code: 'RDSO/PE/SPEC/TL/0091',
    title: 'Railway LED vibration & shock',
    href: '/vibration-testing/rdso-tl-0091',
    summary:
      'RDSO vibration and shock requirements for railway LED luminaires and related transit equipment.',
  },
  {
    slug: 'iec-61373',
    code: 'IEC 61373',
    title: 'Railway rolling stock',
    href: '/vibration-testing/iec-61373',
    summary:
      'Shock and vibration testing for railway rolling stock equipment, verifying endurance under operational random vibration and impacts.',
  },
  {
    slug: 'ista-1a',
    code: 'ISTA 1A',
    title: 'Packaging random vibration',
    href: '/vibration-testing/ista-1a',
    summary:
      'ISTA package integrity random vibration for packaged-product distribution simulation.',
  },
  {
    slug: 'ista-2a',
    code: 'ISTA 2A',
    title: 'Packaged-product random vibration',
    href: '/vibration-testing/ista-2a',
    summary:
      'Extended ISTA random vibration protocol for packaged products under distribution stresses.',
  },
  {
    slug: 'ista-2b',
    code: 'ISTA 2B',
    title: 'Distribution random vibration',
    href: '/vibration-testing/ista-2b',
    summary:
      'ISTA 2B random vibration coverage for packaged goods moving through logistics channels.',
  },
  {
    slug: 'random-vibration',
    code: 'Random vibration',
    title: 'Dedicated random vibration page',
    href: '/vibration-testing/random-vibration',
    summary:
      'Focused random vibration testing coverage — separate deep-dive page for stochastic vibration methods and related standards.',
  },
]

export const vibrationTypes = [
  {
    title: 'Sinusoidal vibration testing',
    aka: 'Sine testing',
    text: 'Equipment is tested against specified sinusoidal vibrations on a vibration shaker so mounting points move in phase along parallel axes with uniform amplitude. The DUT experiences one test frequency at a time, with amplitude tolerance set by the governing standard.',
  },
  {
    title: 'Random vibration testing',
    aka: 'Stochastic loading',
    text: 'Assesses whether equipment can resist dynamic loads without losing functional or structural integrity. Single or multiple control points supply random frequencies, producing a non-deterministic response across the defined spectrum.',
  },
]

export const vibrationProcess = [
  'Confirm purpose from the governing standard — prove the product can withstand in-service vibration.',
  'Record equipment details; specifications set vibration type, frequency range, strength and duration. Check visual, electrical and mechanical condition.',
  'Fix the equipment to the vibration table as in service, with control sensors near fixing points.',
  'Set machine limits, start at a low level to confirm expected response from equipment and shaker.',
  'Apply full vibration for the set time on each of three axes; observe and record unusual behaviour.',
  'Re-check the equipment against start condition and issue a report with conditions and pass/fail outcome.',
]

export const vibrationFaqs = [
  {
    q: 'Why does an appliance need vibration testing?',
    a: 'Vibration testing helps identify structural and functional faults in electronic and electrical devices before they face dynamic vibration during transportation or in service.',
  },
  {
    q: 'Which laboratory should I choose for vibration testing?',
    a: 'ITC India combines equipped laboratories, experienced technical staff and broad standards coverage for vibration testing programmes.',
  },
  {
    q: 'Can I get my equipment tested to multiple standards?',
    a: 'Yes. When clients need multi-standard programmes, we provide the facility with guidance from technical experts.',
  },
  {
    q: 'How many vibration testing standards does ITC India cover?',
    a: 'About 12 distinct vibration testing standards are offered as laboratory services.',
  },
  {
    q: 'How do I know which test my product needs?',
    a: `Our experts can recommend the right scope. Call ${company.phoneDisplay} or book a consultation from this site.`,
  },
]

export const vibrationIntro = {
  eyebrow: 'Environmental / IP · Vibration',
  title: 'Vibration testing',
  lede: 'Examine mechanical potential under real-world operational and environmental loads — simulated on calibrated shakers, reported against recognised commercial and defense standards.',
  body: [
    'Vibration testing is used to examine any device’s mechanical potential to withstand real-world operational and environmental conditions. The test creates a simulated set-up, producing the effects of load imparted during the use case, testing the device under varied parameters and finally generating the conclusive test report. The report then further helps in understanding and analysing the physical strength of the device under test (DUT), highlighting any possible risk or scope of improvement. This test is significant because it comes under several recognised standards serving distinct purposes for primarily electric and electronic devices.',
    'At ITC India, we conduct vibration testing by understanding the client’s requirement, equipment compatibility and the need for respective tests. With prescribed standards and latest testing equipment, we cover the parameters required for a clear compliance pathway.',
  ],
  why: 'The aim is to highlight structural faults, load strength, functional response and vibrational parameters such as resonance frequency and amplitude tolerance. Before service use, vibration testing replicates load and vibration effects on the specimen and records functional, structural and state transitions for the final report.',
}

/** High-level lab comparison — original marketing copy, not a standards reprint. */
export const vibrationCompare = [
  {
    code: 'IEC 60068-2-6',
    method: 'Sinusoidal (Test Fc)',
    sector: 'Industrial / commercial',
    focus: 'Harmonic vibration during transport or service; one frequency at a time with defined amplitude and sweep.',
  },
  {
    code: 'IEC 60068-2-64',
    method: 'Broadband random (Test Fh)',
    sector: 'Industrial / commercial',
    focus: 'Stochastic vibration with acceleration spectral density control; single or multipoint strategies.',
  },
  {
    code: 'JSS 55555 · 28',
    method: 'Sine + random',
    sector: 'Military electronics',
    focus: 'Joint Services environmental vibration for military electronic and electrical equipment.',
  },
  {
    code: 'JSS 50101 · 23',
    method: 'Sinusoidal',
    sector: 'Defense components',
    focus: 'Sinusoidal vibration severities for electronic devices and components in defense service.',
  },
  {
    code: 'MIL-STD-810H · 514.8',
    method: 'Vibration & shock',
    sector: 'US military materiel',
    focus: 'Laboratory vibration and shock qualification against defined materiel environments.',
  },
  {
    code: 'IEC 61373',
    method: 'Random + shock',
    sector: 'Railway rolling stock',
    focus: 'Operational random vibration and impacts for equipment mounted on rolling stock.',
  },
  {
    code: 'ISTA 1A / 2A / 2B',
    method: 'Package random',
    sector: 'Packaged-product logistics',
    focus: 'Distribution simulation for packaged products under random vibration profiles.',
  },
  {
    code: 'RDSO TL/0091',
    method: 'Vibration & shock',
    sector: 'Railway LED / transit',
    focus: 'RDSO vibration and shock requirements for railway LED luminaires and related gear.',
  },
]

export type VibrationStandardDetail = {
  slug: string
  code: string
  title: string
  method: string
  editionNote: string
  lede: string
  whoFor: string
  whatWeCover: string[]
  labFlow: string[]
  outcomes: string[]
}

/**
 * Lab-facing pages for the two IEC PDFs supplied with the brief.
 * Written as original service copy — not a reproduction of IEC text.
 */
export const vibrationStandardDetails: VibrationStandardDetail[] = [
  {
    slug: 'iec-60068-2-6',
    code: 'IEC 60068-2-6',
    title: 'Sinusoidal vibration (Test Fc)',
    method: 'Sinusoidal / sine testing',
    editionNote: 'Environmental testing — Tests — Test Fc: Vibration (sinusoidal)',
    lede:
      'Sine vibration programmes for components and equipment that see harmonic vibration in transport or service. ITC India runs controlled shaker profiles with defined frequency ranges, amplitude limits and endurance strategy taken from your product specification.',
    whoFor:
      'Industrial and commercial electrical / electronic products that must demonstrate durability under coherent sinusoidal motion — fixtures moving in phase along parallel axes with uniform amplitude.',
    whatWeCover: [
      'Basic motion setup on the vibration shaker with mounting that matches service fixing',
      'Control approach — single-point or multipoint — agreed against the governing specification',
      'Frequency window, displacement / acceleration amplitude and sweep or fixed-frequency endurance',
      'Tolerance checks for signal quality, spurious motion and frequency accuracy during the run',
      'Response investigation where the specification calls for resonance or critical-frequency review',
      'Preconditioning, intermediate checks and final visual / electrical / mechanical measurements',
    ],
    labFlow: [
      'Confirm purpose and severity from your referred specification and product drawings.',
      'Record DUT identity, mounting method and sensor locations near fixing points.',
      'Establish machine limits, then prove response at a low excitation level.',
      'Apply the sine endurance — sweep cycles or fixed frequencies — on each required axis.',
      'Capture unusual behaviour, then compare post-test condition with the starting baseline.',
      'Issue the report with test conditions, observations and pass / fail against the acceptance criteria.',
    ],
    outcomes: [
      'Evidence that the DUT withstands the specified harmonic vibration environment',
      'Clear record of severities, axes, durations and functional / structural response',
      'Actionable notes on weakness, resonance behaviour or improvement scope where observed',
    ],
  },
  {
    slug: 'iec-60068-2-64',
    code: 'IEC 60068-2-64',
    title: 'Broadband random vibration (Test Fh)',
    method: 'Broadband random vibration',
    editionNote: 'Environmental testing — Tests — Test Fh: Vibration, broadband random and guidance',
    lede:
      'Random vibration programmes for products exposed to stochastic dynamic loads. ITC India applies controlled acceleration spectral density (ASD) profiles with agreed RMS levels, frequency span and duration — including guidance spectra for transport, stationary install, wheeled vehicles or aircraft-mounted equipment when specified.',
    whoFor:
      'Equipment that must keep functional and structural integrity under non-deterministic vibration — broadband excitation that exercises many frequencies together rather than a single sine tone.',
    whatWeCover: [
      'Shaker motion, cross-axis behaviour and mounting aligned to the service configuration',
      'Measuring chain and control strategy for the defined ASD shape and crest-factor limits',
      'Test frequency range, RMS acceleration and spectral breakpoints from the referred severity',
      'Low-level equalisation before full-level random testing where the method requires it',
      'Optional initial / final vibration response investigation around the random endurance',
      'Recovery, final functional checks and a report that states conditions and results',
    ],
    labFlow: [
      'Map the required spectrum category and breakpoints to your product’s use case.',
      'Fixture the DUT, place control / response sensors and verify the measuring system.',
      'Equalise at low level, then raise to the specified random severity for the set duration.',
      'Run each required axis; watch for functional interruption or structural change.',
      'Complete final response and performance checks after recovery where specified.',
      'Deliver the test report with spectrum used, RMS, duration, axes and pass / fail outcome.',
    ],
    outcomes: [
      'Proof of strength under broadband random vibration representative of the service environment',
      'Documented ASD profile, control method and measured response for compliance files',
      'Engineering insight into dynamic weakness before field or distribution exposure',
    ],
  },
]

export function getVibrationStandardDetail(slug: string) {
  return vibrationStandardDetails.find((item) => item.slug === slug)
}
