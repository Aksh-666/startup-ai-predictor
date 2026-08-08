import pandas as pd

# Load dataset
df = pd.read_csv("../dataset/crunchbase.csv")

print("Original Shape :", df.shape)

# -------------------------------
# Remove unwanted columns
# -------------------------------

drop_columns = [
    "Unnamed: 0",
    "Unnamed: 6",
    "id",
    "object_id",
    "zip_code",
    "latitude",
    "longitude",
    "founded_at",
    "closed_at",
    "first_funding_at",
    "last_funding_at",
    "state_code.1"
]

df.drop(columns=drop_columns, inplace=True, errors="ignore")

# -------------------------------
# Fill Missing Values
# -------------------------------

df["age_first_milestone_year"] = df["age_first_milestone_year"].fillna(
    df["age_first_milestone_year"].median()
)

df["age_last_milestone_year"] = df["age_last_milestone_year"].fillna(
    df["age_last_milestone_year"].median()
)

# -------------------------------
# Encode Target
# -------------------------------

status_map = {
    "closed": 0,
    "acquired": 1
}

df["status"] = df["status"].map(status_map)

# Remove rows with invalid status
df = df.dropna(subset=["status"])

df["status"] = df["status"].astype(int)

# -------------------------------
# Save cleaned dataset
# -------------------------------

print("Cleaned Shape :", df.shape)

df.to_csv(
    "../cleaned/crunchbase_clean.csv",
    index=False
)

print("✅ crunchbase_clean.csv created successfully.")