const fetch = require("node-fetch");

const ML_URL =
    process.env.ML_SERVICE_URL ||
    "http://127.0.0.1:8000/predict";

async function predictStartup(data) {

    try {

        const response = await fetch(ML_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                `ML Service Error (${response.status}): ${errorText}`
            );

        }

        const prediction = await response.json();

        console.log("\n========== ML RESPONSE ==========");
        console.log(JSON.stringify(prediction, null, 2));

        return prediction;

    }

    catch (err) {

        console.error("\n========== ML SERVICE ERROR ==========");
        console.error(err.message);

        throw err;

    }

}

module.exports = {
    predictStartup
};