/**
 * AboutPage.jsx
 *
 * Full company about page — matches Algon home aesthetic.
 *
 * Sections:
 *   1. Hero              — animated word reveal, 3D rotating geometry, neon grid
 *   2. Story             — sticky horizontal timeline scrub
 *   3. Vision & Mission  — large editorial statements, word-by-word opacity scrub
 *   4. Values            — 3D tilt cards, GSAP scroll entrance
 *   5. Team              — asymmetric grid, hover reveal
 *   6. Numbers           — animated counters on scroll
 *   7. Culture           — sticky panel with sliding content
 *   8. CTA               — contact strip
 *
 * DEPS: gsap (already in project), @react-three/fiber, @react-three/drei, three
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
import Vision from "/src/assets/Bulb.json";
import Mission from "/src/assets/Mission.json";
import Purpose from "/src/assets/Computerztech.json";
import Rocket from "/src/assets/Leadership Rocket.json";
import ValuesSectionAbout from "../components/ValuesSectionAbout";
import CTASectionAbt from "../components/CTASectionAbt";
import ScrollIndicator from "../components/ui/ScrollIndicator";





gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED UTILS
──────────────────────────────────────────────────────────────────────────── */
function useNearViewport(margin = "300px") {
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

/* ─────────────────────────────────────────────────────────────────────────────
   3D — ROTATING DODECAHEDRON with neon edges
──────────────────────────────────────────────────────────────────────────── */
function NeonDodecahedron({ accent = "#4a6fff", mouse }) {
  const meshRef = useRef();
  const edgeRef = useRef();
  const groupRef = useRef();

  const smooth = useRef({ x: 0, y: 0 });
  const geo = useMemo(() => new THREE.DodecahedronGeometry(1.0, 0), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mouse) {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.04;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.04;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y =
        t * 0.09 + (mouse ? smooth.current.x * 0.5 : 0);
      groupRef.current.rotation.x =
        t * 0.06 + (mouse ? smooth.current.y * 0.3 : 0);
    }
    if (meshRef.current) {
      const s = 1 + Math.sin(t * 0.7) * 0.018;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color={accent}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
          side={THREE.DoubleSide}
          depthWrite={false} // 🔥 add this
        />
      </mesh>
      <lineSegments ref={edgeRef} geometry={edgeGeo}>
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function NeonTorus({ accent = "#00d4aa" }) {
  const ref = useRef();
  const geo = useMemo(() => new THREE.TorusGeometry(0.8, 0.02, 8, 60), []);
  const geo2 = useMemo(() => new THREE.TorusGeometry(0.55, 0.015, 8, 60), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.22;
      ref.current.rotation.y = t * 0.14;
    }
  });

  return (
    <group ref={ref}>
      <mesh geometry={geo}>
        <meshBasicMaterial color={accent} transparent opacity={0.55} />
      </mesh>
      <mesh geometry={geo2} rotation={[Math.PI / 2.5, 0, Math.PI / 4]}>
        <meshBasicMaterial color={accent} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
function AboutHero() {
  const heroRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const line3Ref = useRef();
  const subRef = useRef();
  const ruleRef = useRef();
  const eyebrowRef = useRef();
  const canvasRef = useRef();
  const marqRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee
      let x = 0,
        raf;
      const track = marqRef.current;
      const run = () => {
        x -= 0.6;
        if (track && Math.abs(x) >= track.scrollWidth / 2) x = 0;
        if (track) track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);

      // Entrance
      const lines = [line1Ref, line2Ref, line3Ref];
      gsap.set(
        [
          ...lines.map((r) => r.current),
          subRef.current,
          eyebrowRef.current,
          ruleRef.current,
          canvasRef.current,
        ],
        { autoAlpha: 0 },
      );
      gsap.set(
        lines.map((r) => r.current),
        { y: 70 },
      );
      gsap.set(subRef.current, { y: 24 });
      gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left" });

      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(
        ruleRef.current,
        { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        0,
      )
        .to(eyebrowRef.current, { autoAlpha: 1, duration: 0.5 }, 0.2)
        .to(
          canvasRef.current,
          { autoAlpha: 1, duration: 1.0, ease: "power2.out" },
          0.1,
        )
        .to(
          lines.map((r) => r.current),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.1,
          },
          0.15,
        )
        .to(
          subRef.current,
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.55,
        );

      return () => cancelAnimationFrame(raf);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="ab-hero" onMouseMove={onMouseMove}>
      {/* <div className="ab-grid-neon" />
      <div className="ab-grain" />
      <div className="ab-orb ab-orb--hero-r" />
      <div className="ab-orb ab-orb--hero-l" /> */}

      {/* Large ghost year */}
      <div className="ab-hero-ghost" aria-hidden="true">
        2026
      </div>

      <div className="ab-hero-inner">
        <div className="ab-hero-left">
          {/* <div ref={ruleRef} className="ab-rule" /> */}
          <p ref={eyebrowRef} className="ab-eyebrow">
            About Algon
          </p>
          <h1 ref={line1Ref} className="ab-hero-h1">
            <span>We don't</span> <br />
            <span>just build.</span> <br />
            <span> We obsess.</span>

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
              We obsess.
            </span> */}
          </h1>
          {/* <p ref={subRef} className="ab-hero-sub">
            Founded in 2024, Algon is a digital studio at the intersection of
            technology, motion, and human experience. Three years. 24 projects.
            One relentless standard.
          </p> */}
        </div>

        {/* <div ref={canvasRef} className="ab-hero-canvas"> */}
          {/* <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 3.2], fov: 42 }}
            gl={{ antialias: true, alpha: true, stencil: false }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.3} color="#0a0f1e" />
            <pointLight
              position={[2, 2, 2]}
              intensity={12}
              color="#4a6fff"
              distance={8}
              decay={2}
            />
            <pointLight
              position={[-2, -1, 1]}
              intensity={6}
              color="#00d4aa"
              distance={6}
              decay={2}
            />
            <Suspense fallback={null}>
              <NeonDodecahedron accent="#4a6fff" mouse={mouse} />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
          <div className="ab-canvas-lbl ab-canvas-lbl--tl">Est. 2024</div>
          <div className="ab-canvas-lbl ab-canvas-lbl--br">Kerala, India</div> */}

          <div className="flex justify-center items-center">
            <Lottie className="w-[90vw] md:w-[600px] md:h-[600px] h-[300px]" animationData={Rocket} />
          </div>
        {/* </div> */}
      </div>

      

      
    </section>
  );
}


function Marquee() {
  const marqRef = useRef();

  useEffect(() => {
    let x = 0, raf;
    const track = marqRef.current;
    const run = () => {
      x -= 0.6;
      if (track && Math.abs(x) >= track.scrollWidth / 2) x = 0;
      if (track) track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="ab-marq-wrap">
      <div ref={marqRef} className="ab-marq-track">
        {[...Array(3)].map((_, g) =>
          ["Digital Studio","Motion Design","Web3","SaaS","AI & Automation",
           "eCommerce","Cybersecurity","AR/VR","Kerala","India"].map((s, i) => (
            <span key={`${g}-${i}`} className="ab-marq-item">
              {s}<span className="ab-marq-dot">◆</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}




/* ─────────────────────────────────────────────────────────────────────────────
   2. STORY — sticky horizontal timeline
──────────────────────────────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: "2023",
    title: "Founded",
    desc: "Founded in Kerala to unite thoughtful design with powerful engineering.",
  },
  {
    year: "2024",
    title: "Building Momentum",
    desc: "Turned bold ideas into products clients could trust.",
  },
  {
    year: "2025",
    title: "Breaking New Ground",
    desc: "Expanded our capabilities and delivered greater digital impact.",
  },
  {
    year: "2026",
    title: "Flourishing Together",
    desc: "Flourishing through a growing team and stronger partnerships.",
  },
];

function StorySection() {
  const wrapRef = useRef();
  const stickyRef = useRef();
  const trackRef = useRef();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const total = TIMELINE.length

    const getVisibleCards = () => {
      if (window.innerWidth <= 640) return 1   // mobile
      if (window.innerWidth <= 1024) return 2  // tablet
      return 3                                 // desktop
    }

    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: `+=${total * 90}%`,
      pin: stickyRef.current,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,

      onUpdate(self) {
        const idx = Math.min(
          total - 1,
          Math.floor(self.progress * total)
        )

        setActiveIdx(idx)

        if (trackRef.current) {
          const visible = getVisibleCards()

          const maxShift = total - visible
          const shift = Math.min(
            Math.max(0, idx - (visible - 1)),
            maxShift
          )

          trackRef.current.style.transform =
            `translateX(-${shift * (100 / visible)}%)`
        }
      },
    })
  }, wrapRef)

  return () => ctx.revert()
}, [])

  return (
    <div ref={wrapRef} className="ab-story-wrap">
      <div ref={stickyRef} className="ab-story-sticky">
        {/* <div className="ab-grid-bg" />
        <div className="ab-grain" /> */}

        {/* Heading */}
        <div className="ab-story-head">
          <p className="ab-eyebrow">Our story</p>

          <h2 className="ab-section-title">
            Four years of <br /> building obsessively.
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
              building obsessively.
            </span> */}
          </h2>
        </div>

        {/* Progress */}
        <div className="ab-story-progress">
          <div
            className="ab-story-bar"
            style={{
              width: `${((activeIdx + 1) / TIMELINE.length) * 100}%`,
            }}
          />
        </div>

        {/* Timeline */}
        <div className="ab-tl-outer">
          <div ref={trackRef} className="ab-tl-track">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`ab-tl-item ${
                  i === activeIdx ? "ab-tl-item--active" : ""
                }`}
              >
                <div className="ab-tl-year">{item.year}</div>

                <div className="ab-tl-dot" />

                <div className="ab-tl-content pb-5">
                  <h3 className="ab-tl-title">{item.title}</h3>

                  <p className="ab-tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="ab-story-counter">
          <span className="ab-story-counter-cur">
            {String(activeIdx + 1).padStart(2, "0")}
          </span>

          <span className="ab-story-counter-sep"> / </span>

          <span>{String(TIMELINE.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. VISION & MISSION — word-by-word scrub opacity
──────────────────────────────────────────────────────────────────────────── */
function VisionMission() {
  const sectionRef = useRef();
  const vRef = useRef();
  const mRef = useRef();
  const pRef = useRef();

  const visionWrapRef = useRef()
const missionWrapRef = useRef()
const purposeWrapRef = useRef()

const [visionData, setVisionData] = useState(null)
const [missionData, setMissionData] = useState(null)
const [purposeData, setPurposeData] = useState(null)


  useEffect(() => {
  const lazyLoad = (ref, importer, setter) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          importer().then((mod) => setter(mod.default))
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)

    return observer
  }

  const o1 = lazyLoad(
    visionWrapRef,
    () => import("/src/assets/Bulb.json"),
    setVisionData
  )

  const o2 = lazyLoad(
    missionWrapRef,
    () => import("/src/assets/Mission.json"),
    setMissionData
  )

  const o3 = lazyLoad(
    purposeWrapRef,
    () => import("/src/assets/Purpose.json"),
    setPurposeData
  )

  return () => {
    o1.disconnect()
    o2.disconnect()
    o3.disconnect()
  }
}, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vision statement word scrub
      const vEl = vRef.current;
      const mEl = mRef.current;
      const pEl = pRef.current;

      const scrubWords = (el, triggerStart = "top 70%") => {
        const words = el.textContent.trim().split(" ");
        el.innerHTML = words
          .map((w) => `<span class="ab-sw">${w} </span>`)
          .join("");
        const spans = el.querySelectorAll(".ab-sw");
        gsap.set(spans, { opacity: 0.1 });
        gsap.to(spans, {
          opacity: 1,
          stagger: { each: 0.04 },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            end: "bottom 60%",
            scrub: 1,
          },
        });
      };

      scrubWords(vEl, "top 75%");
      scrubWords(mEl, "top 75%");
      scrubWords(pEl, "top 75%");

      // Label reveals
      const labels = sectionRef.current?.querySelectorAll(".ab-vm-label");
      labels?.forEach((el) => {
        gsap.set(el, { autoAlpha: 0, x: -20 });
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="ab-vm-section">
      
      <div className="ab-orb ab-orb--vm" />

      <div className="ab-vm-inner">
        {/* Vision */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="ab-vm-block">
            <span
              style={{
                color: "#fcfcf7", fontWeight:"500"
              }}
              className="block text-3xl md:text-4xl lg:text-5xl mb-5 font-light uppercase"
            >
              Vision
            </span>
            <p ref={vRef} className="ab-vm-text">
              To be the most trusted digital partner for ambitious companies
              building the next generation of technology — where every product
              we touch becomes a benchmark for its category.
            </p>
          </div>
          <div ref={visionWrapRef} className="flex justify-center items-center">
  <div className="w-[400px] h-[400px]">
    {visionData && (
      <Lottie animationData={visionData} />
    )}
  </div>
</div>
        </div>

        <div className="ab-vm-divider" />

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="ab-vm-block">
          <span
            style={{
              color: "#fcfcf7", fontWeight:"400"
            }}
            className="block text-3xl md:text-4xl lg:text-5xl mb-5 font-light uppercase"
          >
            Mission
          </span>
          <p ref={mRef} className="ab-vm-text">
            To build digital products that move people — literally and
            figuratively. We combine engineering precision with creative
            obsession to deliver systems that are beautiful, fast, and built to
            last.
          </p>
        </div>
        <div ref={missionWrapRef} className="flex justify-center items-center">
  <div className="w-[400px] h-[400px]">
    {missionData && (
      <Lottie animationData={missionData} />
    )}
  </div>
</div>
        </div>

        <div className="ab-vm-divider" />

        {/* Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="ab-vm-block">
          <span
            style={{
              color: "#fcfcf7", fontWeight:"400"
            }}
            className="block text-3xl md:text-4xl lg:text-5xl mb-5 font-light uppercase"
          >
            Purpose
          </span>
          <p ref={pRef} className="ab-vm-text">
            Technology should feel inevitable. When it's done right, users don't
            think about the product — they just experience it. Our purpose is to
            reach that invisible threshold on every project we take on.
          </p>
        </div>
        <div ref={purposeWrapRef} className="flex justify-center items-center">
  <div className="w-[400px] h-[400px]">
    {purposeData && (
      <Lottie animationData={purposeData} />
    )}
  </div>
</div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. VALUES — 3D tilt cards
──────────────────────────────────────────────────────────────────────────── */
const VALUES = [
  {
    id: "01",
    title: "Craft over speed",
    icon: "◈",
    desc: "We never ship work we're not proud of. Quality is non-negotiable, even when deadlines are tight. Especially then.",
    accent: "#fff",
    svg:`<rect x="1.43033" y="16.7335" width="1.45949" height="1.45949" transform="rotate(-90 1.43033 16.7335)" fill="currentColor"></rect><rect x="19.6626" y="16.7335" width="1.45949" height="1.45949" transform="rotate(-90 19.6626 16.7335)" fill="currentColor"></rect><path d="M21.8633 15.2739C21.8633 13.186 21.2442 11.145 20.0842 9.40898C18.9242 7.67295 17.2755 6.31988 15.3465 5.52087C13.4175 4.72186 11.295 4.5128 9.24716 4.92013C7.19937 5.32746 5.31835 6.33289 3.84198 7.80926C2.3656 9.28564 1.36018 11.1667 0.952848 13.2144C0.817287 13.896 0.749995 14.5858 0.75 15.2739" stroke="currentColor" stroke-width="1.5"></path><path d="M11.3047 7.41907V5.04797" stroke="currentColor" stroke-width="1.5"></path><path d="M8.2641 1.02996C11.0903 0.467787 14.0198 0.756313 16.682 1.85905C18.2638 2.51426 19.7091 3.43942 20.9574 4.585" stroke="currentColor" stroke-width="1.5"></path><circle cx="11.2757" cy="16.3697" r="2.6016" transform="rotate(49.4904 11.2757 16.3697)" stroke="currentColor" stroke-width="1.5"></circle><circle cx="11.2757" cy="16.3697" r="2.6016" transform="rotate(49.4904 11.2757 16.3697)" stroke="currentColor" stroke-width="1.5"></circle><path d="M12.8402 15.0882L23.2686 6.00726" stroke="currentColor" stroke-width="1.5"></path>`
  },
  {
    id: "02",
    title: "Ownership mentality",
    icon: "◉",
    desc: "We treat every client's product as if we built it for ourselves. That means caring about outcomes, not just deliverables.",
    accent: "#fff",
    svg:`<path d="M5.78899 11.5775C8.98602 11.5775 11.5777 8.98577 11.5777 5.78874C11.5777 2.59171 8.98602 0 5.78899 0C2.59195 0 0.000244141 2.59171 0.000244141 5.78874C0.000244141 8.98577 2.59195 11.5775 5.78899 11.5775Z" fill="currentColor"></path><path d="M18.0302 11.5775C21.2272 11.5775 23.8189 8.98577 23.8189 5.78874C23.8189 2.59171 21.2272 0 18.0302 0C14.8332 0 12.2415 2.59171 12.2415 5.78874C12.2415 8.98577 14.8332 11.5775 18.0302 11.5775Z" fill="currentColor"></path><path d="M5.78874 23.9998C8.98577 23.9998 11.5775 21.4081 11.5775 18.2111C11.5775 15.0141 8.98577 12.4224 5.78874 12.4224C2.59171 12.4224 0 15.0141 0 18.2111C0 21.4081 2.59171 23.9998 5.78874 23.9998Z" fill="currentColor"></path><path d="M18.0302 23.9998C21.2272 23.9998 23.8189 21.4081 23.8189 18.2111C23.8189 15.0141 21.2272 12.4224 18.0302 12.4224C14.8332 12.4224 12.2415 15.0141 12.2415 18.2111C12.2415 21.4081 14.8332 23.9998 18.0302 23.9998Z" fill="currentColor"></path>`
  },
  {
    id: "03",
    title: "Radical transparency",
    icon: "◎",
    desc: "No black boxes. You'll always know where the project stands, what's blocking it, and what we're doing about it.",
    accent: "#fff",
    svg:`
  <path d="M11.5073 23.72C8.33646 23.72 5.9526 22.4059 4.59289 21.4C4.17608 21.0917 4.39771 20.4351 4.91571 20.4369H4.94125C9.30771 20.4369 13.1489 16.9678 13.1489 12.2293C13.1489 9.21708 15.6413 7.30469 18.0735 7.30469C20.5056 7.30469 22.998 9.24262 22.998 12.2293C22.998 18.1588 18.2358 23.72 11.5073 23.72Z" fill="currentColor"/>
  <path d="M11.4907 0.71875C14.6616 0.71875 17.0454 2.03288 18.4052 3.03877C18.8219 3.347 18.6004 4.00362 18.0823 4.00182H18.0568C13.6903 4.00182 9.84916 7.4709 9.84916 12.2095C9.84916 15.2216 7.35678 17.134 4.92457 17.134C2.49237 17.134 0 15.1961 0 12.2095C0 6.27988 4.76224 0.71875 11.4907 0.71875Z" fill="currentColor"/>

  <path opacity="0.3" d="M7.33131 22.4774C3.41446 20.2524 11.0321 20.97 12.8377 14.9465C13.3448 13.4555 13.0976 11.8057 13.7196 10.3648C15.0848 6.95959 20.1554 6.53459 22.0667 9.67082C25.7219 17.8183 15.0255 26.6406 7.33131 22.4774Z" fill="currentColor"/>
  <path opacity="0.3" d="M15.6619 1.96434C19.5788 4.18951 11.9612 3.47182 10.1555 9.49529C9.64842 10.9863 9.89556 12.6361 9.27361 14.077C7.90842 17.4822 2.83792 17.9072 0.926446 14.771C-2.7287 6.62354 7.96766 -2.19878 15.6619 1.96434Z" fill="currentColor"/>

  <path opacity="0.3" d="M9.26261 22.5039C5.73606 21.1314 12.5712 18.712 13.2579 14.4175C13.5954 13.138 13.5151 11.7436 14.0696 10.5262C16.8693 5.27875 23.4828 8.64208 22.3711 14.0318C21.586 19.8984 15.0289 24.7473 9.26261 22.5039Z" fill="currentColor"/>
  <path opacity="0.3" d="M13.7332 1.93409C17.2597 3.3066 10.4246 5.726 9.73786 10.0204C9.40046 11.2999 9.48073 12.6943 8.92625 13.9118C6.12654 19.1593 -0.487014 15.7959 0.624668 10.4062C1.40989 4.53958 7.96686 -0.309329 13.7332 1.93409Z" fill="currentColor"/>

  <path opacity="0.3" d="M10.7628 21.646C10.6735 21.5876 10.5121 21.3751 10.4938 21.3287C10.4646 21.2547 10.4062 21.1235 10.4062 21.004C10.4062 20.8845 10.4063 20.8444 10.4391 20.703C10.7975 19.615 11.704 18.7076 12.3004 17.7364C12.8448 16.8491 13.2798 15.897 13.5862 14.9011C14.3149 12.5346 14.2547 9.44215 17.2587 8.75908C20.2627 8.07604 22.0657 10.9214 21.8441 13.5761C21.6333 16.0931 20.2909 18.4925 18.3657 20.1049C16.6094 21.5758 12.9077 23.2866 10.7646 21.6442L10.7628 21.646Z" fill="currentColor"/>
  <path opacity="0.3" d="M12.2324 2.79372C12.3217 2.8521 12.4831 3.06458 12.5014 3.11108C12.5306 3.18495 12.5889 3.31629 12.5889 3.43574C12.5889 3.55522 12.5889 3.59532 12.5561 3.73668C12.1977 4.82462 11.2912 5.73208 10.6948 6.70327C10.1503 7.5906 9.71538 8.54271 9.40897 9.53858C8.68029 11.9051 8.7405 14.9976 5.73647 15.6806C2.73249 16.3637 0.929557 13.5183 1.15114 10.8636C1.36182 8.34662 2.70424 5.94725 4.62938 4.33492C6.3858 2.86392 10.0875 1.15309 12.2306 2.79551L12.2324 2.79372Z" fill="currentColor"/>
`
  },
  {
    id: "04",
    title: "Deep collaboration",
    icon: "⊕",
    desc: "The best work happens when client and studio think as one team. We don't work for you — we work with you.",
    accent: "#fff",
    svg:`<path d="M9.18359 11.5713L9.18366 13.4717L15.1679 14.8226L15.1678 12.9222L9.18359 11.5713Z" fill="currentColor"></path><path d="M9.18359 18.0723L9.18366 16.1719L15.1679 14.821L15.1678 16.7214L9.18359 18.0723Z" fill="currentColor"></path><path d="M11.0879 16.1865L9.18752 16.1866L7.83661 22.1708L9.73698 22.1708L11.0879 16.1865Z" fill="currentColor"></path><path d="M4.58594 16.1865L6.48631 16.1866L7.83721 22.1708L5.93684 22.1708L4.58594 16.1865Z" fill="currentColor"></path><path d="M6.4873 18.0801L6.48724 16.1797L0.503003 14.8288L0.503067 16.7292L6.4873 18.0801Z" fill="currentColor"></path><path d="M6.4873 11.5781L6.48724 13.4785L0.503002 14.8294L0.503067 12.929L6.4873 11.5781Z" fill="currentColor"></path><path d="M4.58301 13.4756L6.48338 13.4755L7.83428 7.49128L5.93392 7.49135L4.58301 13.4756Z" fill="currentColor"></path><path d="M11.085 13.4756L9.18459 13.4755L7.83369 7.49128L9.73406 7.49135L11.085 13.4756Z" fill="currentColor"></path><path d="M13.9482 6.91016L15.8486 6.91022L17.1864 10.8747L15.286 10.8747L13.9482 6.91016Z" fill="currentColor"></path><path d="M20.4248 6.91016L18.5244 6.91022L17.1867 10.8747L19.087 10.8747L20.4248 6.91016Z" fill="currentColor"></path><path d="M18.5332 8.80762L18.5333 6.90725L22.4978 5.56949L22.4977 7.46986L18.5332 8.80762Z" fill="currentColor"></path><path d="M18.5332 2.33301L18.5333 4.23338L22.4978 5.57114L22.4977 3.67076L18.5332 2.33301Z" fill="currentColor"></path><path d="M20.4297 4.23145L18.5293 4.23138L17.1916 0.266876L19.0919 0.26694L20.4297 4.23145Z" fill="currentColor"></path><path d="M13.9541 4.23145L15.8545 4.23138L17.1922 0.266876L15.2919 0.26694L13.9541 4.23145Z" fill="currentColor"></path><path d="M15.8447 2.33398L15.8447 4.23436L11.8802 5.57211L11.8802 3.67174L15.8447 2.33398Z" fill="currentColor"></path><path d="M15.8447 8.80859L15.8447 6.90822L11.8802 5.57047L11.8802 7.47084L15.8447 8.80859Z" fill="currentColor"></path>`
  },
  {
    id: "05",
    title: "Always improving",
    icon: "◐",
    desc: "Every project teaches us something. We document, iterate, and apply those lessons to make the next one better.",
    accent: "#fff",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title xmlns="">code-bracket-square-solid</title><path fill="currentColor" fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53m-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06z" clip-rule="evenodd"/>`
  },
  {
    id: "06",
    title: "Long-term thinking",
    icon: "◑",
    desc: "We optimise for relationships, not transactions. The best brief of our careers will come from a client we've worked with before.",
    accent: "#fff",
    svg:`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><title xmlns="">cube-16-solid</title><path fill="currentColor" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"/></svg>`
  },
];

function ValueCard({ val }) {
  const cardRef = useRef();
  const glowRef = useRef();

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(card, {
      rotateY: dx * 9,
      rotateX: -dy * 9,
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
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      className="ab-val-card"
      style={{ "--accent": val.accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={glowRef} className="ab-val-glow" />
      <div className="ab-val-icon"><svg
      className="absolute h-20 w-20 right-0 top-0"
        viewBox="0 0 15 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: val.svg }}
      /></div>
      {/* <div className="ab-val-num">{val.id}</div> */}
      <h3 className="ab-val-title">{val.title}</h3>
      <p className="ab-val-desc">{val.desc}</p>
      
    </div>
  );
}

// function ValuesSection() {
//   const ref = useRef();
//   const headRef = useRef();
//   const cardsRef = useRef([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
//       gsap.to(headRef.current, {
//         autoAlpha: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         scrollTrigger: { trigger: headRef.current, start: "top 80%" },
//       });
//       cardsRef.current.forEach((card, i) => {
//         if (!card) return;
//         gsap.set(card, { autoAlpha: 0, y: 48 });
//         gsap.to(card, {
//           autoAlpha: 1,
//           y: 0,
//           duration: 0.7,
//           ease: "power3.out",
//           delay: (i % 3) * 0.08,
//           scrollTrigger: { trigger: card, start: "top 88%" },
//         });
//       });
//     }, ref);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={ref} className="ab-values-section">
      
//       <div className="ab-values-inner">
//         <div ref={headRef} className="ab-section-head">
//           {/* <p className="ab-eyebrow">What drives us</p> */}
//           <h2 className="ab-section-title">
//             Six values. <br /> One standard.
//             <br />
//             {/* <span
//               style={{
//                 background:
//                   "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//               className="font-light"
//             >
//               One standard.
//             </span> */}
//           </h2>
//         </div>
//         <div className="ab-values-grid">
//           {VALUES.map((val, i) => (
//             <div key={val.id} ref={(el) => (cardsRef.current[i] = el)}>
//               <ValueCard val={val} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─────────────────────────────────────────────────────────────────────────────
   5. TEAM
──────────────────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Amal Suresh P",
    role: "Founder & CEO",
    bio: "Visionary behind Algon's product direction and client strategy. 10+ years in digital product development.",
    initials: "AS",
    accent: "#4a6fff",
    pic:""
  },
  {
    name: "Abel Benny",
    role: "Co-founder & CTO",
    bio: "Architect of Algon's technical systems. Expert in scalable cloud infrastructure and full-stack engineering.",
    initials: "AB",
    accent: "#00d4aa",
    pic:""
  },
  {
    name: "Fayiz Muhammed khan",
    role: "Co-founder & Lead Developer",
    bio: "Drives engineering excellence across web and mobile. Polyglot engineer with deep expertise in Web3.",
    initials: "FM",
    accent: "#f43f5e",
    pic:""
  },
  {
    name: "Jyothis Mohan",
    role: "Lead Engineer",
    bio: "Leads the creative and UX vision across all projects. Specialises in motion design and design systems.",
    initials: "J",
    accent: "#a855f7",
    pic:""
  },
  {
    name: "Mariya Thomas",
    role: "Head of Delivery",
    bio: "Keeps every project on time, on scope, on budget. Obsessed with communication and client experience.",
    initials: "MT",
    accent: "#f59e0b",
    pic:""
  },
  {
    name: "Abhinand G",
    role: "Head of Growth",
    bio: "Drives Algon's marketing, partnerships, and client acquisition strategy across geographies.",
    initials: "AG",
    accent: "#22d3ee",
    pic:"/images/team/abhinand.png"
  },
  {
    name: "Riyas SK",
    role: "Head of Growth",
    bio: "Drives Algon's marketing, partnerships, and client acquisition strategy across geographies.",
    initials: "R",
    accent: "#22d3ee",
    pic:""
  },
];

function TeamSection() {
  const ref = useRef();
  const headRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { autoAlpha: 0, y: 40 });
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: (i % 3) * 0.07,
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ab-team-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ab-team-inner">
        <div ref={headRef} className="ab-section-head">
          {/* <p className="ab-eyebrow">The people</p> */}
          <h2 className="ab-section-title">
            Simple team.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-medium"
            >
             Massive output.
            </span>
          </h2>
          <p className="ab-section-sub">
            We're a focused team of designers, engineers, and strategists. No
            bloat, no hand-offs, no juniors handed your project. Senior talent,
            every time.
          </p>
        </div>

        <div className="ab-team-grid">
  {TEAM.map((person, i) => (
    <div
      key={i}
      ref={(el) => (cardsRef.current[i] = el)}
      className="ab-team-card"
      style={{ "--accent": person.accent }}
    >
      <div
        className="ab-team-avatar"
        style={{
          background: `${person.accent}18`,
          borderColor: `${person.accent}30`,
        }}
      >
        {person.pic ? (
          <img
            src={person.pic}
            alt={person.name}
            className="ab-team-pic"
          />
        ) : (
          <span
            className="ab-team-initials"
            style={{ color: person.accent }}
          >
            {person.initials}
          </span>
        )}

        {/* Animated ring */}
        <svg
          className="ab-team-ring"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke={person.accent}
            strokeWidth="0.8"
            strokeOpacity="0.3"
            strokeDasharray="6 4"
          />
        </svg>
      </div>

      <div className="ab-team-info">
        <h3 className="ab-team-name">
          {person.name}
        </h3>

        <p
          className="ab-team-role"
          style={{ color: person.accent }}
        >
          {person.role}
        </p>

        <p className="ab-team-bio">
          {person.bio}
        </p>
      </div>

      <div className="ab-team-bar" />
    </div>
  ))}
</div>

        <p className="ab-team-hiring">
          We're always looking for exceptional people.{" "}
          <a href="mailto:support@algonsolutions.com" className="ab-team-hire-link">
            See open roles →
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. NUMBERS — animated counters
──────────────────────────────────────────────────────────────────────────── */
const NUMBERS = [
  { end: 48, suffix: "+", label: "Projects delivered", accent: "#4a6fff" ,svg:"" ,},
  { end: 6, suffix: "", label: "Years in operation", accent: "#00d4aa",svg:"" },
  { end: 8, suffix: "", label: "Countries served", accent: "#f59e0b",svg:"" },
  {
    end: 10,
    suffix: "M+",
    label: "Daily active users on our products",
    accent: "#f43f5e",
    svg:""
  },
  { end: 100, suffix: "%", label: "On-time delivery rate", accent: "#a855f7",svg:"" },
  { end: 9, suffix: "", label: "Core service categories", accent: "#22d3ee",svg:"" },
];

function NumbersSection() {
  const ref = useRef();
  const numRefs = useRef([]);
  const triggered = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(".ab-num-item");
      items?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 32 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Counter animation
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 75%",
        once: true,
        onEnter() {
          if (triggered.current) return;
          triggered.current = true;
          numRefs.current.forEach((el, i) => {
            if (!el) return;
            const target = NUMBERS[i].end;
            gsap.fromTo(
              { val: 0 },
              { val: target },
              {
                duration: 1.8,
                ease: "power2.out",
                delay: i * 0.1,
                onUpdate() {
                  if (el) el.textContent = Math.round(this.targets()[0].val);
                },
              },
            );
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ab-numbers-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ab-numbers-inner">
        <div className="ab-numbers-head">
          {/* <p className="ab-eyebrow">By the numbers</p> */}
          <h2 className="ab-section-title">
            Results that
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="font-light"
            >
             speak volumes.
            </span>
          </h2>
        </div>
        <div className="ab-numbers-grid">
          {NUMBERS.map((n, i) => (
            <div
              key={i}
              className="ab-num-item"
              style={{ "--accent": n.accent }}
            >
              <div className="ab-num-value">
                <span
                  ref={(el) => (numRefs.current[i] = el)}
                  className="ab-num-count"
                  style={{ color: n.accent }}
                >
                  0
                </span>
                <span className="ab-num-suffix" style={{ color: n.accent }}>
                  {n.suffix}
                </span>
              </div>
              <p className="ab-num-label">{n.label}</p>
              <div className="absolute right-10 top-10">

                <svg
      className="absolute h-20 w-20 right-0 top-0"
        viewBox="0 0 15 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: n.svg }}
      />


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. CULTURE — sticky with sliding panels
──────────────────────────────────────────────────────────────────────────── */
const CULTURE_ITEMS = [
  {
    title: "Remote-first, always",
    desc: "We've been fully remote since day one. Our team spans time zones and cultures — the only thing that matters is the quality of the work, not where you sit.",
    detail:
      "Async-first communication. Tools built around deep work. Flexible hours around client commitments.",
    accent: "#298dff",
  },
  {
    title: "Outcomes over hours",
    desc: "We don't count hours. We measure impact. A feature shipped cleanly at 3pm is worth more than one bodged at midnight.",
    detail:
      "No mandatory standups. No time-tracking. Full autonomy over how you work, full accountability for what you deliver.",
    accent: "#298dff",
  },
  {
    title: "Relentless learning",
    desc: "The tech landscape evolves weekly. We invest in continuous education — from conference tickets to dedicated learning time every sprint.",
    detail:
      "Weekly knowledge shares. Budget for courses and tools. A culture where 'I don't know, let me find out' is celebrated.",
    accent: "#298dff",
  },
  {
    title: "Celebrate the craft",
    desc: "Great work deserves to be seen. We share internally, we write about what we build, and we're proud of the details nobody notices.",
    detail:
      "Internal design critiques. Public case studies. An audience built on showing the real work.",
    accent: "#298dff",
  },
];

const CULTURE_SCROLL_PER_ITEM = 55;

function CultureSection() {
  const wrapRef = useRef();
  const activeIdxRef = useRef(0);
  const stickyRef = useRef();
  const [activeIdx, setActiveIdx] = useState(0);
  const panelRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = CULTURE_ITEMS.length;

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          zIndex: i === 0 ? 2 : 1,
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: `+=${total * CULTURE_SCROLL_PER_ITEM}%`,
          pin: stickyRef.current,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.min(total - 1, Math.floor(self.progress * total));

            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveIdx(idx);

              panelRefs.current.forEach((el, i) => {
                if (!el) return;

                if (i === idx) {
                  gsap.to(el, {
                    autoAlpha: 1,
                    y: 0,
                    zIndex: 2,
                    duration: 0.5,
                    ease: "power3.out",
                  });
                } else {
                  gsap.to(el, {
                    autoAlpha: 0,
                    y: i < idx ? -40 : 40,
                    zIndex: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                  });
                }
              });
            }
          },
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const active = CULTURE_ITEMS[activeIdx];

  return (
    <div ref={wrapRef} className="ab-culture-wrap" data-navbar="dark" >
      <div ref={stickyRef} className="ab-culture-sticky">
        

        <div className="ab-culture-inner">
          {/* Left — static label + nav dots */}
          <div className="ab-culture-left">
            {/* <p className="ab-eyebrow">How we work</p> */}
            <h2 className="ab-section-title2  ab-section-title--sm">
              Culture that
              <br />
              <span
              style={{
                color:"#050508", fontWeight:"600"
              }}
              className="font-light"
            >
            scales with you.
            </span>
            </h2>
            <div className="ab-culture-dots">
              {CULTURE_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`ab-culture-dot ${i === activeIdx ? "ab-culture-dot--active" : ""}`}
                  style={{ "--accent": item.accent }}
                />
              ))}
            </div>
            <div className="ab-culture-counter">
              <span style={{ color: "#000" }}>
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span> / {String(CULTURE_ITEMS.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Right — stacked panels */}
          <div className="ab-culture-right">
            {CULTURE_ITEMS.map((item, i) => (
              <div
                key={i}
                ref={(el) => (panelRefs.current[i] = el)}
                className="ab-culture-panel"
                style={{ "--accent": item.accent }}
              >
                <div
                  className="ab-culture-accent-bar"
                  style={{ background: item.accent }}
                />
                <h3 className="ab-culture-title">{item.title}</h3>
                <p className="ab-culture-desc">{item.desc}</p>
                <p className="ab-culture-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. CTA
──────────────────────────────────────────────────────────────────────────── */
// function AboutCTA() {
//   const ref = useRef();

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const els = ref.current?.querySelectorAll(".ab-cta-el");
//       gsap.set(els, { autoAlpha: 0, y: 26 });
//       gsap.to(els, {
//         autoAlpha: 1,
//         y: 0,
//         duration: 0.7,
//         ease: "power3.out",
//         stagger: 0.1,
//         scrollTrigger: { trigger: ref.current, start: "top 75%" },
//       });
//     }, ref);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={ref} className="ab-cta-section">
//       <div className="ab-orb ab-orb--cta" />
//       <div className="ab-grid-bg" />
//       <div className="ab-grain" />
//       <div className="ab-cta-inner">
//         {/* <p className="ab-eyebrow ab-cta-el">Work with us</p> */}
//         <h2 className="ab-cta-head ab-cta-el">
//           Like what <br /> you see?
//           <br />
//           {/* <span
//               style={{
//                 background:
//                   "linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//               className="font-light"
//             >
//             you see?
//             </span> */}
//         </h2>
//         <p className="ab-cta-sub ab-cta-el">
//           We take on a select number of new projects each quarter.
//           <br />
//           Tell us about yours before the spots fill.
//         </p>
//         <div className="ab-cta-actions ab-cta-el">
//           <a href="/contact" className="ab-cta-btn">
//             Start the conversation
//             <svg
//               width="14"
//               height="10"
//               viewBox="0 0 14 10"
//               fill="none"
//               style={{ marginLeft: 10 }}
//             >
//               <path
//                 d="M1 5H13M13 5L9 1M13 5L9 9"
//                 stroke="currentColor"
//                 strokeWidth="1.4"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </a>
//           <a href="mailto:support@algonsolutions.com" className="ab-cta-ghost">
//             support@algonsolutions.com
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── Base tokens ─────────────────────────────────────── */
        .ab-grid-bg {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .ab-grain {
          position:absolute; inset:0; pointer-events:none; z-index:0; opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
        }
        .ab-orb {
          position:absolute; border-radius:50%; pointer-events:none; z-index:0;
        }
        .ab-orb--hero-r {
          top:-10%; right:-5%; width:60vw; height:60vw; max-width:720px; max-height:720px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.11) 0%,transparent 65%);
          filter:blur(2px);
        }
        .ab-orb--hero-l {
          bottom:-5%; left:-8%; width:38vw; height:38vw; max-width:440px; max-height:440px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.07) 0%,transparent 65%);
        }
        .ab-orb--vm {
          top:20%; right:-5%; width:50vw; height:50vw; max-width:600px; max-height:600px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.07) 0%,transparent 65%);
        }
        .ab-orb--cta {
          bottom:-20%; right:-5%; width:60vw; height:60vw; max-width:700px; max-height:700px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.09) 0%,transparent 65%);
        }
        .ab-eyebrow {
          font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.3em;
          text-transform:uppercase; color:rgba(255,255,255,0); margin:0 0 16px;
          display:block;
        }
        .ab-rule {
          width:100%; height:1px; background:rgba(255,255,255,0.1); margin-bottom:36px;
        }
        .ab-outline-text {
          -webkit-text-stroke:1.5px rgba(255,255,255,0.4); color:transparent;
        }
        .ab-section-title {
           font-size: clamp(32px, 4.5vw, 66px);
          font-weight: 500; line-height: 1.05;
           color: #fff; margin: 0; letter-spacing:2.05;
        }

        .ab-section-title2 {
           font-size: clamp(32px, 4.5vw, 66px);
          font-weight: 500; line-height: 1.05;
           color: #050508; margin: 0; letter-spacing:2.05;
        }
           
        .ab-section-title--sm { font-size:clamp(26px,3.2vw,48px); }
        .ab-section-head { margin-bottom:64px; }
        .ab-section-sub {
           font-size:clamp(13px,1.1vw,16px);
          font-weight:300; line-height:1.72; color:rgba(255,255,255,0.4);
          max-width:52ch; margin:20px 0 0;
        }

        /* ── HERO ────────────────────────────────────────────── */
        .ab-hero {
          position:relative; background:#050508; min-height:90vh; height:90vh; max-height:90vh;
          display:flex; flex-direction:column; justify-content:center;
          overflow:hidden; padding-top:72px;
        }
        .ab-grid-neon {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(41,141,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg,rgba(41,141,255,0.055) 1px, transparent 1px);
          background-size:64px 64px;
        }
        .ab-hero-ghost {
          position:absolute; bottom:5%; right:4vw;
          font-family:'Syne',sans-serif; font-weight:800;
          font-size:clamp(100px,18vw,260px); line-height:1;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04);
          pointer-events:none; z-index:0; user-select:none; letter-spacing:-0.05em;
        }
        .ab-hero-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1fr 600px;
          gap:0 5vw; align-items:center;
          padding:0px 7vw 60px; max-width:1500px;
          margin-top:20px;
        }
        .ab-hero-h1 {
           font-size: clamp(52px, 8vw, 110px);
          font-weight: 400; line-height: 0.96;
          letter-spacing: -0.04em; color: #fff; margin: 0 0 32px;
        }
          .pf-neon-text {
          color: #298dff;
          
        }
        .ab-h1-outline {
          -webkit-text-stroke:2px rgba(255,255,255,0.45); color:transparent;
        }
        .ab-hero-sub {
          font-size:clamp(14px,1.2vw,16px);
          font-weight:300; line-height:1.72; color:rgba(255,255,255,0.6);
          max-width:44ch; margin:0;
        }
        .ab-hero-canvas {
          position:relative; height:420px; will-change:opacity; transform: translateX(50px);
        }
        .ab-canvas-lbl {
          position:absolute;
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:0.2em; text-transform:uppercase;
          color:rgba(255,255,255,0.18); pointer-events:none; user-select:none;
        }
        .ab-canvas-lbl--tl { top:12px; left:12px; }
        .ab-canvas-lbl--br { bottom:12px; right:12px; }
        .ab-marq-wrap {
           position: absolute;
  left: 0;
  right: 0;
  bottom: 0; z-index:5;
          border-top:1px solid rgba(255,255,255,0.12);border-bottom:1px solid rgba(255,255,255,0.1); padding:18px 0; overflow:hidden;
        }
        .ab-marq-track { display:flex; white-space:nowrap; will-change:transform; }
        .ab-marq-item {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.2em;
          text-transform:uppercase; color:rgba(255,255,255,0.4);
          padding:0 28px; display:inline-flex; align-items:center; gap:10px;
        }
        .ab-marq-dot { font-size:7px; color:rgba(255,255,255,0.4); }

       /* ── STORY SECTION ─────────────────────────────────── */

.ab-story-wrap {
  position: relative;
}

.ab-story-sticky {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #050508;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 7vw;
}

/* Heading */
.ab-story-head {
  position: relative;
  z-index: 2;
  margin-bottom: 42px;
}

/* Progress bar */
.ab-story-progress {
  position: relative;
  z-index: 2;

  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.08);

  margin-bottom: 54px;
}

.ab-story-bar {
  height: 100%;
  width: 0%;

  background: #fff;
  box-shadow: 0 0 10px rgba(255,255,255,0.45);

  transition: width 0.35s ease;
}

/* Viewport */
.ab-tl-outer {
  position: relative;
  z-index: 2;
  overflow: hidden;
  width: 100%;
}

/* Sliding row */
.ab-tl-track {
  display: flex;
  align-items: flex-start;
  will-change: transform;

  transition: transform 0.8s
    cubic-bezier(0.22,1,0.36,1);
}

/* Card */
.ab-tl-item {
  flex: 0 0 33.333%;
  min-width: 33.333%;

  padding-right: 3vw;

  opacity: 0.28;
  transform: translateY(10px);

  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

/* Active item */
.ab-tl-item--active {
  opacity: 1;
  transform: translateY(0);
}

/* Year */
.ab-tl-year {
  font-size: clamp(36px,3.5vw,56px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;

  color: rgba(255,255,255,0.18);

  transition:
    color 0.4s ease,
    text-shadow 0.4s ease;
}

.ab-tl-item--active .ab-tl-year {
color: rgba(255,255,255,01);
 
}

/* Dot */
.ab-tl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;

  margin: 18px 0 22px;

  background: rgba(255,255,255,0.18);

  transition:
    background 0.4s ease,
    box-shadow 0.4s ease;
}

.ab-tl-item--active .ab-tl-dot {
  background: rgba(255,255,255,01);
  box-shadow: 0 0 10px rgba(255,255,255,0.55);
}

/* Title */
.ab-tl-title {
  font-size: clamp(24px,1.8vw,26px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.01em;

  color: #fff;
  margin: 0 0 14px;
}

/* Description */
.ab-tl-desc {
  font-size: clamp(16px,1.1vw,18px);
  line-height: 1.72;
  font-weight: 300;

  color: rgba(255,255,255,1);
  margin: 0;

  max-width: 28ch;
}

/* Counter */
.ab-story-counter {
  position: absolute;
  right: 7vw;
  bottom: 34px;
  z-index: 2;

  font-size: 24px;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.22);
}

.ab-story-counter-cur {
  font-size: 24px;
  color: rgba(255,255,255,0.72);
}

/* ── TABLET ────────────────────────────────────────── */
@media (max-width: 1024px) {
  .ab-tl-item {
    flex: 0 0 50%;
    min-width: 50%;
  }
}

/* ── MOBILE ────────────────────────────────────────── */
@media (max-width: 640px) {
  .ab-story-sticky {
    padding: 0 6vw;
  }

  .ab-story-head {
    margin-bottom: 30px;
  }

  .ab-story-progress {
    margin-bottom: 36px;
  }

  .ab-tl-item {
    flex: 0 0 100%;
    min-width: 100%;
    padding-right: 0;
  }

  .ab-tl-year {
    font-size: clamp(32px,10vw,48px);
  }

  .ab-story-counter {
    right: 6vw;
    bottom: 24px;
  }
}

        /* ── VISION / MISSION ────────────────────────────────── */
        .ab-vm-section {
          position:relative; background:#050508;
          padding:120px 7vw; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .ab-vm-inner { position:relative; z-index:1; display:flex; flex-direction:column; gap:0; }
        .ab-vm-block { padding:64px 0; }
        .ab-vm-label { margin-bottom:24px; }
        .ab-vm-text {
           font-size:clamp(22px,3vw,30px);
          font-weight:200; line-height:1.3; letter-spacing:-0.02em; color:#fff;
          max-width:900px; margin:0;
        }
        .ab-sw { display:inline; will-change:opacity; }
        .ab-vm-divider { width:100%; height:1px; background:rgba(255,255,255,0.07); }

        /* ── VALUES ──────────────────────────────────────────── */
        .ab-values-section {
          position:relative; background:#fcfcf7;
          padding:100px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
        }
        .ab-values-inner { position:relative; z-index:1; }
        .ab-values-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,0.06);
        }
        .ab-val-card {
          position:relative; background:#050508; padding:40px 32px 32px;
          overflow:hidden; transform-style:preserve-3d; cursor:default;
          transition:background 0.3s;
        }
        .ab-val-card:hover { background:rgba(255,255,255,0.02); }
        .ab-val-glow {
          position:absolute; width:180px; height:180px; border-radius:50%;
          background:radial-gradient(ellipse,var(--accent,#298dff) 0%,transparent 70%);
          opacity:0; transform:translate(-50%,-50%); pointer-events:none; z-index:0;
          transition:opacity 0.3s;
        }
        .ab-val-card:hover .ab-val-glow { opacity:0.1; }
        .ab-val-icon {
          font-size:28px; color:var(--accent,#298dff); margin-bottom:20px;
          position:relative; z-index:1; display:block;
          text-shadow:0 0 20px var(--accent,#298dff);
        }
        .ab-val-num {
          position:absolute; top:16px; right:20px;
           font-size:25px; letter-spacing:0.22em; font-weight:500; opacity:0.8;
          color:var(--accent,rgba(255,255,255,0.2));
          z-index:1;
        }
        .ab-val-title {
        font-family:'Syne',sans-serif; font-size:clamp(20px,1.6vw,24px);
          font-weight:300; letter-spacing:-0.02em; color:#fff; margin:0 0 14px;
          position:relative; z-index:1;
        }
        .ab-val-desc {
          font-family:'DM Sans',sans-serif; font-size:13px; line-height:1.72;
          color:rgba(255,255,255,0.6); margin:0; position:relative; z-index:1;
        }
        .ab-val-bar {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:var(--accent,transparent); opacity:0; transition:opacity 0.35s;
        }
        .ab-val-card:hover .ab-val-bar { opacity:0.55; }

        /* ── TEAM ────────────────────────────────────────────── */
        .ab-team-section {
          position:relative; background:#050508;
          padding:100px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
        }
        .ab-team-inner { position:relative; z-index:1; }
        .ab-team-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,0);
        }
        .ab-team-card {
          position:relative; background:#050508; padding:36px 28px 28px;
          overflow:hidden; transition:background 0.3s;
        }
        .ab-team-card:hover { background:rgba(255,255,255,0.02); }
        .ab-team-avatar {
          width:100px; height:100px; border-radius:50%; border:1px solid;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; position:relative;
        }
        .ab-team-initials {
           font-size:20px; font-weight:700;
        }
          .ab-team-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  border-radius: 50%;
  display: block;

  position: relative;
  z-index: 2;
}
        .ab-team-ring {
          position:absolute; inset:-13px; width:calc(100% + 26px); height:calc(100% + 26px);
          animation:ab-spin 12s linear infinite;
        }
        @keyframes ab-spin { to { transform: rotate(360deg); } }
        .ab-team-name {
           font-size:clamp(16px,1.4vw,25px);
          font-weight:300; letter-spacing:-0.02em; color:#fff; margin:0 0 5px;
        }
        .ab-team-role {
           font-size:10px; letter-spacing:0.14em;
          text-transform:uppercase; margin:0 0 14px;
        }
        .ab-team-bio {
           font-size:13px; line-height:1.7; font-weight:300;
          color:rgba(255,255,255,0.4); margin:0;
        }
        .ab-team-bar {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:var(--accent,transparent); opacity:0; transition:opacity 0.35s;
        }
        .ab-team-card:hover .ab-team-bar { opacity:0.5; }
        .ab-team-hiring {
          font-family:'DM Sans',sans-serif; font-size:14px;
          color:rgba(255,255,255,0.35); margin:40px 0 0; text-align:center;
        }
        .ab-team-hire-link {
          color:rgba(255,255,255,0.7); text-decoration:none;
          transition:color 0.25s;
        }
        .ab-team-hire-link:hover { color:#fff; }

        /* ── NUMBERS ─────────────────────────────────────────── */
        .ab-numbers-section {
          position:relative; background:#050508;
          padding:100px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
        }
        .ab-numbers-inner { position:relative; z-index:1; }
        .ab-numbers-head { margin-bottom:64px; }
        .ab-numbers-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:0; 
        }
        .ab-num-item {
          padding:40px 0 40px;
          
          padding-left:40px;
        }
        .ab-num-item:nth-child(3n) { border-right:none; }
        .ab-num-item:nth-child(n+4) {  }
        .ab-num-value { display:flex; align-items:baseline; gap:2px; margin-bottom:10px; }
        .ab-num-count {
          font-size:clamp(44px,7.5vw,100px);
          font-weight:500; letter-spacing:-0.04em; line-height:1;
        }
        .ab-num-suffix {
           font-size:clamp(28px,2.8vw,44px);
          font-weight:500; letter-spacing:-0.03em;
        }
        .ab-num-label {
           font-size:16px; letter-spacing:0.08em;
          color:rgba(255,255,255,1); margin:0 0 20px; font-weight:300;
          
        }
        .ab-num-line {
          width:32px; height:1px; background:rgba(255,255,255,0.2);
        }

        /* ── CULTURE ─────────────────────────────────────────── */
        .ab-culture-wrap { position:relative; }
        .ab-culture-sticky {
          position:relative; width:100%; height:100vh;
          background:#fcfcf7; overflow:hidden;
          display:flex; align-items:center;
        }
        .ab-culture-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1fr 1fr;
          gap:0 6vw; width:100%; padding:0 7vw;
          align-items:center;
        }
        .ab-culture-left { display:flex; flex-direction:column; gap:24px; }
        .ab-culture-dots { display:flex; gap:10px; }
        .ab-culture-dot {
          width:6px; height:6px; border-radius:50%;
          background:rgba(0,0,0,0.15); transition:background 0.4s, transform 0.4s;
        }
        .ab-culture-dot--active {
          background:#000; transform:scale(1.5);
          box-shadow:#000;
        }
        .ab-culture-counter {
          font-size:20px; letter-spacing:0.05em;font-weight:700;
          color:#ccc; 
        }
       .ab-culture-right {
  position: relative;
  min-height: 320px;
}

.ab-culture-panel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  will-change: opacity, transform;
  pointer-events: none;
}

.ab-culture-panel[style*="opacity: 1"] {
  pointer-events: auto;
}
  
        .ab-culture-accent-bar {
          width:40px; height:2px; margin-bottom:24px; opacity:0;
        }
        .ab-culture-title {
           font-size:clamp(24px,2.5vw,38px);
          font-weight:600; letter-spacing:-0.03em; color:#000; margin:0 0 20px;
        }
        .ab-culture-desc {
           font-size:clamp(14px,1.2vw,17px);
          font-weight:400; line-height:1.75; color:rgba(0,0,0,0.85);
          max-width:46ch; margin:0 0 20px;
        }
        .ab-culture-detail {
           font-size:15px; line-height:1.7;
          color:rgba(0,0,0,0.7); margin:0; font-weight: 400;
          border-left:2px solid rgba(0,0,0,0.3); padding-left:16px;
          max-width:42ch;
        }
        .ab-culture-canvas {
          position:absolute; right:-2vw; top:50%; transform:translateY(-50%);
          width:260px; height:260px; z-index:0; pointer-events:none; opacity:0.35;
        }

        /* ── CTA ─────────────────────────────────────────────── */
        .ab-cta-section {
          position:relative; background:#050508;
          padding:130px 7vw 150px; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .ab-cta-inner { position:relative; z-index:1; }
        .ab-cta-head {
          font-size:clamp(48px,8vw,120px);
          font-weight:400; line-height:0.94; letter-spacing:-0.04em;
          color:#fff; margin:0 0 24px;
        }
        .ab-cta-sub {
           font-size:clamp(14px,1.1vw,16px);
          font-weight:300; line-height:1.72; color:rgba(255,255,255,0.38);
          max-width:44ch; margin:0 0 48px;
        }
        .ab-cta-actions { display:flex; align-items:center; gap:32px; flex-wrap:wrap; }
        .ab-cta-btn {
          display:inline-flex; align-items:center;
           font-size:13px;
          letter-spacing:0.14em; text-transform:uppercase;
          text-decoration:none; color:#050508; background:#fff;
          padding:16px 36px; transition:background 0.25s;
        }
        .ab-cta-btn:hover { background:#298dff; color: #fcfcf7 }
        .ab-cta-ghost {
           font-size:13px; letter-spacing:0.08em;
          text-decoration:none; color:rgba(255,255,255,0.3); transition:color 0.25s;
        }
        .ab-cta-ghost:hover { color:rgba(255,255,255,0.7); }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width:1024px) {
          .ab-hero-inner { grid-template-columns:1fr; }
          .ab-hero-canvas { position:relative; height:220px; will-change:opacity;align-items:center; justify-content:center;}
          .ab-values-grid, .ab-team-grid { grid-template-columns:repeat(2,1fr); }
          .ab-numbers-grid { grid-template-columns:repeat(2,1fr); }
          .ab-num-item:nth-child(2n) { border-right:none; }
          .ab-num-item:nth-child(n+3) { border-top:1px solid rgba(255,255,255,0.07); }
          .ab-culture-inner { grid-template-columns:1fr; }
          .ab-culture-canvas { display:none; }
          .ab-tl-item { flex:0 0 70vw; }
        }
        @media (max-width:640px) {
        .ab-hero-canvas { height:220px; will-change:opacity;align-items:center; justify-content:center;}
          .ab-values-grid, .ab-team-grid, .ab-numbers-grid { grid-template-columns:1fr; }
          .ab-num-item { border-right:none; }
          .ab-num-item:nth-child(n+2) { border-top:1px solid rgba(255,255,255,0.07); }
          .ab-tl-item { flex:0 0 90vw; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <AboutHero />
        {/* <Marquee/> */}
        <ScrollIndicator />
        <StorySection />
        <VisionMission />
        <ValuesSectionAbout />
        {/* <TeamSection /> */}
        {/* <NumbersSection /> */}
        <CultureSection />
        <CTASectionAbt />
        <Footer />
      </div>
    </>
  );
}
