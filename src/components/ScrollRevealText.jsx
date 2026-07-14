import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT = "We deliver future-ready solutions today, ensuring top-quality, reliability, and long-term value—so your business can grow now and stay ahead tomorrow."

// Breakpoint above which the scroll-reveal effect is enabled.
const DESKTOP_QUERY = '(min-width: 1024px)'

export default function ScrollRevealText() {
  const outerRef   = useRef(null)  // tall scroll container — controls pin duration
  const stickyRef  = useRef(null)  // the element that gets pinned
  const lettersRef = useRef([])

  const words = TEXT.split(' ')

  useEffect(() => {
    // gsap.matchMedia handles creating/destroying the animation as the
    // viewport crosses the breakpoint, and cleans everything up on unmount.
    const mm = gsap.matchMedia()

    mm.add(DESKTOP_QUERY, () => {
      const letters = lettersRef.current.filter(Boolean)

      gsap.fromTo(
        letters,
        { color: 'rgba(255,255,255,0.12)' },
        {
          color: 'rgba(255,255,255,1)',
          stagger: {
            each: 0.012,
            from: 'start',
          },
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            pin: stickyRef.current,
            pinSpacing: false,
          },
        }
      )

      // returning a cleanup fn here is optional, matchMedia reverts
      // the context automatically when the query no longer matches
    })

    return () => mm.revert()
  }, [])

  let letterIndex = 0

  return (
    <div ref={outerRef} className="relative bg-[#050508] h-auto lg:h-[400vh]">
      <section data-navbar="light">
        <div
          ref={stickyRef}
          className="flex items-center justify-center w-full min-h-screen lg:h-screen py-20 lg:py-0"
        >
          <p className="text-center max-w-7xl px-[8vw] text-[clamp(24px,3.8vw,40px)] font-thin robotofont leading-[1.25] tracking-tight">
            {/* Mobile / tablet: plain static text, no per-letter spans */}
            <span className="lg:hidden font-medium text-white/90">{TEXT}</span>

            {/* Desktop: per-letter spans for the scroll-reveal animation */}
            <span className="hidden lg:inline">
              {words.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.28em]">
                  {word.split('').map((char) => {
                    const idx = letterIndex++
                    return (
                      <span
                        key={idx}
                        ref={el => (lettersRef.current[idx] = el)}
                        className="inline-block"
                        style={{ color: 'rgba(255,255,255,0.12)' }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              ))}
            </span>
          </p>
        </div>
      </section>
    </div>
  )
}