/* ==================================================================
 *  SINGLE SOURCE OF TRUTH
 *  All site copy lives here. No component hardcodes text.
 *  Sourced from Amit_Das_Frontend_Developer_Resume.pdf
 * ================================================================== */

export interface Profile {
  name: string
  initials: string
  role: string
  location: string
  timezone: string
  email: string
  phone: string
  website: string
  resumeUrl: string
  availability: string
  available: boolean
  tagline: string
  intro: string
  summary: string
  bio: string[]
}

export interface SocialLink {
  label: string
  handle: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'globe'
}

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  note: string
}

export interface SkillGroup {
  title: string
  blurb: string
  items: string[]
}

export interface Role {
  company: string
  title: string
  period: string
  location: string
  summary: string
  points: string[]
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  period: string
  client: string
  summary: string
  problem: string
  points: string[]
  impact: string
  metrics: ProjectMetric[]
  stack: string[]
  featured: boolean
}

export interface Education {
  qualification: string
  institution: string
  period: string
  result: string
}

export interface NavItem {
  label: string
  href: string
}

export interface TerminalLine {
  type: 'cmd' | 'out' | 'ok'
  text: string
}

/* ------------------------------------------------------------------ */

export const profile: Profile = {
  name: 'Amit Das',
  initials: 'AD',
  role: 'Frontend Developer',
  location: 'Kolkata, West Bengal, India',
  timezone: 'Asia/Kolkata',
  email: 'iamitcuit20@gmail.com',
  phone: '+91-7679480267',
  website: 'https://amit-das.vercel.app',
  resumeUrl: '/Amit_Das_Frontend_Developer_Resume.pdf',
  availability: 'Open to frontend & full-stack roles',
  available: true,

  tagline: 'Real-time interfaces for data-heavy systems.',

  intro:
    'I build the browser layer for systems that never stop sending data — air quality sensors, vehicle fleets, procurement workflows. Four years of making live, dense, high-volume data feel calm on screen.',

  summary:
    'Frontend Developer with 4+ years of experience building real-time, data-intensive web and mobile applications across environmental monitoring, civic infrastructure and enterprise procurement. Specialized in React, Next.js and TypeScript, with production depth in WebSocket data streaming, virtualized data grids, workflow-driven interfaces and frontend performance optimization.',

  bio: [
    'I work at the point where live hardware telemetry meets the browser. Air quality analyzers reporting every fifteen minutes, collection vehicles pushing position every two seconds, procurement workflows that route through four levels of approval — my job is to make all of that legible on a screen someone stares at all day.',
    'That means the unglamorous parts are the ones that matter. Virtualizing a grid so 10,000 rows scroll at 60fps instead of stalling at 1,500. Deduplicating requests so an all-day dashboard stops hammering the API. Getting a first paint under two seconds on a page that used to take six.',
    'Most of my four years has been at Distronix, owning the UI layer end to end — architecture, component systems, performance budgets and delivery across web and React Native. Lately I have been extending into full-stack ownership with Node.js and Express, mostly so the API contract stops being someone else’s problem.',
  ],
}

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    handle: 'github.com/amitdas',
    href: 'https://github.com/',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'in/amitdasit',
    href: 'https://linkedin.com/in/amitdasit',
    icon: 'linkedin',
  },
  {
    label: 'Website',
    handle: 'amit-das.vercel.app',
    href: 'https://amit-das.vercel.app',
    icon: 'globe',
  },
  {
    label: 'Email',
    handle: 'iamitcuit20@gmail.com',
    href: 'mailto:iamitcuit20@gmail.com',
    icon: 'mail',
  },
]

/* Every number below is drawn from a specific résumé line. */
export const stats: Stat[] = [
  { value: 4, suffix: '+', label: 'Years shipping', note: 'Since Jul 2022' },
  { value: 10, suffix: 'k+', label: 'Rows at 60fps', note: 'Virtualized grids' },
  { value: 30, suffix: '+', label: 'Components shipped', note: 'Themeable library' },
  { value: 90, suffix: '+', label: 'Lighthouse score', note: 'Up from the 50s' },
]

export const marqueeStack: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Remix',
  'React Native',
  'Node.js',
  'Express',
  'Socket.IO',
  'Redux Toolkit',
  'React Query',
  'Zustand',
  'Tailwind CSS',
  'shadcn/ui',
  'Vite',
  'Docker',
  'Nginx',
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    blurb: 'What I write day to day.',
    items: ['TypeScript', 'JavaScript (ES6+)', 'Java', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    title: 'Frontend',
    blurb: 'Where most of the four years went.',
    items: [
      'React.js',
      'Next.js',
      'Remix',
      'Redux Toolkit',
      'React Query',
      'Zustand',
      'Tailwind CSS',
      'shadcn/ui',
      'Vite',
    ],
  },
  {
    title: 'Mobile',
    blurb: 'Field apps for low-end Android hardware.',
    items: ['React Native', 'Expo', 'NFC integration', 'Offline-first sync', 'Geolocation'],
  },
  {
    title: 'Backend & APIs',
    blurb: 'Extending into full-stack ownership.',
    items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets (Socket.IO)', 'JWT auth'],
  },
  {
    title: 'Data & visualization',
    blurb: 'The part the whole job rests on.',
    items: [
      'Real-time streaming',
      'Interactive charting',
      'Interactive mapping',
      'Virtualized data grids',
      'Role-based access control',
      'CSV / Excel export pipelines',
    ],
  },
  {
    title: 'Performance',
    blurb: 'Measured, not asserted.',
    items: [
      'Code splitting',
      'Lazy loading',
      'Memoization',
      'List virtualization',
      'Caching & request dedup',
      'SSR / ISR',
      'Core Web Vitals',
    ],
  },
  {
    title: 'Tools & practices',
    blurb: 'How the work actually ships.',
    items: [
      'Docker',
      'Git & GitHub',
      'Linux',
      'Nginx',
      'Vercel',
      'CI/CD',
      'Jira',
      'Agile / Scrum',
      'Design systems',
      'Code review',
    ],
  },
]

export const experience: Role[] = [
  {
    company: 'Distronix',
    title: 'Software Developer (Frontend)',
    period: 'Jul 2022 — Present',
    location: 'Salt Lake, Kolkata, India',
    summary:
      'Own the UI layer on data-heavy platforms where live hardware telemetry and enterprise workflows meet the browser: architecture, performance, component systems and delivery across web and mobile.',
    points: [
      'Migrated legacy dashboards to a React and TypeScript architecture, reducing initial load time from approximately 6 seconds to under 2 seconds and eliminating full-page refreshes.',
      'Designed and shipped a reusable library of 30+ themeable components adopted across the product suite, reducing new-screen build time from days to hours and standardizing UI patterns between teams.',
      'Applied code splitting, route-level lazy loading and memoization across the core product, raising Lighthouse performance scores from the 50s to 90+.',
      'Built REST API endpoints with Node.js and Express and established shared TypeScript types across services, reducing runtime integration defects and improving API contract reliability.',
      'Containerized the frontend stack with Docker, reducing new-developer environment setup from half a day to a single command.',
      'Delivered SEO-optimized marketing and product sites in Next.js and Remix using SSR and ISR, improving Core Web Vitals and organic search visibility.',
      'Defined frontend conventions for project structure and state management, led code reviews, and collaborated with backend, QA and product teams in an Agile workflow.',
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'caaqms',
    title: 'CAAQMS',
    subtitle: 'Continuous Ambient Air Quality Monitoring System',
    category: 'Environmental monitoring',
    period: '2025 — 2026',
    client: 'Distronix',
    summary:
      'Regulatory-grade environmental monitoring platform for real-time and historical air quality surveillance across 25+ monitoring stations.',
    problem:
      'Analysts were exporting station data and studying it offline, which meant problems surfaced at the end of a reporting cycle rather than as they happened. Tables stalled beyond roughly 1,500 records, so year-scale datasets were effectively unbrowsable.',
    points: [
      'Built a data-dense monitoring dashboard tracking 12 pollutant and meteorological parameters (PM2.5, PM10, SO₂, NO₂, CO, O₃, NH₃, Benzene) on a 15-minute station reporting cadence.',
      'Developed an interactive charting suite (line, bar, scatter) with drill-down from station overview to individual parameter trends, enabling analysts to move from anomaly to root cause in a single view.',
      'Engineered virtualized data grids rendering 10,000+ rows at a sustained 60fps using windowing and memoization, replacing tables that stalled beyond approximately 1,500 records.',
      'Built a historical data module with multi-parameter filtering and date-range selection across a rolling archive of 10M+ records, plus a CSV and Excel export pipeline formatted for statutory pollution control board submissions.',
      'Implemented React Query caching, background refetching and request deduplication for an all-day dashboard, cutting redundant network calls by approximately 60%.',
      'Added an analyzer diagnostic module surfacing instrument health and calibration status.',
    ],
    impact:
      'Replaced end-of-cycle reporting with live cross-station visibility, and made year-scale datasets explorable in the browser rather than exported and analyzed offline.',
    metrics: [
      { value: '25+', label: 'Monitoring stations' },
      { value: '10M+', label: 'Records archived' },
      { value: '10k+ @ 60fps', label: 'Grid rows sustained' },
      { value: '~60%', label: 'Fewer network calls' },
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Redux',
      'React Query',
      'Tailwind CSS',
      'REST APIs',
    ],
    featured: true,
  },
  {
    slug: 'vts',
    title: 'Vehicle Tracking System',
    subtitle: 'Municipal Solid Waste Management',
    category: 'Civic infrastructure',
    period: '2023 — 2025',
    client: 'Distronix',
    summary:
      'Real-time fleet tracking and field-verification platform for municipal solid waste operations, covering 20+ collection vehicles across 12 wards.',
    problem:
      'Collection was tracked on paper. A missed pickup surfaced in end-of-day reporting, transcription errors were routine, and there was no verifiable proof that a bin had actually been serviced.',
    points: [
      'Built a live operations dashboard streaming vehicle location, speed and status at 2–3 second intervals over Socket.IO, handling 50+ concurrent device streams with automatic reconnection.',
      'Developed an interactive map with real-time positioning, route-history playback and status-based colour coding (Active, Idle, Offline) for at-a-glance fleet health.',
      'Implemented an NFC tap-to-verify collection flow processing approximately 500 scans per day, replacing paper logs with timestamped, location-bound proof of service.',
      'Shipped a React Native and Expo application used by 45+ field workers, featuring geotagged photo capture and offline-first sync that reconciles queued scans on reconnect.',
      'Optimized the mobile app for the low-end 2 GB RAM Android devices standard in field deployment.',
    ],
    impact:
      'Reduced missed-pickup detection from end-of-day reporting to under 5 minutes, and eliminated paper-based tracking along with its transcription errors.',
    metrics: [
      { value: '2–3s', label: 'Telemetry interval' },
      { value: '50+', label: 'Concurrent streams' },
      { value: '~500/day', label: 'NFC verifications' },
      { value: '<5 min', label: 'Miss detection' },
    ],
    stack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Socket.IO',
      'React Native',
      'Expo',
      'NFC',
    ],
    featured: true,
  },
  {
    slug: 'procurement',
    title: 'Inventory & Procurement',
    subtitle: 'Purchase-to-stock lifecycle platform',
    category: 'Enterprise workflow',
    period: '2022 — 2024',
    client: 'Distronix',
    summary:
      'Enterprise inventory and procurement platform digitizing the full purchase-to-stock lifecycle for internal stores, finance and operations teams.',
    problem:
      'Procurement lived in spreadsheets and paper. Stores and finance held different views of the same order, and nothing was auditable once a document changed hands.',
    points: [
      'Built end-to-end purchase order workflows covering PO creation, multi-level approval, amendment and revision tracking, and shipment receipt reconciled against ordered quantities.',
      'Developed requisition and indent modules allowing departments to raise material requests routed through configurable approval chains before conversion into purchase orders.',
      'Implemented stock management and stock disposal modules with live inventory levels, goods-receipt reconciliation (ordered, received and pending), and audit-tracked write-offs.',
      'Designed role-based interfaces separating requester, approver, store-keeper and administrator permissions, ensuring each user saw only the actions valid at their stage of the workflow.',
      'Built dense, filterable data tables with server-side pagination, search and status filtering for browsing purchase orders, stock ledgers and transaction history.',
    ],
    impact:
      'Replaced spreadsheet and paper-based procurement tracking with a single auditable system, giving stores and finance a shared, real-time view of order status from requisition through receipt.',
    metrics: [
      { value: '4 roles', label: 'Permission tiers' },
      { value: 'Multi-level', label: 'Approval chains' },
      { value: 'Server-side', label: 'Pagination & search' },
      { value: 'Audit-tracked', label: 'Write-offs' },
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    featured: false,
  },
]

export const education: Education[] = [
  {
    qualification: 'B.Tech, Information Technology',
    institution: 'University of Calcutta',
    period: 'Aug 2018 — Jun 2022',
    result: 'CGPA 8.05 / 10',
  },
  {
    qualification: 'Higher Secondary Certificate, Science',
    institution: 'Jhargram Banitirtha High School',
    period: '2015 — 2017',
    result: '86.4%',
  },
]

export const nav: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  // { label: 'Play', href: '#play' },
  { label: 'Contact', href: '#contact' },
]

export const terminalScript: TerminalLine[] = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'amit das — frontend developer, 4+ yrs, kolkata' },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'real-time streams · virtualized grids · core web vitals' },
  { type: 'cmd', text: 'status --availability' },
  { type: 'ok', text: 'open to frontend & full-stack roles' },
]
