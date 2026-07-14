import { useRef, useState, useEffect } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const clientData = [
  {
    id: 1,
    name: "Corewood",
    tagline: "Innovating Modern Interior & Architectural Boards",
    gradient: "linear-gradient(135deg, #a3400f 0%, #ab5815 40%, #bf761d 100%)",
    logoColor: "#ff2f7a",
    logoText: "LS",
    accent: "#803511",
    figure: "🏛️",
    logo: "/images/clients/logos/Corewood algon.webp",
    url: "https://www.corewood.in/",
    pic: "/images/clients/cutouts/corewood2.webp"
  },
  {
    id: 2,
    name: "Desire Study Abroad",
    tagline: "Your Desire To Dream Big",
    gradient: "linear-gradient(135deg, #4a1347 0%, #5e1853 50%, #802259 100%)",
    logoColor: "#00c853",
    logoText: "VL",
    accent: "#2c012a",
    figure: "🌿",
    logo: "/images/clients/logos/desire.webp",
    url: "https://desirestudyabroad.com/",
    pic: "/images/clients/cutouts/desire.webp"
  },
  {
    id: 3,
    name: "Drisya Marble",
    tagline: "Kerala's Premier Destination for Tiles & Sanitary Elegance",
    gradient: "linear-gradient(135deg, #9c1010 0%, #bd4f31 50%, #d47046 100%)",
    logoColor: "#2979ff",
    logoText: "AC",
    accent: "#710303",
    figure: "🚀",
    logo: "/images/clients/logos/Drisya.webp",
    url: "https://drisyamarble.com/",
    pic: "/images/clients/cutouts/drisya.webp"
  },
  {
    id: 4,
    name: "MapMyBusiness",
    tagline: "Crafting ideas into impactful brands.",
    gradient: "linear-gradient(135deg, #41a63c 0%, #66c449 50%, #bbde62 100%)",
    logoColor: "#ff9100",
    logoText: "SB",
    accent: "#187f13",
    figure: "✦",
    logo: "/images/clients/logos/mark white.webp",
    url: "https://www.mapmybusiness.online/",
    pic: "/images/clients/cutouts/mark.webp"
  },
  {
    id: 5,
    name: "Qot",
    tagline: "Transforming Spaces, Elevating Lifestyles",
    gradient: "linear-gradient(135deg, #36211f 0%, #542525 50%, #783636 100%)",
    logoColor: "#7c4dff",
    logoText: "PW",
    accent: "#1a1a1a",
    figure: "◈",
    logo: "/images/clients/logos/qot algon.webp",
    url: "https://qotinteriors.com/",
    pic: "/images/clients/cutouts/qot2.webp"
  },
  {
    id: 6,
    name: "Unity Heights",
    tagline: "Where Vision Meets Construction",
    gradient: "linear-gradient(135deg, #65b0c7 0%, #87bed3 50%, #a8d4e5 100%)",
    logoColor: "#00acc1",
    logoText: "ZA",
    accent: "#007482",
    figure: "⬡",
    logo: "/images/clients/logos/UH algon.webp",
    url: "https://www.unityheights.org/",
    pic: "/images/clients/cutouts/unity.webp"
  },
  {
    id: 7,
    name: "VISAT",
    tagline: "Redefining Education with Innovation, Inclusion, and Leadership",
    gradient: "linear-gradient(135deg, #8c267d 0%, #ba2b83 50%, #d46363 100%)",
    logoColor: "#ff3d00",
    logoText: "CH",
    accent: "#5a004c",
    figure: "◉",
    logo: "/images/clients/logos/Visat algon.webp",
    url: "https://visat.in/",
    pic: "/images/clients/cutouts/visat.webp"
  },
];

const logoMarquee = [
  { name: "Corewood",     text: "LS", color: "#e91e63", pic: "/images/clients/logos/Corewood algon black.webp" },
  { name: "Desire",       text: "VL", color: "#43a047", pic: "/images/clients/logos/desire black.webp" },
  { name: "Drisya Marble",text: "AC", color: "#1e88e5", pic: "/images/clients/logos/Drisya blak.webp" },
  { name: "MapMyBusiness",   text: "MB", color: "#f9a825", pic: "/images/clients/logos/mark black.webp" },
  { name: "QOT",          text: "PW", color: "#7b1fa2", pic: "/images/clients/logos/qot algon black.webp" },
  { name: "Unity Heights",text: "ZA", color: "#00838f", pic: "/images/clients/logos/UH algon black.webp" },
  { name: "Visat",        text: "CH", color: "#e64a19", pic: "/images/clients/logos/Visat algon black.webp" },
];

/* ─── Responsive hook ───────────────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ─── Responsive sizes ──────────────────────────────────────────────────── */
function useCardSizes(windowWidth) {
  if (windowWidth < 480) {
    return {
      CARD_WIDTH:    250,
      CARD_HEIGHT:   300,
      CARD_SIZE:     200,
      CARD_GAP:      14,
      LOGO_W:        120,
      LOGO_IMG_SIZE: 60,
      TAGLINE_SIZE:  20,
      LOGO_IMG_W:    80,
      CUTOUT_H:      170,
      CUTOUT_W:      170,
      CUTOUT_RIGHT:  -14,
    };
  }
  if (windowWidth < 768) {
    return {
      CARD_WIDTH:    300,
      CARD_HEIGHT:   360,
      CARD_SIZE:     260,
      CARD_GAP:      18,
      LOGO_W:        160,
      LOGO_IMG_SIZE: 80,
      TAGLINE_SIZE:  25,
      LOGO_IMG_W:    95,
      CUTOUT_H:      200,
      CUTOUT_W:      200,
      CUTOUT_RIGHT:  -18,
    };
  }
  return {
    CARD_WIDTH:    330,
    CARD_HEIGHT:   380,
    CARD_SIZE:     350,
    CARD_GAP:      30,
    LOGO_W:        200,
    LOGO_IMG_SIZE: 70,
    TAGLINE_SIZE:  25,
    LOGO_IMG_W:    125,
    CUTOUT_H:      250,
    CUTOUT_W:      250,
    CUTOUT_RIGHT:  -24,
  };
}

/* ─── Constants (non-size) ──────────────────────────────────────────────── */
const TILT_DEG   = -4;
const CARD_SPEED = 0.07;
const LOGO_SPEED = 0.2;

/* ─── useMarquee ─────────────────────────────────────────────────────────── */
function useMarquee(trackRef, totalPx, speed) {
  const offset          = useRef(0);
  const lastTs          = useRef(0);
  const dragging        = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartOffset = useRef(0);

  useEffect(() => {
    let raf;

    const loop = (ts) => {
      if (!lastTs.current) lastTs.current = ts;

      // Fix 3: tighter delta cap (≈30 fps) prevents post-touch jump
      const delta = Math.min(ts - lastTs.current, 32);

      if (!dragging.current) {
        // Fix 2: continuous double-modulo — no visible snap on wrap
        offset.current =
          ((offset.current + speed * delta) % totalPx + totalPx) % totalPx;
      }

      lastTs.current = ts;

      if (trackRef.current) {
        trackRef.current.style.transform =
          `translate3d(-${offset.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [totalPx, speed]);

  const onMouseDown = (e) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset.current;
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStartX.current;
    offset.current =
      ((dragStartOffset.current - dx) % totalPx + totalPx) % totalPx;
  };

  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e) => {
    dragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartOffset.current = offset.current;
  };

  const onTouchMove = (e) => {
    if (!dragging.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    // Fix 5: rely on touch-action: pan-y instead of e.preventDefault()
    offset.current =
      ((dragStartOffset.current - dx) % totalPx + totalPx) % totalPx;
  };

  const onTouchEnd = () => { dragging.current = false; };

  return { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd };
}

/* ─── LogoMark ──────────────────────────────────────────────────────────── */
function LogoMark({ text, color, size = 200 }) {
  return (
    <div style={{
      width: size, height: size,
      background: color + "1e",
      border: `1.5px solid ${color}40`,
      borderRadius: 9,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.31,
      color, letterSpacing: "0.05em", flexShrink: 0,
    }}>
      {text}
    </div>
  );
}

/* ─── ClientCard ────────────────────────────────────────────────────────── */
function ClientCard({ client, sizes }) {
  const [hovered, setHovered] = useState(false);
  const { CARD_WIDTH, CARD_HEIGHT, TAGLINE_SIZE, LOGO_IMG_W, CUTOUT_H, CUTOUT_W, CUTOUT_RIGHT } = sizes;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_WIDTH, height: CARD_HEIGHT,
        flexShrink: 0, borderRadius: 20,
        background: client.gradient,
        position: "relative", overflow: "hidden",
        transform: "scale(1) translateY(0px)",
        transition: "transform 0.35s cubic-bezier(0.34,1.46,0.64,1), box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Dot grid */}
      <div style={{ position: "absolute", top: 66, right: 108, opacity: 0.14 }}>
        {[0, 3, 6].map(r => [0, 3, 6].map(c => (
          <div key={`${r}${c}`} style={{
            position: "absolute", width: 8, height: 8, borderRadius: "50%",
            background: client.accent, top: r * 14, left: c * 14,
          }} />
        )))}
      </div>

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, padding: "22px 22px 18px",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ flex: 1 }}>
          <div className="mt-5 ml-2" style={{
            fontSize: TAGLINE_SIZE, color: "#fff", lineHeight: 1.6,
            maxWidth: 400, fontWeight: 400,
          }}>
            {client.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <a draggable={false} target="_blank" href={client.url} rel="noreferrer">
              <img draggable={false}  style={{ width: LOGO_IMG_W, height: "auto" }} src={client.logo} alt={client.name} />
            </a>
          </div>

          <div className="absolute bottom-0" style={{
            right: CUTOUT_RIGHT,
            lineHeight: 1,
            transform: hovered ? "scale(1.05) translateY(-6px)" : "scale(1) translateY(0px)",
            transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
            userSelect: "none",
          }}>
            <img draggable={false} style={{ height: CUTOUT_H, width: CUTOUT_W }} src={client.pic} alt={client.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LogoStrip ─────────────────────────────────────────────────────────── */
function LogoStrip({ sizes }) {
  const trackRef = useRef(null);
  const { LOGO_W, LOGO_IMG_SIZE } = sizes;

  // Fix 6: only 2× duplication — enough to fill screen, minimal layout cost
  const logos  = [...logoMarquee, ...logoMarquee];
  // Fix 1: totalW = ONE set width — loop resets at exactly the right point
  const totalW = logoMarquee.length * LOGO_W;
  const handlers = useMarquee(trackRef, totalW, LOGO_SPEED);

  return (
    <div
      style={{
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        paddingBlock: 4,
        touchAction: "pan-y", // Fix 4: allow vertical scroll, lock horizontal to our logic
      }}
      {...handlers}
      onMouseLeave={handlers.onMouseUp}
    >
      <div ref={trackRef} style={{ display: "flex", willChange: "transform" }}>
        {logos.map((logo, i) => (
          <div key={i} style={{
            width: LOGO_W, flexShrink: 0,
            display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
          }}>
            <div style={{
              width: LOGO_IMG_SIZE, height: LOGO_IMG_SIZE, borderRadius: 7, opacity: 0.3,
            }}>
              <img src={logo.pic} alt={logo.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CardCarousel ──────────────────────────────────────────────────────── */
function CardCarousel({ sizes }) {
  const trackRef = useRef(null);
  const { CARD_SIZE, CARD_GAP } = sizes;
  const CARD_STEP = CARD_SIZE + CARD_GAP;

  // Fix 6: only 2× duplication
  const cards  = [...clientData, ...clientData];
  // Fix 1: totalW = ONE set width
  const totalW = clientData.length * CARD_STEP;
  const handlers = useMarquee(trackRef, totalW, CARD_SPEED);

  return (
    <div
      style={{
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        touchAction: "pan-y", // Fix 4
      }}
      {...handlers}
      onMouseLeave={handlers.onMouseUp}
    >
      <div ref={trackRef} style={{
        display: "flex", gap: CARD_GAP,
        paddingBlock: 20, willChange: "transform",
      }}>
        {cards.map((c, i) => (
          <ClientCard key={`${c.id}-${i}`} client={c} sizes={sizes} />
        ))}
      </div>
    </div>
  );
}

/* ─── SlantedLane ────────────────────────────────────────────────────────── */
function SlantedLane({ sizes }) {
  return (
    <div style={{ overflow: "hidden", paddingBlock: 80, marginBlock: -40 }}>
      <div style={{
        transform: `rotate(${TILT_DEG}deg)`,
        width: "125%",
        marginLeft: "-12.5%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>
        {/* <LogoStrip sizes={sizes} /> */}
        <CardCarousel sizes={sizes} />
      </div>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function Clients() {
  const windowWidth = useWindowWidth();
  const sizes = useCardSizes(windowWidth);

  return (
    <>
      <section data-navbar="dark" style={{
        background: "#fcfcf7",
        minHeight: "100vh",
        paddingTop: 150,
        paddingBottom: 100,
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Ambient color blobs */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 40% at 10% 8%, #fce4ec1e, transparent)," +
            "radial-gradient(ellipse 50% 35% at 88% 88%, #e3f2fd1e, transparent)," +
            "radial-gradient(ellipse 40% 30% at 55% 45%, #ede7f610, transparent)",
        }} />

        {/* Header */}
        <div className="flex justify-center" style={{ marginBottom: 48, position: "relative" }}>
          <h2 style={{
            fontWeight: 400,
            marginBottom: "40px",
            fontSize: "clamp(46px, 6vw, 76px)",
            color: "#0f0f0f",
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
          }}>
            Our Clients
            
          </h2>
        </div>

        {/* Slanted lane */}
        <SlantedLane sizes={sizes} />

        <div style={{
          paddingLeft: 64, marginTop: 8, position: "relative",
          display: "flex", alignItems: "center", gap: 8,
        }} />

      </section>
    </>
  );
}