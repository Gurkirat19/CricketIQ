# CricketIQ

Production-grade AI-powered cricket analytics platform with prediction, simulation, explainability, RAG assistant, 3D visuals, and premium dark UI.

## Quick start

1. Copy .env.example to .env and set keys
2. docker compose up --build
3. Visit frontend at http://localhost:5173 and backend at http://localhost:8000/docs

## Services
- Frontend: Vite + React 19 + TS + Tailwind + Framer Motion + R3F
- Backend: FastAPI + XGBoost/LightGBM ensemble + ChromaDB
- DB: PostgreSQL
- Vector DB: ChromaDB
