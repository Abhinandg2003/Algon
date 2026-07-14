/**
 * CaseStudyDetailPage.jsx — Algon / Premium Edition
 *
 * Structure:
 *   1. Hero         — full-bleed + title + meta
 *   2. Overview     — editorial intro + inline stats
 *   3. Problem      — dark section, SVG diagram
 *   4. Strategy     — approach pillars
 *   5. Execution    — sticky scroll reveal
 *   6. Gallery      — horizontal scroll + device mockups + lightbox
 *   7. Results      — before/after table
 *   8. CTA          — next project / contact
 *
 * DEPS: gsap + ScrollTrigger, react-router-dom
 */

import {
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "../data/caseStudiesData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollIndicator from "../components/ui/ScrollIndicator";


gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   SVG PRIMITIVES
──────────────────────────────────────────────────────────────────────────── */





function BouncingArrow({ accent = "#fff" }) {
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
      <path
        d="M12 2V24M12 24L4 16M12 24L20 16"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "csd-arrow-bounce 1.6s ease-in-out infinite" }}
      />
    </svg>
  );
}

function GridPattern({ opacity = 0.018, color = "255,255,255" }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `linear-gradient(rgba(${color},${opacity})1px,transparent 1px),linear-gradient(90deg,rgba(${color},${opacity})1px,transparent 1px)`,
      backgroundSize: "64px 64px",
    }} />
  );
}

function GrainOverlay({ opacity = 0.025 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "200px 200px",
    }} />
  );
}

/** Animated concentric rings for Problem section */
function ConcentricRings({ accent = "#4a6fff", size = 320 }) {
  const rings = [1, 0.7, 0.45, 0.25];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {rings.map((scale, i) => (
        <circle
          key={i}
          cx={size / 2} cy={size / 2}
          r={(size / 2 - 8) * scale}
          stroke={accent}
          strokeWidth={i === 0 ? 0.5 : 0.3}
          strokeDasharray={i % 2 === 0 ? "none" : "4 6"}
          fill="none"
          opacity={0.5 + i * 0.7}
        >
          {i > 0 && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${size / 2} ${size / 2}`}
              to={`${i % 2 === 0 ? 360 : -360} ${size / 2} ${size / 2}`}
              dur={`${20 + i * 8}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
      {/* Central cross */}
      <line x1={size/2} y1={size/2 - 20} x2={size/2} y2={size/2 + 20} stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <line x1={size/2 - 20} y1={size/2} x2={size/2 + 20} y2={size/2} stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <circle cx={size/2} cy={size/2} r="3" fill={accent} opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** Connection diagram for strategy */
function StrategyDiagram({ accent = "#4a6fff" }) {
  const nodes = [
    { x: 80, y: 60, label: "Research" },
    { x: 240, y: 20, label: "Design" },
    { x: 400, y: 60, label: "Build" },
    { x: 480, y: 180, label: "Launch" },
    { x: 160, y: 160, label: "Test" },
    { x: 320, y: 180, label: "Iterate" },
  ];
  const edges = [[0,1],[1,2],[2,3],[0,4],[4,5],[5,3],[1,4],[2,5]];
  return (
    <svg width="560" height="220" viewBox="0 0 560 220" fill="none" style={{ opacity: 0.6 }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={accent} strokeWidth="0.5" strokeDasharray="3 4"
          opacity="1"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="28" dur={`${3+i*0.4}s`} repeatCount="indefinite" />
        </line>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="5" fill={accent} opacity="0.7">
            <animate attributeName="r" values="4;6;4" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={n.x} y={n.y + 16} textAnchor="middle" fill="rgba(41,141,255,1)" fontSize="10" fontFamily="displayfont" letterSpacing="0.1em">
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Waveform for execution */
function PulseWave({ accent = "#4a6fff", width = 180, height = 48 }) {
  const bars = Array.from({ length: 18 }, (_, i) => ({
    h: [12,24,18,36,14,30,20,40,16,34,22,38,10,28,20,32,14,18][i],
    x: i * (width/18),
  }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ opacity: 0.7 }}>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={(height - b.h)/2} width={width/18 - 2} height={b.h} rx="2" fill={accent}>
          <animate attributeName="height" values={`${b.h};${b.h*1.4};${b.h}`} dur={`${0.6+i*0.07}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${(height-b.h)/2};${(height-b.h*1.4)/2};${(height-b.h)/2}`} dur={`${0.6+i*0.07}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}

/** Animated bar */
function AnimatedBar({ pct = 75, accent = "#4a6fff", label = "", delay = 0 }) {
  const barRef = useRef();
  useEffect(() => {
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.to(barRef.current, {
      scaleX: 1, duration: 1.4, ease: "power3.out", delay,
      scrollTrigger: { trigger: barRef.current, start: "top 90%" },
    });
  }, [delay]);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 10, fontFamily: "Displayfont", letterSpacing: ".06em" }}>
        <span>{label}</span><span style={{ color: accent }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: "rgba(255,255,255,.08)", position: "relative" }}>
        <div ref={barRef} style={{ position: "absolute", inset: 0, background: accent,  }} />
      </div>
    </div>
  );
}

// function Splinescene() {
//   return (
//     <section  className="csd-section csd-dark-section" data-navbar="dark">
//     <div className="relative h-full w-full bg-black">
//         <Spline scene="https://prod.spline.design/5H1HKMlsxexSqwxF/scene.splinecode" />
//         </div>
//         </section>

//   );
// }

/** Animated counter */
function Counter({ value, suffix = "", accent = "#4a6fff", label, delay = 0 }) {
  const numRef = useRef();
  const triggered = useRef(false);
  useEffect(() => {
    ScrollTrigger.create({
      trigger: numRef.current,
      start: "top 85%",
      once: true,
      onEnter() {
        if (triggered.current) return;
        triggered.current = true;
        const raw = value ?? "0";
        const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
        if (!isNaN(num)) {
          gsap.fromTo({ val: 0 }, { val: num }, {
            duration: 1.8, ease: "power2.out", delay,
            onUpdate() {
              const v = this.targets()[0].val;
              if (!numRef.current) return;
             numRef.current.textContent = Math.round(v);
            },
          });
        }
      },
    });
  }, [value, delay]);
  return (
    <div className="csd-counter-item">
      <div className="csd-counter-val">
        <span ref={numRef} style={{ color: accent }}>0</span>
        <span style={{ color: accent }}>{suffix}</span>
      </div>
      <p className="csd-counter-label">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
function DetailHero({ study }) {
  const heroRef = useRef();
  const titleRef = useRef();
  const metaRef = useRef();
  const imgRef = useRef();
  const overlayRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, metaRef.current, scrollRef.current], {
        autoAlpha: 0,
        y: 40,
      });
      gsap.set(imgRef.current, { scale: 1.06 });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(imgRef.current, { scale: 1, duration: 1.6, ease: "power3.out" }, 0)
        .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.3)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.55)
        .to(scrollRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.8);

      // Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="csd-hero" data-navbar="light">
      <div className="csd-hero-img-wrap">
        <img
          ref={imgRef}
          src={study.mockup}
          alt={study.title}
          className="csd-hero-img"
        />
        <div ref={overlayRef} className="csd-hero-overlay" />
      </div>

      <div className="ab-grain" />

      <div className="csd-hero-inner">
        {/* Back link */}
        {/* <Link to="/work" className="csd-back">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M13 5H1M1 5L5 1M1 5L5 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All work
        </Link> */}

        <div ref={titleRef} className="csd-hero-title-wrap">
          {/* <p className="ab-eyebrow">{study.category}</p> */}
          <h1 className="csd-hero-h1">{study.title}</h1>
          {/* <p className="csd-hero-tagline">{study.tagline}</p> */}
        </div>

        <div ref={metaRef} className="csd-meta-row">
          {[
            { label: "Category", val: study.category },
            // { label: "Year", val: study.year },
            // { label: "Duration", val: study.duration },
          ].map((m) => (
            <div key={m.label} className="csd-meta-item">
              <span className="csd-meta-label">{m.label}</span>
              <span className="csd-meta-val">{m.val}</span>
            </div>
          ))}
          {/* <div className="csd-meta-item">
            <span className="csd-meta-label">Services</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
              {study.services.map((s) => (
                <span key={s} className="csd-service-pill" style={{ borderColor: `${study.accent}50`, color: study.accent }}>
                  {s}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div ref={scrollRef} className="cs-scroll-hint">
        <BouncingArrow accent="rgba(255,255,255,.3)" />
      </div>
    </section>
  );
}

function RevealImageSection({ study }) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const imgRef = useRef(null);

useEffect(() => {
  if (!study) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom top",
        scrub: 1.4,
      },
    });

    tl.fromTo(
      frameRef.current,
      {
        width: "78vw",
        borderRadius: "0px",
      },
      {
        width: "100vw",
        borderRadius: "0px",
        ease: "power3.out",
      },
      0
    );

    tl.fromTo(
      imgRef.current,
      {
        scale: 1.18,
      },
      {
        scale: 1,
        ease: "power2.out",
      },
      0
    );
  }, sectionRef);

  return () => ctx.revert();
}, [study]); // 🔥 important

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#fcfcf7] overflow-hidden"
      data-navbar="dark"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Frame */}
      <div
        ref={frameRef}
        className="relative mx-auto h-[78vh] overflow-hidden will-change-transform"
      >
        <img
  ref={imgRef}
  src={study.commonImg}
  alt={study.title}
  className="w-full h-full object-cover"
/>

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/12" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. OVERVIEW + STATS
──────────────────────────────────────────────────────────────────────────── */
function Overview({ study }) {
  const ref = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.textContent.trim().split(" ");
      if (!words) return;
      textRef.current.innerHTML = words.map((w) => `<span class="ab-sw">${w} </span>`).join("");
      gsap.set(textRef.current.querySelectorAll(".ab-sw"), { opacity: 0.1 });
      gsap.to(textRef.current.querySelectorAll(".ab-sw"), {
        opacity: 1, stagger: { each: 0.03 }, ease: "none",
        scrollTrigger: { trigger: textRef.current, start: "top 75%", end: "bottom 55%", scrub: 1 },
      });

      gsap.utils.toArray(".csd-overview-line").forEach((el, i) => {
        gsap.set(el, { scaleX: 0, transformOrigin: "left" });
        gsap.to(el, { scaleX: 1, duration: 1, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-overview-section" data-navbar="dark">
      <GrainOverlay opacity={0.02} />
      <div className="csd-section-inner">
        <div className="csd-overview-layout">
          <div className="csd-overview-left">

            <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>Overview
            
           
          </h2>
            
            <p ref={textRef} className="csd-overview-text">{study.overview}</p>
            <div className="csd-services-row">
              {study.services.map((s) => (
                <span key={s} className="csd-service-tag" style={{ borderColor: `#050508`, color: "#050508"}}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="csd-overview-right">
            {/* Stat counters */}
            <div className="csd-stat-grid">
              {study.stats.map((s, i) => (
                <Counter key={i} value={s.value} suffix={s.suffix} label={s.label} accent={"#000"} delay={i * 0.1} />
              ))}
            </div>
            {/* Progress bars */}
            {/* <div style={{ marginTop: 48 }}>
              <AnimatedBar pct={92} accent={"#000"}  label="On-time delivery" delay={0.2} />
              <AnimatedBar pct={100} accent={"#000"}  label="Scope delivered" delay={0.4} />
              <AnimatedBar pct={97} accent={"#000"}  label="Client satisfaction" delay={0.6} />
            </div> */}
          </div>
        </div>
        {/* Divider */}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. PROBLEM
──────────────────────────────────────────────────────────────────────────── */
function ProblemSection({ study }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".csd-reveal");
      els?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 32 });
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-dark-section" data-navbar="dark">
      <GridPattern opacity={0.022} />
      <GrainOverlay />
      {/* Large decorative number */}
      <div className="csd-section-number">01</div>
      <div className="csd-section-inner">
        <div className="csd-problem-layout">
          <div className="csd-problem-left">
            {/* <span className="ab-eyebrow csd-reveal">The Problem</span> */}
            <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>
            The challenge <br /> we had to solve
            <br />
            {/* <span style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }} className="font-light">
              we had to solve
            </span> */}
          </h2>
            <p className="csd-overview-text csd-reveal">
              {study.challenge}
            </p>

            {/* Pain point chips */}
            <div className="csd-pain-chips csd-reveal" style={{ marginTop: 40 }}>
  {(study.statpoints || []).map((p) => (
    <div key={p} className="csd-pain-chip">
      <svg
        width="15"
        height="15"
        viewBox="0 0 8 8"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="4" cy="4" r="3" stroke={study.accent} strokeWidth="1" />
        <circle cx="4" cy="4" r="1" fill={study.accent} />
      </svg>

      {p}
    </div>
  ))}
</div>
          </div>
          <div className="csd-problem-right csd-reveal">
            <ConcentricRings accent={study.accent} size={340} />
            {/* Floating problem stat */}
            <div className="csd-problem-float">
              <span className="csd-float-num" style={{ color: study.accent }}>
                {study.results[0]?.before || "—"}
              </span>
              <span className="csd-float-label">{study.results[0]?.metric || "Initial state"}</span>
              <span style={{ fontSize: 15,fontFamily:"Displayfont",letterSpacing:".03em",  color: "rgba(5,5,8,.5)", }}>Before</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. STRATEGY
──────────────────────────────────────────────────────────────────────────── */
function StrategySection({ study }) {
  const ref = useRef();
  const pillars = [
    { num: "A", title: "Audit & Discover", text: "Deep-dive into the existing system, user behaviour, and competitive landscape to find the real friction points." },
    { num: "B", title: "Design & Prototype", text: "Rapid iteration cycles with high-fidelity prototypes validated against real users before a single line of production code." },
    { num: "C", title: "Build & Integrate", text: "Engineering that matches the ambition of the design — performant, accessible, and ready to scale." },
    { num: "D", title: "Launch & Optimise", text: "Staged rollout with analytics instrumentation, feedback loops, and iterative refinement post-launch." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll(".csd-pillar").forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, x: -20 });
        gsap.to(el, {
          autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 87%" },
        });
      });
      gsap.set(".csd-strategy-diagram", { autoAlpha: 0, scale: 0.94 });
      gsap.to(".csd-strategy-diagram", {
        autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".csd-strategy-diagram", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-light-section" data-navbar="dark">
      <GrainOverlay opacity={0.02} />
      <div className="csd-section-number csd-section-number--dark">02</div>
      <div className="csd-section-inner">
        <div className="csd-strategy-head">
          {/* <span className="ab-eyebrow" style={{ color: "rgba(5,5,8,.35)" }}>Strategy</span> */}
          <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>
            How we <br /> approached it
            <br />
            {/* <span style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }} className="font-light">
              approached it
            </span> */}
          </h2>
        </div>
        <div className="csd-strategy-body">
          <div className=" flex flex-col max-w-[90vw]">
            <p className="csd-overview-text csd-reveal">
              {study.solution}
            </p>
            <div className="csd-strategy-diagram" style={{ display: "inline-block" }}>
              {/* <StrategyDiagram accent={study.accent} /> */}

              <img className="rounded-[10px]" src={study.heroImage} alt={study.id} />
            </div>
          </div>
          <div className="csd-pillars">
            {study.pillars.map((p, i) => (
              <div key={p.num} className="csd-pillar" style={{ "--accent": study.accent }}>
                <div className="csd-pillar-num rounded-sm" style={{ backgroundColor: study.accent, borderColor: `${study.accent}` }}>
                  {p.num}
                </div>
                <div>
                  <h4 className="csd-pillar-title">{p.title}</h4>
                  <p className="csd-pillar-text">{p.text}</p>
                </div>
                <div className="csd-pillar-line" style={{ background: `linear-gradient(90deg,${study.accent}50,transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. EXECUTION — sticky scroll reveal
──────────────────────────────────────────────────────────────────────────── */
function ExecutionSection({ study }) {
  const ref = useRef();
  const stepsData = [
    {
      phase: "Phase 01",
      title: "Foundation",
      desc: "Brand audit, user interviews, technical discovery. Every assumption questioned before the first wireframe is drawn.",
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
      title: "Design Sprint",
      desc: "High-fidelity design system, component library, motion language. Every pixel intentional.",
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
      title: "Engineering",
      desc: "Performance-first build. Lighthouse 100. Accessible. Scalable infrastructure with CI/CD pipelines.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <polyline points="4,32 14,20 22,28 32,14 44,22" stroke={accent} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="44" cy="22" r="3" fill={accent} opacity="0.7" />
        </svg>
      ),
    },
    {
      phase: "Phase 04",
      title: "Launch",
      desc: "Coordinated go-live with analytics, error tracking, and a 30-day post-launch support window.",
      icon: (accent) => (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke={accent} strokeWidth="0.6" />
          <path d="M24 10 L28 20 L24 24 L20 20 Z" fill={accent} opacity="0.7" />
          <circle cx="24" cy="34" r="2" fill={accent} opacity="0.4" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = ref.current?.querySelectorAll(".csd-exec-step");
      steps?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 48 });
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
      // Progress line
      const line = ref.current?.querySelector(".csd-exec-line-fill");
      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: "top" });
        gsap.to(line, {
          scaleY: 1, ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-dark-section csd-exec-section" data-navbar="dark">
      <GridPattern opacity={0.025} />
      <GrainOverlay />
      <div className="csd-section-number">03</div>

      <div className="absolute right-0 top-[400px] h-[700px] w-[700px] opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 23 23" fill="#298dff" class="home-industry_icon"><path d="M9.18359 11.5713L9.18366 13.4717L15.1679 14.8226L15.1678 12.9222L9.18359 11.5713Z" fill="#298dff"></path><path d="M9.18359 18.0723L9.18366 16.1719L15.1679 14.821L15.1678 16.7214L9.18359 18.0723Z" fill="#298dff"></path><path d="M11.0879 16.1865L9.18752 16.1866L7.83661 22.1708L9.73698 22.1708L11.0879 16.1865Z" fill="#298dff"></path><path d="M4.58594 16.1865L6.48631 16.1866L7.83721 22.1708L5.93684 22.1708L4.58594 16.1865Z" fill="#298dff"></path><path d="M6.4873 18.0801L6.48724 16.1797L0.503003 14.8288L0.503067 16.7292L6.4873 18.0801Z" fill="#298dff"></path><path d="M6.4873 11.5781L6.48724 13.4785L0.503002 14.8294L0.503067 12.929L6.4873 11.5781Z" fill="#298dff"></path><path d="M4.58301 13.4756L6.48338 13.4755L7.83428 7.49128L5.93392 7.49135L4.58301 13.4756Z" fill="#298dff"></path><path d="M11.085 13.4756L9.18459 13.4755L7.83369 7.49128L9.73406 7.49135L11.085 13.4756Z" fill="#298dff"></path><path d="M13.9482 6.91016L15.8486 6.91022L17.1864 10.8747L15.286 10.8747L13.9482 6.91016Z" fill="#298dff"></path><path d="M20.4248 6.91016L18.5244 6.91022L17.1867 10.8747L19.087 10.8747L20.4248 6.91016Z" fill="#298dff"></path><path d="M18.5332 8.80762L18.5333 6.90725L22.4978 5.56949L22.4977 7.46986L18.5332 8.80762Z" fill="#298dff"></path><path d="M18.5332 2.33301L18.5333 4.23338L22.4978 5.57114L22.4977 3.67076L18.5332 2.33301Z" fill="#298dff"></path><path d="M20.4297 4.23145L18.5293 4.23138L17.1916 0.266876L19.0919 0.26694L20.4297 4.23145Z" fill="#298dff"></path><path d="M13.9541 4.23145L15.8545 4.23138L17.1922 0.266876L15.2919 0.26694L13.9541 4.23145Z" fill="#298dff"></path><path d="M15.8447 2.33398L15.8447 4.23436L11.8802 5.57211L11.8802 3.67174L15.8447 2.33398Z" fill="#298dff"></path><path d="M15.8447 8.80859L15.8447 6.90822L11.8802 5.57047L11.8802 7.47084L15.8447 8.80859Z" fill="#298dff"></path></svg>
      </div>
      <div className="csd-section-inner">
        <div className="csd-exec-head">
          <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>
            Four phases <br /> zero shortcuts
            <br />
            {/* <span style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }} className="font-light">
              zero shortcuts
            </span> */}
          </h2>
        </div>
        <div className="csd-exec-body">
          {/* Vertical timeline line */}
          <div className="csd-exec-timeline">
            <div className="csd-exec-line-bg" />
            <div className="csd-exec-line-fill" style={{ background: study.accent }} />
          </div>
          <div className="csd-exec-steps">
            {study.stepsData.map((s, i) => (
              <div key={i} className="csd-exec-step">
                <div className="csd-exec-step-icon">{s.icon(study.accent)}</div>
                <div className="csd-exec-step-content">
                  <h3 className="csd-exec-title">{s.title}</h3>
                  <p className="csd-exec-desc">{s.desc}</p>
                </div>
                {/* Connector to line */}
                <div className="csd-exec-connector" style={{ background: `${study.accent}30` }}>
                  <div className="csd-exec-connector-dot" style={{ background: study.accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <PulseWave accent={study.accent} width={280} height={56} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. GALLERY — Horizontal scroll + device mockups + lightbox
──────────────────────────────────────────────────────────────────────────── */
function GallerySection({ study }) {
  const ref = useRef();
  const trackRef = useRef();
  const [light, setLight] = useState(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const lbRef = useRef();
  

  // Horizontal drag scroll
  const onPointerDown = (e) => {
    if (e.button !== 0 || !trackRef.current) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current.scrollLeft;

    trackRef.current.setPointerCapture?.(e.pointerId);
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
    trackRef.current.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    e.preventDefault();
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) hasDraggedRef.current = true;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const stopDragging = (e) => {
    isDraggingRef.current = false;
    if (trackRef.current) {
      trackRef.current.releasePointerCapture?.(e?.pointerId);
      trackRef.current.style.cursor = "grab";
      trackRef.current.style.userSelect = "";
      trackRef.current.style.scrollBehavior = "";
    }
  };

  const scrollGallery = (direction) => {
    if (!trackRef.current) return;

    const distance = Math.min(trackRef.current.clientWidth * 0.8, 620);
    trackRef.current.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  // Lightbox keyboard
  useEffect(() => {
    if (light === null) return;
    const handle = (e) => {
      if (e.key === "ArrowRight") setLight((l) => (l + 1) % study.gallery.length);
      if (e.key === "ArrowLeft") setLight((l) => (l - 1 + study.gallery.length) % study.gallery.length);
      if (e.key === "Escape") setLight(null);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [light, study.gallery.length]);

  useEffect(() => {
    if (light !== null && lbRef.current) {
      gsap.fromTo(lbRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
    }
  }, [light]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".csd-gallery-header", { autoAlpha: 0, y: 30 });
      gsap.to(".csd-gallery-header", {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".csd-gallery-header", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const mockupTypes = ["browser"];

  return (
    <section ref={ref} className="csd-section csd-gallery-outer" data-navbar="dark">
      <GrainOverlay opacity={0.02} />
      <div className="csd-section-number csd-section-number--dark">04</div>
      <div className="csd-section-inner">

        <div className="h-[250px] w-[250px] opacity-20 md:opacity-70 absolute right-[50px] top-[0px] -z-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 21 21" fill="#298dff" class="home-industry_grey-icon icon-n"><g clip-path="url(#clip0_8200_4351)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.29585 0.790007C9.35361 0.0908309 11.6448 0.0908309 13.7025 0.790007H13.7037C14.1008 0.925894 14.3133 1.35794 14.1786 1.75515C14.0427 2.15236 13.6108 2.3649 13.2136 2.23017C11.4717 1.63785 9.52779 1.63785 7.78592 2.23017C7.70459 2.25805 7.62217 2.27082 7.54088 2.27082C7.22386 2.27082 6.9289 2.07222 6.8209 1.75515C6.68503 1.35678 6.8987 0.924732 7.29585 0.790007ZM18.9609 6.53786C18.5637 6.67259 18.3501 7.10464 18.486 7.50297C18.7821 8.37408 18.9319 9.28692 18.9319 10.2173C18.9319 11.1475 18.7821 12.0604 18.486 12.9315C18.3512 13.3287 18.5637 13.7608 18.9609 13.8966C19.0422 13.9245 19.1247 13.9373 19.2059 13.9373C19.5229 13.9373 19.8179 13.7375 19.9259 13.4216C20.2755 12.3926 20.4531 11.3148 20.4531 10.2173C20.4531 9.11971 20.2755 8.04307 19.9259 7.01404C19.7912 6.61684 19.3581 6.40429 18.9609 6.53902V6.53786ZM2.06812 10.2173C2.06812 11.1464 2.21793 12.0604 2.51405 12.9315V12.9292C2.64991 13.3275 2.43624 13.7596 2.03909 13.8943C1.9578 13.9222 1.87535 13.935 1.79407 13.935C1.47704 13.935 1.18208 13.7363 1.07409 13.4193C0.724548 12.3902 0.546875 11.2857 0.546875 10.2161C0.546875 9.14644 0.716419 8.09298 1.0497 7.08489C1.18208 6.68652 1.61291 6.4705 2.01122 6.60173C2.40953 6.73414 2.62669 7.16502 2.4943 7.5634C2.21096 8.41702 2.06812 9.28813 2.06812 10.2173ZM7.78486 18.2044C9.52794 18.7968 11.4707 18.7956 13.2126 18.2044H13.2102C13.6086 18.0686 14.0405 18.2811 14.1753 18.6795C14.3111 19.0778 14.0975 19.5099 13.7003 19.6446C12.6714 19.9941 11.5938 20.1719 10.4976 20.1719C9.40132 20.1719 8.32368 19.9941 7.29482 19.6446C6.89767 19.5087 6.68515 19.0767 6.81986 18.6795C6.95573 18.2822 7.38771 18.0697 7.78486 18.2044ZM16.9021 15.5448C16.6049 15.2475 16.1242 15.2475 15.8268 15.5448C15.5295 15.8421 15.5295 16.3229 15.8268 16.6202L17.4886 18.2823C17.6372 18.4309 17.8312 18.5053 18.0263 18.5053C18.2213 18.5053 18.4153 18.4309 18.5639 18.2823C18.8612 17.985 18.8612 17.5041 18.5639 17.2068L16.9021 15.5448ZM2.43459 2.15247C2.73187 1.85515 3.21263 1.85515 3.50991 2.15247L5.17167 3.81448C5.46896 4.1118 5.46896 4.59263 5.17167 4.88995C5.02304 5.03862 4.82911 5.11295 4.63401 5.11295C4.43892 5.11295 4.24499 5.03862 4.09635 4.88995L2.43459 3.22796C2.13731 2.93063 2.13731 2.4498 2.43459 2.15247ZM4.09811 15.5448L2.43635 17.2068C2.13908 17.5041 2.13908 17.985 2.43635 18.2823C2.585 18.4309 2.77893 18.5053 2.97402 18.5053C3.16911 18.5053 3.36304 18.4309 3.51168 18.2823L5.17344 16.6202C5.47073 16.3229 5.47073 15.8421 5.17344 15.5448C4.87616 15.2475 4.3954 15.2475 4.09811 15.5448ZM16.924 4.86789C16.7753 5.01655 16.5814 5.09088 16.3863 5.09088C16.1912 5.09088 15.9973 5.01655 15.8487 4.86789C15.5514 4.57056 15.5514 4.08973 15.8487 3.79241L17.4883 2.15247C17.7856 1.85515 18.2664 1.85515 18.5637 2.15247C18.8609 2.4498 18.8609 2.93063 18.5637 3.22796L16.924 4.86789Z" fill="#298dff"></path></g></svg>
        </div>
        <div className="csd-gallery-header">
          <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>
            The work, <br /> in full resolution
            <br />
            {/* <span style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }} className="font-light">
              in full resolution
            </span> */}
          </h2>
          <p className="csd-body-text" style={{ color: "rgba(5,5,8,1)", marginTop: 16, maxWidth: "36ch" }}>
            Drag to explore. Click to open full screen.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="csd-horiz-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        {study.gallery.map((src, i) => {
          const type = mockupTypes[i % mockupTypes.length];
          return (
            <div
              key={i}
              className={`csd-gal-card csd-gal-card--${type}`}
              onClick={() => {
                if (hasDraggedRef.current) {
                  hasDraggedRef.current = false;
                  return;
                }
                setLight(i);
              }}
            >
              {type === "phone" ? (
                <PhoneMockup src={src} accent="#ff8f4a" index={i} />
              ) : type === "tablet" ? (
                <TabletMockup src={src} accent="#ff8f4a" index={i} />
              ) : (
                <BrowserMockup src={src} accent="#ff8f4a" index={i} />
              )}
              
            </div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <div className="csd-section-inner" style={{ marginTop: 32 }}>
        <div className="csd-gallery-footer">
          <div className="csd-scroll-indicator">
          <div className="csd-scroll-track">
            <div className="csd-scroll-thumb" style={{ background: study.accent }} />
          </div>

          </div>

          <div className="csd-gallery-controls" aria-label="Gallery controls">
            <button
              type="button"
              className="csd-gallery-arrow"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery(-1)}
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="csd-gallery-arrow"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery(1)}
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {light !== null && (
        <div ref={lbRef} className="csd-lightbox" onClick={() => setLight(null)}>
          <button className="csd-lb-close" onClick={() => setLight(null)}>✕</button>
          <button className="csd-lb-arrow csd-lb-arrow--prev" onClick={(e) => { e.stopPropagation(); setLight((l) => (l - 1 + study.gallery.length) % study.gallery.length); }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="csd-lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={study.gallery[light]} alt="" className="csd-lb-img" />
            <div className="csd-lb-meta">
              <span style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>
                {study.title}
              </span>
              <span style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,255,255,.25)", textTransform: "uppercase" }}>
                {light + 1} / {study.gallery.length}
              </span>
            </div>
          </div>
          <button className="csd-lb-arrow csd-lb-arrow--next" onClick={(e) => { e.stopPropagation(); setLight((l) => (l + 1) % study.gallery.length); }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}

function BrowserMockup({ src, accent, index }) {
  return (
    <div className="csd-mockup csd-mockup--browser">
      <div className="csd-browser-bar" style={{ borderColor: "rgba(5,5,8,.1)" }}>
        <div className="csd-browser-dots">
          <span style={{ background: "#ff5f57" }} />
          <span style={{ background: "#febc2e" }} />
          <span style={{ background: "#28c840" }} />
        </div>
        <div className="csd-browser-url" style={{ color: "rgba(5,5,8,.25)" }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ marginRight: 4 }}>
            <rect x="1" y="3" width="6" height="4.5" rx="0.5" stroke="currentColor" strokeWidth="0.7" />
            <path d="M2.5 3V2.5a1.5 1.5 0 0 1 3 0V3" stroke="currentColor" strokeWidth="0.7" />
          </svg>
          algon.in/work/{index + 1}
        </div>
      </div>
      <div className="csd-mockup-img-wrap">
        <img src={src} alt="" className="csd-mockup-img" loading="lazy" />
        <div className="csd-mockup-hover-overlay" style={{ background: `${accent}12` }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0 }} className="csd-mockup-hover-icon">
            <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="0.8" />
            <path d="M12 16h8M16 12v8" stroke="white" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// function PhoneMockup({ src, accent, index }) {
//   return (
//     <div className="csd-mockup csd-mockup--phone">
//       <div className="csd-phone-shell">
//         <div className="csd-phone-notch" />
//         <div className="csd-phone-screen">
//           <img src={src} alt="" className="csd-mockup-img" loading="lazy" />
//           <div className="csd-mockup-hover-overlay" style={{ background: `${accent}15` }} />
//         </div>
//         <div className="csd-phone-home" />
//       </div>
//     </div>
//   );
// }

// function TabletMockup({ src, accent, index }) {
//   return (
//     <div className="csd-mockup csd-mockup--tablet">
//       <div className="csd-tablet-shell">
//         <div className="csd-tablet-camera" />
//         <div className="csd-tablet-screen">
//           <img src={src} alt="" className="csd-mockup-img" loading="lazy" />
//           <div className="csd-mockup-hover-overlay" style={{ background: `${accent}12` }} />
//         </div>
//         <div className="csd-tablet-button" />
//       </div>
//     </div>
//   );
// }

/* ─────────────────────────────────────────────────────────────────────────────
   7. RESULTS
──────────────────────────────────────────────────────────────────────────── */
function ResultsSection({ study }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll(".csd-result-row").forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 24 });
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-dark-section" data-navbar="dark">
      <GridPattern opacity={0.022} />
      <GrainOverlay />
      <div className="csd-section-number">05</div>
      <div className="csd-section-inner">
        <div className="csd-results-layout">
          <div className="csd-results-head">
             <h2 style={{
            fontWeight: 400,
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            marginBottom: "20px",
          }}>
            Before vs.  <br /> after

            {/* <span style={{
              background: "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }} className="font-light">
              after
            </span> */}
          </h2>
            {/* Testimonial inline */}
            <div className="csd-testimonial-inline">
              <div className="csd-tl-mark" style={{ color: study.accent }}>"</div>
              <p className="csd-tl-text">{study.testimonial.text}</p>
              <div className="csd-tl-author">
                <div className="csd-tl-avatar" style={{ background: `${study.accent}20`, borderColor: `${study.accent}35` }}>
                  <span style={{ color: study.accent, fontSize: 14, fontWeight: 600 }}>
                    {study.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="csd-tl-name">{study.testimonial.author}</p>
                  <p className="csd-tl-role">{study.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="csd-results-table-wrap">
            <div className="csd-results-table">
              <div className="csd-results-header">
                <span>Metric</span><span>Before</span><span>After</span><span>Δ</span>
              </div>
              {study.results.map((r, i) => (
                <div key={i} className="csd-result-row">
                  <span className="csd-result-metric">{r.metric}</span>
                  <span className="csd-result-before">{r.before}</span>
                  <span className="csd-result-after" style={{ color: study.accent }}>{r.after}</span>
                  <span className="csd-result-delta" style={{ borderColor: `${study.accent}30`, color: study.accent }}>{r.delta}</span>
                </div>
              ))}
            </div>
            {/* Big delta highlight */}
            {study.stats[0] && (
              <div className="csd-big-stat" style={{ borderColor: `${study.accent}20` }}>
                <span className="csd-big-stat-num" style={{ color: study.accent }}>
                  {study.stats[0].value}{study.stats[0].suffix}
                </span>
                <span className="csd-big-stat-label">{study.stats[0].label}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. CTA
──────────────────────────────────────────────────────────────────────────── */
function CTASection({ study, currentId }) {
  const idx = CASE_STUDIES.findIndex((s) => s.id === currentId);
  const next = idx < CASE_STUDIES.length - 1 ? CASE_STUDIES[idx + 1] : CASE_STUDIES[0];
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".csd-cta-inner > *", { autoAlpha: 0, y: 32 });
      gsap.to(".csd-cta-inner > *", {
        autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ".csd-cta-inner", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="csd-section csd-light-section csd-cta-section" data-navbar="dark">
      <GrainOverlay opacity={0.02} />
      {/* Big decorative text */}
      <div className="csd-cta-bg-text">Next</div>
      <div className="csd-section-inner csd-cta-inner">
        {/* <span className="ab-eyecta" style={{ color: "rgba(5,5,8,.5)" }}>Next Project</span> */}

        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <Link to={`/work/${next.id}`} className="csd-cta-next-link">
          <h2 className="csd-cta-next-title">{next.title}</h2>
          <p style={{ fontSize: 20, color: "rgba(5,5,8,1)", marginTop: 8, fontFamily: "Displayfont", fontWeight:"300" }}>
            {next.category}
          </p>
          <div className="csd-cta-arrow rounded-[5px]" style={{ borderColor: `${next.accent}40`, color: next.accent }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>

        <div className="h-full w-full rounded-[10px] object-cover overflow-hidden">
          <img className="hover:scale-105 transition-all duration-300 h-full w-full object-cover overflow-hidden" src={next.thumbnail} alt="" />
        </div>


        </div>

        <div className="csd-cta-divider" />

        <div className="csd-cta-contact">
          <p className="csd-body-text" style={{ color: "rgba(5,5,8,1)", maxWidth: "32ch" }}>
            Want results like these? Let's talk about what we can build together.
          </p>
          <Link to="/contact" className=" flex align-middle items-center gap-2 rounded-full border border-black px-8 py-3 hover:border-[#000] hover:bg-[#000] hover:text-[#fcfcf7] transition-all duration-300 text-black" style={{ fontFamily:"Displayfont", fontSize:"17px" }}>
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find((s) => s.id === id);

  useEffect(() => {
    if (!study) navigate("/work", { replace: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [id]);

  if (!study) return null;

  return (
    
    <>

    <a href={study.href} target="_blank">
          <div className="fixed h-[7vh] w-[7vh] flex right-5 bottom-5 rounded-md items-center justify-center bg-[#298dff] border-2  border-[#fcfcf7] z-[999] group ">
            <ArrowUpRight className="flex justify-center items-center group-hover:-translate-y-1 group-hover:translate-x-1  text-[#fcfcf7] transition-all duration-300"/>
          </div>
        </a>
    
      <style>{`
        /* ── KEYFRAMES ──────────────────────────────────────────── */
        @keyframes csd-arrow-bounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(8px); }
        }

        /* ── TOKENS ─────────────────────────────────────────────── */
        .csd-gradient-text {
          background:linear-gradient(135deg,#3ec9c7 0%,#1d7ea8 50%,#20359e 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .ab-eyebrow {
          font-size:10px;letter-spacing:.3em;text-transform:uppercase;
          color:rgba(255,255,255,.28);margin:0 0 18px;display:block;
        }
          .ab-eyecta {
          font-size:16px;font-family:Displayfont; 
          color:rgba(5,5,8,.5);margin:0 0 18px;display:block;
        }
        .ab-sw { display:inline;will-change:opacity; }

        /* ── SECTION SHARED ─────────────────────────────────────── */
        .csd-section {
          position:relative;padding:120px 0;overflow:hidden;
        }
        .csd-dark-section { background:#06060b;}
        .csd-light-section { background:#f7f7f2; }
        .csd-section-inner {
          position:relative;z-index:1;padding:0 7vw;margin:0 auto;
        }
        .csd-section-title {
          font-size:clamp(32px,4vw,60px);font-weight:300;
          line-height:1.05;letter-spacing:-.03em;margin:0;
        }
        .csd-body-text {
          font-size:clamp(18px,1.8vw,25px);font-weight:200;line-height:1.78;
          letter-spacing:-.005em;margin:0;
        }
        /* Large decorative section number */
        .csd-section-number {
          position:absolute;top:60px;right:7vw;
          font-size:clamp(100px,14vw,200px);font-weight:700;
          color:rgba(5,5,8,.02);letter-spacing:-.06em;
          line-height:1;pointer-events:none;z-index:0;user-select:none;
        }
        .csd-section-number--dark { color:rgba(252,255,247,.04); }

        /* ── SCROLL HINT ────────────────────────────────────────── */
        .cs-scroll-hint {
          position:absolute;bottom:32px;left:50%;transform:translateX(-50%);
          z-index:1;display:flex;flex-direction:column;align-items:center;gap:10px;
        }

                /* ── HERO ─────────────────────────────────────────────── */
        .csd-hero {
          position:relative;min-height:100vh;background:#050508;
          display:flex;flex-direction:column;justify-content:flex-end;
          overflow:hidden;padding-top:72px;
        }
        .csd-hero-img-wrap {
          position:absolute;inset:0;z-index:0;overflow:hidden;
        }
        .csd-hero-img {
          width:100%;height:100%;object-fit:cover;will-change:transform;
        }
        .csd-hero-overlay {
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(5,5,8,.3) 0%,rgba(5,5,8,.3)40%,rgba(5,5,8,.5)100%);
        }
        .csd-hero-inner {
          position:relative;z-index:1;padding:0 7vw 72px;max-width:1400px;
        }
        .csd-back {
          display:inline-flex;align-items:center;gap:10px;
          font-size:11px;letter-spacing:.18em;text-transform:uppercase;
          color:rgba(255,255,255,.5);text-decoration:none;
          margin-bottom:48px;transition:color .25s;
          position:absolute;bottom:3vh;right:0vw;
        }
        .csd-back:hover{color:rgba(255,255,255,.8);}
        .csd-hero-title-wrap{margin-bottom:40px;}
        .csd-hero-h1 {
          font-weight:400;font-size:clamp(52px,9vw,130px);line-height:.95;
          letter-spacing:-.04em;color:#fff;
        }
        .csd-hero-tagline {
        font-family:Displayfont;
          font-size:clamp(14px,1.3vw,23px);font-weight:400;
          color:rgba(255,255,255,.5);margin-left:2vw;max-width:50ch;
        }
        .csd-meta-row {
          display:flex;flex-wrap:wrap;gap:0;
                  }
        .csd-meta-item {
        font-family:Displayfont;
          flex:0 0 auto;padding-right:40px;padding-top:4px;
          margin-right:40px;
        }
        .csd-meta-item:last-child{border-right:none;}
        .csd-meta-label {
          display:block;font-size:20px;
          color:rgba(255,255,255,.8);margin-bottom:6px;font-weight:300;   letter-spacing:.14em;      }
        .csd-meta-val {
          font-size:25px;font-weight:300;color:rgba(255,255,255,.8);font-weight:400; 
        }
        .csd-service-pill {
          font-size:9px;letter-spacing:.14em;text-transform:uppercase;
          border:1px solid;padding:3px 10px;
        }

        /* ── SECTION SHARED ───────────────────────────────────── */
        .csd-section {
          position:relative;background:#fcfcf7;

          overflow:hidden;
        }
        .csd-section-inner {
          position:relative;z-index:1;padding-left:7vw ; padding-right:5vw;margin:0 auto;
        }
        .csd-section-head{margin-bottom:60px;}
        .csd-section-title {
          font-size:clamp(30px,4vw,58px);font-weight:300;
          line-height:1.05;letter-spacing:-.03em;color:#050508;margin:0;
        }



        /* ── OVERVIEW ───────────────────────────────────────────── */
        .csd-overview-section { background:#fcfcf7; }
        .csd-overview-layout {
          display:grid;grid-template-columns:1fr 1fr;gap:0 8vw;align-items:start;
        }
        .csd-overview-text {
          font-size:clamp(18px,1.8vw,30px);font-weight:200;
          line-height:1.55;letter-spacing:.05em;color:#050508;margin:0 0 36px;padding-right:10px;
        }
        .csd-services-row { display:flex;flex-wrap:wrap;gap:8px;margin-top:4px; }
        .csd-service-tag {
          font-family:Displayfont;font-size:15px;
          border:1px solid;padding:5px 14px;color:#050508; border-radius:100px;
        }
        /* Stat grid */
        .csd-stat-grid {
          display:grid;grid-template-columns:1fr 1fr;gap:0;
          

        }
        .csd-counter-item {
          padding:32px 28px;
          
          
        }
        .csd-counter-item:nth-child(even){border-right:none;}
        .csd-counter-item:nth-child(n+3){border-bottom:none;}
        .csd-counter-val {
          display:flex;align-items:baseline;gap:1px;font-family:Displayfont;
          font-size:clamp(36px,3.5vw,52px);letter-spacing:-.04em;line-height:1;
          margin-bottom:8px;font-weight:500;
        }
        .csd-counter-label {
        font-family:Displayfont;
          font-size:17px;
          color:rgba(5,5,8,.6);margin:0;
        }

        /* ── PROBLEM ────────────────────────────────────────────── */
        .csd-problem-layout {
          display:grid;grid-template-columns:1fr 1fr;gap:0 6vw;align-items:center;
        }
        .csd-pain-chips { display:flex;flex-direction:column;gap:12px; }
        .csd-pain-chip {
          display:flex;align-items:center;gap:10px;
          font-size:18px;letter-spacing:.03em;
          color:rgba(5,5,8,1);padding:6px 0px; font-weight:200;
          
        }
        .csd-problem-right {
          position:relative;display:flex;align-items:center;justify-content:center;min-height:340px;
        }
        .csd-problem-float {
          position:absolute;bottom:20px;right:0;
          
          display:flex;flex-direction:column;gap:4px;min-width:160px;
        }
        .csd-float-num { font-size:clamp(28px,3vw,40px);font-weight:600;letter-spacing:-.04em;line-height:1; }
        .csd-float-label { font-family:Displayfont;font-size:18px;color:rgba(5,5,8,.5);letter-spacing:.03em; }
        .csd-reveal {}

        /* ── STRATEGY ───────────────────────────────────────────── */
        .csd-strategy-head { margin-bottom:64px; }
        .csd-strategy-body {
          display:grid;grid-template-columns:1fr 1fr;gap:0 8vw;align-items:start;
        }
        .csd-pillars { display:flex;flex-direction:column;gap:0; }
        .csd-pillar {
          position:relative;padding:28px 0;
          
          display:flex;align-items:flex-start;gap:20px;
        }
        .csd-pillar-num {
          font-size:15px;font-weight:600;font-family:Displayfont;
          border:1px solid;width:28px;height:28px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;margin-top:2px;
        }
        .csd-pillar-title {font-family:Displayfont; font-size:20px;font-weight:400;color:#050508;margin:0 0 6px;letter-spacing:-.01em; }
        .csd-pillar-text { font-size:17px;color:rgba(5,5,8,1);line-height:1.65;margin:0; font-weight:200}
        .csd-pillar-line { position:absolute;bottom:0;left:0;right:0;height:1px;opacity:0;transition:opacity .3s; }

        /* ── EXECUTION ──────────────────────────────────────────── */
        .csd-exec-section { padding:100px 0; }
        .csd-exec-head { margin-bottom:72px; }
        .csd-exec-body {
          display:grid;grid-template-columns:2px 1fr;gap:0 52px;align-items:start;
        }
        .csd-exec-timeline { position:relative;align-self:stretch; }
        .csd-exec-line-bg {
          position:absolute;inset:0;background:rgba(5,5,8,.06);
        }
        .csd-exec-line-fill {
          position:absolute;inset:0;
        }
        .csd-exec-steps { display:flex;flex-direction:column;gap:0; }
        .csd-exec-step {
          position:relative;display:flex;gap:36px;align-items:flex-start;
          padding:48px 0;
        }
        .csd-exec-step-icon { flex-shrink:0; }
        .csd-exec-step-content { flex:1; }
        .csd-exec-phase {
          display:block;font-size:10px;letter-spacing:.24em;text-transform:uppercase;
          margin-bottom:10px;font-family:Displayfont;
        }
        .csd-exec-title {
          font-size:clamp(22px,2.2vw,25px);font-weight:400;color:#050508;
          letter-spacing:-.025em;margin:0 0 14px;
        }
        .csd-exec-desc {
         font-size:17px;color:rgba(5,5,8,1);font-weight:200;
          line-height:1.72;margin:0;max-width:50ch;
        }
        .csd-exec-connector {
          position:absolute;left:-53px;top:56px;width:52px;height:1px;
        }
        .csd-exec-connector-dot {
          position:absolute;left:0;top:50%;transform:translate(-50%,-50%);
          width:6px;height:6px;border-radius:50%;margin-left:1px;
        }

        /* ── GALLERY ────────────────────────────────────────────── */
        .csd-gallery-outer { background:#fcfcf7;padding-bottom:80px; }
        .csd-gallery-header { margin-bottom:56px; }
        .csd-horiz-track {
          display:flex;gap:20px;overflow-x:auto;overflow-y:visible;
          padding:40px 7vw 90px;
          scrollbar-width:none;cursor:grab;
          touch-action:pan-y;
          user-select:none;
        }
        .csd-horiz-track::-webkit-scrollbar{display:none;}
        .csd-gal-card {
          flex-shrink:0;position:relative;
          transition:transform .4s cubic-bezier(.22,1,.36,1);
        }
        .csd-gal-card:hover { transform:translateY(-8px); }
        .csd-gal-card--browser { width:560px; }
        .csd-gal-card--phone   { width:220px; }
        .csd-gal-card--tablet  { width:400px; }
        .csd-gal-card-num {
          position:absolute;top:-24px;left:0;
          font-size:11px;letter-spacing:.2em;
        }
        .csd-gallery-footer {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:24px;
        }
        .csd-gallery-controls {
          display:flex;
          align-items:center;
          justify-content:flex-end;
          gap:10px;
          margin-left:auto;
        }
        .csd-gallery-arrow {
          width:44px;
          height:44px;
          border-radius:999px;
          border:1px solid rgba(5,5,8,.16);
          background:transparent;
          color:#050508;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          transition:background .2s,color .2s,border-color .2s;
        }
        .csd-gallery-arrow:hover {
          background:#050508;
          color:#fcfcf7;
          border-color:#050508;
        }

        /* Browser mockup */
        .csd-mockup--browser { background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 24px 80px rgba(5,5,8,.14),0 0 0 1px rgba(5,5,8,.07); }
        .csd-browser-bar {
          display:flex;align-items:center;gap:12px;padding:10px 16px;
          border-bottom:1px solid;background:#fff;
        }
        .csd-browser-dots { display:flex;gap:6px; }
        .csd-browser-dots span { width:10px;height:10px;border-radius:50%;display:block; }
        .csd-browser-url {
          flex:1;background:rgba(5,5,8,.05);border-radius:4px;
          padding:4px 10px;font-size:10px;font-family:monospace;letter-spacing:.03em;
          display:flex;align-items:center;
        }
        .csd-mockup-img-wrap { position:relative;height:320px; overflow:hidden; }
        .csd-mockup-img { width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.22,1,.36,1); }
        .csd-gal-card:hover .csd-mockup-img { transform:scale(1.04); }
        .csd-mockup-hover-overlay {
          position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
          opacity:0;transition:opacity .3s;
        }
        .csd-gal-card:hover .csd-mockup-hover-overlay{opacity:1;}

        /* Phone mockup */
        .csd-mockup--phone { display:flex;align-items:center;justify-content:center; }
        .csd-phone-shell {
          width:180px;background:#1a1a1f;border-radius:20px;padding:12px 8px;
          box-shadow:0 24px 60px rgba(5,5,8,.25),inset 0 0 0 1px rgba(255,255,255,.1);
          display:flex;flex-direction:column;align-items:center;gap:8px;
        }
        .csd-phone-notch {
          width:60px;height:6px;background:#050508;border-radius:10px;
        }
        .csd-phone-screen {
          width:100%;height:340px;border-radius:15px;overflow:hidden;position:relative;
        }
        .csd-phone-home {
          width:40px;height:4px;background:rgba(255,255,255,.2);border-radius:10px;
        }

        /* Tablet mockup */
        .csd-mockup--tablet { display:flex;align-items:center;justify-content:center; }
        .csd-tablet-shell {
          width:360px;background:#1a1a1f;border-radius:20px;padding:12px 20px;
          box-shadow:0 24px 60px rgba(5,5,8,.2),inset 0 0 0 1px rgba(255,255,255,.1);
          display:flex;flex-direction:column;align-items:center;gap:10px;
        }
        .csd-tablet-camera {
          width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);
        }
        .csd-tablet-screen {
          width:100%;height:240px;border-radius:8px;overflow:hidden;position:relative;
        }
        .csd-tablet-button {
          width:24px;height:4px;background:rgba(255,255,255,.15);border-radius:10px;
        }

        .csd-scroll-indicator { display:flex;align-items:center;gap:16px; }
        .csd-scroll-track { width:120px;height:1px;background:rgba(5,5,8,.1);position:relative; }
        .csd-scroll-thumb { position:absolute;left:0;top:0;height:100%;width:40px; }

        /* ── RESULTS ────────────────────────────────────────────── */
        .csd-results-layout {
          display:grid;grid-template-columns:1fr 1.2fr;gap:0 8vw;align-items:start; 
        }
        .csd-results-head { position:sticky;top:80px; }
        .csd-results-table-wrap { display:flex;flex-direction:column;gap:24px; }
        .csd-results-table { border:1px solid rgba(5,5,8,.07);overflow:hidden; border-radius:10px; }
        .csd-results-header {
          display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:14px 24px;
          background:rgba(5,5,8,.03);font-size:15px;
          color:rgba(5,5,8,.5);font-family:Displayfont;
          border-bottom:1px solid rgba(5,5,8,.06);
        }
        .csd-result-row {
          display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:22px 24px;
          border-bottom:1px solid rgba(5,5,8,.05);transition:background .25s;
        }
        .csd-result-row:last-child{border-bottom:none;}
        .csd-result-row:hover{background:rgba(5,5,8,.02);}
        .csd-result-metric { font-size:15px;font-weight:500;color:rgba(5,5,8,.5); font-family:Displayfont; }
        .csd-result-before {font-size:15px;font-weight:500;color:rgba(5,5,8,.5); font-family:Displayfont; }
        .csd-result-after  { font-size:15px;font-weight:500;color:rgba(5,5,8,.5); font-family:Displayfont;}
        .csd-result-delta {
          font-size:15px;font-weight:500;font-family:Displayfont;
          padding:2px 10px;display:inline-flex;align-items:center;
          height:fit-content;letter-spacing:.05em; 
        }
        .csd-big-stat {
          border:1px solid;padding:36px;display:flex;flex-direction:column;gap:8px; border-radius:10px;
        }
        .csd-big-stat-num {
          font-size:clamp(52px,6vw,80px);font-weight:500;line-height:1;letter-spacing:-.05em;font-family:Displayfont;
        }
        .csd-big-stat-label {
          font-size:15px; font-family:Displayfont;
          color:rgba(5,5,8,1);
        }

        /* Testimonial inline */
        .csd-testimonial-inline { margin-top:56px; }
        .csd-tl-mark { font-size:80px;line-height:.5;font-weight:700;opacity:.35;margin-bottom:12px; }
        .csd-tl-text {
          font-size:clamp(17px,1.4vw,25px);font-weight:200;
          color:rgba(5,5,8,1);line-height:1.65;margin:0 0 28px;
        }
        .csd-tl-author { display:flex;align-items:center;gap:16px; }
        .csd-tl-avatar {
          width:44px;height:44px;border-radius:50%;border:1px solid;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
        }
        .csd-tl-name { font-size:14px;font-weight:500;color:rgba(5,5,8,.8);margin:0 0 3px; font-family:Displayfont;}
        .csd-tl-role { font-size:13px;font-family:Displayfont; color:rgba(5,5,8,.5);margin:0; }

        /* ── CTA ────────────────────────────────────────────────── */
        .csd-cta-section { position:relative;padding:120px 0;overflow:hidden; }
        .csd-cta-bg-text {
          position:absolute;bottom:-0.1em;left:7vw;
          font-size:clamp(120px,18vw,240px);font-weight:800;
          color:rgba(5,5,8,.04);letter-spacing:-.06em;line-height:1;pointer-events:none;
        }
        .csd-cta-inner { position:relative;z-index:1; }
        .csd-cta-next-link {
          display:block;text-decoration:none;margin-top:8px;
          padding:0px 0 40px 0;
          
          position:relative;group:true;transition:padding .35s; 
        }
        .csd-cta-next-link:hover { padding-left:20px; }
        .csd-cta-next-title {
          font-size:clamp(36px,5.5vw,80px);font-weight:400;color:#050508;
          letter-spacing:-.04em;line-height:.95;margin:0;
          transition:color .3s;font-family:Displayfont;
        }
        .csd-cta-next-link:hover .csd-cta-next-title{color:#050508;}
        .csd-cta-arrow {
          display:inline-flex;align-items:center;justify-content:center;
          width:44px;height:44px;border:1px solid;margin-top:24px;
          transition:transform .3s;
        }
        .csd-cta-next-link:hover .csd-cta-arrow{transform:translateX(8px);}
        .csd-cta-divider { height:80px; }
        .csd-cta-contact { display:flex;align-items:center;gap:48px;flex-wrap:wrap; }
        .csd-cta-btn {
          display:inline-flex;align-items:center;gap:10px;
          color:#fff;text-decoration:none;padding:16px 32px;
          font-size:16px;
          font-family:Displayfont;transition:opacity .2s,transform .2s;
        }
        .csd-cta-btn:hover{opacity:.85;transform:translateY(-2px);}

        /* ── LIGHTBOX ───────────────────────────────────────────── */
        .csd-lightbox {
          position:fixed;inset:0;z-index:9999;background:rgba(5,5,8,.97);
          display:flex;align-items:center;justify-content:center;
          backdrop-filter:blur(16px);
        }
        .csd-lb-content { display:flex;flex-direction:column;gap:0;align-items:center; }
        .csd-lb-img {
          max-width:84vw;max-height:80vh;object-fit:contain;
          box-shadow:0 40px 120px rgba(0,0,0,.7);
        }
        .csd-lb-meta {
          display:flex;justify-content:space-between;width:100%;margin-top:16px;
          padding:0 4px;
        }
        .csd-lb-close {
          position:absolute;top:24px;right:32px;background:none;border:none;
          color:rgba(255,255,255,.35);font-size:20px;cursor:pointer;transition:color .2s;
        }
        .csd-lb-close:hover{color:#fff;}
        .csd-lb-arrow {
          position:absolute;top:50%;transform:translateY(-50%);
          background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.55);padding:16px 20px;cursor:pointer;
          transition:background .2s,color .2s;
        }
        .csd-lb-arrow:hover{background:rgba(255,255,255,.12);color:#fff;}
        .csd-lb-arrow--prev{left:32px;}
        .csd-lb-arrow--next{right:32px;}

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



        /* ── RESPONSIVE ─────────────────────────────────────────── */
        @media(max-width:1024px){
          .csd-overview-layout,.csd-problem-layout,.csd-strategy-body,.csd-results-layout{
            grid-template-columns:1fr;gap:60px 0;
          }
          .csd-results-head{position:static;}
          .csd-exec-body{grid-template-columns:1fr;gap:0;}
          .csd-exec-timeline{display:none;}
          .csd-exec-connector{display:none;}
          .csd-results-header,.csd-result-row{grid-template-columns:2fr 1fr 1fr;}
          .csd-results-header span:last-child,.csd-result-delta{display:none;}
          .csd-mockup-img-wrap { position:relative;height:300px; overflow:hidden; }
        }
        @media(max-width:640px){
          .csd-hero-h1{font-size:clamp(40px,14vw,80px);}
          .csd-meta-row{flex-direction:column;gap:20px;}
          .csd-meta-item{border-right:none;margin-right:0;padding-right:0;}
          .csd-stat-grid{grid-template-columns:1fr;}
          .csd-counter-item{border-right:none;}
          .csd-cta-contact{flex-direction:column;align-items:flex-start;gap:24px;}
          .csd-lb-arrow--prev{left:8px;}
          .csd-lb-arrow--next{right:8px;}
          .csd-gal-card--browser{width:320px;}
          .csd-gal-card--tablet{width:280px;}
          .csd-mockup-img-wrap { position:relative;height:180px; overflow:hidden; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <ScrollIndicator />
        
        <DetailHero study={study} />
        <Overview study={study} />
        <ProblemSection study={study} />
        <RevealImageSection study={study}/>
        <StrategySection study={study} />
        <ExecutionSection study={study} />
        <GallerySection study={study} />
        <ResultsSection study={study} />
        <CTASection study={study} currentId={id} />
        <Footer />
      </div>
    </>
  );
}
