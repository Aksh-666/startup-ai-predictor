import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(BASE_DIR, "dataset", "yc_companies.csv")
cleaned_path = os.path.join(BASE_DIR, "cleaned")

os.makedirs(cleaned_path, exist_ok=True)

df = pd.read_csv(dataset_path)

print("Original Shape :", df.shape)

# -------------------------
# Keep only useful columns
# -------------------------

required_columns = [
    "Company Name",
    "One Liner",
    "Long Description",
    "Industry",
    "Stage",
    "Country",
    "Team Size",
    "Founders Count",
    "Founder 1 Bio",
    "Founder 1 Name"
]

df = df[required_columns]

# -------------------------
# Fill Missing Values
# -------------------------

df["One Liner"] = df["One Liner"].fillna("")

df["Long Description"] = df["Long Description"].fillna("")

df["Industry"] = df["Industry"].fillna("Unknown")

df["Stage"] = df["Stage"].fillna("Unknown")

df["Country"] = df["Country"].fillna("Unknown")

df["Founder 1 Bio"] = df["Founder 1 Bio"].fillna("")

df["Founder 1 Name"] = df["Founder 1 Name"].fillna("Unknown")

df["Team Size"] = df["Team Size"].fillna(0)

df["Founders Count"] = df["Founders Count"].fillna(1)

print("Cleaned Shape :", df.shape)

df.to_csv(
    os.path.join(cleaned_path, "yc_clean.csv"),
    index=False
)

print("✅ yc_clean.csv created successfully.")