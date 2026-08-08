import os
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.neighbors import NearestNeighbors

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA = pd.read_csv(
    os.path.join(
        BASE_DIR,
        "generated",
        "knowledge_base.csv"
    )
)

FEATURES = [
    "industry",
    "country",
    "stage",
    "funding",
    "team_size",
    "founder_count"
]

CATEGORICAL = [
    "industry",
    "country",
    "stage"
]

NUMERIC = [
    "funding",
    "team_size",
    "founder_count"
]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            CATEGORICAL
        ),
        (
            "num",
            StandardScaler(),
            NUMERIC
        )
    ]
)

X = preprocessor.fit_transform(DATA[FEATURES])

model = NearestNeighbors(
    n_neighbors=5,
    metric="cosine"
)

model.fit(X)


def get_similar_startups(user):

    query = pd.DataFrame([{

        "industry":
            user["industry"],

        "country":
            user["country"],

        "stage":
            user["stage"],

        "funding":
            float(user["funding"]),

        "team_size":
            int(user["team_size"]),

        "founder_count":
            int(user["founder_count"])

    }])

    query_vector = preprocessor.transform(query)

    distances, indices = model.kneighbors(query_vector)

    results = []

    for distance, idx in zip(distances[0], indices[0]):

        row = DATA.iloc[idx]

        results.append({

            "startup_name":
                row["startup_name"],

            "industry":
                row["industry"],

            "country":
                row["country"],

            "stage":
                row["stage"],

            "funding":
                row["funding"],

            "similarity_score":
                round((1 - distance) * 100, 2)

        })

    return results