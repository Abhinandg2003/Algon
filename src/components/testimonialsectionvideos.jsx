import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { IoPauseOutline } from "react-icons/io5";
import { LuPlay } from "react-icons/lu";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DATASET
 * Swap these entries with real data. Each object drives one video card.
 *  - video      : mp4 url (vertical / 9:16 works best)
 *  - thumbnail  : poster image shown before hover (first-frame still)
 *  - logo       : brand wordmark shown top-center of the card
 *  - statValue  : big number
 *  - statLabel  : small label under the number
 *  - quote      : testimonial line
 *  - name       : person's name
 *  - role       : person's title / company
 *  - link       : where the diagonal arrow sends the user
 * ─────────────────────────────────────────────────────────────────────────
 */
const TESTIMONIALS = [
  {
    id: "t1",
    video:
      "/videos/visat algon testi 12.mp4",
    thumbnail:
      "/images/visat thumb.jpg",
    logo: "/images/clients/logos/Visat algon.png",
    statValue: "360°",
    statLabel: "Campus view",
    quote:
      "Algon Solutions delivered a stunning, highly impressive product perfectly on schedule, exceeding all our expectations at VISAT Group of Institutions.",
    name: "Raju Kurian",
    role: "Chairman, Visat Group of Institutions",
    link: "https://visat.in",
  },
  {
    id: "t2",
    video:
      "/videos/Desire.mp4",
    thumbnail:
      "images/desire thumb.jpg",
    logo: "/images/clients/logos/desire.png",
    statValue: "100%",
    statLabel: "Brand presence",
    quote:
      "Algon built us a strong website with brand presence, AI chatbot support, contact flows, and everything we needed to connect better with students.",
    name: "Swapna",
    role: "Co-Founder, Desire Study Abroad",
    link: "https://desirestudyabroad.com",
  },
  {
    id: "t3",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    logo: "PILLAR",
    statValue: "$1.4M",
    statLabel: "Revenue recovered",
    quote:
      "It paid for itself in the first month. I was skeptical going in, I'm not anymore.",
    name: "Priya Nair",
    role: "COO, Pillar",
    link: "https://example.com",
  },
  {
    id: "t4",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
    logo: "KESTREL",
    statValue: "12 days",
    statLabel: "To full rollout",
    quote:
      "Every team we onboarded picked it up in an afternoon. That almost never happens with tools like this.",
    name: "Owen Bright",
    role: "VP Engineering, Kestrel",
    link: "https://example.com",
  },
  {
    id: "t5",
    video:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    logo: "LUMEN",
    statValue: "9.7/10",
    statLabel: "Client satisfaction",
    quote:
      "Our clients noticed the difference before we even told them what changed on the backend.",
    name: "Sana Farouk",
    role: "Creative Director, Lumen",
    link: "https://example.com",
  },
];

// ── OPT: shared near-viewport hook — a card's video/thumbnail only starts
// fetching once it's within `margin` of the viewport, instead of all 5
// cards firing network requests the moment the carousel mounts. Disconnects
// after the first hit since a card that's been visible once only needs to
// mount its media once (matches the existing card behavior — nothing
// unmounts on scroll-out).
function useNearViewport(margin = "300px") {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, near];
}

const VideoCard = memo(function VideoCard({ item, cardWidth }) {
  const [wrapRef, nearViewport] = useNearViewport("300px");
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [manualPause, setManualPause] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    if (!manualPause) {
      setPlaying(true);
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovered(false);
    setPlaying(false);
    setManualPause(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
      setManualPause(true);
    } else {
      videoRef.current?.play().catch(() => {});
      setPlaying(true);
      setManualPause(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative shrink-0 group overflow-hidden h-[55vh] md:h-[100vh] rounded-[10px] bg-black snap-start"
      style={{ width: cardWidth }}
    >
      {/* thumbnail (first frame) — native lazy-loading, decoded off the main thread */}
      <img
        src={item.thumbnail}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-500 ease-out"
        style={{
          opacity: playing ? 0 : 1,
          filter: hovered ? "contrast(1)" : "contrast(0.85)",
        }}
      />

      {/* video — OPT: element itself isn't mounted until the card nears the
          viewport, so offscreen cards never fetch video metadata at all
          (stronger than preload="none", which still mounts the element) */}
      {nearViewport && (
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-500 ease-out"
          style={{
            opacity: playing ? 1 : 0,
            filter: hovered ? "contrast(1)" : "contrast(0.85)",
          }}
        />
      )}

      {/* gradient overlay: black from bottom, 0.4 -> 0.2 (30%) -> 0.1 (top) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 20%,rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* blur overlay: strong at bottom, fades to 0 blur by 40% from bottom */}
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-lg"
        style={{
          maskImage:
            "linear-gradient(to top, black 0%, black 20%, transparent 50%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 20%, transparent 50%)",
        }}
      />

      {/* brand logo, top middle, tiny top margin */}
      <div className="absolute inset-x-0 top-0 mt-3 flex justify-center">
        <div className="text-xs font-bold h-[65px] md:h-[80px] uppercase tracking-[0.25em] text-white/90">
          <img
            className="h-full mt-[10px]"
            src={item.logo}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* play / pause button */}
      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-[12px] top-[12px] group-hover:flex flex md:hidden group-hover:opacity-100 h-8 w-8 items-center justify-center rounded-[4px] bg-white text-black shadow-lg transition-transform duration-200 hover:bg-[#ddd]"
      >
        {playing ? (
          <IoPauseOutline className="h-4 w-4" />
        ) : (
          <LuPlay className="h-4 w-4 translate-x-[1px]" />
        )}
      </button>

      {/* diagonal "visit site" arrow */}
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${item.name}'s site`}
        className="absolute bottom-6 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors duration-300"
        style={{
          backgroundColor: hovered ? "#4a6fff" : "rgba(255,255,255,0.3)",
          color: hovered ? "#ffffff" : "#000000",
        }}
      >
        <ArrowUpRight className="h-4 w-4" />
      </a>

      {/* bottom content: stat, quote, name/role */}
      <div className="absolute inset-x-0 bottom-0 z-[5] md:pb-6 pb-2 pl-6 ">
        <div className="mb-4 flex-col items-baseline gap-4">
          <h1 className="text-[40px] robotofont font-bold font- leading-none tracking-tight mb-2 text-white">
            {item.statValue}
          </h1>
          <h3 className="text-xl robotofont font-medium mt-2 tracking-normal  text-white">
            {item.statLabel}
          </h3>
        </div>
        <p className="mb-4 max-w-[85%] hidden md:block text-xl robotofont leading- text-white">
          &ldquo;{item.quote}&rdquo;
        </p>
        <div>
          <div className="text-xl robotofont hidden md:block font-medium tracking-normal  text-white">
            {item.name}
          </div>
          <div className="text-md robotofont hidden md:block font-normal tracking-normal  text-white">
            {item.role}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function TestimonialCarousel() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const cardWidth = "min(78vh, 80vw)"; // wider than a strict 9:16 card

  // ── OPT: cheap, non-reflowing scroll-boundary check. The old version
  // called getBoundingClientRect() on the first/last card on every scroll
  // event, which forces a synchronous layout read — expensive, and it can
  // fire dozens of times during a single smooth-scroll gesture. This reads
  // scrollLeft/scrollWidth/clientWidth instead, which are cached layout
  // values the browser already tracks, so the check is effectively free.
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);
  }, []);

  // ── OPT: rAF-gate the scroll listener. `scroll` fires far faster than
  // the browser repaints (especially during momentum/smooth scrolling),
  // so without this the state check above could run many times per frame.
  // Coalescing to one check per animation frame is a no-op for anything
  // the user perceives, but removes redundant work.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateScrollState();
        rafId = null;
      });
    };

    updateScrollState();

    el.addEventListener("scroll", onScroll, { passive: true });

    // ── OPT: a single ResizeObserver on the container covers both window
    // resizes (the container's width changes with the viewport) and any
    // other layout-driven width change (e.g. sidebar toggle), so the
    // separate `window.addEventListener("resize", ...)` from before is
    // redundant and has been dropped.
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild;

    const amount = firstCard
      ? firstCard.getBoundingClientRect().width + 24
      : 400;

    el.scrollBy({
      left: dir * amount,
      behavior: "smooth",
    });
  };

  // ── OPT: removed the mount-time `window.dispatchEvent(new Event("resize"))`.
  // That synthetic event doesn't just refresh this component — it fires
  // every resize listener on the page (including other sections' GSAP
  // ScrollTrigger refreshes), triggering an unrelated layout cascade just
  // to initialize this carousel's arrow-button state. `updateScrollState()`
  // already runs directly in the effect above on mount, which achieves the
  // same result without the page-wide side effect.

  return (
    <section style={{ backgroundColor: "#050508" }} className="w-full pb-[100px] pt-10">
      {/* heading row */}
      <div className="mb-10 flex-col md:flex md:flex-row items-end justify-between pl-6 pr-6 md:pl-[80px] md:pr-[80px]">
        <div>
          <h2 className="text-4xl text-start mb-7 md:mb-0 font-semibold text-white md:text-[70px] leading-[.9] tracking-tight">
            What several brands <br /> has to say about Algon
          </h2>
        </div>

        <div className="relative flex items-start">
          <div className="  flex items-start   gap-3">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300
    ${
      canScrollLeft
        ? "bg-white text-black hover:scale-105"
        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
    }`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300
  ${
    canScrollRight
      ? "bg-white text-black hover:scale-105"
      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
  }`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto [scroll-padding-inline:5rem] pb-2 pl-6 pr-6 md:pl-[70px] md:pr-[70px] snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((item) => (
          <VideoCard key={item.id} item={item} cardWidth={cardWidth} />
        ))}
      </div>
    </section>
  );
}
