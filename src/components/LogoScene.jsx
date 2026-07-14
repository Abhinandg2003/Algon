import { Canvas } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment } from "@react-three/drei"
import { useRef, useEffect, forwardRef } from "react"
import gsap from "gsap"
import * as THREE from "three"

const Logo = forwardRef(({ triggerReveal }, ref) => {
  const { scene, animations } = useGLTF("/Algon a - intro3.glb")
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    const anim = actions[Object.keys(actions)[0]]
    const HOLD_AFTER_ANIM = 800

    if (anim) {
      anim.reset()
      anim.setLoop(THREE.LoopOnce, 1)
      anim.clampWhenFinished = true
      anim.fadeIn(0.2).play()

      const duration = anim.getClip().duration

      const timer = setTimeout(() => {
        triggerReveal()
      }, (duration * 1000) + HOLD_AFTER_ANIM)

      return () => clearTimeout(timer)
    }
  }, [])

  return <primitive ref={ref} object={scene} scale={1.4} />
})

export default function LogoScene({ triggerReveal }) {
  const logoRef = useRef()

  const fadeOutLogo = () => {
    if (!logoRef.current) return

    logoRef.current.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.transparent = true

        gsap.to(obj.material, {
          opacity: 0,
          duration: 4.2,
          ease: "power2.out",
        })
      }
    })
  }

  return (
    <Canvas
      camera={{ position: [40, 0, 0], fov: 45 }}
      style={{ position: "fixed", inset: 0, zIndex: 999 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 2, -5]} intensity={0.7} color="#88aaff" />
      <directionalLight position={[40, -5, 0]} intensity={0.2} />
      <Environment preset="city" />

      <Logo
        ref={logoRef}
        triggerReveal={() => {
          triggerReveal()
          fadeOutLogo()
        }}
      />
    </Canvas>
  )
}