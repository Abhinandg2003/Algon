import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// --- Client data — replace src with your real logos ---
const clients = [
  { id: 1, name: "Visat", bg: "#ff310d", text: "#fff", abbr: "St", image: "/images/clients/logos/Visat algon.webp", link: "https://visat.in/" },
  { id: 2, name: "MakeMyPass", bg: "#ffea00", text: "#fff", abbr: "No", image: "/images/clients/logos/pass algon.webp", link: "https://makemypass.com/" },
  { id: 3, name: "Desire", bg: "#aaff0d", text: "#000", abbr: "Ve", image: "/images/clients/logos/desire.webp", link: "https://desirestudyabroad.com/" },
  { id: 4, name: "Unity Heights", bg: "#0085ff", text: "#fff", abbr: "Li", image: "/images/clients/logos/UH algon.webp", link: "https://www.unityheights.org/" },
  { id: 5, name: "Corewood", bg: "#aaff0d", text: "#fff", abbr: "Fi", image: "/images/clients/logos/Corewood algon.webp", link: "https://www.corewood.in/" },
  { id: 6, name: "QOT", bg: "#ff0de7", text: "#fff", abbr: "Lo", image: "/images/clients/logos/qot algon.webp", link: "https://qotinteriors.com/" },
  { id: 7, name: "Drisya Marble", bg: "#ff310d", text: "#fff", abbr: "Fr", image: "/images/clients/logos/Drisya.webp", link: "https://drisya-marble.web.app/" },
]

// Spread positions as percentages of the container (top/left)
// Arranged so logos never overlap each other
const spreadPositions = [
  { x: "20%", y: "20%" },
  { x: "80%", y: "20%" },
  { x: "30%", y: "75%" },
  { x: "70%", y: "75%" },
  { x: "50%", y: "25%" },
  { x: "20%", y: "40%" },
  { x: "80%", y: "40%" },
  { x: "40%", y: "58%" },
]

const spreadPositionsmax = [
  { x: "15%", y: "20%" },
  { x: "85%", y: "20%" },
  { x: "33%", y: "80%" },
  { x: "66%", y: "80%" },
  { x: "50%", y: "20%" },
  { x: "10%", y: "50%" },
  { x: "90%", y: "50%" },
]



export default function OurClients() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const logosRef = useRef([])
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const floatTweens = useRef([])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  


  useEffect(() => {
    const ctx = gsap.context(() => {
      const logos = logosRef.current
      const total = logos.length

      // ── 1. Initial stacked state ──────────────────────────────────────────
      // All logos sit dead-centre, staggered slightly so they look like a stack
      gsap.set(logos, {
        position: "absolute",
        top: "35%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: (i) => 1 - i * 0.06,
        rotate: (i) => (i % 2 === 0 ? i * 3 : -i * 3),
        opacity: (i) => (i === 0 ? 1 : Math.max(0, 1 - i * 0.18)),
        zIndex: (i) => total - i,
        transformOrigin: "center center",
      })

      // heading + subtext start hidden
      gsap.set([headingRef.current, subRef.current], { autoAlpha: 0, y: 30 })

      // ── 2. Main timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=220%",          // pin length — how long the section stays
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // Phase A (scrub 0→0.15): heading fades in
      tl.to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.15 }, 0)
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.05)

      // Phase B (scrub 0.15→0.75): logos burst out to their spread positions
      logos.forEach((logo, i) => {
        const positions = isMobile ? spreadPositions : spreadPositionsmax
        const pos = positions[i]
        tl.to(logo, {
          top: pos.y,
          left: pos.x,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.4,
          ease: "expo.out",
        }, 0.50)

        tl.to(logos, {
          width: "200px",
                height: "200px",
                borderRadius: "5px",
                border: "0px solid rgba(255,255,255,0.1)",
                
                
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(5, 5, 8, 0)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                willChange: "transform, opacity",
                
                
  backdropFilter: "blur(0px)",   // or "blur(20px)" depending on effect // optional glow
  duration: 0.3,
  stagger: 0.05,
  ease: "power2.out",
}, 0.50)

      })
      

      // Phase C (scrub 0.75→1): section fades out as it scrolls away


    }, triggerRef)

    // ── 3. Floating animation (CSS keyframe alternative via GSAP) ──────────
    // Starts after a short delay so it doesn't fight the spread tween
    const floatDelay = setTimeout(() => {
      logosRef.current.forEach((logo, i) => {
        const tween = gsap.to(logo, {
          y: `+=${10 + (i % 3) * 6}`,
          // rotation: `+=${2 + (i % 4)}`,
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.25,
        })
        floatTweens.current.push(tween)
      })
    }, 400)

    return () => {
      ctx.revert()
      clearTimeout(floatDelay)
      floatTweens.current.forEach((t) => t.kill())
    }
  }, [])

  return (
    /* Outer wrapper — tall enough to give the pin room to scroll */
    <div data-navbar="light" ref={triggerRef} style={{ height: "100vh" }}>

      {/* Pinned panel */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#050508",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Subtle radial glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          // background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(99,91,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Thin grid lines for depth */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Heading */}
        <div ref={headingRef} style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          {/* <p ref={subRef} style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.35)",
            marginBottom:  "14px",
          }}>
            Trusted by teams worldwide
          </p> */}
          <h2 className="font-display" style={{

            fontSize: "clamp(2rem, 6vw, 5rem)",
            fontWeight: 200,
            lineHeight: 1,
            color: "#fff",
            margin: 0,
            letterSpacing: "-0.03em",
          }}>
            Our Clients
          </h2>
        </div>

        {/* Logo arena — logos are positioned absolutely inside here */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
        }}>
          {clients.map((client, i) => (
            <div
              key={client.id}
              ref={(el) => (logosRef.current[i] = el)}
              title={client.name}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "10px",
                border: "0px solid rgba(255,255,255,0.1)",
                
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(5, 5, 8, 100)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                // backdropFilter: "blur(10px)",
                // WebkitBackdropFilter: "blur(10px)",
                willChange: "transform, opacity",
                maskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
              }}
            >
              {/* Replace this abbr block with an <img> for real logos */}
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: client.text,
                lineHeight: 1,
              }}>
                <a href={client.link} target="_blank">
                  <img className="h-[100px] md:h-[120px] aspect:square" src={client.image} alt="" />
                </a>
              </span>
              {/* <span style={{
                
                fontSize:    "10px",
                fontWeight: "400",
                color:       client.text,
                opacity:     .8,
                marginTop:   "4px",
                
              }}>
                {client.name}
              </span> */}
            </div>
          ))}
        </div>

        {/* Bottom counter */}
        {/* <div style={{
          position:      "absolute",
          bottom:        "2.5rem",
          left:          "50%",
          transform:     "translateX(-50%)",
          zIndex:        10,
          fontFamily:    "'DM Mono', monospace",
          fontSize:      "11px",
          color:         "rgba(255,255,255,0.25)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          whiteSpace:    "nowrap",
          pointerEvents: "none",
        }}>
          {clients.length} companies &amp; counting
        </div> */}
      </section>
    </div>
  )
}