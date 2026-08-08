import React, { useState } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import InputView from './components/InputView';
import AnalyticsView from './components/AnalyticsView';
import RecommendationsView from './components/RecommendationsView';
import ReportsView from './components/ReportsView';
import { TabType, StartupInput, AnalysisReport } from './types';
import { DEFAULT_INPUT, generateReport } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeStartup } from "./services/api";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [startupInput, setStartupInput] = useState<StartupInput>({ ...DEFAULT_INPUT });
  const [activeReport, setActiveReport] = useState<AnalysisReport>(() => generateReport(DEFAULT_INPUT));

  // Handler when user submits new startup details form
  const handleStartupSubmit = async (input: StartupInput) => {

    setStartupInput(input);

    try {

      const result = await analyzeStartup(input);

      console.log("========== API RESULT ==========");
      console.log(result);

      if (!result.success) {
        throw new Error(result.message || "Backend Error");
      }

      if (!result.prediction) {
        throw new Error("Prediction not received from backend");
      }

      const newReport = generateReport(input, result);

      newReport.successProbability = Number(
        result.prediction.success_probability
      );

      newReport.riskLevel =
        result.prediction.risk_level === "Low"
          ? "LOW"
          : result.prediction.risk_level === "Medium"
            ? "MEDIUM"
            : result.prediction.risk_level === "High"
              ? "HIGH"
              : "CRITICAL";

      // Similar Startups
      newReport.similarStartups =
        result.prediction.similar_startups ?? [];

      // Complete Gemini Analysis
      newReport.aiAnalysis =
        result.aiAnalysis;

      // SWOT
      newReport.strengths =
        result.aiAnalysis?.strengths ?? newReport.strengths;

      newReport.vulnerabilities =
        result.aiAnalysis?.weaknesses ?? newReport.vulnerabilities;

      // AI Summary
      newReport.aiSentiment =
        result.prediction.prediction;

      newReport.aiSentimentDetails =
        result.aiAnalysis?.risk_summary ??
        newReport.aiSentimentDetails;

      // Funding Strategy
      newReport.fundingStrategy.details =
        result.aiAnalysis?.funding_strategy ??
        newReport.fundingStrategy.details;

      setActiveReport(newReport);
      setActiveTab("reports");

    }

    catch (err) {

      console.error(err);

      alert("Backend Connection Failed");

    }

  };

  // Handler to refresh/simulate slight live variations on report metrics
  const handleRefreshReport = () => {
    const refreshedReport = generateReport(startupInput);
    setActiveReport(refreshedReport);
  };

  // Search filtering mock feedback
  const handleSearch = (query: string) => {
    console.log(`Command system searching: ${query}`);
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-gray-300 flex flex-col font-sans select-none antialiased selection:bg-cyber-cyan selection:text-black">
      {/* Universal Sticky Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={handleSearch}
      />

      {/* Main Tab Router View Container */}
      <div className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-1 w-full flex flex-col"
          >
            {activeTab === 'dashboard' && (
              <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === 'input' && (
              <InputView onSubmit={handleStartupSubmit} />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView report={activeReport} />
            )}

            {activeTab === 'recommendations' && (
              <RecommendationsView report={activeReport} />
            )}

            {activeTab === 'reports' && (
              <ReportsView
                report={activeReport}
                onRefresh={handleRefreshReport}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Technical footer info indicator */}
      <footer className="w-full bg-cyber-bg border-t border-cyber-cyan/5 px-6 py-3 flex flex-wrap items-center justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-auto z-10">
        <div className="flex items-center gap-4">
          <span>PORT: 3000</span>
          <span>•</span>
          <span>ENGINE: V4.2 NEURAL</span>
          <span>•</span>
          <span>ENCRYPTION: SHIELD-256</span>
        </div>
        <div className="flex items-center gap-2">
          <span>SYSTEM STATE:</span>
          <span className="text-cyber-cyan animate-pulse">OPTIMAL (100% ONLINE)</span>
        </div>
      </footer>
    </div>
  );
}
