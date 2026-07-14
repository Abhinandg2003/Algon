import React, {
  useRef, useEffect, Suspense, useState,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, useAnimations } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
gsap.registerPlugin(ScrollTrigger)

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

/* ─────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────── */
const STYLES = `
  .usp-section { position: relative; background: #050508; }
  .usp-sticky  { height: 100vh; width: 100%; display: flex; align-items: center; overflow: hidden; }
  .usp-grid {
    display: grid;
    grid-template-columns: 50% 100%;
    grid-template-areas: "text model";
    width: 100%; height: 100%; align-items: center;
  }
  .usp-left {
    grid-area: text; padding: 0 5vw 0 7vw;
    width: 100vw;
    display: flex; flex-direction: column; justify-content: center;
    gap: 0;
    will-change: opacity, transform;
    z-index: 3; position: relative;
  }
  .usp-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      rgba(5,5,8,1) 0%,
      rgba(5,5,8,0.8) 40%,
      rgba(5,5,8,0.6) 70%,
      rgba(5,5,8,0.4) 100%
    );
    z-index: 2; pointer-events: none;
  }
  .usp-right {
    grid-area: model; position: relative;
    height: 100vh; width: 100%; z-index: 1;
  }
  .usp-eyebrow {
    font-size: clamp(10px,1vw,12px); font-weight: 300;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.28); margin-bottom: clamp(14px,2vh,22px);
  }
  .usp-headline {
    font-size: clamp(36px,3.8vw,64px); line-height: 1.05; font-weight: 400;
    margin: 0 0 clamp(14px,2vh,24px) 0; letter-spacing: 0.02em;
  }
  .usp-char-h, .usp-char-s, .usp-char-l { display: inline-block; }
  .usp-space  { display: inline-block; width: 0.26em; }
  .usp-list   { display: flex; flex-direction: column; gap: 0; }
  .usp-item   { padding: clamp(12px,1.6vh,20px) 0; }
  .usp-divider {
    width: 100%; height: 1px; background: rgba(255,255,255,0);
    margin-bottom: clamp(10px,1.4vh,16px);
    will-change: transform;
  }
  .usp-label {
    font-size: clamp(20px,2.0vw,33px); font-weight: 300; font-family: Displayfont;
    letter-spacing: 0.02em;
  }
  .usp-desc {
    font-size: clamp(12px,1vw,18px); font-weight: 200;
    color: rgba(255,255,255,0.7); line-height: 1.6;
    will-change: opacity, transform;
  }
  .usp-right::after {
    content: ''; position: absolute; inset: 0;
    pointer-events: none; z-index: 2;
  }
  .gradient-text {
    background: linear-gradient(135deg,#3ec9c7 0%,#1d7ea8 50%,#20359e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .usp-model-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%); width: 55%; height: 55%;
    border-radius: 50%;
    background: radial-gradient(ellipse,rgba(20,60,200,0.18) 0%,transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .usp-grain {
    pointer-events: none; position: absolute; inset: 0; z-index: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }
  @media (max-width: 768px) {
    .usp-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 30vh 1fr;
      grid-template-areas: "model" "text";
      align-items: start;
    }
    .usp-right    { height: 100vh; }
    .usp-left     { overflow-y: auto; }
    .usp-headline { font-size: clamp(46px,7vw,44px); }
    .usp-sticky   { overflow-y: auto; height: 100vh; }
  }
`

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const HEADLINE = 'Our Services'

const USPS = [
  {
    label: "• AI & Automation",
    desc: "AI agents, workflow automation, chatbots, and LLM integrations.",
  },
  {
    label: "• Web Development & SaaS",
    desc: "Custom web applications, dashboards, and scalable SaaS platforms.",
  },
  {
    label: "• Managed Engineering",
    desc: "Dedicated developers, DevOps, QA, and long-term engineering support.",
  },
  {
    label: "• Blockchain & Web3",
    desc: "Smart contracts, decentralized applications, and Web3 infrastructure.",
  },
  {
    label: "• Hospital Management Systems",
    desc: "End-to-end healthcare software for hospitals, clinics, and patient management.",
  },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useNearViewport(rootMargin = '300px') {
  const ref = useRef(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          useGLTF.preload('/serpentinus.glb')
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isNear]
}

/* ─────────────────────────────────────────────────────────────
   3-D MODEL
───────────────────────────────────────────────────────────── */
function RobotModel({ scrollProgress, cursor }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF('/serpentinus.glb')
  const cloned = React.useMemo(() => scene.clone(true), [scene])
  const { actions } = useAnimations(animations, groupRef)

  const meshMaterials = useRef([])
  useEffect(() => {
    meshMaterials.current = []
    cloned.traverse(child => {
      if (!child.isMesh) return
      child.castShadow    = false
      child.receiveShadow = false
      if (child.position.y < -2 && child.scale.x > 2) child.visible = false
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach(mat => {
          mat.transparent = true
          if (mat.emissive) mat.emissiveIntensity = 1
          if (IS_MOBILE && 'envMapIntensity' in mat) mat.envMapIntensity = 0.3
        })
        meshMaterials.current.push(...mats)
      }
    })
  }, [cloned])

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(a => a.reset().fadeIn(0.5).play())
    }
  }, [actions])

  const smoothCursor = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!groupRef.current) return

    const p = scrollProgress.current
    let rotX, rotY, posX, posY, scaleVal, opacity

    if (p < 0.45) {
      const t    = p / 0.45
      const ease = 1 - Math.pow(1 - t, 2.5)
      rotX     = gsap.utils.interpolate( Math.PI * 0.72,  1,    ease)
      rotY     = gsap.utils.interpolate(-0.2,            -1,    ease)
      posX     = gsap.utils.interpolate(1,                0.5,  ease)
      posY     = gsap.utils.interpolate(-6,               0,    ease)
      scaleVal = gsap.utils.interpolate(5,                1.3,  ease)
      opacity  = Math.min(1, ease * 2.2)
    } else if (p < 0.82) {
      const t    = (p - 0.45) / (0.82 - 0.45)
      const ease = 1 - Math.pow(1 - t, 2)
      rotX     = gsap.utils.interpolate(1,    0.85, ease)
      rotY     = gsap.utils.interpolate(-1,  -0.7,  ease)
      posX     = gsap.utils.interpolate(0.5,  0.6,  ease)
      posY     = gsap.utils.interpolate(0,    0.3,  ease)
      scaleVal = gsap.utils.interpolate(1.3,  1.5,  ease)
      opacity  = 1
    } else {
      const t    = (p - 0.82) / 0.18
      const ease = t * t
      rotX     = gsap.utils.interpolate(0.85,  0.72, ease)
      rotY     = gsap.utils.interpolate(-0.7,  -0.2, ease)
      posX     = gsap.utils.interpolate(0.6,   1,    ease)
      posY     = gsap.utils.interpolate(0.3,   6,    ease)
      scaleVal = gsap.utils.interpolate(1.5,   5,    ease)
      opacity  = 1 - ease
    }

    smoothCursor.current.x += (cursor.current.x - smoothCursor.current.x) * 0.06
    smoothCursor.current.y += (cursor.current.y - smoothCursor.current.y) * 0.06

    const cx = smoothCursor.current.x
    const cy = smoothCursor.current.y

    groupRef.current.rotation.x = rotX + cy * 0.12
    groupRef.current.rotation.y = rotY + cx * 0.18
    groupRef.current.position.set(posX, posY, 0)
    groupRef.current.scale.setScalar(scaleVal * 1.15)

    const o = Math.max(0, Math.min(1, opacity))
    meshMaterials.current.forEach(mat => { mat.opacity = o })
  })

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   LIGHTS
───────────────────────────────────────────────────────────── */
function Lighting() {
  return (
    <>
      <directionalLight position={[-3, 6, 4]}  intensity={4.5} color="#d6e8ff" castShadow={false} />
      <directionalLight position={[5, 2, 2]}   intensity={2.0} color="#ffe8c0" />
      <directionalLight position={[0, 4, -5]}  intensity={1.2} color="#a0c4ff" />
      <pointLight       position={[0, -2, 2]}  intensity={30}  color="#2060ff" distance={8}  decay={2} />
      <pointLight       position={[0, 5, 0]}   intensity={8}   color="#ffffff" distance={10} decay={2} />
      <ambientLight intensity={0.4} color="#0a1020" />

      {/*
        OPT: antialias is false on desktop (see Canvas gl prop) because
        hardware MSAA only applies to the default framebuffer — EffectComposer
        renders to an offscreen RenderTarget where MSAA is never used.
        Keeping antialias: true with a composer is literally paying for GPU
        work that never reaches the screen. Bloom's soft pass covers edges
        at this intensity, so the visual delta is zero.
        Mobile has no composer so it gets antialias: true there (in gl props).
      */}
      {/* {!IS_MOBILE && (
        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.3}
            mipmapBlur
            // OPT: cap the bloom render target to 256px tall — at intensity
            // 0.2 the difference between 256 and full-res is imperceptible,
            // but the bloom pass now renders ~4-8x fewer pixels on a 1080p+
            // monitor. This is the single biggest Bloom perf win on desktop.
            height={256}
          />
        </EffectComposer>
      )} */}
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   CHAR REVEAL HELPERS
───────────────────────────────────────────────────────────── */
function splitToChars(el, className = 'usp-char') {
  const text = el.textContent
  el.innerHTML = text
    .split('')
    .map(ch => ch === ' '
      ? `<span class="usp-space"> </span>`
      : `<span class="${className}">${ch}</span>`,
    )
    .join('')
  return el.querySelectorAll(`.${className}`)
}

/* ─────────────────────────────────────────────────────────────
   PAUSABLE CANVAS WRAPPER
───────────────────────────────────────────────────────────── */
function PausableCanvas({ sectionRef, scrollProgress, cursor }) {
  const [frameloop, setFrameloop] = useState('always')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFrameloop(entry.isIntersecting ? 'always' : 'never')
      },
      { rootMargin: '0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionRef])

  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 38, near: 0.01, far: 50 }}
      gl={{
        // OPT: antialias is the inverse of whether Bloom is running.
        // Desktop (has EffectComposer): antialias=false — MSAA on the default
        //   framebuffer is discarded by the composer pipeline, pure wasted cost.
        // Mobile (no EffectComposer): antialias=true — MSAA actually reaches
        //   the screen and meaningfully smooths edges.
        antialias: IS_MOBILE,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
        outputColorSpace: THREE.SRGBColorSpace,
        stencil: false,
        // OPT: hint the OS/browser to prefer the discrete GPU on laptops
        // with both integrated and dedicated graphics.
        powerPreference: 'high-performance',
      }}
      shadows={false}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Lighting />
      <Suspense fallback={null}>
        <RobotModel scrollProgress={scrollProgress} cursor={cursor} />
        {/*
          OPT: resolution={128} instead of default 256.
          At this model's material roughness/metalness values, the env probe
          detail above 128px is indistinguishable. Lower = faster PMREM
          convolution on mount AND less GPU memory for the cubemap.
        */}
        <Environment preset="city" resolution={128} />
      </Suspense>
    </Canvas>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function USPSection() {
  const stickyRef      = useRef()
  const leftColRef     = useRef()
  const scrollProgress = useRef(0)
  const cursor         = useRef({ x: 0, y: 0 })

  const [canvasWrapRef, shouldRenderCanvas] = useNearViewport('300px')

  useEffect(() => {
    // OPT: mousemove fires at raw pointer rate on PC (can be 500–1000Hz on
    // gaming mice). Gate the cursor ref update to one write per animation
    // frame via requestAnimationFrame — the smoothCursor lerp in useFrame
    // already runs at 60fps, so anything faster than that is wasted writes.
    let rafId = null
    let pendingX = 0
    let pendingY = 0

    const onMove = e => {
      pendingX =  (e.clientX / window.innerWidth  - 0.5) * 2
      pendingY = -(e.clientY / window.innerHeight - 0.5) * 2
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        cursor.current.x = pendingX
        cursor.current.y = pendingY
        rafId = null
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const left = leftColRef.current

    const headlinePlain = left.querySelector('[data-usp="headline-plain"]')
    const labelEls      = Array.from(left.querySelectorAll('[data-usp="label"]'))
    const descEls       = Array.from(left.querySelectorAll('[data-usp="desc"]'))
    const dividerEls    = Array.from(left.querySelectorAll('[data-usp="divider"]'))

    const headCharsPlain = splitToChars(headlinePlain, 'usp-char-h')
    const labelCharSets  = labelEls.map(el => splitToChars(el, 'usp-char-l'))

    labelCharSets.forEach(chars => gsap.set(chars, { color: '#333333', opacity: 1 }))
    gsap.set(descEls,    { opacity: 0, y: 8 })
    gsap.set(dividerEls, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
        anticipatePin: 1,
        onUpdate: self => { scrollProgress.current = self.progress },
      },
    })

    tl.to(headCharsPlain, {
      color: '#ffffff',
      stagger: { each: 0.007, from: 'start' },
      duration: 0.18,
      ease: 'none',
    }, 0)

    const uspStart   = 0.22
    const uspSpacing = 0.14

    labelCharSets.forEach((chars, i) => {
      const s = uspStart + i * uspSpacing
      tl.to(dividerEls[i], { scaleX: 1, duration: 0.06, ease: 'power2.out' }, s)
      tl.to(chars, {
        color: '#ffffff',
        stagger: { each: 0.006, from: 'start' },
        duration: 0.08,
        ease: 'none',
      }, s + 0.02)
      tl.to(descEls[i], {
        opacity: 1, y: 0,
        duration: 0.08, ease: 'power2.out',
      }, s + 0.05)
    })

    tl.to({}, { duration: 1.5 }, 0.2)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <>
      <style>{STYLES}</style>

      <section data-navbar="light" className="usp-section">
        <div ref={stickyRef} className="usp-sticky">
          <div className="usp-grain" aria-hidden="true" />

          <div className="usp-grid">
            <div className="usp-overlay" />

            <div ref={leftColRef} className="usp-left">
              <h2 className="usp-headline">
                <span data-usp="headline-plain">{HEADLINE}</span>
              </h2>
              <ul className="usp-list">
                {USPS.map((usp, i) => (
                  <li key={i} className="usp-item">
                    <div className="usp-divider" data-usp="divider" />
                    <p className="usp-label" data-usp="label">{usp.label}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="usp-right">
              <div className="usp-model-glow" aria-hidden="true" />
              <div ref={canvasWrapRef} style={{ width: '100%', height: '100%' }}>
                {shouldRenderCanvas && (
                  <PausableCanvas
                    sectionRef={stickyRef}
                    scrollProgress={scrollProgress}
                    cursor={cursor}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}