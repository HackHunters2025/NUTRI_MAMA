// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Nutrition from "./pages/Nutrition";
import PregnancyTips from "./pages/PregnancyTips";
import SymptomChecker from "./pages/SymptomChecker";
import DoctorFinder from "./pages/DoctorFinder";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg trasparent relative overflow-hidden">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/pregnancy" element={<PregnancyTips />} />
          <Route path="/symptom" element={<SymptomChecker />} />
          <Route path="/doctors" element={<DoctorFinder />} />
          <Route
            path="*"
            element={
              <div className="container card p-10 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Page not found
                </h2>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
