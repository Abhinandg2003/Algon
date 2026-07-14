// src/pages/NotFound.jsx
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const Lottie = lazy(() => import("lottie-react"));

// Use any 404/error lottie from lottiefiles.com
import notFoundAnim from "/src/assets/404ufo.json";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fcfcf7",
      textAlign: "center",
      padding: "0 24px",
    }}>
      <Suspense fallback={<div style={{ height: 300 }} />}>
        <Lottie
          animationData={notFoundAnim}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
      </Suspense>

      <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, margin: "0 0 12px", letterSpacing: "-0.03em" }}>
        Page not found.
      </h1>
      <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 40 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="hover:text-black hover:bg-[#fff] bg-white/0 text-white transition-all border border-white rounded-full duration-300" style={{
        fontSize: 15,
        letterSpacing: "0.1em",
        textDecoration: "none",

        padding: "14px 32px",

      }}>
        Back to home
      </Link>
    </div>
  );
}