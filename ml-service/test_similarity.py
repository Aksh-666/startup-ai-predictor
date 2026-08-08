from services.similarity import get_similar_startups

result = get_similar_startups({

    "industry": "Finance",

    "country": "India",

    "stage": "Seed",

    "funding": 5000000,

    "team_size": 10,

    "founder_count": 2

})

for r in result:
    print(r)