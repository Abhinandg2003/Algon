/**
 * TestimonialSection.jsx
 *
 * Right-side 3D crystal replaced with a Lottie animation.
 * Swap in your own JSON by replacing LOTTIE_DATA (or import it directly).
 *
 * DEPENDENCIES: gsap, lottie-web
 * Install:  npm install lottie-web
 */

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

import LOTTIE_DATA from "/src/assets/Sparkle.json";
import LOTTIE_DATA2 from "/src/assets/Ripple.json";

/* ─────────────────────────────────────────────────────────────────────────────
   TIMELINE CONSTANTS
──────────────────────────────────────────────────────────────────────────── */
const IN_DUR = 0.65;
const HOLD_DUR = 0.7;
const OUT_DUR = 0.5;
const CARD_DUR = IN_DUR + HOLD_DUR + OUT_DUR; // 1.85s

const C_IN_START = 0;
const C_IN_DUR = 0.35;
const CARD_START = [C_IN_DUR, C_IN_DUR + CARD_DUR, C_IN_DUR + CARD_DUR * 2];
const C_OUT_START = CARD_START[2] + IN_DUR + HOLD_DUR;
const C_OUT_DUR = 0.35;
const TOTAL = C_OUT_START + C_OUT_DUR;

// ── OPT: separate scroll-distance multipliers — mobile gets a much
// shorter pinned scroll so the user doesn't have to scroll forever
// to pass through the section. Desktop keeps the original pacing.
const VH_PER_SEC_DESKTOP = 90;
const VH_PER_SEC_MOBILE = 42;

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "Algon helped us transform our idea into a complete ecommerce brand with a strong digital identity and scalable Shopify experience.",
    author: "Founding Team",
    role: "",
    company: "TheSneek",
    logo: "/images/clients/logos/Thesneek.png",
    metric: "4 Days",
    metricLabel: "Delivery",
    accent: "#0050d4",
    accent1: "#298dff",
    accent2: "#0050d4",
  },
  {
    quote:
      "The system transformed the way we manage appointments and patient workflows while giving us a professional digital presence.",
    author: "Management Team",
    role: "",
    company: "Mindful Rejuvenation",
    logo: "/images/clients/logos/mindful.png",
    metric: "50+",
    metricLabel: "Modules",
    accent: "#0050d4",
    accent1: "#298dff",
    accent2: "#0050d4",
  },
  {
    quote:
      "We came to Algon with a vision nobody else could execute. They built our entire Web3 infrastructure from scratch — smart contracts, dApp, and brand — in 8 weeks. Absolute technical mastery paired with genuine creative ambition.",
    author: "Management",
    role: "",
    company: "Visat Group of Institutions",
    logo: "/images/clients/logos/Visat algon.png",
    metric: "8 wks",
    metricLabel: "Full delivery",
    accent: "#0050d4",
    accent1: "#298dff",
    accent2: "#0050d4",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CARD HELPERS  (unchanged)
──────────────────────────────────────────────────────────────────────────── */
function hideCard(r) {
  gsap.set(r.line.current, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(r.eyebrow.current, { autoAlpha: 0, y: 16 });
  gsap.set(r.openQuote.current, { autoAlpha: 0, y: 30 });
  gsap.set(r.quote.current, { autoAlpha: 0, y: 40 });
  gsap.set(r.logo.current, { autoAlpha: 0, y: 16 });
  gsap.set(r.dot.current, { autoAlpha: 0 });
  gsap.set(r.author.current, { autoAlpha: 0, y: 14 });
  gsap.set(r.role.current, { autoAlpha: 0, y: 10 });
  gsap.set(r.mBox.current, { autoAlpha: 0, x: -24 });
  gsap.set(r.mNum.current, {
    autoAlpha: 0,
    y: 24,
    scale: 0.78,
    transformOrigin: "left bottom",
  });
  gsap.set(r.mLbl.current, { autoAlpha: 0, y: 8 });
}

function addCardIn(tl, r, s) {
  tl.to(
    r.line.current,
    { scaleX: 1, duration: 0.32, ease: "power3.inOut" },
    s + 0.0,
  )
    .to(
      r.eyebrow.current,
      { autoAlpha: 1, y: 0, duration: 0.24, ease: "power3.out" },
      s + 0.06,
    )
    .to(
      r.openQuote.current,
      { autoAlpha: 1, y: 0, duration: 0.28, ease: "power4.out" },
      s + 0.12,
    )
    .to(
      r.quote.current,
      { autoAlpha: 1, y: 0, duration: 0.36, ease: "power4.out" },
      s + 0.18,
    )
    .to(
      r.mBox.current,
      { autoAlpha: 1, x: 0, duration: 0.28, ease: "expo.out" },
      s + 0.24,
    )
    .to(
      r.mNum.current,
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.4)" },
      s + 0.3,
    )
    .to(
      r.logo.current,
      { autoAlpha: 1, y: 0, duration: 0.22, ease: "power3.out" },
      s + 0.36,
    )
    .to(r.dot.current, { autoAlpha: 1, duration: 0.16 }, s + 0.42)
    .to(
      r.author.current,
      { autoAlpha: 1, y: 0, duration: 0.2, ease: "power3.out" },
      s + 0.44,
    )
    .to(
      r.role.current,
      { autoAlpha: 1, y: 0, duration: 0.18, ease: "power3.out" },
      s + 0.48,
    )
    .to(
      r.mLbl.current,
      { autoAlpha: 1, y: 0, duration: 0.16, ease: "power3.out" },
      s + 0.5,
    );
}

function addCardOut(tl, r, s) {
  tl.to(
    r.quote.current,
    { autoAlpha: 0, y: -24, duration: 0.2, ease: "power2.in" },
    s + 0.0,
  )
    .to(
      r.openQuote.current,
      { autoAlpha: 0, y: -16, duration: 0.18, ease: "power2.in" },
      s + 0.03,
    )
    .to(
      r.line.current,
      { scaleX: 0, duration: 0.2, ease: "power2.in" },
      s + 0.03,
    )
    .to(r.eyebrow.current, { autoAlpha: 0, y: -10, duration: 0.16 }, s + 0.06)
    .to(r.role.current, { autoAlpha: 0, y: -6, duration: 0.14 }, s + 0.07)
    .to(r.author.current, { autoAlpha: 0, y: -8, duration: 0.14 }, s + 0.08)
    .to(r.dot.current, { autoAlpha: 0, duration: 0.12 }, s + 0.1)
    .to(r.logo.current, { autoAlpha: 0, y: -8, duration: 0.14 }, s + 0.1)
    .to(
      r.mNum.current,
      { autoAlpha: 0, y: -14, scale: 0.84, duration: 0.18 },
      s + 0.11,
    )
    .to(r.mLbl.current, { autoAlpha: 0, y: -4, duration: 0.14 }, s + 0.14)
    .to(r.mBox.current, { autoAlpha: 0, x: -14, duration: 0.16 }, s + 0.16);
}

/* ─────────────────────────────────────────────────────────────────────────────
   LOTTIE PLAYER
   Mounts lottie-web into a div. Plays on mount, cleans up on unmount.
   ── OPT: accepts an `isVisible` flag and pauses/resumes the existing
   instance instead of always running — this does NOT alter the animation
   JSON, frame count, loop behavior, or content in any way, it just stops
   spending CPU on it while the section is off-screen.
──────────────────────────────────────────────────────────────────────────── */
function LottiePlayer({ animationData, isVisible }) {
  const containerRef = useRef();
  const instanceRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    if (animationData) {
      instanceRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    }

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [animationData]);

  // ── OPT: pause/resume playback only — same loop/content, just gated
  // by whether the section is actually on screen.
  useEffect(() => {
    const inst = instanceRef.current;
    if (!inst) return;
    if (isVisible) inst.play();
    else inst.pause();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="ts-lottie-inner">
      {!animationData && (
        <div className="ts-lottie-placeholder">
          <div className="ts-lottie-ph-ring ts-lottie-ph-ring--1" />
          <div className="ts-lottie-ph-ring ts-lottie-ph-ring--2" />
          <div className="ts-lottie-ph-ring ts-lottie-ph-ring--3" />
          <span className="ts-lottie-ph-label">Lottie animation</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────────────────────── */
export default function TestimonialSection() {
  const wrapperRef = useRef();
  const stickyRef = useRef();
  const canvasWrapRef = useRef();
  const indexLblRef = useRef();
  const progFillRef = useRef();

  // ── OPT: idx is tracked in a ref, not React state — onUpdate fires at
  // scroll-frame frequency (dozens of times/sec while scrubbing), and the
  // old setActiveIdx() call there forced a full component re-render every
  // single tick. The progress bar color is now mutated directly on the
  // DOM node only when the active index actually changes (3 times total
  // per pass through the section), not every scroll frame.
  const activeIdxRef = useRef(0);

  // ── OPT: track mobile vs desktop, debounced, used only to pick the
  // pinned scroll distance — doesn't drive per-frame work.
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setIsMobile(window.innerWidth < 768), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ── OPT: pauses the two Lottie instances when the section is off
  // screen, resumes when back in view. Only toggles (and re-renders)
  // on actual visibility changes, not per scroll tick.
  const [sectionVisible, setSectionVisible] = useState(false);
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cards = useRef(
    Array.from({ length: 3 }, () => ({
      line: { current: null },
      eyebrow: { current: null },
      openQuote: { current: null },
      quote: { current: null },
      logo: { current: null },
      dot: { current: null },
      author: { current: null },
      role: { current: null },
      mBox: { current: null },
      mNum: { current: null },
      mLbl: { current: null },
    })),
  ).current;

  useEffect(() => {
    if (!wrapperRef.current || !stickyRef.current) return;
    if (!canvasWrapRef.current || !indexLblRef.current || !progFillRef.current)
      return;
    if (cards.some((r) => Object.values(r).some((ref) => !ref.current))) return;

    cards.forEach(hideCard);

    gsap.set(canvasWrapRef.current, {
      autoAlpha: 0,
      scale: 0.9,
      transformOrigin: "center center",
    });
    gsap.set(indexLblRef.current, { autoAlpha: 0 });
    gsap.set(progFillRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    // ── OPT: set initial accent color directly, no state needed
    progFillRef.current.style.background = TESTIMONIALS[0].accent;

    const vhPerSec = isMobile ? VH_PER_SEC_MOBILE : VH_PER_SEC_DESKTOP;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${Math.round(TOTAL * vhPerSec)}%`,
        pin: stickyRef.current,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate(self) {
          const sec = self.progress * TOTAL;
          const idx = sec < CARD_START[1] ? 0 : sec < CARD_START[2] ? 1 : 2;

          // ── OPT: only touch the DOM when the active index actually
          // changes, instead of every scroll tick.
          if (idx !== activeIdxRef.current) {
            activeIdxRef.current = idx;
            if (progFillRef.current) {
              progFillRef.current.style.background = TESTIMONIALS[idx].accent;
            }
          }
          if (progFillRef.current)
            gsap.set(progFillRef.current, { scaleX: self.progress });
          if (indexLblRef.current)
            indexLblRef.current.textContent = `0${idx + 1} — 03`;
        },
      },
    });

    // Canvas IN
    tl.to(
      canvasWrapRef.current,
      {
        autoAlpha: 1,
        scale: 1,
        duration: C_IN_DUR,
        ease: "power2.out",
      },
      C_IN_START,
    );
    tl.to(
      indexLblRef.current,
      { autoAlpha: 1, duration: 0.25 },
      C_IN_START + 0.1,
    );

    // Cards
    for (let i = 0; i < 3; i++) {
      addCardIn(tl, cards[i], CARD_START[i]);
      addCardOut(tl, cards[i], CARD_START[i] + IN_DUR + HOLD_DUR);
    }

    // Canvas OUT
    tl.to(
      canvasWrapRef.current,
      {
        autoAlpha: 0,
        scale: 0.92,
        duration: C_OUT_DUR,
        ease: "power2.in",
      },
      C_OUT_START,
    );
    tl.to(
      indexLblRef.current,
      { autoAlpha: 0, duration: 0.2 },
      C_OUT_START + 0.05,
    );
    tl.to(
      progFillRef.current,
      { autoAlpha: 0, duration: 0.16 },
      C_OUT_START + 0.12,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]); // ── OPT: rebuild timeline if device class changes (e.g. rotation crossing breakpoint)

  return (
    <>
      <style>{`
        @keyframes ts-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .ts-wrap { position: relative; }

        .ts-pin {
          position: relative; width: 100%; height: 100vh;
          background: #fcfcf7; overflow: hidden;
          display: flex; align-items: center;
        }

        .ts-prog-bar {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: rgba(0,0,0,0.05); z-index: 10;
        }
        .ts-prog-fill {
          position: absolute; inset: 0;
          transform-origin: left center;
          transition: background 0.8s ease;
        }

        .ts-idx {
          position: absolute; top: 26px; right: 7vw;
          font-size: 11px; letter-spacing: 0.22em;
          color: rgba(0,0,0,0.2); z-index: 10;
          font-variant-numeric: tabular-nums;
        }

        .ts-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0 5vw; align-items: center;
          width: 100%; padding: 0 7vw; box-sizing: border-box;
        }

        .ts-stack { position: relative; min-height: 500px; }
        .ts-card  {
          position: absolute; top: 0; left: 0; right: 0;
          pointer-events: none;
        }

        .ts-topbar {
          display: flex; align-items: center;
          gap: 20px; margin-bottom: 36px;
        }
        .ts-line {
          flex: 1; height: 1px; background: rgba(0,0,0,0.1);
          opacity:0;
        }
        .ts-lbl {
          font-size: 10px; letter-spacing: 0.28em;
          text-transform: uppercase; color: rgba(0,0,0,0);
          white-space: nowrap; margin: 0;
          
        }
        .ts-oq {
          font-family: Displayfont;
          font-size: clamp(36px, 5.8vw, 72px); font-weight:300;
          line-height: 1.5; color: rgba(0,0,0,0.5);
          display: block; margin-bottom: 10px; user-select: none;
        }
        .ts-q {
          font-size: clamp(14px, 1.35vw, 20px);
          font-weight: 300; line-height: 1.80;
          color: rgba(0,0,0,1); letter-spacing: 0.01em;
          margin: 0 0 34px; max-width: 54ch;
        }
        .ts-foot {
          display: flex; align-items: center;
          gap: 18px; flex-wrap: wrap;
        }
        .ts-logo { height: 60px; filter: brightness(0); }
        .ts-dot  {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(0,0,0,0.5); flex-shrink: 0;
        }
        .ts-name {
          font-size: 13px; font-weight: 500; color: #000;
          letter-spacing: 0.05em; display: block; margin: 0;
        }
        .ts-role {
          font-size: 11px; color: rgba(0,0,0,0.34);
          letter-spacing: 0.08em; display: block; margin: 4px 0 0;
        }
        .ts-mbox {
          border-left: 1px solid rgba(0,0,0,0.5);
          padding-left: 18px; margin-top: 28px;
        }
        .ts-mnum {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 3.2vw, 50px);
          font-weight: 300; color: rgba(0,0,0,0.6);
          line-height: 1; letter-spacing: -0.03em;
          display: block; margin: 0 0 5px;
        }
        .ts-mlbl {
          font-size: 15px;
          color: rgba(0,0,0,0.3);
          display: block; margin: 0;
        }

        /* ── Right column — Lottie wrapper ── */
        .ts-right {
          display: flex; flex-direction: column; align-items: flex-start;
        }

        .ts-lottie-wrap {
          width: 100%; aspect-ratio: 1 / 1;
          max-width: 420px;
          will-change: transform, opacity;
        }

        .ts-lottie-inner {
          width: 100%; height: 100%;
          position: relative;
        }
        .ts-lottie-inner > svg {
          width: 100% !important;
          height: 100% !important;
        }

        .ts-lottie-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .ts-lottie-ph-ring {
          position: absolute; top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.10);
          transform: translate(-50%, -50%);
          animation: ts-spin linear infinite;
        }
        .ts-lottie-ph-ring--1 { width: 48%; height: 48%; animation-duration: 6s;  border-color: rgba(0,0,0,0.12); }
        .ts-lottie-ph-ring--2 { width: 68%; height: 68%; animation-duration: 10s; border-style: dashed; animation-direction: reverse; }
        .ts-lottie-ph-ring--3 { width: 88%; height: 88%; animation-duration: 16s; border-color: rgba(0,0,0,0.06); }
        .ts-lottie-ph-label {
          font-size: 10px; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(0,0,0,0.25);
          position: relative; z-index: 1; user-select: none;
        }

        @media (max-width: 960px) {
          .ts-inner {
            grid-template-columns: 1fr;
            gap: 44px 0; padding-top: 88px; align-items: start;
          }
          .ts-pin   { align-items: flex-start; }
          .ts-right { flex-direction: row; z-index-2; align-items:center; justify-content: center; }
          .ts-lottie-wrap { max-width: full; z-index-2; }
          .ts-stack { min-height: 360px; }
        }
      `}</style>

      <div data-navbar="dark" ref={wrapperRef} className="ts-wrap">
        <div ref={stickyRef} className="ts-pin">
          <div className="ts-prog-bar">
            <div
              ref={progFillRef}
              className="ts-prog-fill"
            />
          </div>

          <span ref={indexLblRef} className="ts-idx">
            01 — 03
          </span>

          <div className="ts-inner">
            {/* LEFT — stacked cards */}
            <div className="ts-stack">
              {TESTIMONIALS.map((t, i) => {
                const r = cards[i];
                return (
                  <div key={i} className="ts-card">
                    <div className="ts-topbar">
                      <p
                        ref={(el) => {
                          r.eyebrow.current = el;
                        }}
                        className="ts-lbl"
                      >
                        Client Stories
                      </p>
                      <div
                        ref={(el) => {
                          r.line.current = el;
                        }}
                        className="ts-line"
                      />
                    </div>
                    <span
                      ref={(el) => {
                        r.openQuote.current = el;
                      }}
                      className="ts-oq"
                      style={{ color: "#050508", fontWeight: "400" }}
                      aria-hidden="true"
                    >
                      {t.company}
                    </span>
                    <p
                      ref={(el) => {
                        r.quote.current = el;
                      }}
                      className="ts-q"
                    >
                      {t.quote}
                    </p>
                    <div className="ts-foot">
                      <img
                        ref={(el) => {
                          r.logo.current = el;
                        }}
                        src={t.logo}
                        alt={t.company}
                        className="ts-logo"
                      />
                      <div
                        ref={(el) => {
                          r.dot.current = el;
                        }}
                        className="ts-dot"
                      />
                      <div>
                        <span
                          ref={(el) => {
                            r.author.current = el;
                          }}
                          className="ts-name"
                        >
                          {t.author}
                        </span>
                        <span
                          ref={(el) => {
                            r.role.current = el;
                          }}
                          className="ts-role"
                        >
                          {t.role} · {t.company}
                        </span>
                      </div>
                    </div>
                    <div
                      ref={(el) => {
                        r.mBox.current = el;
                      }}
                      className="ts-mbox"
                    >
                      <span
                        ref={(el) => {
                          r.mNum.current = el;
                        }}
                        className="ts-mnum"
                        style={{ color: "#050508" }}
                      >
                        {t.metric}
                      </span>
                      <span
                        ref={(el) => {
                          r.mLbl.current = el;
                        }}
                        className="ts-mlbl"
                        style={{ color: "#050508" }}
                      >
                        {t.metricLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Lottie animation */}
            <div ref={canvasWrapRef} className="ts-lottie-wrap relative">
              {/* Ripple behind */}
              <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
                <LottiePlayer animationData={LOTTIE_DATA2} isVisible={sectionVisible} />
              </div>

              {/* Sparkle front */}
              <div className="relative z-10 hidden md:block">
                <LottiePlayer animationData={LOTTIE_DATA} isVisible={sectionVisible} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}