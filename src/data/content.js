export const profile = {
  name: 'Jeffrey Chisambi',
  role: 'Software engineer',
  title: 'CEO, Magengrim',
  email: 'jeffchisambi@gmail.com',
  phone: '0990 342 842',
  location: 'Mzuzu, Northern Region',
  country: 'Malawi',
  linkedin: 'https://www.linkedin.com/',
  thelmer: 'https://JeffChisambi.github.io/Thelmer',
}

export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Track record', href: '#track-record' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export const hero = {
  // Three lines of near-equal width — the block is set in Impact at display
  // size, so uneven line lengths read as a ragged edge rather than a statement.
  lines: ['Built once.', 'Built right.', 'Built to last.'],
  ctaPrimary: { label: 'Start a project', href: '#contact' },
  ctaSecondary: { label: 'See selected projects', href: '#projects' },
  imageAlt: 'Jeffrey Chisambi, software engineer and CEO of Magengrim',
}

export const stats = [
  { value: 5, suffix: '+', label: 'Years shipping\nproduction software' },
  { value: 3, suffix: '', label: 'Companies built\nand led product for' },
  { value: 2026, suffix: '', label: 'Founded Magengrim\nMzuzu → global', raw: true },
  { value: 'B.Sc.', suffix: '', label: 'Computer Engineering\nUniv. of Livingstonia', raw: true },
]

export const process = {
  eyebrow: 'Process',
  headline: ['How I turn a brief', 'into a system'],
  steps: [
    {
      n: '01',
      title: 'Discovery & scoping',
      body: 'I map the real problem before writing a line: users, constraints, data, and the one metric that decides whether this build was worth it.',
    },
    {
      n: '02',
      title: 'Architecture & algorithms',
      body: 'Data model, service boundaries, complexity budget. Decisions written down so the system stays explainable a year from now.',
    },
    {
      n: '03',
      title: 'Interface design',
      body: 'UI/UX built as a component system — states, empty cases and error paths designed, not discovered in production.',
    },
    {
      n: '04',
      title: 'Build & hardening',
      body: 'Weekly shippable increments, code review discipline, and security treated as a requirement rather than a later audit.',
    },
    {
      n: '05',
      title: 'Handover & care',
      body: 'Documentation, monitoring and a team that can carry it forward. I mentor rather than leave dependencies behind.',
    },
  ],
  footnote: 'Available for engagements from Malawi, working with teams across time zones.',
  footnoteCta: { label: 'Book an intro call', href: '#contact' },
}

export const about = {
  eyebrow: 'About',
  headline: ['Built in Malawi.', 'Held to a global', 'standard.'],
  paragraphs: [
    'I spent five years watching the gap between hasty builds and real engineering. In 2026 I founded Magengrim to close it — a studio devoted to precision, security and elegance, and to developers who value doing it right over doing it fast.',
    'Before that I spent years designing interfaces and shipping web platforms for other people’s companies. Every system I own is reviewed against international benchmarks — geography is not an excuse.',
  ],
  based: 'Mzuzu, Malawi',
  links: [
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Thelmer', href: profile.thelmer },
  ],
  capabilities: [
    'Software project management',
    'Full-stack development',
    'Algorithm analysis',
    'UI/UX engineering',
    'Systems architecture',
    'Team mentorship',
  ],
}

export const projects = {
  eyebrow: 'Selected work',
  headline: ['Things I have', 'actually built'],
  kicker:
    'Products and client sites — commerce, education, hospitality and the web work that pays for the rest.',
  items: [
    {
      id: 'kwathuchat',
      index: '01',
      name: 'KwathuChat',
      kind: 'Commerce super app',
      caption: 'KwathuChat — marketplace & wallet',
      image: 'kwathuchat',
      imageAlt: 'The KwathuChat home screen — search, news, marketplace, jobs and chats',
      body: 'A mobile marketplace for Malawi where one account covers buying and selling almost anything, booking a ride, finding and paying rent, settling utility bills, and staying in touch with family — the social layer sitting alongside the commerce rather than bolted onto it.',
      tags: ['Marketplace', 'Rides', 'Rent & utilities', 'Social'],
      metrics: [
        { value: '1', label: 'Account across every service' },
        { value: '2', label: 'Dashboards — merchants and agents' },
      ],
      note: {
        label: 'Built for both sides',
        body: 'Businesses run stock and orders from a merchant dashboard; estate agents manage tenants, leases and rent collection from theirs.',
      },
      theme: 'ink',
    },
    {
      id: 'kwathupay',
      /** Hidden from the site — card and ticker mark both. Delete to restore. */
      hidden: true,
      index: '02',
      name: 'KwathuPay',
      kind: 'Payment gateway',
      caption: 'KwathuPay — checkout & settlement',
      /** No product shot yet — the wordmark stands in for one. */
      logo: 'kwathupay',
      body: 'A payment gateway that puts Airtel, TNM and bank card rails behind a single integration, so a Malawian business can take money the way its customers actually hold it without wiring up three providers itself.',
      tags: ['Airtel', 'TNM', 'Card APIs', 'PCI DSS', '3-D Secure'],
      facts: [
        { label: 'Rails', value: 'Mobile money and cards' },
        { label: 'Compliance', value: 'PCI DSS' },
        { label: 'Authentication', value: '3-D Secure' },
      ],
      theme: 'cream',
    },
    {
      id: 'pine',
      /** Hidden from the site — card and ticker mark both. Delete to restore. */
      hidden: true,
      index: '03',
      name: 'Pine',
      kind: 'Brokerage platform',
      caption: 'Pine — portfolio & order flow',
      image: 'pine',
      imageAlt: 'The Pine app home screen — balance, equity trading and debt securities',
      body: 'A brokerage platform connecting investors to brokers on the Malawi Stock Exchange, with card funding built directly into the flow — the aim being that taking a position is no harder than any other online purchase.',
      tags: ['Malawi Stock Exchange', 'Card APIs', 'PCI DSS', '3-D Secure'],
      facts: [
        { label: 'Market', value: 'Malawi Stock Exchange' },
        { label: 'Funding', value: 'Bank card APIs' },
        { label: 'Compliance', value: 'PCI DSS · 3-D Secure' },
      ],
      theme: 'ink',
    },
    {
      id: 'ophunzila',
      index: '04',
      name: 'Ophunzila',
      kind: 'Learning platform',
      caption: 'Ophunzila — landing, dashboard and dark mode',
      /** Three screens — see `projectGalleries.js`. Renders full-width. */
      gallery: 'ophunzila',
      body: 'An online learning platform built around practice rather than playback: virtual labs to work in, AI tutors to ask, and group discussions so students revise together instead of alone.',
      tags: ['Virtual labs', 'AI tutors', 'Group discussions'],
      note: {
        label: 'On the roadmap',
        body: 'A predictive analytics engine that reads past examinations to generate mock questions most likely to appear on the MSCE.',
      },
      theme: 'cream',
    },
    {
      id: 'kwathusite',
      index: '06',
      name: 'KwathuChat',
      kind: 'Product website',
      caption: 'KwathuChat — product site',
      image: 'kwathusite',
      imageLayout: 'wide',
      /** `contain`: show the whole page rather than cropping at the fold. */
      imageFit: 'contain',
      imageAlt: 'The KwathuChat product site — "Everyday life, in one conversation", with App Store and Google Play links',
      body: 'The public face of the KwathuChat app: a marketing site that has to explain a product doing five unrelated things — marketplace, jobs, bills, rides and business tools — without reading like a feature list. The answer was to lead with the one sentence that contains all of them, and let the sections underneath do the detail.',
      tags: ['React', 'Marketing site', 'App Store routing', 'Responsive'],
      facts: [
        { label: 'Scope', value: 'Design and front-end build' },
        { label: 'Audience', value: 'Consumers and businesses' },
        { label: 'Goal', value: 'App installs' },
      ],
      status: 'Under development',
      theme: 'ink',
    },
    {
      id: 'chakudya',
      index: '07',
      name: 'Chakudya',
      kind: 'Restaurant website',
      caption: 'Chakudya — reservations & menu',
      image: 'chakudya',
      imageLayout: 'wide',
      imageAlt: 'The Chakudya restaurant site — "Where Every Meal Tells a Story", with reservation and menu calls to action',
      body: 'A site for a contemporary African restaurant, built so the room sells itself: full-bleed photography of the dining room behind a serif headline, with the two things a hungry visitor actually wants — the menu and a table — never more than one tap away.',
      tags: ['React', 'Reservations', 'Menu & events', 'Gallery'],
      facts: [
        { label: 'Scope', value: 'Design and front-end build' },
        { label: 'Sections', value: 'Menu · Events · Gallery' },
        { label: 'Primary action', value: 'Reserve a table' },
      ],
      link: { label: 'Visit site', href: 'https://chakudya.magengrim.com/' },
      theme: 'cream',
    },
    {
      id: 'kwathuhotel',
      index: '08',
      name: 'Kwathu Hotel',
      kind: 'Hospitality website',
      caption: 'Kwathu Hotel — rooms & booking',
      image: 'kwathuhotel',
      imageLayout: 'wide',
      imageAlt: 'The Kwathu Hotel site — "Welcome Home To Extraordinary Hospitality", with a book-your-stay call to action',
      body: 'A hotel site organised around the booking decision rather than the brochure: rooms and suites, experiences, dining and spa each get their own route, but every screen keeps one gold booking bar in view so a guest can commit from wherever they happen to be reading.',
      tags: ['React', 'Booking flow', 'Rooms & suites', 'Responsive'],
      facts: [
        { label: 'Scope', value: 'Design and front-end build' },
        { label: 'Sections', value: 'Rooms · Dining · Spa' },
        { label: 'Primary action', value: 'Book your stay' },
      ],
      link: { label: 'Visit site', href: 'https://kwathu.magengrim.com/' },
      theme: 'ink',
    },
    {
      id: 'thelmer',
      index: '09',
      name: 'Thelmer',
      kind: 'First portfolio',
      caption: 'Thelmer — where it started',
      image: 'thelmer',
      imageLayout: 'wide',
      imageAlt: 'The Thelmer portfolio site — "Think, build, and ship amazing web experiences"',
      body: 'My first portfolio, published under the name Thelmer and still online. I keep it up rather than quietly retiring it: it is the honest baseline for everything on this page, and the distance between it and the site you are reading is the clearest evidence of the five years in between.',
      tags: ['First build', 'Front-end', 'Still live'],
      facts: [
        { label: 'Role', value: 'Sole designer and engineer' },
        { label: 'Status', value: 'Live and unedited' },
        { label: 'Why it stays', value: 'It shows the starting line' },
      ],
      link: { label: 'Visit site', href: 'https://jeffchisambi.github.io/Thelmer/' },
      theme: 'cream',
    },
    {
      id: 'ctech',
      /** Hidden from the site. Flip to `false` (or delete the line) to show it
       *  again — the card, image and copy are all still here. */
      hidden: true,
      index: '05',
      name: 'Ctech Pitch',
      kind: 'Landing page',
      caption: 'Ctech Systems — landing page',
      image: 'ctech',
      /** A web screenshot, not a device shot — needs a landscape frame. */
      imageLayout: 'wide',
      imageAlt: 'The Ctech Systems landing page — hero, services and client work',
      body: 'A landing page for Ctech Systems, a software company whose pitch is engineering quality rather than price. The brief was to make that claim legible in the first screen — so the site itself had to be the proof, not the copy.',
      tags: ['React', 'Vite', 'Tailwind', 'Motion design'],
      facts: [
        { label: 'Scope', value: 'Design and front-end build' },
        { label: 'Stack', value: 'React · Vite · Tailwind' },
        { label: 'Focus', value: 'Motion and performance' },
      ],
      theme: 'ink',
    },
  ],
}


export const trackRecord = {
  eyebrow: 'Track record',
  // Two entries now — the studio and the sandbox. "Five years of foundations"
  // described a longer list that no longer appears here.
  headline: ['The studio', 'and the sandbox'],
  roles: [
    {
      period: '2026 — Present · Founder',
      org: 'Magengrim',
      role: 'Chief Executive Officer. Architectural integrity of every system we ship, plus the standard the team is measured against.',
      did: 'Shipping client web platforms end to end — design through deployment — while scaling operations from Malawi to a global client base and mentoring engineers in craftsmanship over speed.',
      result: 'A studio built on precision, security and elegance — engineering that exceeds international benchmarks.',
      caption: 'Magengrim screen',
    },
    {
      period: 'Ongoing · Personal',
      org: 'Thelmer',
      role: 'Sole engineer and designer. Where I test ideas before they reach client work.',
      did: 'Built and published the project end to end — JeffChisambi.github.io/Thelmer',
      result: 'A live sandbox for interface and algorithm experiments, kept public on purpose.',
      caption: 'Thelmer screenshot',
    },
  ],
}

export const credentials = {
  eyebrow: 'Credentials',
  intro:
    'Formal computer engineering training, then five years applying it to real products under real constraints.',
  degree: {
    title: 'B.Sc. Computer Engineering',
    school: 'University of Livingstonia, Malawi',
  },
  skills: {
    label: 'Top skills',
    title: 'Project management · Development · Algorithms',
    body: 'Endorsed focus areas across my engineering record',
  },
}

export const faq = {
  eyebrow: 'Ask directly',
  headline: ['Everything you', 'need to know'],
  items: [
    {
      q: 'How do you scope a project?',
      a: 'A short discovery pass produces a written scope: outcome, architecture sketch, milestones and a fixed price or rate band. You approve it before any code exists.',
    },
    {
      q: 'Do you work with teams outside Malawi?',
      a: 'Yes. Magengrim was founded to prove world-class technology has no geographic boundary — I work remotely with overlap hours agreed up front.',
    },
    {
      q: 'Design, engineering, or both?',
      a: 'Both. I came up through UI/UX and web development, so interface decisions and implementation happen in the same head — fewer handoff losses.',
    },
    {
      q: 'How do you handle security?',
      a: 'As a requirement, not an audit at the end: threat assumptions written into the scope, least-privilege data access, and review before every release.',
    },
    {
      q: 'What happens after launch?',
      a: 'Documentation, monitoring and a handover session. Ongoing care is optional and monthly — never a lock-in.',
    },
  ],
}

export const contact = {
  eyebrow: 'Contact',
  headline: ['Start a', 'project'],
  body: 'Tell me the outcome you need and the constraints around it. I reply within two working days with a scope or an honest no.',
  question: 'What are you building, and what is in the way?',
}

export const footerTag = 'Built in Malawi, for the world'
