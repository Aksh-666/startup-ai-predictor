import os
import joblib

from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

from xgboost import XGBClassifier

from preprocess import prepare_data
from utils.config import MODEL_PATH


def train_model():

    print("=" * 60)
    print("Loading Dataset...")
    print("=" * 60)

    X_train, X_test, y_train, y_test, preprocessor = prepare_data()

    print("Training Samples :", len(X_train))
    print("Testing Samples  :", len(X_test))

    print("\nBuilding Pipeline...")

    pipeline = Pipeline([

        ("preprocessor", preprocessor),

        ("model",
         XGBClassifier(

             n_estimators=200,
             max_depth=6,
             learning_rate=0.05,
             subsample=0.8,
             colsample_bytree=0.8,
             random_state=42,
             eval_metric="logloss"

         ))
    ])

    print("\nTraining Model...")

    pipeline.fit(X_train, y_train)

    print("\nEvaluating Model...")

    predictions = pipeline.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    precision = precision_score(y_test, predictions)

    recall = recall_score(y_test, predictions)

    f1 = f1_score(y_test, predictions)

    print("\n========== RESULTS ==========")

    print(f"Accuracy : {accuracy:.4f}")

    print(f"Precision: {precision:.4f}")

    print(f"Recall   : {recall:.4f}")

    print(f"F1 Score : {f1:.4f}")

    print("\nConfusion Matrix")

    print(confusion_matrix(y_test, predictions))

    print("\nClassification Report\n")

    print(classification_report(y_test, predictions))

    os.makedirs("model", exist_ok=True)

    joblib.dump(pipeline, MODEL_PATH)

    joblib.dump(
        X_train.columns.tolist(),
        "model/feature_names.pkl"
        )

    print("\nModel Saved Successfully!")

    print(MODEL_PATH)
    print("✅ Feature names saved!")


if __name__ == "__main__":

    train_model()