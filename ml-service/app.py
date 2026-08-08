from fastapi import FastAPI
from pydantic import BaseModel

from predict import predict_startup

app = FastAPI(
    title="Startup Predictor ML API",
    version="1.0.0"
)


# ----------------------------
# Request Schema
# ----------------------------

class StartupInput(BaseModel):

    startupName: str = ""

    industry: str

    businessModel: str = ""

    currentStage: str

    country: str = ""

    fundingTarget: float

    teamSize: int

    founderExperience: str

    coreProblemStatement: str = ""

    targetCustomers: str = ""

    keyCompetitors: str = ""

    gtmStrategy: str = ""


# ----------------------------
# Health Check
# ----------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "Startup Predictor ML"
    }


# ----------------------------
# Prediction Endpoint
# ----------------------------

from fastapi import HTTPException
import traceback

from fastapi import HTTPException
import traceback

@app.post("/predict")
def predict(data: StartupInput):

    print("STEP 1")

    result = predict_startup(data.model_dump())

    print("STEP 2")

    return result