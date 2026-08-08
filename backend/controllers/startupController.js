const predictionService = require("../services/predictionService");
const geminiService = require("../services/geminiService");

exports.analyzeStartup = async (req, res) => {

    try {

        // -----------------------------
        // ML Prediction
        // -----------------------------

        const prediction =
            await predictionService.predictStartup(req.body);

        // -----------------------------
        // AI Analysis
        // -----------------------------
console.log("\n===== CALLING GEMINI =====");
        const aiAnalysis =
            await geminiService.analyzeStartup(
                req.body,
                prediction
            );
console.log("\n===== GEMINI DONE =====");
        // -----------------------------
        // Final Response
        // -----------------------------

        return res.status(200).json({

            success: true,

            prediction: {

                prediction:
                    prediction.prediction,

                success_probability:
                    prediction.success_probability,

                confidence:
                    prediction.confidence,

                risk_level:
                    prediction.risk_level,

                similar_startups:
                    prediction.similar_startups

            },

            aiAnalysis

        });

    }

    catch (err) {

        console.error("Startup Analysis Error:", err);

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};