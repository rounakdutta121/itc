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

/** Main page copy — exact wording from the Drop Testing document. */
export const dropPage = {
  intro: [
    'Drop testing is a common constituent of several internationally recognised environmental testing standards. Its presence is important because it examines the impact-resistance caliber of the equipment under test. This is done by monitoring the response of the equipment in terms of functional and structural parameters when exposed to replicated rough handling situations.',
    'During the transportation or in service period, the devices often face situations of improper handling due to which the situation of falling or being dropped on the surface is quite common. These cases directly impact the functionality of the device and thus, being compatible to some extent is important. Drop test exactly does this work for the devices which are majorly electric or electronic.',
    'And acknowledging the need of a proper testing laboratory to help you with the drop test service, ITC India is here.',
    'ITC India is a veteran laboratory for testing and calibration services providing a large variety of national and global testing standards. We have efficiently been giving experts backed testing facilities for multiple equipment along with pre-testing guidelines and post-test feedback support.',
  ],
  cta: 'Book a call now!',
  whyTitle: 'How does Drop Test play an important role in Environment Testing?',
  why: [
    'It is quite certain for any electrical or electronic device to be handled roughly or in an improper manner. These things result in wear and tear of the instrument and sometimes dropping the instrument from a small height. In many cases, these jerks get potent enough to cause functional and structural alteration in the instrument causing malfunctioning.',
    'To avoid these impacts to a certain extent, the instrument needs to get tested prior service to highlight any scope of improvement. Drop test’s core method is to drop the specimen from a chosen height (as referred standard says) with a proper orientation and then observe the things properly.',
  ],
  typesTitle: 'When does an equipment fail the test?',
  typesIntro:
    'Each referred standard provides clauses and specifications that the tested specimen shall meet to be within the safety limit. An equipment shall be considered as failure after test when:',
  typesCards: [
    'The cracks and breaks are exposed so that the bare parts can be touched during hazardous voltage and operating conditions.',
    'An accessible part loses contact with the earthing terminal losing',
    'Any present insulation gets damaged reducing the spacing and affecting the electric strength of the specimen.',
    'The cords and moving parts get compromised.',
  ],
  afterTypes:
    'If none of the above observations is witnessed, the equipment shall be considered as qualified in the drop test.',
  howTitle: 'How is drop testing conducted?',
  howIntro:
    'We need to be aware that for a single device, each standard provides distinct procedures for drop test conducting. Below mentioned steps form a general outline to understand foundation steps in the testing of a chosen specimen.',
  howSteps: [
    'The test begins by deriving its purpose from the referred standard noting the equipment’s ability to survive the shock impacts which it will undergo. The empirical parameters related to the test like drop height, orientation and number of trails are noted from the standard.',
    'Then comes the pre-test examination part where the equipment is examined from visual and functional (mechanical and electrical) perspective and initial readings are noted. Further, the specimen in unpacked condition with switches off and wires in normal positioning is taken to the testing zone.',
    'The testing zone consists of a large hard steel plate fixed over a solid concrete block. The prepared specimen is now loaded above the surface with a specific orientation and its lowest point at the height chosen for the particular trial.',
    'The trial then begins and the specimen is released to fall under gravity with a minute disturbance during the release. This dropping step is repeated for a number of times with variation in dropping height and orientation.',
    'After the test concludes, the impact on the specimen is noted with post test visual and functional examination. The collected inputs are finally submitted for the report generation.',
  ],
  howClose:
    'These steps with standard-wise variation completes the drop testing procedure for any specified equipment.',
  standardsTitle: 'Popular Standards:',
  standardsIntro:
    'The internationally recognised drop test standards vary in their target sample, testing procedure and set-up. Some testing standards with their key features are listed below:',
  popularStandards: [
    {
      label: 'IEC 60950-1 (4.2.6) / IS 13252 (Part-1)',
      href: '/drop-testing/iec-60950-1',
    },
    {
      label: 'JSS 55555 (Test Number 13)',
      href: '/jss-55555',
    },
    { label: 'QM-333 10', href: '/drop-testing/qm-333' },
    { label: 'IEC 60068-2-31', href: '/drop-testing/iec-60068-2-31' },
  ],
  standardsMore: 'And more…',
  distinctionsTitle: 'Distinctions:',
  distinctionsIntro:
    'The internationally recognised drop test standards vary in their target sample, testing procedure and set-up. Some testing standards with their key features are listed below:',
  distinctions: [
    {
      title: 'IEC 60950-1 (4.2.6) / IS 13252 (Part-1):',
      href: '/drop-testing/iec-60950-1',
      text: 'International Electrotechnical Commission 60950 prescribes the safety standards for the information technology equipment and telecommunication devices. This standard is also referred to by the Indian Standard 13252 (Part-1) for the purpose of drop testing. The test subjects the specimen under free falling condition for three trials on a hard surface replicating the most adverse environment conditions. Testing height mentioned ranges from 750mm to 1000 mm with a variation of 10mm and post test, the compliance is tallied with clauses 2.1.1, 2.6.1, 2.10, 3.2.6 and 4.4.1.',
    },
    {
      title: 'JSS 55555 (Test Number 13)',
      href: '/jss-55555',
      text: 'JSS 55555 provides Environment Testing standards for electric and electronic equipment used for defense related purposes. Its test number 13 mentions procedures related to drop testing to check equipment’s durability against shocks when dropped or handled roughly. The specimen in unpacked and switched off condition is allowed to fall freely on a hard and properly bolted surface. The height, orientation and number of trials depends upon the specification with Test Condition A-25mm, B-50mm, C-100mm, D-250mm, E-500mm, F-1000mm. Finally, the specimen is checked after all tests are conducted on visual, mechanical and electrical parameters. The applicability specifies that the test can be omitted in case the equipment is not likely to be dropped.',
    },
    {
      title: 'QM-333 10',
      href: '/drop-testing/qm-333',
      text: 'QM-333 is the Telecommunication Engineering Centre (TEC) standard for the environmental testing of radio transmission equipment used in Indian telecom networks. Its Test Number 10 covers drop testing, to check the equipment’s ability to withstand shocks when it is dropped or roughly handled during use. The specimen in unpacked and switched off condition is lifted on one edge to 45° or 100 mm, whichever comes first, and allowed to drop back freely onto a hard steel platform, for a total of four drops. Finally, the specimen is checked on visual, electrical and mechanical parameters, and the results are compared with the initial ones.',
    },
    {
      title: 'IEC 60068-2-31',
      href: '/drop-testing/iec-60068-2-31',
      text: 'IEC 60068-2 is the standard for environment testing for electronic and electronic components. Out of 80+ published test standards, IEC 60068-2-31 talks about shock test or drop test simulating adverse situations while handling. The standard offers dropping, toppling and free fall procedures with height ranging from 25mm to 1500mm based on the specimen’s size and dimensions. The procedure mentions all three orientations with falling dimensions as face, edge and corners with one drop per each individually. Concluding the tests, the report is generated taking visual, electrical and mechanical changes into account as required by the criteria prescribed in the relevant specification.',
    },
  ],
  faqTitle: 'FAQs:',
  faqs: [
    {
      q: 'How is drop testing a suitable method of environment testing?',
      a: 'Drop Testing prepares an environment simulating the real world mishandling and falling conditions putting stress upon the specimen to check the durability and impact against shocks received against free falling collisions.',
    },
    {
      q: 'Why is ITC India the best testing laboratory for getting Drop Testing done?',
      a: 'ITC India Laboratory has been serving excellence for the past (X) years. We are accredited by the National Accreditation Board of Testing and Calibration Laboratories (NABL) with a scope of 2700+ tests and calibration support. Our team of experts provide empirical analysis of tests with pre-test assistance and efficient testing support. Book an Appointment now!',
    },
    {
      q: 'How does height variations make standards work differently?',
      a: 'Variation in height decides the impact of force on the tested specimen, where the height is decided by the mass, utility and functionality of the specimen. That is why certain environment testing standards mention the clause for applicability.',
    },
    {
      q: 'I have my electronic product and I don’t know which test is most suitable, what shall I do?',
      a: `If you are not aware about the testing standards which your product needs, don' t worry. Contact our experts @${company.phoneDisplay} and get guidance from the experts now.`,
    },
    {
      q: 'How many total standards of Drop Testing are provided by ITC India Laboratory?',
      a: `We as an efficient laboratory provide a large variety of drop testing standards with around 10+ methods of tests that incorporate drop testing. To avail the service, Contact us at @${company.email}.`,
    },
  ],
  whatsappHref: `https://wa.me/${company.whatsapp}`,
}
