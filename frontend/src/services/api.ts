const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function analyzeStartup(data: any) {

    const response = await fetch(`${API_URL}/analyze`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            startupName: data.name,

            industry: data.industry,

            businessModel: data.businessModel,

            currentStage: data.stage,

            country: data.hqCountry,

            fundingTarget: Number(data.fundingTarget),

            teamSize: Number(data.teamSize),

            founderExperience:
                data.founderExperience === 0
                    ? "Beginner"
                    : data.founderExperience === 1
                    ? "Intermediate"
                    : "Experienced",

            coreProblemStatement: data.coreProblem,

            targetCustomers: data.targetCustomers,

            keyCompetitors: data.keyCompetitors,

            gtmStrategy: data.gtmStrategy

        })

    });

    return await response.json();
}