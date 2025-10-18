import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAppleAlt, FaCarrot, FaFish, FaTint, FaUtensils, FaSearch } from "react-icons/fa";
import api from "../api/axios"; // ✅ Import your configured Axios instance

export default function Nutrition() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#000";
    document.body.style.overflowX = "hidden";
  }, []);

  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch nutrition info from your FastAPI backend
  const handleSearch = async () => {
    const food = query.trim();
    if (!food) {
      setResult("⚠️ Please enter a food name.");
      return;
    }

    try {
      setLoading(true);
      setResult("Fetching nutrition data...");

      // 🔗 Call your FastAPI route
      const response = await api.get(`/api/nutrition/nutritionix`, {
        params: { query: food },
      });

      const foodData = response.data.foods?.[0];
      if (!foodData) {
        setResult("⚠️ No data found. Please try another food.");
        return;
      }

      // 🧩 Nicely formatted response for the user
      const formatted = `
🍽️ Food: ${foodData.food_name}
🔥 Calories: ${foodData.nf_calories} kcal
🥩 Protein: ${foodData.nf_protein} g
🥑 Fat: ${foodData.nf_total_fat} g
🍞 Carbs: ${foodData.nf_total_carbohydrate} g
🧂 Sodium: ${foodData.nf_sodium} mg
`;

      setResult(formatted.trim());
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setResult("❌ Failed to fetch nutrition info. Please check your connection or backend.");
    } finally {
      setLoading(false);
    }
  };

  // === Keep your entire layout unchanged ===
  const nutritionData = [
    {
      icon: <FaAppleAlt size={35} color="#f6b6c3" />,
      title: "Fruits & Vegetables",
      desc: "Rich in vitamins, minerals, and fiber — these form the foundation of a balanced pregnancy diet.",
      tips: "Include a colorful variety like spinach, carrots, apples, and berries for essential antioxidants.",
    },
    {
      icon: <FaFish size={35} color="#64ccc5" />,
      title: "Proteins",
      desc: "Vital for your baby’s growth and tissue repair. Aim for lean sources of protein daily.",
      tips: "Try eggs, lentils, tofu, or grilled fish — all excellent, safe protein options for expecting moms.",
    },
    {
      icon: <FaTint size={35} color="#a0f0d0" />,
      title: "Hydration",
      desc: "Water supports nutrient transport and reduces swelling and fatigue.",
      tips: "Drink at least 8–10 glasses of water daily and include coconut water for natural electrolytes.",
    },
    {
      icon: <FaCarrot size={35} color="#cbb2fe" />,
      title: "Vitamins & Minerals",
      desc: "Calcium, iron, and folate are crucial for bone and brain development.",
      tips: "Eat fortified cereals, leafy greens, and dairy products to maintain strong health.",
    },
    {
      icon: <FaUtensils size={35} color="#ffcb77" />,
      title: "Meal Balance",
      desc: "Balanced meals keep your energy stable and your baby nourished.",
      tips: "Combine proteins, carbs, and veggies for every meal — avoid skipping breakfast!",
    },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden", fontFamily: "'Poppins', 'Nunito Sans', sans-serif" }}>
      {/* === Background and Content (unchanged) === */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 15% 20%, rgba(138,43,226,0.25), transparent 60%), radial-gradient(circle at 85% 70%, rgba(255,105,180,0.25), transparent 60%), radial-gradient(circle at 50% 100%, rgba(0,191,255,0.2), transparent 60%)", filter: "blur(100px)", animation: "auroraFloat 18s ease-in-out infinite alternate", zIndex: 0 }} />
      <style>{`@keyframes auroraFloat {0% { transform: translateY(0px) translateX(0px); }100% { transform: translateY(-25px) translateX(20px); }}`}</style>

      <div style={{ position: "relative", zIndex: 1, padding: "6rem 2rem 5rem 2rem", textAlign: "center" }}>
        {/* === Header and Cards (unchanged) === */}
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ fontSize: "3rem", fontWeight: "700", color: "#f6b6c3", textShadow: "0 0 10px #f6b6c366" }}>
          Nourish Your Body with{" "}
          <span style={{ color: "#cbb2fe", textShadow: "0 0 15px #cbb2feaa" }}>
            NutriMama
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} style={{ maxWidth: "700px", margin: "20px auto 60px auto", color: "#cfcfcf", fontSize: "1.1rem", lineHeight: "1.7" }}>
          Discover wholesome, pregnancy-safe meal plans designed to boost your energy, support fetal development, and keep you feeling strong and radiant throughout your journey.
        </motion.p>

        {/* === Cards (same) === */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "2.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          {nutritionData.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} style={{ backgroundColor: "#111", borderRadius: "20px", padding: "2rem", textAlign: "left", boxShadow: "0 0 25px rgba(203,178,254,0.15)", cursor: "pointer" }}>
              <div style={{ marginBottom: "1rem" }}>{item.icon}</div>
              <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: "#bfbfbf", fontSize: "1rem", lineHeight: "1.6", marginBottom: "10px" }}>{item.desc}</p>
              <p style={{ color: "#cbb2fe", fontSize: "0.95rem", lineHeight: "1.5", fontStyle: "italic" }}>💡 {item.tips}</p>
            </motion.div>
          ))}
        </div>

        {/* === Search Input (same layout) === */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} style={{ marginTop: "5rem", maxWidth: "600px", marginInline: "auto", background: "#0f0f0f", borderRadius: "50px", padding: "0.8rem 1.2rem", boxShadow: "0 0 25px rgba(203,178,254,0.15)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <FaSearch color="#cbb2fe" size={18} />
          <input type="text" placeholder="Search food (e.g., coffee, banana)..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "1rem" }} />
          <button onClick={handleSearch} disabled={loading} style={{ background: "linear-gradient(135deg, #cbb2fe, #64ccc5)", border: "none", borderRadius: "30px", padding: "8px 18px", cursor: "pointer", fontWeight: "600", color: "#000", transition: "transform 0.3s ease" }}>
            {loading ? "..." : "Check"}
          </button>
        </motion.div>

        {result && (
          <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: "1.5rem", color: "#fff", fontSize: "1.1rem", backgroundColor: "#151515", padding: "1rem 2rem", borderRadius: "20px", display: "inline-block", boxShadow: "0 0 20px rgba(203,178,254,0.25)", whiteSpace: "pre-wrap", textAlign: "left" }}>
            {result}
          </motion.pre>
        )}
      </div>
    </div>
  );
}
