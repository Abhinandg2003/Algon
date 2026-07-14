import { useEffect, useRef } from "react"

export default function MaskReveal({ onFinish }) {
  const videoRef = useRef()

  useEffect(() => {
    const video = videoRef.current

    video.currentTime = 0
    video.play()

    video.onended = () => {
      onFinish()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="mask-video"
      src="/hero.webm"
      muted
      playsInline
      preload="auto"
    />
  )
}