import { useEffect, useState } from "react";

// The pattern that slides — one full cycle = pattern.length ticks
const PATTERN = "===+++---===+++---";

export default function Loader({ onReady }) {
  const [offset, setOffset] = useState(0);
  const [done, setDone] = useState(false);

  // Loader animation
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o + 1) % PATTERN.length);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Preload intro video
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const videoFile = isMobile
      ? "/algon intro black mb.mp4"
      : "/algon intro black.mp4";

    const video = document.createElement("video");

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = videoFile;

    let completed = false;

    const finishLoading = () => {
      if (completed) return;
      completed = true;

      setDone(true);

      setTimeout(() => {
        onReady();
      }, 500); // match fade duration
    };

    // Ideal event
    video.addEventListener("canplaythrough", finishLoading);

    // Fallbacks
    video.addEventListener("loadeddata", () => {
      setTimeout(finishLoading, 300);
    });

    video.addEventListener("error", finishLoading);

    // Safety timeout so user never gets stuck
    const timeout = setTimeout(finishLoading, 8000);

    video.load();

    return () => {
      clearTimeout(timeout);
      video.removeEventListener("canplaythrough", finishLoading);
      video.src = "";
    };
  }, [onReady]);

  const doubled = PATTERN + PATTERN;
  const visible = doubled.slice(offset, offset + 10);

  return (
    <div
      className="fixed inset-0 z-[99999] bg-[#131313] flex items-center justify-center transition-opacity duration-500"
      style={{
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "all",
      }}
    >
      <span
        className="font-['Space_Mono'] text-white/70 tracking-[0.25em] select-none"
        style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
      >
        {visible}
      </span>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
      `}</style>
    </div>
  );
}