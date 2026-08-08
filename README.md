<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/324c9b5b-6b81-4343-816f-69f158d0deb0

## Run Locally

This repository now includes:

- `frontend/` — React + Vite app
- `backend/` — Express server and API routes
- `ml-service/` — Python ML service with FastAPI

### Frontend

Use the existing `frontend/` app with Vite.

### Backend

```bash
cd backend
npm install
npm run dev
```

### ML Service

```bash
cd ml-service
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Notes

- `backend/` proxies prediction requests to `ml-service/`
- `ml-service/` includes training and prediction scaffolding
