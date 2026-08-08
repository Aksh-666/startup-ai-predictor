const express = require("express");

const router = express.Router();

const startupController = require("../controllers/startupController");

router.get("/health", (req, res) => {

    res.json({
        status: "Backend Running"
    });

});

router.post(
    "/analyze",
    startupController.analyzeStartup
);

module.exports = router;