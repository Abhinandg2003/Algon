import { useState, useRef } from "react"

export default function SplashScreen({ onFinish }) {
  const [fadingOut, setFadingOut] = useState(false)
  const videoRef = useRef(null)

  const handleVideoEnd = () => {
    setFadingOut(true)
    setTimeout(() => {
      onFinish()
    }, 1200)
  }

  const handleSkip = () => {
    handleVideoEnd()
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
      ref={videoRef}
  autoPlay
  muted
  playsInline
  onEnded={handleVideoEnd}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
>
  <source
    src="/algon intro black mb.mp4"
    media="(max-width: 768px)"
    type="video/mp4"
  />
  <source
    src="/algon intro black.mp4"
    media="(min-width: 769px)"
    type="video/mp4"
  />
</video>

      {/* Optional skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "6px",
          padding: "0.4rem 1rem",
          cursor: "pointer",
          fontSize: "0.85rem",
          backdropFilter: "blur(4px)",
        }}
      >
        Skip
      </button>
    </div>
  )
}