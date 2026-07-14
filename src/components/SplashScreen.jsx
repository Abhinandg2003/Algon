// import { useState } from "react"
// import LogoScene from "./LogoScene"
// import MaskReveal from "./MaskReveal"
// import SplashBackground from "./SplashBackground"

// export default function SplashScreen({ onFinish }) {
//   const [showMask, setShowMask] = useState(false)

//   return (
//     <>
//       {!showMask && <SplashBackground />}

//       <LogoScene triggerReveal={() => setShowMask(true)} />

//       {showMask && <MaskReveal onFinish={onFinish} />}
//     </>
//   )
// }


import { useState } from "react"
import LogoScene from "./LogoScene"

export default function SplashScreen3dbackup({ onFinish }) {
  const [fadingOut, setFadingOut] = useState(false)

  const handleReveal = () => {
    setFadingOut(true)
    setTimeout(() => {
      onFinish()
    }, 1200) // matches the CSS transition duration
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "#131313",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 1.2s ease",
        pointerEvents: fadingOut ? "none" : "all",
      }}
    >
      <LogoScene triggerReveal={handleReveal} />
    </div>
  )
}