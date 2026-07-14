import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import circle from "/src/assets/Circle.json";
import computer from "/src/assets/main.json";
const Lottie = lazy(() => import("lottie-react"));
import { ChevronLeft, ChevronRight } from "lucide-react";
import Robotics from "/src/assets/Energy rocket optimised.json";
import animationData from "/src/assets/Developer.json";
import { CASE_STUDIES } from "../data/caseStudiesData";
import book from "/svg/book.svg";
import { useInView } from "react-intersection-observer";
import ScrollIndicator from "../components/ui/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function RocketAnim() {
  const lottieRef = useRef();
  const wrapRef = useRef();
  const isMobile = useRef(
    typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [animData, setAnimData] = useState(null);

  useEffect(() => {
    if (isMobile.current) {
      import("/src/assets/rocket.json").then((m) => setAnimData(m.default));
    } else {
      setAnimData(Robotics);
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!lottieRef.current) return;
        entry.isIntersecting
          ? lottieRef.current.play()
          : lottieRef.current.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!animData) return null;

  return (
    <div ref={wrapRef} className="sl-dd-lottie">
      <Lottie
        lottieRef={lottieRef}
        className="h-[240px] md:h-[600px] md:w-[600px] w-[220px]"
        animationData={animData}
        loop={true}
        autoplay={true}
        renderer={isMobile.current ? "canvas" : "svg"}
        rendererSettings={{
          progressiveLoad: true,
          hideOnTransparent: true,
          clearCanvas: true,
        }}
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      />
    </div>
  );
}

// ── OPT: Lottie pauses when the containing element leaves the viewport.
// Previously `triggerOnce: true` meant it mounted once and played forever —
// no visibility gating at all, running at full animation rate for the entire
// page session after the first scroll past this section.
function Sectionlot() {
  const lottieRef = useRef(null);
  const wrapRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  // Merge both refs onto the wrapper
  const setRefs = (el) => {
    wrapRef.current = el;
    inViewRef(el);
  };

  // Pause/resume based on visibility after mount
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!lottieRef.current) return;
        entry.isIntersecting
          ? lottieRef.current.play()
          : lottieRef.current.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]); // re-attach after Lottie mounts (inView flip triggers re-render)

  return (
    <div
      ref={setRefs}
      className="flex items-start justify-center md:justify-end"
    >
      <div className="h-[250px] pb-20 md:h-[300px]">
        {/* {inView && (
          <Suspense fallback={null}>
            <Lottie
              lottieRef={lottieRef}
              className="h-[200px] w-[500px] md:h-[300px] md:w-[500px]"
              animationData={computer}
            />
          </Suspense>
        )} */}
      </div>
    </div>
  );
}

function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);

  const runGlitch = () => {
    let frame = 0;
    const interval = setInterval(() => {
      const output = text
        .split("")
        .map((letter, i) => {
          if (i < frame) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplay(output);
      frame += 0.35;
      if (frame >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 40);
  };

  return <div onMouseEnter={runGlitch}>{display}</div>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED
──────────────────────────────────────────────────────────────────────────── */
function useNearVP(margin = "300px") {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, near];
}

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────────────────────────────────────
   HERO CANVAS PAUSE HOOK
──────────────────────────────────────────────────────────────────────────── */
function usePausableHeroCanvas() {
  const wrapRef = useRef(null);
  const [frameloop, setFrameloop] = useState("always");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          setFrameloop("always");
        } else {
          setFrameloop("never");
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -window.innerHeight * 0.5) {
            setMounted(false);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { wrapRef, frameloop, mounted };
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D — LOCAL GLB MODEL
──────────────────────────────────────────────────────────────────────────── */
function HeroModel({ mouse }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/vfx_experiment 3.glb");
  const cloned = useMemo(() => scene.clone(), [scene]);
  const { actions, names } = useAnimations(animations, group);
  const sm = useRef({ x: 0, y: 0 });

  useEffect(() => {
    names.forEach((name) => {
      actions[name]?.play();
      actions[name].timeScale = 0.2;
    });
  }, [actions, names]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mouse?.current) {
      sm.current.x += (mouse.current.x - sm.current.x) * 0.04;
      sm.current.y += (mouse.current.y - sm.current.y) * 0.04;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.12 + sm.current.x * 0.5;
      group.current.rotation.x = sm.current.y * 0.3;
      group.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  );
}

// ── OPT: preload removed from module level (was firing immediately on
// every page load regardless of whether user reaches the hero).
// It now fires inside SolHero's useEffect, still early but deferred
// until after critical render, and gated by a near-viewport check.

/* ─────────────────────────────────────────────────────────────────────────────
   RADIAL BURST
──────────────────────────────────────────────────────────────────────────── */
function RadialBurst({ color = "#fcfcf7" }) {
  const lines = Array.from({ length: 12 }, (_, i) => i * 30);
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
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + 14 * Math.cos(rad);
          const y1 = 60 + 14 * Math.sin(rad);
          const x2 = 60 + 70 * Math.cos(rad);
          const y2 = 60 + 70 * Math.sin(rad);
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
                animation: `rburst 5s cubic-bezier(0.2,0.8,0.3,1) ${(i * 0.08).toFixed(2)}s infinite`,
              }}
            />
          );
        })}
      </g>
      <style>{`@keyframes rburst{0%{stroke-dashoffset:1;opacity:1}15%{opacity:1}30%{opacity:0}50%{opacity:0}70%{stroke-dashoffset:0;opacity:0}85%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}`}</style>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCAN GRID / CIRCUIT (unchanged)
──────────────────────────────────────────────────────────────────────────── */
function ScanGrid({ color = "rgba(74,111,255,0.15)" }) {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.6,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 400 300"
      fill="none"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={50 * i}
          x2="400"
          y2={50 * i}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={`v${i}`}
          x1={50 * i}
          y1="0"
          x2={50 * i}
          y2="300"
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      <line x1="0" y1="0" x2="400" y2="0" stroke={color} strokeWidth="1.5">
        <animate
          attributeName="y1"
          values="0;300;0"
          dur="4s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="y2"
          values="0;300;0"
          dur="4s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}

function CircuitAnim({ color = "#4a6fff" }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.18,
      }}
    >
      <path
        d="M20 80 H60 V40 H100 V80 H140 V120 H180"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 40 H50 V120 H80 V40 H110"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="60" cy="40" r="3" fill={color}>
        <animate
          attributeName="r"
          values="3;5;3"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="140" cy="120" r="3" fill={color}>
        <animate
          attributeName="r"
          values="3;5;3"
          dur="2.5s"
          begin="0.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2.5s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="100" cy="80" r="3" fill={color}>
        <animate
          attributeName="r"
          values="3;5;3"
          dur="3s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="20" cy="80" r="2.5" fill={color} opacity="0.8">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M0 0 H40 V-40 H40 V0 H40 V40 H40"
        />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    id: "01",
    title: "Custom Software",
    tagline: "Built around your business.",
    desc: "Tailor-made software engineered for the way your company works. From internal business systems to customer-facing platforms, we create scalable products that solve real operational challenges.",

    points: [
      "Business automation",
      "Enterprise web applications",
      "Workflow management",
      "API integrations",
      "Scalable cloud architecture",
    ],

    accent: "#666",
    bg: "#ddd",

    industries: ["Enterprise", "Healthcare", "Finance", "Education"],

    burstColor: "#ddd",

    tagline2: "Built to last.",

    accent2: "#ddd",
    accent3: "#ddd",

    pic: "/images/stickers/softwareduo.webp",
    picsticky: "/images/software.jpg",

    gradient: "/images/stickers/gradientblue1.webp",
  },

  {
    id: "02",
    title: "Web & Mobile",
    tagline: "Beautiful. Fast. Reliable.",

    desc: "Premium websites and mobile applications designed for performance and user experience. From startup MVPs to enterprise platforms, every interface is crafted to engage and convert.",

    points: [
      "Responsive websites",
      "iOS & Android apps",
      "React & Flutter development",
      "Performance optimisation",
      "Modern UI / UX",
    ],

    accent: "#666",
    bg: "#34d399",

    industries: ["Startups", "Retail", "Hospitality", "SaaS"],

    burstColor: "#059669",

    tagline2: "Designed to perform.",

    accent2: "#10b981",
    accent3: "#34d399",

    pic: "/images/stickers/webmobileduo.webp",
    picsticky: "/images/web2.jpg",

    gradient: "/images/stickers/gradientgreen.webp",
  },

  {
    id: "03",
    title: "Blockchain",
    tagline: "Secure by design.",

    desc: "Blockchain solutions that bring transparency, automation and trust to modern businesses. From smart contracts to token ecosystems, we build secure decentralized products ready for production.",

    points: [
      "Smart contracts",
      "Web3 applications",
      "Wallet integration",
      "Token development",
      "Blockchain consulting",
    ],

    accent: "#666",
    bg: "#fbbf24",

    industries: ["Finance", "Gaming", "Supply Chain", "Digital Assets"],

    burstColor: "#d97706",

    tagline2: "Future-ready.",

    accent2: "#f59e0b",
    accent3: "#fbbf24",

    pic: "/images/stickers/blockchainduo.webp",
    picsticky: "/images/block2.jpg",

    gradient: "/images/stickers/gradientred.webp",
  },

  {
    id: "04",
    title: "Artificial Intelligence",
    tagline: "Smarter products.",

    desc: "AI-powered applications that automate workflows, analyse data and deliver intelligent user experiences. We build production-ready AI systems using LLMs, computer vision and intelligent automation.",

    points: [
      "AI Agents",
      "LLM integrations",
      "RAG systems",
      "Computer vision",
      "Workflow automation",
    ],

    accent: "#666",
    bg: "#c084fc",

    industries: ["Healthcare", "Legal", "Education", "Customer Support"],

    burstColor: "#9333ea",

    tagline2: "Powered by intelligence.",

    accent2: "#a855f7",
    accent3: "#c084fc",

    pic: "/images/stickers/aiduo.webp",
    picsticky: "/images/ai2.jpg",

    gradient: "/images/stickers/gradientpurple.webp",
  },
];

const INDUSTRIES = [
  {
    name: "FinTech",
    icon: "◈",
    color: "#4a6fff",
    pic: "/images/depts/fin.jpg",
  },
  {
    name: "Healthcare",
    icon: "◉",
    color: "#059669",
    pic: "/images/depts/health.jpg",
  },
  {
    name: "Education",
    icon: "◎",
    color: "#d97706",
    pic: "/images/depts/edu.jpg",
  },
  {
    name: "E-Commerce",
    icon: "⊕",
    color: "#e11d48",
    pic: "/images/depts/ecom.jpg",
  },
  {
    name: "Real Estate",
    icon: "◐",
    color: "#9333ea",
    pic: "/images/depts/real.jpg",
  },
  {
    name: "Logistics",
    icon: "◑",
    color: "#0ea5e9",
    pic: "/images/depts/logi.jpg",
  },
  {
    name: "Legal Tech",
    icon: "◈",
    color: "#f59e0b",
    pic: "/images/depts/legal.jpg",
  },
  {
    name: "Gaming & Web3",
    icon: "◉",
    color: "#10b981",
    pic: "/images/depts/gaming.jpg",
  },
  {
    name: "Media & SaaS",
    icon: "◎",
    color: "#6366f1",
    pic: "/images/depts/media.jpg",
  },
];

const HOW_STEPS = [
  {
    n: "01",
    title: "Discovery",
    desc: "We spend the first week understanding your problem, users, and competitive landscape before writing a single line of code.",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "We design the full technical blueprint — stack, data model, integrations — before building anything. No surprises downstream.",
  },
  {
    n: "03",
    title: "Sprints",
    desc: "Two-week sprints with live staging, weekly demos and documented decisions. You always know exactly what's been built.",
  },
  {
    n: "04",
    title: "Launch",
    desc: "Zero-downtime deployments, load testing, monitoring setup. Go-live is rehearsed, not improvised.",
  },
  {
    n: "05",
    title: "Growth",
    desc: "We stay on. Monitor, iterate, and build the next phase. The relationship doesn't end at launch — it starts there.",
  },
];

const FAQ = [
  {
    q: "What core services does Algon Solutions provide?",
    a: "We specialize in three core engineering pillars: AI & Automation (AI agents, LLMs, and workflow automation), Software & SaaS Development (web apps, MVPs, and dashboards), and Managed Engineering Services (dedicated developers, DevOps, and cloud support).",
  },
  {
    q: "What is your typical project timeline?",
    a: "Most software and automation projects run 8–16 weeks from kick-off to launch. Smaller scopes like standalone chatbots or MVPs can ship faster, while complex enterprise platforms or deep LLM integrations take longer.",
  },
  {
    q: "What tech stack and models do you work with?",
    a: "We build with modern frameworks like React, Next.js, Python, and Flutter. For AI and automation, we leverage top-tier models (OpenAI, Claude, Gemini, Llama) alongside agentic frameworks like LangChain, CrewAI, and n8n to build smart, scalable systems.",
  },
  {
    q: "Can you provide ongoing engineering support or take over an existing system?",
    a: "Absolutely. Through our Managed Engineering Services, we offer dedicated developers, DevOps setup, QA, and cloud support. Whether you need us to rescue an existing codebase or scale a newly launched product, we treat it as our own.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes—we are highly experienced in MVP development for pre-seed and seed-stage founders. We're comfortable working with evolving requirements and help define the technical architecture just as much as we build it.",
  },
  {
    q: "How do you handle IP and data confidentiality?",
    a: "All work is 100% yours. We sign NDAs before discussing any sensitive system architecture or business processes, and all intellectual property transfers to you automatically upon final payment.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
function SolHero() {
  const heroImgRef = useRef(null);
  const heroRef = useRef();
  const h1Ref = useRef();
  const subRef = useRef();
  const ruleRef = useRef();
  const ebRef = useRef();
  const cvsRef = useRef();
  const marqRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // const { wrapRef, frameloop, mounted } = usePausableHeroCanvas();

  // ── OPT: preload deferred to first effect instead of module level —
  // fires after initial render, not competing with critical page resources.
  // Still early enough that the GLB is ready by the time the user interacts.
  // useEffect(() => {
  //   useGLTF.preload("/vfx_experiment 3.glb");
  // }, []);

  // ── OPT: RAF-throttled mousemove — on high-polling-rate mice (500-1000Hz)
  // the raw handler was writing to mouse.current hundreds of times/sec.
  // The smoothing lerp in useFrame runs at 60fps so anything faster is wasted.
  useEffect(() => {
    let rafId = null;
    let pendingX = 0;
    let pendingY = 0;

    const onMouseMove = (e) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (!r) return;
      pendingX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pendingY = -((e.clientY - r.top) / r.height - 0.5) * 2;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mouse.current.x = pendingX;
        mouse.current.y = pendingY;
        rafId = null;
      });
    };

    const el = heroRef.current;
    el?.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      el?.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     let x = 0;
  //     let rafId = null;
  //     let running = true;

  //     // ── OPT: marquee RAF is gated by an IntersectionObserver on heroRef —
  //     // previously the loop ran forever even after the hero scrolled out of
  //     // view and the Canvas unmounted, burning a rAF slot every 16ms for the
  //     // entire page session. Now it only runs while the hero is visible.
  //     const run = () => {
  //       if (!running) return;
  //       x -= 0.6;
  //       const t = marqRef.current;
  //       if (t && Math.abs(x) >= t.scrollWidth / 2) x = 0;
  //       if (t) t.style.transform = `translateX(${x}px)`;
  //       rafId = requestAnimationFrame(run);
  //     };

  //     const io = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           running = true;
  //           if (!rafId) rafId = requestAnimationFrame(run);
  //         } else {
  //           running = false;
  //           if (rafId) {
  //             cancelAnimationFrame(rafId);
  //             rafId = null;
  //           }
  //         }
  //       },
  //       { rootMargin: "0px" },
  //     );
  //     const heroEl = heroRef.current;
  //     if (heroEl) io.observe(heroEl);

  //     // Start after short delay for the initial entrance
  //     const startTimeout = setTimeout(() => {
  //       rafId = requestAnimationFrame(run);
  //     }, 400);

  //     gsap.set(
  //       [
  //         ruleRef.current,
  //         ebRef.current,
  //         h1Ref.current,
  //         subRef.current,
  //         cvsRef.current,
  //       ],
  //       { autoAlpha: 0 },
  //     );
  //     gsap.set(h1Ref.current, { y: 60 });
  //     gsap.set(subRef.current, { y: 24 });
  //     gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });

  //     const tl = gsap.timeline({ delay: 0.15 });
  //     tl.to(
  //       ruleRef.current,
  //       { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: "power3.inOut" },
  //       0,
  //     )
  //       .to(ebRef.current, { autoAlpha: 1, duration: 0.5 }, 0.2)
  //       .to(cvsRef.current, { autoAlpha: 1, duration: 1.0 }, 0.1)
  //       .to(
  //         h1Ref.current,
  //         { autoAlpha: 1, y: 0, duration: 1.0, ease: "power4.out" },
  //         0.2,
  //       )
  //       .to(
  //         subRef.current,
  //         { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
  //         0.55,
  //       );

  //     return () => {
  //       clearTimeout(startTimeout);
  //       running = false;
  //       if (rafId) cancelAnimationFrame(rafId);
  //       io.disconnect();
  //     };
  //   }, heroRef);
  //   return () => ctx.revert();
  // }, []);

  // ── Marquee scroll loop — gated by visibility so it doesn't run forever off-screen
  useEffect(() => {
    let x = 0;
    let rafId = null;
    let running = true;

    const run = () => {
      if (!running) return;
      x -= 0.2;
      const t = marqRef.current;
      if (t && Math.abs(x) >= t.scrollWidth / 2) x = 0;
      if (t) t.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          if (!rafId) rafId = requestAnimationFrame(run);
        } else {
          running = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      },
      { rootMargin: "0px" },
    );
    const heroEl = heroRef.current;
    if (heroEl) io.observe(heroEl);

    const startTimeout = setTimeout(() => {
      rafId = requestAnimationFrame(run);
    }, 400);

    return () => {
      clearTimeout(startTimeout);
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={heroRef} className="sl-hero" data-navbar="light">
      {/* <div
        ref={heroImgRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <img
          src="/images/serviceshero.jpg"
          alt=""
          className="w-full h-full object-cover scale-110 opacity-10"
        />
      </div> */}

      <div className="sl-grain" />
      <div className="sl-orb sl-orb--hr" />
      <div className="sl-orb sl-orb--hl" />
      <div className="sl-hero-ghost" aria-hidden="true">
        Solutions
      </div>

      <div className="sl-hero-inner">
        <div className="sl-hero-left">
          <h1
            ref={h1Ref}
            className=" text-center text-7xl md:text-[115px] md:text-start tracking-normal font-medium md:font-normal"
          >
            The right
          </h1>
          <div className=" my-3 w-auto">
            <h1 className="text-center bg-[#265eed] text-7xl md:text-[115px] max-w-fit mx-auto md:mx-0 px-2 md:text-left tracking-normal font-medium md:font-normal">
              {" "}
              solution
            </h1>
          </div>

          <h1
            ref={h1Ref}
            className=" text-center text-5xl md:text-[80px] md:text-start tracking-normal leading-none "
          >
            For every
            <span className="">
              {" "}
              <br /> Hard problem
            </span>
          </h1>
        </div>

        {/* <div
          ref={(el) => { cvsRef.current = el; wrapRef.current = el; }}
          className="sl-hero-canvas"
        >
          {mounted && (
            <Canvas
              frameloop={frameloop}
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 1], fov: 100 }}
              gl={{
                alpha: true,
                stencil: false,
                powerPreference: "high-performance",
              }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={7} />
              <pointLight position={[0,0,0]} intensity={3} color="#4a6fff" distance={10} decay={2} />
              <pointLight position={[0,0,0]} intensity={5} color="#9333ea" distance={8}  decay={2} />
              <pointLight position={[0,0,0]} intensity={1} color="#4a6fff" distance={6}  decay={2} />
              <Suspense fallback={null}>
                <group scale={0.7}>
                  <HeroModel mouse={mouse} />
                </group>
                <Environment preset="night" resolution={128} />
              </Suspense>
            </Canvas>
          )}
          <div className="sl-cvs-lbl sl-cvs-lbl--tl">4 Solution Tracks</div>
          <div className="sl-cvs-lbl sl-cvs-lbl--br">Algon.Solutions</div>
        </div> */}

        <div className="overflow-hidden flex justify-center">
          <div className="w-screen md:w-[40vw] h-[40vh] md:h-[80vh] overflow-hidden flex justify-center items-center ">
            <Lottie
              className="h-full md:h-[80%]"
              animationData={animationData}
            />
          </div>
        </div>
      </div>

      {/* <div className="sl-hero-stats">
        {[["48+","Projects"],["8","Countries"],["4","Solution tracks"],["100%","On-time"]].map(([n,l]) => (
          <div key={l} className="sl-hstat">
            <span className="sl-hstat-n">{n}</span>
            <span className="sl-hstat-l">{l}</span>
          </div>
        ))}
      </div> */}

      {/* <div className="sl-marq-wrap">
        <div ref={marqRef} className="sl-marq-track">
          {[...Array(4)].map((_, g) =>
            [
              "Enterprise Platforms",
              "Growth & Commerce",
              "Web3",
              "AI Products",
              "Custom Software",
              "SaaS",
              "Blockchain",
              "AR/VR",
              "DevOps",
            ].map((s, i) => (
              <span key={`${g}-${i}`} className="sl-marq-item">
                {s}
                <span className="sl-marq-dot">◆</span>
              </span>
            )),
          )}
        </div>
      </div> */}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. SOLUTIONS OVERVIEW
──────────────────────────────────────────────────────────────────────────── */
function SolOverview() {
  const ref = useRef();
  const headRef = useRef();
  const cardRefs = useRef([]);
  const bgRefs = useRef([]);

  const BG_SHAPES = [
    { top: "5%", left: "2%", size: 220, color: "#818cf8", delay: 0 },
    { top: "30%", right: "3%", size: 160, color: "#34d399", delay: 0.1 },
    { top: "60%", left: "5%", size: 140, color: "#f9a8d4", delay: 0.2 },
    { top: "80%", right: "5%", size: 180, color: "#fbbf24", delay: 0.15 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });

      cardRefs.current.forEach((c, i) => {
        if (!c) return;
        gsap.set(c, { autoAlpha: 0, y: 60, scale: 0.96 });
        gsap.to(c, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: (i % 2) * 0.1,
          scrollTrigger: {
            trigger: c,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
        });
      });

      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `-${60 + i * 20}px`,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sl-overview block md:hidden">
      {BG_SHAPES.map((s, i) => (
        <div
          key={i}
          ref={(el) => (bgRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
            opacity: 0.07,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(ellipse,${s.color} 0%,transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
        />
      ))}
      <div className="sl-overview-inner" data-navbar="dark">
        <div className="flex items-center justify-center">
          <div ref={headRef} className="sl-white-head">
            <h2 className="sl-title-dark">
              Four tracks.
              <br />
              One company.
              <br />
            </h2>
          </div>
          <Sectionlot />
        </div>
        <div className="sl-ov-grid">
          {SOLUTIONS.map((sol, i) => (
            <div
              key={sol.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="sl-ov-card"
              // style={{
              //   "--accent": sol.accent,
              //   background: `radial-gradient(circle at 20% 30%,${sol.accent}22,transparent 60%),linear-gradient(135deg,${sol.bg} 0%,${sol.accent}33 100%)`,
              // }}
            >
              {/* <img
                className="absolute h-full w-full hover:scale-125 transition-all duration-700"
                src={sol.gradient}
                alt={sol.desc}
              /> */}
              <div className="sl-ov-burst">
                {/* <RadialBurst color={sol.accent} /> */}
              </div>
              <div className="sl-ov-card-body">
                <div className="sl-ov-num absolute right-0 top-0" style={{ color: sol.accent }}>
                  {sol.id}
                </div>
                <h3 className="sl-ov-title">{sol.title}</h3>
                <p className="sl-ov-desc">{sol.desc}</p>
                <img
                  className={`hidden md:flex absolute h-[450px] w-[450px] -right-20 -bottom-20 ${i % 2 === 0 ? "animate-float-soft" : "animate-float-wide"}`}
                  src={sol.pic}
                  alt={sol.desc}
                />
              </div>
              <div className="sl-ov-bar" style={{ background: sol.accent }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolOverviewpc() {
  const sectionRef = useRef();
  const imageColRef = useRef();
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  // Handles the crop/uncrop swap for whichever image index becomes active
  // activateImage now takes a second arg: whether this call came from
  // onEnterBack (scrolling upward back into the section)
  const activateImage = (i, isEnteringFromBelow = false) => {
    const lastIndex = imageRefs.current.length - 1;

    imageRefs.current.forEach((img, j) => {
      if (!img) return;

      if (j === i) {
        if (j === 0) {
          // first image: no crop-in tween ever, just snap fully visible
          gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)" });
        } else if (j === lastIndex && isEnteringFromBelow) {
          // last image, but entering by scrolling UP into it (from the
          // section below) — skip the animation, just snap it visible
          gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          // normal case, including last image entered by scrolling DOWN:
          // snap it clipped from the right, then uncrop it open
          gsap.set(img, { clipPath: "inset(0% 100% 0% 0%)" });
          gsap.to(img, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.35,
            ease: "power2.out",
          });
        }
      } else {
        if (j === 0 || j === lastIndex) {
          // first or last image: no crop-out tween, snap away instantly
          gsap.set(img, { clipPath: "inset(0% 0% 0% 100%)" });
        } else {
          // crop it away from the left
          gsap.to(img, {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 0.35,
            ease: "power2.out",
          });
        }
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      imageRefs.current.forEach((img, i) => {
        gsap.set(img, {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
        });
      });
      // text starts fully visible now — no fade/slide-in state to set up
      textRefs.current.forEach((el) => {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageColRef.current,
        pinSpacing: false,
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            // no fade/slide animation on entry — just make sure it's visible
            gsap.set(el, { autoAlpha: 1, y: 0 });
            activateImage(i, false); // scrolling down → normal animation
          },
          onEnterBack: () => {
            gsap.set(el, { autoAlpha: 1, y: 0 });
            activateImage(i, true); // scrolling up → last image skips its entry tween
          },
          
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050508] hidden md:block"
      data-navbar="light"
    >
      <div className="flex w-full">
        {/* ── LEFT: text column — scrolls normally, determines section height */}
        <div className="w-1/2 flex flex-col">
          <div className="px-[7vw] mt-20">
            <h2 className="text-[clamp(40px,9vw,70px)] font-medium leading-[1.08] tracking-normal text-white mb-5">
              Four tracks,
              <br />
              One company.
              <br />
            </h2>
          </div>

          {SOLUTIONS.map((sol, i) => (
            <div
              key={sol.id}
              ref={(el) => (textRefs.current[i] = el)}
              className="min-h-[60vh] flex flex-col justify-center px-[7vw] py-16"
            >
              <h3
                className="text-[clamp(38px,3vw,48px)] font-medium leading-[1.08] text-white mb-5"
                style={{ fontFamily: "DisplayFont" }}
              >
                {sol.title}
              </h3>

              <p className="text-[clamp(13px,1.5vw,17px)] font-normal leading-[1.75] text-white max-w-[42ch] mb-8">
                {sol.desc}
              </p>
            </div>
          ))}

          <div className="h-[40vh]" />
        </div>

        {/* ── RIGHT: image column — GSAP will pin this to viewport top */}
        <div
          ref={imageColRef}
          className="w-1/2 h-screen flex-shrink-0 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full h-full max-w-[520px] max-h-[380px] rounded-md overflow-hidden ">
              {SOLUTIONS.map((sol, i) => (
                <img
                  key={sol.id}
                  ref={(el) => (imageRefs.current[i] = el)}
                  src={sol.picsticky}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: "clip-path" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────────────────────────────────────────────────────────────
   3. DEEP DIVE STICKY
──────────────────────────────────────────────────────────────────────────── */
function DeepDive() {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const panelRefs = useRef([]);
  const [active, setActive] = useState(0);
  panelRefs.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = SOLUTIONS.length;
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
      });

      let currentIndex = 0;
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: `+=${total * 60}%`,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 0,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const nextIndex = Math.min(
            total - 1,
            Math.floor(self.progress * total),
          );
          if (nextIndex !== currentIndex) {
            const prev = currentIndex;
            currentIndex = nextIndex;
            setActive(nextIndex);
            const prevEl = panelRefs.current[prev];
            const nextEl = panelRefs.current[nextIndex];
            if (prevEl)
              gsap.to(prevEl, {
                autoAlpha: 0,
                y: prev < nextIndex ? -30 : 30,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => gsap.set(prevEl, { willChange: "auto" }),
              });
            if (nextEl)
              gsap.fromTo(
                nextEl,
                { autoAlpha: 0, y: nextIndex > prev ? 40 : -40 },
                { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
              );
          }
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const sol = SOLUTIONS[active];

  return (
    <div ref={wrapRef} className="sl-dd-wrap" data-navbar="dark">
      <div ref={stickyRef} className="sl-dd-sticky">
        <div className="sl-grid-bg" />
        <div className="sl-grain" />
        <div className="sl-dd-dots">
          {SOLUTIONS.map((s, i) => (
            <div
              key={i}
              className={`sl-dd-dot ${i === active ? "sl-dd-dot--on" : ""}`}
              style={{ "--acc": s.accent }}
            />
          ))}
        </div>
        <div className="relative z-[1] grid w-full grid-cols-1 md:grid-cols-2 items-center gap-x-[5vw] px-[7vw] pl-[10vw]">
          <div className="sl-dd-left">
            {SOLUTIONS.map((s, i) => (
              <div
                key={i}
                ref={(el) => (panelRefs.current[i] = el)}
                className="sl-dd-panel"
                style={{
                  willChange: i === active ? "opacity,transform" : "auto",
                }}
              >
                <h2 className="sl-dd-title">
                  {s.tagline}{" "}
                  <span
                    className="sl-dd-title2"
                    // style={{
                    //   background: `linear-gradient(135deg,${s.accent3} 0%,${s.accent2} 50%,${s.accent} 100%)`,
                    //   WebkitBackgroundClip: "text",
                    //   WebkitTextFillColor: "transparent",
                    //   backgroundClip: "text",
                    // }}
                  >
                    {s.tagline2}
                  </span>
                </h2>
                <p className="sl-dd-desc">{s.desc}</p>
                {/* <ul className="sl-dd-points">
                  {s.points.map((p) => (
                    <li key={p} className="sl-dd-point">
                      <span className="sl-dd-check" style={{ color: s.accent }}>
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
          <div className="sl-dd-right">
            <div className="sl-dd-canvas-wrap">
              {/* <div className="sl-dd-lottie">
                <RocketAnim />
              </div> */}

              <div className="sl-dd-lottie">
                <video className="rounded-full p-20" autoPlay loop  src="/videos/rocket.mp4"></video>
                </div>
            </div>
          </div>
        </div>
        <div className="sl-dd-counter">
          <span style={{ color: sol.accent }}>
            {String(active + 1).padStart(2, "0")}
          </span>
          <span> / {String(SOLUTIONS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. HOW IT WORKS
──────────────────────────────────────────────────────────────────────────── */
function HowItWorks() {
  const ref = useRef();
  const lineRef = useRef();
  const stepRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          invalidateOnRefresh: true,
        },
      });
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: 0, y: 32 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sl-how" data-navbar="light">
      <div className="sl-how-inner">
        <div className="sl-white-head">
          <h2 className="sl-title">
            How we work,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg,#0050d4 0%,#298dff 50%,#0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-light"
            >
              start to finish.
            </span>
          </h2>
        </div>
        <div ref={lineRef} className="sl-how-line" />
        <div className="sl-how-steps">
          {HOW_STEPS.map((step, i) => (
            <div
              key={step.n}
              ref={(el) => (stepRefs.current[i] = el)}
              className="sl-how-step"
            >
              <div className="sl-how-num">{step.n}</div>
              <div className="sl-how-step-burst">
                <RadialBurst color="#6366f1" />
              </div>
              <h3 className="sl-how-title">{step.title}</h3>
              <p className="sl-how-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. INDUSTRIES
──────────────────────────────────────────────────────────────────────────── */
function Industries() {
  const ref = useRef();
  const headRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
      const cards = gridRef.current?.querySelectorAll(".sl-ind-card");
      cards?.forEach((c, i) => {
        gsap.set(c, { autoAlpha: 0, scale: 0.9 });
        gsap.to(c, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: c,
            start: "top 92%",
            invalidateOnRefresh: true,
          },
        });
      });
      gsap.to(gridRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sl-industries" data-navbar="light">
      <div className="sl-grid-bg" />
      <div className="sl-grain" />
      <div className="sl-orb sl-orb--ind" />
      <div className="sl-industries-inner">
        <div ref={headRef} className="sl-white-head sl-industries-head">
          <h2 className="sl-section-title">
            We work across
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg,#0050d4 0%,#298dff 50%,#0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-light"
            >
              nine sectors.
            </span>
          </h2>
          <div className="absolute right-[-10%] top-[-100%]">
            <img
              src={book}
              alt="book svg"
              className="h-[1000px] w-[1000px] rotate-180 opacity-10 book-rotate"
            />
          </div>
        </div>
        <div ref={gridRef} className="grid grid-cols-3 gap-[20px]">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="group relative h-[40vh] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={ind.pic}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition brightness-200 duration-700 blur-2xl scale-105"
              />
              <div className="absolute inset-0 bg-black/40 hover:opacity-0 transition-all duration-300 m-2 z-[4] rounded-xl" />
              <img
                src={ind.pic}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:blur-lg transition duration-300 scale-100 p-2 z-[3] rounded-2xl"
              />
              <div className="absolute inset-0 rounded-2xl border border-white/10 z-[3]" />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 z-[4] pointer-events-none neon-border" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] text-white text-4xl uppercase tracking-widest font-bold text-center whitespace-nowrap">
                <GlitchText text={ind.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Case Studies helpers
──────────────────────────────────────────────────────────────────────────── */
function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7H13M13 7L8 2M13 7L8 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Scanlines() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.032,
        mixBlendMode: "screen",
      }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="cs-sl"
          x="0"
          y="0"
          width="1"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cs-sl)" />
    </svg>
  );
}

function CornerMark({ color }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      style={{ position: "absolute", top: 18, right: 18, opacity: 0.7 }}
    >
      <path d="M26 0V11" stroke={color} strokeWidth="1.3" />
      <path d="M15 0H26" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function CaseCard({ cs, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const primaryStat = cs.stats?.[0];
  const statDisplay = primaryStat
    ? `${primaryStat.value}${primaryStat.suffix}`
    : null;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 0, y: 52 });
    gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        invalidateOnRefresh: true,
      },
    });
  }, [index]);

  return (
    <a
      ref={cardRef}
      href={`/work/${cs.id}`}
      className="cs2-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--accent": cs.accent, textDecoration: "none" }}
    >
      <div className="cs2-img-wrap">
        <img
          src={cs.heroImage}
          alt={cs.title}
          className={`cs2-img${hovered ? " cs2-img-hovered" : ""}`}
          loading="lazy"
        />
        <div
          className="cs2-overlay"
          style={{
            background: hovered
              ? "linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.8) 38%,rgba(0,0,0,0.3) 100%)"
              : "linear-gradient(to top,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.2) 44%,rgba(0,0,0,0.05) 100%)",
          }}
        />
        {/* <Scanlines /> */}
      </div>
      <div className="cs2-topbar">
        <span className="cs2-num" style={{ color: cs.accent }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cs2-eyebrow">
          {cs.category}&nbsp;·&nbsp;{cs.year}
        </span>
        {/* <CornerMark color={cs.accent} /> */}
      </div>
      <div className="cs2-bottom">
        {/* <div className={`cs2-sub${hovered ? " cs2-sub-visible" : ""}`}>
          {cs.tagline}
        </div> */}
        <div className="cs2-info">
          <div>
  <h3 className="cs2-client">{cs.title}</h3>
  {statDisplay && (
    <div className={`cs2-stat${hovered ? " cs2-stat-visible" : ""}`}>
      {statDisplay}&nbsp;
      <span className="cs2-stat-label">{primaryStat.label}</span>
    </div>
  )}
</div>
          {/* <div
            className={`cs2-cta${hovered ? " cs2-cta-visible" : ""}`}
            style={{ color: cs.accent, borderColor: `${cs.accent}44` }}
          >
            <ArrowRight size={13} />
          </div> */}
        </div>
        {/* <div className={`cs2-tags${hovered ? " cs2-tags-visible" : ""}`}>
          {cs.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="cs2-tag"
              style={{
                color: "#000",
                
                background: "#ddd",
              }}
            >
              {t}
            </span>
          ))}
        </div> */}
        <div
          className="cs2-line bg-[#fcfcf7]"
          style={{
            
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>
    </a>
  );
}

function CaseStudies() {
  const ref = useRef();
  const headRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section data-navbar="light" ref={ref} className="cs2-section">
      <div className="sl-grain" />
      <div className="cs2-inner">
        <div ref={headRef} className="cs2-head">
          <div className="cs2-head-row">
            <h2 className="cs2-title">
              Solutions we've already shipped.
              <br />
            </h2>
            <div className="flex justify-end">
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: "10%",
                  height: "10%",
                  animation: "spin 10s linear infinite",
                }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#C200D0"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="12 18"
                />
              </svg>
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: "20%",
                  height: "20%",
                  animation: "spin 10s linear infinite",
                }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#C200D0"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="12 18"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="cs2-grid">
          {CASE_STUDIES.slice(0, 6).map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>
        <div className="cs2-footer">
          <a href="/work" className="text-[#fcfcf7] border border-[#fcfcf7] rounded-full px-4 py-2">
            See all case studies
            <span className="cs2-footer-arrow">
              <ArrowRight size={12} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. FAQ
──────────────────────────────────────────────────────────────────────────── */
function FAQ_Section() {
  const ref = useRef();
  const headRef = useRef();
  const [open, setOpen] = useState(null);
  const answerRefs = useRef([]);

  const toggle = (i) => {
    const prev = open;
    setOpen(open === i ? null : i);
    answerRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === i && open !== i) {
        gsap.fromTo(
          el,
          { maxHeight: 0, opacity: 0 },
          { maxHeight: 500, opacity: 1, duration: 0.45, ease: "power3.out" },
        );
      } else if (idx === prev) {
        gsap.to(el, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
      const items = ref.current?.querySelectorAll(".sl-faq-item");
      items?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 20 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section data-navbar="light" ref={ref} className="sl-faq">
      <div className="sl-faq-inner">
        <div className="sl-faq-layout">
          <div ref={headRef} className="sl-faq-head">
            <h2 className="sl-title">
              Questions answered.
              <br />
            </h2>
            <p className="sl-sub-dark">
              Still have questions? Email us at support@algonsolutions.com — we
              reply within 24 hours.
            </p>
          </div>
          <div className="sl-faq-list">
            {FAQ.map((item, i) => (
              <div key={i} className="sl-faq-item" onClick={() => toggle(i)}>
                <div className="sl-faq-q">
                  <span>{item.q}</span>
                  <span
                    className="sl-faq-icon"
                    style={{
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  ref={(el) => (answerRefs.current[i] = el)}
                  className="sl-faq-a"
                  style={{ maxHeight: 0, overflow: "hidden", opacity: 0 }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. CTA
──────────────────────────────────────────────────────────────────────────── */
function SolCTA() {
  const ref = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".sl-cta-el");
      gsap.set(els, { autoAlpha: 0, y: 26 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          invalidateOnRefresh: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sl-cta">
      <div className="sl-cta-inner">
        <h2 className="sl-cta-head sl-cta-el">
          Your solution <br /> starts here.
          <br />
        </h2>
        <p className="sl-cta-sub sl-cta-el">
          Tell us about your challenge. We'll tell you which track fits best and
          what it would take to solve it.
        </p>
        <div className="sl-cta-actions sl-cta-el">
          <a href="/contact" className="sl-cta-btn   rounded-full bg-[#050508] border border-[#fcfcf7] px-8 py-3 hover:bg-[#050508] hover:text-[#fcfcf7] transition-all duration-300">
            Start the conversation
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              style={{ marginLeft: 10 }}
            >
              <path
                d="M1 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* <a href="mailto:support@algonsolutions.com" className="sl-cta-ghost">
            support@algonsolutions.com
          </a> */}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesnew() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 })
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%", once: true },
      })

      // One ScrollTrigger + one staggered tween drives all cards —
      // this avoids creating 6 separate IntersectionObservers.
      const cards = gridRef.current.querySelectorAll(".cs2-card")
      gsap.set(cards, { autoAlpha: 0, y: 52 })
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: "top 88%", once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const cases = useMemo(() => CASE_STUDIES.slice(0, 6), [])

  return (
    <section data-navbar="light" ref={sectionRef} className="cs2-section">
      <div className="cs2-inner">
        <div ref={headRef} className="cs2-head w-screen">
          <div className="cs2-head-row w-screen">
            <h2 className="cs2-title">Solutions we've already shipped.</h2>
            <div className="hidden lg:absolute  right-0 w-30 h-30" aria-hidden="true">
              <svg className="cs2-ring cs2-ring--sm" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" stroke="#C200D0" strokeWidth="12" fill="none" strokeDasharray="12 18" />
              </svg>
              <svg className="cs2-ring cs2-ring--lg" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" stroke="#C200D0" strokeWidth="12" fill="none" strokeDasharray="12 18" />
              </svg>
            </div>
          </div>
        </div>

        <div className="cs2-grid" ref={gridRef}>
          {cases.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} />
          ))}
        </div>

        <div className="cs2-footer">
          <a href="/work" className=" flex text-[#fcfcf7] text-[18px] hover:bg-[#fcfcf7] hover:text-[#050508] transition-all duration-300   border border-[#fcfcf7] rounded-full px-6 py-3">
            See all case studies
            <span className=" ml-2 cs2-footer-arrow">
              <ArrowRight size={12} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}



/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function SolutionsPage() {
  return (
    <>
      <style>{`
        .sl-grain{position:absolute;inset:0;pointer-events:none;z-index:0;opacity:0.025;background-image:${grain};background-size:200px 200px;}
        .sl-grid-bg{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px);background-size:64px 64px;}
        .sl-grid-neon{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(74,111,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(74,111,255,0.055) 1px,transparent 1px);background-size:64px 64px;}
        .sl-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;}
        .sl-orb--hr{top:-12%;right:-5%;width:60vw;height:60vw;max-width:700px;max-height:700px;background:radial-gradient(ellipse,rgba(40,80,255,0.12) 0%,transparent 65%);filter:blur(2px);}
        .sl-orb--hl{bottom:-5%;left:-8%;width:38vw;height:38vw;max-width:440px;max-height:440px;background:radial-gradient(ellipse,rgba(147,51,234,0.07) 0%,transparent 65%);}
        .sl-orb--ind{top:30%;right:-5%;width:50vw;height:50vw;max-width:600px;max-height:600px;background:radial-gradient(ellipse,rgba(40,80,255,0.07) 0%,transparent 65%);}
        .sl-orb--cta{bottom:-20%;right:-5%;width:60vw;height:60vw;max-width:700px;max-height:700px;background:radial-gradient(ellipse,rgba(40,80,255,0.1) 0%,transparent 65%);}
        .sl-eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin:0 0 16px;display:block;}
        .sl-eyebrow-dark{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#8b2fe1;margin:0 0 16px;display:block;}
        .sl-rule{width:100%;height:1px;background:rgba(255,255,255,0);margin-bottom:0px;}
        .sl-outline-text{-webkit-text-stroke:1.5px rgba(255,255,255,0.4);color:transparent;}
        .sl-dark-outline{color:#8b2fe1;}
        .sl-section-title{font-size:clamp(32px,4.5vw,66px);font-weight:200;line-height:1.05;letter-spacing:-0.03em;color:#fcfcf7;margin:0;}
        .sl-title-dark{font-size:clamp(56px,4.5vw,74px);font-weight:500;line-height:1.05;letter-spacing:-0.03em;color:#0f0f0f;margin:0;text-align:start;}
        .sl-title{font-size:clamp(32px,4.5vw,64px);font-weight:500;line-height:1.05;color:#fcfcf7;margin:0;}
        .sl-section-head{margin-bottom:64px;}.sl-white-head{margin-bottom:64px;}
        .sl-sub-dark{font-weight:300;font-size:clamp(14px,1.1vw,16px);line-height:1.72;color:rgba(252,252,247,.6);max-width:50ch;margin:16px 0 0;}
        .sl-hero{position:relative;height:100vh;padding-top:40px;padding-bottom:70px; overflow:hidden}
        .sl-hero-ghost{position:absolute;bottom:5%;right:3vw;font-weight:700;font-size:clamp(80px,14vw,200px);line-height:1;letter-spacing:-0.05em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.04);pointer-events:none;z-index:0;user-select:none;}
        .sl-hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:1fr 460px;gap:0 5vw;align-items:center;padding:30px 7vw 40px;max-width:1500px;}
        .neon-border{border:1px solid #ba41f2;box-shadow:0 0 8px #ba41f2,0 0 16px #ba41f2,0 0 32px #8b2fe1,inset 0 0 10px rgba(186,65,242,0.4);}
        .sl-hero-h1{font-weight:400;font-size:clamp(60px,7.5vw,100px);line-height:0.95;letter-spacing:-0.04em;color:#fcfcf7;margin:0 0 28px;}
        .sl-h1-neon{color:#8b2fe1;}
        .sl-hero-sub{font-size:clamp(14px,1.2vw,18px);font-weight:200;line-height:1.72;color:rgba(255,255,255,0.42);max-width:44ch;margin:0;}
        .sl-hero-pills{display:flex;gap:10px;flex-wrap:wrap;}
        .sl-pill{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.12);padding:6px 14px;border-radius:100px;}
        .sl-hero-canvas{position:absolute;height:240%;width:150%;transform:translateY(0vw);overflow:visible;}
        .sl-cvs-lbl{position:absolute;font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.18);pointer-events:none;user-select:none;}
        .sl-cvs-lbl--tl{top:12px;left:12px;}.sl-cvs-lbl--br{bottom:12px;right:12px;}
        .sl-hero-stats{position:relative;z-index:0;display:flex;gap:0;padding:0 7vw;margin-bottom:0;border-top:1px solid rgba(255,255,255,0.07);box-sizing:border-box;width:100%;}
        .sl-hstat{display:flex;flex-direction:column;gap:4px;padding:28px 48px 28px 0;}
        .sl-hstat-n{font-size:clamp(36px,2.5vw,36px);font-weight:500;letter-spacing:-0.03em;color:rgba(255,255,255,0.8);line-height:1;}
        .sl-hstat-l{font-size:14px;letter-spacing:0.2em;color:rgba(255,255,255,0.4);}
        .sl-marq-wrap{position:absolute;left:0;right:0;bottom:0;z-index:5;border-top:1px solid rgba(255,255,255,0.1);border-bottom:1px solid rgba(255,255,255,0.1);padding:18px 0;overflow:hidden;background:rgba(5,5,8,0.25);}
        .sl-marq-track{display:flex;white-space:nowrap;will-change:transform;}
        .sl-marq-item{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.4);padding:0 28px;display:inline-flex;align-items:center;gap:10px;}
        .sl-marq-dot{font-size:7px;color:rgba(255,255,255,0.4);}
        .sl-overview{position:relative;background:#fcfcf7;padding:120px 7vw 140px;overflow:hidden;}
        .sl-overview-inner{position:relative;z-index:1;}
        .sl-ov-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;}
        .sl-ov-card{position:relative;border-radius:5px;background:#f2f2f2;border:0px solid #e5e7eb;overflow:hidden;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.4s;will-change:transform;}
        .sl-ov-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(0,0,0,0.08);}
        .sl-ov-burst{position:absolute;top:50%;right:24px;transform:translateY(-50%);width:110px;height:110px;opacity:0.35;pointer-events:none;z-index:0;}
        .sl-ov-card-body{position:relative;z-index:1;padding:36px 32px 72px;}
        .sl-ov-title,.sl-ov-desc,.sl-ov-tagline,.sl-ov-points,.sl-ov-industries{position:relative;z-index:2;}
        .sl-ov-num{position:absolute;z-index:0;font-size:60px;font-weight:700;letter-spacing:0.22em;margin-bottom:14px;opacity:0.15;}
        .sl-ov-title{font-size:clamp(35px,6vw,50px);z-index:2;font-weight:500;letter-spacing:-0.005em;color:#050508;margin:0 0 12px;max-width:10ch;}
        .sl-ov-tagline{font-size:13px;letter-spacing:0.04em;margin:0 0 16px;font-weight:300;}
        .sl-ov-desc{font-size:18px;line-height:1.72;color:#050508;margin:0 0 20px;max-width:30ch;font-weight:400;}
        .sl-ov-points{display:flex;flex-direction:column;gap:6px;margin-bottom:20px;}
        .sl-ov-point{font-size:12px;color:#374151;display:flex;align-items:baseline;gap:0;font-weight:300;}
        .sl-ov-industries{display:flex;flex-wrap:wrap;gap:6px;}
        .sl-ov-ind{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;border:1px solid;padding:3px 9px;}
        .sl-ov-bar{position:absolute;bottom:0;left:0;right:0;height:0px;opacity:0.7;}
        @keyframes floatSoft{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-10px) rotate(1deg)}}
        @keyframes floatWide{0%,100%{transform:translate(0px,0px)}50%{transform:translate(-8px,-12px)}}
        .animate-float-soft{animation:floatSoft 5s ease-in-out infinite;}
        .animate-float-wide{animation:floatWide 7s ease-in-out infinite;}
        .sl-dd-wrap{position:relative;}
        .sl-dd-sticky{position:relative;width:100%;height:100vh;background:#fcfcf7;overflow:hidden;display:flex;align-items:center;}
        .sl-dd-dots{position:absolute;left:3vw;top:50%;transform:translateY(-50%);z-index:20;display:flex;flex-direction:column;gap:10px;}
        .sl-dd-dot{width:6px;height:6px;border-radius:50%;background:rgba(0,0,0,0.12);transition:background 0.4s,transform 0.4s;}
        .sl-dd-dot--on{background:var(--acc,#4a6fff);transform:scale(1.6);}
        .sl-dd-inner{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:0 5vw;width:100%;padding:0 7vw 0 10vw;align-items:center;}
        .sl-dd-left{position:relative;height:280px;}
        .sl-dd-panel{position:absolute;top:0;left:0;right:0;will-change:opacity,transform;}
        .sl-dd-lottie{position:relative;opacity:100;width:100%;height:100%;display:flex;align-items:center;justify-content:center;}
        .sl-dd-lottie svg{width:300px;height:300px;}
        .sl-dd-title{font-size:clamp(40px,3vw,46px);font-weight:400;letter-spacing:-0.03em;color:#050508;margin:0 0 10px;line-height:1.1;}
        .sl-dd-title2{font-size:clamp(40px,3vw,46px);font-weight:500;letter-spacing:-0.03em;color:#050508;margin:0 0 10px;line-height:1.1;}
        .sl-dd-desc{font-size:clamp(18px,1.1vw,16px);font-weight:400;line-height:1.75;color:rgba(5,5,8,1);max-width:46ch;margin:0 0 24px;}
        .sl-dd-points{list-style:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:8px;}
        .sl-dd-point{font-size:15px;color:rgba(5,5,8,0.8);font-weight:300;display:flex;align-items:center;gap:8px;}
        .sl-dd-check{font-size:14px;}
        .sl-dd-right{position:relative;}
        .sl-dd-canvas-wrap{position:relative;height:500px;overflow:hidden;border-radius:20px;}
        .sl-dd-counter{position:absolute;bottom:28px;right:7vw;z-index:20;font-size:30px;font-weight:500;opacity:.7;color:rgba(5,5,8,0.22);}
        .sl-how{position:relative;background:#050508;padding:120px 7vw 140px;border-top:1px solid #f3f4f6;}
        .sl-how-inner{position:relative;z-index:1;}
        .sl-how-line{width:100%;height:2px;background:rgba(255,255,255,.0);margin:48px 0 64px;}
        .sl-how-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:0;}
        .sl-how-step{position:relative;padding-right:20px;padding-left:10px;border-right:2px solid rgba(255,255,255,.0);}
        .sl-how-step:last-child{border-right:none;padding-right:0;}
        .sl-how-num{font-size:30px;font-weight:500;color:#8b2fe1;margin-bottom:12px;opacity:.7;}
        .sl-how-step-burst{position:absolute;top:-10px;right:20px;width:60px;height:60px;opacity:0.3;pointer-events:none;}
        .sl-how-title{font-size:clamp(18px,1.6vw,22px);font-weight:300;letter-spacing:-0.02em;color:#eee;margin:0 0 12px;}
        .sl-how-desc{font-size:13px;line-height:1.72;font-weight:300;color:#6b7280;margin:0;}
        .sl-industries{position:relative;background:#050508;padding:100px 7vw 120px;border-top:1px solid rgba(5,5,8,0.06);overflow:hidden;}
        .sl-industries-inner{position:relative;z-index:1;}
        .sl-industries-head{color:#050508;}
        .sl-ind-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(5,5,8,0.06);}
        .sl-ind-card{position:relative;background:#050508;padding:32px 28px;display:flex;align-items:center;gap:14px;overflow:hidden;transition:background 0.3s;cursor:default;}
        .sl-ind-card:hover{background:rgba(100,100,100,.3);}
        .sl-tech{position:relative;background:#050508;padding:100px 7vw 120px;border-top:1px solid #050508;}
        .sl-tech-inner{position:relative;z-index:1;}
        .sl-tech-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 32px;}
        .sl-tech-cat-label{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#9ca3af;margin-bottom:16px;}
        .sl-tech-pills{display:flex;flex-wrap:wrap;gap:8px;}
        .sl-pill-item{font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:0.06em;color:#fcfcf7;background:rgba(29,126,168,0.3);padding:6px 14px;border-radius:100px;transition:background 0.25s,border-color 0.25s,color 0.25s;}
        .sl-pill-item:hover{background:#eef2ff;border-color:#c7d2fe;color:#4338ca;}
        .sl-faq{position:relative;background:#050508;padding:100px 7vw 120px;border-top:1px solid #050508;}
        .sl-faq-inner{position:relative;z-index:1;}
        .sl-faq-layout{display:grid;grid-template-columns:1fr 1.6fr;gap:0 8vw;align-items:start;}
        .sl-faq-head{position:sticky;top:100px;}
        .sl-faq-list{display:flex;flex-direction:column;}
        .sl-faq-item{border-bottom:1px solid rgba(100,100,100,.1);padding:24px 0;cursor:pointer;transition:background 0.2s;}
        .sl-faq-item:first-child{border-top:1px solid rgba(100,100,100,.1);}
        .sl-faq-q{display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:clamp(15px,1.3vw,18px);font-weight:300;color:rgba(255,255,255,1);}
        .sl-faq-icon{font-size:22px;font-weight:300;color:#9ca3af;flex-shrink:0;line-height:1;user-select:none;}
        .sl-faq-a{overflow:hidden;}
        .sl-faq-a p{font-size:14px;line-height:1.75;color:#6b7280;margin:12px 0 0;}
        .sl-cta{position:relative;background:#050508;padding:130px 7vw 150px;overflow:hidden;}
        .sl-cta-inner{position:relative;z-index:1;}
        .sl-cta-head{font-size:clamp(48px,8vw,120px);font-weight:400;line-height:0.94;letter-spacing:-0.02em;color:#fcfcf7;margin:0 0 24px;}
        .sl-cta-sub{font-size:clamp(14px,1.4vw,20px);font-weight:300;line-height:1.72;color:rgba(255,255,255,0.7);max-width:44ch;margin:0 0 48px;}
        .sl-cta-actions{display:flex;align-items:center;gap:32px;flex-wrap:wrap;}
        .sl-cta-btn{display:inline-flex;align-items:center;color:#fcfcf7;background:transparent;padding:16px 36px;transition:background 0.25s;
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             12px;
          
          font-size:       clamp(14px, 1.2vw, 18px);
          font-weight:     400;
          cursor:          pointer;
          text-decoration: none;
          outline:         none;
        }
          .sl-cta-btn:hover{background:#fcfcf7;color:#050508;}
        .sl-cta-ghost{font-size:13px;letter-spacing:0.08em;text-decoration:none;color:rgba(255,255,255,0.3);transition:color 0.25s;}
        .sl-cta-ghost:hover{color:rgba(255,255,255,0.7);}
        .cs2-section{position:relative;background:#050508;padding:150px 6vw 130px;overflow:hidden;}
        .cs2-inner{position:relative;z-index:1;max-width:1320px;margin:0 auto;}
        .cs2-head{margin-bottom:56px;}
        .cs2-head-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;}
        .cs2-title{font-size:clamp(38px,5vw,68px);font-weight:500;letter-spacing:-0.02em;line-height:1.05;color:#fcfcf7;margin:10px;}
        .cs2-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,250px);gap:12px;margin-bottom:44px;}
        .cs2-card{position:relative;border-radius:14px;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,0.07),0 24px 60px rgba(0,0,0,0.55);transition:box-shadow 0.4s;}
        .cs2-card::after{content:'';position:absolute;inset:0;border-radius:14px;border:1px solid transparent;transition:border-color 0.4s;z-index:4;pointer-events:none;}
        .cs2-card:hover::after{border-color:#fcfcf7;opacity:0.3;}
        .cs2-card:hover{box-shadow:0 0 0 1px #fcfcf7,0 28px 70px rgba(0,0,0,0.65);}
        .cs2-img-wrap{position:absolute;inset:0;}
        .cs2-img{width:100%;height:100%;object-fit:cover;transition:transform 0.9s cubic-bezier(0.22,1,0.36,1),filter 0.7s ease;filter:saturate(0.72) ;}
        .cs2-img-hovered{transform:scale(1.06);filter:saturate(0.92) ;}
        .cs2-overlay{position:absolute;inset:0;transition:background 0.6s ease;z-index:1;}
        .cs2-topbar{position:relative;z-index:3;opacity:0;display:flex;align-items:baseline;gap:12px;padding:22px 22px 0;}
        .cs2-num{font-family:'DM Mono','Courier New',monospace;font-size:10px;letter-spacing:0.25em;font-weight:500;opacity:0;}
        .cs2-eyebrow{font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:'DM Sans',sans-serif;}
        .cs2-bottom{position:relative;z-index:3;padding:0 20px 18px;}
        .cs2-sub{font-size:14px;color:rgba(255,255,255,1);line-height:1.5;margin-bottom:8px;max-height:0;overflow:hidden;opacity:0;transition:max-height 0.45s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease;}
        .cs2-sub-visible{max-height:60px;opacity:0;}
        .cs2-info{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:10px;}
        @keyframes slowRotate{from{transform:rotate(180deg)}to{transform:rotate(540deg)}}
        .book-rotate{animation:slowRotate 38s linear infinite;transform-origin:center center;}
        .cs2-client{font-size:clamp(20px,2vw,28px);font-weight:700;letter-spacing:0.035em;color:#fcfcf7;margin:0 0 4px;line-height:1;}
.cs2-stat{
  font-size:20px;
  font-weight:700;
  display:flex;
  align-items:baseline;
  gap:4px;
  max-height:0;
  overflow:hidden;
  opacity:0;
  transition:max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
}
.cs2-stat-visible{
  max-height:32px;
  opacity:1;
}
        .cs2-cta{width:38px;height:38px;border-radius:50%;border:2px solid;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:10px;opacity:0;transform:scale(0.65) translateY(8px);transition:opacity 0.s ease,transform 0.4s cubic-bezier(0.22,1,0.36,1);}
        .cs2-cta-visible{opacity:1;transform:scale(1) translateY(0);}
        .cs2-tags{display:flex;gap:6px;flex-wrap:wrap;max-height:0;overflow:hidden;opacity:0;margin-bottom:0;transition:max-height 0.45s cubic-bezier(0.22,1,0.36,1),opacity 0.35s ease,margin-bottom 0.3s;}
        .cs2-tags-visible{max-height:40px;opacity:1;margin-bottom:4px;}
        .cs2-tag{font-size:10px;text-transform:none;letter-spacing:0.1em;font-weight:700;padding:3px 8px;border-radius:40px;border:1px solid;white-space:nowrap;}
        .cs2-line{position:absolute;bottom:0;left:0;right:0;height:5px;transform-origin:left;opacity:0.72;transition:transform 0.55s cubic-bezier(0.22,1,0.36,1);}
        .cs2-footer{display:flex;align-items:center;justify-content:center;padding-top:20px;}
        .cs2-footer-link{position:relative;overflow:hidden;font-weight:500;display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:0.13em;text-transform:uppercase;padding:10px 20px;border-radius:5px;color:#fcfcf7;text-decoration:none;background:linear-gradient(135deg,#0050d4 0%,#298dff 50%,#0050d4 100%);transition:filter 0.35s ease,transform 0.35s ease,box-shadow 0.35s ease;box-shadow:0 10px 30px rgba(29,126,168,0.28),inset 0 1px 0 rgba(255,255,255,0.18);}
        .cs2-footer-link::before{content:"";position:absolute;top:-250%;left:-40%;width:45%;height:320%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 35%,rgba(255,255,255,0.5) 50%,rgba(255,255,255,0.08) 65%,transparent 100%);transform:rotate(24deg) translateX(-250%);animation:cs2Shimmer 3.8s linear infinite;pointer-events:none;}
        .cs2-footer-link>*{position:relative;z-index:2;}
        .cs2-footer-link:hover{filter:brightness(0.82);transform:translateY(-1px);}
        .cs2-footer-link:active{transform:translateY(0);filter:brightness(0.78);}
        @keyframes cs2Shimmer{0%{transform:rotate(20deg) translateX(-260%)}100%{transform:rotate(20deg) translateX(520%)}}
        .cs2-footer-link:hover{color:rgba(252,252,247,1);}
        .cs2-footer-arrow{display:flex;align-items:center;transition:transform 0.25s;}
        .cs2-footer-link:hover .cs2-footer-arrow{transform:translateX(4px);}
        @keyframes rburst{0%{stroke-dashoffset:1;opacity:1}15%{opacity:1}30%{opacity:0}50%{opacity:0}70%{stroke-dashoffset:0;opacity:0}85%{stroke-dashoffset:0;opacity:0}100%{stroke-dashoffset:1;opacity:0}}
        @media(max-width:1024px){
          .cs2-grid{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(3,290px);}
          .sl-hero-inner{grid-template-columns:1fr;margin-top:100px;}
          .sl-hero-canvas{position:absolute;height:150%;padding:0;margin-top:100px;width:100%;transform:translateY(-30vh);overflow:visible;}
          .sl-ov-grid{grid-template-columns:1fr;}
          .sl-dd-inner{grid-template-columns:1fr;padding:0 6vw 0 12vw;}
          .sl-how-steps{grid-template-columns:repeat(2,1fr);gap:36px 0;}
          .sl-how-step{border-right:none;border-bottom:1px solid #e5e7eb;padding:0 0 32px;}
          .sl-how-step:last-child{border-bottom:none;}
          .sl-ind-grid{grid-template-columns:repeat(2,1fr);}
          .sl-tech-grid{grid-template-columns:repeat(2,1fr);}
          .sl-cs-grid{grid-template-columns:1fr;}
          .sl-faq-layout{grid-template-columns:1fr;}
          .sl-faq-head{position:static;margin-bottom:48px;}
        }
        @media(max-width:640px){
          .sl-dd-dots{opacity:0;}
          .cs2-section{padding:72px 5vw 90px;}
          .sl-title-dark{text-align:center}
          .sl-dd-canvas-wrap{position:relative;height:300px;}
          .cs2-grid{grid-template-columns:1fr;grid-template-rows:repeat(6,250px);gap:10px;}
          .cs2-head-row{flex-direction:column;align-items:flex-start;gap:12px;}
          .sl-cvs-lbl{opacity:0;}
          .sl-ind-grid{grid-template-columns:1fr;}
          .sl-dd-inner{grid-template-columns:1fr;padding:0 6vw 0 12vw;}
          .sl-tech-grid{grid-template-columns:1fr;}
          .sl-how-steps{grid-template-columns:1fr;}
          .sl-hero-stats{flex-wrap:wrap;}
          .sl-hstat{padding:20px 24px 20px 0;flex:1 1 calc(50% - 12px);}
        }
      `}</style>

      <div
        style={{ background: "#050508", color: "#fcfcf7", minHeight: "100vh" }}
      >
        <Navbar />
        <SolHero />
        <ScrollIndicator />
        <SolOverview />
        <SolOverviewpc />
        <CaseStudiesnew/>
        
        <DeepDive />
        <FAQ_Section />
        <SolCTA />
        <Footer />
      </div>
    </>
  );
}
