import os
import random
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# -------------------------------
# Load datasets
# -------------------------------

crunchbase = pd.read_csv(
    os.path.join(BASE_DIR, "cleaned", "crunchbase_clean.csv")
)

yc = pd.read_csv(
    os.path.join(BASE_DIR, "cleaned", "yc_clean.csv")
)

indian = pd.read_csv(
    os.path.join(BASE_DIR, "cleaned", "indian_clean.csv")
)

# -------------------------------
# Knowledge Maps
# -------------------------------

BUSINESS_MODEL = {

    "software":"SaaS",

    "finance":"B2B",

    "health":"B2B",

    "education":"Subscription",

    "enterprise":"B2B",

    "ecommerce":"Marketplace",

    "advertising":"Freemium",

    "biotech":"B2B",

    "games_video":"B2C"

}

CUSTOMERS = {

    "software":"Businesses",

    "finance":"SMEs",

    "health":"Hospitals",

    "education":"Students",

    "enterprise":"Large Enterprises",

    "ecommerce":"Online Customers",

    "advertising":"Marketing Teams",

    "biotech":"Healthcare Companies",

    "games_video":"Gamers"

}

GTM = {

    "software":"Product-Led Growth",

    "finance":"Enterprise Sales",

    "health":"Hospital Partnerships",

    "education":"Campus Ambassador Program",

    "enterprise":"Direct Sales",

    "ecommerce":"Digital Marketing",

    "advertising":"Inside Sales",

    "biotech":"Clinical Partnerships",

    "games_video":"Influencer Marketing"

}

PROBLEMS = {

    "software":"Businesses struggle with inefficient software workflows.",

    "finance":"Financial services remain inaccessible and expensive.",

    "health":"Healthcare operations are inefficient and fragmented.",

    "education":"Students need engaging digital learning.",

    "enterprise":"Large organizations need workflow automation.",

    "ecommerce":"Online sellers struggle with customer acquisition.",

    "advertising":"Brands struggle to reach the right audience.",

    "biotech":"Drug discovery is slow and expensive.",

    "games_video":"Players demand better gaming experiences."

}

COMPETITORS = {

    "finance":["Razorpay","CRED","Groww","PhonePe"],

    "software":["Notion","Slack","Atlassian"],

    "education":["BYJU'S","Unacademy","PhysicsWallah"],

    "health":["Practo","Apollo 24/7","Tata 1mg"],

    "enterprise":["Zoho","Freshworks"],

    "ecommerce":["Flipkart","Amazon","Meesho"],

    "advertising":["Google Ads","Meta Ads"],

    "biotech":["Moderna","Biocon"],

    "games_video":["Dream11","MPL"]
}

# -------------------------------

profiles=[]

for _, row in crunchbase.iterrows():

    industry=str(row["category_code"]).lower()

    industry=industry if industry in BUSINESS_MODEL else "software"

    stage=random.choice([
        "Idea",
        "Prototype",
        "MVP",
        "Seed",
        "Series A",
        "Series B",
        "Growth"
    ])

    if stage=="Idea":

        funding=random.randint(1000000,5000000)

        team=random.randint(2,5)

    elif stage=="Seed":

        funding=random.randint(5000000,30000000)

        team=random.randint(5,15)

    elif stage=="Series A":

        funding=random.randint(30000000,200000000)

        team=random.randint(20,60)

    else:

        funding=random.randint(200000000,1000000000)

        team=random.randint(60,200)

    yc_company=yc.sample(1).iloc[0]

    founder_count=int(yc_company["Founders Count"])

    experience="Experienced" if founder_count>=3 else "Intermediate"

    profiles.append({

        "startup_name":yc_company["Company Name"],

        "industry":industry.title(),

        "business_model":BUSINESS_MODEL[industry],

        "current_stage":stage,

        "country":yc_company["Country"],

        "funding_target":funding,

        "team_size":team,

        "founder_experience":experience,

        "problem_statement":PROBLEMS[industry],

        "target_customers":CUSTOMERS[industry],

        "key_competitors":", ".join(COMPETITORS[industry]),

        "gtm_strategy":GTM[industry]

    })

profiles=pd.DataFrame(profiles)

os.makedirs(
    os.path.join(BASE_DIR,"generated"),
    exist_ok=True
)

profiles.to_csv(

    os.path.join(
        BASE_DIR,
        "generated",
        "startup_profiles.csv"
    ),

    index=False

)

print("="*60)
print("Profiles Generated :",len(profiles))
print("="*60)
print(profiles.head())