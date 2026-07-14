/**
 * ScrollRevealSection.jsx
 *
 * DEPENDENCIES:
 *   npm install @react-three/fiber @react-three/drei gsap
 *
 * Place GLB at: /public/Algon_a_3.glb
 */

import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { Workflow } from "lucide-react";
import { Code2, Smartphone, Blocks, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const scrollDistance = 400; // desktop only now, mobile/tablet don't pin

const PANELS = [
  {
    headline: "Where intelligence starts working.",
    para: "We build AI that doesn't just answer questions—it makes decisions, automates workflows, and quietly handles the work behind your business.",
    btn: "Enter the future",
    img: "/images/col1.jpg",
    icon: Code2,
  },
  {
    headline: "Software that feels inevitable.",
    para: "Thoughtfully engineered products that are fast, scalable, and effortless to use—built to become an extension of your business.",
    btn: "See what's possible",
    img: "/images/col2.jpg",
    icon: Smartphone,
  },
  {
    headline: "Your dedicated engineering edge.",
    para: "Dedicated experts who plug into your team, accelerate delivery, and keep your product moving without slowing you down.",
    btn: "Meet the team",
    img: "/images/col4.jpg",
    icon: Brain,
  },
  
];

// ─── OPT: mounts the Canvas only while the section is near/within the
// viewport, and UNMOUNTS it again once scrolled fully away — so the
// GLTF + WebGL context only exist while there's a reason for them to.
function useViewportMount(rootMargin = "400px") {
  const ref = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShouldMount(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, shouldMount];
}

/* ─────────────────────────────────────────────
   3-D  MODEL  (desktop only)
───────────────────────────────────────────── */
function AlgonModel({ scrollProgress }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/Algon_a_3.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const clonedScene = React.useMemo(() => scene.clone(true), [scene]);

  // ─── OPT: cache meshes once, never traverse in useFrame ──────────────────
  const meshMaterials = useRef([]);
  useEffect(() => {
    meshMaterials.current = [];
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          const mats = Array.isArray(child.material)
            ? child.material
            : [child.material];
          mats.forEach((mat) => {
            mat.transparent = true;
          });
          meshMaterials.current.push(...mats);
        }
      }
    });
  }, [clonedScene]);

  useEffect(() => {
    const keys = Object.keys(actions);
    if (keys.length) {
      const action = actions[keys[0]];
      action.reset().play();
      action.timeScale = 2;
    }
    return () => mixer?.stopAllAction();
  }, [actions, mixer]);

  useFrame(() => {
    if (!group.current) return;
    const p = scrollProgress.current;

    let x, y, z, scale, opacity;

    if (p < 0.18) {
      const t = p / 0.18;
      const ease = 1 - Math.pow(1 - t, 3);
      x = gsap.utils.interpolate(-10, 1.2, ease);
      y = gsap.utils.interpolate(-5, -6, ease);
      z = gsap.utils.interpolate(-18, -15, ease);
      scale = gsap.utils.interpolate(0.3, 0.6, ease);
      opacity = ease;
    } else if (p < 0.86) {
      x = 1.2;
      y = -6;
      z = -15;
      scale = 0.6;
      opacity = 1;
    } else {
      const t = (p - 0.86) / 0.14;
      const ease = t * t;
      x = gsap.utils.interpolate(1.2, 1.2, ease);
      y = gsap.utils.interpolate(-6, -6, ease);
      z = gsap.utils.interpolate(-15, -15, ease);
      scale = gsap.utils.interpolate(0.6, 0.6, ease);
      opacity = 1;
    }
    group.current.position.set(x, y, z);
    group.current.scale.setScalar(scale * 2.6);

    const o = Math.max(0, Math.min(1, opacity));
    meshMaterials.current.forEach((mat) => {
      mat.opacity = o;
    });
  });

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   LIGHTS  (desktop only)
───────────────────────────────────────────── */
function Lighting() {
  return (
    <>
      <directionalLight
        position={[15, -4, 10]}
        intensity={0.3}
        color="#ff7e6e"
        castShadow={false}
      />
      <directionalLight position={[6, 2, -2]} intensity={0.3} color="#6564ff" />
      <directionalLight
        position={[-5, -3, -2]}
        intensity={0.3}
        color="#6aff8c"
      />
      <directionalLight
        position={[-5, 0, 10]}
        intensity={0.3}
        color="#ffd276"
      />
      <ambientLight intensity={1} color="#1a2a3a" />
      <pointLight
        position={[0, -2, 3]}
        intensity={0.3}
        color="#1a6aff"
        distance={12}
        decay={2}
      />
    </>
  );
}

/* ─────────────────────────────────────────────
   DESKTOP VARIANT — pinned scroll + 3D model
───────────────────────────────────────────── */
function DesktopSection() {
  const stickyRef = useRef();
  const panelsWrapRef = useRef();
  const scrollProgress = useRef(0);

  const [canvasWrapRef, shouldMountCanvas] = useViewportMount("400px");

  useEffect(() => {
    const container = panelsWrapRef.current;

    const panels = PANELS.map((_, i) => {
      const wrap = container.querySelector(`[data-panel="${i}"]`);
      const headline = wrap.querySelector('[data-role="headline"]');
      const para = wrap.querySelector('[data-role="para"]');
      const btn = wrap.querySelector('[data-role="btn"]');
      return { wrap, headline, para, btn };
    });

    panels.forEach((p) => {
      gsap.set([p.headline, p.para, p.btn], { opacity: 0 });
    });

    if (canvasWrapRef.current) gsap.set(canvasWrapRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${scrollDistance}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        // ─── No invalidate()/frame-pausing here — the Canvas below runs
        // its own continuous render loop (frameloop="always"), so the
        // model's animation mixer keeps playing even when scroll is idle.
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      },
    });

    if (canvasWrapRef.current) {
      tl.to(
        canvasWrapRef.current,
        { opacity: 1, duration: 0.08, ease: "power2.out" },
        0.04,
      );
    }

    function addReveal(headline, para, btn, start) {
      tl.to(
        [headline, para, btn],
        { opacity: 1, duration: 0.1, ease: "power2.out" },
        start,
      );
    }
    function addExit(headline, para, btn, start) {
      tl.to(
        [headline, para, btn],
        { opacity: 0, duration: 0.07, ease: "power2.in" },
        start,
      );
    }

    addReveal(panels[0].headline, panels[0].para, panels[0].btn, 0.04);
    addExit(panels[0].headline, panels[0].para, panels[0].btn, 0.28);
    addReveal(panels[1].headline, panels[1].para, panels[1].btn, 0.37);
    addExit(panels[1].headline, panels[1].para, panels[1].btn, 0.58);
    addReveal(panels[2].headline, panels[2].para, panels[2].btn, 0.67);

    if (canvasWrapRef.current) {
      tl.to(
        canvasWrapRef.current,
        { opacity: 1, duration: 0.08, ease: "power2.in" },
        0.88,
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="srv-section "  data-navbar="dark">
      
      <div ref={stickyRef} className="srv-sticky">
        <h2 className="text-black text-[25px] absolute top-[30vh] ">Why choose Us?</h2>
        {/* <div data-navbar="dark" ref={canvasWrapRef} className="srv-canvas-wrap">
          {shouldMountCanvas && (
            <Canvas
              dpr={[1, 1.5]}
              frameloop="always" // ── continuous loop: model animation never pauses while mounted
              camera={{ position: [0, 1.5, 7], fov: 42, near: 0.1, far: 100 }}
              gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.15,
                outputColorSpace: THREE.SRGBColorSpace,
                stencil: false,
                powerPreference: "high-performance",
              }}
              shadows={false}
              style={{ background: "transparent" }}
            >
              <Lighting />
              <Suspense fallback={null}>
                <AlgonModel scrollProgress={scrollProgress} />
                <Environment preset="city" resolution={128} />
              </Suspense>
            </Canvas>
          )}
        </div> */}

        <div ref={panelsWrapRef} className="relative h-[50vh] w-screen flex justify-center mx-auto ">
          {PANELS.map((panel, i) => (
            <div key={i} className="relative w-full srv-panel mx-auto flex-col items-center " data-panel={i}>
              <div className="max-w-7xl relative flex justify-center mx-auto">
              <h2
                className="srv-headline relative robotofont tracking-tight text-center font-medium"
                data-role="headline"
              >
                {panel.headline}
              </h2>
              </div>
              <div className="max-w-xl mx-auto">
              <p className="srv-para text-center" data-role="para">
                {panel.para}
                
              </p>
              </div>
              <button className="srv-btn" type="button" data-role="btn" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MOBILE / TABLET VARIANT — simple stacked rows,
   no 3D, no Canvas, no R3F mount at all.
───────────────────────────────────────────── */
function MobileRow({ panel, index }) {
  const Icon = panel.icon;
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // ─── OPT: plain IntersectionObserver + CSS transition instead of GSAP/
    // ScrollTrigger — cheapest possible way to fade rows in on mobile.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className={`srv-row ${visible ? "srv-row-visible" : ""}`}>
      
      {/* <span className="srv-row-index">{String(index + 1).padStart(2, "0")}</span> */}

      <div className="srv-row-deco relative mb-1 z-6" aria-hidden="true" />

      <div className="srv-row-content">
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
          {/* Background Image */}
          <img
            src={panel.img}
            alt={panel.headline}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Black Gradient */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 8%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.0) 100%)",
            }}
          />

          {/* Grain Overlay */}
          <div
            className="absolute rotate-180 inset-0 z-[25] opacity-30 mix-blend-soft-light pointer-events-none"
            style={{
  backgroundImage: "url('/images/411221805_513b98f7-9dc5-4844-86ca-379ae723b77f.jpg')",

  backgroundSize: "950px",
}}
          />

          {/* Text */}
          <div className="absolute flex-col inset-x-0 bottom-0 z-30 p-6">
            <Icon className="w-[50px] h-[50px] text-white mb-4" />
            <h2 className="text-white text-2xl md:text-3xl font-medium leading-tight tracking-wide">
              {panel.headline}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSection() {
  return (
    <section className="srv-section srv-section-mobile relative overflow-hidden">
      {/* Top brush */}
      {/* <img
        src="/images/brush stroke start2.png"
        alt=""
        className="absolute top-0 left-0 w-full pointer-events-none select-none z-0"
      /> */}<h2 className="text-black robotofont text-[45px] font-medium text-center mb-5">
        Why choose us?
      </h2>

      <div className="srv-rows-wrap relative z-10">
        {PANELS.map((panel, i) => (
          <MobileRow key={i} panel={panel} index={i} />
        ))}
      </div>

      {/* Bottom brush */}
      {/* <img
        src="/images/brush stroke finish2.png"
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-0"
      /> */}
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN — picks desktop (3D, pinned) vs
   mobile/tablet (plain stacked rows) and only
   ever mounts one of the two branches.
───────────────────────────────────────────── */
export default function ScrollRevealSection() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    let t;
    const handleResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setIsDesktop(window.innerWidth >= 1024), 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        .srv-section { position: relative; background: #fcfcf7; }

        /* ── Desktop pinned layout ───────────────────────── */
        .srv-sticky {
          position: relative; height: 100vh; width: 100%;
          overflow: hidden; display: flex; align-items: center;
          max-width: 100vw; justify-content: center;
        }
        .srv-panels-wrap {
          position: relative; z-index: 2; width: 62vw;
          min-height: 50vh; display: flex; justify-content: center; align-items: center; user-select: none;
        }
        .srv-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
        .srv-headline {
          
          font-size: clamp(42px, 5.5vw, 60px); line-height: 0.96;
          color: #000000; margin: 0 0 clamp(24px, 3vh, 44px) 0;
          will-change: opacity; font-weight:400; font-family: var(--font-roboto);
        }
        .srv-para {
          font-weight: 400; color: rgba(0,0,0,0.8);
          font-size: clamp(16px, 1.4vw, 16px); 
          will-change: opacity;
          margin-bottom: clamp(20px, 2.5vh, 32px);
        }
        .srv-btn {
          display: inline-flex; align-items: center; gap: 0.5em;
          background: none; border: none; padding: 0; cursor: pointer;
          font-size: clamp(13px, 1.1vw, 16px); font-weight: 300;
          letter-spacing: 0.06em; color: rgba(0,0,0,0.65);
          text-decoration: none; will-change: opacity;
          transition: color 0.3s ease; outline: none;
        }
        .srv-btn:hover { color: rgba(0,0,0,1); }
        .srv-canvas-wrap {
          position: absolute; top: 50%; transform: translateY(-50%);
          right: -6vw; width: 68vw; height: 100vh;
          z-index: 3; pointer-events: none; will-change: opacity;
        }

        /* ── Mobile / tablet stacked rows ────────────────── */
        .srv-section-mobile {
          position: relative; overflow: hidden;
          padding: 15vw 6vw 15vw;
        }
        .srv-rows-wrap {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          gap: 0vw;
        }
        .srv-row {
          position: relative;
          display: flex; flex-direction: column; gap: 1.1em;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .srv-row-visible { opacity: 1; transform: translateY(0); }
        // .srv-row-index {
        //   font-size: 13px; font-weight: 500; letter-spacing: 0.18em;
        //   color: rgba(0,0,0,0.35);
        // }
        // .srv-row-deco {
        //   width: 38px; height: 2px; background: rgba(0,0,0,0.18);
        //   border-radius: 1px;
        // }
        .srv-row-headline {
          font-size: clamp(28px, 7vw, 38px); line-height: 1.08;
          font-weight: 300; color: #000; margin: 0;
          font-family: DisplayFont;
        }
        .srv-row-para {
          font-size: 15px; font-weight: 300; line-height: 1.6;
          color: rgba(0,0,0,0.55); max-width: 52ch; margin: 0;
        }
        .srv-row-btn {
          margin-top: 0.4em; align-self: flex-start;
          background: none; border: none; padding: 0; cursor: pointer;
          font-size: 13px; font-weight: 400; letter-spacing: 0.1em;
          color: rgba(0,0,0,0.7); text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* ── Lightweight decorative elements (pure CSS, no JS/3D cost) ── */
        // .srv-deco-blob {
        //   position: absolute; border-radius: 50%;
        //   filter: blur(60px); pointer-events: none; z-index: 0;
        //   opacity: 0.35;
        // }
        // .srv-deco-blob-1 {
        //   width: 60vw; height: 60vw; top: -20vw; right: -25vw;
        //   background: radial-gradient(circle, #ffd9c2 0%, transparent 70%);
        // }
        // .srv-deco-blob-2 {
        //   width: 50vw; height: 50vw; bottom: -15vw; left: -20vw;
        //   background: radial-gradient(circle, #c2e0ff 0%, transparent 70%);
        // }
        // .srv-deco-grid {
        //   position: absolute; inset: 0; z-index: 0; pointer-events: none;
        //   background-image:
        //     linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
        //     linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
        //   background-size: 36px 36px;
        //   mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
        // }
      `}</style>

      {isDesktop ? <DesktopSection /> : <MobileSection />}
    </>
  );
}

useGLTF.preload("/Algon_a_3.glb");
