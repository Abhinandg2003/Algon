/**
 * ServicesPage.jsx
 *
 * Full services page — matches Algon home page aesthetic.
 * Dark #050508 base, Syne display font, grid bg, grain overlay.
 * GSAP scroll-triggered reveals on every section.
 * 3D CSS perspective cards that tilt on hover.
 * Horizontal marquee, large editorial type, numbered service list.
 *
 * DEPENDENCIES (already in project): gsap
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import animationData from "/src/assets/Circle.json";
import ScrollIndicator from "../components/ui/ScrollIndicator";
import ServicesCards from "../components/ui/ServicesCards";
import FAQ_Section from "../components/ui/FAQ";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES DATA
──────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    title: "Custom Software\n& Web Development",
    short: "Bespoke digital products engineered for scale.",
    desc: "We build fast, modern web applications and custom software systems tailored to your exact requirements. From single-page apps to complex enterprise platforms — every line of code is deliberate.",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "REST / GraphQL"],
    accent: "#4a6fff",
  },
  {
    id: "02",
    title: "SaaS Solutions",
    short: "End-to-end product development, from MVP to scale.",
    desc: "We architect, build, and launch SaaS products that grow with your business. Multi-tenancy, billing, onboarding, analytics — we handle the hard infrastructure so you can focus on the product.",
    tags: ["Stripe", "Auth", "Multi-tenant", "Cloud", "Analytics"],
    accent: "#7c3aed",
  },
  {
    id: "03",
    title: "AI & Automation",
    short: "Intelligent systems that think, learn, and act.",
    desc: "From LLM integrations and AI agents to workflow automation and predictive models — we embed intelligence into your product stack in ways that actually move the business forward.",
    tags: ["LLMs", "RAG", "Agents", "Pipelines", "OpenAI / Gemini"],
    accent: "#06b6d4",
  },
  {
    id: "04",
    title: "HMS Solutions",
    short: "Hospital management made simple and efficient.",
    desc: "End-to-end hospital management systems covering patient records, appointments, billing, staff management, and reporting. We build secure, scalable, and user-friendly platforms that streamline healthcare operations and improve patient experience.",
    tags: ["EMR", "Appointments", "Billing", "Healthcare", "Dashboard"],
    accent: "#f59e0b",
  },
  {
    id: "05",
    title: "eCommerce &\nShopify Solutions",
    short: "Storefronts that convert. Backends that scale.",
    desc: "High-converting Shopify stores, custom themes, headless commerce, and eCommerce platform development. We combine conversion-optimised UX with robust inventory and payment infrastructure.",
    tags: ["Shopify", "Headless", "CRO", "Payment", "Subscriptions"],
    accent: "#10b981",
  },
  {
    id: "06",
    title: "Marketing &\nGrowth Strategies",
    short: "Data-driven growth with a creative edge.",
    desc: "SEO, performance marketing, content strategy, and brand systems that compound over time. We treat marketing as a product — built on data, designed for humans, optimised continuously.",
    tags: ["SEO", "Paid Media", "Content", "Analytics", "Brand"],
    accent: "#f43f5e",
  },
  {
    id: "07",
    title: "AR/VR & Immersive\nExperiences",
    short: "Reality, extended.",
    desc: "We design and build augmented reality, virtual reality, and mixed reality experiences for web, mobile, and headset. From product visualisers to full virtual environments.",
    tags: ["WebXR", "Three.js", "Unity", "8th Wall", "ARKit"],
    accent: "#8b5cf6",
  },
  {
    id: "08",
    title: "Cybersecurity &\nCloud Solutions",
    short: "Secure by design. Resilient at scale.",
    desc: "Security audits, penetration testing, cloud architecture, and compliance frameworks. We harden your infrastructure and build defensively so you never have to scramble after an incident.",
    tags: ["Pentest", "SOC2", "AWS / GCP", "Zero Trust", "GDPR"],
    accent: "#ef4444",
  },
  {
    id: "09",
    title: "Blockchain & Web3",
    short: "Decentralised infrastructure built to last.",
    desc: "Smart contracts, dApps, token systems, and NFT platforms. We build on-chain products with security-first thinking and gas-efficient architecture across EVM and non-EVM chains.",
    tags: ["Solidity", "EVM", "NFT", "DeFi", "Audit-ready"],
    accent: "#14b8a6",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   MARQUEE ITEMS
──────────────────────────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "Web Development",
  "SaaS",
  "AI & Automation",
  "Blockchain",
  "eCommerce",
  "Marketing",
  "AR / VR",
  "Cybersecurity",
  "DevOps",
];

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
──────────────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef();
  const headRef = useRef();
  const subRef = useRef();
  const scrollRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const marqueeRef = useRef();
  const heroImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = heroImgRef.current;

      gsap.fromTo(
        img,
        {
          scale: 1.18,
          y: 60,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 0.2,
          duration: 1.6,
          ease: "power3.out",
        },
      );

      gsap.to(img, {
        y: 140,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee RAF
      let x = 0;
      let raf;
      const el = marqueeRef.current;
      const run = () => {
        x -= 0.7;
        if (el && Math.abs(x) >= el.scrollWidth / 2) x = 0;
        if (el) el.style.transform = `translateX(${x}px)`;
        raf = requestAnimationFrame(run);
      };
      raf = requestAnimationFrame(run);

      // Hero entrance
      gsap.set(
        [
          headRef.current,
          subRef.current,
          scrollRef.current,
          line1Ref.current,
          line2Ref.current,
        ],
        { autoAlpha: 0 },
      );
      gsap.set(headRef.current, { y: 60 });
      gsap.set(subRef.current, { y: 30 });

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(
        line1Ref.current,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
          transformOrigin: "left",
        },
        0,
      )
        .to(
          headRef.current,
          { autoAlpha: 1, y: 0, duration: 1.0, ease: "power4.out" },
          0.15,
        )
        .to(
          line2Ref.current,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.7,
            ease: "power3.inOut",
            transformOrigin: "left",
          },
          0.5,
        )
        .to(
          subRef.current,
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.6,
        )
        .to(scrollRef.current, { autoAlpha: 1, duration: 0.5 }, 0.9);

      return () => cancelAnimationFrame(raf);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="sp-hero" data-navbar="light">
      {/* Background grid */}

      {/* <div
        ref={heroImgRef}
        className="absolute inset-0  overflow-hidden pointer-events-none"
      >
        <img
          src="/images/serviceshero.jpg"
          alt=""
          className="w-full h-full object-cover scale-110 opacity-70"
        />
      </div> */}

      <div
        ref={heroImgRef}
        className="absolute inset-0 bg-[#050508] overflow-hidden pointer-events-none"
      >
      </div>



      {/* Grain */}
      <div className="sp-grain" aria-hidden="true" />

      {/* Blue glow top-right */}
      <div className="sp-hero-glow" aria-hidden="true" />

      {/* Large background number */}
      <div className="sp-hero-bg-num" aria-hidden="true">
        09
      </div>

      <div className="sp-hero-inner ">
        <div className=" h-[90vh] md:h-[70vh] grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            {/* <p className="sp-eyebrow">What we do</p> */}

            <h1
              ref={headRef}
              className="sp-hero-head text-center md:text-start"
            >
              Services that Shape futures.
            </h1>
            <div className="flex justify-center md:justify-start overflow-hidden">
              <div className="mt-6 mr-6 w-[100px] md:w-[100px] p-4 bg-[#0050d4] transition-all duration-300 hover:bg-[#0050d4]/0">
                <svg
                  viewBox="140 360 520 460"
                  className="block w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#ffffff">
                    <path d="M160 600L303 563L348 400H294L261 520L160 546V600Z" />
                    <path d="M537 680L639 654V600L495 637L450 800H504L537 680Z" />
                    <path d="M639 546L537 520L504 400H450L495 563L639 600V546Z" />
                    <path d="M348 800L303 637L160 600V654L261 680L294 800H348Z" />
                  </g>
                </svg>
              </div>

              <div className="mt-6 mr-6 w-[100px] md:w-[100px] p-4 bg-[#0050d4] transition-all duration-300 hover:bg-[#0050d4]/0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="object-cover"
                >
                  <path
                    d="M15.0769 1.61467V4.39837L13.1484 5.59327V10.4107L15.0769 11.6178V14.4015L12.4971 16L9.9174 14.4015V13.5899H5.15953V14.3939L2.57971 15.9924L0 14.3939V11.6102L1.92855 10.4031V5.59327L9.78462e-05 4.39837V1.61467L2.57981 0L5.15963 1.61467V2.34988H9.9174V1.61467L12.4971 0L15.0769 1.61467ZM11.2199 12.3364V13.6791L12.4971 14.4705L13.7744 13.6791V12.3364L12.4971 11.5369L11.2199 12.3364ZM1.30253 12.3287V13.6715L2.57971 14.4629L3.857 13.6715V12.3287L2.57971 11.5293L1.30253 12.3287ZM5.15963 4.39837L3.23108 5.59327V10.4032L5.15953 11.6102V12.2907H9.9174V11.6178L11.8458 10.4107V5.59327L9.9174 4.39837V3.64911H5.15963V4.39837ZM8.06165 5.37485C8.89051 5.53072 9.38649 6.05251 9.50879 6.77763H8.42847C8.32654 6.34393 7.98687 6.10674 7.49091 6.10674C6.97457 6.10674 6.64163 6.37102 6.6416 6.71663C6.6416 7.08259 6.98817 7.1911 7.57926 7.35375L8.25186 7.53665C9.10114 7.77385 9.5767 8.21442 9.5767 9.02766C9.57668 9.84767 8.99244 10.4373 8.06165 10.5931V11.4403H7.03573V10.5863C6.19325 10.4169 5.60215 9.81378 5.50023 8.96667H6.58045C6.6484 9.51559 7.0357 9.84768 7.58602 9.84769C8.18391 9.84769 8.52367 9.57655 8.52367 9.12926C8.52366 8.76332 8.24503 8.58032 7.63357 8.41767L6.96773 8.24151C6.17961 8.03142 5.59533 7.65185 5.59533 6.82506C5.59536 6.05928 6.18647 5.50359 7.03573 5.36128V4.54799H8.06165V5.37485ZM1.30263 2.33319V3.67595L2.57981 4.46738L3.8571 3.67595V2.33319L2.57981 1.53376L1.30263 2.33319ZM11.2199 2.33319V3.67595L12.4971 4.46738L13.7744 3.67595V2.33319L12.4971 1.53376L11.2199 2.33319Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              <div className="mt-6 mr-6 w-[100px] md:w-[100px] p-4 bg-[#0050d4] transition-all duration-300 hover:bg-[#0050d4]/0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70%"
                  viewBox="0 0 15 20"
                  fill="none"
                  class="object-cover flex justify-center ml-0 md:ml-3"
                >
                  <path
                    d="M9.60059 19.1946H4.80059V17.6346H9.60059V19.1946ZM7.39629 0C11.2886 0.100602 14.413 3.2874 14.413 7.20398C14.413 8.34353 14.148 9.42342 13.6754 10.3833C13.2152 11.3181 12.3141 13.1832 11.3298 15.2302H9.60059V16.7902H4.80059V15.2302H3.07172C2.09313 13.1851 1.20018 11.323 0.737578 10.3833C0.265039 9.42342 0 8.34352 0 7.20398C1.28522e-05 3.2874 3.1245 0.100608 7.01684 0H7.39629ZM7.20656 1.55754C4.0881 1.55755 1.56001 4.08553 1.56 7.20398C1.56 8.09934 1.76781 8.94398 2.13715 9.69422C2.64828 10.7325 3.69604 12.92 4.80117 15.2302H9.59894C10.7077 12.9219 11.7629 10.7362 12.2759 9.69422C12.6452 8.94397 12.853 8.09935 12.853 7.20398C12.853 4.08554 10.325 1.55756 7.20656 1.55754ZM7.98059 6.46031L9.92824 5.3359L10.7082 6.68695L8.76047 7.81137L10.7082 8.9359L9.92824 10.287L7.98059 9.16242V11.4115H6.42059V9.16242L4.47293 10.287L3.69293 8.9359L5.64047 7.81137L3.69281 6.68695L4.47281 5.3359L6.42059 6.46043V4.21148H7.98059V6.46031Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              <div className="mt-6  w-[100px] md:w-[100px] p-4 bg-[#0050d4] transition-all duration-300 hover:bg-[#0050d4]/0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="object-cover"
                >
                  <path
                    d="M1.30049 14.6966H14.7017V5.58242H16.0017V15.9957H16.0009V15.9966H0.000878906V15.9957H0.000488281V5.58242H1.30049V14.6966ZM10.4398 8.77471V10.2203L5.62705 12.999L5.56182 12.886V11.5355L9.0919 9.49756L5.56182 7.45947V6.10898L5.62705 5.99609L10.4398 8.77471ZM5.30254 2.99688H10.7018V1.3002H12.0018V2.99688H16.0009V4.29688H0V2.99688H4.00254V1.3002H5.30254V2.99688ZM10.6996 1.3H5.30205V0H10.6996V1.3Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>

            {/* <div ref={line2Ref} className="sp-rule sp-rule--short" style={{ scaleX: 0 }} /> */}

            {/* <p ref={subRef} className="sp-hero-sub">
              Nine disciplines. One relentless focus.<br />
              Building what others can't imagine, then shipping it.
            </p> */}
          </div>
          <div className="overflow-hidden flex justify-center">
            <div className="w-screen md:w-[40vw] h-[40vh] md:h-[80vh] overflow-hidden flex justify-center items-center ">
              <Lottie className="h-full md:h-[80%]" animationData={animationData} />
            </div>
          </div>
        </div>

        {/* <div ref={scrollRef} className="sp-scroll-hint">
          <div className="sp-scroll-line absolute left-8 bottom-5" />
          <span className="absolute left-20 bottom-3">Scroll</span>
        </div> */}
      </div>

      {/* Marquee strip at bottom of hero */}
      {/* <div className="sp-marquee-wrap">
        <div ref={marqueeRef} className="sp-marquee-track">
          {[...Array(4)].map((_, gi) =>
            MARQUEE_ITEMS.map((item, i) => (
              <span key={`${gi}-${i}`} className="sp-marquee-item">
                {item} <span className="sp-marquee-dot">◆</span>
              </span>
            )),
          )}
        </div>
      </div> */}
    </section>
  );
}






function SolCTA() {
  const ref = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ref.current?.querySelectorAll(".sl-cta-el");
      gsap.set(els, { autoAlpha: 0, y: 26 });
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          invalidateOnRefresh: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sl-cta">
      <div className="sl-cta-inner">
        <h2 className="sl-cta-head sl-cta-el">
          Your solution <br /> starts here.
          <br />
        </h2>
        {/* <p className="sl-cta-sub sl-cta-el">
          Tell us about your challenge. We'll tell you which track fits best and
          what it would take to solve it.
        </p> */}
        <div className="sl-cta-actions sl-cta-el mt-10">
          <a href="/contact" className="sl-cta-btn  mt-10 rounded-full bg-[#050508] border border-[#fcfcf7] px-8 py-3 hover:bg-[#050508] hover:text-[#fcfcf7] transition-all duration-300">
            Start the conversation
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              style={{ marginLeft: 10 }}
            >
              <path
                d="M1 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* <a href="mailto:support@algonsolutions.com" className="sl-cta-ghost">
            support@algonsolutions.com
          </a> */}
        </div>
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────────────────────────────────────
   INTRO STATEMENT
──────────────────────────────────────────────────────────────────────────── */
function IntroStatement() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const words = el.querySelectorAll(".sp-iw");
    gsap.set(words, { autoAlpha: 0.12 });
    gsap.to(words, {
      autoAlpha: 1,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "bottom 50%",
        scrub: 1,
      },
    });
  }, []);

  const text =
    "We don't offer services. We solve problems at the intersection of technology, design, and ambition.";
  const words = text.split(" ");

  return (
    <section className="sp-intro" data-navbar="dark">
      <div className="flex justify-center items-center">
        <div className="sp-grid-bg-white " aria-hidden="true" />
        <p ref={ref} className="sp-intro-text">
          {words.map((w, i) => (
            <span key={i} className="sp-iw">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICE CARD (3D tilt on hover)
──────────────────────────────────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const cardRef = useRef();
  const glowRef = useRef();

  // 3D tilt on mouse move
  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    gsap.to(card, {
      rotateY: dx * 8,
      rotateX: -dy * 8,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    // Move glow to cursor
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - rect.left}px`;
      glowRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      className="sp-card"
      style={{ "--accent": service.accent }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Cursor glow inside card */}
      <div ref={glowRef} className="sp-card-glow" />

      <div className="sp-card-num">{service.id}</div>

      <h3 className="sp-card-title">
        {service.title.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </h3>

      <p className="sp-card-short">{service.short}</p>

      <div className="sp-card-divider" />

      <p className="sp-card-desc">{service.desc}</p>

      <div className="sp-card-tags">
        {service.tags.map((tag) => (
          <span key={tag} className="sp-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="sp-card-footer">
        <span className="sp-card-link">
          Learn more
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            style={{ marginLeft: 6 }}
          >
            <path
              d="M1 5H13M13 5L9 1M13 5L9 9"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* Accent bar at bottom */}
      <div className="sp-card-accent-bar" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES GRID SECTION
──────────────────────────────────────────────────────────────────────────── */
function ServicesGrid() {
  const sectionRef = useRef();
  const headRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headRef.current, { autoAlpha: 0, y: 30 });
      gsap.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, { autoAlpha: 0, y: 50 });
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (i % 3) * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sp-grid-section ">
      <div className="sp-grid-bg" aria-hidden="true" />
      <div className="sp-grid-section-inner">
        <div ref={headRef} className="sp-section-head">
          <span className="sp-eyebrow">Nine disciplines</span>
          <h2 className="sp-section-title">
            Everything you need
            <br />
            <span className="pf-neon-text">to build and grow.</span>
          </h2>
        </div>

        <div className="sp-cards-grid">
          {SERVICES.map((service, i) => (
            <div key={service.id} ref={(el) => (cardsRef.current[i] = el)}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROCESS SECTION — horizontal numbered steps
──────────────────────────────────────────────────────────────────────────── */
const PROCESS = [
  {
    n: "01",
    accent: "linear-gradient(135deg, #265eed, #265eed)",
    accentcolor: "#265eed",
    label: "Discover",
    desc: "Deep-dive into your goals, users, and constraints. No assumptions.",
    svg: '<path d="M9.60059 19.1946H4.80059V17.6346H9.60059V19.1946ZM7.39629 0C11.2886 0.100602 14.413 3.2874 14.413 7.20398C14.413 8.34353 14.148 9.42342 13.6754 10.3833C13.2152 11.3181 12.3141 13.1832 11.3298 15.2302H9.60059V16.7902H4.80059V15.2302H3.07172C2.09313 13.1851 1.20018 11.323 0.737578 10.3833C0.265039 9.42342 0 8.34352 0 7.20398C1.28522e-05 3.2874 3.1245 0.100608 7.01684 0H7.39629ZM7.20656 1.55754C4.0881 1.55755 1.56001 4.08553 1.56 7.20398C1.56 8.09934 1.76781 8.94398 2.13715 9.69422C2.64828 10.7325 3.69604 12.92 4.80117 15.2302H9.59894C10.7077 12.9219 11.7629 10.7362 12.2759 9.69422C12.6452 8.94397 12.853 8.09935 12.853 7.20398C12.853 4.08554 10.325 1.55756 7.20656 1.55754ZM7.98059 6.46031L9.92824 5.3359L10.7082 6.68695L8.76047 7.81137L10.7082 8.9359L9.92824 10.287L7.98059 9.16242V11.4115H6.42059V9.16242L4.47293 10.287L3.69293 8.9359L5.64047 7.81137L3.69281 6.68695L4.47281 5.3359L6.42059 6.46043V4.21148H7.98059V6.46031Z" fill="currentColor"></path>',
  },
  {
    n: "02",
    accent: "linear-gradient(135deg, #265eed, #265eed)",
    accentcolor: "#265eed",
    label: "Architect",
    desc: "Design the system — tech stack, structure, and delivery plan.",
    svg: '<path d="M1.73398 19.5954H19.6022V7.44323H21.3355V21.3276H21.3345V21.3288H0.00117188V21.3276H0.000651042V7.44323H1.73398V19.5954ZM13.9198 11.6996V13.6271L7.50273 17.332L7.41576 17.1814V15.3807L12.1225 12.6634L7.41576 9.94596V8.14531L7.50273 7.99479L13.9198 11.6996ZM7.07005 3.99583H14.269V1.73359H16.0023V3.99583H21.3345V5.72917H0V3.99583H5.33672V1.73359H7.07005V3.99583ZM14.2661 1.73333H7.0694V0H14.2661V1.73333Z" fill="currentColor"></path>',
  },
  {
    n: "03",
    accent: "linear-gradient(135deg, #265eed, #265eed)",
    accentcolor: "#265eed",
    label: "Build",
    desc: "Sprint-based execution with weekly demos and tight feedback loops.",
    svg: '<path d="M16 6.66659L15.9988 6.66777V19.6002L15.999 21.3333H1.734V19.6002H14.2656V8.40179H9.33442L7.59859 6.66607V1.73389H1.73335V19.6004H0.0001302V1.73389L0 1.73402V0.000911342L9.30486 0.00078115V0.00182268L9.30669 0L16 6.66659ZM11.3847 12.3363V14.163L4.88106 17.9176V15.9165L9.50042 13.2497L4.88106 10.5829V8.58171L11.3847 12.3363ZM9.33181 6.66868H13.5463L9.33181 2.47117V6.66868Z" fill="currentColor"></path>',
  },
  {
    n: "04",
    accent: "linear-gradient(135deg, #265eed, #265eed)",
    accentcolor: "#265eed",
    label: "Launch",
    desc: "Deploy, monitor, and iterate. Go-live is the beginning, not the end.",
    svg: '<svg xmlns="<circle cx="5.27193" cy="7.54927" r="1.65461" stroke="currentColor" stroke-width="1.45338"></circle><path d="M0.370605 19.2666L0.370605 17.4121L3.10794 15.1253L3.10794 16.9798L0.370605 19.2666Z" fill="currentColor"></path><path d="M10.1724 19.2666L10.1724 17.4121L7.43503 15.1253L7.43503 16.9798L10.1724 19.2666Z" fill="currentColor"></path><rect x="3.10742" y="15.1254" width="1.45338" height="4.32756" transform="rotate(-90 3.10742 15.1254)" fill="currentColor"></rect><rect x="3.10742" y="18.4198" width="1.45338" height="4.32756" transform="rotate(-90 3.10742 18.4198)" fill="currentColor"></rect><path d="M2.49259 14.0606C2.02118 13.2862 0.726074 10.9089 0.726074 8.40367C0.726074 4.86807 3.75659 2.24163 5.27184 0.928406C6.7871 2.03959 9.81761 4.96909 9.81761 8.40367C9.81761 11.5958 8.44502 13.5462 8.00727 14.1186" stroke="currentColor" stroke-width="1.45263"></path></svg>',
  },
];

function ProcessSection() {
  const sectionRef = useRef();
  const stepsRef = useRef([]);
  const lineRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
      });

      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: 0, y: 30 });
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sp-process bg-[#050508]"
      data-navbar="light"
    >
      <div className="sp-grid-bg" aria-hidden="true" />
      <div className="sp-process-inner">
        {/* <span className="sp-eyebrow ">How we work</span> */}
        <h2 className="sp-process-title ">
          A process built for
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #265eed 0%, #298dff 50%, #265eed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="font-light"
          >
            ambitious teams
          </span>
        </h2>

        <div ref={lineRef} className="sp-process-line" />

        <div className="sp-process-steps">
          {PROCESS.map((step, i) => {
            // extract colors from step.accent
            const colors = step.accent.match(/#(?:[0-9a-fA-F]{3,8})/g) || [
              "#ffffff",
              "#ffffff",
            ];

            return (
              <div
                key={step.n}
                ref={(el) => (stepsRef.current[i] = el)}
                className="sp-step"
                style={{ "--accent": step.accent }}
              >
                <div
                  className="sp-step-num "
                  style={{ "--accentcolor": step.accentcolor }}
                >
                  {step.n}
                </div>

                <h3 className="sp-step-label">{step.label}</h3>

                <div className="sp-svg-wrap">
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient
                        id={`grad-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        {colors.map((color, index) => (
                          <stop
                            key={index}
                            offset={`${(index / (colors.length - 1)) * 100}%`}
                            stopColor={color}
                          />
                        ))}
                      </linearGradient>
                    </defs>

                    <g
                      dangerouslySetInnerHTML={{
                        __html: step.svg
                          .replaceAll(
                            'fill="currentColor"',
                            `fill="url(#grad-${i})"`,
                          )
                          .replaceAll(
                            'stroke="currentColor"',
                            `stroke="url(#grad-${i})"`,
                          ),
                      }}
                    />
                  </svg>
                </div>

                <p className="sp-step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA STRIP
──────────────────────────────────────────────────────────────────────────── */
function CTAStrip() {
  const ref = useRef();
  const headRef = useRef();
  const btnRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headRef.current, btnRef.current], { autoAlpha: 0, y: 24 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      tl.to(headRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        btnRef.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
        0.2,
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="sp-cta-strip" data-navbar="light">
      
      {/* <div className="sp-cta-glow" aria-hidden="true" /> */}
      {/* <div className="sp-grid-bg" aria-hidden="true" /> */}
      <div className="sp-cta-inner">
        <h2 ref={headRef} className="sp-cta-head">
          Ready to build <br /> something great?
          <br />
          {/* <span
            style={{
              background:
                "linear-gradient(135deg, #265eed 0%, #298dff 50%, #265eed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="font-light"
          >
            something great?
          </span> */}
        </h2>
        <div ref={btnRef} className="sp-cta-actions">
          <a href="/contact" className="sp-cta-btn-primary">
            Start a project
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5H13M13 5L9 1M13 5L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="mailto:support@algonsolutions.com"
            className="sp-cta-btn-ghost"
          >
            support@algonsolutions.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
──────────────────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{`
        /* ── Tokens ────────────────────────────────────────────── */
        :root {
          --bg:      #050508;
          --white:   #ffffff;
          --muted:   rgba(255,255,255,0.38);
          --dimmer:  rgba(255,255,255,0.12);
          --font-display: 'Inter', sans-serif;
          --font-body:    'DM Sans', sans-serif;
        }

        /* ── Shared utilities ─────────────────────────────────── */
        .sp-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
        }
          .sp-grid-bg-white {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
           background: rgba(255,255,255,1);
           
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .sp-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .sp-eyebrow {
          display: block;
          font-family: var(--font-body);
          font-size: 10px; letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
        }

        .sp-eyebrowdark {
          display: block;
          font-family: var(--font-body);
          font-size: 10px; letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(5,5,8,0.3);
          margin-bottom: 20px;
        }
        .sp-rule {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.10);
          margin-bottom: 30px;
        }
        .sp-rule--short { width: 60px; margin-bottom: 20px; }
        .sp-outline-text {
          -webkit-text-stroke: .5px rgba(255,255,255,1);
          color: transparent;
        }

        /* ── HERO ─────────────────────────────────────────────── */
        .sp-hero {
          position: relative; background: var(--bg);
          height: 100vh;
          display: flex; flex-direction: column;
          justify-content: center; 
          padding-top: 10px;
        }
        .sp-hero-glow {
          position: absolute; top: 10%; right: 5%;
          width: 60vw; height: 60vw;
          max-width: 700px; max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(41,141,255,0.13) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
          filter: blur(2px);
        }
        .sp-hero-bg-num {
          position: absolute; bottom: 8%;  right: 6vw;
          font-family: var(--font-display);
          font-size: clamp(120px, 18vw, 280px);
          font-weight: 800; line-height: 1;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          pointer-events: none; z-index: 0; user-select: none;
        }
        .sp-hero-inner {
          position: relative; z-index: 1;
          height:90vh;
          padding: 80px 7vw 100px;
          max-width: 1600px;
        }
        .sp-hero-head {
          
          font-weight: 400;
          font-size: clamp(55px, 8.5vw, 115px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: var(--white);
          margin: 0 0 20px;
        }
        .sp-hero-sub {
          
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 200; line-height: 1.75;
          color: rgba(255,255,255,0.3);
          max-width: 44ch; margin: 0 0 60px;
        }
        .sp-scroll-hint {
          display: flex; align-items: center; gap: 14px;
          font-family: var(--font-body);
          font-size: 10px; letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
          .pf-neon-text {
          color: #4a6fff;
          
        }
        .sp-scroll-line {
          width: 40px; height: 1px;
          background: rgba(255,255,255,0.2);
        }

        /* Marquee */
        .sp-marquee-wrap {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 20px 0; overflow: hidden;
        }
        .sp-marquee-track {
          display: flex; white-space: nowrap; will-change: transform;
        }
        .sp-marquee-item {
          font-family: var(--font-body);
          font-size: 11px; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          padding: 0 28px; display: inline-flex; align-items: center; gap: 10px;
        }
        .sp-marquee-dot { font-size: 7px; color: rgba(255,255,255,0.4); }

        /* ── INTRO STATEMENT ─────────────────────────────────── */
        .sp-intro {
          position: relative; background: var(--bg);
          padding: 100px 7vw;
        }
        .sp-intro-text {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.5vw, 52px);
          font-weight: 200; line-height: 1.25;
          letter-spacing: -0.02em;
          color: rgba(0,0,0,1);
          max-width: 1200px;
          position: relative; z-index: 1;
        }
        .sp-iw { display: inline; will-change: opacity; }

        /* ── SERVICES GRID ───────────────────────────────────── */
        .sp-grid-section {
          position: relative; background: var(--bg);
          padding: 80px 7vw 120px;
        }
        .sp-grid-section-inner { position: relative; z-index: 1; }
        .sp-section-head { margin-bottom: 72px; }
        .sp-section-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 200; line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--white); margin: 0;
        }
        .sp-section-title--sm {
          font-size: clamp(28px, 3.8vw, 56px);
        }
        .sp-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          align-items: stretch; /* important */
        }

        /* ── SERVICE CARD ────────────────────────────────────── */
        .sp-card {
          position: relative;
          background: var(--bg);
          padding: 44px 36px 36px;
          overflow: hidden;
          transform-style: preserve-3d;
          cursor: default;
          transition: background 0.3s ease;
          height: 100%;
  display: flex;
  flex-direction: column;
        }
        .sp-card:hover { background: rgba(255,255,255,0.02); }

        /* Cursor glow */
        .sp-card-glow {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(ellipse, var(--accent, #4a6fff) 0%, transparent 70%);
          opacity: 0.08;
          transform: translate(-50%, -50%);
          pointer-events: none; z-index: 0;
          transition: opacity 0.3s;
        }
        .sp-card:hover .sp-card-glow { opacity: 0.14; }

        .sp-card-num {
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: 0.22em;
          color: var(--accent, rgba(255,255,255,0.2));
          margin-bottom: 24px;
          position: relative; z-index: 1;
        }
        .sp-card-title {
          font-family: var(--font-display);
          font-size: clamp(20px, 1.8vw, 28px);
          font-weight: 100; line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--white);
          margin: 0 0 12px;
          position: relative; z-index: 1;
        }
        .sp-card-short {
          font-family: var(--font-body);
          font-size: 12px; letter-spacing: 0.04em;
          color: var(--accent, rgba(255,255,255,0.5));
          margin: 0 0 20px;
          position: relative; z-index: 1;
        }
        .sp-card-divider {
          width: 32px; height: 1px;
          background: rgba(255,255,255,0.12);
          margin-bottom: 20px;
          position: relative; z-index: 1;
        }
        .sp-card-desc {
          font-family: var(--font-body);
          font-size: 13px; line-height: 1.72;
          color: rgba(255,255,255,0.45);
          margin: 0 0 24px;
          position: relative; z-index: 1;
        }
        .sp-card-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 28px;
          position: relative; z-index: 1;
        }
        .sp-tag {
          font-family: var(--font-body);
          font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 3px 8px;
        }
        .sp-card-footer {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 18px;
          margin-top: auto;
        }
        .sp-card-link {
          font-family: var(--font-body);
          font-size: 12px; letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          display: inline-flex; align-items: center;
          transition: color 0.25s;
        }
        .sp-card:hover .sp-card-link { color: var(--accent, rgba(255,255,255,0.8)); }


        .sl-cta{position:relative;background:#050508;padding:130px 7vw 150px;overflow:hidden;}
        .sl-cta-inner{position:relative;z-index:1;}
        .sl-cta-head{font-size:clamp(48px,8vw,120px);font-weight:400;line-height:0.94;letter-spacing:-0.02em;color:#fcfcf7;margin:0 0 24px;}
        .sl-cta-sub{font-size:clamp(14px,1.4vw,20px);font-weight:300;line-height:1.72;color:rgba(255,255,255,0.7);max-width:44ch;margin:0 0 48px;}
        .sl-cta-actions{display:flex;align-items:center;gap:32px;flex-wrap:wrap;}
        .sl-cta-btn{display:inline-flex;align-items:center;color:#fcfcf7;background:transparent;padding:16px 36px;transition:background 0.25s;
          position:        relative;
          display:         inline-flex;
          align-items:     center;
          gap:             12px;
          
          font-size:       clamp(14px, 1.2vw, 18px);
          font-weight:     400;
          cursor:          pointer;
          text-decoration: none;
          outline:         none;
        }
        .sl-cta-btn:hover{background:#fcfcf7;color:#050508;}
        .sl-cta-ghost{font-size:13px;letter-spacing:0.08em;text-decoration:none;color:rgba(255,255,255,0.3);transition:color 0.25s;}
        .sl-cta-ghost:hover{color:rgba(255,255,255,0.7);}



        /* Coloured bottom accent bar */
        .sp-card-accent-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 2;
        }
        .sp-card:hover .sp-card-accent-bar { opacity: 0.6; }

        /* ── PROCESS ─────────────────────────────────────────── */
        .sp-process {
          position: relative; 
          padding: 100px 7vw 120px;
          
          border-top: 1px solid rgba(5,5,8,0.06);
        }
          .sp-process-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 72px);
          font-weight: 200; line-height: 1.05;
          letter-spacing: -0.03em;
          color:rgba(255,255,255,1); margin: 0;
        }
        .sp-process-inner { position: relative; z-index: 1; }
        .sp-process-line {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.10);
          margin: 56px 0;
        }
        .sp-process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
        }
        .sp-step {
  position: relative;
  border-radius: 8px;
  padding: 20px 20px 20px 20px;
  background: #050508;
  overflow: hidden;
  transition: transform 0.4s ease;
}
  .sp-step::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: inherit;
  background: var(--accent);
  background-size: 220% 220%;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.sp-step::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--accent);
  opacity: 0;
  filter: blur(60px);
  transition: opacity 0.4s ease;
  z-index: 0;
}

.sp-step:hover {
  transform: translateY(-6px);
}

.sp-step:hover::before {
  animation: gradientShift 3s ease infinite;
}

.sp-step:hover::after {
  opacity: 0.08;
}

/* Gradient move */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Content above layers */
.sp-step-num,
.sp-step-label,
.sp-step-desc,
.sp-svg-wrap {
  position: relative;
  z-index: 5;
}

/* SVG WRAP */
.sp-svg-wrap {
  position: absolute;
  top: 20px;
  right: 20px;

  width: 70px;
  height: 70px;
  

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  background-size: 220% 220%;

  border-radius: 8px;

  transition: transform 0.4s ease;
}

/* Animate icon box too */
.sp-step:hover .sp-svg-wrap {
  animation: gradientShift 3s ease infinite;
  transform: rotate(-6deg) scale(1.05);
}





  
        .sp-step:last-child {  padding-right: 0; }
        .sp-step-num {
          font-size: 20px; letter-spacing: 0.22em;
          font-weight: 700;
          color: var(--accentcolor);
          margin-bottom: 0px;

          
        }
        .sp-step-label {
          font-family: var(--font-display);
          font-size: clamp(22px, 2vw, 32px);
          font-weight: 200; letter-spacing: -0.02em;
          color: rgba(255,255,255,1); margin: 0 0 14px;
        }
        .sp-step-desc {
        position:relative;
          font-family: var(--font-body);
          font-size: 13px; line-height: 1.72;
          color: rgba(255,255,255,0.5); margin: 0;z-index:3;
        }

        /* ── CTA STRIP ───────────────────────────────────────── */
        .sp-cta-strip {
        background: rgba(5, 5, 8, 1);
          position: relative; 
          padding: 120px 7vw 140px;
          
          overflow: hidden;
        }
        .sp-cta-glow {
          position: absolute; bottom: -20%; right: -8%;
          width: 60vw; height: 60vw;
          max-width: 700px; max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(40,80,255,0.10) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .sp-cta-inner { position: relative; z-index: 1; }
        .sp-cta-head {
          font-family: Displayfont;
          font-size: clamp(44px, 7vw, 110px);
          font-weight: 400; line-height: 0.94;
          letter-spacing: -0.04em;
          color: rgba(255,255,255,1); margin: 0 0 52px;
        }
        .sp-cta-actions {
          display: flex; align-items: center; gap: 36px; flex-wrap: wrap;
        }
        .sp-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-body);
          font-size: 13px; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
          color: #050508;
          background: #fff;
          padding: 16px 36px;
          transition: background 0.25s, color 0.25s;
        }
        .sp-cta-btn-primary:hover { background: #298dff; color: #fcfcf7 }
        .sp-cta-btn-ghost {
          font-family: var(--font-body);
          font-size: 16px; letter-spacing: 0.08em;
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          transition: color 0.25s;
        }
        .sp-cta-btn-ghost:hover { color: rgba(250,250,250,1); }

        /* ── Responsive ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .sp-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .sp-process-steps { grid-template-columns: repeat(2, 1fr); gap: 48px 0; }
          .sp-step { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); padding: 0 0 36px; }
          .sp-step:last-child { border-bottom: none; }
        }
        @media (max-width: 640px) {
        .sp-hero-head { font-weight: 
          .sp-cards-grid { grid-template-columns: 1fr; }
          .sp-process-steps { grid-template-columns: 1fr; }
          .sp-card { padding: 32px 24px 28px; }
          .sp-hero-inner { padding: 60px 6vw 80px; }
        }
      `}</style>

      <div style={{ background: "#050508", color: "#fff" }}>
        <Navbar />

        <HeroSection />
        <ScrollIndicator />
        {/* <IntroStatement /> */}
        {/* <ServicesGrid /> */}
        <ServicesCards />
        <FAQ_Section/>
        {/* <ProcessSection /> */}
        {/* <div className="relative bg-white">
    <img
        src="/images/brush stroke services.png"
        alt=""
        className="w-full block -mb-1 pointer-events-none select-none rotate-180"
    />
</div> */}


        {/* <CTAStrip /> */}
        <SolCTA/>
        <Footer />
      </div>
    </>
  );
}
