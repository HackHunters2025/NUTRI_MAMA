// src/api/axios.js
import axios from "axios";

/**
 * ✅ NutriMama Axios Instance
 * Base URL points to FastAPI backend root (make sure backend is running on 8000)
 * Handles automatic JSON configuration, logging, and unified error handling
 */

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // 🚀 FastAPI backend (http://127.0.0.1:8000)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // ❌ Not needed unless you handle cookies/sessions
});

// 🧩 Request Interceptor — optional logging
api.interceptors.request.use(
  (config) => {
    // You can log or modify config here
    // console.log(`[Request] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

// 🧩 Response Interceptor — central error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`❌ API Error (${error.response.status}):`, error.response.data);
    } else {
      console.error("❌ Network/Server Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
