import joblib
import traceback

from utils.feature_mapper import map_frontend_input
from services.similarity import get_similar_startups

pipeline = joblib.load("model/startup_pipeline.pkl")


def predict_startup(frontend_data):

    try:

        # -----------------------------
        # Convert frontend input
        # -----------------------------

        model_input = map_frontend_input(frontend_data)

        print("\n========== MODEL INPUT ==========")
        print(model_input)

        # -----------------------------
        # ML Prediction
        # -----------------------------

        prediction = int(
            pipeline.predict(model_input)[0]
        )

        probability = float(
            pipeline.predict_proba(model_input)[0][1]
        )

        print("\nPrediction Done")

        # -----------------------------
        # Similar Startup Retrieval
        # -----------------------------

        similar = get_similar_startups({

            "industry":
                frontend_data["industry"],

            "country":
                frontend_data["country"],

            "stage":
                frontend_data["currentStage"],

            "funding":
                frontend_data["fundingTarget"],

            "team_size":
                frontend_data["teamSize"],

            "founder_count":
                2

        })

        print("Similarity Done")

        # -----------------------------
        # Clean Similarity Results
        # -----------------------------

        cleaned = []

        for s in similar:

            cleaned.append({

                "startup_name":
                    str(s["startup_name"]),

                "industry":
                    str(s["industry"]),

                "country":
                    str(s["country"]),

                "stage":
                    str(s["stage"]),

                "funding":
                    float(s["funding"])
                    if s["funding"] is not None
                    else 0.0,

                "similarity_score":
                    float(s["similarity_score"])

            })

        # -----------------------------
        # Risk Level
        # -----------------------------

        score = float(probability * 100)

        if score >= 80:
            risk = "Low"

        elif score >= 60:
            risk = "Medium"

        elif score >= 40:
            risk = "High"

        else:
            risk = "Critical"

        confidence = float(max(score, 100 - score))

        print(type(prediction))
        print(type(probability))
        print(type(score))
        print(type(confidence))

        # -----------------------------
        # Final Response
        # -----------------------------

        return {

            "prediction":
                "Likely to Succeed"
                if prediction == 1
                else "High Risk",

            "success_probability":
                float(round(score, 2)),

            "confidence":
                float(round(confidence, 2)),

            "risk_level":
                str(risk),

            "similar_startups":
                cleaned

        }

    except Exception as e:

        print("\n========== ERROR ==========")

        traceback.print_exc()

        raise Exception(str(e))