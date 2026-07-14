import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import animationData from "/src/assets/Bulb.json";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Design", "Development", "Marketing", "AI & Automation", "Startup"];

export const POSTS = [
  {
    id: 1,
    title: "Why your SaaS landing page is losing conversions (and how to fix it)",
    excerpt: "Most SaaS landing pages fail not because of bad copy — but because of broken visual hierarchy. We break down the five structural mistakes we see on almost every client brief.",
    content: `Most SaaS landing pages fail not because of bad copy — but because of broken visual hierarchy. We break down the five structural mistakes we see on almost every client brief.\n\nThe fold still matters. Despite everything you've heard, the content visible before a user scrolls is your single highest-leverage asset. If your headline doesn't state exactly who this is for and what problem it solves in under eight words, you've already lost 60% of your audience.\n\nSecondly, social proof placement is almost always wrong. Testimonials buried in the footer are decorative. Social proof placed directly below the headline — where doubt is highest — converts. Trust signals work where anxiety lives.\n\nThird: your CTA is too clever. "Start your journey" tells nobody anything. "Get your first report free" tells someone exactly what happens next. Specificity beats inspiration every time.\n\nFourth: mobile is an afterthought. Over 70% of SaaS trial signups happen on desktop — but discovery happens on mobile. A broken mobile experience kills word-of-mouth before it starts.\n\nFifth, and most critically: there's no single clear next step. Every landing page should have one job. If your page has three CTAs, a chatbot, a demo video, and a newsletter signup, you've asked the visitor to make a decision you haven't made for them.`,
    category: "Design",
    date: "Apr 28, 2025",
    readTime: "6 min read",
    author: { name: "Arjun Menon", role: "Creative Director" },
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    featured: true,
    accent: "#298dff",
  },
  {
    id: 2,
    title: "Building a design system from scratch: lessons from 3 years of client work",
    excerpt: "A design system is only as good as its documentation. Here's the process we've refined after building component libraries for over a dozen products.",
    content: `A design system is only as good as its documentation. Here's the process we've refined after building component libraries for over a dozen products.\n\nWe start every design system engagement with an audit, not a canvas. Before touching Figma, we spend a day cataloguing every UI pattern already in production — buttons, forms, navigation, cards, modals. Invariably, a product that's been running for two years has 14 button variants and nobody knows why.\n\nThe second lesson: tokens first, components second. Colour, typography, spacing, and shadow tokens are the foundation. Components built on top of a well-structured token layer can be re-themed in hours. Components built without tokens are rewritten from scratch every rebrand.\n\nThird: name things for intent, not appearance. "Blue-500" breaks the moment someone changes the brand colour. "interactive-primary" survives a complete visual overhaul.\n\nFinally, a design system that isn't maintained is a design system that's already dead. We always budget 10–15% of our retainer time specifically for system maintenance — adding new patterns as the product grows, deprecating what's no longer used, and keeping the documentation honest.`,
    category: "Design",
    date: "Apr 14, 2025",
    readTime: "8 min read",
    author: { name: "Priya Nair", role: "Lead Designer" },
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    featured: false,
    accent: "#298dff",
  },
  {
    id: 3,
    title: "The real cost of a slow website in 2025",
    excerpt: "Every 100ms of latency costs you conversion rate. We ran the numbers across 12 client sites — the results were uncomfortable.",
    content: `Every 100ms of latency costs you conversion rate. We ran the numbers across 12 client sites — the results were uncomfortable.\n\nCore Web Vitals became a ranking signal in 2021. Four years later, the majority of websites we audit still fail at least two of the three metrics. Not because engineers don't care — but because performance is invisible until it's catastrophic.\n\nThe data we collected: across 12 client properties over a 6-month period, improving Largest Contentful Paint from "needs improvement" to "good" (sub-2.5 seconds) correlated with an average 18% increase in conversion rate. That's not a rounding error.\n\nThe most common culprits we find: unoptimised images served at 2x their display size, render-blocking JavaScript loaded in the document head, third-party scripts (chat widgets, analytics, heatmaps) loaded synchronously, and fonts without font-display: swap causing layout shifts.\n\nNone of these are hard to fix. All of them require someone to care enough to look.`,
    category: "Development",
    date: "Mar 30, 2025",
    readTime: "5 min read",
    author: { name: "Rahul Dev", role: "Head of Engineering" },
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    featured: false,
    accent: "#298dff",
  },
  {
    id: 4,
    title: "How we use AI to cut design iteration time by 60%",
    excerpt: "Not by replacing designers — by eliminating the parts of the process that waste their time. A look inside our AI-augmented design workflow.",
    content: `Not by replacing designers — by eliminating the parts of the process that waste their time. A look inside our AI-augmented design workflow.\n\nThe biggest time sink in most design projects isn't the creative work — it's the peripheral work around it. Writing placeholder copy, generating moodboards, resizing assets for 12 breakpoints, writing alt text, documenting component specs. These tasks consume 30–40% of a designer's week without contributing a single creative decision.\n\nWe've systematically automated most of this peripheral work over the past 18 months. The results: our designers spend more of their time on the high-judgement work — layout decisions, interaction design, visual storytelling — and our project timelines have compressed without any reduction in quality.\n\nThe tools that have had the largest impact: Claude for content scaffolding and spec documentation, Figma plugins for asset generation and responsive resizing, and custom scripts for design token export and hand-off documentation.\n\nThe key insight: AI works best as a multiplier of taste, not a replacement for it. You still need a designer with strong aesthetic judgment to direct, edit, and quality-control everything that comes out of these tools. The craft hasn't changed. The overhead has.`,
    category: "AI & Automation",
    date: "Mar 12, 2025",
    readTime: "7 min read",
    author: { name: "Arjun Menon", role: "Creative Director" },
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    featured: false,
    accent: "#298dff",
  },
  {
    id: 5,
    title: "SEO in 2025: what still works and what's finally dead",
    excerpt: "Google's algorithm has changed more in the last 18 months than in the previous five years. Here's our honest assessment of what's worth your time.",
    content: `Google's algorithm has changed more in the last 18 months than in the previous five years. Here's our honest assessment of what's worth your time.\n\nWhat's dead: keyword stuffing (obviously), exact-match domains as a shortcut, guest posting for links on content farms, and thin programmatic content at scale. Google's Helpful Content system is genuinely good at detecting low-effort content now.\n\nWhat's still working and working well: topical authority built through genuinely useful long-form content, entity optimisation (making sure Google understands who you are and what you do, not just what keywords you use), technical excellence (fast, crawlable, well-structured sites), and earning links through content worth linking to.\n\nWhat's new and important: AI Overviews have reduced click-through rates on informational queries by 15–25% depending on the vertical. Optimising for citation within AI responses — by being a genuinely authoritative, well-structured source — is the next frontier.\n\nThe honest summary: SEO has never rewarded shortcuts for long. The people surprised by 2025 are the same people who were surprised by every major algorithm update since Panda. Make genuinely useful things for real people and the algorithm will eventually agree.`,
    category: "Marketing",
    date: "Feb 27, 2025",
    readTime: "9 min read",
    author: { name: "Sneha Pillai", role: "Growth Strategist" },
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    featured: false,
    accent: "#298dff",
  },
  {
    id: 6,
    title: "What we learned shipping 3 MVPs in 90 days",
    excerpt: "Speed isn't about cutting corners — it's about cutting scope. A candid retrospective on three very different products we launched in a single quarter.",
    content: `Speed isn't about cutting corners — it's about cutting scope. A candid retrospective on three very different products we launched in a single quarter.\n\nThe first product: a B2B SaaS dashboard for a logistics client. Shipped in 28 days. The secret was a ruthless scope conversation on day one — we built exactly the five screens the sales team needed to demo, nothing else. Everything else was phase two.\n\nThe second product: a consumer mobile app. Shipped in 34 days. This one taught us that a great onboarding flow is worth more than any feature. Users who completed onboarding had 4x the retention of those who didn't. We spent the last week almost entirely on onboarding and it was the right call.\n\nThe third product: an internal tooling app for a fintech client. 29 days. The lesson here was about trust — an internal tool lives or dies by whether the team it's built for actually uses it. We did three rounds of user testing with actual employees before writing a line of code. The brief changed substantially each time.\n\nThe thread connecting all three: the fastest path to a good product is talking to users earlier than feels comfortable.`,
    category: "Startup",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    author: { name: "Rahul Dev", role: "Head of Engineering" },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: false,
    accent: "#298dff",
  },
];

function BlogHero() {
  const heroRef = useRef();
  const eyebrowRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const marqRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      let x = 0;
      let raf;
      const track = marqRef.current;
      const run = () => {
        x -= 0.55;
        if (track && Math.abs(x) >= track.scrollWidth / 2) x = 0;
        if (track) track.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);

      gsap.set([eyebrowRef.current, line1Ref.current, line2Ref.current], { autoAlpha: 0, y: 60 });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0)
        .to(line1Ref.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.1)
        .to(line2Ref.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.22);

      return () => cancelAnimationFrame(raf);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="bl-hero">
      <div className="ab-grid-neon" />
      <div className="ab-grain" />
      <div className="ab-orb ab-orb--hero-r" />
      <div className="ab-orb ab-orb--hero-l" />
      <div className="bl-hero-ghost" aria-hidden="true">BLOG</div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="pt-[60px] pl-[7vw] max-w-[900px] h-[40vh] md:h-[80vh]">
          <p ref={eyebrowRef} className="ab-eyebrow">Journal</p>
          <h1 ref={line1Ref} className="bl-hero-h1">Ideas, craft,</h1>
          <h1 ref={line2Ref} className="bl-hero-h1">& honest takes.</h1>
        </div>
        <div className="flex relative w-[100vw] md:w-[550px] h-[40vh] md:h-[550px] justify-center">
          <Lottie className="flex justify-center" animationData={animationData} />
        </div>
      </div>

      <div className="ab-marq-wrap">
        <div ref={marqRef} className="ab-marq-track">
          {[...Array(4)].map((_, g) =>
            ["Design", "Development", "AI & Automation", "Marketing", "Startups", "Kerala", "Real Work", "No Fluff"].map((s, i) => (
              <span key={`${g}-${i}`} className="ab-marq-item">
                {s}<span className="ab-marq-dot">◆</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({ post, onRead }) {
  const ref = useRef();
  useEffect(() => {
    gsap.set(ref.current, { autoAlpha: 0, y: 40 });
    gsap.to(ref.current, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, []);

  return (
    <div ref={ref} className="bl-featured" onClick={() => onRead(post)}>
      <div className="bl-featured-img-wrap">
        <img src={post.image} alt={post.title} className="bl-featured-img" />
        <div className="bl-featured-img-overlay" />
      </div>
      <div className="bl-featured-content">
        <div className="bl-featured-top">
          <span className="bl-cat-pill" style={{ "--cat": post.accent }}>{post.category}</span>
          <span className="bl-featured-badge">Featured</span>
        </div>
        <h2 className="bl-featured-title">{post.title}</h2>
        <p className="bl-featured-excerpt">{post.excerpt}</p>
        <div className="bl-featured-meta">
          <div className="bl-author-row">
            
            <div>
              <p className="bl-author-name">{post.author.name}</p>
              <p className="bl-author-role">{post.author.role}</p>
            </div>
          </div>
          <div className="bl-meta-right">
            <span className="bl-date">{post.date}</span>
            <span className="bl-sep">·</span>
            <span className="bl-read-time">{post.readTime}</span>
          </div>
        </div>
        <button className="bl-read-btn">
          Read article
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 10 }}>
            <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function BlogCard({ post, index, onRead }) {
  const ref = useRef();
  useEffect(() => {
    gsap.set(ref.current, { autoAlpha: 0, y: 36 });
    gsap.to(ref.current, {
      autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out",
      delay: (index % 3) * 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 90%" },
    });
  }, [index]);

  return (
    <div ref={ref} className="bl-card" onClick={() => onRead(post)}>
      <div className="bl-card-img-wrap">
        <img src={post.image} alt={post.title} className="bl-card-img" />
        <div className="bl-card-img-overlay" />
        <span className="bl-cat-pill bl-cat-pill--card" style={{ "--cat": post.accent }}>{post.category}</span>
      </div>
      <div className="bl-card-body">
        <h3 className="bl-card-title">{post.title}</h3>
        <p className="bl-card-excerpt">{post.excerpt}</p>
        <div className="bl-card-footer">
          <div className="bl-author-row bl-author-row--sm">
            
            <div>
              <p className="bl-author-name bl-author-name--sm">{post.author.name}</p>
              <p className="bl-author-role">{post.author.role}</p>
            </div>
          </div>
          <div className="bl-card-meta">
            <span className="bl-date">{post.date}</span>
            <span className="bl-sep">·</span>
            <span className="bl-read-time">{post.readTime}</span>
          </div>
        </div>
      </div>
      <div className="bl-card-bar" />
    </div>
  );
}

function BlogGrid({ onRead }) {
  const [active, setActive] = useState("All");
  const sectionRef = useRef();
  const headRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = POSTS.find((p) => p.featured);
  const filtered = POSTS.filter((p) => !p.featured && (active === "All" || p.category === active));

  return (
    <section ref={sectionRef} className="bl-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ab-orb bl-orb--grid" />

      <div className="bl-section-inner">
        <div ref={headRef} className="bl-section-head">
          <p className="ab-eyebrow">All posts</p>
          <h2 className="ab-section-title">From the studio.</h2>
        </div>

        {featured && <FeaturedPost post={featured} onRead={onRead} />}

        <div className="bl-filter-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`bl-filter-pill ${active === cat ? "bl-filter-pill--on" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bl-grid">
          {filtered.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} onRead={onRead} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogsPage() {
  const navigate = useNavigate();

  const handleRead = (post) => {
    navigate(`/blogs/${post.id}`, { state: { post } });
  };

  return (
    <>
      <style>{`
        .ab-grid-bg {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(41,141,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg,rgba(41,141,255,0.018) 1px, transparent 1px);
          background-size:64px 64px;
        }
        .ab-grid-neon {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:
            linear-gradient(rgba(41,141,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg,rgba(41,141,255,0.055) 1px, transparent 1px);
          background-size:64px 64px;
        }
        .ab-grain {
          position:absolute; inset:0; pointer-events:none; z-index:0; opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
        }
        .ab-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }
        .ab-orb--hero-r {
          top:-10%; right:-5%; width:60vw; height:60vw; max-width:720px; max-height:720px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.11) 0%,transparent 65%);
          filter:blur(2px);
        }
        .ab-orb--hero-l {
          bottom:-5%; left:-8%; width:38vw; height:38vw; max-width:440px; max-height:440px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.07) 0%,transparent 65%);
        }
        .ab-eyebrow {
          font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.3em;
          text-transform:uppercase; color:rgba(255,255,255,0); margin:0 0 16px; display:block;
        }
        .ab-section-title {
          font-size:clamp(32px,4.5vw,66px);
          font-weight:400; line-height:1.05; letter-spacing:-0.03em; color:#fff; margin:0;
        }
        .ab-marq-wrap {
          position:relative; z-index:1;
          border-top:1px solid rgba(255,255,255,0.2);
          border-bottom:1px solid rgba(255,255,255,0.2);
          padding:18px 0; overflow:hidden;
        }
        .ab-marq-track { display:flex; white-space:nowrap; will-change:transform; }
        .ab-marq-item {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.2em;
          text-transform:uppercase; color:rgba(255,255,255,0.4);
          padding:0 28px; display:inline-flex; align-items:center; gap:10px;
        }
        .ab-marq-dot { font-size:7px; color:rgba(255,255,255,0.4); }
        .bl-hero {
          position:relative; background:#050508;
          min-height:55vh; display:flex; flex-direction:column;
          justify-content:center; overflow:hidden; padding-top:68px;
        }
        .bl-hero-ghost {
          position:absolute; bottom:-2%; right:2vw;
          font-family:'Syne',sans-serif; font-weight:800;
          font-size:clamp(140px,25vw,360px); line-height:0.88;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.03);
          pointer-events:none; z-index:0; user-select:none; letter-spacing:-0.05em;
        }
        .bl-hero-h1 {
          font-size:clamp(52px,11vw,118px); font-weight:400; line-height:0.95;
          letter-spacing:-0.04em; color:#fff; margin:0; display:block;
        }
        .bl-section {
          position:relative; background:#050508;
          padding:90px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .bl-orb--grid {
          top:8%; right:-10%; width:55vw; height:55vw; max-width:640px; max-height:640px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.06) 0%,transparent 65%);
        }
        .bl-section-inner { position:relative; z-index:1; }
        .bl-section-head { margin-bottom:56px; }
        .bl-featured {
          display:grid; grid-template-columns:1.1fr 1fr; gap:1px;
          background:rgba(255,255,255,0.06);
          margin-bottom:72px; cursor:pointer; overflow:hidden; transition:background 0.3s;
        }
        .bl-featured:hover { background:rgba(255,255,255,0.08); }
        .bl-featured-img-wrap { position:relative; overflow:hidden; min-height:460px; }
        .bl-featured-img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s ease; }
        .bl-featured:hover .bl-featured-img { transform:scale(1.04); }
        .bl-featured-img-overlay {
          position:absolute; inset:0;
          background:linear-gradient(135deg, rgba(5,5,8,0.35) 0%, transparent 60%);
        }
        .bl-featured-content {
          background:#050508; padding:48px 44px;
          display:flex; flex-direction:column; justify-content:center;
        }
        .bl-featured-top { display:flex; align-items:center; gap:14px; margin-bottom:24px; }
        .bl-featured-badge {
          font-family:'DM Sans',sans-serif; font-size:9px; letter-spacing:0.22em;
          text-transform:uppercase; color:rgba(255,255,255,0.5); border-radius:999px;
          border:1px solid rgba(255,255,255,0.3); padding:4px 10px;
        }
        .bl-featured-title {
          font-size:clamp(20px,2.4vw,32px); font-weight:400; line-height:1.18;
          letter-spacing:-0.025em; color:#fff; margin:0 0 18px;
        }
        .bl-featured-excerpt {
          font-size:15px; line-height:1.78; font-weight:300;
          color:rgba(255,255,255,0.45); margin:0 0 32px; max-width:46ch;
        }
        .bl-featured-meta {
          display:flex; justify-content:space-between; align-items:center;
          flex-wrap:wrap; gap:16px; margin-bottom:32px;
          padding-top:24px; border-top:1px solid rgba(255,255,255,0.07);
        }
        .bl-read-btn {
          display:inline-flex; align-items:center;
          padding:14px 32px; background:#fff; color:#050508; border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.18em;
          text-transform:uppercase; font-weight:500; align-self:flex-start;
          transition:background 0.25s, transform 0.2s;
        }
        .bl-read-btn:hover { background:#298dff; color:#fff; transform:translateY(-1px); }
        .bl-filter-row { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:48px; }
        .bl-filter-pill {
          padding:8px 18px; border:1px solid rgba(255,255,255,0.12); border-radius:999px;
          background:transparent; color:rgba(255,255,255,0.4);
           font-size:11px; letter-spacing:0.12em; font-weight:600;
          text-transform:uppercase; cursor:pointer; transition:all 0.22s;
        }
        .bl-filter-pill:hover { border-color:rgba(255,255,255,0.3); color:rgba(255,255,255,0.75); }
        .bl-filter-pill--on { background:#298dff; border-color:#298dff; color:#fff; }
        .bl-cat-pill {
           font-size:10px; letter-spacing:0.18em;
          text-transform:uppercase; color:#fcfcf7;font-weight:600;
          background:var(--cat,#298dff); border-radius:999px;
          padding:4px 12px; display:inline-block;
        }
        .bl-cat-pill--card { position:absolute; top:16px; left:16px; z-index:2; }
        .bl-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,0.06);
        }
        .bl-card {
          position:relative; background:#050508; overflow:hidden;
          cursor:pointer; display:flex; flex-direction:column; transition:background 0.3s;
        }
        .bl-card:hover { background:rgba(255,255,255,0.022); }
        .bl-card-img-wrap { position:relative; overflow:hidden; height:220px; flex-shrink:0; }
        .bl-card-img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s ease; }
        .bl-card:hover .bl-card-img { transform:scale(1.06); }
        .bl-card-img-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to bottom, transparent 40%, rgba(5,5,8,0.5) 100%);
        }
        .bl-card-body { padding:28px 24px 24px; display:flex; flex-direction:column; flex:1; }
        .bl-card-title {
          font-size:clamp(15px,1.4vw,19px); font-weight:400; line-height:1.3;
          letter-spacing:-0.02em; color:#fff; margin:0 0 12px;
        }
        .bl-card-excerpt {
          font-size:13px; line-height:1.72; font-weight:300;
          color:rgba(255,255,255,0.5); margin:0 0 auto; flex:1;
          display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;
        }
        .bl-card-footer {
          display:flex; justify-content:space-between; align-items:center;
          flex-wrap:wrap; gap:12px; margin-top:24px;
          padding-top:20px; border-top:1px solid rgba(255,255,255,0.06);
        }
        .bl-card-meta { display:flex; align-items:center; gap:6px; }
        .bl-card-bar {
          position:absolute; bottom:0; left:0; width:0; height:1px;
          background:#298dff; transition:width 0.45s ease;
        }
        .bl-card:hover .bl-card-bar { width:100%; }
        .bl-author-row { display:flex; align-items:center; gap:12px; }
        .bl-author-row--sm { gap:8px; }
        .bl-author-avatar {
          width:36px; height:36px; border-radius:50%; flex-shrink:0;
          background:rgba(41,141,255,0.15); border:1px solid rgba(41,141,255,0.3);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#298dff;
        }
        .bl-author-avatar--sm { width:35px; height:35px; font-size:15px; }
        .bl-author-name { font-size:13px; font-weight:400; color:rgba(255,255,255,0.7); margin:0 0 2px; }
        .bl-author-name--sm { font-size:14px; }
        .bl-author-role {
          font-size:12px; color:rgba(255,255,255,0.4); margin:0;
          font-family:'DM Sans',sans-serif; letter-spacing:0.05em;
        }
        .bl-date, .bl-read-time { font-size:12px; letter-spacing:0.1em; color:rgba(255,255,255,0.4); }
        .bl-sep { color:rgba(255,255,255,0.2); font-size:10px; }
        .bl-meta-right { display:flex; align-items:center; gap:6px; }
        @media (max-width:1100px) {
          .bl-grid { grid-template-columns:repeat(2,1fr); }
          .bl-featured { grid-template-columns:1fr; }
          .bl-featured-img-wrap { min-height:300px; }
        }
        @media (max-width:768px) {
          .bl-grid { grid-template-columns:1fr; }
          .bl-featured-content { padding:32px 28px; }
          .bl-featured-meta { flex-direction:column; align-items:flex-start; }
        }
        @media (max-width:480px) {
          .bl-filter-row { gap:6px; }
          .bl-filter-pill { font-size:10px; padding:7px 14px; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <BlogHero />
        <BlogGrid onRead={handleRead} />
        <Footer />
      </div>
    </>
  );
}