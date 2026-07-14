/**
 * ServicesCards.jsx
 *
 * White-background services section.
 * - Two-column staggered card layout (desktop), single column (mobile)
 * - Cards scroll faster than page via GSAP parallax (speed > 1)
 * - PNG/SVG floating elements scroll slower (parallax speed < 1)
 * - Rounded gradient cards — some with CSS conic-gradient rotation animation
 * - Per-card CSS illustration elements (unique per service)
 * - "Exploding lines" SVG animation on 4 cards (lines burst from center)
 *
 * DEPS: gsap (already in project)
 */

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES DATA
──────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1,
    title: "Custom Software\n& Web Development",
    desc: "We build fast, modern web applications and custom software systems tailored to your exact requirements. From single-page apps to complex enterprise platforms — every line of code is deliberate.",
    gradient: "linear-gradient(135deg, #eef2ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
    accentColor: "#555",
    rotate: true,
    rotateFrom: "#eef2ff",
    rotateTo: "#ffdc52",
    explode: true,
    explodeColor: "#d48825",
    col: 0,
    offsetY: 0,
    illustration: "code",
    pic: "/images/stickers/null.png",
    piclow: "/images/stickers/null.webp"
  },
  {
    id: 2,
    title: "SaaS Solutions",
    desc: "We architect, build, and launch SaaS products that grow with your business. Multi-tenancy, billing, onboarding, analytics — we handle the hard infrastructure so you can focus on the product.",
    gradient: "linear-gradient(135deg, #9cffbb 0%, #85ffaf 50%, #63ff9c 100%)",
    accentColor: "#888",
    rotate: false,
    explode: false,
    col: 1,
    offsetY: 80,
    illustration: "saas",
    pic: "/images/stickers/saas.png",
    piclow: "/images/stickers/saas.webp"
  },
  {
    id: 3,
    title: "AI & Automation",
    desc: "From LLM integrations and AI agents to workflow automation and predictive models — we embed intelligence into your product stack in ways that actually move the business forward.",
    gradient: "linear-gradient(135deg, #fdf4ff 0%, #e9d5ff 50%, #d8b4fe 100%)",
    accentColor: "#888",
    rotate: true,
    rotateFrom: "#fdf4ff",
    rotateTo: "#56d5ff",
    explode: true,
    explodeColor: "#06b6d4",
    col: 0,
    offsetY: 60,
    illustration: "ai",
    pic: "/images/stickers/robo.png",
    piclow: "/images/stickers/robo.webp"
  },
  // {
  //   id: 4,
  //   title: "HMS Solutions",
  //   desc: "End-to-end hospital management systems covering patient records, appointments, billing, staff management, and reporting. We build secure, scalable, and user-friendly platforms.",
  //   gradient: "linear-gradient(135deg, #fff7ed 0%, #fdba74 50%, #fb923c 100%)",
  //   accentColor: "#888",
  //   rotate: false,
  //   explode: true,
  //   explodeColor: "#f59e0b",
  //   col: 1,
  //   offsetY: -40,
  //   illustration: "blockchain",
  //   pic: "/images/stickers/null.png",
  //   piclow: "/images/stickers/null.webp"
  // },
  {
    id: 5,
    title: "eCommerce &\nShopify Solutions",
    desc: "High-converting Shopify stores, custom themes, headless commerce, and scalable eCommerce platforms with strong UX and backend systems.",
    gradient: "linear-gradient(135deg, #fff1f2 0%, #fda4af 50%, #fb7185 100%)",
    accentColor: "#888",
    rotate: true,
    rotateFrom: "#fff1f2",
    rotateTo: "#49e581",
    explode: false,
    col: 0,
    offsetY: 120,
    illustration: "ecommerce",
    pic: "/images/stickers/null.png",
    piclow: "/images/stickers/null.webp"
  },
  // {
  //   id: 6,
  //   title: "Marketing &\nGrowth Strategies",
  //   desc: "SEO, performance marketing, content strategy, and brand systems that compound over time. Built on data, designed for humans.",
  //   gradient: "linear-gradient(135deg, #ffe4e6 0%, #fb7185 50%, #f43f5e 100%)",
  //   accentColor: "#db2746",
  //   rotate: false,
  //   explode: false,
  //   col: 1,
  //   offsetY: 40,
  //   illustration: "marketing",
  //   pic: "/images/stickers/seo.png",
  //   piclow: "/images/stickers/seo.webp"
  // },
  // {
  //   id: 7,
  //   title: "AR/VR & Immersive\nExperiences",
  //   desc: "We design and build augmented reality, virtual reality, and mixed reality experiences for web, mobile, and headset.",
  //   gradient: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 50%, #a78bfa 100%)",
  //   accentColor: "#8b5cf6",
  //   rotate: true,
  //   rotateFrom: "#ede9fe",
  //   rotateTo: "#ff97cf",
  //   explode: true,
  //   explodeColor: "#8b5cf6",
  //   col: 0,
  //   offsetY: 20,
  //   illustration: "ar",
  //   pic: "/images/stickers/vr.png",
  //   piclow: "/images/stickers/vr.webp"
  // },
  {
    id: 4,
    title: "Cybersecurity &\nCloud Solutions",
    desc: "Security audits, penetration testing, cloud architecture, and compliance frameworks to protect and scale your infrastructure.",
    gradient: "linear-gradient(135deg, #fee2e2 0%, #f87171 50%, #ef4444 100%)",
    accentColor: "#888",
    rotate: false,
    explode: false,
    col: 1,
    offsetY: 100,
    illustration: "security",
    pic: "/images/stickers/null.png",
    piclow: "/images/stickers/null.webp"
  },
  // {
  //   id: 8,
  //   title: "Blockchain & Web3",
  //   desc: "Smart contracts, dApps, token systems, and NFT platforms built with security-first architecture across modern blockchain ecosystems.",
  //   gradient: "linear-gradient(135deg, #ccfbf1 0%, #5eead4 50%, #2dd4bf 100%)",
  //   accentColor: "#d16226",
  //   rotate: true,
  //   rotateFrom: "#ccfbf1",
  //   rotateTo: "#ff9860",
  //   explode: true,
  //   explodeColor: "#d16226",
  //   col: 1,
  //   offsetY: 60,
  //   illustration: "devops",
  //   pic: "/images/stickers/null.png",
  //   piclow: "/images/stickers/null.webp"
  // },

  {
    id: 6,
    title: "MVP in Production",
    desc: "From idea to live product—efficiently developed, deployed at scale, and optimized for real-world testing and continuous iteration.",
gradient: "linear-gradient(135deg, #fff7ed 0%, #fdba74 50%, #f97316 100%)",
accentColor: "#888",
    rotate: false,
    explode: false,
    col: 1,
    offsetY: 100,
    illustration: "mvp",
    pic: "/images/stickers/null.png",
    piclow: "/images/stickers/null.webp"
  },
];
function RadialBurst({ color = "#ffffff" }) {
  const lines = Array.from({ length: 12 }, (_, i) => i * 30)

  return (
    <svg
      viewBox="0 0 120 120"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <clipPath id="clipCircle">
          <circle cx="60" cy="60" r="42" />
        </clipPath>
      </defs>

      <g clipPath="url(#clipCircle)">
        {lines.map((angle, i) => {
          const rad = (angle * Math.PI) / 180

          const startR = 14
          const endR = 70

          const x1 = 60 + startR * Math.cos(rad)
          const y1 = 60 + startR * Math.sin(rad)

          const x2 = 60 + endR * Math.cos(rad)
          const y2 = 60 + endR * Math.sin(rad)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              style={{
                strokeDasharray: ".2 0.55",
                strokeDashoffset: ".1",
                animation: "rburst 5s cubic-bezier(0.2, 0.8, 0.3, 1) infinite",
              }}
            />
          )
        })}
      </g>

      <style>{`
       @keyframes rburst {
  0% {
    stroke-dashoffset: 1;
    opacity: 1;
  }

  15% {
    opacity: 1;
  }
        30% {
    opacity: 0;
  }

    50% {
    opacity: 0;
  }

  70% {
    stroke-dashoffset: 0;
    opacity: 0;
  }

  /* 👇 fade out BEFORE reset */
  85% {
    stroke-dashoffset: 0;
    opacity: 0;
  }

  /* 👇 reset happens while invisible */
  100% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
}
      `}</style>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPLODING LINES  — inline SVG animation
──────────────────────────────────────────────────────────────────────────── */
function ExplodingLines({ color = "#4f46e5" }) {
  // 12 lines at different angles, each animated with delay
  const lines = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    len: 28 + (i % 3) * 14,
    delay: (i * 0.08).toFixed(2),
    dur: (1.2 + (i % 4) * 0.3).toFixed(1),
    x2offset: Math.cos((i * 30 * Math.PI) / 180),
    y2offset: Math.sin((i * 30 * Math.PI) / 180),
  }))

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Center dot */}
      <circle cx="60" cy="60" r="4" fill={color} opacity="0.7">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Orbiting ring */}
      <circle cx="60" cy="60" r="10" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="10;16;10" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Exploding lines */}
      {lines.map((l, i) => {
        const x2 = 60 + l.x2offset * l.len
        const y2 = 60 + l.y2offset * l.len
        return (
          <line key={i} x1="60" y1="60" x2={x2} y2={y2}
            stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0">
            <animate attributeName="opacity"
              values={`0;0.8;0`}
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite" />
            <animate attributeName="x2"
              values={`60;${x2};60`}
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.25 0 0.75 1;0.25 0 0.75 1" />
            <animate attributeName="y2"
              values={`60;${y2};60`}
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.25 0 0.75 1;0.25 0 0.75 1" />
          </line>
        )
      })}
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CSS ILLUSTRATIONS  — unique per service
──────────────────────────────────────────────────────────────────────────── */
function Illustration({ type, color }) {
  if (type === "code") return (
    <div style={{ position:"absolute", bottom:24, right:24, opacity:0.18, pointerEvents:"none", fontFamily:"monospace", fontSize:18, lineHeight:1.6, color }}>
      <div>{"const build = () => {"}</div>
      <div>{"  return <Product />"}</div>
      <div>{"}"}</div>
      <div style={{ marginTop:4 }}>{"// always ship"}</div>
    </div>
  )

  if (type === "saas") return (
    <div style={{ position:"absolute", bottom:20, right:20, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="100" viewBox="0 0 90 60" fill="none">
        <rect x="2" y="12" width="86" height="46" rx="6" stroke={color} strokeWidth="1.5"/>
        <rect x="8" y="18" width="74" height="6" rx="3" fill={color} opacity="0.4"/>
        <rect x="8" y="28" width="50" height="4" rx="2" fill={color} opacity="0.25"/>
        <rect x="8" y="36" width="64" height="4" rx="2" fill={color} opacity="0.2"/>
        <rect x="8" y="44" width="40" height="4" rx="2" fill={color} opacity="0.15"/>
        <circle cx="45" cy="6" r="4" stroke={color} strokeWidth="1.2"/>
        <line x1="40" y1="12" x2="38" y2="8" stroke={color} strokeWidth="1"/>
        <line x1="50" y1="12" x2="52" y2="8" stroke={color} strokeWidth="1"/>
      </svg>
    </div>
  )

  if (type === "ai") return (
    <div style={{ position:"absolute", bottom:16, right:16, opacity:0.20, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 80 80" fill="none">
        {[0,1,2,3,4,5].map(i => {
          const angle = i * 60 * Math.PI / 180
          const x = 40 + 28 * Math.cos(angle)
          const y = 40 + 28 * Math.sin(angle)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" stroke={color} strokeWidth="1.2"/>
              <line x1="40" y1="40" x2={x} y2={y} stroke={color} strokeWidth="0.8" strokeDasharray="3 2"/>
            </g>
          )
        })}
        <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="3" fill={color} opacity="0.5"/>
      </svg>
    </div>
  )

  if (type === "blockchain") return (
    <div style={{ position:"absolute", bottom:20, right:16, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 90 64" fill="none">
        {[[0,28],[24,8],[48,8],[72,28],[24,48],[48,48]].map(([x,y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="18" height="16" rx="3" stroke={color} strokeWidth="1.2"/>
          </g>
        ))}
        <line x1="18" y1="36" x2="24" y2="16" stroke={color} strokeWidth="0.8"/>
        <line x1="18" y1="36" x2="24" y2="48" stroke={color} strokeWidth="0.8"/>
        <line x1="42" y1="24" x2="48" y2="16" stroke={color} strokeWidth="0.8"/>
        <line x1="42" y1="24" x2="48" y2="16" stroke={color} strokeWidth="0.8"/>
        <line x1="66" y1="16" x2="72" y2="28" stroke={color} strokeWidth="0.8"/>
        <line x1="42" y1="56" x2="48" y2="48" stroke={color} strokeWidth="0.8"/>
      </svg>
    </div>
  )

  if (type === "ecommerce") return (
    <div style={{ position:"absolute", bottom:20, right:20, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 70 70" fill="none">
        <path d="M8 8h8l10 30h28l8-22H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="56" r="5" stroke={color} strokeWidth="1.5"/>
        <circle cx="50" cy="56" r="5" stroke={color} strokeWidth="1.5"/>
        <path d="M28 24h24" stroke={color} strokeWidth="1" strokeDasharray="3 2"/>
      </svg>
    </div>
  )

  if (type === "marketing") return (
    <div style={{ position:"absolute", bottom:20, right:16, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 80 56" fill="none">
        <polyline points="4,50 20,32 34,40 52,18 68,28 76,8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="76" cy="8" r="4" fill={color} opacity="0.5"/>
        <line x1="4" y1="52" x2="76" y2="52" stroke={color} strokeWidth="0.8" opacity="0.4"/>
        <line x1="4" y1="4" x2="4" y2="52" stroke={color} strokeWidth="0.8" opacity="0.4"/>
        {[20,40,60].map(x => (
          <line key={x} x1={x} y1="48" x2={x} y2="52" stroke={color} strokeWidth="1" opacity="0.4"/>
        ))}
      </svg>
    </div>
  )

  if (type === "ar") return (
    <div style={{ position:"absolute", bottom:16, right:16, opacity:0.20, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 80 70" fill="none">
        {/* AR headset outline */}
        <rect x="8" y="22" width="64" height="30" rx="15" stroke={color} strokeWidth="1.5"/>
        <circle cx="26" cy="37" r="10" stroke={color} strokeWidth="1.2"/>
        <circle cx="54" cy="37" r="10" stroke={color} strokeWidth="1.2"/>
        <line x1="36" y1="37" x2="44" y2="37" stroke={color} strokeWidth="1"/>
        {/* Corner brackets */}
        {[[4,4],[4,66],[76,4],[76,66]].map(([x,y], i) => (
          <path key={i} d={`M${x+[8,-8,-8,8][i]},${y} L${x},${y} L${x},${y+[8,8,-8,-8][i]}`}
            stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        ))}
      </svg>
    </div>
  )

  if (type === "security") return (
    <div style={{ position:"absolute", bottom:20, right:20, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 64 72" fill="none">
        <path d="M32 4L8 14v24c0 16 12 26 24 30 12-4 24-14 24-30V14L32 4z" stroke={color} strokeWidth="1.5"/>
        <path d="M22 36l7 7 14-14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="36" r="14" stroke={color} strokeWidth="0.8" strokeDasharray="3 2"/>
      </svg>
    </div>
  )


  if (type === "mvp") return (
  <div style={{ position:"absolute", bottom:20, right:20, opacity:0.22, pointerEvents:"none" }}>
    <svg width="200" height="200" viewBox="0 0 64 72" fill="none">
      
      {/* App screen */}
      <rect x="12" y="18" width="40" height="28" rx="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="24" r="1" fill={color}/>
      <circle cx="24" cy="24" r="1" fill={color}/>
      <circle cx="28" cy="24" r="1" fill={color}/>

      {/* Rocket (launch) */}
      <path d="M32 30c6-10 10-12 10-12s-2 6-12 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 30c-6-10-10-12-10-12s2 6 12 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="30" r="2" stroke={color} strokeWidth="1.2"/>

      {/* Iteration loop */}
      <path d="M20 50c4 4 20 4 24 0" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M42 48l2 2-2 2" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

    </svg>
  </div>
)


  if (type === "devops") return (
    <div style={{ position:"absolute", bottom:16, right:16, opacity:0.22, pointerEvents:"none" }}>
      <svg width="200" height="200" viewBox="0 0 80 70" fill="none">
        {/* Infinity / loop */}
        <path d="M20 35 C20 20 36 20 40 35 C44 50 60 50 60 35 C60 20 44 20 40 35 C36 50 20 50 20 35"
          stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="20" cy="35" r="4" fill={color} opacity="0.5"/>
        <circle cx="60" cy="35" r="4" fill={color} opacity="0.5"/>
        <path d="M8 8l8 4-4 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M72 62l-8-4 4-8" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>
      </svg>
    </div>
  )

  return null
}

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING BG ELEMENTS  — slow parallax (SVGs acting as "PNG" floaters)
──────────────────────────────────────────────────────────────────────────── */
const BG_ELEMENTS = [
  // Large soft circle top-left
  { id:"c1", top:"3%",  left:"2%",   size:320, opacity:0.06, speed:0.25,
    render: () => <svg viewBox="0 0 1 1"><circle cx=".5" cy=".5" r=".5" fill="#818cf8"/></svg> },
  // Dotted ring top-right
  { id:"c2", top:"8%",  right:"4%",  size:220, opacity:0.08, speed:0.18,
    render: () => (
      <svg viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 5"/>
      </svg>
    )
  },
  // Triangle mid-left
  { id:"t1", top:"38%", left:"1%",   size:160, opacity:0.07, speed:0.30,
    render: () => (
      <svg viewBox="0 0 100 100" fill="none">
        <polygon points="50,5 95,95 5,95" stroke="#34d399" strokeWidth="2" fill="none"/>
      </svg>
    )
  },
  // Cross / plus mid-right
  { id:"p1", top:"45%", right:"2%",  size:100, opacity:0.09, speed:0.22,
    render: () => (
      <svg viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="4" x2="20" y2="36" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="4"  y1="20" x2="36" y2="20" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
  },
  // Soft blob bottom-left
  { id:"b1", top:"68%", left:"3%",   size:260, opacity:0.06, speed:0.20,
    render: () => <svg viewBox="0 0 1 1"><circle cx=".5" cy=".5" r=".5" fill="#f9a8d4"/></svg> },
  // Diamond bottom-right
  { id:"d1", top:"72%", right:"3%",  size:130, opacity:0.08, speed:0.28,
    render: () => (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="10" y="10" width="60" height="60" transform="rotate(45 40 40)" stroke="#38bdf8" strokeWidth="2"/>
      </svg>
    )
  },
  // Small dot grid top-center
  { id:"g1", top:"12%", left:"42%",  size:180, opacity:0.07, speed:0.15,
    render: () => (
      <svg viewBox="0 0 60 60" fill="none">
        {[0,1,2,3,4].flatMap(row =>
          [0,1,2,3,4].map(col => (
            <circle key={`${row}-${col}`} cx={6+col*12} cy={6+row*12} r="2" fill="#6366f1"/>
          ))
        )}
      </svg>
    )
  },
  // Wavy lines bottom-center
  { id:"w1", top:"82%", left:"35%",  size:200, opacity:0.07, speed:0.18,
    render: () => (
      <svg viewBox="0 0 120 60" fill="none">
        {[0,1,2].map(i => (
          <path key={i} d={`M0,${10+i*16} Q30,${2+i*16} 60,${10+i*16} T120,${10+i*16}`}
            stroke="#0ea5e9" strokeWidth="1.5" fill="none" opacity={1-i*0.2}/>
        ))}
      </svg>
    )
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   SINGLE CARD
──────────────────────────────────────────────────────────────────────────── */
function ServiceCard({ service }) {
  const gradientStyle = service.rotate
    ? {} // handled by CSS animation
    : { background: service.gradient }

  return (
    <div
      className={` bg-[#fff] border border-[#F0F0F0] sc-card ${service.rotate ? "sc-card--rotate" : ""}`}
      
    >
      {/* Exploding lines on select cards */}
      {/* {service.explode && (
        <div className="sc-explode-wrap">
          <RadialBurst />
        </div>
      )} */}

      {/* CSS illustration */}
      <Illustration type={service.illustration} color={service.accentColor} />

      {/* Content */}
      <div className="sc-card-inner">
        {/* <picture>
          <source srcSet={service.piclow} type="image/webp" />
        
          <img className="hidden md:block absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] -right-10 -bottom-[180px] md:-bottom-[180px] hover:scale-105 transition-all duration-300 animate-float-soft z-10" src={service.pic} alt={service.desc} draggable={false} loading="lazy"
    decoding="async"/>
          </picture> */}
        
        <div className="sc-num">{String(service.id).padStart(2, "0")}</div>
        <h3 className="sc-title">
          {service.title.split("\n").map((line, i) => <span key={i}>{line}<br/></span>)}
        </h3>
        <p className="sc-desc">{service.desc}</p>
        {/* <a href="/services" className="sc-link" style={{ color: service.accentColor }}>
          Learn more
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{ marginLeft:6 }}>
            <path d="M1 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a> */}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────────────────────── */
export default function ServicesCards() {
  const sectionRef  = useRef(null)
  const headRef     = useRef(null)
  const colLeftRef  = useRef(null)
  const colRightRef = useRef(null)
  const bgElRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current

      // ── Head reveal ───────────────────────────────────────────────────────
      gsap.set(headRef.current, { autoAlpha: 0, y: 32 })
      gsap.to(headRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      })

      // ── Cards scroll faster (speed > 1 = moves more than scroll) ─────────
      // Left column: translateY goes from 0 → -60px (extra upward movement)
      gsap.to(colLeftRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger:   section,
          start:     "top bottom",
          end:       "bottom top",
          scrub:     3,
        },
      })
      // Right column: faster + offset phase
      gsap.to(colRightRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger:   section,
          start:     "top bottom",
          end:       "bottom top",
          scrub:     1.0,
        },
      })

      // ── Card entrance stagger ─────────────────────────────────────────────
      const allCards = section.querySelectorAll(".sc-card")
      gsap.set(allCards, { autoAlpha: 0, y: 60, scale: 0.96 })
      allCards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: 1, y: 0, scale: 1,
          duration: 0.75, ease: "power3.out",
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: card, start: "top 90%" },
        })
      })

      // ── BG elements scroll slower (speed < 1 = less movement) ─────────────
      bgElRefs.current.forEach((el, i) => {
        if (!el) return
        const speed = BG_ELEMENTS[i].speed
        // Positive y = slower than page (parallax back effect)
        gsap.to(el, {
          y: `${-speed * 200}px`,
          ease: "none",
          scrollTrigger: {
            trigger:   section,
            start:     "top bottom",
            end:       "bottom top",
            scrub:     2.0,
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split into two columns
  const leftServices  = SERVICES.filter(s => s.col === 0)
  const rightServices = SERVICES.filter(s => s.col === 1)

  return (
    <>
      <style>{`
        /* ── Section wrapper ────────────────────────────────── */
        .sc-section {
          position:   relative;
          background: #F4F4F4;
          padding:    120px 7vw 160px;
          overflow:   hidden;
          min-height: 200vh;
        }

        /* ── Rotating gradient keyframe ─────────────────────── */
        @keyframes sc-rotate-bg {
          0%   { background: conic-gradient(from 0deg,   var(--from) 0%, var(--to) 50%, var(--from) 100%); }
          50%  { background: conic-gradient(from 180deg, var(--from) 0%, var(--to) 50%, var(--from) 100%); }
          100% { background: conic-gradient(from 360deg, var(--from) 0%, var(--to) 50%, var(--from) 100%); }
        }
        /* Smooth linear gradient rotation via hue-rotate on pseudoelement */
        .sc-card--rotate {
  position: relative;
  overflow: hidden; /* important */
}

        .sc-card--rotate::before {
  content: '';
  position: absolute;

  /* 👇 oversize it massively */
  width: 400%;
  height: 400%;
  top: -150%;
  left: -150%;

  border-radius: 50%; /* 👈 key trick */

  background: linear-gradient(135deg, var(--from), var(--to));

  animation: sc-rotate 10s linear infinite;

  z-index: 0;
}

        @keyframes floatSoft {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
}



.animate-float-soft {
  animation: floatSoft 5s ease-in-out infinite;
}

@keyframes sc-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
        @keyframes sc-bg-spin {
          0%   { background: linear-gradient(0deg,   var(--from) 0%, var(--to) 100%); }
          25%  { background: linear-gradient(90deg,  var(--from) 0%, var(--to) 100%); }
          50%  { background: linear-gradient(180deg, var(--from) 0%, var(--to) 100%); }
          75%  { background: linear-gradient(270deg, var(--from) 0%, var(--to) 100%); }
          100% { background: linear-gradient(360deg, var(--from) 0%, var(--to) 100%); }
        }

        /* ── Section head ───────────────────────────────────── */
        .sc-head {
          max-width:  720px;
          margin:     0 auto 80px;
          text-align: center;
          position:   relative;
          z-index:    2;
        }
        .sc-eyebrow {
          font-family:    'DM Sans', sans-serif;
          font-size:      10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color:          #6366f1;
          margin:         0 0 16px;
          display:        block;
        }
        .sc-heading {
          
          font-size:      clamp(50px, 5vw, 64px);
          font-weight:    500;
          line-height:    1.05;
          letter-spacing: -0.01em;
          color:          #0f0f0f;
          margin:         0 0 16px;
        }
        .sc-heading-sub {
          
          font-size:   clamp(14px, 1.2vw, 17px);
          font-weight: 300;
          line-height: 1.7;
          color:       #6b7280;
          max-width:   48ch;
          margin:      0 auto;
        }

        /* ── Column grid ────────────────────────────────────── */
        .sc-grid {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          gap:                   0 32px;
          position:              relative;
          z-index:               2;
          max-width:             2200px;
          margin:                0 auto;
        }

        .sc-col {
          display:        flex;
          flex-direction: column;
          gap:            32px;
          will-change:    transform;
        }

        /* Right column starts lower (staggered) */
        .sc-col--right {
          margin-top: 100px;
        }

        /* ── Card ───────────────────────────────────────────── */
        .sc-card {
          position:      relative;
          border-radius: 20px;
          overflow:      hidden;
          min-height:    400px;
          cursor:        default;

          transition:    transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                         box-shadow 0.4s ease;
          will-change:   transform;
        }
        .sc-card:hover {
          transform:  translateY(-6px) scale(1.01);

        }
        .sc-card--rotate > * { position: relative; z-index: 1; }

        /* ── Explode wrapper ────────────────────────────────── */
        .sc-explode-wrap {
          position:   absolute;
          top:        30%;
          left:       80%;
          transform:  translate(-50%, -50%);
          width:      120px;
          height:     120px;
          pointer-events: none;
          z-index:    8;
          opacity:    1;
        }

        /* ── Card inner ─────────────────────────────────────── */
        .sc-card-inner {
          position: relative;
          z-index:  2;
          padding:  36px 32px 80px;
        }
        .sc-num {
        position:absolute;
        right:20px; top:-20px;
          font-size:      150px;
          font-weight:700;
          color:          #f0f0f0;
          margin-bottom:  20px;
         
          z-index:0;
        }
        .sc-title {
          
          font-size:      clamp(30px, 2.3vw, 32px);
          font-weight:    500;
          line-height:    1.15;
          letter-spacing: -0.02em;
          color:          #111827;
          margin:         0 0 14px;
        }
        .sc-desc {
          font-size:   17px;
          line-height: 1.72;
          color:       #050508;
          margin:      0 0 28px;
          max-width:   38ch;
          opacity: .8;
        }
        .sc-link {
          font-family:     'DM Sans', sans-serif;
          font-size:       12px;
          letter-spacing:  0.12em;
          text-transform:  uppercase;
          text-decoration: none;
          display:         inline-flex;
          align-items:     center;
          font-weight:     500;
          transition:      opacity 0.25s;
        }
        .sc-link:hover { opacity: 0.65; }

        /* ── Floating bg elements ───────────────────────────── */
        .sc-bg-el {
          position:       absolute;
          pointer-events: none;
          z-index:        1;
          will-change:    transform;
        }

        /* ── Responsive ─────────────────────────────────────── */
        @media (max-width: 768px) {

        .sc-explode-wrap {
        opacity:0;
        }

        .sc-num {
opacity:0;
      }
          .sc-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
            .sc-desc{font-size:18px;}
          .sc-col--right { margin-top: 0; }
          .sc-section { padding: 80px 5vw 100px; }
        }
      `}</style>

      <section ref={sectionRef} className="sc-section" data-navbar="dark">

        {/* ── Floating background elements (slow parallax) ───── */}
        {/* {BG_ELEMENTS.map((el, i) => (
          <div
            key={el.id}
            ref={ref => bgElRefs.current[i] = ref}
            className="sc-bg-el"
            style={{
              top:     el.top,
              left:    el.left,
              right:   el.right,
              width:   el.size,
              height:  el.size,
              opacity: el.opacity,
            }}
          >
            {el.render()}
          </div>
        ))} */}

        {/* ── Section heading ─────────────────────────────────── */}
        <div ref={headRef} className="sc-head">
          {/* <span className="sc-eyebrow">What we build</span> */}
          <h2 className="sc-heading pb-10"  >Our Services </h2>
          {/* <p className="sc-heading-sub">
            Nine disciplines, one relentless standard. We build products
            that move, scale, and last — from first wireframe to final deploy.
          </p> */}
        </div>

        {/* ── Two-column staggered card grid ──────────────────── */}
        <div className="sc-grid">
          {/* Left column */}
          <div ref={colLeftRef} className="sc-col sc-col--left">
            {leftServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Right column — starts lower, scrolls faster */}
          <div ref={colRightRef} className="sc-col sc-col--right">
            {rightServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

      </section>
    </>
  )
}