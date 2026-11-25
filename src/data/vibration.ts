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

/** Main page copy — exact wording from the Vibration Testing overview document. */
export const vibrationPage = {
  intro: [
    'Vibration Testing is used to examine any device’s mechanical potential to withstand real-world operational and environmental conditions. The test creates a simulated set-up, producing the effects of load imparted during the use case, testing the device under varied parameters and finally generating the conclusive test report. The report then further helps in understanding and analysing the physical strength of the device under test (DUT), highlighting any possible risk or scope of improvement. This test is significant because it comes under several recognised standards serving distinct purposes for primarily electric and electronic devices.',
    'At ITC India, we promise to conduct the vibration testing by understanding the client’s requirements, the equipment’s compatibility and the need for respective tests in order to meet the expectations. With testing experience since 2009, prescribed standards and latest testing equipment, we cover all parameters fulfilling the requirements.',
  ],
  cta: 'Get Vibration Testing Done!',
  whyTitle: 'Why Do We Need Vibration Testing?',
  why: [
    'The aim to perform vibration testing on any equipment is to highlight any kind of structural fault, load strength, functional response along with other vibrational parameters like resonance frequency, amplitude tolerance and more. When a device is brought for service, it goes under various dynamic shock and load conditions which trigger the physical potential. Thus, to expose the device against these conditions before the service usage, vibration testing is used.',
    'With the help of standard testing methods, various prescribed vibration testing machines and methods are used to replicate the effects of the load and vibrations on the specimen, noting its response in terms of functional, structural and state transitions to prepare the final output report.',
  ],
  typesTitle: 'Types of Vibration Testing',
  typesIntro:
    'The modes of vibration testing change with the respective standard referred. However, there can be two categories to segregate vibration testing.',
  typesList: ['Sinusoidal Vibrations Testing', 'Random Vibrations'],
  sinusoidal:
    'Sinusoidal Vibration Testing (also known as sine testing) is a method where the equipment is tested against specified sinusoidal vibrations using the vibration shaker machine such that the mounting points of the fixture move in phase along parallel axes with uniform amplitude, maintaining spatial and temporal coherence. To determine the tolerance amplitude, different standards recommend different changes in the specified value. The device under test (DUT) undergoes one single testing frequency at a time.',
  random:
    'Random Vibration Testing is a method to test any equipment’s adequacy to resist dynamic loads without losing its functional and structural integrity. The specimen undergoes the test with single or multiple control points each supplied with random frequencies (as guided by the standard) giving the equipment an overall dynamic frequency experience. The specimen exhibits a non-deterministic, stochastic response across the defined frequency spectrum along the motion axis.',
  afterTypes:
    'After the testing is done, the equipment shall be visually examined as well as electrically and mechanically checked as specified. The testing helps in finding out the endurance of the equipment against all possible sorts of vibrations.',
  standardsTitle: 'Popular standards of Vibration Testing:',
  standardsIntro:
    'With a variety of vibration testing standards followed, we at ITC India conduct the testing based on the listed standards:',
  popularStandards: [
    { label: 'IEC 60068 - 2 - 6', href: '/iec-60068-2-6-vibration-testing-2-2' },
    { label: 'IEC 60068 - 2 - 64', href: '/vibration-testing/iec-60068-2-64' },
    { label: 'JSS 55555 Test No. 28', href: '/jss-55555-testing' },
  ],
  standardsMore: 'And more…',
  distinctionsTitle: 'Distinctions:',
  distinctionsIntro:
    'Each listed standard varies in terms of scope of equipment, their specified testing parameters and method. Below we have a concise description of some vibration testing standards.',
  distinctions: [
    {
      title: 'IEC 60068-2-6:',
      href: '/iec-60068-2-6-vibration-testing-2-2',
      text: 'This part of IEC 60068 deals with the method of test (sine testing) used to check compliance of components and equipment which during transportation or in service are subjected to harmonic vibrational patterns. These conditions are replicated empirically in a controlled environment, examining the specimen and recording its response as an analysis report. Majorly serving the purpose for industrial and commercial equipment, IEC 60068-2-6 becomes an internationally recognised standard for sine testing.',
    },
    {
      title: 'IEC 60068-2-64:',
      href: '/vibration-testing/iec-60068-2-64',
      text: 'This part of IEC 60068 deals with the method of test (random vibration) used to check the strength of the device under test (DUT) when subjected under vibrations of stochastic nature during transportation or in service conditions. The simulated set-up uses a single or multiple control points system to conduct the test using different frequencies on the specimen recording its response. And thus, IEC 60068-2-64 is recognised as an international standard for broadband random vibration testing.',
    },
    {
      title: 'JSS 55555 (Test No. 28):',
      href: '/jss-55555-testing',
      text: 'Joint Services Specification (JSS 55555) specifies environmental test procedures for military electronic and electrical equipment. Out of its 31 specified testings, Test Number 28 talks about vibration testing where both sine test (as Sinusoidal Vibration System) and random vibration test (Random Vibration System) are included. Describing the various parameters and scope of response, the fourth revision in JSS 55555 finds random vibration testing a more effective method of exposing the structural weakness of the equipment.',
    },
    {
      title: 'JSS 50101 (Test No. 23):',
      href: '/jss-50101-testing',
      text: 'Joint Service Specification Number 50101 provides methods and norms for environment testing of electronic devices and components used in defense services. This test serves the intention of predetermining the potential cause of failure when exposed to the service environment. Its Test Number 23 elaborates on sinusoidal vibration testing where the specimen is subjected to vibrational parameters explicitly mentioned with characteristics. The referred table is titled as Sinusoidal Vibration Severities.',
    },
    {
      title: 'IEC 61373',
      href: '/iec-61373-vibration-testing',
      text: 'This international standard defines shock and vibration testing requirements for railway rolling stock equipment. It specifies random vibration and shock testing levels to verify that equipment can withstand the random operational vibrations and impacts encountered during train transit.',
    },
  ],
  howTitle: 'How is Vibration Testing performed?',
  howIntro:
    'The procedure of vibration testing is varied and elaborated in different cases. But an overview, demonstrating how is a test conducted is mentioned below:',
  howSteps: [
    'The test begins with its purpose, taken from the standard being followed, which is to confirm that the equipment can withstand the vibration it will face in service.',
    'The equipment\'s details are noted, and the equipment specification sets the vibration type, frequency range, strength and duration. Its condition is then checked visually, electrically and mechanically.',
    'The equipment is fixed to the vibration table the way it is fixed in service, with control sensors placed near its fixing points.',
    'The machine is set up and its limits are checked, then the vibration is started at a low level to confirm the equipment and machine respond as expected.',
    'The full vibration is then applied for the set time in each of the three axes, while the equipment is observed and any unusual behaviour is recorded.',
    'When the run ends, the equipment is checked again and compared with its starting condition, and the results go into a report with the test conditions and the pass or fail outcome.',
  ],
  faqTitle: 'Frequently Asked Questions (FAQs):',
  faqs: [
    {
      q: 'Why does an appliance need Vibration testing?',
      a: 'Vibration testing helps in predetermination of structural and functional fault in any electronic and electrical devices when they are subjected to dynamic vibrations during transportation or in service.',
    },
    {
      q: 'Which is the best laboratory for Vibration Testing?',
      a: 'ITC India with the help of well equipped laboratories, technically experienced staff and a variety of testing standards covered serves as the best testing for vibration testing.',
    },
    {
      q: 'Can I get my equipment tested on multiple standards?',
      a: 'Yes, if the client demands to get their specimen tested for multiple standards, we do assure to provide the facility along with guidance and assistance of technical experts.',
    },
    {
      q: 'How many total standards of Vibration Testing is provided by ITC India?',
      a: 'About 12 distinct standards of vibration testing are provided as service by ITC India’s laboratories.',
    },
    {
      q: 'How would I know specifically about the testing needed by my product?',
      a: `One can get proper assistance, recommendations regarding testing and support from our expert’s side. You can book an appointment on call @${company.phoneDisplay} or visit `,
      linkSite: true as const,
    },
  ],
  whatsappHref: `https://wa.me/${company.whatsapp}`,
}

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
 * Lab-facing pages for the two IEC programmes.
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
    editionNote:
      'Environmental testing — Tests — Test Fh: Vibration, broadband random and guidance',
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
