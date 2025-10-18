// axios wrapper & mock endpoints for hackathon demo
import axios from 'axios';

// ✅ In Vite, use import.meta.env instead of process.env
// Add this in your project root .env file:  VITE_API_BASE=https://your-api-url.com
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Handle errors gracefully
const handleError = (err) => {
  console.error('API error:', err.message || err);
  throw err;
};

/**
 * API Functions
 */

// 🍎 Fetch Nutrition Data
export async function fetchNutrition(food) {
  try {
    const res = await api.get('/nutrition', { params: { q: food } });
    return res.data;
  } catch (e) {
    console.warn('⚠️ Using mock nutrition data due to API error.');
    return {
      food,
      calories: 120,
      protein: '5g',
      fat: '3g',
      carbs: '18g',
      tips: [
        'Include more leafy greens for iron',
        'Pair with vitamin C to aid absorption',
      ],
    };
  }
}

// 🤰 Fetch Pregnancy Tips
export async function fetchPregnancyTips(week = 20) {
  try {
    const res = await api.get('/pregnancy/tips', { params: { week } });
    return res.data;
  } catch (e) {
    console.warn('⚠️ Using mock pregnancy tips due to API error.');
    return {
      week,
      tips: [
        'Stay hydrated and take short walks daily.',
        'Consider prenatal vitamins as advised by your doctor.',
      ],
    };
  }
}

// 🩺 Check Symptoms
export async function checkSymptoms(text) {
  try {
    const res = await api.post('/symptom/check', { text });
    return res.data;
  } catch (e) {
    console.warn('⚠️ Using mock symptom check data due to API error.');
    return {
      summary: 'Mild symptoms, recommended to consult physician if persisting.',
      possible_conditions: ['Common cold', 'Mild dehydration'],
    };
  }
}

// 👩‍⚕️ Find Doctors Nearby
export async function findDoctors({ q = 'OBGYN', location = 'nearby' }) {
  try {
    const res = await api.get('/doctors/search', { params: { q, location } });
    return res.data;
  } catch (e) {
    console.warn('⚠️ Using mock doctor data due to API error.');
    return {
      doctors: [
        {
          name: 'Dr. Aarti Sharma',
          clinic: 'Sunrise Womens Care',
          distance: '2.1 km',
        },
        {
          name: 'Dr. Neha Patel',
          clinic: 'Bloom Clinic',
          distance: '3.4 km',
        },
      ],
    };
  }
}

export default api;
