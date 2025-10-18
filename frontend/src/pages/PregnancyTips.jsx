import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaBaby,
  FaAppleAlt,
  FaBed,
  FaWalking,
  FaSearch,
} from "react-icons/fa";

export default function PregnancyTips() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#000";
    document.body.style.overflowX = "hidden";
  }, []);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // === Gemini 2.5 Flash API Config ===
  const API_KEY = "";
  const api_version = "v1";
  const model_name = "gemini-2.5-flash";
  const GEMINI_URL = `https://generativelanguage.googleapis.com/${api_version}/models/${model_name}:generateContent?key=${API_KEY}`;

  // === Helper: Clean Markdown from text ===
  const cleanMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/[_#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // === Fetch from Gemini API ===
  const fetchHealthSuggestions = async (keyword) => {
    if (!keyword) return;
    setLoading(true);
    setResults([]);

    const weekNumber = parseInt(keyword.trim());
    if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 40) {
      setResults([
        {
          name: "Invalid Input",
          status: "Please enter a valid pregnancy week (1–40).",
          note: "",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const prompt = `You are a pregnancy health assistant. Provide 5 short, friendly, and medically safe pregnancy care tips for week ${weekNumber}. 
Each tip should include a short title and a one-line description, written simply and compassionately.`;

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini API.";

      const lines = text
        .split("\n")
        .filter((l) => l.trim() !== "")
        .slice(0, 5);

      const formatted = lines.map((line, index) => {
        const parts = line.split(":");
        return {
          name: cleanMarkdown(
            parts[0] ? parts[0].trim() : `Tip ${index + 1}`
          ),
          status: "Recommended",
          note: cleanMarkdown(
            parts[1]
              ? parts[1].trim()
              : line.trim() ||
                  "Consult your healthcare provider for week-specific guidance."
          ),
        };
      });

      setResults(formatted);
    } catch (err) {
      console.error("⚠️ Gemini API Error:", err);
      setResults([
        {
          name: "Connection Error",
          status: "Could not connect to Gemini API.",
          note: "Please check your API key or try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const tipsData = [
    {
      icon: <FaHeart size={35} color="#f6b6c3" />,
      title: "Emotional Well-being",
      desc: "Your emotional health matters as much as your physical health.",
      tip: "Surround yourself with positivity and take moments to relax and reflect daily.",
    },
    {
      icon: <FaAppleAlt size={35} color="#64ccc5" />,
      title: "Healthy Nutrition",
      desc: "A well-balanced diet ensures your baby’s growth and your strength.",
      tip: "Include iron, folate, and calcium-rich foods in your meals.",
    },
    {
      icon: <FaWalking size={35} color="#a0f0d0" />,
      title: "Stay Active",
      desc: "Gentle exercises keep your body flexible and prepare you for delivery.",
      tip: "Try prenatal yoga or light walks under medical supervision.",
    },
    {
      icon: <FaBed size={35} color="#cbb2fe" />,
      title: "Rest & Sleep",
      desc: "Good rest helps your body recover and supports baby development.",
      tip: "Maintain a consistent bedtime routine and avoid screens before sleep.",
    },
    {
      icon: <FaBaby size={35} color="#ffcb77" />,
      title: "Bond with Your Baby",
      desc: "Talking or singing to your baby builds emotional connection.",
      tip: "Play soft music or gently place your hand on your belly daily.",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        color: "#fff",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Poppins', 'Nunito Sans', sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 20%, rgba(138,43,226,0.25), transparent 60%), radial-gradient(circle at 85% 70%, rgba(255,105,180,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(0,191,255,0.2), transparent 60%)",
          filter: "blur(100px)",
          animation: "auroraFloat 18s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />
      <style>{`
        @keyframes auroraFloat {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-25px) translateX(20px); }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "6rem 2rem 5rem 2rem",
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            color: "#f6b6c3",
            textShadow: "0 0 10px #f6b6c366",
          }}
        >
          Empower Your Journey with{" "}
          <span
            style={{
              color: "#cbb2fe",
              textShadow: "0 0 15px #cbb2feaa",
            }}
          >
            Pregnancy Tips
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            maxWidth: "700px",
            margin: "20px auto 60px auto",
            color: "#cfcfcf",
            fontSize: "1.1rem",
            lineHeight: "1.7",
          }}
        >
          Stay informed and confident throughout your pregnancy with trusted
          advice designed to nurture both you and your baby.
        </motion.p>

        {/* === Tips Cards === */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "2.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {tipsData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "rgba(17,17,17,0.95)",
                borderRadius: "20px",
                padding: "2rem",
                textAlign: "left",
                boxShadow: "0 0 25px rgba(203,178,254,0.15)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "#fff",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(203,178,254,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(203,178,254,0.15)";
              }}
            >
              <div style={{ marginBottom: "1rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.4rem", color: "#f6b6c3" }}>
                {item.title}
              </h3>
              <p style={{ color: "#bfbfbf", fontSize: "1rem" }}>{item.desc}</p>
              <p
                style={{
                  color: "#cbb2fe",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  marginTop: "10px",
                }}
              >
                💡 {item.tip}
              </p>
            </motion.div>
          ))}
        </div>

        {/* === Search Section === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginTop: "5rem",
            maxWidth: "600px",
            marginInline: "auto",
            background: "#0f0f0f",
            borderRadius: "50px",
            padding: "0.8rem 1.2rem",
            boxShadow: "0 0 25px rgba(203,178,254,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <FaSearch color="#cbb2fe" size={18} />
          <input
            type="text"
            placeholder="Enter your pregnancy week (1–40)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={() => fetchHealthSuggestions(query)}
            style={{
              background: "linear-gradient(135deg, #cbb2fe, #64ccc5)",
              border: "none",
              borderRadius: "30px",
              padding: "8px 18px",
              cursor: "pointer",
              fontWeight: "600",
              color: "#000",
            }}
          >
            Search
          </button>
        </motion.div>

        {/* === Loading Indicator === */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "1.5rem",
              color: "#cbb2fe",
              fontSize: "1.1rem",
              animation: "pulse 1.5s infinite",
            }}
          >
            Searching for safe options...
          </motion.div>
        )}
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}</style>

        {/* === Results === */}
        {!loading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "2rem",
              display: "grid",
              gap: "1.2rem",
              justifyContent: "center",
            }}
          >
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#151515",
                  borderRadius: "20px",
                  padding: "1.2rem 2rem",
                  maxWidth: "600px",
                  marginInline: "auto",
                  textAlign: "left",
                  boxShadow: "0 0 15px rgba(203,178,254,0.25)",
                }}
              >
                <h3 style={{ color: "#f6b6c3" }}>{r.name}</h3>
                <p style={{ color: "#bfbfbf" }}>{r.status}</p>
                <p style={{ color: "#cbb2fe", fontSize: "0.9rem" }}>
                  {r.note}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
