export type TabType = 'dashboard' | 'input' | 'analytics' | 'recommendations' | 'reports';

export interface StartupInput {
  name: string;
  industry: string;
  businessModel: string;
  stage: string;
  hqCountry: string;
  fundingTarget: string;
  teamSize: string;
  founderExperience: number; // 0 = First-Time, 1 = Intermediate, 2 = Serial
  coreProblem: string;
  targetCustomers: string;
  keyCompetitors: string;
  gtmStrategy: string;
  authorized: boolean;
}

export interface RiskItem {
  id: string;
  title: string;
  desc: string;
  type: 'regulatory' | 'competitor' | 'market' | 'execution';
}

export interface CompetitorData {
  name: string;
  status: 'THREAD' | 'STABLE' | 'TARGET' | 'DOMINANT';
  score: string;
  isTarget?: boolean;
}

export interface KeyDriver {
  metric: string;
  value: string;
  delta: string;
  isPositive: boolean;
}

export interface SWOTItem {
  type: 'strength' | 'vulnerability';
  text: string;
}

export interface AnalysisReport {
  id: string;
  timestamp: string;
  successProbability: number;
  fundingScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  investorReadiness: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXCEPTIONAL';
  tam: string;
  userRetention: number;
  cacPayback: string;
  radarScores: {
    marketFit: number;
    growth: number;
    techStack: number;
    team: number;
    funding: number;
    innovation: number;
  };
  risks: RiskItem[];
  landscape: CompetitorData[];
  keyDrivers: KeyDriver[];
  strengths: string[];
  vulnerabilities: string[];
  marketOpportunity: {
    incumbents: number;
    niche: number;
    target: number;
  };
  aiSentiment: string;
  aiSentimentDetails: string;
  fundingStrategy: {
    targetRaise: string;
    stage: string;
    runwayExt: string;
    details: string;
  };
  growthScalability: {
    databaseSharding: number;
    microservices: number;
    details: string;
  };
  similarStartups: {
  startup_name: string;
  industry: string;
  country: string;
  stage: string;
  funding: number;
  similarity_score: number;
}[];
aiAnalysis?: {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  funding_strategy: string;
  gtm_recommendation: string;
  investor_readiness: string;
  growth_plan: string;
  risk_summary: string;
};
}
