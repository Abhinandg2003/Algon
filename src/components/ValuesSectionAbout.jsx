import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Handshake,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    id: "integrity",
    title: "Integrity",
    subtitle: "We do the right thing, even when no one's watching.",
    icon: ShieldCheck,
    iconimg: "/icons/integrity.png",
    image: "/images/integrity.jpg",
  },
  {
    id: "trust",
    title: "Trust",
    subtitle: "Built through consistency, not promises.",
    icon: Handshake,
    iconimg: "/icons/trust.png",
    image: "/images/trust2.jpg",
  },
  {
    id: "innovation",
    title: "Innovation",
    subtitle: "Innovate to create the best product.",
    icon: Sparkles,
    iconimg: "/icons/innovation.png",
    image: "/images/innovation.jpg",
  },
  {
    id: "commitment",
    title: "Commitment",
    subtitle: "You always gets our 100%.",
    icon: Target,
    iconimg: "/icons/commitment.png",
    image: "/images/commitment.jpg",
  },
  {
    id: "community",
    title: "Community",
    subtitle: "We rise together, not alone.",
    icon: Users,
    iconimg: "/icons/community.png",
    image: "/images/community.jpg",
  },
];

const OPEN_DURATION = 400; // ms — must match the CSS transition below

function ValueCard({ val, isActive, onEnter }) {
  const Icon = val.icon;
  const [showContent, setShowContent] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      // wait for the card to finish widening before revealing title/subtitle
      const t = setTimeout(() => setShowContent(true), OPEN_DURATION);
      return () => clearTimeout(t);
    } else {
      setShowContent(false);
    }
  }, [isActive]);

  return (
    <div
      onMouseEnter={onEnter}
      className="relative h-[50vh] rounded-[20px] overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        flexGrow: isActive ? 4 : 1,
        flexBasis: 0,
        transition: `flex-grow ${OPEN_DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
    >
      {/* Background image — static, no animation */}
      <img
        src={val.image}
        alt={val.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay — fades in only once fully open */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.05) 100%)"
            : "rgba(0,0,0,0.6)",
          opacity: !isActive || showContent ? 1 : 0,
        }}
      />

      {/* Closed state — centered icon + small title */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-2 transition-opacity duration-300"
        style={{
          opacity: isActive ? 0 : 1,
          pointerEvents: isActive ? "none" : "auto",
        }}
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center ">
          {/* <Icon size={20} className="text-white" /> */}
          <img src={val.iconimg} className="invert" alt={val.title} />
        </div>
        <span
          className="text-white text-[15px] tracking-wide text-center leading-tight"
        >
          {val.title}
        </span>
      </div>

      {/* Open state — bottom-left title + subtitle, revealed after fully open */}
      <div
        className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 transition-opacity duration-500"
        style={{
          opacity: showContent ? 1 : 0,
          pointerEvents: showContent ? "auto" : "none",
        }}
      >
        <h3 className="text-white font-bold text-2xl leading-tight tracking-wide whitespace-nowrap">
          {val.title}
        </h3>
        <p
          className="text-white text-md leading-snug max-w-[90%]"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {val.subtitle}
        </p>
      </div>
    </div>
  );
}

function MobileValueRow({ val }) {
  const Icon = val.icon;
  return (
    <div className="relative h-20 rounded-[16px] overflow-hidden">
      <img
        src={val.image}
        alt={val.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-[1] h-full flex items-center gap-3 px-5">
        <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25 flex-shrink-0">
          <Icon size={17} className="text-white" />
        </div>
        <span
          className="text-white/90 text-sm font-medium uppercase tracking-wide"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {val.title}
        </span>
      </div>
    </div>
  );
}

export default function ValuesSection() {
  const ref = useRef();
  const headRef = useRef();
  const rowRef = useRef();
  const [active, setActive] = useState(0);

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

      gsap.set(rowRef.current, { autoAlpha: 0, y: 48 });
      gsap.to(rowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ab-values-section " data-navbar="dark">
      <div className="ab-values-inner">
        <div ref={headRef} className="ab-section-head">
          <h2 className="ab-section-title2">
            Five values. <br /> One standard.
          </h2>
        </div>

        {/* Desktop / tablet — hover-driven row */}
        <div
          ref={rowRef}
          className="hidden md:flex flex-row gap-4"
          
        >
          {VALUES.map((val, i) => (
            <ValueCard
              key={val.id}
              val={val}
              isActive={active === i}
              onEnter={() => setActive(i)}
            />
          ))}
        </div>

        {/* Mobile — plain stacked rows, no hover/open logic */}
        <div className="flex md:hidden flex-col gap-3 px-5">
          {VALUES.map((val) => (
            <MobileValueRow key={val.id} val={val} />
          ))}
        </div>
      </div>
    </section>
  );
}