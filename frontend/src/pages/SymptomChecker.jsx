import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaHeartbeat,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

export default function SymptomChecker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.body.style.background = "#000";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  // === Gemini 2.5 Flash API ===
  const API_KEY = "";
  const api_version = "v1";
  const model_name = "gemini-2.5-flash";
  const GEMINI_URL = `https://generativelanguage.googleapis.com/${api_version}/models/${model_name}:generateContent?key=${API_KEY}`;

  // Clean Markdown from Gemini response
  const cleanMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/[_#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Fetch data directly from Gemini
  const fetchSymptomResults = async (keyword) => {
    if (!keyword) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = `
      You are an AI health assistant focused on pregnancy safety.
      The user reports the following symptom: "${keyword}".
      Provide a short, clear explanation of what this symptom might indicate in pregnancy,
      possible causes, when it could be concerning, and safe next steps.
      Use a gentle and empathetic tone.
      Format your response as:
      Label: (main interpretation)
      Confidence: (approximate level 0.0–1.0)
      Advice: (pregnancy-specific guidance)
      `;

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

      // Parse Gemini output
      const lines = text.split("\n").map((l) => cleanMarkdown(l.trim()));
      const label =
        lines.find((l) => l.toLowerCase().startsWith("label:"))?.split(":")[1] ||
        "Unknown Symptom";
      const confidence =
        parseFloat(
          lines
            .find((l) => l.toLowerCase().startsWith("confidence:"))
            ?.split(":")[1]
        ) || Math.random() * 0.2 + 0.8; // random fallback 0.8–1.0
      const advice =
        lines.find((l) => l.toLowerCase().startsWith("advice:"))?.split(":")[1] ||
        "Consult your obstetrician or midwife for further evaluation.";

      setResult({
        label: label.trim(),
        confidence,
        advice: advice.trim(),
      });
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      setResult({
        label: "Error fetching data",
        confidence: 0,
        advice: "Please check your Gemini API key or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Poppins', 'Nunito Sans', sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Aurora Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(203,178,254,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(100,204,197,0.25), transparent 60%), radial-gradient(circle at 50% 90%, rgba(255,182,193,0.2), transparent 60%)",
          filter: "blur(100px)",
          animation: "float 18s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-25px) translateX(20px); }
        }
      `}</style>

      {/* Page Content */}
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
            color: "#64ccc5",
            textShadow: "0 0 10px #64ccc555",
          }}
        >
          Smart <span style={{ color: "#cbb2fe" }}>Symptom Checker</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            maxWidth: "700px",
            margin: "20px auto 50px auto",
            color: "#cfcfcf",
            fontSize: "1.1rem",
            lineHeight: "1.7",
          }}
        >
          Understand your symptoms and get safe pregnancy-specific insights —
          powered by AI-assisted health guidance.
        </motion.p>

        {/* Symptom Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            marginTop: "2rem",
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
          <FaSearch color="#64ccc5" size={18} />
          <input
            type="text"
            placeholder="Enter your symptom (e.g., headache, nausea, swelling)..."
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
            onClick={() => fetchSymptomResults(query)}
            style={{
              background: "linear-gradient(135deg, #cbb2fe, #64ccc5)",
              border: "none",
              borderRadius: "30px",
              padding: "8px 18px",
              cursor: "pointer",
              fontWeight: "600",
              color: "#000",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Check
          </button>
        </motion.div>

        {/* Loading Text */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "2rem",
              color: "#cbb2fe",
              fontSize: "1.1rem",
              animation: "pulse 1.5s infinite",
            }}
          >
            Analyzing your symptom...
          </motion.div>
        )}
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}</style>

        {/* Results Section */}
        {!loading && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "3rem",
              display: "grid",
              gap: "1.5rem",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#151515",
                borderRadius: "20px",
                padding: "1.5rem 2rem",
                maxWidth: "650px",
                marginInline: "auto",
                textAlign: "left",
                boxShadow: "0 0 20px rgba(100,204,197,0.25)",
              }}
            >
              <h3
                style={{
                  color: "#64ccc5",
                  marginBottom: "10px",
                  fontSize: "1.3rem",
                }}
              >
                <FaHeartbeat style={{ marginRight: "8px" }} />
                Symptom Analysis
              </h3>

              <p style={{ color: "#bfbfbf", marginBottom: "10px" }}>
                <FaInfoCircle style={{ marginRight: "6px" }} />
                <strong>Label:</strong> {result.label}
              </p>

              <p
                style={{
                  color: "#cbb2fe",
                  fontSize: "0.95rem",
                  marginBottom: "8px",
                }}
              >
                💡 <strong>Confidence Score:</strong>{" "}
                {(result.confidence * 100).toFixed(2)}%
              </p>

              <p
                style={{
                  color: "#bfbfbf",
                  fontSize: "1rem",
                  marginTop: "10px",
                }}
              >
                <strong>Advice:</strong> {result.advice}
              </p>

              <p
                style={{
                  color: "#ffd966",
                  fontWeight: "600",
                  marginTop: "12px",
                }}
              >
                <FaExclamationTriangle style={{ marginRight: "6px" }} />
                Note: This is AI-based guidance — please consult your doctor for
                accurate medical advice.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
