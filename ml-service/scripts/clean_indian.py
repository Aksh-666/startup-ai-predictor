import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

dataset_path = os.path.join(BASE_DIR, "dataset", "indian_startup.csv")
cleaned_path = os.path.join(BASE_DIR, "cleaned")

os.makedirs(cleaned_path, exist_ok=True)

df = pd.read_csv(dataset_path)

print("Original Shape :", df.shape)

# -------------------------
# Drop unnecessary columns
# -------------------------

df.drop(columns=["Sr No", "Remarks"], inplace=True, errors="ignore")

# -------------------------
# Fill Missing Values
# -------------------------

df["Industry Vertical"] = df["Industry Vertical"].fillna("Unknown")

df["SubVertical"] = df["SubVertical"].fillna("Unknown")

df["City  Location"] = df["City  Location"].fillna("Unknown")

df["Investors Name"] = df["Investors Name"].fillna("Unknown")

df["InvestmentnType"] = df["InvestmentnType"].fillna("Unknown")

df["Amount in USD"] = df["Amount in USD"].fillna("0")

# Remove commas

df["Amount in USD"] = (
    df["Amount in USD"]
    .astype(str)
    .str.replace(",", "", regex=False)
)

# Convert to numeric

df["Amount in USD"] = pd.to_numeric(
    df["Amount in USD"],
    errors="coerce"
)

df["Amount in USD"] = df["Amount in USD"].fillna(0)

print("Cleaned Shape :", df.shape)

df.to_csv(
    os.path.join(cleaned_path, "indian_clean.csv"),
    index=False
)

print("✅ indian_clean.csv created successfully.")