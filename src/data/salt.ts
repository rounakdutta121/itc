import { company } from './content'

export const saltHeroImage = {
  landscape: '/images/salt/hero-people.webp',
  portrait: '/images/salt/hero-people-portrait.webp',
}

export const saltLabImages = [
  '/images/salt/lab-1.webp',
  '/images/salt/lab-2.webp',
  '/images/salt/lab-3.webp',
  '/images/salt/lab-4.webp',
  '/images/salt/lab-5.webp',
  '/images/salt/lab-6.webp',
  '/images/salt/lab-7.webp',
  '/images/salt/lab-8.webp',
  '/images/salt/lab-9.webp',
  '/images/salt/lab-10.webp',
]

/** Main page copy — exact wording from the Salt Fog and Corrosion Testing document. */
export const saltPage = {
  intro: [
    'Salt Fog Test, which is also known as salt mist test or salt spray test is a standard testing procedure where the resistance against corrosion of the metallic parts of the equipment is tested. The test basically examines the strength of the protective layer coated upon the metal parts or the alloying, to check how long during the storage or in service period, the equipment can survive. The test is performed by exposing the target region to moist salt solutions in calculated amounts periodically until the respective tests suggest and noting the observed changes visually and functionally after the test.',
    'As salt fog testing is a common and popular approach, it is explained by various different standards focusing on their target specimen. Some tests are conducted individually while some are conducted as the sub-test of any standard environment standard.',
    'If you want your product to become corrosion and rust proof, feel free to reach us out @ITC India, the most efficient testing and calibration laboratory serving excellence with experience for past (X) glorious years. Incorporating the latest technical lab set-up, we have successfully achieved the milestone of (Y) happy and satisfied customers.',
  ],
  cta: 'Book your appointment now!',
  whyTitle: 'What does the Salt Fog Test actually do?',
  why: [
    'Salt Fog Test creates a replicated environment for the equipment under test, recording its response in terms of corrosion occurring. The aim is to check the time duration an equipment can withhold the salt laden environment during the service or storage period.',
    'The replicating environment is prepared by setting up a standard chamber for the test. The chamber needs to be properly vented and properly set up as per the standard method followed. In the chamber, the specimen is properly placed for the specified time duration and periodically a spray of salt solution (specified by referred standard) is sprayed to create a fog or mist like environment. This checks the strength of the protective coating on the specimen and when the test is completed, the condition is noted as in both visual and functional sense.',
  ],
  typesTitle: 'Types and Variations',
  typesIntro:
    'The base method for all the tests are the same and that is creating the environment by spraying salt solution. The variations are totally equipment and standard dependent. Some possible variations can be highlighted as:',
  typesList: [
    'Temperature of salt fog test chamber',
    'pH of the prepared salt solution',
    'Spraying method and time duration',
    'Salt solution concentration and composition.',
  ],
  afterTypes:
    'All the listed parameters are taken into account before conducting a specific test.',
  howTitle: 'How is Salt Fog Testing actually done?',
  howIntro:
    'The general method of conducting the salt spray test on a chosen equipment is performed by following the below steps.',
  howNote:
    'Note: the process below is a general guideline of testing, thus respective specifications are recommended to be referred before performing the test.',
  howSteps: [
    'Select the target specimen and prepare it for the test such that the specimen is in clean and unpacked condition with no moisture content before the testing.',
    'Prepare the salt solution using the recommended salt(s) in proper proportion.',
    'Set up the salt fog chamber in clean and ventilated condition with proper temperature ensuring that the set-up would not let the drops of salt solution accumulated on walls and ceiling come in contact with the equipment. Place the equipment in the chamber and properly angle it.',
    'Run the spray with the required standard for the specified time duration.',
    'Once the time is completed, remove the specimen from the chamber, treat it as the specification says and examine them visually and/or functionally.',
  ],
  howClose:
    'These steps frame the understanding of testing procedures. Exact parameters can be determined from the specification referred to.',
  standardsTitle: 'Popular Standards',
  standardsIntro: [
    'Since the salt fog test is one of the most efficient ways to check the resistivity of any alloying or protective coating against rusting and corrosion, it serves as a part of major internationally recognised standard tests.',
    'At ITC India, we help the customer with six major standards of salt fog test providing assistance with several other related tests. Our team of experts with years of experience in testing provide the best testing guidance and analysis support.',
  ],
  popularStandards: [
    { label: 'JSS 55555 (Test Number 9)', href: '/salt-testing/jss-55555' },
    { label: 'IEC 60068-2-11', href: '/salt-testing/iec-60068-2-11' },
    { label: 'ASTM B117', href: '/salt-testing/astm-b117' },
    { label: 'ISO 9227', href: '/salt-testing/iso-9227' },
    { label: 'QM-333', href: '/salt-testing/qm-333' },
  ],
  distinctionsTitle: 'Distinctions:',
  distinctionsIntro:
    'At ITC India, we help the customer with six major standards of salt fog test providing assistance with several other related tests.',
  distinctions: [
    {
      title: 'JSS 55555 (Test Number 9)',
      href: '/salt-testing/jss-55555',
      text: 'Joint Service Specification number 55555 mentions the environmental tests mandatory for equipment used in defense service. Its Test Number-09 is about salt fog testing, with the objective to check the resistance against corrosion of components under test by replicating true salt laden moist environments. This standard incorporates multiple cyclic spraying methods along with a post-spray storage process. Once the test is conducted, the final and initial readings are compared.',
    },
    {
      title: 'IEC 60068-2-11',
      href: '/salt-testing/iec-60068-2-11',
      text: 'This section of IEC 60068 talks about salt mist testing which is an essential environment test for electronic and electric components used in commercial or industrial purposes. The test simulates a moderately warm environment at 35°C introducing constant spraying of NaCl solution with a specific concentration to expose the equipment’s strength against the moist environment. The time duration is a specimen dependent factor and after the test, readings are checked.',
    },
    {
      title: 'ASTM B117',
      href: '/salt-testing/astm-b117',
      text: 'ASTM B117 standard for salt testing is the first and oldest internationally recognised standard for salt testing which examines overall coating, metallic finishing and other protective measures specially for automotive electric products. Its continuous spraying method using a 5% w/w NaCl solution with specimen dependent time duration makes it an efficient method for corrosion testing. The test readings are calculated before and after the test, and during the test also if the standards suggest.',
    },
    {
      title: 'ISO 9227',
      href: '/salt-testing/iso-9227',
      text: 'International Organisation for Standardization 9227 provides procedural details along with appropriate apparatus and tools to perform salt spray testing on equipment to check the metallic and protective layer’s resistivity against corrosion. This standard is distinct from other standards as it involves three separate salt solutions NSS, AASS and CASS such that continuous spraying and post-test analysis including interim inspection and chamber’s corrosivity check with respect to reference panel.',
    },
    {
      title: 'QM-333',
      href: '/salt-testing/qm-333',
      text: 'QM-333 is the Telecommunication Engineering Centre (TEC) standard for environmental testing of radio transmission equipment. Its Test Number-09 covers salt corrosion (fog) testing, with the objective to check the suitability of equipment for use, storage or transport in salt laden atmospheres. The test uses a multi-salt sea water type solution applied in a cyclic manner, where two hours of spraying is followed by twenty two hours of damp heat storage at 35°C, repeated for three continuous cycles. Once the test is completed and the equipment has recovered, the final readings are compared with the initial readings.',
    },
  ],
  faqTitle: 'FAQs',
  faqs: [
    {
      q: 'Why do I need Salt Fog Testing for my product?',
      a: 'If the product contains metallic components or even those components which readily react with atmospheric moisture, then in order to check its compatibility during the storage or service period, salt fog test is the most convenient and accurate measure.',
    },
    {
      q: 'Which is the most efficient laboratory to provide salt fog testing services based on international standards?',
      a: 'In 2026, working with the latest technical assistance, years of excellence in testing and calibration, ITC India is undoubtedly the perfect choice to get hassle-free services.',
    },
    {
      q: 'How does one standard differ from another in case of Salt Spray Testing?',
      a: 'Two separate standards in terms of salt spray test differ in terms of solution’s concentration and constitution, method of spraying and post-spray treatment. One can get a comparative analysis of multiple testing standards in our laboratory.',
    },
    {
      q: 'What can be the time duration for the tests to be conducted?',
      a: 'There is no fixed duration commonly accepted by all standards. Varying from 16 hours to 28 days with part-wise testing and certain procedures between the tests can extend the time duration.',
    },
    {
      q: 'How many standards are provided by ITC India Laboratory?',
      a: `We provide around 10+ testing standards for salt fog testing. Also, there are multiple other things around the same test. So, to get the best service and technical support, feel comfortable to contact us @${company.phoneDisplay}`,
    },
  ],
  whatsappHref: `https://wa.me/${company.whatsapp}`,
}

/** Lab-facing detail pages for the two PDFs supplied with the brief (original summaries). */
export type SaltStandardDetail = {
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

export const saltStandardDetails: SaltStandardDetail[] = [
  {
    slug: 'iec-60068-2-11',
    code: 'IEC 60068-2-11',
    title: 'Salt mist (Test Ka)',
    method: 'Continuous salt mist',
    editionNote: 'Environmental testing — Tests — Test Ka: Salt mist',
    lede:
      'Salt mist programmes for electrical and electronic products that must show corrosion resistance in a controlled NaCl atmosphere. ITC India runs chamber exposures aligned to your referred severity and duration.',
    whoFor:
      'Industrial and commercial equipment with metallic parts or coatings that may see humid, salt-influenced storage or service conditions.',
    whatWeCover: [
      'Chamber cleanliness, ventilation and temperature set-points for Test Ka style mist',
      'NaCl solution preparation to the concentration and pH required by the specification',
      'Specimen placement and orientation so condensate drip risk is controlled',
      'Continuous mist duration agreed from the product drawing and standard',
      'Post-exposure recovery / cleaning steps where the method requires them',
      'Visual and functional compare against the pre-test baseline',
    ],
    labFlow: [
      'Confirm purpose, severity and duration from the referred IEC clause and product docs.',
      'Clean and condition the specimen; photograph and record initial state.',
      'Load the chamber, verify spray and temperature, then start the mist run.',
      'Hold exposure for the agreed period with monitoring of chamber conditions.',
      'Remove, treat as specified, and inspect coatings, metals and function.',
      'Issue the report with conditions, observations and pass / fail against acceptance criteria.',
    ],
    outcomes: [
      'Evidence of coating / metal behaviour under salt mist',
      'Documented chamber conditions and exposure time for compliance files',
      'Clear notes on corrosion, blistering or functional change where observed',
    ],
  },
  {
    slug: 'astm-b117',
    code: 'ASTM B117',
    title: 'Operating salt spray (fog) apparatus',
    method: 'Continuous salt spray fog',
    editionNote: 'Standard Practice for Operating Salt Spray (Fog) Apparatus',
    lede:
      'ASTM B117 practice covers how salt spray apparatus is operated for comparative corrosion evaluation of coatings and metallic finishes. ITC India applies the practice parameters your programme calls for — typically continuous 5% NaCl fog with specimen-dependent duration.',
    whoFor:
      'Automotive electrical parts, coated metals and protective finishes that need a widely recognised salt spray exposure for quality and durability evidence.',
    whatWeCover: [
      'Apparatus operation consistent with B117 practice (collection rates, temperature, solution)',
      '5% w/w NaCl fog generation and specimen racking / angling',
      'Continuous spray duration taken from your product or customer specification',
      'Interim observation when the programme requires mid-test checks',
      'Post-test examination of finish, substrate and functional interfaces',
      'Traceable reporting of apparatus conditions and results',
    ],
    labFlow: [
      'Agree the exposure hours and acceptance criteria with your quality team.',
      'Prepare solution and verify chamber readiness before loading samples.',
      'Expose specimens under continuous fog for the specified period.',
      'Perform any mid-test inspections called out in the work order.',
      'Unload, clean or rinse as directed, and score visual / functional outcomes.',
      'Deliver the test report with apparatus parameters and observations.',
    ],
    outcomes: [
      'Comparative corrosion performance under B117-style fog',
      'Record of fog conditions suitable for supplier and OEM review',
      'Actionable coating or design feedback before field exposure',
    ],
  },
]

export function getSaltStandardDetail(slug: string) {
  return saltStandardDetails.find((item) => item.slug === slug)
}
