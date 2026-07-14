/**
 * CTASection.jsx
 *
 * Creative CTA — no cursor effects.
 * Transparent button with animated underline on hover.
 * Blue gradient orbs in background.
 */

import Lottie from "lottie-react"
import animationData from "/src/assets/Neon.json"
import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <>
      <style>{`
        /* ── Section ─────────────────────────────────────────────── */
        .cta-section {
        height: 100vh;
          position:   relative;
          background: #fcfcf7;
          overflow:   hidden;
          padding:    60px 7vw 80px;
        }

        // /* Subtle grid */
        // .cta-section::before {
        //   content: ''; position: absolute; inset: 0;
        //   background-image:
        //     linear-gradient(rgba(0,0,0,0.022) 1px, transparent 1px),
        //     linear-gradient(90deg, rgba(0,0,0,0.022) 1px, transparent 1px);
        //   background-size: 64px 64px;
        //   pointer-events: none; z-index: 0;
        // }

        /* Grain */
        .cta-section::after {
          content: ''; position: absolute; inset: 0;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none; z-index: 0;
        }

        /* ── Blue gradient orbs ──────────────────────────────────── */
        /* Large diffuse orb — bottom right */
        .cta-orb-1 {
          position:       absolute;
          bottom:         -15%;
          right:          -8%;
          width:          65vw;
          height:         65vw;
          max-width:      820px;
          max-height:     820px;
          border-radius:  50%;
          // background:     radial-gradient(ellipse at center,
          //                   rgba(40, 90, 255, 0.18) 0%,
          //                   rgba(20, 50, 200, 0.08) 40%,
          //                   transparent 70%);
          pointer-events: none;
          z-index:        0;
          filter:         blur(2px);
        }

        /* Smaller tighter orb — top left */
        .cta-orb-2 {
          position:       absolute;
          top:            10%;
          left:           -4%;
          width:          38vw;
          height:         38vw;
          max-width:      480px;
          max-height:     480px;
          border-radius:  50%;
          // background:     radial-gradient(ellipse at center,
          //                   rgba(60, 120, 255, 0.12) 0%,
          //                   rgba(30, 70, 220, 0.05) 50%,
          //                   transparent 70%);
          pointer-events: none;
          z-index:        0;
          filter:         blur(1px);
        }

        /* Thin accent streak — diagonal across middle */
        .cta-orb-3 {
          position:       absolute;
          top:            38%;
          left:           25%;
          width:          50vw;
          height:         20vw;
          max-width:      600px;
          max-height:     220px;
          border-radius:  50%;
          // background:     radial-gradient(ellipse at center,
          //                   rgba(80, 140, 255, 0.07) 0%,
          //                   transparent 70%);
          transform:      rotate(-18deg);
          pointer-events: none;
          z-index:        0;
          filter:         blur(8px);
        }

        /* ── Content ─────────────────────────────────────────────── */
        .cta-inner {
          position:  relative;
          z-index:   1;
          max-width: 1400px;
          margin:    0 auto;
        }

        .cta-ruler {
          width:         100%;
          height:        1px;
          background:    rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .cta-eyebrow {
          font-size:      10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color:          rgba(0,0,0,0.5);
          margin:         0 0 28px;
        }

        /* Headline */
        .cta-headline {
          
          font-size:      clamp(50px, 7.5vw, 100px);
          line-height:    0.92;
          letter-spacing: -0.04em;
          color:          #000;
          margin:         0 0 0;
        }

        .cta-word-wrap {
          display:        inline-block;
          overflow:       hidden;
          vertical-align: bottom;
          margin-right:   0.22em;
        }
        .cta-word {
          display:    inline-block;
          will-change: transform, opacity;
        }

        /* Hollow accent word */
        .cta-accent {
          
          color: #4a6fff;
        }

        /* ── Bottom row ──────────────────────────────────────────── */
        .cta-bottom {
          display:         flex;
          align-items:     center;
          justify-content: space-between;
          gap:             40px;
          flex-wrap:       wrap;
          margin-top:      30px;
          padding-top:     40px;
          border-top:      1px solid rgba(0,0,0,0.1);
        }

        .cta-sub {
          font-size:      clamp(15px, 1.1vw, 16px);
          font-weight:    300;
          color:          rgba(0,0,0,0.8);
          line-height:    1.72;
          max-width:      38ch;
          margin:         0;
          letter-spacing: 0.01em;
        }

        /* ── Transparent button with animated underline ──────────── */
        .cta-btn {
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             12px;
          background:      transparent;
          color:           #000;
          font-size:       clamp(14px, 1.2vw, 18px);
          font-weight:     400;
          cursor:          pointer;
          text-decoration: none;
          outline:         none;
        }

        /* Underline track */
        .cta-btn-text {
          position: relative;
          
        }
        .cta-btn-text::after {
          content:          '';
          position:         absolute;
          bottom:           0;
          left:             0;
          width:            0%;
          height:           1px;
          background:       #000;
          transform:        scaleX(0);
          transform-origin: left center;
          transition:       transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-btn:hover .cta-btn-text::after {
          transform: scaleX(1);
        }

        /* Arrow — slides right on hover */
        .cta-btn-icon {
          display:    inline-flex;
          align-items:center;
          overflow:   hidden;
          width:      18px;
          height:     18px;
          flex-shrink:0;
          padding-bottom: 6px;
        }
        .cta-btn-icon svg {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .cta-btn:hover .cta-btn-icon svg {
          transform: translateX(4px);
        }

        /* Email */
        .cta-email {
          font-size:       clamp(15px, 0.95vw, 14px);
          color:           rgba(0,0,0,0.8);
          text-decoration: none;
          letter-spacing:  0.06em;
          transition:      color 0.3s;
          white-space:     nowrap;
          font-weight:    300;
          hover:color:           rgba(0,0,0,1);
        }
        .cta-email:hover { color: rgba(0,0,0,1); }

        @media (max-width: 768px) {
          .cta-section { padding: 80px 0vw 80px; height:auto }
          .cta-bottom  { display: none; flex-direction: column; align-items: flex-start; gap: 28px; }
          .cta-orb-1   { width: 90vw; height: 90vw; right: -20%; bottom: -20%; }
          .cta-orb-2   { width: 60vw; height: 60vw; }
        }
      `}</style>

      <section data-navbar="dark" className="cta-section">

        {/* Blue gradient orbs */}
        <div className="cta-orb-1" aria-hidden="true" />
        <div className="cta-orb-2" aria-hidden="true" />
        <div className="cta-orb-3" aria-hidden="true" />

        <div className="cta-inner  ">


          {/* Ruler */}
          <div className="" />
          <div className="grid grid-cols-1 md:grid-cols-2  items-center">

            <div className="cta-inner">

              {/* Headline */}
              <h2 className="cta-headline font-light robotofont">
                <span className="font-display font-normal" style={{ display: "block",  }}>Have an idea?</span>
                <span className="font-display font-normal" style={{ display: "block" }}>Let's make it</span>
                <span style={{
                  
            }} className="font-display font-normal">
              real
            </span>
              </h2>
              <Link to="/contact" className="cta-btn mt-10 rounded-full border border-[#050508] px-8 py-3 hover:bg-[#050508] hover:text-[#fcfcf7] transition-all duration-300">
                <span className="cta-btn-text">Start a project</span>
                
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[80vw] md:w-[40vw] h-[40vh] md:h-[80vh] overflow-visible flex ">
                <Lottie animationData={animationData} />
              </div>
            </div>
          </div>

          
        </div>






      </section>
    </>
  )
}
