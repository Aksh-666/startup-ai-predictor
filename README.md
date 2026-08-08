# Startup AI Predictor

An AI-powered startup intelligence platform that combines machine learning and Generative AI to evaluate startup success potential, identify similar startups, assess risk, and generate actionable business recommendations.

## Overview

Startup AI Predictor helps founders and investors evaluate a startup using structured business information such as industry, business model, startup stage, funding requirements, team size, founder experience, target customers, competitors, and go-to-market strategy.

The platform combines an **XGBoost-based prediction pipeline**, a **startup similarity engine**, and **Gemini AI** to transform structured startup data into an end-to-end business analysis.

## Problem Statement

Evaluating a startup's potential often requires analyzing multiple factors such as market conditions, business model, funding requirements, team experience, competition, and growth strategy.

Traditional evaluation methods can be time-consuming, subjective, and difficult to scale.

Startup AI Predictor addresses this by combining machine learning with Generative AI to provide a structured, data-driven assessment of a startup's potential along with actionable recommendations for growth, funding, and market entry.

## Key Features

- **Startup Success Prediction**  
  Predicts the probability of startup success using an XGBoost-based machine learning pipeline.

- **Risk Assessment**  
  Classifies the startup's overall risk level based on the prediction.

- **Similar Startup Discovery**  
  Identifies startups with similar characteristics using the generated startup knowledge base.

- **AI-Powered Business Analysis**  
  Uses Gemini AI to generate strengths, weaknesses, opportunities, and threats.

- **Funding Strategy**  
  Generates AI-based funding recommendations based on the startup's profile and funding target.

- **Go-To-Market Strategy**  
  Provides recommendations for customer acquisition and market entry.

- **Investor Readiness Analysis**  
  Evaluates the startup's preparedness from an investor perspective.

- **Growth Planning**  
  Generates a structured growth plan with key areas to focus on.

- **Risk Summary**  
  Provides an AI-generated summary of the major execution, market, technical, and adoption risks.

 ## AI & ML Pipeline

The platform follows a multi-stage analysis pipeline:

Startup Input
↓
Data Preprocessing
↓
XGBoost Prediction
↓
Startup Similarity Analysis
↓
Business Context Generation
↓
Gemini AI Analysis
↓
Combined Prediction & Recommendations
↓
Interactive Dashboard


### Machine Learning

The machine learning service processes structured startup information and generates a success probability and risk assessment using an XGBoost-based prediction pipeline.

The ML service is implemented in Python using libraries including:

- Python
- XGBoost
- Scikit-learn
- Pandas
- NumPy

### Similar Startup Analysis

The system maintains a generated startup knowledge base derived from multiple startup datasets.

The similarity engine compares the submitted startup profile with available startup profiles and returns the most relevant similar startups along with similarity scores.

### Generative AI

Gemini AI receives the structured startup context together with the ML prediction and similarity results.

It generates:

- Strengths
- Weaknesses
- Opportunities
- Threats
- Funding Strategy
- Go-To-Market Recommendation
- Investor Readiness
- Growth Plan
- Risk Summary


## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React

### Backend
- Node.js
- Express.js
- REST APIs

### Machine Learning
- Python
- XGBoost
- Scikit-learn
- Pandas
- NumPy

### Generative AI
- Google Gemini API

### Database
- MongoDB

### Tools
- Git
- GitHub
- Postman


## Dataset Methodology

The ML pipeline uses three startup datasets:

- Crunchbase startup data
- Y Combinator company data
- Indian startup data

The datasets contain different companies and are not treated as duplicate records of the same startups.

Instead, they are used as complementary sources to improve the coverage and diversity of the startup knowledge base.

### Data Processing

1. Each dataset is cleaned independently.
2. Relevant features are standardized and mapped into a common startup profile format.
3. The processed datasets are combined into a unified startup knowledge base.
4. The resulting profiles are used by the similarity engine to find startups with characteristics similar to the user's startup.
5. The ML training pipeline uses the prepared features to generate the startup success prediction.

The Indian startup dataset provides additional regional context, while Crunchbase and Y Combinator data provide broader startup ecosystem coverage.

### Benchmarking

A 20% portion of the prepared data was reserved as a benchmark/reference set during model evaluation. This was used to assess how the trained model performs on data that was not used for fitting the model.

The 20% benchmark is an evaluation split and should not be interpreted as the model's accuracy or success rate.

## Project Architecture

The platform is divided into three main layers: frontend, backend, and machine learning services.

```text
                    ┌──────────────────────────┐
                    │       React Frontend      │
                    │      TypeScript + Vite    │
                    └────────────┬─────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌──────────────────────────┐
                    │     Node.js + Express     │
                    │        Backend API        │
                    └────────────┬─────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
                  ▼                             ▼
       ┌─────────────────────┐       ┌─────────────────────┐
       │   FastAPI ML        │       │     Gemini AI       │
       │      Service        │       │   Business Analysis │
       │                     │       │                     │
       │ XGBoost Prediction  │       │ SWOT                │
       │ Risk Assessment     │       │ Funding Strategy    │
       │ Similar Startups    │       │ GTM Strategy        │
       └──────────┬──────────┘       │ Growth Plan         │
                  │                  │ Investor Readiness  │
                  │                  └──────────┬──────────┘
                  │                             │
                  └──────────────┬──────────────┘
                                 ▼
                    ┌──────────────────────────┐
                    │    Combined AI Report    │
                    │                          │
                    │ Prediction + Risk        │
                    │ Similar Startups         │
                    │ SWOT + Recommendations   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Reports & Recommendations│
                    │        Dashboard          │
                    └──────────────────────────┘


## Project Structure

```text
startup-ai-predictor/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsView.tsx
│   │   │   ├── DashboardView.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InputView.tsx
│   │   │   ├── RecommendationsView.tsx
│   │   │   └── ReportsView.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── data.ts
│   │   ├── types.ts
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── default.js
│   ├── controllers/
│   │   └── startupController.js
│   ├── models/
│   │   └── Startup.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── predictionService.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── ml-service/
│   ├── dataset/
│   │   ├── crunchbase.csv
│   │   ├── indian_startup.csv
│   │   └── yc_companies.csv
│   ├── cleaned/
│   ├── generated/
│   ├── model/
│   │   ├── feature_names.pkl
│   │   └── startup_pipeline.pkl
│   ├── scripts/
│   ├── services/
│   │   └── similarity.py
│   ├── utils/
│   ├── app.py
│   ├── predict.py
│   ├── preprocess.py
│   ├── train.py
│   └── requirements.txt
│
├── README.md
└── .gitignore


## Installation & Running Locally

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Python 3.10+
- Git
- MongoDB Atlas account
- Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Aksh-666/startup-ai-predictor.git
cd startup-ai-predictor
```

### 2. Install Frontend Dependencies

Open a terminal in the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

### 3. Install Backend Dependencies

Open a new terminal in the project root:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
ML_SERVICE_URL=http://127.0.0.1:8000
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 4. Install ML Service Dependencies

Open another terminal in the project root:

```bash
cd ml-service
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the ML service:

```bash
uvicorn app:app --reload --port 8000
```

The ML service will run at:

```text
http://127.0.0.1:8000
```

### 5. Run the Complete Application

Keep all three services running simultaneously.

#### Terminal 1 — ML Service

```powershell
cd ml-service
venv\Scripts\activate
uvicorn app:app --reload --port 8000
```

#### Terminal 2 — Backend

```bash
cd backend
npm run dev
```

#### Terminal 3 — Frontend

```bash
cd frontend
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### Application Flow

```text
User
  ↓
React + TypeScript Frontend
  ↓
Node.js + Express Backend
  ↓
FastAPI ML Service
  ↓
XGBoost Prediction
  ↓
Similar Startup Analysis
  ↓
Gemini AI Analysis
  ↓
Reports & Recommendations
```


## API Endpoints

### Backend API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/analyze` | Analyzes startup data and returns prediction, risk assessment, similar startups, and Gemini AI analysis |
| `GET` | `/api/test` | Checks whether the backend API is running |

### ML Service

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/predict` | Generates startup success prediction and similarity results |

The backend acts as the main API layer and communicates with the ML service and Gemini AI before returning the combined analysis to the frontend.

## Deployment

The application is designed as a multi-service architecture:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **ML Service:** FastAPI + Python
- **Database:** MongoDB Atlas
- **Generative AI:** Google Gemini API

The frontend, backend, and ML service can be deployed independently and connected through environment-based API URLs.

### Production Environment Variables

#### Frontend

```env
VITE_API_URL=https://your-backend-url/api
```

#### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
ML_SERVICE_URL=https://your-ml-service-url
```

> Never commit actual API keys, database credentials, or JWT secrets to GitHub.

## Future Scope

- Improve prediction accuracy with larger and more diverse startup datasets.
- Add real-time startup and market intelligence.
- Introduce additional investor and funding data sources.
- Improve personalized recommendations using historical startup outcomes.
- Add advanced founder and market analytics.
- Deploy the complete system as a scalable cloud-based platform.

## Disclaimer

Startup AI Predictor is an AI-assisted analytical tool and should not be considered a guarantee of startup success or a substitute for professional investment, financial, legal, or business advice.

Predictions and recommendations are generated from available startup data, machine learning models, and Generative AI analysis.
