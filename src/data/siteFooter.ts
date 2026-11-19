export const siteFooter = {
  about: [
  "Thank you for visiting our website and browsing our services.",
  "If you have any query regarding testing and Certification. Kindly send us your testing requirements with the product technical details to submit you our testing charges."
],
  inquiry: {
    title: "Inquiry for Testing & Certification",
    fields: ["Name","Email","Phone/Mobile","City","Message"],
  },
  subscribe: {
    title: "Subscribe",
    placeholder: "Email Address",
  },
  contact: {
    title: "Contact Us",
    company: 'ITC India Pvt Ltd.',
    address: 'Plot No. 146, JLPL Industrial Area, Sector 82, Mohali, Punjab,160062',
    phoneDisplay: '09316473033',
    phoneHref: 'tel:+919316473033',
    email: 'info@itcindia.org',
  },
  footerMenu: [
  {
    "label": "Home",
    "href": "/"
  },
  {
    "label": "About Us",
    "href": "/about-us"
  },
  {
    "label": "Testing Services",
    "href": "/services"
  }
] as { label: string; href: string }[],
} as const
