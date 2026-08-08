const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeStartup(startup, prediction) {

    const similarStartups =
        prediction.similar_startups?.length
            ? prediction.similar_startups
                .map(
                    (s, i) => `
${i + 1}. ${s.startup_name}
Industry: ${s.industry}
Stage: ${s.stage}
Country: ${s.country}
Funding: ${s.funding}
Similarity Score: ${s.similarity_score}%
`
                )
                .join("\n")
            : "No similar startups found.";

    const prompt = `
You are an experienced Venture Capital investor, startup mentor and startup analyst.

A Machine Learning model has already evaluated this startup.

=====================
STARTUP DETAILS
=====================

Startup Name: ${startup.startupName}

Industry: ${startup.industry}

Business Model: ${startup.businessModel}

Stage: ${startup.currentStage}

Country: ${startup.country}

Funding Target: ${startup.fundingTarget}

Team Size: ${startup.teamSize}

Founder Experience: ${startup.founderExperience}

Problem Statement:
${startup.coreProblemStatement}

Target Customers:
${startup.targetCustomers}

Competitors:
${startup.keyCompetitors}

Go-To-Market Strategy:
${startup.gtmStrategy}

=====================
ML RESULT
=====================

Prediction:
${prediction.prediction}

Success Probability:
${prediction.success_probability}%

Confidence:
${prediction.confidence}%

Risk Level:
${prediction.risk_level}

=====================
SIMILAR STARTUPS
=====================

${similarStartups}

Use these startups while generating recommendations.
Reference them naturally whenever useful.
Do not invent startup names.

=====================
RETURN JSON ONLY
=====================

{
  "strengths": [],
  "weaknesses": [],
  "opportunities": [],
  "threats": [],
  "funding_strategy": "",
  "gtm_recommendation": "",
  "investor_readiness": "",
  "growth_plan": "",
  "risk_summary": ""
}

Return ONLY valid JSON.
Do not use markdown.
Do not explain anything outside JSON.
`;
console.log("\n===== WAITING FOR GEMINI RESPONSE =====");
    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt,

        config: {

            responseMimeType: "application/json"

        }

    });
    console.log("\n===== GEMINI RESPONSE RECEIVED =====");

    let text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
console.log("\n========= RAW GEMINI =========\n");
console.log(text);
    try {

        return JSON.parse(text);

    } catch (err) {

        console.log("\n========= RAW GEMINI RESPONSE =========\n");
        console.log(text);

        const match = text.match(/\{[\s\S]*\}/);

        if (match) {

            try {

                return JSON.parse(match[0]);

            } catch (e) { }

        }

        throw new Error("Gemini returned invalid JSON.");
    }
}

module.exports = {
    analyzeStartup
};