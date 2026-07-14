/**
 * PortfolioPage.jsx
 *
 * Neon-tech portfolio — matches Algon home aesthetic.
 * Sections:
 *   1. Hero — animated neon grid, word reveal, counter strip
 *   2. Sticky featured project reel — 5 projects pin + scrub
 *   3. Project grid — 3D card tilt, neon hover
 *   4. Stats marquee
 *   5. CTA strip
 *
 * DEPS: gsap (already in project), @react-three/fiber, three
 */

import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import animationData from "/src/assets/laptop.json";
import { Link } from "react-router-dom";
import ScrollIndicator from "../components/ui/ScrollIndicator";
import FAQ_Section from "../components/ui/FAQ";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────────── */
const FEATURED = [
  {
    num: "01",
    id: "visat",
    title: "Visat",
    category: "Website & Interactive Platform",
    year: "2024",
    desc: "An immersive college platform featuring 360-degree campus views and intelligent AI teacher agents. Delivered with integrated CMS in 8 weeks.",
    tags: ["Solidity", "React", "Ethers.js", "Hardhat"],
    accent: "#fff",
    stat: "8 wks",
    statLabel: "Full delivery",
    bg: "linear-gradient(135deg, #0d0109 0%, #170214 50%, #070105 100%)",
    image: "/images/clients/gallery/visat/hero.webp",
    href: "https://visat.in",
  },

  {
    num: "02",
    id: "hms",
    title: "Mindful Rejuvenation",
    category: "Hospital management system",
    year: "2026",
    desc: "A comprehensive hospital management platform streamlining OP, pharmacy, and advanced healthcare workflows. Delivered with intelligent AI technologies in 8 weeks.",
    tags: ["postgresql", "React", "Node.js"],
    accent: "#fff",
    stat: "12 wks",
    statLabel: "Full delivery",
    bg: "linear-gradient(135deg, #01040d 0%, #020517 50%, #010107 100%)",
    image: "/images/clients/gallery/hms/hero.webp",
    href: "#",
  },

  {
    num: "03",
    id: "thesneek",
    title: "Thesneek",
    category: "Shopify Solution",
    year: "2026",
    desc: "Full Shopping infrastructure — Order management, Product management, Brand Identity. Delivered in 8 weeks.",
    tags: ["Shopify", "React"],
    accent: "#fff",
    stat: "8 wks",
    statLabel: "Full delivery",
    bg: "linear-gradient(135deg, #0d0301 0%, #170702 50%, #070201 100%)",
    image: "/images/clients/gallery/sneek/hero.webp",
    href: "https://www.thesneek.com/",
  },

  // {
  //   num:"04",
  //   id: "drisya-marble",
  //   title: "Drisya Marble",
  //   category: "SaaS Platform",
  //   year: "2024",
  //   desc: "End-to-end event management SaaS — ticketing, check-in, analytics dashboard and white-label embeds. 10M+ daily check-ins.",
  //   tags: ["React", "Node.js", "Stripe", "WebSockets"],
  //   accent: "#a31913",
  //   stat: "10M+",
  //   statLabel: "Daily check-ins",
  //   bg: "linear-gradient(135deg, #0f0605 0%, #1d0906 50%, #080403 100%)",
  //   image:
  //     "/images/clients/gallery/drisya/hero.webp",
  // },

  // {
  //   num:"05",
  //   id: "corewood",
  //   title: "Corewood",
  //   category: "eCommerce & Shopify",
  //   year: "2023",
  //   desc: "Custom Shopify storefront with headless architecture, 3D product visualiser and conversion-optimised checkout. +28% CVR.",
  //   tags: ["Shopify", "Three.js", "Next.js", "Tailwind"],
  //   accent: "#ff6b35",
  //   stat: "+28%",
  //   statLabel: "Conversion rate",
  //   bg: "linear-gradient(135deg, #0d0500 0%, #170a00 50%, #070300 100%)",
  //   image:
  //     "/images/clients/gallery/corewood/hero.webp",
  // },
  // {
  //   num:"06",
  //   id: "unity-heights",
  //   title: "Unity Heights",
  //   category: "Real Estate Platform",
  //   year: "2023",
  //   desc: "Property listing platform with virtual tours, mortgage calculator and lead management CRM. Serving 50k+ monthly users.",
  //   tags: ["React", "Node.js", "PostgreSQL", "AR"],
  //   accent: "#a855f7",
  //   stat: "50k+",
  //   statLabel: "Monthly users",
  //   bg: "linear-gradient(135deg, #07000c 0%, #0d0018 50%, #030007 100%)",
  //   image:
  //     "/images/clients/gallery/unity/hero.webp",
  // },
  // {
  //   num:"05",
  //   id: "qot-interiors",
  //   title: "QOT Interiors",
  //   category: "Brand & Web",
  //   year: "2023",
  //   desc: "Complete digital identity — brand system, editorial website with immersive scroll and 3D room configurator.",
  //   tags: ["GSAP", "Three.js", "Webflow", "Figma"],
  //   accent: "#f59e0b",
  //   stat: "3D",
  //   statLabel: "Room configurator",
  //   bg: "linear-gradient(135deg, #0d0800 0%, #170e00 50%, #070400 100%)",
  //   image:
  //     "/images/clients/gallery/qot/hero.webp",
  // },
];

const GRID_PROJECTS = [
  {
    id: "06",
    title: "Drisya Marble",
    cat: "Web + Brand",
    year: "2023",
    pic: "/images/clients/gallery/drisya/thumbnail.webp",
    accent: "#e82727",
    tags: ["React", "GSAP", "CMS"],
    href: "work/drisya-marble",
  },
  {
    id: "07",
    title: "Corewood",
    cat: "Portfolio + Branding",
    year: "2024",
    pic: "/images/clients/gallery/corewood/thumbnail.webp",
    accent: "#f07829",
    tags: ["HTML", "Branding", "CSS"],
    href: "work/corewood",
  },
  {
    id: "09",
    title: "VISAT",
    cat: "College + SaaS",
    year: "2023",
    pic: "/images/clients/gallery/visat/thumbnail.webp",
    accent: "#de078b",
    tags: ["HTML","CSS", "Node.js","CMS", "AI"],
    href: "work/visat",
  },
];

const STATS = [
  "48+ Projects",
  "4 Years",
  "10M Daily Users",
  "8 Countries",
  "100% On-time",
  "$2M+ Revenue Generated",
  "48+ Projects",
  "4 Years",
  "10M Daily Users",
  "8 Countries",
  "100% On-time",
  "$2M+ Revenue Generated",
];

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

/* ─────────────────────────────────────────────────────────────────────────────
   3-D FLOATING GEOMETRY — lightweight decorative
──────────────────────────────────────────────────────────────────────────── */
function FloatingGeo({ accent }) {
  const meshRef = useRef();
  const edgesRef = useRef();
  const col = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18;
      meshRef.current.rotation.y = t * 0.26;
      meshRef.current.rotation.z = t * 0.09;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = t * 0.18;
      edgesRef.current.rotation.y = t * 0.26;
      edgesRef.current.rotation.z = t * 0.09;
    }
  });

  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.9, 0), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  return (
    <group>
      {/* Transparent fill */}
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color={col}
          transparent
          opacity={0.06}
          roughness={0.1}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Neon wireframe edges */}
      <lineSegments ref={edgesRef} geometry={edgeGeo}>
        <lineBasicMaterial color={accent} transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────────────────────────────────── */
function PortfolioHero() {
  const heroRef = useRef();
  const h1Ref = useRef();
  const subRef = useRef();
  const numRef = useRef();
  const lineRef = useRef();
  const gridRef = useRef();
  const marqRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee
      let x = 0;
      let raf;
      const track = marqRef.current;
      const run = () => {
        x -= 0.65;
        if (track && Math.abs(x) >= track.scrollWidth / 2) x = 0;
        if (track) track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);

      // Grid fade in
      gsap.set(gridRef.current, { autoAlpha: 0 });
      gsap.to(gridRef.current, {
        autoAlpha: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // Neon scan line across grid
      const scan = document.createElement("div");
      scan.className = "pf-scan";
      heroRef.current?.appendChild(scan);
      gsap.fromTo(
        scan,
        { top: "-10%", opacity: 0 },
        {
          top: "110%",
          opacity: 0,
          duration: 2.5,
          ease: "none",
          repeat: -1,
          onUpdate: function () {
            const progress = this.progress();
            // Fade in at start, fade out at end
            if (progress < 0.1) {
              scan.style.opacity = progress * 10;
            } else if (progress > 0.9) {
              scan.style.opacity = (1 - progress) * 10;
            } else {
              scan.style.opacity = 1;
            }
          },
        },
      );

      // Canvas slide in
      gsap.set(canvasRef.current, { autoAlpha: 0, x: 60 });
      gsap.to(canvasRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.4,
      });

      // Text reveals
      // gsap.set(
      //   [lineRef.current, h1Ref.current, subRef.current, numRef.current],
      //   { autoAlpha: 0, y: 30 },
      // );
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(
        lineRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          transformOrigin: "left",
        },
        0,
      )
        .to(
          h1Ref.current,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" },
          0.1,
        )
        .to(
          subRef.current,
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.4,
        )
        .to(
          numRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.55,
        );

      return () => cancelAnimationFrame(raf);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="pf-hero">
      {/* Neon grid background */}
      {/* <div ref={gridRef} className="pf-grid-neon" aria-hidden="true" />
      <div className="pf-grain" aria-hidden="true" /> */}

      {/* Blue gradient orbs */}
      <div className="pf-orb pf-orb--1" aria-hidden="true" />
      <div className="pf-orb pf-orb--2" aria-hidden="true" />

      <div className="pf-hero-inner">
        {/* Left text */}
        <div className="pf-hero-left">
          {/* <div ref={lineRef} className="pf-hero-rule" style={{ scaleX: 0 }} /> */}
          {/* <p className="pf-eyebrow">Selected Work</p> */}

          <h1 ref={h1Ref} className="pf-hero-h1 z-20">
            Works that <br /> speaks for itself.
            <br />
            {/* <span
              style={{
                background:
                  "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-light"
            >
              speaks for itself.
            </span> */}
          </h1>

          {/* <p ref={subRef} className="pf-hero-sub">
            48 projects across 8 countries. From SaaS platforms to Web3
            infrastructure — built with obsession.
          </p> */}

          <div ref={numRef} className="pf-hero-counts">
            {[
              ["48+", "Projects"],
              ["8", "Countries"],
              ["4", "Years"],
            ].map(([n, l]) => (
              <div key={l} className="pf-hcount">
                <span className="pf-hcount-num">{n}</span>
                <span className="pf-hcount-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D */}
        <div ref={canvasRef} className="pf-hero-canvas">
          {/* <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 3], fov: 42 }}
            gl={{ antialias: true, alpha: true, stencil: false }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} color="#0a1020" />
            <pointLight position={[2, 2, 2]} intensity={12} color="#4a6fff" distance={8} decay={2} />
            <pointLight position={[-2, -1, 1]} intensity={6} color="#00d4aa" distance={6} decay={2} />
            <Suspense fallback={null}>
              <FloatingGeo accent="#4a6fff" />
              <Environment preset="city" />
            </Suspense>
          </Canvas> */}
          <div className="  flex justify-start items-start">
            <div className="relative w-[90vw] md:w-[550px] h-[40vh] md:h-[550px]">
              <Lottie animationData={animationData} />
            </div>
          </div>

          {/* Corner labels */}
        </div>
      </div>

      {/* Marquee bottom strip */}
      {/* <div className="pf-marq-wrap">
        <div ref={marqRef} className="pf-marq-track">
          {STATS.map((s, i) => (
            <span key={i} className="pf-marq-item">
              {s} <span className="pf-marq-dot">◆</span>
            </span>
          ))}
        </div>
      </div> */}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STICKY FEATURED REEL
──────────────────────────────────────────────────────────────────────────── */
function FeaturedReel() {
  const wrapRef = useRef();
  const stickyRef = useRef();
  const trackRef = useRef();
  const [activeIdx, setActiveIdx] = useState(0);

  // Per-project refs
  const projRefs = useRef(
    FEATURED.map(() => ({
      wrap: { current: null },
      num: { current: null },
      cat: { current: null },
      title: { current: null },
      desc: { current: null },
      tags: { current: null },
      stat: { current: null },
      canvas: { current: null },
    })),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = FEATURED.length;

      // Set all hidden
      projRefs.current.forEach((r, i) => {
        const all = [
          r.num.current,
          r.cat.current,
          r.title.current,
          r.desc.current,
          r.tags.current,
          r.stat.current,
        ];
        gsap.set(all.filter(Boolean), { autoAlpha: 0 });
        if (r.canvas.current)
          gsap.set(r.canvas.current, { autoAlpha: 0, scale: 0.88 });
        if (r.wrap.current) gsap.set(r.wrap.current, { autoAlpha: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: `+=${total * 100}%`,
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveIdx(idx);
          },
        },
      });

      FEATURED.forEach((proj, i) => {
        const r = projRefs.current[i];
        const s = i / total;
        const e = (i + 0.85) / total;
        const o = (i + 0.85) / total;
        const oe = (i + 1) / total;

        // IN
        tl.to(
          r.wrap.current,
          { autoAlpha: 1, duration: 0.06, ease: "power2.out" },
          s,
        );
        tl.to(
          r.canvas.current,
          { autoAlpha: 1, scale: 1, duration: 0.1, ease: "expo.out" },
          s + 0.01,
        );
        tl.to(
          r.num.current,
          { autoAlpha: 1, y: 0, duration: 0.07, ease: "power3.out" },
          s + 0.03,
        );
        tl.to(
          r.cat.current,
          { autoAlpha: 1, y: 0, duration: 0.06, ease: "power3.out" },
          s + 0.05,
        );
        tl.to(
          r.title.current,
          { autoAlpha: 1, y: 0, duration: 0.08, ease: "power4.out" },
          s + 0.06,
        );
        tl.to(
          r.desc.current,
          { autoAlpha: 1, y: 0, duration: 0.07, ease: "power3.out" },
          s + 0.1,
        );
        tl.to(
          r.tags.current,
          { autoAlpha: 1, y: 0, duration: 0.06, ease: "power3.out" },
          s + 0.13,
        );
        tl.to(
          r.stat.current,
          { autoAlpha: 1, scale: 1, duration: 0.08, ease: "back.out(1.4)" },
          s + 0.15,
        );

        if (i < total - 1) {
          // OUT (not last)
          tl.to(
            [
              r.title.current,
              r.desc.current,
              r.tags.current,
              r.num.current,
              r.cat.current,
            ],
            { autoAlpha: 0, y: -20, duration: 0.06, ease: "power2.in" },
            o,
          );
          tl.to(
            r.stat.current,
            { autoAlpha: 0, scale: 0.85, duration: 0.05 },
            o + 0.01,
          );
          tl.to(
            r.canvas.current,
            { autoAlpha: 0, scale: 0.88, duration: 0.08, ease: "power2.in" },
            o + 0.02,
          );
          tl.to(r.wrap.current, { autoAlpha: 0, duration: 0.04 }, oe - 0.01);
        }

        // Reset y for next in
        const nextItems = [
          r.num.current,
          r.cat.current,
          r.title.current,
          r.desc.current,
          r.tags.current,
        ];
        nextItems.filter(Boolean).forEach((el) => gsap.set(el, { y: 24 }));
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="pf-reel-wrap">
      <div ref={stickyRef} className="pf-reel-sticky">
        {/* <div className="pf-grid-bg" />
        <div className="pf-grain" /> */}

        {/* Progress indicator */}
        <div className="pf-reel-progress">
          {FEATURED.map((_, i) => (
            <div
              key={i}
              className={`pf-prog-dot ${i === activeIdx ? "pf-prog-dot--active" : ""}`}
              style={{ "--accent": FEATURED[i].accent }}
            />
          ))}
        </div>

        {/* Counter */}
        {/* <div className="pf-reel-counter">
          <span className="pf-reel-counter-cur">0{activeIdx + 1}</span>
          <span className="pf-reel-counter-sep"> / </span>
          <span className="pf-reel-counter-total">0{FEATURED.length}</span>
        </div> */}

        {/* Stacked project panels */}
        {FEATURED.map((proj, i) => {
          const r = projRefs.current[i];
          return (
            <div
              key={proj.id}
              ref={(el) => {
                r.wrap.current = el;
              }}
              className="pf-reel-panel"
              style={{ "--accent": proj.accent, background: "#050508" }}
            >
              {/* Neon accent line top */}
              {/* <div
                className="pf-panel-accent-line"
                style={{ background: proj.accent }}
              /> */}

              {/* Left: text */}
              <div className="pf-panel-left">
                <div
                  ref={(el) => {
                    r.num.current = el;
                  }}
                  className="pf-panel-num "
                >
                  {proj.num}
                </div>
                {/* <div
                  ref={(el) => {
                    r.cat.current = el;
                  }}
                  className="pf-panel-cat"
                >
                  {proj.category} · {proj.year}
                </div> */}
                <h2
                  ref={(el) => {
                    r.title.current = el;
                  }}
                  className="pf-panel-title"
                >
                  {proj.title}
                </h2>
                <p
                  ref={(el) => {
                    r.desc.current = el;
                  }}
                  className="pf-panel-desc"
                >
                  {proj.desc}
                </p>
                {/* <div
                  ref={(el) => {
                    r.tags.current = el;
                  }}
                  className="pf-panel-tags"
                >
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="pf-tag"
                      style={{ borderColor: proj.accent + "55" , borderRadius: "999px", background:proj.accent + "85", color: "#ddd", fontWeight:"500" }}
                    >
                      {t}
                    </span>
                  ))}
                </div> */}
                <Link
                  to={`/work/${proj.id}`}
                  className="pf-panel-link w-fit  rounded-full bg-[#050508] border border-[#fcfcf7] px-8 py-3 hover:bg-[#fcfcf7] hover:text-[#050508] transition-all duration-300"
                >
                  View case study
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    style={{ marginLeft: 8 }}
                  >
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              {/* Right: visual + stat */}
              <div className="pf-panel-right">
                {/* Project image */}
                <div
                  ref={(el) => {
                    r.canvas.current = el;
                  }}
                  className="pf-panel-canvas"
                >
                  {/* Ambient 3D geo — floats behind the image */}
                  {/* <div className="pf-panel-canvas-3d" aria-hidden="true">
                    <Canvas
                      dpr={[1, 1.5]}
                      camera={{ position: [0, 0, 3], fov: 44 }}
                      gl={{ antialias: true, alpha: true, stencil: false }}
                      style={{ background: "transparent" }}
                    >
                      <ambientLight intensity={0.3} color="#050508" />
                      <pointLight position={[1, 2, 2]} intensity={10} color={proj.accent} distance={8} decay={2} />
                      <pointLight position={[-2, -1, 1]} intensity={5} color="#ffffff" distance={6} decay={2} />
                      <Suspense fallback={null}>
                        <FloatingGeo accent={proj.accent} />
                        <Environment preset="city" />
                      </Suspense>
                    </Canvas>
                  </div> */}

                  {/* Project image — full bleed, premium overlay */}
                  <a href={proj.href} target="_blank">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="pf-panel-img"
                    />
                  </a>

                  {/* Gradient overlay — bottom fade + accent tint */}
                  {/* <div
                    className="pf-panel-img-overlay"
                    style={{
                      background: `linear-gradient(
                        to top,
                        ${proj.accent}22 0%,
                        rgba(5,5,8,0.10) 100%
                      )`,
                    }}
                  /> */}

                  {/* Top-left accent corner */}
                  {/* <div
                    className="pf-panel-img-corner pf-panel-img-corner--tl"
                    style={{ borderColor: proj.accent + "88" }}
                  /> */}
                  {/* Bottom-right accent corner */}
                  {/* <div
                    className="pf-panel-img-corner pf-panel-img-corner--br"
                    style={{ borderColor: proj.accent + "88" }}
                  /> */}

                  {/* <div
                    className="pf-panel-img-corner pf-panel-img-corner--tr"
                    style={{ borderColor: proj.accent + "88" }}
                  /> */}

                  {/* <div
                    className="pf-panel-img-corner pf-panel-img-corner--bl"
                    style={{ borderColor: proj.accent + "88" }}
                  /> */}

                  {/* Category badge */}
                  {/* <div className="pf-panel-img-badge" style={{ color: proj.accent }}>
                    {proj.category}
                  </div> */}
                </div>

                {/* Big stat */}
                <div className="flex justify-start w-full">
                  <div
                    ref={(el) => {
                      r.stat.current = el;
                    }}
                    className="pf-panel-stat"
                  >
                    <span
                      className="pf-panel-stat-num"
                      style={{ color: proj.accent }}
                    >
                      {proj.stat}
                    </span>
                    <span className="pf-panel-stat-lbl">{proj.statLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT GRID
──────────────────────────────────────────────────────────────────────────── */
function GridCard({ proj, index }) {
  const cardRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    gsap.to(card, {
      rotateY: dx * 10,
      rotateX: -dy * 10,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
    });
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`;
      glowRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };
  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1,0.4)",
    });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="pf-grid-card"
      style={{ "--accent": proj.accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <div ref={glowRef} className="pf-gc-glow" />

      {/* Neon corner bracket TL */}
      {/* <div className="pf-gc-bracket pf-gc-bracket--tl" /> */}
      {/* Neon corner bracket BR */}
      {/* <div className="pf-gc-bracket pf-gc-bracket--br" /> */}

      {/* Placeholder visual area */}
      <div className="pf-gc-visual">
        {/* <div className="pf-gc-num">{proj.id}</div>

        <svg className="pf-gc-svg" viewBox="0 0 200 120" fill="none">
          <line x1="0" y1="60" x2="200" y2="60" stroke={proj.accent} strokeOpacity="0.15" strokeWidth="1"/>
          <line x1="100" y1="0" x2="100" y2="120" stroke={proj.accent} strokeOpacity="0.15" strokeWidth="1"/>
          <circle cx="100" cy="60" r="30" stroke={proj.accent} strokeOpacity={hovered ? "0.5" : "0.18"} strokeWidth="1"
            style={{ transition: "stroke-opacity 0.4s" }}/>
          <circle cx="100" cy="60" r="50" stroke={proj.accent} strokeOpacity={hovered ? "0.25" : "0.08"} strokeWidth="0.7"
            style={{ transition: "stroke-opacity 0.4s" }}/>
          <circle cx="100" cy="60" r="8" fill={proj.accent} fillOpacity={hovered ? "0.6" : "0.2"}
            style={{ transition: "fill-opacity 0.4s" }}/>
        </svg>
        <div className="pf-gc-year">{proj.year}</div> */}
        <a href={proj.href} target="_blank">
          <img src={proj.pic} alt={proj.title} />{" "}
        </a>
        {/* <div
          className="pf-panel-img-overlay"
          style={{
            background: `linear-gradient(
                        to top,
                        rgba(5,5,8,.8) 0%,
                        rgba(5,5,8,.2) 50%,
                        rgba(5,5,8,0.0) 100%
                      )`,
          }}
        /> */}
      </div>

      <div className="pf-gc-body">
        <div className="pf-gc-cat">{proj.cat}</div>
        <h3 className="pf-gc-title">{proj.title}</h3>
        <div className="pf-gc-tags">
          {proj.tags.map((t) => (
            <span key={t} className="pf-tag pf-tag--sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="pf-gc-bar" />
    </div>
  );
}

function ProjectGrid() {
  const sectionRef = useRef();
  const headRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { autoAlpha: 0, y: 50 });
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 3) * 0.09,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pf-grid-section">
      {/* <div className="pf-grid-bg" />
      <div className="pf-grain" /> */}

      <div className="pf-grid-inner">
        <div ref={headRef} className="pf-grid-head">
          {/* <p className="pf-eyebrow">More work</p> */}
          <h2 className="pf-section-title">
            Every project, <br /> a different challenge.
            <br />
            {/* <span
              style={{
                background:
                  "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-light"
            >
              a different challenge.
            </span> */}
          </h2>
        </div>

        <div className="pf-grid">
          {GRID_PROJECTS.map((proj, i) => (
            <div key={proj.id} ref={(el) => (cardsRef.current[i] = el)}>
              <GridCard proj={proj} index={i} />
            </div>
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
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROCESS / APPROACH STRIP
──────────────────────────────────────────────────────────────────────────── */
function ApproachStrip() {
  const ref = useRef();
  const lineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      const items = ref.current?.querySelectorAll(".pf-approach-item");
      items?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 24 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="pf-approach">
      <div className="pf-grid-bg" />
      <div className="pf-grain" />
      <div className="pf-approach-inner">
        <p className="pf-eyebrow">Our approach</p>
        <div ref={lineRef} className="pf-approach-rule" />
        <div className="pf-approach-row">
          {[
            {
              n: "01",
              t: "Scope ruthlessly",
              d: "We define what success looks like before touching code. Scope creep is a choice — we don't make it.",
            },
            {
              n: "02",
              t: "Build in the open",
              d: "Weekly demos, live staging, transparent progress. You always know exactly where things stand.",
            },
            {
              n: "03",
              t: "Ship, then iterate",
              d: "A good product in users' hands beats a perfect product in a backlog. We ship fast, then make it better.",
            },
            {
              n: "04",
              t: "Own the outcome",
              d: "We don't hand off and walk away. We stick around, monitor, and improve. Partners, not vendors.",
            },
          ].map((item) => (
            <div key={item.n} className="pf-approach-item">
              <div className="pf-approach-num">{item.n}</div>
              <h3 className="pf-approach-title">{item.t}</h3>
              <p className="pf-approach-desc">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA
──────────────────────────────────────────────────────────────────────────── */
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
    <section ref={ref} className="pf-cta">
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
          <a href="/contact" className="sl-cta-btn flex items-center justify-center rounded-full bg-[#050508] border border-[#fcfcf7] px-8 py-3 hover:bg-[#050508] hover:text-[#fcfcf7] transition-all duration-300">
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

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function PortfolioPage() {
  return (
    <>
      <style>{`
        /* ── Base ─────────────────────────────────────────────── */
        * { box-sizing: border-box; }
        .pf-page { background: #050508; color: #fff; min-height: 100vh; }

        .pf-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .pf-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .pf-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          margin: 0 0 16px;
        }
        .pf-outline-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }
        .pf-neon-text {
          color: #298dff;
          
        }
        .pf-section-title {
          
          font-size: clamp(32px, 4.5vw, 66px);
          font-weight: 500; line-height: 1.05;
           color: #fff; margin: 0; letter-spacing:2.05;
        }
        .pf-tag {
          
          font-size: 12px; letter-spacing: 0.1em;
          color: rgba(255,255,255,.9);
          border: 1px solid rgba(255,255,255,0.5);border-radius:4px;
          padding: 3px 9px; display: inline-block;
        }
        .pf-tag--sm { font-size: 11px; padding: 2px 7px; }

        /* ── Scan line ────────────────────────────────────────── */
        // .pf-scan {
        //   position: absolute;
        //   left: 0;
        //   right: 0;
        //   height: 1px;
        //   opacity: 0.5;
        //   background: linear-gradient(
        //     90deg,
        //     transparent,
        //     rgba(41,141,255,0.8),
        //     transparent
        //   );
        //   filter: blur(1px);
        //   pointer-events: none;
        //   z-index: 1;
        // }
                      // rgba(74,111,255,0.8),


        /* ── HERO ─────────────────────────────────────────────── */

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

        
        .pf-hero {
          position: relative; background: #050508;
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; overflow: hidden; padding-top: 0px;
        }
        .pf-grid-neon {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(41,141,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(41,141,255,0.06) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .pf-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; z-index: 0;
        }
        .pf-orb--1 {
          top: -15%; right: 5%; width: 65vw; height: 65vw;
          max-width: 780px; max-height: 780px;
          background: radial-gradient(ellipse, rgba(41,141,255,0.12) 0%, transparent 65%);
          filter: blur(2px);
        }
        .pf-orb--2 {
          bottom: -10%; left: -8%; width: 40vw; height: 40vw;
          max-width: 480px; max-height: 480px;
          background: radial-gradient(ellipse, rgba(41,141,255,0.08) 0%, transparent 65%);
        }
        .pf-hero-inner {
        min-height: 90vh;
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 580px;
          gap: 0 2vw; align-items: center;
          padding: 80px 7vw 60px; max-width: 1600px;
        }
        .pf-hero-rule {
          width: 0%; height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 0px 0px 20px;
          
        }
        .pf-hero-h1 {
          
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 400; line-height: 0.96;
          letter-spacing: -0.04em; color: #fff; margin: 0 0 32px;
        }
        .pf-hero-sub {
          
          font-size: clamp(14px, 1.2vw, 18px);
          font-weight: 300; line-height: 1.72;
          color: rgba(255,255,255,0.4); max-width: 42ch; margin: 0 0 40px;
        }
        .pf-hero-counts {
          display: flex; gap: 40px; flex-wrap: wrap; margin-top:50px; 
        }
        .pf-hcount { display: flex; flex-direction: column; gap: 2px; }
        .pf-hcount-num {
          
          font-size: clamp(36px, 4vw, 60px);
          font-weight: 400; letter-spacing: -0.03em; color: #fff; line-height: 1;
        }
        .pf-hcount-lbl {
          
          font-size: 16px; 
          color: rgba(252,252,247);
        }
        .pf-hero-canvas {
          position: relative; height: 420px;
          will-change: transform, opacity;
        }
        .pf-canvas-label {
          position: absolute;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(255,255,255,0.18);
          pointer-events: none; user-select: none;
        }
        .pf-canvas-label--tl { top: 12px; left: 12px; }
        .pf-canvas-label--br { bottom: 12px; right: 12px; }

        /* Marquee */
        .pf-marq-wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;
  border-top: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 18px 0;
  overflow: hidden;
}
        .pf-marq-track { display: flex; white-space: nowrap; will-change: transform; }
        .pf-marq-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.4); padding: 0 28px;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .pf-marq-dot { font-size: 7px; color: rgba(255,255,255,0.4); }

        /* ── FEATURED REEL ────────────────────────────────────── */
        .pf-reel-wrap { position: relative; }
        .pf-reel-sticky {
          position: relative; width: 100%; height: 100vh;
          overflow: hidden;
        }
        .pf-reel-progress {
          position: absolute; left: 7vw; top: 50%;
          transform: translateY(-50%);
          z-index: 20; display: flex; flex-direction: column; gap: 10px;
        }
        .pf-prog-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.4s, transform 0.4s;
        }
        .pf-prog-dot--active {
          background: var(--accent, #298dff);
          transform: scale(1.5);
          
        }
        .pf-reel-counter {
          position: absolute; bottom: 32px; right: 7vw;
          z-index: 20;
          font-size: 15px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.22);
        }
        .pf-reel-counter-cur { color: rgba(255,255,255,0.7); font-size: 14px; }

        /* Panel */
        .pf-reel-panel {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; align-items: center;
          padding: 0 7vw 0 14vw;
        }
        .pf-panel-accent-line {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          opacity: 0.7;
        }
        .pf-panel-left {
          display: flex; flex-direction: column;
          padding-right: 6vw;
        }
        .pf-panel-num {
  font-size: 45px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #050508;
  -webkit-text-stroke: 1px #fff;

  background: #050508;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
}
        .pf-panel-cat {

          font-size: 16px;  color: rgba(255,255,255,0.5); font-weight:400;
          margin-bottom: 16px;
        }
        .pf-panel-title {
          
          font-size: clamp(44px, 6vw, 90px);
          font-weight: 400; line-height: 0.95;
          color: #fff; margin: 0 0 24px;
        }
        .pf-panel-desc {
          
          font-size: clamp(13px, 1.1vw, 18px); font-weight: 300;
          line-height: 1.72; color: rgba(255,255,255,1);
          max-width: 46ch; margin: 0 0 22px;
        }
        .pf-panel-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .pf-panel-link {
          
          display:inline-flex;align-items:center;color:#fcfcf7;background:transparent;padding:16px 36px;transition:background 0.25s;
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
          

        /* Right panel */
        .pf-panel-right {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 28px;
          position: relative;
        }

        /* ── Panel image (replaces mockup) ───────────────────── */
        .pf-panel-canvas {
          width: 100%; height: 340px; position: relative;
          will-change: transform, opacity;
          
          overflow: hidden;
        }

        /* 3D canvas — ambient layer behind the image */
        .pf-panel-canvas-3d {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none;
          opacity: 0.35;
        }

        /* Full-bleed project image */
        .pf-panel-img {
        border-radius:20px;
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 1;
          /* Subtle desaturate so it blends with the dark palette */
          // filter: saturate(0.75) brightness(0.82);
          // transition: filter 0.5s ease;
        }
        .pf-reel-panel:hover .pf-panel-img {
          filter: saturate(0.9) brightness(0.95);
        }

        /* Gradient overlay */
        .pf-panel-img-overlay {
          position: absolute; inset: 0; z-index: 3;
          pointer-events: none;
        }

        /* Accent corner brackets */
        .pf-panel-img-corner {
          position: absolute; width: 18px; height: 18px;
          z-index: 3; pointer-events: none;
          border-color: transparent;
        }
        .pf-panel-img-corner--tl {
          top: 12px; left: 12px;
          border-top: 1.5px solid; border-left: 1.5px solid;
        }
        .pf-panel-img-corner--br {
          bottom: 12px; right: 12px;
          border-bottom: 1.5px solid; border-right: 1.5px solid;
        }

        .pf-panel-img-corner--tr {
          top: 12px; right: 12px;
          border-top: 1.5px solid; border-right: 1.5px solid;
        }
          .pf-panel-img-corner--bl {
          bottom: 12px; left: 12px;
          border-bottom: 1.5px solid; border-left: 1.5px solid;
        }

        /* Category badge — bottom-left of image */
        .pf-panel-img-badge {
          position: absolute; bottom: 14px; left: 14px; z-index: 4;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          background: rgba(5,5,8,0.72);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 4px 10px;
        }

        .pf-panel-stat {
          display: flex; flex-direction: column; gap: 4px;
          
          padding-left: 18px;
          will-change: opacity, transform;
        }
        .pf-panel-stat-num {
          font-size: clamp(36px, 3.5vw, 56px);
          font-weight: 600; line-height: 1; letter-spacing: -0.03em;
        }
        .pf-panel-stat-lbl {
          font-size: 18px; font-weight:300;
        color: rgba(255,255,255,1);
        }



        .cs2-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}

.cs2-footer-link {
  position: relative;
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;

  padding: 10px 20px;
  border-radius: 5px;

  color: #ffffff;
  text-decoration: none;

  background: linear-gradient(     
    135deg,
    #0050d4 0%,
    #298dff 50%,
    #0050d4 100%
  );

  transition:
    filter 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;

  box-shadow:
    0 10px 30px rgba(41, 141, 255, 0.28),
    inset 0 1px 0 rgba(255,255,255,0.18);
}

/* SHIMMER LAYER */
.cs2-footer-link::before {
  content: "";
  position: absolute;
  top: -250%;
  left: -40%;
  width: 45%;
  height: 320%;

  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.08) 35%,
    rgba(255,255,255,0.5) 50%,
    rgba(255,255,255,0.08) 65%,
    transparent 100%
  );

  transform: rotate(24deg) translateX(-250%);
  animation: cs2Shimmer 3.8s linear infinite;

  pointer-events: none;
}

/* keep text above shimmer */
.cs2-footer-link > * {
  position: relative;
  z-index: 2;
}

/* HOVER */
.cs2-footer-link:hover {
  filter: brightness(0.82);
  transform: translateY(-1px);
  box-shadow:
    0 14px 36px rgba(41, 141, 255, 0.22),
    inset 0 1px 0 rgba(255,255,255,0.14);
}

/* ACTIVE */
.cs2-footer-link:active {
  transform: translateY(0);
  filter: brightness(0.78);
}

@keyframes cs2Shimmer {
  0% {
    transform: rotate(20deg) translateX(-260%);
  }

  100% {
    transform: rotate(20deg) translateX(520%);
  }
}


.cs2-footer-link:hover { color: rgba(255, 255, 255, 1); }

.cs2-footer-arrow {
  display: flex;
  align-items: center;
  transition: transform 0.25s;
}
.cs2-footer-link:hover .cs2-footer-arrow { transform: translateX(4px); }





        /* ── PROJECT GRID ─────────────────────────────────────── */
        .pf-grid-section {
          position: relative; background: #050508;
          padding: 100px 7vw 120px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .pf-grid-inner { position: relative; z-index: 1; }
        .pf-grid-head { margin-bottom: 64px; }
        .pf-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 10px; 
        }
        .pf-grid-card {
          position: relative; background: #0f0f0f;
          overflow: hidden; transform-style: preserve-3d;
          cursor: pointer;border-radius:20px;
        }
        .pf-grid-card:hover { background: rgba(30,30,30,1); }
        .pf-gc-glow {
          position: absolute; width: 180px; height: 180px; border-radius: 50%;
          background: radial-gradient(ellipse, var(--accent,#298dff) 0%, transparent 70%);
          opacity: 0; transform: translate(-50%,-50%);
          pointer-events: none; z-index: 0;
          transition: opacity 0.3s;
        }
        .pf-grid-card:hover .pf-gc-glow { opacity: 0.12; }

        // /* Corner brackets */
        // .pf-gc-bracket {
        //   position: absolute; width: 14px; height: 14px;
        //   opacity: 0; transition: opacity 0.3s;
        //   z-index: 2;
        // }
        .pf-grid-card:hover .pf-gc-bracket { opacity: 1; }
        // .pf-gc-bracket--tl {
        //   top: 12px; left: 12px;
        //   border-top: 1.5px solid var(--accent,#298dff);
        //   border-left: 1.5px solid var(--accent,#298dff);
        // }
        // .pf-gc-bracket--br {
        //   bottom: 12px; right: 12px;
        //   border-bottom: 1.5px solid var(--accent,#298dff);
        //   border-right: 1.5px solid var(--accent,#298dff);
        // }

        .pf-gc-visual {
          position: relative; z-index: 1;
          height: 240px;
          
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .pf-gc-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .pf-gc-num {
          position: absolute; top: 2px; left: 16px;
          
          font-size: 100px; letter-spacing: 0.22em; font-weight:500;
          color: var(--accent,rgba(255,255,255,0.2));opacity:0.05;
          z-index: 2;
        }
        .pf-gc-year {
          position: absolute; bottom: 12px; right: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.15em;
          color: rgba(255,255,255,0.18); z-index: 2;
        }
        .pf-gc-body { position: relative; z-index: 1; padding: 20px 22px 24px; }
        .pf-gc-cat {
          
          font-size: 16px; font-weight:400;
          color: #fff; margin-bottom: 8px;
        }
        .pf-gc-title {
          
          font-size: clamp(18px, 1.8vw, 28px);
          font-weight: 400; letter-spacing: 0.01em;
          color: #fff; margin: 0 0 14px;
        }
        .pf-gc-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pf-gc-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px; 
          background: var(--accent,transparent); opacity: 0;
          transition: opacity 0.35s;
        }
        // .pf-grid-card:hover .pf-gc-bar { opacity: 0.5; }

        /* ── APPROACH ─────────────────────────────────────────── */
        .pf-approach {
          position: relative; background: #050508;
          padding: 100px 7vw 120px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .pf-approach-inner { position: relative; z-index: 1; }
        .pf-approach-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 40px 0 60px;
        }
        .pf-approach-row {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 0;
        }
        .pf-approach-item {
          padding-right: 40px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .pf-approach-item:last-child { border-right: none; padding-right: 0; }
        .pf-approach-num {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; letter-spacing: 0.22em;
          color: rgba(255,255,255,0.22); margin-bottom: 18px;
        }
        .pf-approach-title {
          
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 200; letter-spacing: -0.02em;
          color: #fff; margin: 0 0 12px;
        }
        .pf-approach-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; line-height: 1.72;
          color: rgba(255,255,255,0.38); margin: 0;
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

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .pf-hero-inner {
    grid-template-columns: 1fr;
  }
          .pf-hero-canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
  }
    
          .pf-reel-panel  { grid-template-columns: 1fr; padding: 0 6vw 0 6vw; }
          .pf-panel-canvas {
          width: 100%; height: 170px; position: relative;
          will-change: transform, opacity;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }

          .pf-grid        { grid-template-columns: repeat(2,1fr); }
          .pf-approach-row{ grid-template-columns: repeat(2,1fr); gap: 48px 0; }
          .pf-approach-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); padding: 0 0 36px; }
          .pf-approach-item:last-child { border-bottom: none; }
        }
        @media (max-width: 640px) {
        .pf-hero-canvas {
    height: 220px;
    margin-top: 20px;
  }

  .pf-panel-right {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 28px;
          position: relative;
           margin-top:-150px;
        }
          
    .pf-reel-panel  { grid-template-columns: 1fr; padding: 0 6vw 0 6vw; justify-content:start; }
          .pf-panel-canvas {
          width: 100%; height: 170px; position: relative;
          will-change: transform, opacity;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }
    .pf-panel-left {
          display: flex; flex-direction: column;
          padding-top: 10vw;
        }
    .pf-reel-progress {
          position: absolute; left: 50%; top: 95%;
          transform: translateX(-50%);
          z-index: 20; display: flex; flex-direction: row; gap: 10px;
        }

        .pf-hero-inner { grid-template-columns: 1fr; }
          .pf-grid        { grid-template-columns: 1fr; }
          .pf-approach-row{ grid-template-columns: 1fr; }
          .pf-panel-title { font-size: clamp(36px, 10vw, 60px); }
        }
      `}</style>

      <div className="pf-page">
        <Navbar />
        <PortfolioHero />
        <ScrollIndicator />
        <FeaturedReel />
        <ProjectGrid />
        {/* <ApproachStrip /> */}
        <PortfolioCTA />
        <Footer />
      </div>
    </>
  );
}
