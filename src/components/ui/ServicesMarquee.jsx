import { useEffect, useRef } from "react";

const SERVICES_ROW_1 = [
  "Custom Software", "Web Development", "SaaS Solutions",
  "AI Automation", "Hospital Management Systems", "eCommerce",
];
const SERVICES_ROW_2 = [
  "Shopify Solutions", "Marketing", "Growth Strategies",
  "Cyber Security", "Cloud Solutions", "Blockchain & Web3", "MVP in Production",
];

const ROW1 = [...SERVICES_ROW_1, ...SERVICES_ROW_1];
const ROW2 = [...SERVICES_ROW_2, ...SERVICES_ROW_2];

export default function ServicesMarquee() {
  const row1InnerRef = useRef(null);
  const row2InnerRef = useRef(null);
  const row1TrackRef = useRef(null);
  const row2TrackRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const inner1 = row1InnerRef.current;
    const inner2 = row2InnerRef.current;
    const track1 = row1TrackRef.current;
    const track2 = row2TrackRef.current;
    if (!inner1 || !inner2) return;

    // Measure strip width once — half the total since we duplicated once
    const w1 = inner1.scrollWidth / 2;
    const w2 = inner2.scrollWidth / 2;

    // Position state
    let x1 = 0;       // row1 starts at 0, scrolls left (negative)
    let x2 = -w2;     // row2 starts offset, scrolls right (positive)

    // Velocity state
    let lastScrollY = window.scrollY;
    let rawVel = 0;
    let smoothVel = 0;
    let skew1 = 0;
    let skew2 = 0;
    let scaleY1 = 1;
    let scaleY2 = 1;
    let lastTime = performance.now();

    // Base speeds in px/frame (at 60fps)
    const BASE1 = -1.2;  // row1: left
    const BASE2 = 1.2;   // row2: right

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 16.667, 3); // normalise to 60fps frames
      lastTime = now;

      // Scroll velocity
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      rawVel = scrollDelta * 60; // convert to px/sec equivalent

      // Smooth velocity: fast attack, slow decay
      const lf = Math.abs(rawVel) > Math.abs(smoothVel) ? 0.35 : 0.06;
      smoothVel += (rawVel - smoothVel) * lf;

      // Normalised -1..1 for effects
      const velNorm = Math.max(-1, Math.min(1, smoothVel / 1800));

      // Skew: row1 goes left → skew right on scroll down; row2 goes right → skew left
      const targetSkew1 = velNorm * 18;   // positive = leans right
      const targetSkew2 = velNorm * -18;  // negative = leans left

      skew1 += (targetSkew1 - skew1) * 0.07;
      skew2 += (targetSkew2 - skew2) * 0.07;

      const targetScaleY = 1 - Math.abs(velNorm) * 0.12;
      scaleY1 += (targetScaleY - scaleY1) * 0.07;
      scaleY2 += (targetScaleY - scaleY2) * 0.07;

      // Speed boost in same direction as base
      const boost = smoothVel * 0.02;
      const speed1 = (BASE1 - boost) * dt;  // row1: base is negative (left), boost also subtracts = faster left
const speed2 = (BASE2 + boost) * dt;  // row2 goes right; scroll down = less positive but boost flips it

      x1 += speed1;
      x2 += speed2;

      // Seamless loop
      if (x1 <= -w1) x1 += w1;
      if (x1 > 0)    x1 -= w1;
      if (x2 >= 0)   x2 -= w2;
      if (x2 < -w2)  x2 += w2;

      // Apply: translateX on inner (position), skew+scaleY on track (deform)
      inner1.style.transform = `translateX(${x1.toFixed(2)}px)`;
      inner2.style.transform = `translateX(${x2.toFixed(2)}px)`;
      track1.style.transform = `skewX(${skew1.toFixed(3)}deg) scaleY(${scaleY1.toFixed(4)})`;
      track2.style.transform = `skewX(${skew2.toFixed(3)}deg) scaleY(${scaleY2.toFixed(4)})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        .mq-track {
          will-change: transform;
          transform-origin: center center;
        }
        .mq-inner {
          display: flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform;
        }
      `}</style>

      <section
        data-navbar="light"
        style={{ backgroundColor: "#050508" }}
        className="relative w-full overflow-hidden py-12 select-none"
      >
        <div className="mb-5 overflow-hidden">
          <div ref={row1TrackRef} className="mq-track">
            <div ref={row1InnerRef} className="mq-inner">
              {ROW1.map((s, i) => (
                <MarqueeItem key={`r1-${i}`} label={s} variant="outline" />
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={row2TrackRef} className="mq-track">
            <div ref={row2InnerRef} className="mq-inner">
              {ROW2.map((s, i) => (
                <MarqueeItem key={`r2-${i}`} label={s} variant="solid" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MarqueeItem({ label, variant }) {
  const isOutline = variant === "outline";
  return (
    <span
      className="marquee-item inline-flex items-center px-6 py-3 mx-2 shrink-0"
      style={{
        fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
        fontSize: "clamp(1.6rem, 5vw, 3.8rem)",
        letterSpacing: "0.08em",
        color: isOutline ? "transparent" : "#fcfcf7",
        WebkitTextStroke: isOutline ? "1px #fcfcf7" : "none",
        lineHeight: 1,
      }}
    >
      {label}
      <span style={{
        display: "inline-block", width: 5, height: 5,
        marginLeft: 30, borderRadius: "50%",
        backgroundColor: "#fcfcf7", opacity: 0.7, flexShrink: 0,
      }} />
    </span>
  );
}