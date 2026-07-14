import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: "01",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide",
        body: "When you contact us, fill out a form, or engage our services, we collect information you voluntarily provide — including your name, email address, company name, and any project details you share with us.",
      },
      {
        subtitle: "Information collected automatically",
        body: "When you visit our website, we automatically collect certain technical data including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This data is collected via cookies and similar tracking technologies.",
      },
      {
        subtitle: "Communications",
        body: "If you communicate with us via email or other channels, we retain those communications and any information contained within them to better serve you and improve our processes.",
      },
    ],
  },
  {
    id: "02",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "To deliver our services",
        body: "We use your information to provide the services you've requested, manage our client relationships, send project updates, and respond to your enquiries in a timely and effective manner.",
      },
      {
        subtitle: "To improve our work",
        body: "Aggregated and anonymised data helps us understand how our website is used, identify areas of improvement, and make informed decisions about our products and services.",
      },
      {
        subtitle: "Marketing communications",
        body: "With your consent, we may send you updates about our work, case studies, or services we think may be relevant to you. You can opt out of these communications at any time.",
      },
    ],
  },
  {
    id: "03",
    title: "Data Sharing & Disclosure",
    content: [
      {
        subtitle: "We don't sell your data",
        body: "Algon does not sell, rent, or trade your personal information to any third party. Full stop.",
      },
      {
        subtitle: "Service providers",
        body: "We may share information with trusted third-party service providers who assist us in operating our website and delivering our services — such as hosting providers, analytics platforms, and project management tools. These providers are contractually obligated to handle your data securely.",
      },
      {
        subtitle: "Legal requirements",
        body: "We may disclose your information if required by law, court order, or other governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.",
      },
    ],
  },
  {
    id: "04",
    title: "Data Retention",
    content: [
      {
        subtitle: "How long we keep your data",
        body: "We retain personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Client project data is typically retained for a minimum of 3 years after project completion.",
      },
      {
        subtitle: "Requesting deletion",
        body: "You may request the deletion of your personal data at any time by contacting us at support@algonsolutions.com. We will process your request within 30 days, subject to any legal obligations we may have to retain certain information.",
      },
    ],
  },
  {
    id: "05",
    title: "Cookies",
    content: [
      {
        subtitle: "What we use cookies for",
        body: "Our website uses essential cookies to function correctly, and optional analytics cookies to understand visitor behaviour. We do not use advertising or tracking cookies.",
      },
      {
        subtitle: "Managing cookies",
        body: "You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.",
      },
    ],
  },
  {
    id: "06",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & portability",
        body: "You have the right to request a copy of the personal data we hold about you, and to receive it in a portable, machine-readable format where technically feasible.",
      },
      {
        subtitle: "Correction & objection",
        body: "You have the right to correct inaccurate data, object to certain types of processing, and withdraw consent at any time where processing is based on consent.",
      },
      {
        subtitle: "How to exercise your rights",
        body: "To exercise any of the above rights, please contact us at support@algonsolutions.com. We will respond to all requests within 30 days.",
      },
    ],
  },
  {
    id: "07",
    title: "Security",
    content: [
      {
        subtitle: "How we protect your data",
        body: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission, access controls, and regular security reviews.",
      },
      {
        subtitle: "Breach notification",
        body: "In the event of a data breach that affects your rights and freedoms, we will notify you and the relevant supervisory authority as required by applicable law.",
      },
    ],
  },
  {
    id: "08",
    title: "Contact",
    content: [
      {
        subtitle: "Get in touch",
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us at support@algonsolutions.com. We take all privacy matters seriously and will respond promptly.",
      },
    ],
  },
];

function PolicySection({ section, index }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".pp-animate");
      gsap.set(els, { autoAlpha: 0, y: 22 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pp-section">
      <div className="pp-section-left">
        <span className="pp-num pp-animate">{section.id}</span>
        <h2 className="pp-title pp-animate">{section.title}</h2>
      </div>
      <div className="pp-section-right">
        {section.content.map((block, i) => (
          <div key={i} className="pp-block pp-animate">
            <h3 className="pp-subtitle">{block.subtitle}</h3>
            <p className="pp-body">{block.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const headerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = headerRef.current?.querySelectorAll(".pp-header-el");
      gsap.set(els, { autoAlpha: 0, y: 28 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .pp-root {
          background: #050508;
          color: #fcfcf7;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }
        .pp-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .pp-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Header */
        .pp-header {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 72px 7vw 60px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .pp-header-meta {
          display: flex; align-items: center; gap: 24px;
          margin-bottom: 32px;
        }
        .pp-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .pp-date {
          font-size: 10px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
        }
        .pp-header-rule {
          width: 1px; height: 14px; background: rgba(255,255,255,0.15);
        }
        .pp-page-title {
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 400; line-height: 0.96;
          letter-spacing: -0.04em; color: #fff;
          margin: 0 0 32px;
        }
        .pp-page-sub {
          font-size: clamp(13px, 1.1vw, 18px);
          font-weight: 300; line-height: 1.72;
          color: rgba(255,255,255,0.6);
          max-width: 52ch; margin: 0;
        }

        /* Body */
        .pp-body-wrap {
          position: relative; z-index: 1;
          padding: 0 7vw 140px;
        }

        /* Each section row */
        .pp-section {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0 6vw;
          padding: 72px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pp-section:last-child { border-bottom: none; }

        /* Left column */
        .pp-section-left {
          padding-top: 4px;
        }
        .pp-num {
          display: block;
          font-size: 22px; letter-spacing: 0.06em;
          color: rgba(255,255,255,1); text-transform: uppercase;
          margin-bottom: 16px;
        }
        .pp-title {
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 500; letter-spacing: -0.005em;
          color: #fcfcf7; margin: 0;
          line-height: 1.2;
        }

        /* Right column */
        .pp-section-right {
          display: flex; flex-direction: column; gap: 40px;
        }
        .pp-block {}
        .pp-subtitle {
          font-size: 20px; letter-spacing: 0.04em;
          color: rgba(255,255,255,1); margin: 0 0 12px;
          font-weight: 400;
        }
        .pp-body {
          font-size: clamp(14px, 1.08vw, 18px);
          font-weight: 300; line-height: 1.78;  
          color: rgba(255,255,255,0.7); margin: 0;
        }

        /* Footer note */
        .pp-footer-note {
          position: relative; z-index: 1;
          padding: 0 7vw 80px;
          font-size: 14px; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
        }
        .pp-footer-note a {
          color: rgba(255,255,255,0.8);
          text-decoration: none; transition: color 0.2s;
        }
        .pp-footer-note a:hover { color: #fcfcf7; }

        /* Responsive */
        @media (max-width: 768px) {
          .pp-section {
            grid-template-columns: 1fr;
            gap: 24px 0;
            padding: 52px 0;
          }
          .pp-section-left {
            display: flex; align-items: baseline; gap: 16px;
          }
          .pp-num { margin-bottom: 0; }
          .pp-header { min-height: 80vh; padding: 100px 6vw 60px; }
          .pp-body-wrap { padding: 0 6vw 100px; }
          .pp-footer-note { padding: 0 6vw 60px; }
        }
      `}</style>

      <div className="pp-root">

        <Navbar />

        <header ref={headerRef} className="pp-header">
          <div className="pp-header-meta">
            
          </div>
          <h1 className="pp-page-title pp-header-el">Privacy<br />Policy</h1>
          <p className="pp-page-sub pp-header-el">
            This policy explains what information we collect, why we collect it,
            and how we use and protect it. We believe in clarity — no legal
            gymnastics, no hidden clauses.
          </p>
        </header>

        <div className="pp-body-wrap">
          {SECTIONS.map((section, i) => (
            <PolicySection key={section.id} section={section} index={i} />
          ))}
        </div>

        <p className="pp-footer-note">
          Questions about this policy? Write to us at{" "}
          <a href="mailto:support@algonsolutions.com">support@algonsolutions.com</a>
          {" "}— we'll respond within 2 business days.
        </p>

        <Footer />
      </div>
    </>
  );
}
