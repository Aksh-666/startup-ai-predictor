import { StartupInput, AnalysisReport, RiskItem } from './types';

export const DEFAULT_INPUT: StartupInput = {
  name: 'Nexus Protocol',
  industry: 'deeptech',
  businessModel: 'saas',
  stage: 'Seed',
  hqCountry: 'United States',
  fundingTarget: '2000000',
  teamSize: '5',
  founderExperience: 1, // Intermediate
  coreProblem: 'Decentralized compute sharing is bottlenecked by network latency and unreliable nodes.',
  targetCustomers: 'B2B enterprise developers requiring massive, lower-cost parallel model training.',
  keyCompetitors: 'AWS, CoreWeave, Lambda Labs',
  gtmStrategy: 'Direct developer advocacy and incentive programs for early hardware nodes.',
  authorized: true
};

export function generateReport(
  input: StartupInput,
  backendData?: any
): AnalysisReport {
  const name = input.name || "Project Startup";
  const targetUSD = Number(input.fundingTarget) || 2000000;
  const stage = input.stage || "Seed";

  // =========================
  // BACKEND / AI DATA
  // =========================

  const probability = Number(
    backendData?.prediction?.success_probability ?? 70
  );

  const prediction =
    backendData?.prediction?.prediction ?? "Analysis Pending";

  const ai = backendData?.aiAnalysis;

  const similarStartups =
    backendData?.prediction?.similar_startups ?? [];

  // =========================
  // DYNAMIC SCORES
  // =========================

  const successProbability = Math.round(probability);

  const fundingScore =
    successProbability >= 80
      ? 92
      : successProbability >= 65
        ? 82
        : successProbability >= 50
          ? 72
          : 58;

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  if (successProbability >= 80) {
    riskLevel = "LOW";
  } else if (successProbability >= 60) {
    riskLevel = "MEDIUM";
  } else if (successProbability >= 40) {
    riskLevel = "HIGH";
  } else {
    riskLevel = "CRITICAL";
  }

  let investorReadiness:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "EXCEPTIONAL";

  if (ai?.investor_readiness) {
    const investorText =
      ai.investor_readiness.toLowerCase();

    if (
      investorText.includes("exceptional") ||
      investorText.includes("highly ready")
    ) {
      investorReadiness = "EXCEPTIONAL";
    } else if (
      investorText.includes("high") ||
      investorText.includes("strong")
    ) {
      investorReadiness = "HIGH";
    } else if (
      investorText.includes("medium") ||
      investorText.includes("moderate")
    ) {
      investorReadiness = "MEDIUM";
    } else {
      investorReadiness = "LOW";
    }
  } else {
    investorReadiness =
      successProbability >= 85
        ? "EXCEPTIONAL"
        : successProbability >= 70
          ? "HIGH"
          : successProbability >= 55
            ? "MEDIUM"
            : "LOW";
  }

  // =========================
  // FORMAT HELPERS
  // =========================

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }

    return `$${value.toLocaleString()}`;
  };

  const recommendedRaise =
    formatCurrency(targetUSD);

  // =========================
  // AI SWOT
  // =========================

  const strengths =
    ai?.strengths?.length > 0
      ? ai.strengths
      : [
          "Clear startup value proposition.",
          "Strong market opportunity.",
          "Scalable business model."
        ];

  const vulnerabilities =
    ai?.weaknesses?.length > 0
      ? ai.weaknesses
      : [
          "Execution risk remains at the current stage.",
          "Further market validation is required."
        ];

  // =========================
  // AI RISK ITEMS
  // =========================

  const risks: RiskItem[] =
    ai?.threats?.length > 0
      ? ai.threats.slice(0, 4).map(
          (threat: string, index: number) => ({
            id: `ai-risk-${index + 1}`,
            title: `Market Risk ${index + 1}`,
            desc: threat,
            type:
              index % 2 === 0
                ? "market"
                : "competitor"
          })
        )
      : [
          {
            id: "r1",
            title: "Execution Risk",
            desc:
              "Execution and market adoption remain important factors.",
            type: "execution"
          },
          {
            id: "r2",
            title: "Competition",
            desc:
              "Competition from established players may affect growth.",
            type: "competitor"
          }
        ];

  // =========================
  // RADAR SCORES
  // Derived from actual prediction
  // =========================

  const radarScores = {
    marketFit: Math.min(100, successProbability + 10),
    growth: Math.min(100, successProbability + 5),
    techStack: Math.min(100, successProbability + 15),
    team: Math.min(
      100,
      successProbability +
        Number(input.founderExperience) * 8
    ),
    funding: fundingScore,
    innovation: Math.min(100, successProbability + 12)
  };

  // =========================
  // MARKET OPPORTUNITY
  // Based on AI opportunities
  // =========================

  const opportunityCount =
    ai?.opportunities?.length ?? 0;

  const threatCount =
    ai?.threats?.length ?? 0;

  const marketOpportunity = {
    incumbents: Math.min(
      100,
      50 + threatCount * 5
    ),
    niche: Math.min(
      100,
      55 + opportunityCount * 7
    ),
    target: Math.min(
      100,
      successProbability + opportunityCount * 3
    )
  };

  // =========================
  // LANDSCAPE
  // =========================

  const landscape: CompetitorData[] =
    similarStartups.length > 0
      ? similarStartups
          .slice(0, 3)
          .map((startup: any) => ({
            name: startup.startup_name,
            status: "STABLE",
            score: `${Math.round(
              Number(startup.similarity_score) || 0
            )}%`
          }))
      : [
          {
            name: "No comparable startup",
            status: "STABLE",
            score: "N/A"
          }
        ];

  landscape.push({
    name,
    status: "TARGET",
    score: `${successProbability}%`,
    isTarget: true
  });

  // =========================
  // KEY DRIVERS
  // =========================

  const keyDrivers: KeyDriver[] = [
    {
      metric: "Success Probability",
      value: `${successProbability}%`,
      delta:
        successProbability >= 60
          ? "Positive"
          : "Needs Improvement",
      isPositive: successProbability >= 60
    },
    {
      metric: "Funding Readiness",
      value: `${fundingScore}%`,
      delta:
        fundingScore >= 75
          ? "Strong"
          : "Moderate",
      isPositive: fundingScore >= 75
    },
    {
      metric: "Investor Readiness",
      value: investorReadiness,
      delta: "AI Assessment",
      isPositive:
        investorReadiness === "HIGH" ||
        investorReadiness === "EXCEPTIONAL"
    }
  ];

  // =========================
  // RETURN REPORT
  // =========================

  return {
    id: `REP-${Math.floor(
      Math.random() * 900
    ) + 100}-A`,

    timestamp: new Date().toISOString(),

    successProbability,

    fundingScore,

    riskLevel,

    investorReadiness,

    // Keep existing field so UI doesn't break
    tam: "AI Market Assessment",

    userRetention: Math.min(
      95,
      Math.max(40, successProbability)
    ),

    cacPayback:
      successProbability >= 70
        ? "Estimated: 6-12 Mo"
        : "Requires validation",

    radarScores,

    risks,

    landscape,

    keyDrivers,

    strengths,

    vulnerabilities,

    marketOpportunity,

    aiSentiment: prediction,

    aiSentimentDetails:
      ai?.risk_summary ??
      "AI analysis completed successfully.",

    fundingStrategy: {
      targetRaise: recommendedRaise,
      stage,
      runwayExt: "AI Recommended",
      details:
        ai?.funding_strategy ??
        "Funding strategy will be generated from the startup analysis."
    },

    growthScalability: {
      databaseSharding: Math.min(
        100,
        successProbability + 5
      ),

      microservices: Math.min(
        100,
        successProbability
      ),

      details:
        ai?.growth_plan ??
        "Growth strategy will be generated from the startup analysis."
    },

    similarStartups,

    aiAnalysis: ai
  };
}
