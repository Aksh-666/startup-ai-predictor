"""
Convert frontend input into Crunchbase ML features.
"""

import pandas as pd


def map_stage(stage):

    stage = str(stage).lower().strip()

    mapping = {
        "idea": 0,
        "prototype": 1,
        "mvp": 1,
        "pre-seed": 2,
        "seed": 2,
        "series a": 3,
        "series b": 4,
        "series c": 5,
        "growth": 6
    }

    return mapping.get(stage, 2)


def map_founder(exp):

    exp = str(exp).lower().strip()

    mapping = {
        "beginner": 2,
        "intermediate": 5,
        "experienced": 8,
        "expert": 10
    }

    return mapping.get(exp, 5)


def map_industry(industry):

    industry = str(industry).lower().strip()

    mapping = {

        "fintech": "finance",
        "finance": "finance",

        "healthcare": "health",
        "healthtech": "health",
        "health": "health",

        "edtech": "education",
        "education": "education",

        "e-commerce": "ecommerce",
        "ecommerce": "ecommerce",

        "saas": "software",
        "software": "software",

        "ai": "software",
        "artificial intelligence": "software",

        "gaming": "games_video",

        "enterprise": "enterprise",

        "marketing": "advertising",

        "biotech": "biotech",

        "consulting": "consulting"
    }

    return mapping.get(industry, "other")


def map_frontend_input(data):
    """
    Converts frontend JSON into the exact feature
    format expected by the trained XGBoost pipeline.
    """

    funding = float(data.get("fundingTarget", 0))

    stage = map_stage(
        data.get("currentStage", "Seed")
    )

    founder = map_founder(
        data.get("founderExperience", "Intermediate")
    )

    milestones = max(stage, 1)

    row = {

        # -------------------------
        # Original Features
        # -------------------------

        "category_code":
            map_industry(
                data.get("industry", "")
            ),

        "funding_total_usd":
            funding,

        "funding_rounds":
            stage,

        "relationships":
            founder,

        "milestones":
            milestones,

        "avg_participants":
            max(founder // 2, 1),

        "age_first_funding_year":
            stage,

        "age_last_funding_year":
            stage + 1,

        "age_first_milestone_year":
            max(stage - 1, 0),

        "age_last_milestone_year":
            stage,

        # -------------------------
        # Engineered Features
        # -------------------------

        "funding_per_round":
            funding / max(stage + 1, 1),

        "milestone_score":
            milestones * 2,

        "startup_maturity":
            stage,

        # -------------------------
        # Boolean Features
        # -------------------------

        "has_VC":
            int(funding >= 500000),

        "has_angel":
            int(funding < 500000),

        "has_roundA":
            int(stage >= 3),

        "has_roundB":
            int(stage >= 4),

        "has_roundC":
            int(stage >= 5),

        "has_roundD":
            int(stage >= 6),

        "is_top500":
            0

    }

    return pd.DataFrame([row])