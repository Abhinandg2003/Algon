import { useRef, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import gsap from "gsap";

export default function ScrollIndicator() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    // Fade out near bottom
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        if (self.progress > 0.92) {
          gsap.to(el, {
            autoAlpha: 0,
            y: 10,
            duration: 0.6,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      },
    });

    // Slow subtle arrow animation
    // Slow subtle arrow animation
gsap.fromTo(
  ".ab-scroll-arrow",
  {
    y: 0,
    opacity: 0.2,
  },
  {
    y: 14,
    opacity: 0.4,
    duration: 1.8,
    ease: "sine.inOut",
    stagger: {
      each: 0.25,
      repeat: -1,
      yoyo: true,
    },
  }
);

    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref} className="ab-scroll-indicator">
      <div className="ab-scroll-arrows">
        <svg className="ab-scroll-arrow" viewBox="0 0 40 14">
          <path d="M2 2 L20 12 L38 2" />
        </svg>
        <svg className="ab-scroll-arrow" viewBox="0 0 40 14">
          <path d="M2 2 L20 12 L38 2" />
        </svg>
        <svg className="ab-scroll-arrow" viewBox="0 0 40 14">
          <path d="M2 2 L20 12 L38 2" />
        </svg>
      </div>
    </div>
  );
}
