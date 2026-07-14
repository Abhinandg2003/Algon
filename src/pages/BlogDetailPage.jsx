import { useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { POSTS } from "./BlogsPage";

export default function BlogDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // prefer state passed via navigate, fall back to POSTS lookup
  const post = location.state?.post || POSTS.find((p) => p.id === Number(id));

  const heroRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set(".bd-animate", { autoAlpha: 0, y: 32 });
      gsap.to(".bd-animate", {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)" }}>Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .bd-page { background:#050508; color:#fff; min-height:100vh; }
        .bd-grid-bg {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(41,141,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg,rgba(41,141,255,0.018) 1px, transparent 1px);
          background-size:64px 64px;
        }
        .bd-grain {
          position:absolute; inset:0; pointer-events:none; z-index:0; opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
        }

        /* Hero image */
        .bd-hero {
          position:relative; width:100%; height:52vh; min-height:320px;
          overflow:hidden; margin-top:68px;
        }
        .bd-hero-img { width:100%; height:100%; object-fit:cover; }
        .bd-hero-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to bottom, rgba(5,5,8,0.3) 0%, #050508 100%);
        }

        /* Back button */
        .bd-back {
          display:inline-flex; align-items:center; gap:8px;
          background:none; border:none; cursor:pointer;
          color:rgba(255,255,255,0.4); 
          font-size:13px; letter-spacing:0.1em;
          padding:0; transition:color 0.22s; margin-bottom:48px;
        }
        .bd-back:hover { color:#fff; }
        .bd-back svg { transition:transform 0.22s; }
        .bd-back:hover svg { transform:translateX(-3px); }

        /* Content wrapper */
        .bd-content {
          position:relative; max-width:1080px;
          margin:0 auto; padding:56px 7vw 120px;
        }

        /* Meta row */
        .bd-meta-row {
          display:flex; align-items:center; gap:12px;
          flex-wrap:wrap; margin-bottom:28px;
        }
        .bd-cat-pill {
          font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.18em;
          text-transform:uppercase; color:#fcfcf7;
          background:var(--cat,#298dff); border-radius:999px; padding:4px 12px;
        }
        .bd-date, .bd-read-time {
          font-size:12px; letter-spacing:0.1em; color:rgba(255,255,255,0.4);
          font-family:'DM Sans',sans-serif;
        }
        .bd-sep { color:rgba(255,255,255,0.2); font-size:10px; }

        /* Title */
        .bd-title {
          font-size:clamp(28px,4.5vw,52px); font-weight:400; line-height:1.1;
          letter-spacing:-0.03em; color:#fff; margin:0 0 36px;
        }

        /* Author */
        .bd-author-row { display:flex; align-items:center; gap:12px; margin-bottom:40px; }
        .bd-author-avatar {
          width:44px; height:44px; border-radius:50%; flex-shrink:0;
          background:rgba(41,141,255,0.15); border:1px solid rgba(41,141,255,0.3);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:16px; font-weight:600; color:#298dff;
        }
        .bd-author-name { font-size:14px; font-weight:400; color:rgba(255,255,255,0.75); margin:0 0 3px; }
        .bd-author-role {
          font-size:12px; color:rgba(255,255,255,0.4); margin:0;
          font-family:'DM Sans',sans-serif; letter-spacing:0.05em;
        }

        /* Divider */
        .bd-divider { width:100%; height:1px; background:rgba(255,255,255,0.07); margin-bottom:44px; }

        /* Body */
        .bd-body { display:flex; flex-direction:column; }
        .bd-para {
          font-size:clamp(15px,1.2vw,17px); line-height:1.9; font-weight:300;
          color:rgba(255,255,255,0.65); margin:0 0 28px;
        }
        .bd-para:last-child { margin-bottom:0; }

        /* Related / back strip */
        .bd-footer-strip {
          border-top:1px solid rgba(255,255,255,0.07);
          padding:48px 7vw; text-align:center;
          background:#050508;
        }
        .bd-footer-strip p {
          font-size:14px; color:rgba(255,255,255,0.3);
           margin:0 0 20px;
          letter-spacing:0.1em; t
        }
        .bd-back-btn {
          display:inline-flex; align-items:center; gap:10px;
          padding:14px 36px; background:#fff; color:#050508; border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.18em;
          text-transform:uppercase; font-weight:500; transition:background 0.25s;
        }
        .bd-back-btn:hover { background:#298dff; color:#fff; }

        @media (max-width:768px) {
          .bd-content { padding:40px 6vw 80px; }
          .bd-hero { height:38vh; }
        }
      `}</style>

      <div className="bd-page">
        <Navbar />

        {/* Hero image */}
        <div ref={heroRef} className="bd-hero bd-animate">
          <img src={post.image} alt={post.title} className="bd-hero-img" />
          <div className="bd-hero-overlay" />
        </div>

        {/* Article content */}
        <div ref={contentRef} className="bd-content" style={{ position: "relative" }}>
          <div className="bd-grid-bg" />
          <div className="bd-grain" />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Back */}
            <button className="bd-back bd-animate" onClick={() => navigate(-1)}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to journal
            </button>

            {/* Meta */}
            <div className="bd-meta-row bd-animate">
              <span className="bd-cat-pill" style={{ "--cat": post.accent }}>{post.category}</span>
              <span className="bd-date">{post.date}</span>
              <span className="bd-sep">·</span>
              <span className="bd-read-time">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="bd-title bd-animate">{post.title}</h1>

            {/* Author */}
            <div className="bd-author-row bd-animate">
              <div className="bd-author-avatar">{post.author.name.charAt(0)}</div>
              <div>
                <p className="bd-author-name">{post.author.name}</p>
                <p className="bd-author-role">{post.author.role}</p>
              </div>
            </div>

            <div className="bd-divider bd-animate" />

            {/* Body */}
            <div className="bd-body bd-animate">
              {post.content.split("\n\n").map((para, i) => (
                <p key={i} className="bd-para">{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="bd-footer-strip">
          <p>Finished reading?</p>
          <button className="bd-back-btn" onClick={() => navigate("/blog")}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to all posts
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
}