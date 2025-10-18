import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaHeartbeat,
  FaBabyCarriage,
  FaUserMd,
  FaBlog,
  FaUsers,
  FaQuestionCircle,
  FaComments,
  FaSpa,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#000";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#000",
        color: "#fff",
        fontFamily: "'Poppins', 'Nunito Sans', sans-serif",
        position: "relative",
      }}
    >
      {/* === Animated Aurora Background === */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 15% 20%, rgba(138,43,226,0.25), transparent 60%), radial-gradient(circle at 85% 70%, rgba(255,105,180,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(0,191,255,0.2), transparent 60%)",
          filter: "blur(100px)",
          animation: "auroraMove 18s ease-in-out infinite alternate",
          zIndex: 0,
        }}
      />
      <style>{`
        @keyframes auroraMove {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-30px) translateX(20px); }
        }
      `}</style>

      {/* === MAIN CONTENT === */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      >
        {/* === HERO SECTION === */}
        <section
          style={{
            textAlign: "center",
            padding: "8rem 2rem",
            backgroundColor: "#000",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              color: "#f6b6c3",
              textShadow: "0 0 10px #f6b6c366",
            }}
          >
            Nurture Every Moment with{" "}
            <span
              style={{
                color: "#cbb2fe",
                textShadow: "0 0 15px #cbb2feaa",
              }}
            >
              NutriMama
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              maxWidth: "650px",
              margin: "20px auto",
              color: "#cfcfcf",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            Your trusted companion through pregnancy and wellness — guiding you
            with confidence, knowledge, and compassion through every step of
            your journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{ marginTop: "30px" }}
          >
            <button
              style={{
                border: "none",
                padding: "12px 28px",
                borderRadius: "30px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #cbb2fe, #64ccc5)",
                color: "#000",
                marginRight: "15px",
                boxShadow: "0 0 25px #64ccc599",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => navigate("/pregnancy")}
            >
              Explore Wellness
            </button>

            <button
              style={{
                border: "1px solid #cbb2fe",
                padding: "12px 28px",
                borderRadius: "30px",
                fontWeight: "600",
                background: "transparent",
                color: "#cbb2fe",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#cbb2fe22")}
              onMouseOut={(e) => (e.target.style.background = "transparent")}
              onClick={() => navigate("/nutrition")}
            >
              View Nutrition Plans
            </button>
          </motion.div>
        </section>

        {/* === FEATURES GRID === */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            padding: "5rem 2rem",
            backgroundColor: "#000",
          }}
        >
          {[
            {
              icon: <FaLeaf size={40} color="#64ccc5" />,
              title: "Nutrition Plans",
              desc: "Personalized nutrition guidance crafted for every stage of pregnancy.",
              route: "/nutrition",
            },
            {
              icon: <FaBabyCarriage size={40} color="#f6b6c3" />,
              title: "Pregnancy Tips",
              desc: "Daily health, fitness, and mindfulness insights to nurture your wellbeing.",
              route: "/pregnancy",
            },
            {
              icon: <FaHeartbeat size={40} color="#cbb2fe" />,
              title: "Symptom Checker",
              desc: "Understand your body better with our smart, easy-to-use symptom tracker.",
              route: "/symptom",
            },
            {
              icon: <FaUserMd size={40} color="#64ccc5" />,
              title: "Doctor Finder",
              desc: "Find certified obstetricians, gynecologists, and wellness experts near you.",
              route: "/doctors",
            },
            {
              icon: <FaBlog size={40} color="#f6b6c3" />,
              title: "Blogs & Articles",
              desc: "Stay updated with medically verified articles and inspiring stories.",
              route: "/blogs",
            },
            {
              icon: <FaUsers size={40} color="#cbb2fe" />,
              title: "Community",
              desc: "Join our community of mothers to share, support, and celebrate together.",
              route: "/community",
            },
            {
              icon: <FaQuestionCircle size={40} color="#64ccc5" />,
              title: "FAQs",
              desc: "Answers to all your pregnancy and wellness questions in one place.",
              route: "/faqs",
            },
            {
              icon: <FaComments size={40} color="#f6b6c3" />,
              title: "Contact & Support",
              desc: "Reach out to our experts for personalized guidance and feedback.",
              route: "/contact",
            },
            {
              icon: <FaSpa size={40} color="#a0f0d0" />,
              title: "Mindfulness & Meditation",
              desc: "Daily guided meditations and relaxation practices to calm your mind and support emotional wellbeing.",
              route: "/mindfulness",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "#111",
                borderRadius: "20px",
                padding: "2rem",
                textAlign: "center",
                boxShadow: "0 0 20px rgba(203,178,254,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(203,178,254,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(203,178,254,0.15)";
              }}
              onClick={() => navigate(item.route)}
            >
              <div style={{ marginBottom: "15px" }}>{item.icon}</div>
              <h3 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p style={{ color: "#bfbfbf", fontSize: "0.95rem", lineHeight: "1.5" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* === CHATBOT SECTION === */}
        <PregnancyChatbot />
      </div>
    </div>
  );
}

/* === CHATBOT COMPONENT WITH GEMINI 2.5 FLASH API === */
function PregnancyChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your NutriMama assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Gemini 2.5 Flash API key
  const GEMINI_API_KEY = "";

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text:
                      "You are a pregnancy wellness assistant. Answer briefly and compassionately.\nUser: " +
                      input,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t process that right now 💬";

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      console.error("Gemini API error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to Gemini API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #121212 100%)",
        padding: "5rem 2rem",
        textAlign: "center",
        borderTop: "1px solid rgba(203,178,254,0.2)",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#cbb2fe",
          marginBottom: "1rem",
        }}
      >
        🤖 NutriMama Chatbot
      </motion.h2>
      <p
        style={{
          color: "#ccc",
          maxWidth: "600px",
          margin: "0 auto 2rem",
          lineHeight: "1.6",
        }}
      >
        Ask any pregnancy or wellness-related question and get instant helpful
        insights!
      </p>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "1.5rem",
          boxShadow: "0 0 25px rgba(203,178,254,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #64ccc5, #cbb2fe)"
                    : "rgba(203,178,254,0.2)",
                color: msg.sender === "user" ? "#000" : "#fff",
                padding: "10px 14px",
                borderRadius: "15px",
                maxWidth: "75%",
                boxShadow:
                  msg.sender === "user"
                    ? "0 0 10px rgba(100,204,197,0.3)"
                    : "0 0 10px rgba(203,178,254,0.2)",
              }}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div style={{ color: "#aaa", fontStyle: "italic", alignSelf: "flex-start" }}>
              Typing...
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1rem",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            style={{
              flex: 1,
              padding: "10px 15px",
              borderRadius: "30px",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "1rem",
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              borderRadius: "30px",
              background: "linear-gradient(135deg, #cbb2fe, #64ccc5)",
              border: "none",
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
