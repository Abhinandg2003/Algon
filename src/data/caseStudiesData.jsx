/* ─────────────────────────────────────────────────────────────────────────────
   CASE STUDIES DATASET
   Each entry: id, title, tagline, category, year, client, services[],
   duration, overview, challenge, solution, results[], gallery[], testimonial,
   accent color, tags[], heroImage, thumbnail, stats[]
──────────────────────────────────────────────────────────────────────────── */

export const CASE_STUDIES = [


    {
  id: "mindful-rejuvenation",
  href:"https://www.mindfulrejuvenation.in/",
  title: "Mindful Rejuvenation",
  tagline: "A modern digital system designed for seamless psychiatric care and patient management.",
  commonImg:"/images/clients/gallery/hms/common.webp",
  category: "Healthcare & Hospital Management",
  year: "2026",
  client: "Mindful Rejuvenation",
  services: [
    "Hospital Management System",
    "Appointment & Patient Management",
    "Website Design & Development",
    "Admin Dashboard",
    "Modules Development",
    "OP Management system",
    "Software design and optimisation"
  ],
  duration: "3 months",
  accent: "#298dff",
  tags: ["Healthcare", "HMS", "Digital"],

  pillars: [
    { num: "01", title: "Digital Foundation", text: "Established a modern digital identity tailored for a psychiatric and mental healthcare practice." },
    { num: "02", title: "Hospital Management", text: "Built a streamlined HMS for appointments, patient records, schedules, and internal workflows." },
    { num: "03", title: "Patient Experience", text: "Designed a calm, accessible website focused on trust, clarity, and easy appointment booking." },
    { num: "04", title: "Operational Efficiency", text: "Implemented systems that simplified administration, patient coordination, and daily clinic operations." },
  ],

  statpoints: [
    "No structured patient management system",
    "Manual appointment workflows",
    "Over 50 modules",
    "No centralized operational dashboard"
  ],

  stepsData : [
    {
      phase: "Phase 01",
      title: "Brand & Digital Setup",
      desc: "Created a clean healthcare-focused digital identity with a calming visual direction.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke={accent} strokeWidth="0.8" />
          <path d="M24 16V32M16 24H32" stroke={accent} strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      phase: "Phase 02",
      title: "HMS Development",
      desc: "Developed patient management, appointment scheduling, and administrative workflow systems.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="10" y="10" width="28" height="28" rx="3" stroke={accent} strokeWidth="0.8" />
          <path d="M16 20H32M16 26H28" stroke={accent} strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      phase: "Phase 03",
      title: "Website Experience",
      desc: "Designed an intuitive website experience optimized for patient trust and accessibility.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="24" rx="4" stroke={accent} strokeWidth="0.8" />
          <circle cx="18" cy="20" r="2" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 04",
      title: "Optimisation & Launch",
      desc: "Integrated operational tools, SEO setup, and digital visibility systems for long-term growth.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke={accent} strokeWidth="0.8" />
          <path d="M24 12L28 24L24 28L20 24Z" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
  ],

  thumbnail: "/images/clients/gallery/hms/thumbnail.webp",
  heroImage: "/images/clients/gallery/hms/hero.webp",
  mockup:"/images/clients/gallery/hms/mockup.webp",

  overview:
  "Mindful Rejuvenation required a modern healthcare management ecosystem that streamlined psychiatric care operations while building a professional and trustworthy digital presence.",

  challenge:
  "The clinic relied heavily on manual coordination for appointments, patient records, and operational management, with limited digital infrastructure and online visibility.",

  solution:
  "We developed a complete HMS solution with appointment management, patient workflows, website presence, administrative systems, and digital optimisation tools tailored for psychiatric healthcare.",

  results: [
    { metric: "Patient Management", before: "Manual", after: "Centralized", delta: "Digitized" },
    { metric: "Appointments", before: "Offline", after: "Streamlined", delta: "Optimized" },
    { metric: "Pharmacy management", before: "Minimal", after: "Professional", delta: "Established" },
  ],

  stats: [
    { value: "100", suffix: "%", label: "Workflow digitized" },
    { value: "3", suffix: "Months", label: "Delivery" },
    { value: "50", suffix: "+", label: "Modules" },
    { value: "24", suffix: "/7", label: "Appointment accessibility" },
  ],

  gallery: [
    "/images/clients/gallery/hms/1.webp",
    "/images/clients/gallery/hms/2.webp",
    "/images/clients/gallery/hms/3.webp",
    "/images/clients/gallery/hms/4.webp",
    "/images/clients/gallery/hms/5.webp",
    "/images/clients/gallery/hms/6.webp",
    "/images/clients/gallery/hms/7.webp",
    "/images/clients/gallery/hms/8.webp",
    "/images/clients/gallery/hms/9.webp",
    "/images/clients/gallery/hms/10.webp",
    "/images/clients/gallery/hms/11.webp",
  ],

  testimonial: {
    text: "The system transformed the way we manage appointments and patient workflows while giving us a professional digital presence.",
    author: "Management Team",
    role: "Mindful Rejuvenation",
  },
},



{
  id: "thesneek",
  href:"https://www.thesneek.com/",
  title: "TheSneek",
  tagline: "Building a fashion startup with a scalable ecommerce and digital brand experience.",
  commonImg:"/images/clients/gallery/sneek/common.webp",
  category: "Ecommerce & Shopify",
  year: "2026",
  client: "TheSneek",
  services: [
    "Shopify Store Development",
    "Brand Identity",
    "Product Presentation",
    "Social Media Setup",
    "Performance Optimisation",
    "SEO & Ecommerce Strategy"
  ],
  duration: "7 days",
  accent: "#298dff",
  tags: ["Shopify", "Fashion", "Ecommerce"],

  pillars: [
    { num: "01", title: "Brand Identity", text: "Created a bold and modern visual identity tailored for a youth-focused fashion startup." },
    { num: "02", title: "Shopify Experience", text: "Built a responsive Shopify storefront optimized for conversions and smooth customer journeys." },
    { num: "03", title: "Product Presentation", text: "Designed structured collections, product layouts, and visual storytelling for stronger engagement." },
    { num: "04", title: "Growth Readiness", text: "Implemented SEO, analytics, and scalable ecommerce systems for future expansion." },
  ],

  statpoints: [
    "No ecommerce infrastructure",
    "No digital storefront",
    "No customer acquisition setup",
    "No structured brand identity"
  ],

  stepsData : [
    {
      phase: "Phase 01",
      title: "Brand Creation",
      desc: "Developed the visual identity, typography, and overall aesthetic direction for the brand.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="14" stroke={accent} strokeWidth="0.8" />
          <circle cx="24" cy="24" r="4" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 02",
      title: "Shopify Development",
      desc: "Built a modern Shopify storefront with responsive layouts and conversion-focused product pages.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="10" y="12" width="28" height="24" rx="3" stroke={accent} strokeWidth="0.8" />
          <path d="M16 18H32M16 24H26" stroke={accent} strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      phase: "Phase 03",
      title: "Product Experience",
      desc: "Structured collections, product visuals, and content layouts to enhance customer engagement.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M12 32L24 12L36 32Z" stroke={accent} strokeWidth="0.8" />
          <circle cx="24" cy="24" r="2" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 04",
      title: "Launch & Growth",
      desc: "Integrated analytics, SEO foundations, and scalable systems for future marketing campaigns.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke={accent} strokeWidth="0.8" />
          <path d="M24 14V24L30 30" stroke={accent} strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
  ],

  thumbnail: "/images/clients/gallery/sneek/thumbnail.webp",
  heroImage: "/images/clients/gallery/sneek/hero.webp",
  mockup:"/images/clients/gallery/sneek/mockup.webp",

  overview:
  "TheSneek approached us as an early-stage fashion startup seeking a modern ecommerce identity and scalable Shopify experience tailored for a younger digital-first audience.",

  challenge:
  "The brand had no ecommerce infrastructure, no online storefront, and no structured customer acquisition or branding system in place.",

  solution:
  "We designed and developed a complete Shopify ecosystem including branding, storefront design, product presentation systems, analytics, SEO, and growth-focused ecommerce optimisation.",

  results: [
    { metric: "Storefront", before: "None", after: "Live", delta: "Launched" },
    { metric: "Brand Identity", before: "Undefined", after: "Established", delta: "Complete" },
    { metric: "Sales Infrastructure", before: "0", after: "Operational", delta: "Ready to scale" },
  ],

  stats: [
    { value: "100", suffix: "%", label: "Ecommerce launch completed" },
    { value: "4", suffix: "Days", label: "Delivery" },
    { value: "1", suffix: "", label: "Shopify storefront built" },
    { value: "24", suffix: "/7", label: "Online store availability" },
  ],

  gallery: [
    "/images/clients/gallery/sneek/1.webp",
    "/images/clients/gallery/sneek/2.webp",
    "/images/clients/gallery/sneek/3.webp",
    "/images/clients/gallery/sneek/4.webp",
    "/images/clients/gallery/sneek/5.webp",
    "/images/clients/gallery/sneek/6.webp",
  ],

  testimonial: {
    text: "Algon helped us transform our idea into a complete ecommerce brand with a strong digital identity and scalable Shopify experience.",
    author: "Founding Team",
    role: "TheSneek",
  },
},


  {
    id: "visat",
    href:"https://visat.in/",
    title: "Visat",
    tagline: "A modern digital platform with immersive experience and intelligent interaction.",
    commonImg:"/images/clients/gallery/visat/common.webp",
    category: "Website & Interactive Platform",
    year: "2026",
    client: "Visat",
    services: [
  "Website Development",
  "Responsive Design",
  "SEO Optimisation",
  "3D Experience Integration",
  "AI Agent Integration"
],
    duration: "16 weeks",
    accent: "#298dff",
    tags: ["SaaS", "FinTech", "Product"],

    pillars: [
  { num: "01", title: "Platform Experience", text: "Built a fully responsive website with detailed pages covering all departments and services." },
  { num: "02", title: "Immersive View", text: "Integrated a 360° college view experience to enhance user exploration." },
  { num: "03", title: "AI Interaction", text: "Developed custom AI agents representing teachers from each department to assist students." },
  { num: "04", title: "Search Visibility", text: "Implemented SEO strategies to improve discoverability and reach." },
],

statpoints: [
  "No detailed digital platform",
  "Limited student interaction",
  "Low search visibility"
],



stepsData: [
  {
    phase: "Phase 01",
    title: "Behaviour Audit",
    desc: "Used usage data and interviews to uncover friction causing churn.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 02",
    title: "UX Redesign",
    desc: "Rebuilt core flows into intuitive, faster completion journeys.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 03",
    title: "Systemisation",
    desc: "Created reusable components and scalable product foundations.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 24H36" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 04",
    title: "Growth Impact",
    desc: "Measured churn reduction, completion lift, and lower support burden.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><polyline points="12,30 20,22 28,24 36,14" stroke={accent} strokeWidth="0.8"/></svg>,
  },
],


    thumbnail: "/images/clients/gallery/visat/thumbnail.webp",
    heroImage: "/images/clients/gallery/visat/hero.webp",
    mockup:"/images/clients/gallery/visat/mockup.webp",
   overview:
  "Visat required a modern digital platform to represent their institution online. We built a fully responsive website with detailed pages, immersive 360° views, and AI-powered agents to enhance student interaction.",
    challenge:
  "The platform lacked a detailed digital presence, had limited engagement features for students, and needed better search visibility.",
   solution:
  "We developed a fully responsive website with detailed content pages, integrated a 360° experience, implemented SEO, and introduced custom AI agents representing faculty to assist students.",
    results: [
  { metric: "User Experience", before: "Basic", after: "Interactive", delta: "Enhanced" },
  { metric: "Student Engagement", before: "Low", after: "AI assisted", delta: "Improved" },
  { metric: "Visibility", before: "Low", after: "Optimised", delta: "SEO enabled" },
],
   stats: [
  { value: "360", suffix: "°", label: "Campus view" },
  { value: "16", suffix: "wk", label: "Delivery" },
  { value: "1", suffix: "", label: "AI system" },
  { value: "100", suffix: "%", label: "Responsive" },
],
    gallery: [
      "/images/clients/gallery/visat/1.webp",
      "/images/clients/gallery/visat/2.webp",
      "/images/clients/gallery/visat/3.webp",
      "/images/clients/gallery/visat/4.webp",
      "/images/clients/gallery/visat/5.webp",
      "/images/clients/gallery/visat/6.webp",
      "/images/clients/gallery/visat/7.webp",
      "/images/clients/gallery/visat/8.webp",
      "/images/clients/gallery/visat/9.webp",

    ],
   testimonial: {
  text: "The platform completely changed how students interact with us online. The AI agents and 360 view made a huge impact.",
  author: "Raju Kurian",
  role: "Founder, Visat",
},
  },





 {
  id: "corewood",
  title: "Corewood",
  href:"https://www.corewood.in/",
  tagline: "From zero presence to a complete digital brand ecosystem.",
  commonImg:"/images/clients/gallery/corewood/common.webp",
  category: "Branding & Digital Ecosystem",
  year: "2026",
  client: "Corewood",
  services: [
  "Brand Identity",
  "Website Design & Development",
  "Social Media Management",
  "SEO & Google Business",
  "Presentation & Brand Video",
  "YouTube Setup"
],
  duration: "3 days",
  accent: "#298dff",
  tags: ["Branding", "Web", "Growth"],

  pillars: [
  { num: "01", title: "Brand Foundation", text: "Built Corewood’s identity from scratch with logo, visual language, tone, and premium brand positioning." },
  { num: "02", title: "Website Presence", text: "Designed and launched a mobile-optimised website with clear messaging and strong conversion-focused CTAs." },
  { num: "03", title: "Content & Social", text: "Created social media presence with reels, creatives, storytelling, and a structured weekly posting strategy." },
  { num: "04", title: "Growth Setup", text: "Implemented SEO, Google Business Profile, YouTube setup, and a lead generation system for long-term visibility." },
],

  statpoints: [
  "No brand identity",
  "No website or digital presence",
  "No content or audience base",
  "No lead generation system"
],

  stepsData : [
    {
      phase: "Phase 01",
      title: "Branding",
      desc: "Created logo, color system, and tone of voice aligned with a premium modern furniture brand.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="1" y="1" width="46" height="46" rx="3" stroke={accent} strokeWidth="0.6" strokeDasharray="3 4" />
          <circle cx="24" cy="24" r="8" stroke={accent} strokeWidth="0.8" />
          <circle cx="24" cy="24" r="2" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 02",
      title: "Website Launch",
      desc: "Designed and developed a mobile-optimised website with strong CTAs and analytics integration.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M8 24 L24 8 L40 24 L24 40 Z" stroke={accent} strokeWidth="0.6" fill="none" />
          <path d="M16 24 L24 16 L32 24 L24 32 Z" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="24" cy="24" r="2" fill={accent} opacity="0.8" />
        </svg>
      ),
    },
    {
      phase: "Phase 03",
      title: "Content & Social",
      desc: "Produced reels, creatives, and brand storytelling content with a consistent posting strategy.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <polyline points="4,32 14,20 22,28 32,14 44,22" stroke={accent} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="44" cy="22" r="3" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 04",
      title: "Growth & Optimisation",
      desc: "Set up SEO, Google Business Profile, YouTube channel, and structured content plan for long-term growth.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke={accent} strokeWidth="0.6" />
          <path d="M24 10 L28 20 L24 24 L20 20 Z" fill={accent} opacity="0.7" />
          <circle cx="24" cy="34" r="2" fill={accent} opacity="0.4" />
        </svg>
      ),
    },
  ],

  thumbnail: "/images/clients/gallery/corewood/thumbnail.webp",
  heroImage: "/images/clients/gallery/corewood/hero.webp",
  mockup:"/images/clients/gallery/corewood/mockup.webp",

  overview:
  "Corewood approached us with zero digital presence. We built a complete brand ecosystem from the ground up — brand identity, website, content systems, and visibility channels — transforming them into a modern, discoverable furniture brand.",


  challenge:
  "Corewood had no brand identity, no website, no digital content, and no structured lead generation system. Despite quality craftsmanship, the brand was almost invisible online.",

  solution:
  "We created a complete digital brand ecosystem including identity design, website launch, social media setup, content creation, SEO, Google Business optimisation, presentation assets, and YouTube channel setup.",

  results: [
  { metric: "Brand Identity", before: "None", after: "Established", delta: "Full launch" },
  { metric: "Digital Presence", before: "0", after: "Multi-platform", delta: "Fully active" },
  { metric: "Lead System", before: "None", after: "Structured", delta: "Operational" },
],

stats: [
  { value: "100", suffix: "%", label: "Brand ecosystem built" },
  { value: "3", suffix: "Days", label: "Delivery" },
  { value: "5", suffix: "+", label: "Ad Campaign" },
  { value: "3", suffix: "+", label: "Social Media Platforms Managed" },
],

  gallery: [
    "/images/clients/gallery/corewood/1.webp",
    "/images/clients/gallery/corewood/2.webp",
    "/images/clients/gallery/corewood/3.webp",
    "/images/clients/gallery/corewood/4.webp",
    "/images/clients/gallery/corewood/5.webp",
    "/images/clients/gallery/corewood/6.webp",
  ],

 testimonial: {
  text: "Algon helped us go from zero presence to a complete digital brand. Today our online identity finally reflects the quality of our work.",
  author: "Mohammmed Kunji",
  role: "Co-Founder, Corewood",
},

},

  {
    id: "qot-interiors",
    href:"https://qotinteriors.com/",
    title: "QOT Interiors",
    tagline: "A structured mix of ads, content, and branding that generated quality leads.",
    commonImg:"/images/clients/gallery/qot/common.webp",
    category: "Digital Marketing & Lead Generation",
    year: "2025",
    client: "QOT Interiors",
    services: [
  "Meta Ads",
  "Content Creation",
  "Social Media Management",
  "Website Optimisation",
  "Basic SEO",
  "Brand Positioning"
],
    duration: "8 weeks",
    accent: "#298dff",
    tags: ["Web", "3D", "Luxury"],

   pillars: [
  { num: "01", title: "Lead Generation", text: "Built targeted Meta Ads campaigns focused on generating high-quality leads from the Kerala market." },
  { num: "02", title: "Content Engine", text: "Created reels, before/after creatives, and engagement-focused content with consistent weekly posting." },
  { num: "03", title: "Website Optimisation", text: "Improved website UI/UX, added strong CTAs, and optimised the site for better conversion." },
  { num: "04", title: "Tracking & Growth", text: "Implemented reporting, CPL tracking, CTR analysis, and monthly performance reviews." },
],

statpoints: [
  "Low online visibility",
  "Inconsistent social media",
  "Poor lead quality",
  "No clear strategy or tracking"
],


stepsData: [
  {
    phase: "Phase 01",
    title: "Discovery",
    desc: "Studied luxury buyer behaviour, competitor positioning, and content gaps across the existing website.",
    icon: (accent) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke={accent} strokeWidth="0.8"/>
        <circle cx="24" cy="24" r="4" fill={accent} opacity="0.7"/>
      </svg>
    ),
  },
  {
    phase: "Phase 02",
    title: "Visual System",
    desc: "Built a premium visual language with whitespace, cinematic imagery, and elegant motion cues.",
    icon: (accent) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" stroke={accent} strokeWidth="0.8"/>
        <path d="M8 32L18 22L26 28L40 14" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    phase: "Phase 03",
    title: "Development",
    desc: "Engineered a lightning-fast responsive portfolio with filters and rich media support.",
    icon: (accent) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M10 24H38M24 10V38" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    phase: "Phase 04",
    title: "Growth",
    desc: "Optimised forms, calls-to-action, and data tracking for consistent lead generation.",
    icon: (accent) => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <polyline points="10,30 18,22 26,26 38,14" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
],

    thumbnail: "/images/clients/gallery/qot/thumbnail.webp",
    heroImage: "/images/clients/gallery/qot/hero.webp",
    mockup:"/images/clients/gallery/qot/mockup.webp",
    overview:
  "QOT Interiors needed stronger digital visibility and better lead quality. We built a structured digital growth system combining Meta Ads, content creation, social media consistency, website optimisation, and brand positioning.",

  challenge:
  "The brand had weak online visibility, inconsistent social media activity, poor lead quality, and no clear strategy for tracking performance or improving conversion.",
 
      solution:
  "We implemented a 360° digital marketing system including Meta Ads, content production, social media management, website optimisation, basic SEO, brand positioning, and monthly performance reporting.",

 results: [
  { metric: "Lead Quality", before: "Low", after: "Improved", delta: "Higher intent" },
  { metric: "Cost Per Lead", before: "High", after: "Reduced", delta: "Optimised" },
  { metric: "Brand Presence", before: "Inconsistent", after: "Strong", delta: "Structured growth" },
],

   stats: [
  { value: "5", suffix: "-7", label: "Posts per week" },
  { value: "2", suffix: "wk", label: "Delivery" },
  { value: "1000", suffix: "+", label: "Leads Generated" },
  { value: "100", suffix: "%", label: "Tracking enabled" },
],
    gallery: [
      "/images/clients/gallery/qot/1.webp",
      "/images/clients/gallery/qot/5.webp",
      "/images/clients/gallery/qot/3.webp",
      "/images/clients/gallery/qot/4.webp",
      "/images/clients/gallery/qot/2.webp",
      "/images/clients/gallery/qot/6.webp",
      "/images/clients/gallery/qot/7.webp",
      "/images/clients/gallery/qot/8.webp",
      "/images/clients/gallery/qot/9.webp",
      "/images/clients/gallery/qot/10.webp",
      "/images/clients/gallery/qot/11.webp",
    ],
    testimonial: {
  text: "The structured mix of ads, content, and brand consistency helped us generate better quality leads and build a much stronger digital presence.",
  author: "Anoop John",
  role: "Founder, QOT Interiors",
},
  },

  {
    id: "desire-study-abroad",
    href:"https://desirestudyabroad.com/",
    title: "Desire Study Abroad",
tagline: "Fast launch, stronger visibility, and smarter student engagement.",
    commonImg:"/images/clients/gallery/desire/common.webp",
   category: "Website & Brand Visibility",
    year: "2024",
    client: "Desire Study Abroad",
    services: [
  "Website Design & Development",
  "AI Chatbot Integration",
  "SEO Optimisation",
  "Brand Identity",
  "Visibility Strategy"
],
    duration: "4 days",
    accent: "#298dff",
    tags: ["SaaS", "EdTech", "Branding"],

    pillars: [
  { num: "01", title: "Fast Launch", text: "Designed and launched the full website within four days without compromising usability or quality." },
  { num: "02", title: "AI Engagement", text: "Integrated an AI chatbot to improve response speed and guide students instantly." },
  { num: "03", title: "SEO Foundation", text: "Implemented on-page SEO optimisations for better discoverability and search visibility." },
  { num: "04", title: "Brand Visibility", text: "Built a stronger digital identity that improved trust and online presence." },
],

statpoints: [
  "No strong online visibility",
  "Weak brand identity",
  "No instant student support"
],


stepsData: [
  {
    phase: "Phase 01",
    title: "Audit",
    desc: "Mapped every touchpoint from inquiry to enrolment to identify leak points.",
    icon: (accent)=>(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="10" width="28" height="28" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    phase: "Phase 02",
    title: "Product Design",
    desc: "Created dashboards, trackers, and student-friendly flows for clarity and speed.",
    icon: (accent)=>(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    phase: "Phase 03",
    title: "Automation",
    desc: "Integrated reminders, follow-up systems, and workload balancing tools.",
    icon: (accent)=>(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M12 24H36" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    phase: "Phase 04",
    title: "Launch",
    desc: "Rolled out with training, migration, and live reporting dashboards.",
    icon: (accent)=>(
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <polyline points="12,30 22,20 28,24 36,16" stroke={accent} strokeWidth="0.8"/>
      </svg>
    ),
  },
],


    thumbnail: "/images/clients/gallery/desire/thumbnail.webp",
    heroImage: "/images/clients/gallery/desire/hero.webp",
    mockup:"/images/clients/gallery/desire/mockup.webp",
    overview:
  "Desire Study Abroad needed a fast digital launch with stronger visibility. We built and launched a new website in four days, integrated an AI chatbot, and established a stronger online brand presence.",
    challenge:
  "The brand lacked strong digital visibility, clear positioning, and an effective online system to engage students quickly.",
 solution:
  "We designed and launched a website within four days, integrated an AI chatbot, implemented SEO optimisations, and improved overall brand visibility.",

  results: [
  { metric: "Website Launch", before: "None", after: "Live in 4 days", delta: "Rapid delivery" },
  { metric: "Brand Visibility", before: "Low", after: "Improved", delta: "Stronger presence" },
  { metric: "Student Engagement", before: "Manual", after: "AI assisted", delta: "Instant support" },
],
  stats: [
  { value: "4", suffix: "d", label: "Launch time" },
  { value: "1", suffix: "", label: "AI chatbot" },
  { value: "100", suffix: "%", label: "SEO setup" },
  { value: "1", suffix: "", label: "Brand refresh" },
],

    gallery: [
      "/images/clients/gallery/desire/1.webp",
      "/images/clients/gallery/desire/2.webp",
      "/images/clients/gallery/desire/3.webp",
      "/images/clients/gallery/desire/4.webp",
      "/images/clients/gallery/desire/5.webp",
      "/images/clients/gallery/desire/6.webp",
      "/images/clients/gallery/desire/7.webp",
      "/images/clients/gallery/desire/8.webp",
      "/images/clients/gallery/desire/9.webp",
    ],
    testimonial: {
      text: "Before Algon, I was spending 4 hours a day just managing follow-ups. Now the system does it automatically. Our team is smaller but we're enrolling three times as many students.",
      author: "Swapna ",
      role: "Director, Desire Study Abroad",
    },
  },

  {
    id: "unity-heights",
    href:"https://www.unityheights.org/",
    title: "Unity Heights",
    tagline: "A fast-launch digital portfolio built for visibility and inquiries.",
    commonImg:"/images/clients/gallery/unity/common.webp",
    category: "Portfolio Website & SEO",
    year: "2026",
    client: "Unity Heights",
    services: [
  "Portfolio Website",
  "Responsive Development",
  "Contact Form Integration",
  "SEO Optimisation",
  "Brand Visibility"
],
    duration: "1 week",
    accent: "#298dff",
    tags: ["Real Estate", "Web", "3D"],

   pillars: [
  { num: "01", title: "Portfolio Presence", text: "Built a fully functional portfolio website that clearly showcased the project and brand." },
  { num: "02", title: "Responsive Experience", text: "Designed a smooth, fully responsive experience across desktop, tablet, and mobile." },
  { num: "03", title: "Lead Capture", text: "Integrated contact forms to convert visitors into inquiries." },
  { num: "04", title: "Search Visibility", text: "Implemented SEO optimisations to improve discoverability and online brand presence." },
],


statpoints: [
  "No strong digital presence",
  "No structured online portfolio",
  "Limited visibility"
],
stepsData: [
  {
    phase: "Phase 01",
    title: "Research",
    desc: "Studied buyer objections, project competitors, and purchase triggers.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 02",
    title: "Experience Design",
    desc: "Designed selectors, tours, and booking journeys around buyer confidence.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 03",
    title: "Build",
    desc: "Developed responsive sales infrastructure with real-time availability logic.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 24H36" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 04",
    title: "Go Live",
    desc: "Launched campaigns and connected inquiries directly to sales pipelines.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><polyline points="12,30 20,22 28,24 36,14" stroke={accent} strokeWidth="0.8"/></svg>,
  },
],


    thumbnail: "/images/clients/gallery/unity/thumbnail.webp",
    heroImage: "/images/clients/gallery/unity/hero.webp",
    mockup:"/images/clients/gallery/unity/mockup.webp",
    overview:
  "Unity Heights needed a strong digital portfolio presence quickly. We designed and launched a fully responsive functional website within a week, integrated inquiry forms, and improved search visibility.",
    challenge:
  "The project lacked a polished digital presence, had limited online visibility, and no strong portfolio system to present the brand professionally.",
    solution:
  "We built a fully responsive portfolio website with contact form integration, SEO optimisation, and stronger brand visibility — all delivered within one week.",
    results: [
  { metric: "Website Presence", before: "Minimal", after: "Fully functional", delta: "Launched" },
  { metric: "Lead Capture", before: "None", after: "Integrated", delta: "Active inquiries" },
  { metric: "Brand Visibility", before: "Low", after: "Improved", delta: "SEO enabled" },
],
   stats: [
  { value: "7", suffix: "d", label: "Delivery" },
  { value: "100", suffix: "%", label: "Responsive build" },
  { value: "1", suffix: "", label: "Contact system" },
  { value: "1", suffix: "", label: "SEO foundation" },
],
    gallery: [
      "/images/clients/gallery/unity/1.webp",
      "/images/clients/gallery/unity/2.webp",
      "/images/clients/gallery/unity/3.webp",
      "/images/clients/gallery/unity/4.webp",
      "/images/clients/gallery/unity/5.webp",
      "/images/clients/gallery/unity/6.webp",
      "/images/clients/gallery/unity/7.webp",
      "/images/clients/gallery/unity/8.webp",
      "/images/clients/gallery/unity/9.webp",
      "/images/clients/gallery/unity/10.webp",
    ],
    testimonial: {
      text: "Algon understood real estate. They didn't just build a website — they built a sales tool. Our site visits went from 12 a month to 44 the month after launch.",
      author: "Management team",
      role: "Sales Director, Unity Heights",
    },
  },

  {
    id: "drisya-marble",
    href:"https://drisyamarble.com/",
    title: "Drisya Marble",
    tagline: "A scalable product catalogue and brand presence built for growth.",
    commonImg:"/images/clients/gallery/drisya/common.webp",
   category: "Website & Brand Visibility",
    year: "2026",
    client: "Drisya Marble",
    services: [
  "Website Development",
  "CMS Integration",
  "Product Catalogue System",
  "SEO Setup",
  "Brand Identity"
],
    duration: "4 weeks",
    accent: "#298dff",
    tags: ["B2B", "Branding", "Catalogue"],


pillars: [
  { num: "01", title: "Digital Catalogue", text: "Built a structured product catalogue with detailed pages for 100+ products." },
  { num: "02", title: "CMS System", text: "Enabled easy editing for products, blogs, and career listings through a custom CMS." },
  { num: "03", title: "SEO Foundation", text: "Implemented analytics, GTM, domain setup, and on-page SEO for visibility." },
  { num: "04", title: "Brand Presence", text: "Created a stronger brand identity and improved online visibility." },
],

statpoints: [
  "No structured product catalogue",
  "No CMS editing system",
  "Limited online visibility"
],


stepsData: [
  {
    phase: "Phase 01",
    title: "Inventory Mapping",
    desc: "Structured 2,000+ SKUs into clean searchable taxonomy.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 02",
    title: "Brand Refresh",
    desc: "Modernised identity and visual tone for premium positioning.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 03",
    title: "Portal Build",
    desc: "Developed filters, calculators, and request workflows.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><path d="M12 24H36" stroke={accent} strokeWidth="0.8"/></svg>,
  },
  {
    phase: "Phase 04",
    title: "Scale",
    desc: "Prepared the system for domestic and export lead capture.",
    icon: (accent)=><svg width="48" height="48" viewBox="0 0 48 48"><polyline points="12,30 20,22 28,24 36,14" stroke={accent} strokeWidth="0.8"/></svg>,
  },
],


    thumbnail: "/images/clients/gallery/drisya/thumbnail.webp",
    heroImage: "/images/clients/gallery/drisya/hero.webp",
    mockup:"/images/clients/gallery/drisya/mockup.webp",
   overview:
  "Drisya Marble needed a scalable digital platform to showcase products and manage content efficiently. We built a full website with CMS support, enabling easy updates for products, blogs, and careers while improving brand visibility.",
    challenge:
  "The brand lacked a structured product showcase, had no CMS for managing content, and had limited online visibility.",
    solution:
  "We developed a website with CMS capabilities for managing 100+ products, blogs, and career listings, along with SEO setup including analytics, GTM, and domain configuration.",
   results: [
  { metric: "Product Showcase", before: "Unstructured", after: "100+ products", delta: "Organised system" },
  { metric: "Content Management", before: "Manual", after: "CMS enabled", delta: "Editable" },
  { metric: "Brand Visibility", before: "Low", after: "Improved", delta: "SEO enabled" },
],

   stats: [
  { value: "100", suffix: "+", label: "Products listed" },
  { value: "4", suffix: "wk", label: "Delivery" },
  { value: "1", suffix: "", label: "CMS system" },
  { value: "100", suffix: "%", label: "SEO setup" },
],
    gallery: [
      "/images/clients/gallery/drisya/1.webp",
      "/images/clients/gallery/drisya/2.webp",
      "/images/clients/gallery/drisya/3.webp",
      "/images/clients/gallery/drisya/4.webp",
      "/images/clients/gallery/drisya/5.webp",
      "/images/clients/gallery/drisya/6.webp",
      "/images/clients/gallery/drisya/7.webp",
      "/images/clients/gallery/drisya/8.webp",
      "/images/clients/gallery/drisya/9.webp",
      "/images/clients/gallery/drisya/10.webp",
      "/images/clients/gallery/drisya/11.webp",
      "/images/clients/gallery/drisya/12.webp",
    ],
   testimonial: {
  text: "We can now manage our entire product catalogue and content easily. The new website made a huge difference to our visibility.",
  author: "Mr. Babu Peter",
  role: "Founder, Drisya Marble",
},

  },







];

export default CASE_STUDIES;
