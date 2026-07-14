import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { CASE_STUDIES } from "../data/caseStudiesData"

const BLOG_PREVIEWS = [
    {
        id: 1,
        title: "Why your SaaS landing page is losing conversions",
        category: "Design",
        date: "Apr 28, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    },
    {
        id: 2,
        title: "Building a design system from scratch",
        category: "Design",
        date: "Apr 14, 2025",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "The real cost of a slow website in 2025",
        category: "Development",
        date: "Mar 30, 2025",
        readTime: "5 min read",
    },
    {
        id: 4,
        title: "How we use AI to cut design iteration time by 60%",
        category: "AI & Automation",
        date: "Mar 12, 2025",
        readTime: "7 min read",
    },
]

const NAV_LINKS = [
    {label:"Services", href:"/services"},
    {label: "Solutions", href:"/solutions"},
     {label:"Portfolio", href:"/portfolio"},
      {label:"About us", href:"/about-us"},
      {label:"Case Studies", href:"/work"}
    ]

const DESKTOP_MENU = [
    {
        id: "impact",
        title: "Impact",
        heading: "Our Impact",
        desc:
            "Every innovation that happens here is out of a quest to get better at what we are already doing. We deliver ideas that make a difference, create experiences that transform lives and build ecosystems that foster progress.",
        stats: [
            ["700+", "Projects launched successfully across the globe"],
            ["10M", "Daily customer engagement through our projects"],
            ["100+", "Digital transformation stories that made a difference"],
        ],
        button: "Explore Impact",
        url:"",
    },
    {
        id: "Case Studies",
        title: "Case Studies",
        heading: "Case Studies",
        desc:
            "From blueprint to production: Explore how we architect, automate, and scale intelligent software solutions that drive real business growth.",

            logos:[
                "/images/clients/logos/Drisya.webp",
                "/images/clients/logos/Visat algon.webp",
                "/images/clients/logos/Corewood algon.webp",

            ],
            button: "Explore Impact",
            href:"/work"
            
    },
    {
        id: "clients",
        title: "Clients",
        heading: "Our Clients",
        desc:
            "Trusted by visionary founders and enterprise leaders alike: Meet the global companies, startups, and institutions that rely on us to power their digital infrastructure.",
        logos: [
            "/images/clients/logos/Corewood algon.webp",
            "/images/clients/logos/desire.webp",
            "/images/clients/logos/Drisya.webp",
            "/images/clients/logos/pass algon.webp",
            "/images/clients/logos/qot algon.webp",
            "/images/clients/logos/Visat algon.webp",
            
        ],
    },

    {
        id: "Careers",
        href: "/careers",
        title: "Careers",
        heading: "Join our team",
        desc:
            "Shape the future of automation and software engineering: Join a remote-first team of builders pushing the boundaries of AI, SaaS, and modern technology. ",
    
    },

    {
        id: "insights",
        title: "Insights",
        href: "/blogs",
        heading: "Insights & Thinking",
        
    },
    {
        id: "contact",
        title: "Contact",
        href: "/contact",
        heading: "Start a conversation",
        desc:
            "Tell us what you are building, where it needs to go, and what is getting in the way. We will help you shape the next move.",
        button: "Contact Us",
    },
]

const MOBILE_MENU = [
    
    {
        id: "Case Studies",
        title: "Case Studies",
        heading: "Case Studies",
        desc:
            "Know about what were the challanges and how we tackled them in each projects",

            logos:[
                "/images/clients/logos/Drisya.webp",
                "/images/clients/logos/Visat algon.webp",
                "/images/clients/logos/Corewood algon.webp",

            ],
            button: "Explore Impact",
            href:"/work",
            
    },

     {
        id: "Careers",
        href: "/careers",
        title: "Careers",
        heading: "Join our team",
        desc:
            "If you think you've got what it takes to join our team, just contact us, we are always interested in prodigies",
    
    },
    

    {
        id: "insights",
        title: "Insights",
        href: "/blogs",
        heading: "Insights & Thinking",
        desc:
            "Perspectives, research and stories from the frontlines of digital innovation.",
            button: "Explore Blogs",
            
    },
]

export default function Navbar({ phase }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState("impact")
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)

    const [navTheme, setNavTheme] = useState("light")

    const effectiveTheme = menuOpen ? "light" : navTheme

useEffect(() => {
  const sections = document.querySelectorAll("[data-navbar]")

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        setNavTheme(visible[0].target.dataset.navbar)
      }
    },
    {
      rootMargin: "-10% 0px -90% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  )

  sections.forEach((sec) => observer.observe(sec))

  const updateThemeImmediately = () => {
    let bestSection = null
    let maxVisible = 0

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect()

      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) -
        Math.max(rect.top, 0)

      const ratio = visibleHeight / rect.height

      if (ratio > maxVisible) {
        maxVisible = ratio
        bestSection = sec
      }
    })

    if (bestSection) {
      setNavTheme(bestSection.dataset.navbar)
    }
  }

  // ✅ CASE 1: Splash flow
  const handleReady = () => {
    setTimeout(updateThemeImmediately, 150)
  }

  window.addEventListener("site-ready", handleReady)

  // ✅ CASE 2: Direct load (sessionStorage skip)
  setTimeout(updateThemeImmediately, 300)

  return () => {
    observer.disconnect()
    window.removeEventListener("site-ready", handleReady)
  }
}, [])



    // ── Store scroll Y before locking body ───────────────────────────────────
    const scrollYRef = useRef(0)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        if (menuOpen) {
            // 1. Capture current scroll position
            scrollYRef.current = window.scrollY

            // 2. Lock body: use top offset instead of position:fixed
            //    This keeps the page visually in place while preventing scroll
            document.body.style.overflow = "hidden"
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollYRef.current}px`
            document.body.style.width = "100%"
        } else {
            // 3. Unlock: remove fixed positioning
            document.body.style.overflow = ""
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.width = ""

            // 4. Restore scroll position synchronously before next paint
            window.scrollTo({ top: scrollYRef.current, behavior: "instant" })
        }
    }, [menuOpen])

    const current = DESKTOP_MENU.find((i) => i.id === active)
    const featuredStudies = CASE_STUDIES.slice(0, 4)
    const latestBlog = BLOG_PREVIEWS[0]
    const secondaryBlogs = BLOG_PREVIEWS.slice(1, 4)

    const renderDesktopMenuContent = () => {
        if (current.id === "Case Studies") {
            return (
                <>
                    <h2 className="text-[54px] font-medium tracking-[0.04em] mb-6">
                        {current.heading}
                    </h2>
                    <p className="text-white max-w-[720px] text-[18px] leading-loose mb-10">
                        {current.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-5 max-w-[780px]">
                        {featuredStudies.map((study) => (
                            <a
                                key={study.id}
                                href={`/work/${study.id}`}
                                className="group block overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-white/30"
                            >
                                <div className="h-[135px] overflow-hidden bg-white/5">
                                    <img
                                        src={study.thumbnail || study.heroImage || study.commonImg}
                                        alt={study.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-white/50">
                                        {study.category}
                                    </p>
                                    <h3 className="text-[20px] leading-tight tracking-wide font-medium text-white">
                                        {study.client || study.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </>
            )
        }

        if (current.id === "Careers") {
            return (
                <>
                    <h2 className="text-[54px] font-medium tracking-[0.04em] mb-6">
                        {current.heading}
                    </h2>
                    <p className="text-white max-w-[720px] text-[18px] leading-loose mb-8">
                        {current.desc}
                    </p>
                    <div className="mb-10 grid max-w-[720px] grid-cols-2 gap-x-10 gap-y-4">
                        {[
                            "React, Three.js, GSAP, Node, and modern cloud tools",
                            "Remote-friendly workflows with ownership and clear communication",
                            "Web, SaaS, ecommerce, AI automation, and immersive interfaces",
                            "Small team culture with space to learn, ship, and lead",
                        ].map((point) => (
                            <div key={point} className="flex gap-3 text-[15px] leading-relaxed text-white">
                                <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                    <a
                        href="/careers"
                        className="inline-flex w-fit rounded-full border border-white px-8 py-3 text-[15px] tracking-[0.08em] text-white transition hover:bg-white hover:text-black"
                    >
                        View open roles
                    </a>
                </>
            )
        }

        if (current.id === "insights") {
            return (
                <>
                    <h2 className="text-[54px] font-medium tracking-[0.04em] mb-6">
                        {current.heading}
                    </h2>
                    <p className="text-white max-w-[720px] text-[18px] leading-loose mb-10">
                        {current.desc}
                    </p>

                    <div className="grid max-w-[820px] grid-cols-[1.15fr_0.85fr] gap-6">
                        <a href={`/blogs/${latestBlog.id}`} className="group block">
                            <div className="mb-5 h-[255px] overflow-hidden bg-white/5">
                                <img
                                    src={latestBlog.image}
                                    alt={latestBlog.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/75">
                                {latestBlog.category} / {latestBlog.readTime}
                            </p>
                            <h3 className="text-[28px] leading-tight tracking-wide text-white">
                                {latestBlog.title}
                            </h3>
                        </a>

                        <div className="flex flex-col border-t border-white/15">
                            {secondaryBlogs.map((post) => (
                                <a
                                    key={post.id}
                                    href={`/blogs/${post.id}`}
                                    className="group border-b border-white/15 py-5 transition-colors duration-300"
                                >
                                    <div className="transition-transform duration-300 ease-out will-change-transform group-hover:translate-x-2">
                                        <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
                                            {post.category} / {post.date}
                                        </p>
                                        <h3 className="text-[20px] leading-snug text-white/85 transition-colors duration-300 tracking-wide group-hover:text-white">
                                            {post.title}
                                        </h3>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )
        }

        if (current.id === "contact") {
            return (
                <>
                    <h2 className="text-[54px] font-medium tracking-[0.04em] mb-6">
                        {current.heading}
                    </h2>

                    <p className="text-white max-w-[720px] text-[18px] leading-loose mb-10">
                        {current.desc}
                    </p>

                    <div className="mb-10 grid max-w-[760px] grid-cols-[0.95fr_1.05fr] gap-8">
                        <div>
                            {/* <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
                                Start with
                            </p> */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "Web & SaaS",
                                    "AI Automation",
                                    "Ecommerce",
                                    "Brand Systems",
                                    "3D / Motion",
                                    "Cybersecurity",
                                ].map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/75"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-l border-white/15 pl-8">
                            {/* <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
                                Contact
                            </p> */}
                            <div className="flex flex-col gap-4 text-[16px] text-white/80">
                                <a href="mailto:support@algonsolutions.com" className="transition hover:text-white">
                                    support@algonsolutions.com
                                </a>
                                <a href="tel:+917306060741" className="transition hover:text-white">
                                    +91 73060 60741
                                </a>
                                <p className="text-white/55">
                                    Kerala, India / Remote-first delivery
                                </p>
                            </div>
                        </div>
                    </div>

                    <a
                        href={current.href}
                        className="mt-2 inline-flex w-fit rounded-full border border-white px-8 py-3 text-[15px] tracking-[0.15em] text-white transition hover:bg-white hover:text-black"
                    >
                        {current.button}
                    </a>
                </>
            )
        }

        return (
            <>
                <h2 className="text-[54px] font-medium tracking-[0.04em] mb-6">
                    {current.heading}
                </h2>

                <p className="text-white max-w-[720px] text-[18px] leading-loose mb-10">
                    {current.desc}
                </p>

                {current.stats && (
                    <div className="grid grid-cols-3 gap-10 mb-12">
                        {current.stats.map(([num, label]) => (
                            <div key={label}>
                                <div className="text-[50px] font-semibold">{num}</div>
                                <div className="text-[16px] text-white ">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {current.logos && (
                    <div className="-ml-[3vw]">
                        <div className="grid grid-cols-3 gap-10">
                            {current.logos.map((logo) => (
                                <div key={logo} className="flex items-center justify-center">
                                    <img src={logo} className="w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {current.button && current.href && (
                    <a
                        href={current.href}
                        className="mt-2 inline-flex w-fit rounded-full border border-white px-8 py-3 text-[15px] tracking-[0.15em] text-white transition hover:bg-white hover:text-black"
                    >
                        {current.button}
                    </a>
                )}
            </>
        )
    }

    return (
        <>
            {/* NAVBAR */}
            <nav
                className="fixed top-0 left-0 right-0 z-[997] flex items-center justify-between px-[5vw] h-[72px] transition-all duration-500 ease-out "
                style={{
                    background: menuOpen
                        ? "#050508"
                        : scrolled
                            ? effectiveTheme === "dark"
                                ? "rgba(252,252,247,1)"
                                : "rgba(5,5,8,1)"
                            : "transparent",
                    backdropFilter: menuOpen ? "none" : scrolled ? "blur(14px)" : "none",
                    boxShadow: scrolled
      ? "0 3px 7px rgba(0,0,0,0.03)"   // change 0.15 → your opacity
      : "none",
                }}
            >
                <Link to="/">
                
                    <img src={
    effectiveTheme === "dark"
      ? "/images/logo black.webp"
      : "/images/logo white.webp"
  } className="h-6" />
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex gap-10 text-[15px] tracking-[0.18em]">
                    {NAV_LINKS.map((link) => (
                        <a key={link.label} href={link.href} className={`${effectiveTheme === "dark" ? "text-black hover:text-black/80" : "text-white hover:text-white/80"}`}>
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <a href="/contact" className={`${effectiveTheme === "dark" ? " text-black hidden lg:flex px-6 rounded-full  py-2 tracking-[0.15em]  hover:bg-black hover:text-white transition" :"hidden lg:flex px-6 py-2 tracking-[0.15em] rounded-full text-white hover:bg-white hover:text-black transition"}`}>
                        Contact Us
                    </a>

                    {/* UNIVERSAL BURGER */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col justify-center gap-[5px] p-1 bg-transparent border-none cursor-pointer w-8 h-8"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`${effectiveTheme === "dark" ? "block w-8 h-[1.5px] bg-black rounded-sm origin-center" : "block w-8 h-[1.5px] bg-white rounded-sm origin-center"} ${menuOpen
                                    ? "animate-[burger-open-top_0.6s_ease-in-out_forwards]"
                                    : "animate-[burger-close-top_0.6s_ease-in-out_forwards]"
                                }`}
                        />
                        <span
                            className={`${effectiveTheme === "dark" ? "block w-8 h-[1.5px] bg-black rounded-sm origin-center" : "block w-8 h-[1.5px] bg-white rounded-sm origin-center"} ${menuOpen
                                    ? "animate-[burger-open-bottom_0.6s_ease-in-out_forwards]"
                                    : "animate-[burger-close-bottom_0.6s_ease-in-out_forwards]"
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* ======================= */}
            {/* DESKTOP MEGA MENU       */}
            {/* ======================= */}
            <div
                className={`fixed inset-0 z-[995] hidden lg:block transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    } bg-[#050508]`}
            >
                <div className="h-full flex">

                    {/* LEFT PANEL */}
                    <div
                        data-lenis-prevent={active === "Case Studies" ? "" : undefined}
                        className={`flex-1 min-h-0 px-[7vw] ${
                            active === "Case Studies"
                                ? "h-full overflow-y-auto overscroll-contain py-[120px] hide-scrollbar"
                                : "flex flex-col justify-center"
                        }`}
                    >
                        {renderDesktopMenuContent()}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="w-[32%] flex flex-col justify-center items-end pr-[7vw] gap-10">
                        {DESKTOP_MENU.map((item) => (
                            <a
                            href={item.href}

                            key={item.id}
                                onMouseEnter={() => setActive(item.id)}
                                className={`text-[36px] tracking-[0.05em] transition ${active === item.id ? "text-white" : "text-white/35"
                                    } hover:text-white`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                </div>
            </div>


            

            {/* ======================= */}
            {/* MOBILE MENU             */}
            {/* ======================= */}
            <div
                className="fixed inset-0 z-[995] flex flex-col transition-all duration-500 lg:hidden"
                style={{
                    background: "rgba(5,5,8,1)",
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "all" : "none",
                    transform: menuOpen ? "translateY(0)" : "translateY(-16px)",
                }}
            >
                {/* SCROLLABLE MENU */}
                <div className="flex-1 overflow-y-auto pt-[12vh] pb-[15vh] hide-scrollbar">

<div className="flex flex-col gap-6">
  {/* NAV LINKS */}
  {NAV_LINKS.map((item, i) => (
    <div key={item.label} className="flex flex-col gap-6">
      <a
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className="font-primary px-[8vw] font-light text-[20px] tracking-[0.07em] transition-all duration-300 hover:text-white/60"
        style={{
          transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(10px)",
        }}
      >
        {item.label}
      </a>

      <div className="w-full h-[1px] bg-white/10" />
    </div>
  ))}

  {/* MOBILE MENU */}
  {MOBILE_MENU.map((item, i) => {
    const index = NAV_LINKS.length + i;

    return (
      <div key={item.id} className="flex flex-col gap-6">
        <a
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className="font-primary px-[8vw] font-light text-[20px] tracking-[0.07em] transition-all duration-300 hover:text-white/60"
          style={{
            transitionDelay: menuOpen ? `${index * 60}ms` : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {item.title}
        </a>

        <div className="w-full h-[1px] bg-white/10" />
      </div>
    );
  })}
</div>
                </div>

                {/* FLOATING CTA */}
                <div className="pointer-events-none absolute bg-black inset-x-0 bottom-0 z-[999] px-8 pb-8 pt-5">
                    <div className="pointer-events-auto">
                        <a href="/contact" className="font-primary w-full text-[20px] px-8 py-4 tracking-[0.07em] bg-white text-black transition hover:bg-white/90">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
