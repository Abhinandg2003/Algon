/**
 * CareersPage.jsx
 *
 * Premium careers page — matches Algon aesthetic exactly.
 *
 * Sections:
 *   1. Hero              — animated reveal, neon grid, ghost text
 *   2. Open Positions    — job cards with GSAP entrance
 *   3. Why Join Us       — perks/values strip
 *   4. Application Form  — with auto-selected role, GSAP entrance
 *
 * Form: powered by web3forms.com
 * DEPS: gsap (ScrollTrigger), react (useState, useRef, useEffect)
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQ_Section from "../components/ui/FAQ";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIG
──────────────────────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "db3407a5-1cdc-4065-8095-f274d79c7e9a";
const CONTACT_EMAIL = "support@algonsolutions.com";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────────── */
const POSITIONS = [
  {
    id: "web-developer",
    title: "Web Developer",
    type: "Full-time",
    location: "Kerala, India / Remote",
    accent: "#298dff",
    tags: ["React", "Node.js", "TypeScript", "REST APIs"],
    summary:
      "Build fast, scalable web applications for a growing portfolio of SaaS and startup clients. You'll work across the full stack — from pixel-perfect UIs to robust backend architecture.",
    responsibilities: [
      "Develop responsive, high-performance web applications",
      "Collaborate with designers to implement precise UI/UX",
      "Write clean, maintainable, well-documented code",
      "Optimise performance and ensure cross-browser compatibility",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "2+ years of experience with React or similar frameworks",
      "Strong knowledge of HTML, CSS, and JavaScript/TypeScript",
      "Experience with REST APIs and backend integration",
      "Familiarity with Git and agile workflows",
    ],
  },
  {
    id: "web-designer",
    title: "Web Designer",
    type: "Full-time",
    location: "Kerala, India / Remote",
    accent: "#298dff",
    tags: ["Figma", "UI/UX", "Motion", "Branding"],
    summary:
      "Craft beautiful, conversion-focused digital experiences for ambitious brands and products. You have an eye for detail, a passion for motion, and a portfolio that speaks louder than words.",
    responsibilities: [
      "Design UI/UX for websites, apps, and marketing pages",
      "Create high-fidelity prototypes in Figma",
      "Develop and maintain design systems and component libraries",
      "Collaborate with developers to ensure accurate implementation",
      "Contribute to branding and visual identity projects",
    ],
    requirements: [
      "2+ years of experience in UI/UX or product design",
      "Proficiency in Figma and design system principles",
      "Strong portfolio demonstrating digital design work",
      "Understanding of accessibility and responsive design",
    ],
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    type: "Full-time",
    location: "Kerala, India / Remote",
    accent: "#298dff",
    tags: ["SEO", "Paid Ads", "Content", "Analytics"],
    summary:
      "Drive growth for Algon and our clients through sharp strategy, data-backed campaigns, and compelling content. You're equally comfortable writing copy and diving into dashboards.",
    responsibilities: [
      "Plan and execute SEO, SEM, and paid social campaigns",
      "Produce content strategies and manage editorial calendars",
      "Analyse campaign performance and report on key metrics",
      "Manage Google Ads, Meta Ads, and LinkedIn campaigns",
      "Collaborate with the design team on creative assets",
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Hands-on experience with Google Ads and Meta Ads Manager",
      "Strong analytical skills and comfort with Google Analytics",
      "Excellent written and verbal communication skills",
    ],
  },
  {
    id: "hr",
    title: "HR Executive",
    type: "Full-time",
    location: "Kerala, India",
    accent: "#298dff",
    tags: ["Recruitment", "Culture", "L&D", "Operations"],
    summary:
      "Shape the team that shapes our products. You'll own recruitment, onboarding, culture initiatives, and employee experience as we scale — ensuring Algon remains a place people love to work.",
    responsibilities: [
      "Manage end-to-end recruitment for technical and non-technical roles",
      "Own onboarding and employee lifecycle processes",
      "Develop and implement HR policies and culture initiatives",
      "Coordinate performance review cycles and L&D programmes",
      "Act as a trusted point of contact for all team members",
    ],
    requirements: [
      "2+ years of HR experience, ideally in a tech or agency environment",
      "Strong interpersonal and organisational skills",
      "Familiarity with HRMS tools and ATS platforms",
      "Empathy, discretion, and a people-first mindset",
    ],
  },
];

const PERKS = [
  {
    label: "Remote-friendly",
    detail: "Work from wherever you do your best thinking.",
    accent: "#298dff",
    icon: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="1.4" fill="none"/>`,
  },
  {
    label: "Senior team",
    detail: "Learn from people who've shipped real products at scale.",
    accent: "#298dff",
    icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.4" fill="none"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.4" fill="none"/>`,
  },
  {
    label: "Ownership",
    detail: "Your fingerprints are on the work — no cog-in-machine projects.",
    accent: "#298dff",
    icon: `<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  {
    label: "Growth budget",
    detail: "Courses, conferences, books — we invest in your development.",
    accent: "#298dff",
    icon: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><polyline points="17 6 23 6 23 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  },
  {
    label: "Flexible hours",
    detail: "We care about outcomes, not when you clock in.",
    accent: "#298dff",
    icon: `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>`,
  },
  {
    label: "Real projects",
    detail: "Startups, SaaS, and brands with ambition — never boring.",
    accent: "#298dff",
    icon: `<rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>`,
  },
];

const EXPERIENCE_LEVELS = ["< 1 year", "1 – 2 years", "2 – 4 years", "4 – 7 years", "7+ years"];

const AVAILABILITY = ["Immediately", "2 weeks notice", "1 month notice", "2 months notice", "3+ months notice", "Flexible"];

const SOURCES = ["LinkedIn", "Google Search", "Referral", "Twitter / X", "Instagram", "Behance / Dribbble", "Other"];

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
function CareersHero({ onExplore }) {
  const heroRef = useRef();
  const eyebrowRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const subRef = useRef();
  const ctaRef = useRef();
  const marqRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Marquee */
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

      /* Entrance */
      gsap.set(
        [eyebrowRef.current, line1Ref.current, line2Ref.current, subRef.current, ctaRef.current],
        { autoAlpha: 0, y: 60 },
      );
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0)
        .to(line1Ref.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.1)
        .to(line2Ref.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0.2)
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4)
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.55);

      return () => cancelAnimationFrame(raf);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="cr-hero">
      <div className="ab-grain" />

      {/* Ghost text */}
      <div className="cr-hero-ghost" aria-hidden="true">WORK</div>

      <div className="cr-hero-inner">
        <p ref={eyebrowRef} className="ab-eyebrow">Open positions</p>
        <h1 ref={line1Ref} className="cr-hero-h1">Build the future</h1>
        <h1 ref={line2Ref} className="cr-hero-h1">
          <span className="cr-hero-h1">with us.</span>
        </h1>
        {/* <p ref={subRef} className="cr-hero-sub">
          We're a small team that ships big work. We hire for attitude, craft, and curiosity —
          and we create an environment where great people can do the best work of their careers.
        </p> */}
        <div ref={ctaRef} className="cr-hero-ctas">
          <button className="cr-hero-btn" onClick={onExplore}>
            See open roles
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 12 }}>
              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* <a href={`mailto:${CONTACT_EMAIL}`} className="cr-hero-ghost-btn">
            Send a speculative CV
          </a> */}
        </div>
      </div>

      {/* Stats bar */}
      <div className="cr-hero-stats">
        {[
          { num: "3", label: "Open roles", labelLines: ["Open", "Roles"] },
          { num: "3+", label: "Years building", labelLines: ["Years", "Building"] },
          { num: "50+", label: "Projects shipped", labelLines: ["Projects", "Shipped"] },
          { num: "100%", label: "Remote-friendly", labelLines: ["Remote", "Friendly"] },
        ].map((s) => (
          <div key={s.label} className="cr-stat">
            <span className="cr-stat-num">{s.num}</span>
            <span className="cr-stat-label">
              {s.labelLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* Marquee */}
      {/* <div className="ab-marq-wrap">
        <div ref={marqRef} className="ab-marq-track">
          {[...Array(4)].map((_, g) =>
            ["Web Development", "Design", "Marketing", "HR", "Kerala", "India", "Remote", "Senior Team Only", "Ownership Culture", "Real Projects"].map((s, i) => (
              <span key={`${g}-${i}`} className="ab-marq-item">
                {s}
                <span className="ab-marq-dot">◆</span>
              </span>
            )),
          )}
        </div>
      </div> */}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. OPEN POSITIONS
──────────────────────────────────────────────────────────────────────────── */
function PositionCard({ pos, index, onApply }) {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    gsap.set(cardRef.current, { autoAlpha: 0, y: 40 });
    gsap.to(cardRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: index * 0.1,
      scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
    });
  }, [index]);

  useEffect(() => {
    if (expanded) {
      gsap.to(bodyRef.current, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
    }
  }, [expanded]);

  return (
    <div ref={cardRef} className="cr-pos-card" style={{ "--pos-accent": pos.accent }}>
      <div className="cr-pos-top">
        <div className="cr-pos-left">
          {/* <div className="cr-pos-accent-dot" /> */}
          <div>
            <h3 className="cr-pos-title">{pos.title}</h3>
            <div className="cr-pos-meta">
              <span className="cr-pos-badge">{pos.type}</span>
              <span className="cr-pos-sep">·</span>
              <span className="cr-pos-location">{pos.location}</span>
            </div>
          </div>
        </div>
        <div className="cr-pos-right">
          <button className="cr-pos-expand" onClick={() => setExpanded(!expanded)}>
            <span>{expanded ? "Less" : "Details"}</span>
            <span className="cr-pos-expand-icon" style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>+</span>
          </button>
          <button className="cr-pos-apply" onClick={() => onApply(pos.id)}>
            Apply now
            <svg width="12" height="9" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 10 }}>
              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* <div className="cr-pos-tags">
        {pos.tags.map((t) => (
          <span key={t} className="cr-pos-tag">{t}</span>
        ))}
      </div> */}

      <div ref={bodyRef} className="cr-pos-body" style={{ height: 0, opacity: 0 }}>
        <p className="cr-pos-summary">{pos.summary}</p>
        <div className="cr-pos-details-grid">
          <div>
            <p className="cr-pos-detail-head">Responsibilities</p>
            <ul className="cr-pos-list">
              {pos.responsibilities.map((r, i) => (
                <li key={i} className="cr-pos-list-item">{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cr-pos-detail-head">Requirements</p>
            <ul className="cr-pos-list">
              {pos.requirements.map((r, i) => (
                <li key={i} className="cr-pos-list-item">{r}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* <button className="cr-pos-apply-inline" onClick={() => onApply(pos.id)}>
          Apply for this role →
        </button> */}
      </div>

      <div className="cr-pos-bar" />
    </div>
  );
}

function OpenPositions({ onApply, sectionRef }) {
  return (
    <section ref={sectionRef} className="cr-positions-section">
      <div className="ab-grain" />

      <div className="cr-positions-inner">
        <div className="cr-positions-head">
          <h2 className="ab-section-title">
            Open roles. <br />Real ownership.
          </h2>
          <p className="cr-positions-sub">
            Click any role to read the full brief, then hit Apply — we review every application personally.
          </p>
        </div>

        <div className="cr-positions-list">
          {POSITIONS.map((pos, i) => (
            <PositionCard key={pos.id} pos={pos} index={i} onApply={onApply} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. WHY JOIN US
──────────────────────────────────────────────────────────────────────────── */
function WhyJoin() {
  const ref = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll(".cr-perk-card");
      cards?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 28 });
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out",
          delay: i * 0.075,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cr-why-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="cr-why-inner">
        <div className="cr-why-head">
          <p className="ab-eyebrow">Why Algon</p>
          <h2 className="ab-section-title">
            A place where<br />craft matters.
          </h2>
        </div>
        <div className="cr-perks-grid">
          {PERKS.map((p) => (
            <div key={p.label} className="cr-perk-card" style={{ "--perk": p.accent }}>
              <div className="cr-perk-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  dangerouslySetInnerHTML={{ __html: p.icon }} />
              </div>
              <p className="cr-perk-label">{p.label}</p>
              <p className="cr-perk-detail">{p.detail}</p>
              <div className="cr-perk-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FORM PRIMITIVES
──────────────────────────────────────────────────────────────────────────── */
function Field({ label, required, children }) {
  return (
    <div className="ct-field">
      <label className="ct-label">
        {label}
        {required && <span className="ct-req">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ name, type = "text", placeholder, required, value, onChange }) {
  return (
    <input className="ct-input" type={type} name={name} placeholder={placeholder}
      required={required} value={value} onChange={onChange} autoComplete="off" />
  );
}

function Select({ name, options, required, value, onChange }) {
  return (
    <div className="ct-select-wrap">
      <select className="ct-select" name={name} required={required} value={value} onChange={onChange}>
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <svg className="ct-select-chevron" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Textarea({ name, placeholder, required, value, onChange, rows = 5 }) {
  return (
    <textarea className="ct-textarea" name={name} placeholder={placeholder}
      required={required} value={value} onChange={onChange} rows={rows} />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. APPLICATION FORM
──────────────────────────────────────────────────────────────────────────── */
function ApplicationForm({ defaultRole, formRef: scrollRef }) {
  const sectionRef = useRef();
  const formRef = useRef();
  const leftRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: defaultRole || "",
    experience: "",
    availability: "",
    portfolio: "",
    linkedin: "",
    source: "",
    message: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  /* Keep role in sync if parent updates defaultRole */
  useEffect(() => {
    if (defaultRole) setForm((f) => ({ ...f, role: defaultRole }));
  }, [defaultRole]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { autoAlpha: 0, x: -32 });
      gsap.to(leftRef.current, {
        autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
      });
      const fields = sectionRef.current?.querySelectorAll(".ct-field, .ct-submit-row");
      fields?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 28 });
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", delay: i * 0.055,
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `New career application — ${form.role} from ${form.name}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await res.json();
      if (result.success) setSubmitted(true);
      else throw new Error(result.message);
    } catch {
      formRef.current?.submit();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <SuccessState />;

  const ROLE_OPTIONS = POSITIONS.map((p) => p.title);

  return (
    <section ref={sectionRef} className="ct-form-section" id="apply-form">
      <div className="ab-grain" />

      <div ref={scrollRef} className="ct-form-inner">
        {/* Left */}
        <div ref={leftRef} className="ct-form-left">
          <p className="ab-eyebrow">Apply now</p>
          <h2 className="ct-form-title">
            Tell us about<br />yourself.
          </h2>
          <p className="ct-form-hint">
            No automated filtering — every application is read by a real person. Be genuine, be specific.
          </p>
          <div className="ct-form-badges">
            {[
              { label: "Response within 48h", accent: "#4a6fff" },
              { label: "Friendly first interview", accent: "#00d4aa" },
              { label: "No ghosting — ever", accent: "#f59e0b" },
            ].map((b) => (
              <div key={b.label} className="ct-badge" style={{ "--badge": b.accent }}>
                <span className="ct-badge-dot" />
                {b.label}
              </div>
            ))}
          </div>
          <div className="ct-form-divider" />
          <p className="ct-form-note">
            Prefer email?
            <br />
            <a href={`mailto:${CONTACT_EMAIL}`} className="ct-link">{CONTACT_EMAIL}</a>
          </p>
        </div>

        {/* Right — form */}
        <form ref={formRef} className="ct-form-right" onSubmit={handleSubmit}
          action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="New career application — Algon" />

          {/* Row 1 */}
          <div className="ct-row">
            <Field label="Full Name" required>
              <Input name="name" placeholder="Jane Smith" required value={form.name} onChange={set("name")} />
            </Field>
            <Field label="Email Address" required>
              <Input name="email" type="email" placeholder="jane@email.com" required value={form.email} onChange={set("email")} />
            </Field>
          </div>

          {/* Row 2 */}
          <div className="ct-row">
            <Field label="Phone Number">
              <Input name="phone" type="tel" placeholder="+91 73060 60741" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Role Applying For" required>
              <Select name="role" options={ROLE_OPTIONS} required value={form.role} onChange={set("role")} />
            </Field>
          </div>

          {/* Row 3 */}
          <div className="ct-row">
            <Field label="Years of Experience" required>
              <Select name="experience" options={EXPERIENCE_LEVELS} required value={form.experience} onChange={set("experience")} />
            </Field>
            <Field label="Availability to Join" required>
              <Select name="availability" options={AVAILABILITY} required value={form.availability} onChange={set("availability")} />
            </Field>
          </div>

          {/* Row 4 */}
          <div className="ct-row">
            <Field label="Portfolio / Website">
              <Input name="portfolio" type="url" placeholder="https://yourportfolio.com" value={form.portfolio} onChange={set("portfolio")} />
            </Field>
            <Field label="LinkedIn Profile">
              <Input name="linkedin" type="url" placeholder="https://linkedin.com/in/you" value={form.linkedin} onChange={set("linkedin")} />
            </Field>
          </div>

          {/* Row 5 */}
          <div className="ct-row">
            <Field label="How did you hear about us?">
              <Select name="source" options={SOURCES} value={form.source} onChange={set("source")} />
            </Field>
          </div>

          {/* Cover note */}
          <Field label="Cover Note" required>
            <Textarea name="message"
              placeholder="Tell us why you want to join Algon, what you'd bring to the team, and link to any relevant work you're proud of. Keep it real — no boilerplate."
              required rows={6} value={form.message} onChange={set("message")} />
          </Field>

          {/* Submit */}
          <div className="ct-submit-row">
            <button type="submit" className="ct-submit" disabled={loading}>
              {loading ? (
                <span className="ct-submit-loading">
                  <span className="ct-spinner" />
                  Sending…
                </span>
              ) : (
                <>
                  Submit application
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ marginLeft: 12 }}>
                    <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
            <p className="ct-privacy">
              By submitting you agree to our{" "}
              <a href="/privacy" className="ct-link">Privacy Policy</a>.
              We never share your data.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUCCESS STATE
──────────────────────────────────────────────────────────────────────────── */
function SuccessState() {
  const ref = useRef();
  useEffect(() => {
    gsap.set(ref.current?.children, { autoAlpha: 0, y: 32 });
    gsap.to(ref.current?.children, {
      autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
    });
  }, []);
  return (
    <section className="ct-success-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div ref={ref} className="ct-success-inner">
        <div className="ct-success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="#298dff" strokeWidth="1.2" />
            <path d="M14 24l8 8 12-16" stroke="#298dff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="ct-success-h2">Application received.</h2>
        <p className="ct-success-p">
          We've got your application and we'll be in touch within 48 hours.
          <br />
          In the meantime, feel free to explore our work.
        </p>
        <a href="/work" className="ct-success-btn">View our work →</a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const positionsRef = useRef();
  const formScrollRef = useRef();

  const handleApply = (roleId) => {
    const pos = POSITIONS.find((p) => p.id === roleId);
    if (pos) setSelectedRole(pos.title);
    /* Scroll to form */
    setTimeout(() => {
      formScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleExplore = () => {
    positionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        /* ── Shared tokens ───────────────────────────────────── */
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
        .ab-orb {
          position:absolute; border-radius:50%; pointer-events:none; z-index:0;
        }
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
          text-transform:uppercase; color:rgba(255,255,255,0); margin:0 0 16px;
          display:block;
        }
        .ab-section-title {
          font-size:clamp(32px,4.5vw,66px);
          font-weight:500; line-height:1.05; letter-spacing:-0.02em; color:#fff; margin:0;
        }
        .ab-marq-wrap {
          position:relative; z-index:1;
          border-top:1px solid rgba(255,255,255,0.1);
          border-bottom:1px solid rgba(255,255,255,0.1);
          padding:18px 0; overflow:hidden;
        }
        .ab-marq-track { display:flex; white-space:nowrap; will-change:transform; }
        .ab-marq-item {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.2em;
          text-transform:uppercase; color:rgba(255,255,255,0.4);
          padding:0 28px; display:inline-flex; align-items:center; gap:10px;
        }
        .ab-marq-dot { font-size:7px; color:rgba(255,255,255,0.4); }

        /* ── HERO ───────────────────────────────────────────── */
        .cr-hero {
          position:relative; background:#050508;
          min-height:100vh; display:flex; flex-direction:column;
          justify-content:center; overflow:hidden; 
        }
        .cr-hero-ghost {
          position:absolute; bottom:-2%; right:2vw;
          font-family:'Syne',sans-serif; font-weight:800;
          font-size:clamp(140px,25vw,360px); line-height:0.88;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.03);
          pointer-events:none; z-index:0; user-select:none; letter-spacing:-0.05em;
        }
        .cr-hero-inner {
          position:relative; z-index:1; height:55vh;
          padding:60px 7vw 0; max-width:980px;
        }
        .cr-hero-h1 {
          
          font-size:clamp(52px,11vw,118px); font-weight:400; line-height:0.95;
          letter-spacing:-0.04em; color:#fff; margin:0; display:block;
        }
        .cr-hero-h1--accent {
          display:inline-block;
          background:linear-gradient(135deg, #0050d4 0%, #298dff 50%, #00d4aa 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }
        .cr-hero-sub {
          font-size:clamp(14px,1.25vw,17px); font-weight:300; line-height:1.78;
          color:rgba(255,255,255,0.45); max-width:56ch; margin:28px 0 0;
        }
        .cr-hero-ctas {
          display:flex; align-items:center; gap:24px; margin-top:40px; flex-wrap:wrap;
        }
        .cr-hero-btn {
          display:inline-flex; align-items:center;
          padding:14px 30px; background:rgba(55,55,55,0); color:#fff; border:1px solid rgba(255, 255, 255,1); cursor:pointer;
           font-size:16px; letter-spacing:0.1em;border-radius:999px;
          font-weight:500;
          transition:background 0.25s, transform 0.2s;
        }
        .cr-hero-btn:hover { background:#fff; color:#000; }
        .cr-hero-ghost-btn {
          font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.14em;
          text-transform:uppercase; color:rgba(255,255,255,0.4); text-decoration:none;
          border-bottom:1px solid rgba(255,255,255,0.15);
          padding-bottom:2px; transition:color 0.25s, border-color 0.25s;
        }
        .cr-hero-ghost-btn:hover { color:rgba(255,255,255,0.75); border-color:rgba(255,255,255,0.35); }

        /* Stats bar */
        .cr-hero-stats {
          position:relative; z-index:1;
          display:flex; gap:0;
           justify-content:between; 
          
          margin-top:60px;
        }
        .cr-stat {
          flex:1; padding:24px 7vw 24px;
          
          display:flex; align-items:center;gap:15px;
        }
        .cr-stat:last-child { border-right:none; }
        .cr-stat-num {
          font-family:'Syne',sans-serif; font-size:clamp(24px,4vw,60px);
          font-weight:700; color:#fff; letter-spacing:-0.03em;
        }
        .cr-stat-label {
          display:flex; flex-direction:column; gap:2px;
          font-size:18px; line-height:1.25; letter-spacing:0.1em;
          color:rgba(255,255,255,01);
        }

        /* ── POSITIONS ──────────────────────────────────────── */
        .cr-positions-section {
          position:relative; background:#050508;
          padding:100px 7vw 110px;
          overflow:hidden;
        }
        .cr-orb--pos {
          top:5%; right:-10%; width:55vw; height:55vw; max-width:650px; max-height:650px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.07) 0%,transparent 65%);
        }
        .cr-positions-inner { position:relative; z-index:1; }
        .cr-positions-head { margin-bottom:60px; max-width:640px; }
        .cr-positions-sub {
          font-size:18px; line-height:1.78; font-weight:300;
          color:rgba(255,255,255,0.6); max-width:50ch; margin:16px 0 0;
        }
        .cr-positions-list { display:flex; flex-direction:column; }

        /* Position card */
        .cr-pos-card {
          position:relative; overflow:hidden;
          border-top:1px solid rgba(255,255,255,0.1);
          padding:32px 0;
          transition:background 0.3s;
        }
        .cr-pos-card:last-child { border-bottom:1px solid rgba(255,255,255,0.07); }
        .cr-pos-card:hover { background:rgba(255,255,255,0.012); }
        .cr-pos-top {
          display:flex; justify-content:space-between; align-items:center;
          gap:24px; flex-wrap:wrap;
        }
        .cr-pos-left { display:flex; align-items:center; gap:20px; }
        .cr-pos-accent-dot {
          width:8px; height:8px; border-radius:50%; flex-shrink:0;
          background:var(--pos-accent,#298dff);
          box-shadow:0 0 10px var(--pos-accent,#298dff);
        }
        .cr-pos-title {
          font-size:clamp(18px,2vw,26px);
          font-weight:400; color:#fff; margin:0 0 6px; letter-spacing:-0.02em;
        }
        .cr-pos-meta { display:flex; align-items:center; gap:5px; }
        .cr-pos-badge {
           font-size:15px; font-weight:300;
          color:rgba(255,255,255,1);
           
          
          padding:4px 0px;
        }
        .cr-pos-sep { color:rgba(255,255,255,.8); }
        .cr-pos-location {
          font-size:15px; font-weight:300;
          color:rgba(255,255,255,1);
        }
        .cr-pos-right { display:flex; align-items:center; gap:12px; }
        .cr-pos-expand {
          display:inline-flex; align-items:center; gap:8px;
          padding:10px 20px; background:transparent;
           cursor:pointer;
          font-size:15px; letter-spacing:0.1em;
          color:rgba(255,255,255,0.7);
          transition:all 0.25s;
        }
        .cr-pos-expand:hover {  color:rgba(255,255,255,1) ; }
        .cr-pos-expand-icon { font-size:18px; line-height:1; }
        .cr-pos-apply {
          display:inline-flex; align-items:center;
          padding:11px 28px; background:rgba(0,0,0,0); color:#fff;
          border:1px solid rgba(255,255,255,1); cursor:pointer; border-radius:999px;
          font-size:11px; letter-spacing:0.18em;
          text-transform:uppercase; font-weight:500;
          transition:background 0.25s, transform 0.2s;
        }
        .cr-pos-apply:hover { background:#fff; color:#000;  }

        .cr-pos-tags {
          display:flex; gap:8px; flex-wrap:wrap; margin-top:16px;
        }
        .cr-pos-tag {
           font-size:11px; letter-spacing:0.12em;
           color:rgba(255,255,255,0.8);
          border:1px solid rgba(255,255,255,0.8); padding:4px 10px; border-radius:999px;
        }

        .cr-pos-body { overflow:hidden; padding-left:28px; }
        .cr-pos-summary {
          font-size:15px; line-height:1.78; font-weight:300;
          color:rgba(255,255,255,1); max-width:70ch; margin:20px 0 28px;
        }
        .cr-pos-details-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:0 48px; margin-bottom:28px;
        }
        .cr-pos-detail-head {
           font-size:15px; font-family:Displayfont; letter-spacing:0.1em;
          color:rgba(255,255,255,1); margin:0 0 14px;
        }
        .cr-pos-list { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
        .cr-pos-list-item {
          font-size:15px; line-height:1.68; font-weight:300; color:rgba(255,255,255,1);
          padding-left:16px; position:relative;
        }
        .cr-pos-list-item::before {
          content:'·'; position:absolute; left:0; top:0;
          color:#fff; font-size:15px; line-height:1.68;
        }
        .cr-pos-apply-inline {
          display:inline-flex; align-items:center;
          background:none; border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; font-size:15px; 
           color:var(--pos-accent,#298dff);
          padding:0 0 12px; transition:opacity 0.2s;
        }
        .cr-pos-apply-inline:hover { opacity:0.7; }
        .cr-pos-bar {
          position:absolute; bottom:0; left:0; width:0; height:1px;
          background:#fff;
          transition:width 0.45s ease;
        }
        .cr-pos-card:hover .cr-pos-bar { width:100%; }

        /* ── WHY JOIN ───────────────────────────────────────── */
        .cr-why-section {
          position:relative; background:#050508;
          padding:90px 7vw 110px; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .cr-why-inner { position:relative; z-index:1; }
        .cr-why-head { margin-bottom:56px; }
        .cr-perks-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,0.06);
        }
        .cr-perk-card {
          position:relative; background:#050508; padding:36px 28px;
          overflow:hidden; transition:background 0.3s;
        }
        .cr-perk-card:hover { background:rgba(255,255,255,0.025); }
        .cr-perk-icon {
          width:40px; height:40px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(255,255,255,0.09); margin-bottom:20px;
          color:var(--perk,#298dff);
        }
        .cr-perk-label {
          font-family:'Syne',sans-serif; font-size:clamp(14px,1.3vw,18px);
          font-weight:600; color:#fff; margin:0 0 10px; letter-spacing:-0.01em;
        }
        .cr-perk-detail {
          font-size:14px; line-height:1.72; font-weight:300;
          color:rgba(255,255,255,0.38); margin:0;
        }
        .cr-perk-bar {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:var(--perk,transparent); opacity:0; transition:opacity 0.35s;
        }
        .cr-perk-card:hover .cr-perk-bar { opacity:0.55; }

        /* ── FORM (reused from ContactPage) ────────────────── */
        .ct-form-section {
          position:relative; background:#050508;
          padding:100px 7vw 120px;
          overflow:hidden;
        }
        .ct-orb--form {
          top:10%; left:-8%; width:48vw; height:48vw; max-width:580px; max-height:580px;
          background:radial-gradient(ellipse,rgba(41,141,255,0.07) 0%,transparent 65%);
        }
        .ct-form-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:340px 1fr; gap:0 8vw; align-items:start;
        }
        .ct-form-left { position:sticky; }
        .ct-form-title {
          font-size:clamp(30px,3.7vw,62px); font-weight:500; line-height:1.05;
          letter-spacing:-0.03em; color:#fff; margin:0 0 20px;
        }
        .ct-form-hint {
          font-size:16px; line-height:1.78; font-weight:300;
          color:rgba(255,255,255,0.8); max-width:32ch; margin:0 0 32px;
        }
        .ct-form-badges { display:flex; flex-direction:column; gap:10px; margin-bottom:36px; }
        .ct-badge {
          display:inline-flex; align-items:center; gap:8px;
          font-size:16px; color:rgba(255,255,255,0.8); font-weight:300;
        }
        .ct-badge-dot {
          width:5px; height:5px; border-radius:50%; flex-shrink:0;
          background:var(--badge,#298dff); box-shadow:0 0 6px var(--badge,#298dff);
        }
        .ct-form-divider {
          width:100%; height:1px; background:rgba(255,255,255,0.2); margin:0 0 28px;
        }
        .ct-form-note {
          font-size:15px; line-height:1.7; color:rgba(255,255,255,0.5); margin:0;
        }
        .ct-link {
          color:rgba(255,255,255,0.8); text-decoration:none;
          border-bottom:1px solid rgba(255,255,255,0.5);
          transition:color 0.25s, border-color 0.25s;
        }
        .ct-link:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .ct-form-right { display:flex; flex-direction:column; gap:0; }
        .ct-row {
          display:grid; grid-template-columns:1fr 1fr; gap:0 24px; margin-bottom:0;
        }
        .ct-field { margin-bottom:28px; }
        .ct-label {
          display:block; font-size:15px; color:rgba(255,255,255,0.9); margin-bottom:10px;
        }
        .ct-req { color:#298dff; margin-left:3px; }
        .ct-opt { color:rgba(255,255,255,0.8); font-size:9px; letter-spacing:0.1em; margin-left:6px; }
        .ct-input, .ct-select, .ct-textarea {
          width:100%; background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.6); color:#fff; outline:none;
          font-size:13px; font-weight:300; line-height:1.5;
          transition:border-color 0.25s, background 0.25s;
          -webkit-appearance:none; appearance:none; border-radius:10px;
        }
        .ct-input, .ct-select { padding:14px 16px; border-radius:10px; }
        .ct-textarea { padding:14px 16px; resize:vertical; min-height:120px; }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(255,255,255,0.6); }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color:rgba(41,141,255,0.45); background:rgba(255,255,255,0.04);
          box-shadow:0 0 0 3px rgba(41,141,255,0.07);
        }
        .ct-select-wrap { position:relative; }
        .ct-select { padding-right:40px; cursor:pointer; border-radius:10px; }
        .ct-select option { background:#0a0d18; color:#fff; border-radius:10px; }
        .ct-select-chevron {
          position:absolute; right:14px; top:50%; transform:translateY(-50%);
          width:14px; height:14px; pointer-events:none; color:rgba(255,255,255,0.4);
        }
        .ct-submit-row { display:flex; flex-direction:column; gap:16px; margin-top:8px; }
        .ct-submit {
          display:inline-flex; align-items:center; justify-content:center;
          gap:0; padding:14px 35px; cursor:pointer;border-radius:999px;
          background:rgba(255,255,255,0); color:#fcfcf7; border:1px solid  rgba(255,255,255,1);
          font-size:16px; letter-spacing:0.1em;
          font-weight:400;
          transition:background 0.25s, transform 0.2s;
          align-self:flex-start;
        }
        .ct-submit:hover:not(:disabled) { background:#fcfcf7; color:#000; }
        .ct-submit:disabled { opacity:0.6; cursor:not-allowed; }
        .ct-submit-loading { display:flex; align-items:center; gap:10px; }
        .ct-spinner {
          width:14px; height:14px; border:1.5px solid rgba(5,5,8,0.2);
          border-top-color:#050508; border-radius:50%;
          animation:ct-spin 0.7s linear infinite;
        }
        @keyframes ct-spin { to { transform:rotate(360deg); } }
        .ct-privacy {
          font-size:14px; color:rgba(255,255,255,0.3); margin:0; line-height:1.7;
        }

        /* ── SUCCESS ─────────────────────────────────────────── */
        .ct-success-section {
          position:relative; background:#050508;
          min-height:60vh; display:flex; align-items:center; justify-content:center;
          border-top:1px solid rgba(255,255,255,0.06); overflow:hidden;
        }
        .ct-success-inner {
          position:relative; z-index:1; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:20px;
          padding:80px 7vw;
        }
        .ct-success-h2 {
          font-size:clamp(36px,5vw,72px); font-weight:300; letter-spacing:-0.03em;
          color:#fff; margin:0;
        }
        .ct-success-p {
          font-size:15px; line-height:1.75; font-weight:300;
          color:rgba(255,255,255,0.42); max-width:42ch; margin:0;
        }
        .ct-success-btn {
          display:inline-block; padding:14px 36px;
          border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.7);
          font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.16em;
          text-transform:uppercase; text-decoration:none;
          transition:border-color 0.25s, color 0.25s;
        }
        .ct-success-btn:hover { border-color:rgba(255,255,255,0.5); color:#fff; }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width:1100px) {
          .ct-form-inner { grid-template-columns:1fr; gap:48px; }
          .ct-form-left { position:static; }
          .cr-perks-grid { grid-template-columns:repeat(2,1fr); }
          .cr-pos-details-grid { grid-template-columns:1fr; gap:24px; }
        }
        @media (max-width:768px) {
          .ct-row { grid-template-columns:1fr; }
          .cr-perks-grid { grid-template-columns:1fr; }
          .cr-hero-stats { flex-wrap:wrap; }
          .cr-stat { flex:0 0 50%; border-right:none; border-bottom:1px solid rgba(255,255,255,0.07); }
          .cr-pos-top { flex-direction:column; align-items:flex-start; }
          .cr-pos-right { flex-direction:column; align-items:flex-start; gap:8px; }
          .cr-pos-body { padding-left:0; }
          .cr-pos-tags { padding-left:0; }
        }
        @media (max-width:480px) {
          .cr-pos-right { flex-direction:row; flex-wrap:wrap; }
          .ct-submit { width:100%; justify-content:center; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <CareersHero onExplore={handleExplore} />
        <OpenPositions onApply={handleApply} sectionRef={positionsRef} />
        {/* <WhyJoin /> */}
        <ApplicationForm defaultRole={selectedRole} formRef={formScrollRef} />
        <FAQ_Section/>
        <Footer />
      </div>
    </>
  );
}
