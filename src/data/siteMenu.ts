export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export const siteNav: NavItem[] = [
  {
    "label": "Home",
    "href": "/"
  },
  {
    "label": "About Us",
    "href": "/about-us",
    "children": [
      {
        "label": "Accreditations & Approval",
        "href": "/about-us/accreditations"
      },
      {
        "label": "Tec Fee Schedule",
        "href": "/about-us/tec-fee-schedule"
      },
      {
        "label": "Terms & Conditions",
        "href": "/about-us/terms-conditions"
      }
    ]
  },
  {
    "label": "Products",
    "href": "/products"
  },
  {
    "label": "Testing Services",
    "href": "/services",
    "children": [
      {
        "label": "Electrical",
        "href": "/electrical-testing",
        "children": [
          {
            "label": "Household Appliances",
            "href": "https://www.itcindia.org/home-solutions-for-product-development-service-enhancement-under-iec-60335-standards/",
            "children": [
              {
                "label": "IEC 60335-1 Safety Testing for Household Appliances in India",
                "href": "/iec-60335-1-safety-testing-india"
              },
              {
                "label": "IEC 60335-2-3 Electric Iron Safety Testing in India",
                "href": "/iec-60335-2-3-safety-testing-india"
              },
              {
                "label": "IEC 60335-2-3/IS 302-2-3 ELECTRIC IRON TESTING",
                "href": "https://www.itcindia.org/iec-60335-2-3-is-302-2-3-electric-iron-testing/"
              },
              {
                "label": "IEC 60335-2-5 the safety of electric dishwashers for household",
                "href": "/iec-60335-2-5-the-safety-of-electric-dishwashers-for-household"
              },
              {
                "label": "IEC 60335-2-7 Washing Machine Safety Testing in India",
                "href": "/washing-machine-safety-testing"
              },
              {
                "label": "IEC 60335-2-7 DOMESTIC WASHING MACHINE TESTING",
                "href": "https://www.itcindia.org/iec-60335-2-7-domestic-washing-machine-testing/"
              },
              {
                "label": "IEC 60335-2-8 Electric Shaver Safety Testing in India",
                "href": "/electric-shaver-safety-testing"
              },
              {
                "label": "IEC 60335-2-9 Electrical Cooking Appliances Testing",
                "href": "/iec-60335-2-9-electrical-cooking-appliances-testing"
              },
              {
                "label": "IEC 60335-2-12 Safety Testing for Electric Warming Plates",
                "href": "/iec-60335-2-12-warming-plate-testing-india"
              },
              {
                "label": "IEC 60335-2-14 Electrical Kitchen Machine Safety Testing",
                "href": "/electrical-kitchen-machine-testing"
              },
              {
                "label": "IEC 60335-2-23 Hair Care Appliance Testing India | ITC India",
                "href": "/iec-60335-2-23-testing"
              },
              {
                "label": "IEC 60335-2-24 Requirements for Refrigerators, Freezers & Ice Makers",
                "href": "https://www.itcindia.org/iec-60335-2-24/"
              },
              {
                "label": "IEC 60335-2-24 Testing for Refrigerators in India | ITC India",
                "href": "/iec-60335-2-24-safety-testing-india"
              },
              {
                "label": "IS 7872 Testing-Deep Freezers",
                "href": "/is-7872-testing-deep-freezers"
              },
              {
                "label": "IEC 60335-11 Particular requirements for tumble dryers",
                "href": "/iec-60335-11-particular-requirements-for-tumble-dryers"
              },
              {
                "label": "SAFETY STANDARD AS PER IEC 60335-8",
                "href": "/safety-standard-as-per-iec-60335-8"
              },
              {
                "label": "IEC 60335-2-76 SAFETY OF ELECTRIC FENCE ENERGIZERS TESTING",
                "href": "/iec-60335-2-76-safety-of-electric-fence-energizers-testing"
              },
              {
                "label": "IEC 60335-2-89 COMMERCIAL REFRIGERATING APPLIANCES AND ICE-MAKERS TESTING",
                "href": "/iec-60335-2-89-commercial-refrigerating-appliances-and-ice-makers-testing"
              }
            ]
          },
          {
            "label": "AC DC Rectifier testing",
            "href": "/ac-dc-rectifier-testing"
          },
          {
            "label": "ATEX Testing",
            "href": "/atex-testing-certification"
          },
          {
            "label": "Cable Gland Testing",
            "href": "/cable-gland-testing",
            "children": [
              {
                "label": "Resistance to salt and sulfur dioxide-laden atmospheres as per BS EN 50262.",
                "href": "/resistance-to-salt-and-sulfur-dioxide-laden-atmospheres-as-per-bs-en-50262"
              },
              {
                "label": "IEC 62444 For cable Gland testing",
                "href": "/iec-62444-for-cable-gland-testing"
              }
            ]
          },
          {
            "label": "Cable Tray Testing",
            "href": "/cable-tray-testing-laboratory"
          },
          {
            "label": "Flexible Conduit Testing IEC 61386-23",
            "href": "/conduit-testing-iec-61386-23"
          },
          {
            "label": "ASTM D999 – Vibration testing of shipping containers",
            "href": "/astm-d999-vibration-testing-of-shipping-containers"
          },
          {
            "label": "Earthing Enhancing Testing According to IEC 62561-7:2018",
            "href": "/earthing-enhancing-testing-according-to-iec-62561-72018"
          },
          {
            "label": "Motor torque and speed testing",
            "href": "/motor-torque-and-speed-testing"
          },
          {
            "label": "Endurance Test as per IEC 60947-1",
            "href": "/endurance-test-as-per-iec-60947-1"
          },
          {
            "label": "PIR(passive infrared sensor) Testing",
            "href": "/pirpassive-infrared-sensor-testing"
          },
          {
            "label": "High voltage & short circuit test facility for Mcc and fuse",
            "href": "/high-voltage-short-circuit-test-facility-for-mcc-and-fuse"
          },
          {
            "label": "IEC 62208 testing empty enclosures for low-voltage switchgear and controlgear assemblies",
            "href": "/iec-62208-testing-empty-enclosures-for-low-voltage-switchgear-and-controlgear-assemblies"
          },
          {
            "label": "GRP Electrical Enclosure testing",
            "href": "/grp-electrical-enclosure-testing"
          },
          {
            "label": "Infrared Heater testing",
            "href": "/infrared-heater-testing"
          },
          {
            "label": "G-Mark Certification",
            "href": "https://www.itcindia.org/g-mark-certification/"
          },
          {
            "label": "Machinery Equipment Testing",
            "href": "/machinery-equipment-testing-2"
          },
          {
            "label": "Battery Testing",
            "href": "/battery-testing",
            "children": [
              {
                "label": "Sodium ion cell/battery testing",
                "href": "/sodium-ion-cell-battery-testing"
              },
              {
                "label": "UN 38.3 lithium-ion batteries transpotation testing",
                "href": "/un-38-3-lithium-ion-batteries-transpotation-testing"
              }
            ]
          },
          {
            "label": "Photovoltatc Modules Testing",
            "href": "/photovoltatc-pv-modules-testing"
          },
          {
            "label": "Testing for Lighting products",
            "href": "/electrical-safety-testing-for-lighting-products"
          },
          {
            "label": "Solar Fence Energizer Testing",
            "href": "/solar-fence-energizer-testing"
          },
          {
            "label": "Fire Resistance Testing",
            "href": "#",
            "children": [
              {
                "label": "Flame Testing on Cable: IEC 60332-1-2 & IEC 60332-1-1",
                "href": "/flame-testing-on-cable-iec-60332-1-2-iec-60332-1-1"
              },
              {
                "label": "Flammability Test on Conveyor Belt EN ISO 340",
                "href": "https://www.itcindia.org/flammability-test-on-conveyor-belt-en-iso-340/"
              }
            ]
          }
        ]
      },
      {
        "label": "Electro-Medical",
        "href": "#",
        "children": [
          {
            "label": "IEC 60601-1 Testing for Medical Electrical Equipment",
            "href": "/iec-60601-1-testing"
          },
          {
            "label": "IEC 60601 Testing",
            "href": "/iec-60601-testing"
          },
          {
            "label": "Infrared Optometer Calibration TESTING",
            "href": "/infrared-optometer-calibration-testing"
          },
          {
            "label": "IEC 60601-2-19:2020 Medical electrical equipment Particular requirements for the basic safety and essential performance of infant incubators",
            "href": "/iec-60601-2-192020-medical-electrical-equipment-particular-requirements-for-the-basic-safety-and-essential-performance-of-infant-incubators"
          },
          {
            "label": "IEC 60601-2-21:2020 Medical electrical equipment Particular requirements for the basic safety and essential performance of infant radiant warmers",
            "href": "/iec%e2%80%8260601-2-212020-medical-electrical-equipment-particular-requirements-for-the-basic-safety-and-essential-performance-of-infant-radiant-warmers"
          },
          {
            "label": "IEC 60601-2-27 Particular requirements for the basic safety and essential performance of electro cardiographic monitoring",
            "href": "/iec-60601-2-27-testing"
          },
          {
            "label": "ISO 80601-2-61:2017 Particular requirements for basic safety and essential performance of pulse oximeter equipments",
            "href": "/iso-80601-2-612017-particular-requirements-for-basic-safety-and-essential-performance-of-pulse-oximeter-equipments"
          },
          {
            "label": "Blood Pressure Monitor Testing",
            "href": "/blood-pressure-monitor-testing"
          },
          {
            "label": "Endoscopic Equipment Testing",
            "href": "/endoscopic-equipment-testing"
          },
          {
            "label": "Ear Probe for Audiometry",
            "href": "/ear-probe-for-audiometry"
          },
          {
            "label": "IEC 80601-2-12 Certification for Critical Care Ventilators",
            "href": "/iec-80601-2-12-certification-for-critical-care-ventilators"
          },
          {
            "label": "IEC 60601-2-10 Testing Lab for TENS & EMS | ITC India",
            "href": "/iec-60601-2-10"
          },
          {
            "label": "IEC 80601-2-49 Testing for Multifunction Patient Monitoring Equipment",
            "href": "/iec-80601-2-49-testing"
          },
          {
            "label": "ISO 80601-2-74 Respiratory Humidifier Testing | ITC India",
            "href": "/iec-80601-2-74"
          },
          {
            "label": "IEC 60601-2-2 Testing Services for High-Frequency Surgical Equipment Manufacturers",
            "href": "/iec-60601-2-2-testing-services"
          },
          {
            "label": "IEC 60601-2-20 Testing Lab | Infant Transport Incubators",
            "href": "/iec-60601-2-20-testing"
          },
          {
            "label": "IEC 60601-2-5 Testing for Ultrasonic Physiotherapy Equipment",
            "href": "/iec-60601-2-5-compliance-guide-for-manufacturers-and-regulatory-consultants"
          }
        ]
      },
      {
        "label": "Electronic",
        "href": "/electronic-testing",
        "children": [
          {
            "label": "IEC 62471 Photobiological safety of lamps and lamp systems",
            "href": "/iec-62471-photobiological-safety-of-lamps-and-lamp-systems"
          },
          {
            "label": "EMC/EMI Testing",
            "href": "/emc-emi-testing"
          },
          {
            "label": "Household Equipment Testing",
            "href": "https://www.itcindia.org/household-equipment-testing/"
          },
          {
            "label": "Electromedical Equipment Test",
            "href": "https://www.itcindia.org/electro-medical-equipments-testing/"
          },
          {
            "label": "EN 62304:2006+A1/2015",
            "href": "/en-62304-2006-a1-2015"
          },
          {
            "label": "Road Vertical & Variable Message Traffic signs",
            "href": "https://www.itcindia.org/en-12966-testing/"
          },
          {
            "label": "IT Testing",
            "href": "/it-equipments-testing"
          },
          {
            "label": "Power Supply Equipment Testing",
            "href": "/power-supply-equipment-testing"
          },
          {
            "label": "UPS Testing",
            "href": "/ups-testing"
          },
          {
            "label": "Electronic Push Button Telephone Testing",
            "href": "/electronic-push-button-telephone-testing"
          },
          {
            "label": "Non – Destructive Testing (NDT)",
            "href": "/non-destructive-testing-ndt"
          },
          {
            "label": "Power Inverter Testing",
            "href": "/power-inverter-testing"
          },
          {
            "label": "Antenna and Convertor Testing",
            "href": "/antenna-and-convertor-testing"
          },
          {
            "label": "Laptop and Monitor Testing",
            "href": "/laptop-and-monitor-testing"
          },
          {
            "label": "Audio Video & IT Equipment",
            "href": "#"
          },
          {
            "label": "IEC 62368-1:2023 Testing",
            "href": "/iec-62368-1-2023-testing"
          },
          {
            "label": "ISO 10218 Safety Testing for Industrial Robots & Robot Cells",
            "href": "/iso-10218-robotics-safety-testing"
          }
        ]
      },
      {
        "label": "EMC",
        "href": "/emc-emi-testing",
        "children": [
          {
            "label": "EMC/EMI Testing as per CISPR 11:2019",
            "href": "/industrial-scientific-medical-equipment-emc-emi-testing-as-per-cispr-112019"
          },
          {
            "label": "EMC/EMI Testing as per IEC 61547:2020 & CISPR 15:2018",
            "href": "/lighting-equipment-emc-emi-testing-as-per-iec-615472020-cispr-152018"
          },
          {
            "label": "IEC 60601-1-2 EMC Testing for Medical Electrical Equipment",
            "href": "/iec-60601-1-2-emc-testing"
          },
          {
            "label": "IEC 61000-6-1 EMC Immunity Testing in India",
            "href": "/iec-61000-6-1-emc-testing"
          },
          {
            "label": "IEC 61000-6-3 EMC Emissions Testing for Residential Equipment",
            "href": "/iec-61000-6-3-emc-testing"
          },
          {
            "label": "EN 301 489-1 EMC Testing for Radio Equipment | ITC India",
            "href": "/en-301-489-1-testing"
          },
          {
            "label": "EN 301 489-19 V2.2.1 Testing – EMC for GNSS Receivers",
            "href": "/en-301-489-19-testing"
          },
          {
            "label": "EN 301 489-52 EMC Testing for Cellular & 5G User Equipment",
            "href": "/en-301-489-52-v1-2-1-testing"
          }
        ]
      },
      {
        "label": "Photometry",
        "href": "/photometry-testing",
        "children": [
          {
            "label": "Luminaries/LED Product Testing",
            "href": "/luminaries-led-product-testing"
          },
          {
            "label": "LM-79 Testing Lab in India",
            "href": "/lm-79-testing"
          },
          {
            "label": "LM 80 Testing",
            "href": "/lm-80-testing"
          },
          {
            "label": "Optical And Electrical Measurements of Solid-State Lighting",
            "href": "/optical-and-electrical-measurements-of-solid-state-lighting-as-per-lm79"
          },
          {
            "label": "Comparative Evaluation between LM-79-19 and LM-79-08",
            "href": "/comparative-evaluation-between-ansi-ies-standards-lm-79-19-and-lm-79-08"
          },
          {
            "label": "RDSO Photometry Testing for Railway LED Luminaires",
            "href": "/rdso-photometry-testing-led-luminaries"
          }
        ]
      },
      {
        "label": "Calibration",
        "href": "#",
        "children": [
          {
            "label": "CALIBRATION OF TEMPERATURE SENSOR",
            "href": "/calibration-of-temperature-sensor"
          },
          {
            "label": "Particle Counter Calibration",
            "href": "/particle-counter-calibration"
          },
          {
            "label": "CALIBRATION OF PROFILE PROJECTORS",
            "href": "/calibration-of-profile-projectors"
          },
          {
            "label": "CALIBRATION OF HUMIDITY SENSOR",
            "href": "/calibration-of-humidity-sensor"
          },
          {
            "label": "calibration of humidity chamber",
            "href": "/calibration-of-humidity-chamber"
          },
          {
            "label": "calibration of volumetric glassware",
            "href": "/calibration-of-volumetric-glassware"
          },
          {
            "label": "CALIBRATION OF PRESSURE GAUGE",
            "href": "/calibration-of-pressure-gauge"
          },
          {
            "label": "SMP 10 calibration pyranometer",
            "href": "/smp-10-calibration-pyranometer"
          },
          {
            "label": "Energy meter Calibration testing – NABL",
            "href": "/energy-meter-calibration-testing-nabl"
          },
          {
            "label": "CM4 calibration as per ISO 9060",
            "href": "/cm4-calibration-as-per-iso-9060"
          },
          {
            "label": "Calibration for Impulse Measuring System",
            "href": "/calibration-for-impulse-measuring-system"
          },
          {
            "label": "Calibration of Pyranometer",
            "href": "/calibration-of-pyranometer"
          },
          {
            "label": "Calibration of Surge Generators",
            "href": "/calibration-of-surge-generator"
          },
          {
            "label": "Calibration of Electrical Fast Transients",
            "href": "/calibration-of-electrical-fast-transients"
          },
          {
            "label": "Calibration of Voltage Dips and Short Interruption",
            "href": "/calibration-of-voltage-dips-and-short-interruption"
          }
        ]
      },
      {
        "label": "Environmental/IP",
        "href": "/environmental-testing-services",
        "children": [
          {
            "label": "Biodegradability",
            "href": "/biodegradability"
          },
          {
            "label": "ROHS 3 Testing – NABL Report",
            "href": "/rohs-3-testing-nabl-report"
          },
          {
            "label": "HAST Test (Highly Accelerated Stress Test)",
            "href": "/hast-test-highly-accelerated-stress-test"
          },
          {
            "label": "Biodegradable Standard",
            "href": "/biodegradable-standard"
          },
          {
            "label": "ISO 5412:2022 compostable plastic shopping bags Testing",
            "href": "/iso-54122022-compostable-plastic-shopping-bags-testing"
          },
          {
            "label": "Vibration Testing Lab",
            "href": "/vibration-testing"
          },
          {
            "label": "IEC 60068- Environmental Conditioning",
            "href": "/iec-60068-environmental-conditioning"
          },
          {
            "label": "UL 50E Testing Services for Electrical Enclosures | ITC India",
            "href": "/ul-50e-testing"
          },
          {
            "label": "Solar Radiation Testing as per MIL-STD-810H and IEC 60068",
            "href": "/solar-radiation-testing"
          },
          {
            "label": "IP Testing",
            "href": "/ip-testing-laboratory-india",
            "children": [
              {
                "label": "IP 66-Ingress protection Testing",
                "href": "/ip-66-ingress-protection-testing"
              },
              {
                "label": "IP68 Testing Up to 5 Bar | IEC 60529 Lab | ITC India",
                "href": "/ip-68-upto-5bar-testing"
              },
              {
                "label": "IP41 Protection Rating – Testing Guide",
                "href": "/ip41-protection-rating"
              },
              {
                "label": "IP42 Protection Rating & IEC 60529 Testing | ITC India",
                "href": "/ip42-protection-rating-testing"
              },
              {
                "label": "IP55 Rating Testing Lab in India | IEC 60529 | ITC India",
                "href": "/ip55-protection-rating-testing"
              },
              {
                "label": "IP69K Testing Lab in India | ISO 20653 | ITC India",
                "href": "/ip69k-protection-rating-testing"
              },
              {
                "label": "Rain Test Services in India | Water Ingress Lab | ITC India",
                "href": "/rain-test-services-india"
              },
              {
                "label": "IP56 Testing Lab in India | IEC 60529 | ITC India",
                "href": "/ip56-protection-rating-testing"
              },
              {
                "label": "IEC 60034-5 – Electrical Machines Safety & Protection Standard",
                "href": "/iec-60034-5-electrical-machines"
              },
              {
                "label": "Submerged Motor IP Testing",
                "href": "/submerged-motor-ip-testing"
              },
              {
                "label": "Camera IP Testing",
                "href": "/camera-ip-testing"
              },
              {
                "label": "IP 67 waterproof testing",
                "href": "/ip-67-waterproof-testing"
              }
            ]
          },
          {
            "label": "Salt Spray Testing Lab",
            "href": "/salt-testing"
          },
          {
            "label": "JSS 55555 Testing Laboratory in India | ITC India",
            "href": "/jss-55555"
          },
          {
            "label": "JSS 5855-11 Environmental Testing Services",
            "href": "/vibration-testing/jss-5855-11"
          },
          {
            "label": "JSS 50101 Environmental Testing for Electronic Components",
            "href": "/vibration-testing/jss-50101"
          },
          {
            "label": "JSS 0256-01 Environmental Testing for Missile Systems",
            "href": "/jss-0256-01-testing"
          },
          {
            "label": "ISO 20653 IP Testing for Automotive Electrical Equipment",
            "href": "/iso-20653-ip-testing"
          },
          {
            "label": "IEC 60571 Testing Services for Railway Electronic Equipment in India",
            "href": "/iec-60571-testing-services-india"
          },
          {
            "label": "RDSO TL 0091 Testing for Railway LED Luminaires in India",
            "href": "/vibration-testing/rdso-tl-0091"
          },
          {
            "label": "RDSO Environmental Testing for Railway LED Luminaires",
            "href": "/rdso-environmental-testing-for-led-based-luminaries"
          },
          {
            "label": "MIL-STD-810H Vibration & Shock Testing Laboratory in India",
            "href": "/vibration-testing/mil-std-810h"
          },
          {
            "label": "IEC 61373 Vibration & Shock Testing for Railway Equipment",
            "href": "/vibration-testing/iec-61373"
          },
          {
            "label": "IEC 60068-2-6 Sine Vibration Testing Services in India",
            "href": "/vibration-testing/iec-60068-2-6"
          },
          {
            "label": "Recyclability Test",
            "href": "/recyclability-test"
          },
          {
            "label": "RoHS Testing",
            "href": "/rohs-testing"
          }
        ]
      },
      {
        "label": "Laboratory",
        "href": "/chemical-testing-and-analysis",
        "children": [
          {
            "label": "IEC 61010-1 Safety Testing for Laboratory & Measuring Equipment",
            "href": "/iec-61010-1-testing"
          },
          {
            "label": "IEC 61010-2-010 Testing Laboratory in India | ITC India",
            "href": "/iec-61010-2-010-testing"
          },
          {
            "label": "IEC 61010-2-011 Testing for Laboratory Refrigerating Equipment",
            "href": "/iec-61010-2-011-testing"
          },
          {
            "label": "IEC 61010-2-051 Testing for Laboratory Mixing & Stirring Equipment",
            "href": "/iec-61010-2-051-testing"
          },
          {
            "label": "IEC 61010-2-101 Testing for In Vitro Diagnostic (IVD) Equipment",
            "href": "/iec-61010-2-101-testing-services"
          }
        ]
      },
      {
        "label": "Mechanical/Chemical",
        "href": "/mechanical-testing",
        "children": [
          {
            "label": "PPE",
            "href": "#",
            "children": [
              {
                "label": "N95 / EN 149 Face Mask Testing Lab",
                "href": "/face-mask-testing-lab"
              }
            ]
          },
          {
            "label": "Crash Test as per IEC 61010-1",
            "href": "/crash-test-as-per-iec-61010-1"
          },
          {
            "label": "Geometrical Accuracy Test as per IS 14877",
            "href": "/geometrical-accuracy-test-as-per-is-14877"
          },
          {
            "label": "ISO 13482- SAFETY REQUIREMENT FOR PERSONAL CARE ROBOTS",
            "href": "/iso-13482-safety-requirement-for-personal-care-robots"
          },
          {
            "label": "ISO 31101. Services provided by service robots – Safety management systems requirements",
            "href": "/iso-31101-services-provided-by-service-robots-safety-management-systems-requirements"
          },
          {
            "label": "ISO 10218-1 INDUSTRIAL ROBOTS",
            "href": "/iso-10218-1-industrial-robots"
          }
        ]
      },
      {
        "label": "Packaging",
        "href": "/packaging",
        "children": [
          {
            "label": "ISTA 2A/ 2B/ 2C",
            "href": "/vibration-testing/ista-2a"
          },
          {
            "label": "ISTA 1A/ 1B/ 1C/ 1D TESTING",
            "href": "/vibration-testing/ista-1a"
          }
        ]
      },
      {
        "label": "Information Security",
        "href": "/drone-information-security-testing",
        "children": [
          {
            "label": "Drone Information Security Testing",
            "href": "/drone-information-security-testing"
          },
          {
            "label": "Information Security Division",
            "href": "https://cybersec.itcindia.org/"
          },
          {
            "label": "Inspection",
            "href": "https://inspection.itcindia.org/"
          }
        ]
      },
      {
        "label": "Software",
        "href": "/software-testing",
        "children": [
          {
            "label": "Bluetooth",
            "href": "https://www.itcindia.org/about-us/bluetooth-testing/"
          },
          {
            "label": "IEC 62304 medical device software System Testing",
            "href": "/iec-62304-medical-device-software-system-testing"
          }
        ]
      }
    ]
  },
  {
    "label": "Contact Us",
    "href": "/contact-us",
    "children": [
      {
        "label": "Customer Support",
        "href": "/contact-us/customer-support"
      },
      {
        "label": "Inquiry",
        "href": "/contact-us/inquiry"
      }
    ]
  },
  {
    "label": "Career in ITC",
    "href": "/careers"
  }
]
