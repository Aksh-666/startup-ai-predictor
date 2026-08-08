import joblib

pipeline = joblib.load("model/startup_pipeline.pkl")

print("\n========== MODEL FEATURES ==========\n")

for i, feature in enumerate(pipeline.feature_names_in_, 1):
    print(f"{i}. {feature}")