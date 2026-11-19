import { company } from './content'

export const saltHeroImage = {
  landscape: '/images/salt/hero-slide-1.webp',
  portrait: '/images/salt/hero-slide-1-portrait.webp',
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

export const saltGallery = [
  {
    src: '/images/salt/lab-1.webp',
    title: 'Salt fog chamber cutaway',
    detail:
      'Chamber schematic showing specimen placement, spray paths and sealed envelope used for continuous or cyclic salt mist.',
  },
  {
    src: '/images/salt/lab-2.webp',
    title: 'Solution & timing controls',
    detail:
      'Programme cues for spray duration, dwell and chemistry checks that differ across ASTM, IEC, ISO and TEC methods.',
  },
  {
    src: '/images/salt/lab-3.webp',
    title: 'Fog generation circuit',
    detail:
      'Tank, pump and nozzle path that produces the fine salt mist collected and verified during a run.',
  },
  {
    src: '/images/salt/lab-4.webp',
    title: 'Cyclic exposure timeline',
    detail:
      'Example multi-cycle fog-and-storage sequence (spray then damp-heat hold) used in JSS and QM-333 style programmes.',
  },
  {
    src: '/images/salt/lab-5.webp',
    title: 'Benchtop chamber with DUT',
    detail:
      'Compact chamber load-out with electronics under mist — orientation set so condensate cannot drip onto critical faces.',
  },
  {
    src: '/images/salt/lab-6.webp',
    title: 'Solution collection check',
    detail:
      'Collection-rate and chemistry verification supporting apparatus practice such as ASTM B117 fog operation.',
  },
  {
    src: '/images/salt/lab-7.webp',
    title: 'Salt solution preparation',
    detail:
      'Glassware and reagents for preparing NaCl or multi-salt blends to the concentration and pH required by the standard.',
  },
  {
    src: '/images/salt/lab-8.webp',
    title: 'Open-lid chamber inspection',
    detail:
      'Mid- or post-test access to inspect coatings and metals after fog exposure before final scoring.',
  },
  {
    src: '/images/salt/lab-9.webp',
    title: 'Full-size chamber spray bay',
    detail:
      'Larger fog enclosure with racked coupons or products under active spray for longer industrial exposures.',
  },
  {
    src: '/images/salt/lab-10.webp',
    title: 'Chamber rack & nozzle detail',
    detail:
      'Internal shelving and nozzle layout used to keep spray uniform and avoid wall-drip contamination of the specimen.',
  },
]

export const saltStandards = [
  {
    slug: 'jss-55555-9',
    code: 'JSS 55555 · Test 9',
    title: 'Military salt fog',
    href: '/salt-testing/jss-55555-9',
    summary:
      'Defense environmental salt fog for electronic and electrical equipment — cyclic spray with post-spray storage, comparing initial and final condition.',
  },
  {
    slug: 'iec-60068-2-11',
    code: 'IEC 60068-2-11',
    title: 'Salt mist Test Ka',
    href: '/salt-testing/iec-60068-2-11',
    summary:
      'International environmental salt mist method for electrical and electronic products — typically a moderated warm chamber with continuous NaCl mist and specimen-dependent duration.',
  },
  {
    slug: 'astm-b117',
    code: 'ASTM B117',
    title: 'Salt spray (fog) apparatus',
    href: '/salt-testing/astm-b117',
    summary:
      'Long-established practice for operating salt spray apparatus — continuous 5% NaCl fog widely used for coatings, metallic finishes and automotive electrical corrosion programmes.',
  },
  {
    slug: 'iso-9227',
    code: 'ISO 9227',
    title: 'NSS / AASS / CASS spray',
    href: '/salt-testing/iso-9227',
    summary:
      'Salt spray testing with three solution families (NSS, AASS, CASS), continuous spray, interim inspection and chamber corrosivity checks against reference panels.',
  },
  {
    slug: 'qm-333-9',
    code: 'QM-333 · Test 9',
    title: 'TEC salt corrosion fog',
    href: '/salt-testing/qm-333-9',
    summary:
      'TEC radio transmission salt corrosion — multi-salt seawater-type cyclic fog (2 h spray + 22 h damp heat at 35°C × 3 cycles) with recovery and compare.',
  },
  {
    slug: 'iec-60571',
    code: 'IEC 60571 · 12.2.11',
    title: 'Railway electronic salt mist',
    href: '/salt-testing/iec-60571',
    summary:
      'Salt mist coverage within IEC 60571 environmental requirements for electronic equipment used on rolling stock.',
  },
]

export const saltTypes = [
  {
    title: 'Chamber temperature',
    aka: 'Thermal set-point',
    text: 'Salt fog chambers run at temperatures defined by the referred standard — for example moderated warm conditions around 35°C for many commercial mist methods.',
  },
  {
    title: 'Solution chemistry',
    aka: 'pH · concentration · salts',
    text: 'NaCl mass fraction, pH and multi-salt blends (including NSS, AASS, CASS or seawater-type mixes) change corrosivity and must match the governing specification.',
  },
  {
    title: 'Spray method & duration',
    aka: 'Continuous or cyclic',
    text: 'Programmes may use continuous fog or cyclic spray-plus-storage sequences. Duration is specimen- and standard-dependent — commonly from tens of hours to multi-week exposures.',
  },
]

export const saltProcess = [
  'Select and prepare the specimen — clean, unpacked and free of moisture before exposure.',
  'Prepare the salt solution using the recommended salt(s) in the specified proportion and pH.',
  'Set up a clean, ventilated salt fog chamber at the required temperature so condensate on walls and ceiling cannot drip onto the specimen. Place and angle the equipment as specified.',
  'Run the spray or cyclic fog programme for the specified duration.',
  'Remove the specimen, apply any post-exposure treatment required by the specification, then examine visually and/or functionally against the baseline.',
]

export const saltFaqs = [
  {
    q: 'Why do I need salt fog testing for my product?',
    a: 'If the product has metallic parts or coatings that can react with atmospheric moisture and salt, salt fog testing is a practical way to check storage and service durability before market release.',
  },
  {
    q: 'Which laboratory should I choose for salt spray testing?',
    a: 'ITC India combines calibrated chamber infrastructure, NABL-accredited methods and experienced technical staff for commercial, telecom, railway and defense salt fog programmes.',
  },
  {
    q: 'How does one salt spray standard differ from another?',
    a: 'Standards differ in solution concentration and composition, spray method (continuous vs cyclic), temperature, duration and post-spray treatment. We can help compare programmes for your product.',
  },
  {
    q: 'What time durations are typical?',
    a: 'There is no single universal duration. Depending on the standard and specimen, exposures can range from about 16 hours to multi-week programmes with interim inspections.',
  },
  {
    q: 'How many salt fog standards does ITC India cover?',
    a: `We cover around 10+ salt fog / mist related methods, plus related environmental clauses. Call ${company.phoneDisplay} to map the right programme.`,
  },
]

export const saltIntro = {
  eyebrow: 'Environmental / IP · Salt fog',
  title: 'Salt spray testing',
  lede: 'Prove coating and metal durability in salt-laden atmospheres — continuous mist and cyclic fog programmes reported against JSS, IEC, ASTM, ISO and TEC methods.',
  body: [
    'Salt fog testing — also called salt mist or salt spray testing — examines how metallic parts and protective coatings resist corrosion. The specimen is exposed to a controlled moist salt atmosphere for a defined period, then assessed visually and functionally.',
    'Methods appear as standalone programmes or as sub-tests inside broader environmental standards. ITC India runs calibrated chamber work with pre-test guidance and clear reporting so you can judge storage and service survival.',
  ],
  why: 'Salt fog creates a replicated corrosive environment and records how coatings and alloys respond over time. The chamber is vented and set to the referred method; salt solution is sprayed to form mist while the specimen sits for the specified duration — proving protective-layer strength before real service or storage.',
}

export const saltCompare = [
  {
    code: 'JSS 55555 · 9',
    method: 'Cyclic salt fog',
    sector: 'Military electronics',
    focus: 'Spray cycles plus post-spray storage; initial vs final compare.',
  },
  {
    code: 'IEC 60068-2-11',
    method: 'Continuous salt mist (Ka)',
    sector: 'Industrial / commercial',
    focus: 'Warm chamber (~35°C) with NaCl mist; duration by specimen.',
  },
  {
    code: 'ASTM B117',
    method: 'Continuous 5% NaCl fog',
    sector: 'Coatings / automotive electrical',
    focus: 'Apparatus practice for metallic finishes and protective measures.',
  },
  {
    code: 'ISO 9227',
    method: 'NSS / AASS / CASS',
    sector: 'Metallic & coated specimens',
    focus: 'Three solution types, continuous spray, corrosivity checks.',
  },
  {
    code: 'QM-333 · 9',
    method: 'Cyclic multi-salt fog',
    sector: 'TEC radio transmission',
    focus: '2 h spray + 22 h damp heat at 35°C × 3 cycles.',
  },
  {
    code: 'IEC 60571',
    method: 'Salt mist clause',
    sector: 'Railway electronics',
    focus: 'Rolling-stock electronic equipment environmental salt mist.',
  },
]

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
