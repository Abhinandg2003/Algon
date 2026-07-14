import { Canvas, useThree, useFrame, } from '@react-three/fiber'
import { useGLTF, Environment, useAnimations } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

function Model() {
  const ref = useRef()
  const { scene, animations } = useGLTF('/Algon a - intro.glb')
  const { actions } = useAnimations(animations, ref)

  const mouse = useRef({ x: 0, y: 0 })

// useEffect(() => {
//   const handle = e => {
//     mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
//     mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
//   }

//   window.addEventListener('mousemove', handle)
//   return () => window.removeEventListener('mousemove', handle)
// }, [])


// useFrame(({ camera }) => {
//   camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.05
//   camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.05

//   camera.lookAt(0, 0, 0)
// })

// useFrame(({ clock }) => {
//   ref.current.position.y = Math.sin(clock.elapsedTime) * 0.08
//   ref.current.rotation.y += 0.001
// })


useEffect(() => {
  const action = actions[Object.keys(actions)[0]]

  if (action) {
    action.reset()
    action.setLoop(THREE.LoopOnce, 1)   // play only once
    action.clampWhenFinished = true    // freeze on last frame
    action.play()
  }
}, [actions])

return (
  <primitive
    ref={ref}
    object={scene}
    scale={1.5}
    position={[0, -2, 0]}
    rotation={[0, Math.PI / 4, 0]}
  />
)
}

function Lights() {
  return (
    <>
      {/* Soft global fill */}
      <ambientLight intensity={1} />

      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Rim light */}
      <directionalLight position={[-5, 3, -5]} intensity={1.5} color="#88aaff" />
      

      {/* Environment reflection */}
      <Environment preset="city" />
    </>
  )
}

export default function Scene() {
  return (
    <div className="canvas-wrap">
    <Canvas
      gl={{ alpha: true }}
      camera={{ position: [20, 0, -20], fov: 45 }}
    >

      <Lights />
      <Model />

    </Canvas>
    </div>
  )
}

