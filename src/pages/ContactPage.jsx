/**
 * ContactPage.jsx
 *
 * Premium contact page — matches Algon aesthetic exactly.
 *
 * Sections:
 *   1. Hero              — animated reveal, neon grid, ghost text
 *   2. Contact Form      — full client intake with GSAP entrance
 *   3. Info Strip        — office details, social links
 *   4. FAQ               — accordion with smooth animation
 *
 * Form: powered by web3forms.com
 * DEPS: gsap (ScrollTrigger), react (useState, useRef, useEffect)
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import animationData from "/src/assets/Circuit.json";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   CONFIG — swap these once
──────────────────────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "db3407a5-1cdc-4065-8095-f274d79c7e9a";
const CONTACT_EMAIL = "support@algonsolutions.com";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "SaaS Product",
  "AI & Automation",
  "UI/UX Design",
  "E-commerce",
  "Web3 / Blockchain",
  "Cybersecurity",
  "AR / VR",
  "Digital Marketing",
  "Other",
];

const BUDGETS = [
  "$1,000 – $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

const TIMELINES = [
  "ASAP (< 1 month)",
  "1 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12+ months",
  "Flexible",
];

const SOURCES = [
  "Google Search",
  "LinkedIn",
  "Twitter / X",
  "Referral",
  "Behance / Dribbble",
  "Instagram",
  "Other",
];

const INFO = [
  {
    label: "Email us",
    value: "support@algonsolutions.com",
    href: "support@algonsolutions.com",
    accent: "#4a6fff",
    icon: `<path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M2 8l10 6 10-6" stroke="currentColor" stroke-width="1.4" fill="none"/>`,
  },
  {
    label: "Call us",
    value: "+91 73060 60741",
    href: "tel:+91 73060 60741",
    accent: "#00d4aa",
    icon: `<path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.55.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" stroke="currentColor" stroke-width="1.4" fill="none"/>`,
  },
  {
    label: "Our studio",
    value: "Kerala, India",
    href: "#",
    accent: "#f59e0b",
    icon: `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.4" fill="none"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.4" fill="none"/>`,
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", accent: "#4a6fff" },
  { label: "Twitter / X", href: "#", accent: "#00d4aa" },
  { label: "Behance", href: "#", accent: "#f43f5e" },
  { label: "Instagram", href: "#", accent: "#a855f7" },
  { label: "GitHub", href: "#", accent: "#22d3ee" },
];

const FAQS = [
  {
    q: "How does the engagement process start?",
    a: "After you submit the form, we review your brief within 24 hours and schedule a 45-minute discovery call. From there, we put together a detailed proposal with scope, timeline, and investment.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — some of our best work has been with pre-seed and seed companies. We're experienced at moving fast with limited resources without compromising on quality.",
  },
  {
    q: "Can we see a portfolio or case studies?",
    a: "Absolutely. We share relevant case studies during the discovery call, and selected work is on our website. We're happy to provide references from past clients under NDA.",
  },
  {
    q: "What does your typical engagement look like?",
    a: "Most projects run 3–6 months for an MVP, with ongoing retainer options thereafter. We embed closely with your team — weekly check-ins, async Slack updates, and full visibility into delivery.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always — before any material information is shared. We treat your idea with the same care we'd want for our own.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. HERO
──────────────────────────────────────────────────────────────────────────── */
function ContactHero() {
  const heroRef = useRef();
  const eyebrowRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const subRef = useRef();
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
        [
          eyebrowRef.current,
          line1Ref.current,
          line2Ref.current,
          subRef.current,
        ],
        { autoAlpha: 0, y: 60 },
      );
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(
        eyebrowRef.current,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0,
      )
        .to(
          line1Ref.current,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" },
          0.1,
        )
        .to(
          line2Ref.current,
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power4.out" },
          0.2,
        )
        .to(
          subRef.current,
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.4,
        );

      return () => cancelAnimationFrame(raf);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="ct-hero">
      <div className="ab-grid-neon" />
      <div className="ab-grain" />
      <div className="ab-orb ab-orb--hero-r" />
      <div className="ab-orb ab-orb--hero-l" />

      {/* Ghost text */}
      <div className="ct-hero-ghost" aria-hidden="true">
        TALK
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-[7vw] h-[75vh] overflow-visible">
        <div className="flex-col justify-center mt-10">
          <p ref={eyebrowRef} className="ab-eyebrow">
            Get in touch
          </p>
          <h1 ref={line1Ref} className="ct-hero-h1">
            Let's build 
          </h1>
          <h1 ref={line2Ref} className="ct-hero-h1 ">
            something great.
          </h1>
          <p ref={subRef} className="ct-hero-sub">
            We take on a select number of new projects each quarter. Tell us
            what you're working on — we'll come back within 24 hours.
          </p>
        </div>
        <div className="">
            <div className="   h-[90vh] md:h-[5vh] overflow-visible flex justify-center items-center ">
              <Lottie animationData={animationData} />
            </div>
          </div>
      </div>

      {/* Marquee */}
      <div className="ab-marq-wrap">
        <div ref={marqRef} className="ab-marq-track">
          {[...Array(4)].map((_, g) =>
            [
              "Discovery Call",
              "Proposal in 48h",
              "NDA First",
              "Senior Talent Only",
              "Fixed-Price Available",
              "Ongoing Retainers",
              "Kerala",
              "India",
            ].map((s, i) => (
              <span key={`${g}-${i}`} className="ab-marq-item">
                {s}
                <span className="ab-marq-dot">◆</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FORM FIELD PRIMITIVES
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

function Input({
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}) {
  return (
    <input
      className="ct-input"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
}

function Select({ name, options, required, value, onChange }) {
  return (
    <div className="ct-select-wrap">
      <select
        className="ct-select"
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg className="ct-select-chevron" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Textarea({ name, placeholder, required, value, onChange, rows = 5 }) {
  return (
    <textarea
      className="ct-textarea"
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICE CHIPS — multi-select
──────────────────────────────────────────────────────────────────────────── */
function ServiceChips({ selected, onChange }) {
  const toggle = (svc) => {
    if (selected.includes(svc)) onChange(selected.filter((s) => s !== svc));
    else onChange([...selected, svc]);
  };
  return (
    <div className="ct-chips">
      {SERVICES.map((svc) => (
        <button
          key={svc}
          type="button"
          className={`ct-chip ${selected.includes(svc) ? "ct-chip--on" : ""}`}
          onClick={() => toggle(svc)}
        >
          {svc}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. CONTACT FORM
──────────────────────────────────────────────────────────────────────────── */
function ContactForm() {
  const sectionRef = useRef();
  const formRef = useRef();
  const leftRef = useRef();
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    timeline: "",
    source: "",
    message: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { autoAlpha: 0, x: -32 });
      gsap.to(leftRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
      });

      const fields = sectionRef.current?.querySelectorAll(
        ".ct-field, .ct-chips-label, .ct-submit-row",
      );
      fields?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 28 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.055,
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
    data.append("services", services.join(", ") || "Not specified");
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `New project inquiry from ${form.name}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
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

  return (
    <section ref={sectionRef} className="ct-form-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ab-orb ct-orb--form" />

      <div className="ct-form-inner">
        {/* Left — context */}
        <div ref={leftRef} className="ct-form-left">
          <p className="ab-eyebrow">Start a project</p>
          <h2 className="ct-form-title">
            Tell us about <br /> your vision.
            <br />
          </h2>
          <p className="ct-form-hint">
            The more detail you give us, the better we can tailor the proposal.
            All information is kept strictly confidential.
          </p>

          <div className="ct-form-badges">
            {[
              { label: "Response within 24h", accent: "#4a6fff" },
              { label: "NDA on request", accent: "#00d4aa" },
              { label: "No obligations", accent: "#f59e0b" },
            ].map((b) => (
              <div
                key={b.label}
                className="ct-badge"
                style={{ "--badge": b.accent }}
              >
                <span className="ct-badge-dot" />
                {b.label}
              </div>
            ))}
          </div>

          <div className="ct-form-divider" />

          <p className="ct-form-note">
            Prefer to email directly?
            <br />
            <a href={`mailto:${CONTACT_EMAIL}`} className="ct-link">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        {/* Right — form */}
        <form
          ref={formRef}
          className="ct-form-right"
          onSubmit={handleSubmit}
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="New project inquiry — Algon"
          />

          {/* Row 1 */}
          <div className="ct-row">
            <Field label="Full Name" required>
              <Input
                name="name"
                placeholder="Jane Smith"
                required
                value={form.name}
                onChange={set("name")}
              />
            </Field>
            <Field label="Work Email" required>
              <Input
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                value={form.email}
                onChange={set("email")}
              />
            </Field>
          </div>

          {/* Row 2 */}
          <div className="ct-row">
            <Field label="Company / Organisation">
              <Input
                name="company"
                placeholder="Acme Inc."
                value={form.company}
                onChange={set("company")}
              />
            </Field>
            <Field label="Phone Number">
              <Input
                name="phone"
                type="tel"
                placeholder="+1 555 000 0000"
                value={form.phone}
                onChange={set("phone")}
              />
            </Field>
          </div>

          {/* Services */}
          <div
            className="ct-chips-label ab-eyebrow"
            style={{ marginBottom: 14 }}
          >
            Services needed (select all that apply)
          </div>
          <ServiceChips selected={services} onChange={setServices} />

          {/* Row 3 */}
          <div className="ct-row" style={{ marginTop: 32 }}>
            <Field label="Estimated Budget" required>
              <Select
                name="budget"
                options={BUDGETS}
                required
                value={form.budget}
                onChange={set("budget")}
              />
            </Field>
            <Field label="Desired Timeline" required>
              <Select
                name="timeline"
                options={TIMELINES}
                required
                value={form.timeline}
                onChange={set("timeline")}
              />
            </Field>
          </div>

          {/* Row 4 */}
          <div className="ct-row">
            <Field label="How did you hear about us?">
              <Select
                name="source"
                options={SOURCES}
                value={form.source}
                onChange={set("source")}
              />
            </Field>
          </div>

          {/* Message */}
          <Field label="Project Brief" required>
            <Textarea
              name="message"
              placeholder="Describe the problem you're solving, what you've tried so far, your target users, and what success looks like for this project..."
              required
              rows={6}
              value={form.message}
              onChange={set("message")}
            />
          </Field>

          {/* File */}
          {/* <div className="ct-field ct-file-field">
            <label className="ct-label">
              Attach a document <span className="ct-opt">(optional)</span>
            </label>
            <label className="ct-file-drop">
              <input
                type="file"
                name="attachment"
                accept=".pdf,.doc,.docx,.png,.jpg,.zip"
                className="ct-file-input"
              />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Drop file here or click to browse</span>
              <span className="ct-file-types">
                PDF, DOC, PNG, JPG, ZIP — max 25 MB
              </span>
            </label>
          </div> */}

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
                  Send enquiry
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    style={{ marginLeft: 12 }}
                  >
                    <path
                      d="M1 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
            <p className="ct-privacy">
              By submitting you agree to our{" "}
              <a href="/privacy" className="ct-link">
                Privacy Policy
              </a>
              . We never share your data.
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
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
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
            <path
              d="M14 24l8 8 12-16"
              stroke="#298dff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="ct-success-h2">Message received.</h2>
        <p className="ct-success-p">
          We've got your brief and we'll be in touch within 24 hours.
          <br />
          In the meantime, feel free to explore our work.
        </p>
        <a href="/work" className="ct-success-btn">
          View our work →
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. INFO STRIP
──────────────────────────────────────────────────────────────────────────── */
function InfoStrip() {
  const ref = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(
        ".ct-info-card, .ct-social-item",
      );
      items?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 28 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ct-info-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ct-info-inner">
        {/* Contact cards */}
        <div className="ct-info-grid">
          {INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="ct-info-card"
              style={{ "--accent": item.accent }}
            >
              <div className="ct-info-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
              </div>
              <p className="ct-info-label">{item.label}</p>
              <p className="ct-info-value">{item.value}</p>
              <div className="ct-info-bar" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="ct-info-divider" />

        {/* Socials */}
        <div className="ct-social-row">
          <p className="ab-eyebrow" style={{ marginBottom: 0 }}>
            Follow our work
          </p>
          <div className="ct-social-list">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="ct-social-item"
                style={{ "--accent": s.accent }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
                <span className="ct-social-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. FAQ
──────────────────────────────────────────────────────────────────────────── */
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef();
  const arrowRef = useRef();

  useEffect(() => {
    if (open) {
      gsap.to(bodyRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(arrowRef.current, {
        rotation: 45,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [open]);

  return (
    <div className={`ct-faq-item ${open ? "ct-faq-item--open" : ""}`}>
      <button className="ct-faq-q" onClick={() => setOpen(!open)}>
        <span>{item.q}</span>
        <span ref={arrowRef} className="ct-faq-arrow">
          +
        </span>
      </button>
      <div
        ref={bodyRef}
        className="ct-faq-body"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="ct-faq-a">{item.a}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const ref = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(ref.current?.querySelector(".ct-faq-head"), {
        autoAlpha: 0,
        y: 28,
      });
      gsap.to(ref.current?.querySelector(".ct-faq-head"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ct-faq-section">
      <div className="ab-grid-bg" />
      <div className="ab-grain" />
      <div className="ct-faq-inner">
        <div className="ct-faq-head">
          <h2 className="ab-section-title">
            Common questions. <br /> Honest answers.
            <br />
          </h2>
        </div>
        <div className="ct-faq-list">
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <style>{`
        /* ── Shared tokens (match AboutPage) ─────────────────── */
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
          font-weight:400; line-height:1.05; letter-spacing:-0.03em; color:#fff; margin:0;
        }
        .ab-marq-wrap {
          position:relative; z-index:1;
          border-top:1px solid rgba(255,255,255,0.2);  border-bottom:1px solid rgba(255,255,255,0.2); padding:18px 0; overflow:hidden;
        }
        .ab-marq-track { display:flex; white-space:nowrap; will-change:transform; }
        .ab-marq-item {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.2em;
          text-transform:uppercase; color:rgba(255,255,255,0.4);
          padding:0 28px; display:inline-flex; align-items:center; gap:10px;
        }
        .ab-marq-dot { font-size:7px; color:rgba(255,255,255,0.4); }

        /* ── Gold gradient util ──────────────────────────────── */
        .ct-gold {
          background:linear-gradient(135deg, #0050d4 0%, #298dff 50%, #0050d4 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; font-weight:300;
        }
        .ct-gold--light { font-weight:200; }

        /* ── HERO ────────────────────────────────────────────── */
        .ct-hero {
          position:relative; background:#050508;
          min-height:78vh; display:flex; flex-direction:column;
          justify-content:center; overflow:hidden; padding-top:88px;
        }
        .ct-hero-ghost {
          position:absolute; bottom:0; right:3vw;
          font-family:'Syne',sans-serif; font-weight:800;
          font-size:clamp(120px,22vw,320px); line-height:0.88;
          color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.035);
          pointer-events:none; z-index:0; user-select:none; letter-spacing:-0.05em;
        }
        .ct-hero-inner {
          position:relative; z-index:1;
          padding:40px 7vw 48px; max-width:900px;
        }
        .ct-hero-h1 {
          font-size:clamp(52px,12vw,120px); font-weight:400; line-height:0.96;
          letter-spacing:-0.04em; color:#fff; margin:0; display:block;
        }
        .ct-hero-h1--gold {
  display: inline-block;
  padding-bottom: 0.2em;

  background: linear-gradient(  
    135deg,
    #0050d4 0%,
    #298dff 50%,
    #0050d4 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
        .ct-hero-sub {
          font-size:clamp(14px,1.2vw,17px); font-weight:300; line-height:1.76;
          color:rgba(255,255,255,0); max-width:50ch; margin:0;
        }

        /* ── FORM SECTION ────────────────────────────────────── */
        .ct-form-section {
          position:relative; background:#050508;
          padding:100px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
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
        .ct-form-left { position:sticky; top:100px; }
        .ct-form-title {
          font-size:clamp(30px,3.5vw,52px); font-weight:400; line-height:1.05;
          letter-spacing:-0.03em; color:#fff; margin:0 0 20px;
        }
        .ct-form-hint {
          font-size:16px; line-height:1.78; font-weight:300;
          color:rgba(255,255,255,0.5); max-width:32ch; margin:0 0 32px;
        }
        .ct-form-badges { display:flex; flex-direction:column; gap:10px; margin-bottom:36px; }
        .ct-badge {
          display:inline-flex; align-items:center; gap:8px;
          font-size:15px;  
          color:rgba(255,255,255,0.5); font-weight:300;
        } 
        .ct-badge-dot {
          width:5px; height:5px; border-radius:50%; flex-shrink:0;
          background:var(--badge,#298dff);
          box-shadow:0 0 6px var(--badge,#298dff);
        }
        .ct-form-divider {
          width:100%; height:1px; background:rgba(255,255,255,0.07); margin:0 0 28px;
        }
        .ct-form-note {
          font-size:15px; line-height:1.7; color:rgba(255,255,255,0.3); margin:0;
        }
        .ct-link {
          color:rgba(255,255,255,0.65); text-decoration:none;
          border-bottom:1px solid rgba(255,255,255,0.15);
          transition:color 0.25s, border-color 0.25s;
        }
        .ct-link:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .ct-form-right { display:flex; flex-direction:column; gap:0; }

        /* ── Form fields ─────────────────────────────────────── */
        .ct-row {
          display:grid; grid-template-columns:1fr 1fr; gap:0 24px; margin-bottom:0;
        }
        .ct-field { margin-bottom:28px; }
        .ct-label {
          display:block; font-size:15px;
          color:rgba(255,255,255,0.7); margin-bottom:10px;
        }
        .ct-req { color:#298dff; margin-left:3px; }
        .ct-opt { color:rgba(255,255,255,0.4); font-size:9px; letter-spacing:0.1em; margin-left:6px; }
        .ct-input, .ct-select, .ct-textarea {
          width:100%; background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.2);
          color:#fff; outline:none;
         font-size:13px; font-weight:300;
          line-height:1.5;
          transition:border-color 0.25s, background 0.25s;
          -webkit-appearance:none; appearance:none; border-radius:10px;
        }
        .ct-input, .ct-select { padding:14px 16px;  border-radius:10px; }
        .ct-textarea { padding:14px 16px; resize:vertical; min-height:120px; }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(255,255,255,0.4); }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color:rgba(41,141,255,0.45); background:rgba(255,255,255,0.04);
          box-shadow:0 0 0 3px rgba(41,141,255,0.07);
        }

        /* Select */
        .ct-select-wrap { position:relative;  }
        .ct-select { padding-right:40px; cursor:pointer; border-radius:10px; }
        .ct-select option { background:#0a0d18; color:#fff;  border-radius:10px; }
        .ct-select-chevron {
          position:absolute; right:14px; top:50%; transform:translateY(-50%);
          width:14px; height:14px; pointer-events:none;
          color:rgba(255,255,255,0.4);
        }

        /* Service chips */
        .ct-chips-label { margin-bottom:12px !important; }
        .ct-chips {
          display:flex; flex-wrap:wrap; gap:8px; margin-bottom:0;
        }
        .ct-chip {
          padding:8px 16px;
          border:1px solid rgba(255,255,255,0.3);
          border-radius:20px;
          background:rgba(255,255,255,0.02);
          color:rgba(255,255,255,0.45);
           font-size:12px; letter-spacing:0.1em;
           cursor:pointer;
          transition:all 0.22s;
        }
        .ct-chip:hover {
          border-color:rgba(41,141,255,0.35); color:rgba(255,255,255,0.75);
          background:rgba(216,132,0,0.05);
        }
        .ct-chip--on {
          border-color:rgba(41,141,255,0.65) !important;
          background:rgba(41,141,255,1) !important;
          color:#000 !important;
          box-shadow:0 0 12px rgba(41,141,255,0.12);
        }

        /* File */
        .ct-file-field { margin-bottom:28px; }
        .ct-file-drop {
          display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius:10px;
          gap:8px; padding:32px 24px;
          border:1px dashed rgba(255,255,255,0.2);
          background:rgba(255,255,255,0.02); cursor:pointer;
          transition:border-color 0.25s, background 0.25s;
          font-family:'DM Sans',sans-serif; font-size:12px;
          color:rgba(255,255,255,0.32); text-align:center;
        }
        .ct-file-drop:hover { border-color:rgba(41,141,255,0.3); background:rgba(41,141,255,0.04); }
        .ct-file-types { font-size:10px; letter-spacing:0.1em; color:rgba(255,255,255,0.18); }
        .ct-file-input { display:none; }

        /* Submit */
        .ct-submit-row { display:flex; flex-direction:column; gap:16px; margin-top:8px; }
        .ct-submit {
          display:inline-flex; align-items:center; justify-content:center;
          gap:0; padding:18px 44px; cursor:pointer;
          background:#fff; color:#050508; border:none;
          font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.18em;
          text-transform:uppercase; font-weight:500;
          transition:background 0.25s, transform 0.2s;
          align-self:flex-start;
        }
        .ct-submit:hover:not(:disabled) { background:#298dff; transform:translateY(-1px); }
        .ct-submit:disabled { opacity:0.6; cursor:not-allowed; }
        .ct-submit-loading { display:flex; align-items:center; gap:10px; }
        .ct-spinner {
          width:14px; height:14px; border:1.5px solid rgba(5,5,8,0.2);
          border-top-color:#050508; border-radius:50%;
          animation:ct-spin 0.7s linear infinite;
        }
        @keyframes ct-spin { to { transform:rotate(360deg); } }
        .ct-privacy {
          font-size:13px; color:rgba(255,255,255,0.22); margin:0; line-height:1.7;
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
        .ct-success-icon { margin-bottom:8px; }
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

        /* ── INFO STRIP ──────────────────────────────────────── */
        .ct-info-section {
          position:relative; background:#050508;
          padding:90px 7vw 100px; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .ct-info-inner { position:relative; z-index:1; }
        .ct-info-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:1px; background:rgba(255,255,255,0.06); margin-bottom:60px;
        }
        .ct-info-card {
          position:relative; background:#050508; padding:36px 28px;
          text-decoration:none; overflow:hidden;
          transition:background 0.3s;
        }
        .ct-info-card:hover { background:rgba(255,255,255,0.025); }
        .ct-info-icon {
          width:40px; height:40px; display:flex; align-items:center; justify-content:center;
          border:1px solid rgba(255,255,255,0.09); margin-bottom:20px;
          color:var(--accent,#298dff);
        }
        .ct-info-label {
          font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.22em;
          text-transform:uppercase; color:rgba(255,255,255,0.28); margin:0 0 8px;
        }
        .ct-info-value {
          font-family:'Syne',sans-serif; font-size:clamp(14px,1.4vw,18px);
          font-weight:300; color:#fff; margin:0;
        }
        .ct-info-bar {
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background:var(--accent,transparent); opacity:0; transition:opacity 0.35s;
        }
        .ct-info-card:hover .ct-info-bar { opacity:0.55; }
        .ct-info-divider {
          width:100%; height:1px; background:rgba(255,255,255,0.07); margin-bottom:36px;
        }
        .ct-social-row {
          display:flex; align-items:center; gap:32px; flex-wrap:wrap;
        }
        .ct-social-list { display:flex; gap:4px; flex-wrap:wrap; }
        .ct-social-item {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 18px; border:1px solid rgba(255,255,255,0.08);
           font-size:11px; letter-spacing:0.14em;
          text-transform:uppercase; text-decoration:none;
          color:rgba(255,255,255,0.38);
          transition:all 0.25s;
        }
        .ct-social-item:hover {
          border-color:var(--accent,rgba(255,255,255,0.2));
          color:var(--accent,rgba(255,255,255,0.7));
          background:rgba(255,255,255,0.02);
        }
        .ct-social-arrow { font-size:10px; }

        /* ── FAQ ─────────────────────────────────────────────── */
        .ct-faq-section {
          position:relative; background:#050508;
          padding:90px 7vw 120px; border-top:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }
        .ct-faq-inner {
          position:relative; z-index:1;
          display:grid; grid-template-columns:360px 1fr; gap:0 8vw; 
        }
        .ct-faq-head { position:sticky; top:100px; height:fit-content; }
        .ct-faq-list { display:flex; flex-direction:column; }
        .ct-faq-item {
          border-bottom:1px solid rgba(255,255,255,0.07);
        }
        .ct-faq-q {
          display:flex; justify-content:space-between; align-items:center;
          width:100%; padding:24px 0; background:none; border:none; cursor:pointer;
          font-family:'Syne',sans-serif; font-size:clamp(14px,1.3vw,18px);
          font-weight:300; color:#fff; text-align:left; gap:20px;
          transition:color 0.25s;
        }
        .ct-faq-q:hover { color:rgba(255,255,255,0.75); }
        .ct-faq-item--open .ct-faq-q { color:#298dff; }
        .ct-faq-arrow {
          flex-shrink:0; font-size:22px; color:rgba(255,255,255,0.3);
          display:inline-block; line-height:1;
        }
        .ct-faq-item--open .ct-faq-arrow { color:#298dff; }
        .ct-faq-body { overflow:hidden; }
        .ct-faq-a {
          font-family:'DM Sans',sans-serif; font-size:14px; line-height:1.8;
          font-weight:300; color:rgba(255,255,255,0.45); margin:0; padding-bottom:24px;
          max-width:60ch;
        }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width:1100px) {
          .ct-form-inner { grid-template-columns:1fr; gap:48px; }
          .ct-form-left { position:static; }
          .ct-faq-inner { grid-template-columns:1fr; }
          .ct-faq-head { position:static; margin-bottom:40px; }
        }
        @media (max-width:768px) {
          .ct-row { grid-template-columns:1fr; }
          .ct-info-grid { grid-template-columns:1fr; }
          .ct-social-row { flex-direction:column; align-items:flex-start; gap:20px; }
          .ct-hero-h1 { font-size:clamp(44px,12vw,80px); }
        }
        @media (max-width:480px) {
          .ct-chips { gap:6px; }
          .ct-chip { font-size:10px; padding:7px 12px; }
          .ct-submit { width:100%; justify-content:center; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff", minHeight: "100vh" }}>
        <Navbar />
        <ContactHero />
        <ContactForm />
        {/* <InfoStrip /> */}
        <FaqSection />
        <Footer />
      </div>
    </>
  );
}