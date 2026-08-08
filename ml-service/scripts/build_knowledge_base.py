import os
import re
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CLEANED = os.path.join(BASE_DIR, "cleaned")
GENERATED = os.path.join(BASE_DIR, "generated")

os.makedirs(GENERATED, exist_ok=True)

# -------------------------------------------------------
# Load datasets
# -------------------------------------------------------

crunch = pd.read_csv(os.path.join(CLEANED, "crunchbase_clean.csv"))
yc = pd.read_csv(os.path.join(CLEANED, "yc_clean.csv"))
indian = pd.read_csv(os.path.join(CLEANED, "indian_clean.csv"))

# -------------------------------------------------------
# Helper
# -------------------------------------------------------

def clean_money(value):

    if pd.isna(value):
        return 0

    if isinstance(value, (int, float)):
        return float(value)

    value = str(value)

    value = value.replace(",", "")
    value = value.replace("$", "")
    value = value.replace("₹", "")

    nums = re.findall(r"\d+\.?\d*", value)

    if len(nums) == 0:
        return 0

    return float(nums[0])


# -------------------------------------------------------
# Stage Mapping
# -------------------------------------------------------

STAGE_MAP = {

    "Seed Funding": "Seed",

    "Seed": "Seed",

    "Angel": "Idea",

    "Series A": "Series A",

    "Series B": "Series B",

    "Series C": "Series C",

    "Private Equity": "Growth",

    "Debt": "Growth",

    "Venture": "Growth"
}


# -------------------------------------------------------
# Crunchbase
# -------------------------------------------------------

crunch_df = pd.DataFrame({

    "startup_name":
        crunch["name"],

    "industry":
        crunch["category_code"],

    "country":
        "USA",

    "city":
        crunch["city"],

    "stage":
        crunch["status"],

    "funding":
        crunch["funding_total_usd"],

    "team_size":
        crunch["relationships"],

    "founder_count":
        crunch["avg_participants"],

    "description":
        crunch["category_code"]

})


# -------------------------------------------------------
# YC
# -------------------------------------------------------

yc_df = pd.DataFrame({

    "startup_name":
        yc["Company Name"],

    "industry":
        yc["Industry"],

    "country":
        yc["Country"],

    "city":
        "",

    "stage":
        yc["Stage"],

    "funding":
        0,

    "team_size":
        yc["Team Size"],

    "founder_count":
        yc["Founders Count"],

    "description":
        yc["One Liner"]

})


# -------------------------------------------------------
# Indian
# -------------------------------------------------------

indian_stage = []

for value in indian["InvestmentnType"]:

    indian_stage.append(

        STAGE_MAP.get(

            str(value),

            "Seed"

        )

    )

indian_df = pd.DataFrame({

    "startup_name":
        indian["Startup Name"],

    "industry":
        indian["Industry Vertical"],

    "country":
        "India",

    "city":
        indian["City  Location"],

    "stage":
        indian_stage,

    "funding":
        indian["Amount in USD"].apply(clean_money),

    "team_size":
        5,

    "founder_count":
        2,

    "description":
        indian["SubVertical"]

})

# -------------------------------------------------------
# Merge
# -------------------------------------------------------

knowledge = pd.concat(

    [

        crunch_df,

        yc_df,

        indian_df

    ],

    ignore_index=True

)

# -------------------------------------------------------
# Cleaning
# -------------------------------------------------------

knowledge["startup_name"] = knowledge["startup_name"].fillna("Unknown")

knowledge["industry"] = knowledge["industry"].fillna("Unknown")

knowledge["country"] = knowledge["country"].fillna("Unknown")

knowledge["city"] = knowledge["city"].fillna("Unknown")

knowledge["stage"] = knowledge["stage"].fillna("Unknown")

knowledge["description"] = knowledge["description"].fillna("")

knowledge["funding"] = knowledge["funding"].fillna(0)

knowledge["team_size"] = knowledge["team_size"].fillna(5)

knowledge["founder_count"] = knowledge["founder_count"].fillna(2)

knowledge = knowledge.drop_duplicates(

    subset=["startup_name"]

)

knowledge = knowledge.reset_index(drop=True)

# -------------------------------------------------------
# Save
# -------------------------------------------------------

OUTPUT = os.path.join(

    GENERATED,

    "knowledge_base.csv"

)

knowledge.to_csv(

    OUTPUT,

    index=False

)

print("=" * 60)

print("Knowledge Base Created Successfully!")

print("=" * 60)

print()

print("Rows :", len(knowledge))

print("Columns :", len(knowledge.columns))

print()

print(knowledge.head())