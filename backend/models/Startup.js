const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    startupName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
    },

    businessModel: {
      type: String,
      required: true,
    },

    currentStage: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    fundingTarget: {
      type: Number,
      required: true,
    },

    teamSize: {
      type: Number,
      required: true,
    },

    founderExperience: {
      type: String,
      required: true,
    },

    problemStatement: {
      type: String,
      required: true,
    },

    targetCustomers: {
      type: String,
      required: true,
    },

    competitors: {
      type: String,
      required: true,
    },

    gtmStrategy: {
      type: String,
      required: true,
    },

    prediction: Number,

    confidence: Number,

    successProbability: Number,

    recommendations: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Startup", startupSchema);