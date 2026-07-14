import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = [
  {
    q: "What core services does Algon Solutions provide?",
    a: "We specialize in three core engineering pillars: AI & Automation (AI agents, LLMs, and workflow automation), Software & SaaS Development (web apps, MVPs, and dashboards), and Managed Engineering Services (dedicated developers, DevOps, and cloud support).",
  },
  {
    q: "What is your typical project timeline?",
    a: "Most software and automation projects run 8–16 weeks from kick-off to launch. Smaller scopes like standalone chatbots or MVPs can ship faster, while complex enterprise platforms or deep LLM integrations take longer.",
  },
  {
    q: "What tech stack and models do you work with?",
    a: "We build with modern frameworks like React, Next.js, Python, and Flutter. For AI and automation, we leverage top-tier models (OpenAI, Claude, Gemini, Llama) alongside agentic frameworks like LangChain, CrewAI, and n8n to build smart, scalable systems.",
  },
  {
    q: "Can you provide ongoing engineering support or take over an existing system?",
    a: "Absolutely. Through our Managed Engineering Services, we offer dedicated developers, DevOps setup, QA, and cloud support. Whether you need us to rescue an existing codebase or scale a newly launched product, we treat it as our own.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes—we are highly experienced in MVP development for pre-seed and seed-stage founders. We're comfortable working with evolving requirements and help define the technical architecture just as much as we build it.",
  },
  {
    q: "How do you handle IP and data confidentiality?",
    a: "All work is 100% yours. We sign NDAs before discussing any sensitive system architecture or business processes, and all intellectual property transfers to you automatically upon final payment.",
  },
];

export default function FAQ_Section() {
  const ref = useRef();
  const headRef = useRef();
  const [open, setOpen] = useState(null);
  const answerRefs = useRef([]);

  const toggle = (i) => {
    const prev = open;
    setOpen(open === i ? null : i);
    answerRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === i && open !== i) {
        gsap.fromTo(
          el,
          { maxHeight: 0, opacity: 0 },
          { maxHeight: 500, opacity: 1, duration: 0.45, ease: "power3.out" },
        );
      } else if (idx === prev) {
        gsap.to(el, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 28 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
          invalidateOnRefresh: true,
        },
      });
      const items = ref.current?.querySelectorAll(".sl-faq-item");
      items?.forEach((el, i) => {
        gsap.set(el, { autoAlpha: 0, y: 20 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            invalidateOnRefresh: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .sl-faq{position:relative;background:#050508;padding:100px 7vw 120px;border-top:1px solid #050508;}
        .sl-faq-inner{position:relative;z-index:1;}
        .sl-faq-layout{display:grid;grid-template-columns:1fr 1.6fr;gap:0 8vw;align-items:start;}
        .sl-faq-head{position:sticky;top:100px;}
        .sl-title{font-size:clamp(32px,4.5vw,64px);font-weight:500;line-height:1.05;color:#fcfcf7;margin:0;}
        .sl-sub-dark{font-weight:300;font-size:clamp(14px,1.1vw,16px);line-height:1.72;color:rgba(252,252,247,.6);max-width:50ch;margin:16px 0 0;}
        .sl-faq-list{display:flex;flex-direction:column;}
        .sl-faq-item{border-bottom:1px solid rgba(100,100,100,.1);padding:24px 0;cursor:pointer;transition:background 0.2s;}
        .sl-faq-item:first-child{border-top:1px solid rgba(100,100,100,.1);}
        .sl-faq-q{display:flex;justify-content:space-between;align-items:center;gap:20px;font-size:clamp(15px,1.3vw,18px);font-weight:300;color:rgba(255,255,255,1);}
        .sl-faq-icon{font-size:22px;font-weight:300;color:#9ca3af;flex-shrink:0;line-height:1;user-select:none;}
        .sl-faq-a{overflow:hidden;}
        .sl-faq-a p{font-size:14px;line-height:1.75;color:#6b7280;margin:12px 0 0;}
        @media(max-width:1024px){
          .sl-faq-layout{grid-template-columns:1fr;}
          .sl-faq-head{position:static;margin-bottom:48px;}
        }
      `}</style>
      <section data-navbar="light" ref={ref} className="sl-faq">
        <div className="sl-faq-inner">
          <div className="sl-faq-layout">
            <div ref={headRef} className="sl-faq-head">
              <h2 className="sl-title">
                Questions answered.
                <br />
              </h2>
              <p className="sl-sub-dark">
                Still have questions? Email us at support@algonsolutions.com — we
                reply within 24 hours.
              </p>
            </div>
            <div className="sl-faq-list">
              {FAQ.map((item, i) => (
                <div key={i} className="sl-faq-item" onClick={() => toggle(i)}>
                  <div className="sl-faq-q">
                    <span>{item.q}</span>
                    <span
                      className="sl-faq-icon"
                      style={{
                        transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    ref={(el) => (answerRefs.current[i] = el)}
                    className="sl-faq-a"
                    style={{ maxHeight: 0, overflow: "hidden", opacity: 0 }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
