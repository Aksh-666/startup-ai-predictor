import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

from utils.config import (
    NUMERIC_FEATURES,
    CATEGORICAL_FEATURES,
    BOOLEAN_FEATURES,
    TARGET
)


# --------------------------------------------------
# Load Dataset
# --------------------------------------------------

def load_dataset():

    df = pd.read_csv("cleaned/crunchbase_clean.csv")

    return df


# --------------------------------------------------
# Feature Engineering
# --------------------------------------------------

def feature_engineering(df):

    # Funding efficiency
    df["funding_per_round"] = (
        df["funding_total_usd"] /
        (df["funding_rounds"] + 1)
    )

    # Milestone efficiency
    df["milestone_score"] = (
        df["milestones"] /
        (df["relationships"] + 1)
    )

    # Startup maturity
    df["startup_maturity"] = (
        df["age_last_funding_year"] -
        df["age_first_funding_year"]
    )

    return df


# --------------------------------------------------
# Prepare Data
# --------------------------------------------------

def prepare_data():

    df = load_dataset()

    df = feature_engineering(df)

    # Add engineered features
    numeric_features = NUMERIC_FEATURES + [
        "funding_per_round",
        "milestone_score",
        "startup_maturity"
    ]

    X = df[
        numeric_features +
        CATEGORICAL_FEATURES +
        BOOLEAN_FEATURES
    ]

    y = df[TARGET]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )

    # ----------------------------
    # Preprocessing Pipeline
    # ----------------------------

    preprocessor = ColumnTransformer(

        transformers=[

            (
                "cat",
                OneHotEncoder(handle_unknown="ignore"),
                CATEGORICAL_FEATURES
            ),

            (
                "num",
                "passthrough",
                numeric_features
            ),

            (
                "bool",
                "passthrough",
                BOOLEAN_FEATURES
            )

        ]

    )

    return (
        X_train,
        X_test,
        y_train,
        y_test,
        preprocessor
    )


# --------------------------------------------------
# Test
# --------------------------------------------------

if __name__ == "__main__":

    X_train, X_test, y_train, y_test, preprocessor = prepare_data()

    print("Training Shape :", X_train.shape)
    print("Testing Shape  :", X_test.shape)

    print("\nFeatures Used:")
    print(X_train.columns.tolist())