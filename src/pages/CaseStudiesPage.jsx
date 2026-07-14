/**
 * CaseStudiesPage.jsx
 *
 * Case studies index page — matches Algon About page aesthetic.
 *
 * Sections:
 *   1. Hero        — animated title + floating tag pills
 *   2. Filter Bar  — category filters with active-slide indicator
 *   3. Grid        — full-bleed project cards, hover parallax + reveal
 *   4. CTA Strip   — bottom contact nudge
 *
 * DEPS: gsap + ScrollTrigger (already in project), react-router-dom
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "../data/caseStudiesData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollIndicator from "../components/ui/ScrollIndicator";
import animationData from "/src/assets/portfolio.json";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated SVG decorations ───────────────────────────────────────────── */
function SpinRing({ size = 200, accent = "#298dff", speed = 18 }) {
  return (  
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      style={{
        animation: `cs-spin ${speed}s linear infinite`,
        opacity: 0.3,
        pointerEvents: "none",
      }}
    >
      <circle cx="100" cy="100" r="90" stroke={accent} strokeWidth="0.6" strokeDasharray="8 6" />
      <circle cx="100" cy="100" r="70" stroke={accent} strokeWidth="0.4" strokeDasharray="4 8" />
      <circle cx="100" cy="100" r="50" stroke={accent} strokeWidth="0.6" strokeDasharray="2 6" />
      <polygon points="100,10 104,96 100,100 96,96" fill={accent} opacity="1" />
    </svg>
  );
}

function PulsingDot({ accent = "#298dff" }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: accent,
        boxShadow: `0 0 12px ${accent}`,
        animation: "cs-pulse 2s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
  );
}

function PortfolioCTA() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".pf-cta-el");
      gsap.set(els, { autoAlpha: 0, y: 28 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pf-cta" data-navbar="light">
      {/* <div className="pf-cta-orb" />
      <div className="pf-grid-bg" />
      <div className="pf-grain" /> */}
      <div className="pf-cta-inner">
        {/* <p className="pf-eyebrow pf-cta-el">Start a project</p> */}
        <h2 className="pf-cta-head pf-cta-el">
          Your project <br /> could be next.
          <br />
          {/* <span
            style={{
              background:
"linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="font-light"
          >
            could be next.
          </span> */}
        </h2>
        <p className="pf-cta-sub pf-cta-el">
          We take on a limited number of new projects each quarter.
          <br />
          Tell us about yours before the spots fill up.
        </p>
        <div className="pf-cta-actions pf-cta-el">
          <a href="/contact" className="sl-cta-btn flex items-center justify-center rounded-full bg-[#050508] border border-[#fcfcf7] px-8 py-3 hover:bg-[#fcfcf7] hover:text-[#050508] transition-all duration-300">
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
          
        </div>
      </div>
    </section>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function CaseStudiesHero() {
  const heroRef = useRef();
  const h1Ref = useRef();
  const subRef = useRef();
  const eyebrowRef = useRef();
  const tagsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const ALL_TAGS = [...new Set(CASE_STUDIES.flatMap((s) => s.tags))];

  const onMouseMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([h1Ref.current, subRef.current, eyebrowRef.current, tagsRef.current], {
        autoAlpha: 0,
        y: 40,
      });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(h1Ref.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.1)
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3)
        .to(tagsRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.45);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} data-navbar="light" className="cs-hero" onMouseMove={onMouseMove}>
      {/* <div className="ab-grid-neon" />
      <div className="ab-grain" />
      <div className="cs-orb cs-orb--r" />
      <div className="cs-orb cs-orb--l" /> */}

      {/* Ghost word */}
      <div className="cs-ghost" aria-hidden="true">Work</div>

      {/* Spinning rings — decorative */}
      {/* <div className="cs-ring cs-ring--1" aria-hidden="true">
        <SpinRing size={520} accent="#298dff" speed={22} />
      </div>
      <div className="cs-ring cs-ring--2" aria-hidden="true">
        <SpinRing size={180} accent="#298dff" speed={14} />
      </div> */}

      <div className="cs-hero-inner grid grid-cols-2 w-screen relative">

        <div className="flex flex-row md:flex-col justify-center pt-10">

        <h1 ref={h1Ref} className="cs-hero-h1 text-center md:text-start">
          <h1>Projects that <br /></h1> <span>moved the </span> <h1 className="bg-[#298dff] mt-4 w-fit -py-2 pr-2"> needle.</h1>
          {/* <span
            style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="font-light"
          >
            moved the needle.
          </span> */}
        </h1>

       
        </div>

        <div className="overflow-hidden flex justify-center">
            <div className="w-screen md:w-[40vw] h-[40vh] md:h-[80vh] overflow-hidden flex justify-center items-center ">
              <Lottie className="h-full md:h-[80%]" animationData={animationData} />
            </div>
          </div>

      </div>

      {/* Scroll indicator */}
      {/* <div className="cs-scroll-hint">
        <span className="cs-scroll-line" />
        <span className="ab-eyebrow" style={{ marginBottom: 0, color: "rgba(255,255,255,0.18)" }}>
          scroll
        </span>
      </div> */}
    </section>
  );
}

/* ─── FILTER BAR ─────────────────────────────────────────────────────────── */
const ALL_CATS = ["All", ...new Set(CASE_STUDIES.map((s) => s.category.split(" ")[0]))];

function FilterBar({ active, onChange }) {
  const barRef = useRef();
  const pillRefs = useRef({});
  const slideRef = useRef();

  const move = useCallback(
    (cat) => {
      const el = pillRefs.current[cat];
      const bar = barRef.current;
      const slide = slideRef.current;
      if (!el || !bar || !slide) return;

      const br = bar.getBoundingClientRect();
      const er = el.getBoundingClientRect();

      gsap.to(slide, {
        x: er.left - br.left,
        width: er.width,
        duration: 0.4,
        ease: "power3.inOut",
      });

      onChange(cat);
    },
    [onChange]
  );

  useEffect(() => {
    move("All");
  }, []);

  return (
    <div className="w-full bg-[#fcfcf7] pt-10" data-navbar="dark">
      {/* Heading like Our Clients */}
      <div
        className="flex justify-center"
        style={{ marginBottom: 38, position: "relative" }}
      >
        <h2
          style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Case Studies
          {/* <span
            className="font-light"
            style={{
              background:
                "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Studies
          </span> */}
        </h2>
      </div>

      {/* Filter Pills */}
      <div ref={barRef} className="cs-filter-bar">
        <div ref={slideRef} className="cs-filter-slide" />

        {ALL_CATS.map((cat) => (
          <button
            key={cat}
            ref={(el) => (pillRefs.current[cat] = el)}
            className={`cs-filter-btn ${
              active === cat ? "cs-filter-btn--active" : ""
            }`}
            onClick={() => move(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
function ProjectCard({ study }) {
  const cardRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { autoAlpha: 0, y: 50 });
      gsap.to(cardRef.current, {
        autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const onEnter = () => gsap.to(imgRef.current, { scale: 1.05, duration: 0.65, ease: "power2.out" });
  const onLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 0.6,  ease: "power2.out" });

  return (
    <Link
      to={`/work/${study.id}`}
      ref={cardRef}
      className="cs-card"
      style={{ "--accent": study.accent }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="cs-card-img-wrap">
        <img ref={imgRef} src={study.thumbnail} alt={study.title} className="cs-card-img" loading="lazy" />

      </div>

      <div className="cs-card-footer">
        <p className="cs-card-category">{study.category}</p>
        <h3 className="cs-card-title">{study.title}</h3>
        <p className="cs-card-tagline">{study.tagline}</p>
        
      </div>
      <div className="cs-card-bar" />
    </Link>
  );
}

/* ─── GRID (with custom cursor) ──────────────────────────────────────────── */
function WorkGrid({ filter }) {
  const gridRef = useRef();
  const cursorRef = useRef();
  const visible = filter === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category.startsWith(filter));

  useEffect(() => {
  const el = gridRef.current;
  const cur = cursorRef.current;

  let mouseX = 0;
  let mouseY = 0;

  let posX = 0;
  let posY = 0;

  const speed = 0.06; // lower = more delay, higher = faster follow

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const animate = () => {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;

    cur.style.left = posX + "px";
    cur.style.top = posY + "px";

    requestAnimationFrame(animate);
  };

  const onEnter = () => cur.classList.add("cs-cursor--vis");
  const onLeave = () => cur.classList.remove("cs-cursor--vis");

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);

  animate();

  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
  };
}, []);

  return (
    <section className="cs-grid-section" data-navbar="dark">
      {/* Custom cursor */}
      <div ref={cursorRef} className="cs-cursor " aria-hidden="true">
        <div className="cs-cursor-text">VIEW</div>
      </div>

      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="cs-container">
        <div ref={gridRef} className="cs-grid">
          {visible.map(study => <ProjectCard key={study.id} study={study} />)}
        </div>
      </div>
    </section>
  );
}
/* ─── CTA ────────────────────────────────────────────────────────────────── */
function WorkCTA() {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".cs-cta-el");
      gsap.set(els, { autoAlpha: 0, y: 26 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cs-cta-section" data-navbar="light">
      <div className="ab-orb ab-orb--cta" />
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="cs-cta-inner">
        <p className="ab-eyebrow cs-cta-el">Have a project?</p>
        <h2 className="cs-cta-head cs-cta-el">
          Your project <br />  could be next.
          <br />
          {/* <span
            style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="font-light"
          >
            could be next.
          </span> */}
        </h2>
        <div className="cs-cta-actions cs-cta-el">
          <a href="/contact" className="ab-cta-btn">
            Start the conversation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 10 }}>
              <path
                d="M1 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a href="mailto:support@algonsolutions.com" className="ab-cta-ghost">
            support@algonsolutions.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ROOT ──────────────────────────────────────────────────────────── */
export default function CaseStudiesPage() {
  const [filter, setFilter] = useState("All");

  return (
    <>
      <style>{`
        /* ── keyframes ────────────────────────────────────────── */
        @keyframes cs-spin  { to { transform: rotate(360deg); } }
        @keyframes cs-pulse { 0%,100% { opacity:1; transform:scale(1); }
                               50%    { opacity:0.4; transform:scale(0.7); } }
        @keyframes cs-scroll-hint { 0%,100% { transform:scaleY(0); transform-origin:top; }
                                     50%    { transform:scaleY(1); transform-origin:top; } }

        /* ── shared (already in About) ────────────────────────── */
        .ab-grid-neon {
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:
            linear-gradient(rgba(41,141,255,.055)1px,transparent 1px),
            linear-gradient(90deg,rgba(41,141,255,.055)1px,transparent 1px);
          background-size:64px 64px;
        }
        .ab-grid-bg {
          position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:
            linear-gradient(rgba(255,255,255,.018)1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.018)1px,transparent 1px);
          background-size:64px 64px;
        }
        .ab-grain {
          position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
        }
        .ab-eyebrow {
          font-size:10px;letter-spacing:.3em;text-transform:uppercase;
          color:rgba(255,255,255,0);margin:0 0 16px;display:block;
        }
        .ab-orb--cta {
          position:absolute;bottom:-20%;right:-5%;width:60vw;height:60vw;
          max-width:700px;max-height:700px;border-radius:50%;pointer-events:none;z-index:0;
          background:radial-gradient(ellipse,rgba(40,80,255,.09)0%,transparent 65%);
        }
        .ab-cta-btn {
          display:inline-flex;align-items:center;
          font-size:13px;letter-spacing:.14em;text-transform:uppercase;
          text-decoration:none;color:#050508;background:#fff;
          padding:16px 36px;transition:background .25s;
        }
        .ab-cta-btn:hover{background:#298dff; color:#fcfcf7;}
        .ab-cta-ghost {
          font-size:13px;letter-spacing:.08em;
          text-decoration:none;color:rgba(255,255,255,.3);transition:color .25s;
        }
        .ab-cta-ghost:hover{color:rgba(255,255,255,.7);}

        /* ── HERO ─────────────────────────────────────────────── */
        .cs-hero {
          position:relative;background:#050508;min-height:100vh;
          display:flex;flex-direction:column;justify-content:center;
          overflow:hidden;padding-top:72px;
        }
        .cs-orb {
          position:absolute;border-radius:50%;pointer-events:none;z-index:0;
        }
        .cs-orb--r {
          top:-10%;right:-5%;width:55vw;height:55vw;max-width:680px;max-height:680px;
          background:radial-gradient(ellipse,rgba(40,80,255,.1)0%,transparent 65%);filter:blur(2px);
        }
        .cs-orb--l {
          bottom:-5%;left:-8%;width:36vw;height:36vw;max-width:440px;max-height:440px;
          background:radial-gradient(ellipse,rgba(41,141,255,.07)0%,transparent 65%);
        }
        .cs-ghost {
          position:absolute;bottom:0;right:4vw;
          font-weight:800;font-size:clamp(120px,22vw,320px);line-height:.9;
          color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.035);
          pointer-events:none;z-index:0;user-select:none;letter-spacing:-.05em;
        }
        .cs-ring { position:absolute;pointer-events:none;z-index:0; }
        .cs-ring--1 { top:8%;right:6%; }
        .cs-ring--2 { bottom:12%;left:4%; }
        .cs-hero-inner {
          position:relative;z-index:1;padding:0 7vw 80px;
        }
        .cs-hero-h1 {
          font-weight: 400;
          font-size: clamp(55px, 8.5vw, 115px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: var(--white);
          margin: 0 0 20px;
        }
        .cs-hero-sub {
          font-size:clamp(16px,1.2vw,17px);font-weight:300;line-height:1.72;
          color:rgba(255,255,255,.6);max-width:50ch;margin:0 0 36px;
        }
        .cs-tag-pills { display:flex;flex-wrap:wrap;gap:10px; }
        .cs-tag-pill {
          font-size:11px;letter-spacing:.14em;text-transform:uppercase;
          border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.35);
          padding:6px 16px;background:rgba(255,255,255,.03);
          transition:border-color .25s,color .25s;
        }
        .cs-tag-pill:hover{border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.7);}
        .cs-scroll-hint {
          position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
          z-index:1;display:flex;flex-direction:column;align-items:center;gap:10px;
        }
        .cs-scroll-line {
          display:block;width:1px;height:48px;
          background:rgba(255,255,255,.15);
          animation:cs-scroll-hint 1.8s ease-in-out infinite;
        }

        /* ── FILTER BAR ───────────────────────────────────────── */
        .cs-filter-bar {
          position:relative;z-index:10;
          display:flex;gap:0;
          justify-content:center;
          background:#fcfcf7;padding:0 7vw;
          overflow-x:auto;scrollbar-width:none;
        }
        .cs-filter-bar::-webkit-scrollbar{display:none;}
        .cs-filter-slide {
          position:absolute;bottom:0;left:0;height:0px;
          background:linear-gradient(90deg,#0050d4,#298dff);   
          pointer-events:none;transition:none;
        }
        .cs-filter-btn {
          position:relative;z-index:1;background:none;border:none;cursor:pointer;
          font-size:13px;letter-spacing:.10em;font-weight:400;
          color:rgba(5,5,8,.8);padding:10px 15px; margin:0px 3px;white-space:nowrap;
          transition:color .25s;
        }
        .cs-filter-btn--active,.cs-filter-btn:hover{color:rgba(255,255,255,1); background:rgba(41,141,255,1); border-radius:5px; transition: all;
transition-duration: 300ms;}

        /* ── GRID ─────────────────────────────────────────────── */
        .cs-grid-section {
          position:relative;background:#fcfcf7;
          padding:64px 7vw 100px;
          
        }
        .cs-grid {
          position:relative;z-index:1;
          display:grid;grid-template-columns:repeat(3,1fr);
          gap:1px;background:rgba(5,5,8,.05);
        }
        /* wide card spans 2 cols */
        .cs-card--wide { grid-column:span 2; }

        /* ── container ─────────────────────────────────── */
.cs-container { max-width: 1280px; margin: 0 auto; padding: 0 40px; }

/* ── grid ───────────────────────────────────────── */
.cs-grid-section { position:relative; background:#fcfcf7; padding:64px 0 100px; }
.cs-grid {
  position:relative; z-index:1; cursor:none;
  display:grid; grid-template-columns:repeat(3,1fr); gap:28px; background:#fcfcf7;
}

/* ── card ───────────────────────────────────────── */
.cs-card {
  position:relative; display:block; text-decoration:none; background:#fcfcf7;
solid rgba(5,5,8,.08);  overflow:hidden;
  transition:transform .35s cubic-bezier(.22,1,.36,1), 
  cursor:none;
}
.cs-card:hover { transform:translateY(-5px);  border-color:rgba(5,5,8,.14); }
.cs-card-img-wrap { position:relative; width:100%; padding-bottom:66%; overflow:hidden; }
.cs-card-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; will-change:transform; }
.cs-card-badge {
  position:absolute; top:14px; left:14px; display:flex; align-items:center; gap:7px;
  font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:rgba(5,5,8,.55);
  background:rgba(252,252,247);
  padding:5px 10px; backdrop-filter:blur(8px);
}
.cs-card-footer { padding:20px 0px 22px;  }
.cs-card-category { font-size:13px;  color:rgba(5,5,8,.8); margin-bottom:7px; font-weight:400; }
.cs-card-title { font-size:clamp(18px,1.8vw,28px); font-weight:400; letter-spacing:.03em; color:#050508; margin-bottom:8px; line-height:1.2; }
.cs-card-tagline { font-size:13px; font-weight:4300; line-height:1.6; color:rgba(5,5,8,.8); margin-bottom:14px; }
.cs-card-meta-row { display:flex; align-items:center; justify-content:space-between; }
.cs-card-tags { display:flex; gap:6px; flex-wrap:wrap; }
.cs-card-tag { font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:rgba(5,5,8,.3); border:1px solid rgba(5,5,8,.1); padding:3px 8px; }
.cs-card-year { font-size:11px; letter-spacing:.1em; font-weight:500; white-space:nowrap; }
.cs-card-bar { position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--accent,transparent); opacity:0; transition:opacity .3s; }

/* ── custom cursor ──────────────────────────────── */
.cs-cursor {
  position:fixed; width:100px; height:100px; border-radius:50%; pointer-events:none; z-index:9999;
   backdrop-filter:blur(14px);
  background:rgba(5,5,8,.08); display:flex; align-items:center; justify-content:center;
  transform:translate(-50%,-50%) scale(0); transition:transform .25s cubic-bezier(.22,1,.36,1), opacity .2s; opacity:0;
}
.cs-cursor--vis { transform:translate(-50%,-50%) scale(1); opacity:1; }
.cs-cursor-arrow {
  width:10px; height:10px;
  border-top:1.5px solid rgba(252,252,247,.9); border-right:1.5px solid rgba(252,252,247,.9);
  transform:rotate(45deg) translate(-1px,1px);
}
  .cs-cursor-text{
  font-size:13px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:rgba(252,252,247,.8);
  font-weight:300;
  white-space:nowrap;
}



/* ── CTA ──────────────────────────────────────────────── */
        .pf-cta {
          position: relative; background: #050508;
          padding: 130px 7vw 150px; overflow: hidden;
          
        }
        .pf-cta-orb {
          position: absolute; bottom: -20%; right: -5%;
          width: 60vw; height: 60vw; max-width: 700px; max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(41,141,255,0.1) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .pf-cta-inner { position: relative; z-index: 1; }
        .pf-cta-head {
          
          font-size: clamp(48px, 8vw, 120px);
          font-weight: 400; line-height: 1;
          letter-spacing: -0.02em; color: #fff; margin: 0 0 28px;
        }
        .pf-cta-sub {
          
          font-size: clamp(14px, 1.3vw, 18px); font-weight: 300;
          line-height: 1.72; color: rgba(255,255,255,1);
          max-width: 44ch; margin: 0 0 48px;
        }
        .pf-cta-actions { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
        .pf-cta-btn {
          display: inline-flex; align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; color: #050508; background: #fff;
          padding: 16px 36px; transition: background 0.25s;
        }
        .pf-cta-btn:hover { background: #298dff; color: #fcfcf7 }
        .pf-cta-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; letter-spacing: 0.08em;
          text-decoration: none; color: rgba(255,255,255,0.3);
          transition: color 0.25s;
        }
        .pf-cta-ghost:hover { color: rgba(255,255,255,0.7); }








/* ── responsive ─────────────────────────────────── */
@media(max-width:1024px){ .cs-grid{ grid-template-columns:repeat(2,1fr);   } 
.cs-filter-bar {
          position:relative;z-index:10;
          display:flex;gap:0;
          justify-content:start;
          background:#fcfcf7;padding:0 10vw;
          overflow-x:auto;scrollbar-width:none;
        }
          }
@media(max-width:640px){ .cs-grid{ grid-template-columns:1fr; } }

        /* ── CTA ──────────────────────────────────────────────── */
        .cs-cta-section {
          position:relative;background:#050508;
          padding:120px 7vw 140px;border-top:1px solid rgba(255,255,255,.06);overflow:hidden;
        }
        .cs-cta-inner{position:relative;z-index:1;}
        .cs-cta-head {
          font-size:clamp(44px,7.5vw,110px);font-weight:400;line-height:.94;
          letter-spacing:-.04em;color:#fcfcf7;margin:0 0 40px;
        }
        .cs-cta-actions{display:flex;align-items:center;gap:32px;flex-wrap:wrap;}

        /* ── Responsive ───────────────────────────────────────── */
        @media(max-width:1024px){
          .cs-grid{grid-template-columns:repeat(2,1fr);}
          .cs-card--wide{grid-column:span 2;}
           .cs-cursor {
    display: none;
  }
        }
        @media(max-width:640px){
          .cs-grid{grid-template-columns:1fr;}
          .cs-card--wide{grid-column:span 1;}
          .cs-card-img-wrap{padding-bottom:70%;}
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <CaseStudiesHero />
        <ScrollIndicator />
        
        <FilterBar active={filter} onChange={setFilter} />
        <WorkGrid filter={filter} />
        <PortfolioCTA/>
        {/* <WorkCTA /> */}
        <Footer />
      </div>
    </>
  );
}
