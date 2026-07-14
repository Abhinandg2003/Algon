
import { useState, useEffect, useRef } from "react"
import Loader from "./components/Loader"
import SplashScreen from "./components/SplashScreen"
import MainWebsite from "./components/MainWebsite"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NotFound from "./pages/NotFound"

import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "./components/Navbar"
import ServicesPage from "./pages/ServicesPage"
import Footer from "./components/Footer"
import PortfolioPage from "./pages/WorksPage"
import AboutPage from "./pages/AboutPage"
import SolutionsPage from "./pages/SolutionsPage"
import CaseStudiesPage from "./pages/CaseStudiesPage"
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage"
import ContactPage from "./pages/ContactPage"
import ScrollToTop from "./components/ScrollToTop"
import CareersPage from "./pages/CareersPage"
import BlogsPage from "./pages/BlogsPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import PrivacyPolicy from "./pages/Privacypage"
import TermsOfService from "./pages/TermsPage"
import Splinescene from "./pages/3dpage"


gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [phase, setPhase] = useState("loading")
  const lenisRef = useRef(null)
const ENABLE_LENIS = true; // <-- turn ON/OFF here

  //commend this useffect if u dont want lenis
  useEffect(() => {
  const timer = setTimeout(() => {
    setPhase("site")
  }, 1800)

  return () => clearTimeout(timer)
}, [])



  useEffect(() => {
  if (phase === "site") {
    document.documentElement.style.overflow = "auto"
    document.body.style.overflow = "auto"
  }
}, [phase])






  // Init Lenis AFTER splash ends
useEffect(() => {
  if (phase !== "site") return;

  // Disable Lenis
  if (!ENABLE_LENIS) {
    ScrollTrigger.refresh();
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    lerp: 0.09,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
  });

  lenisRef.current = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  const update = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value);
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.refresh();

  return () => {
    lenis.destroy();
    gsap.ticker.remove(update);
    lenisRef.current = null;
  };
}, [phase]);

  return (
    <Router>
       <ScrollToTop lenisRef={lenisRef} />
      <div className="min-h-screen flex flex-col bg-[#000000] text-[#ffffff] font-display">


        <main >
          <Routes>
            <Route path="/" element={<MainWebsite />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/work" element={<CaseStudiesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/3d" element={<Splinescene />} />
               <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
<Route path="/work/:id" element={<CaseStudyDetailPage />} />
<Route path="/contact" element={<ContactPage/>} />
<Route path="*" element={<NotFound />} />
          </Routes>
        </main>


      </div>
    </Router>
  )
} 