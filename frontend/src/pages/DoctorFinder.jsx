// src/pages/DoctorFinder.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarCheck, FaUserMd } from "react-icons/fa";

// --- Step 1: Gemini 2.5 Flash API setup ---
const API_KEY = "";
const api_version = "v1";
const model_name = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/${api_version}/models/${model_name}:generateContent?key=${API_KEY}`;

export default function DoctorFinder() {
  const [location, setLocation] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [autoDetectedCity, setAutoDetectedCity] = useState("");
  const [loading, setLoading] = useState(false);

  // 🩺 Default fallback data
  const mockDoctors = [
    {
      name: "Dr. Riya Verma",
      speciality: "Gynecologist",
      location: "Delhi",
      experience: "9 years",
      contact: "9876543210",
    },
    {
      name: "Dr. Meera Kapoor",
      speciality: "Obstetrician",
      location: "Mumbai",
      experience: "7 years",
      contact: "8765432109",
    },
    {
      name: "Dr. Priya Nair",
      speciality: "Nutritionist",
      location: "Bangalore",
      experience: "6 years",
      contact: "7654321098",
    },
    {
      name: "Dr. Kavita Iyer",
      speciality: "Wellness Expert",
      location: "Chennai",
      experience: "12 years",
      contact: "6543210987",
    },
  ];

  // 🌍 Auto-detect city (mock for now)
  useEffect(() => {
    setAutoDetectedCity("Bangalore");
    setLocation("Bangalore");
  }, []);

  // 🔍 Handle Search using Gemini 2.5 Flash
  const handleSearch = async () => {
    if (!location) return;
    setLoading(true);
    setFilteredDoctors([]);

    try {
      const prompt = `
      You are a healthcare assistant AI. Provide a list of 4 verified and trustworthy doctors related to pregnancy, women's health, or wellness from ${location}.
      Each doctor must be represented in JSON array format, strictly following this schema:

      [
        {
          "name": "Dr. <Full Name>",
          "speciality": "<Speciality like Gynecologist, Obstetrician, Nutritionist>",
          "location": "${location}",
          "experience": "<X years>",
          "contact": "<10-digit number>"
        }
      ]

      The data should look realistic and location-appropriate.
      `;

      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) throw new Error("Gemini request failed");

      const data = await response.json();
      const textResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

      // Attempt to parse JSON safely
      const match = textResponse.match(/\[[\s\S]*\]/);
      let parsedDoctors = [];

      if (match) {
        parsedDoctors = JSON.parse(match[0]);
      }

      if (parsedDoctors.length > 0) {
        setFilteredDoctors(parsedDoctors);
      } else {
        console.warn("No valid data from Gemini, using mock fallback.");
        setFilteredDoctors(
          mockDoctors.filter((d) =>
            d.location.toLowerCase().includes(location.toLowerCase())
          )
        );
      }
    } catch (error) {
      console.error("❌ Gemini API failed:", error);
      setFilteredDoctors(
        mockDoctors.filter((d) =>
          d.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const displayedDoctors =
    filteredDoctors.length > 0 ? filteredDoctors : mockDoctors;

  // 🧠 UI remains unchanged
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000, #0a0a0a, #000000)",
        minHeight: "100vh",
        padding: "80px 20px",
        color: "#e5e5e5",
        fontFamily: "'Poppins', 'Nunito Sans', sans-serif",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          color: "#cbb2fe",
          fontSize: "2.5rem",
          marginBottom: "10px",
        }}
      >
        Find Trusted Doctors
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          textAlign: "center",
          color: "#cfcfcf",
          fontSize: "1rem",
          marginBottom: "40px",
        }}
      >
        Search for nearby specialists to guide you through your motherhood and wellness journey.
        <br />
        {autoDetectedCity && (
          <span style={{ color: "#64ccc5" }}>
            Auto-detected city: {autoDetectedCity}
          </span>
        )}
      </motion.p>

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Enter your city or area"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "30px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            width: "260px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: "12px 28px",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(135deg, #cbb2fe, #64ccc5)",
            color: "#000",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 0 15px #64ccc588",
            transition: "transform 0.3s ease",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Doctor Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {displayedDoctors.map((doctor, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            style={{
              background: "#0f0f0f",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 0 25px #ffffff11",
              cursor: "pointer",
            }}
          >
            <FaUserMd size={32} color="#64ccc5" style={{ marginBottom: "10px" }} />
            <h3 style={{ color: "#cbb2fe", marginBottom: "8px" }}>{doctor.name}</h3>
            <p style={{ color: "#cfcfcf", fontSize: "0.95rem" }}>{doctor.speciality}</p>
            <p style={{ color: "#a9a9a9", fontSize: "0.9rem" }}>
              <FaMapMarkerAlt size={13} style={{ marginRight: "5px" }} />
              {doctor.location}
            </p>
            <p style={{ color: "#a9a9a9", fontSize: "0.9rem" }}>
              Experience: {doctor.experience}
            </p>
            <p style={{ color: "#a9a9a9", fontSize: "0.9rem" }}>
              Contact: {doctor.contact}
            </p>

            <button
              style={{
                marginTop: "15px",
                border: "none",
                padding: "10px 24px",
                borderRadius: "25px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #f6b6c3, #64ccc5)",
                color: "#000",
                boxShadow: "0 0 15px #64ccc588",
                cursor: "not-allowed",
                opacity: 0.6,
              }}
            >
              <FaCalendarCheck style={{ marginRight: "8px" }} />
              Book Appointment (Coming Soon)
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
