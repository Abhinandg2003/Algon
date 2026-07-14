import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: "01",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement",
        body: "By accessing our website, enquiring about our services, or engaging Algon as a service provider, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
      },
      {
        subtitle: "Changes to these terms",
        body: "We may update these Terms from time to time. Continued use of our services after changes are posted constitutes your acceptance of the revised Terms. We will notify active clients of material changes via email.",
      },
    ],
  },
  {
    id: "02",
    title: "Our Services",
    content: [
      {
        subtitle: "Scope",
        body: "Algon provides digital design, web development, motion design, branding, and related technology services. The exact scope of work for any engagement is defined in a separate Statement of Work or project agreement signed by both parties.",
      },
      {
        subtitle: "Service availability",
        body: "We make reasonable efforts to maintain the availability of our website and any platforms we manage on your behalf, but we do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance wherever possible.",
      },
      {
        subtitle: "Subcontracting",
        body: "Algon may engage trusted subcontractors or freelancers to assist in delivering services. We remain fully responsible for the quality and confidentiality of work performed by any party we engage.",
      },
    ],
  },
  {
    id: "03",
    title: "Client Responsibilities",
    content: [
      {
        subtitle: "Providing materials",
        body: "You are responsible for supplying accurate, complete, and timely information, materials, and approvals required for us to deliver the agreed work. Delays caused by late or incomplete client input may affect project timelines and are not the responsibility of Algon.",
      },
      {
        subtitle: "Lawful use",
        body: "You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of any third party. You are solely responsible for ensuring that any content, assets, or materials you provide to us do not violate applicable laws or third-party rights.",
      },
      {
        subtitle: "Account security",
        body: "If we provide you with login credentials or access to any platform, you are responsible for maintaining their confidentiality. You agree to notify us immediately of any unauthorised access.",
      },
    ],
  },
  {
    id: "04",
    title: "Payments & Fees",
    content: [
      {
        subtitle: "Pricing",
        body: "All fees are agreed upon in writing before work commences. Project quotes are valid for 30 days from the date of issue unless otherwise stated.",
      },
      {
        subtitle: "Payment terms",
        body: "Unless otherwise agreed in writing, projects require a 50% deposit before work begins, with the remaining balance due upon delivery. Retainer engagements are billed monthly in advance.",
      },
      {
        subtitle: "Late payments",
        body: "Invoices not paid within the agreed terms may incur a late fee of 1.5% per month on the outstanding balance. Algon reserves the right to pause or suspend work on accounts with overdue balances until payment is received.",
      },
      {
        subtitle: "Refunds",
        body: "Due to the bespoke nature of our work, deposits and payments for completed work are non-refundable unless Algon fails to deliver the agreed scope. Disputes should be raised in writing within 14 days of delivery.",
      },
    ],
  },
  {
    id: "05",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Ownership of deliverables",
        body: "Upon receipt of full payment, Algon assigns all rights, title, and interest in the final deliverables to the client, unless otherwise agreed in the project contract. This excludes any third-party assets, fonts, or libraries used under their respective licences.",
      },
      {
        subtitle: "Algon's retained rights",
        body: "Algon retains the right to display completed work in its portfolio, case studies, and marketing materials unless the client requests otherwise in writing prior to project completion.",
      },
      {
        subtitle: "Pre-existing materials",
        body: "Any tools, frameworks, templates, or methodologies developed independently by Algon prior to or outside of the client engagement remain the intellectual property of Algon.",
      },
    ],
  },
  {
    id: "06",
    title: "Confidentiality",
    content: [
      {
        subtitle: "Mutual obligations",
        body: "Both parties agree to treat as confidential any proprietary information shared during the engagement. This includes business strategies, technical systems, pricing, and any materials marked as confidential. These obligations survive the termination of the engagement.",
      },
      {
        subtitle: "Exceptions",
        body: "Confidentiality obligations do not apply to information that is publicly available, independently developed, or required to be disclosed by law.",
      },
    ],
  },
  {
    id: "07",
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "No indirect liability",
        body: "To the maximum extent permitted by applicable law, Algon shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of our services, including loss of profits, data, or business opportunities.",
      },
      {
        subtitle: "Cap on liability",
        body: "Our total liability for any claim arising out of or related to these Terms or our services shall not exceed the total fees paid by you to Algon in the three months preceding the claim.",
      },
      {
        subtitle: "No warranty",
        body: "Our services are provided on an 'as is' basis. We make no warranties, express or implied, including warranties of fitness for a particular purpose or non-infringement, beyond what is explicitly agreed in writing.",
      },
    ],
  },
  {
    id: "08",
    title: "Termination",
    content: [
      {
        subtitle: "By either party",
        body: "Either party may terminate an engagement by providing 14 days written notice. Upon termination, you will be invoiced for all work completed to the date of termination, and Algon will deliver all work in progress up to that point.",
      },
      {
        subtitle: "Immediate termination",
        body: "Algon reserves the right to terminate an engagement immediately and without notice if a client engages in unlawful conduct, fails to pay outstanding invoices after reasonable notice, or materially breaches these Terms.",
      },
    ],
  },
  {
    id: "09",
    title: "Governing Law",
    content: [
      {
        subtitle: "Jurisdiction",
        body: "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Kerala, India.",
      },
      {
        subtitle: "Dispute resolution",
        body: "Before initiating any formal legal proceedings, both parties agree to attempt to resolve any dispute in good faith through direct negotiation. If unresolved after 30 days, disputes may be referred to mediation prior to litigation.",
      },
    ],
  },
  {
    id: "10",
    title: "Contact",
    content: [
      {
        subtitle: "Questions",
        body: "If you have any questions about these Terms of Service, please contact us at support@algonsolutions.com. We aim to respond to all enquiries within 2 business days.",
      },
    ],
  },
];

function TermsSection({ section, index }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".tos-animate");
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
    <div ref={ref} className="tos-section">
      <div className="tos-section-left">
        <span className="tos-num tos-animate">{section.id}</span>
        <h2 className="tos-title tos-animate">{section.title}</h2>
      </div>
      <div className="tos-section-right">
        {section.content.map((block, i) => (
          <div key={i} className="tos-block tos-animate">
            <h3 className="tos-subtitle">{block.subtitle}</h3>
            <p className="tos-body">{block.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TermsOfService() {
  const headerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = headerRef.current?.querySelectorAll(".tos-header-el");
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
        .tos-root {
          background: #050508;
          color: #fcfcf7;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }
        .tos-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.016) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .tos-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* Header */
        .tos-header {
          position: relative; z-index: 1;
          padding: 120px 7vw 80px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .tos-header-meta {
          display: flex; align-items: center; gap: 24px;
          margin-bottom: 32px;
        }
        .tos-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .tos-date {
          font-size: 10px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
        }
        .tos-header-rule {
          width: 1px; height: 14px; background: rgba(255,255,255,0.15);
        }
        .tos-page-title {
          font-size: clamp(42px, 7vw, 100px);
          font-weight: 400; line-height: 1;
          letter-spacing: 0.02em; color: #fcfcf7;
          margin: 0 0 28px;
        }
        .tos-page-sub {
          font-size: clamp(13px, 1.1vw, 16px);
          font-weight: 300; line-height: 1.72;
          color: rgba(255,255,255,0.5);
          max-width: 52ch; margin: 0;
        }

        /* Body */
        .tos-body-wrap {
          position: relative; z-index: 1;
          padding: 0 7vw 140px;
        }

        /* Each section row */
        .tos-section {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0 6vw;
          padding: 72px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tos-section:last-child { border-bottom: none; }

        /* Left column */
        .tos-section-left {
          padding-top: 4px;
        }
        .tos-num {
          display: block;
          font-size: 19px; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.6); text-transform: uppercase;
          margin-bottom: 16px;
        }
        .tos-title {
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 400; letter-spacing: -0.02em;
          color: #fcfcf7; margin: 0;
          line-height: 1.2;
        }

        /* Right column */
        .tos-section-right {
          display: flex; flex-direction: column; gap: 40px;
        }
        .tos-block {}
        .tos-subtitle {
          font-size: 18px; letter-spacing: 0.1em; 
          color: rgba(255,255,255,1); margin: 0 0 12px;
          font-weight: 400;
        }
        .tos-body {
          font-size: clamp(14px, 1.05vw, 16px);
          font-weight: 100; line-height: 1.78;
          color: rgba(255,255,255,0.4); margin: 0;
        }

        /* Footer note */
        .tos-footer-note {
          position: relative; z-index: 1;
          padding: 0 7vw 80px;
          font-size: 14px; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
        }
        .tos-footer-note a {
          color: rgba(255,255,255,0.5);
          text-decoration: none; transition: color 0.2s;
        }
        .tos-footer-note a:hover { color: #fcfcf7; }

        /* Responsive */
        @media (max-width: 768px) {
          .tos-section {
            grid-template-columns: 1fr;
            gap: 24px 0;
            padding: 52px 0;
          }
          .tos-section-left {
            display: flex; align-items: baseline; gap: 16px;
          }
          .tos-num { margin-bottom: 0; }
          .tos-header { padding: 100px 6vw 60px; }
          .tos-body-wrap { padding: 0 6vw 100px; }
          .tos-footer-note { padding: 0 6vw 60px; }
        }
      `}</style>

      <div className="tos-root">
        <div className="tos-grid-bg" />
        <div className="tos-grain" />
        <Navbar />

        <header ref={headerRef} className="tos-header">
          <div className="tos-header-meta">
            
            
            
          </div>
          <h1 className="tos-page-title tos-header-el">Terms of<br />Service</h1>
          <p className="tos-page-sub tos-header-el">
            These terms govern your use of Algon's website and services.
            Please read them carefully. By working with us, you agree to
            everything outlined here.
          </p>
        </header>

        <div className="tos-body-wrap">
          {SECTIONS.map((section, i) => (
            <TermsSection key={section.id} section={section} index={i} />
          ))}
        </div>

        <p className="tos-footer-note">
          Questions about these Terms? Write to us at{" "}
          <a href="mailto:support@algonsolutions.com">support@algonsolutions.com</a>
          {" "}— we'll respond within 2 business days.
        </p>

        <Footer />
      </div>
    </>
  );
}