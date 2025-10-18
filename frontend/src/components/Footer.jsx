// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "linear-gradient(180deg, #000000, #0a0a0a, #000000)",
        color: "#ccc",
        textAlign: "center",
        padding: "2.5rem 1.5rem 1.5rem",
        fontFamily: "'Poppins', 'Nunito Sans', sans-serif",
        borderTop: "1px solid #111",
      }}
    >
      {/* Aurora Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 25% 40%, rgba(203,178,254,0.25), transparent 60%), radial-gradient(circle at 75% 70%, rgba(100,204,197,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(255,182,193,0.15), transparent 60%)",
          filter: "blur(100px)",
          animation: "footerAurora 15s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />
      <style>{`
        @keyframes footerAurora {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
          100% { transform: translateY(-25px) translateX(20px); opacity: 1; }
        }
      `}</style>

      {/* Footer Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Logo / Title */}
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#cbb2fe",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          NutriMama
        </h2>

        <p
          style={{
            maxWidth: "550px",
            margin: "0 auto 1.8rem",
            color: "#bfbfbf",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
        >
          Supporting mothers with love, care, and expert guidance — from
          pregnancy to wellness and beyond.
        </p>

        {/* Social Icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1.2rem",
          }}
        >
          {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(100,204,197,0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Icon color="#cbb2fe" size={16} />
              </a>
            )
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #333, transparent)",
            margin: "0 auto 1rem",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "#777",
          }}
        >
          © 2025 NutriMama. Crafted with{" "}
          <FaHeart color="#f6b6c3" size={11} style={{ margin: "0 4px" }} />
          for every mom.
        </p>
      </div>
    </footer>
  );
}
