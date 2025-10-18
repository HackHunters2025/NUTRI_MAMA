# 🌸 NutriMama – AI-Powered Pregnancy Wellness Platform

NutriMama is an AI-driven web platform designed to support expecting mothers throughout their pregnancy journey.
It provides personalized nutrition plans, symptom insights, doctor recommendations, and an AI chatbot — all within a modern, intuitive dashboard.

## 🚀 Features
### 🤖 AI Chatbot (Google Gemini 2.5 Flash)

- Real-time, conversational guidance for safe pregnancy and - nutrition tips

- Powered by Google Gemini 2.5 Flash API

- Delivers contextual and medically safe responses

 ### 🩺 Smart Symptom Checker

- AI-based analysis of pregnancy-related symptoms

- Displays risk insights and confidence scores

### 👩‍⚕️ Doctor Finder

- Locate nearby gynecologists, obstetricians, and nutritionists

- Automatically detects your city/location

### 🍎 Personalized Nutrition Tips

- Trimester-wise diet and supplement guidance

- Auto-adjusts recommendations based on user input

### 💬 Modern, Responsive UI

- Built using React, Tailwind CSS, and Framer Motion

- Clean, mobile-friendly, and interactive experience

## ⚙️ Tech Stack
| Layer           | Technologies                                      |
| --------------- | ------------------------------------------------- |
| Frontend        | React.js, Tailwind CSS, Framer Motion, Axios      |
| Backend         | Python (FastAPI)                                  |
| AI Integration  | Google Gemini 2.5 Flash API                       |
| Database        | SQLite / PostgreSQL (Optional)                    |
| Version Control | Git + GitHub                                      |

## 📂 Folder Structure
```
NUTRI_MAMA/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   └── ml_scripts/
│   ├── trained_symptom_model/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── .gitignore
├── README.md
└── ...

```
### 🛠️ Installation and Setup

1️⃣ Clone the Repository
``` 
git clone https://github.com/kritika-2005/NUTRI_MAMA.git
cd NUTRI_MAMA
```

2️⃣ Setup Backend
``` 
cd backend
pip install -r requirements.txt

``` 



Run the backend:
``` 
uvicorn app.main:app --reload
``` 

Backend runs on http://localhost:8000


3️⃣ Setup Frontend
``` 
cd ../frontend
npm install
npm start
``` 


Frontend runs on http://localhost:3000

### 🔑 API Integration (Google Gemini)

NutriMama integrates Google Gemini 2.5 Flash API for AI-powered conversations.

Example endpoint:
``` 
https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY
``` 

## 📦 API Endpoints
| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | -------------------------------- |
| POST   | /chatbot                   | Get AI-generated response        |
| POST   | /symptom-checker           | Analyze pregnancy symptoms       |
| GET    | /doctor-finder             | Find doctors nearby              |
| GET    | /nutrition-tips            | Personalized nutrition insights  |

## 🤝 Contributors
| Name          | Role                                |
| --------------| ----------------------------------- |
| Kritika Sengupta   | Frontend Developer & AI Integration |
| Soumyadeep Sarkar   | Backend & Model Development         |
| Meghana Naidu  | API Testing          |
| Chinmayi Kallurmath  | API Collection       |
| Aparna Sahu   | Planner         |

## 💡 Future Enhancements

- 🧬 Trimester-wise nutrition planner

- 📊 Pregnancy progress tracker

- 🧘 Wellness & exercise guidance

- 📱 Mobile PWA version for offline use

- 🧪 Testing

  Frontend: React testing with mock APIs

  Backend: FastAPI Swagger UI at /docs

  API Testing: Use Postman for Gemini integration

 ## 📸 Screenshots
| Page             | Description                    |
| ---------------- | ------------------------------ |
| 🏠 Dashboard      | Overview of pregnancy journey  |
| 💬 Chatbot       | AI assistance & guidance       |
| 🍎 Nutrition      | Personalized meal tips         |
| 🩺 Symptom Check  | Smart risk analysis            |
| 👩‍⚕ Doctor Finder | Locate nearby specialists      |

##  License

Licensed under the MIT License — free to use, modify, and share.

###  ❤️ Acknowledgements

Google Gemini API – for contextual AI responses

FastAPI – for efficient backend development

React + Framer Motion – for a beautiful, animated UI
```
“Because every mom deserves guidance as nurturing as she is.” 🌷
```
