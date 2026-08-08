import React, { useState } from 'react';
import {
  BarChart4, FileText, Activity, Layers, Download, RefreshCw,
  ShieldAlert, CheckCircle2, TrendingUp, Sparkles, HelpCircle,
  Terminal, Shield, Users, ArrowUpRight, ArrowDownRight, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalysisReport, CompetitorData, RiskItem, KeyDriver } from '../types';

interface ReportsViewProps {
  report: AnalysisReport;
  onRefresh: () => void;
}

type SubTabType = 'overview' | 'predictor' | 'live' | 'logic' | 'export';

export default function ReportsView({ report, onRefresh }: ReportsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('overview');
  const [termSheetGenerated, setTermSheetGenerated] = useState(false);
  const [termSheetLoading, setTermSheetLoading] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  // Term sheet simulation trigger
  const generateTermSheet = () => {
    setTermSheetLoading(true);
    setTimeout(() => {
      setTermSheetLoading(false);
      setTermSheetGenerated(true);
    }, 1500);
  };

  const downloadPdf = () => {
    setExportingPdf(true);
    setTimeout(() => {
      setExportingPdf(false);
      alert(`Export Complete: ${report.id} viability report exported to local system.`);
    }, 1500);
  };

  return (
    <div className="w-full flex min-h-[calc(100vh-120px)] border-t border-white/10">

      {/* 1. Left Sidebar of Reports tab */}
      <aside className="w-56 bg-[#0A0A0B] border-r border-white/10 p-4 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="flex flex-col gap-6">
          {/* Admin title header */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9] font-serif text-xs font-light">
              SA
            </div>
            <span className="font-sans text-[9px] font-semibold text-white tracking-[0.2em] uppercase">
              Admin Control
            </span>
          </div>

          {/* Sub menu navigation items */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ${activeSubTab === 'overview'
                ? 'bg-white/5 text-[#D4C5B9] border-l-2 border-[#D4C5B9]'
                : 'text-white/40 hover:bg-white/[0.01] hover:text-white'
                }`}
            >
              <BarChart4 className="w-3.5 h-3.5" />
              OVERVIEW
            </button>

            <button
              onClick={() => setActiveSubTab('predictor')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ${activeSubTab === 'predictor'
                ? 'bg-white/5 text-[#D4C5B9] border-l-2 border-[#D4C5B9]'
                : 'text-white/40 hover:bg-white/[0.01] hover:text-white'
                }`}
            >
              <Award className="w-3.5 h-3.5" />
              PREDICTOR
            </button>

            <button
              onClick={() => setActiveSubTab('live')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ${activeSubTab === 'live'
                ? 'bg-white/5 text-[#D4C5B9] border-l-2 border-[#D4C5B9]'
                : 'text-white/40 hover:bg-white/[0.01] hover:text-white'
                }`}
            >
              <Activity className="w-3.5 h-3.5" />
              LIVE FEED
            </button>

            <button
              onClick={() => setActiveSubTab('logic')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ${activeSubTab === 'logic'
                ? 'bg-white/5 text-[#D4C5B9] border-l-2 border-[#D4C5B9]'
                : 'text-white/40 hover:bg-white/[0.01] hover:text-white'
                }`}
            >
              <Layers className="w-3.5 h-3.5" />
              AI LOGIC
            </button>

            <button
              onClick={() => setActiveSubTab('export')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-[10px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 ${activeSubTab === 'export'
                ? 'bg-white/5 text-[#D4C5B9] border-l-2 border-[#D4C5B9]'
                : 'text-white/40 hover:bg-white/[0.01] hover:text-white'
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              EXPORT / VIABILITY
            </button>
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col gap-1 pb-2">
          <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm text-[9px] font-sans font-medium text-white/30 hover:text-[#D4C5B9] transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            HELP MANUAL
          </button>
          <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm text-[9px] font-sans font-medium text-white/30 hover:text-[#D4C5B9] transition-colors">
            <Terminal className="w-3.5 h-3.5" />
            CONSOLE LOGS
          </button>
        </div>
      </aside>

      {/* 2. Main Content of Reports tab */}
      <main className="flex-1 bg-[#050506] p-6 overflow-y-auto">

        {/* VIEW A: OVERVIEW & PREDICTOR */}
        {(activeSubTab === 'overview' || activeSubTab === 'predictor') && (
          <div className="flex flex-col gap-6">

            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-serif font-light text-xl text-white tracking-tighter">
                  Startup Analysis Results
                </h2>
                <div className="flex items-center gap-2 text-[9px] font-sans text-white/40 uppercase tracking-wider mt-1.5">
                  <span>Last Evaluated: 2026-07-03 04:03:25 UTC</span>
                  <span>•</span>
                  <span>Dynamic Simulation Sync</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-sm text-xs font-sans font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  REFRESH
                </button>
                <button
                  onClick={() => setActiveSubTab('export')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#D4C5B9] text-[#0A0A0B] rounded-sm text-xs font-sans font-bold hover:bg-white transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  EXPORT REPORT
                </button>
              </div>
            </div>

            {/* Top Row: Success Probability, Funding Score, Risk Level, Investor Readiness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Success Probability */}
              <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm relative">
                <span className="text-[8px] font-sans font-semibold tracking-[0.15em] text-white/40 uppercase block mb-1">
                  Success Probability
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-serif font-light text-white">
                    {report.successProbability}%
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#D4C5B9] flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    Optimal
                  </span>
                </div>
                {/* Horizontal progress visualization bar */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-3.5">
                  <div
                    className="bg-[#D4C5B9] h-full"
                    style={{ width: `${report.successProbability}%` }}
                  />
                </div>
              </div>

              {/* Funding Score */}
              <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm relative">
                <span className="text-[8px] font-sans font-semibold tracking-[0.15em] text-white/40 uppercase block mb-1">
                  Funding Score
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-serif font-light text-white">
                    {report.fundingScore}
                  </span>
                  <span className="text-[10px] font-sans font-medium text-white/35">
                    / 100
                  </span>
                </div>
                {/* Horizontal progress visualization bar */}
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-3.5">
                  <div
                    className="bg-white/40 h-full"
                    style={{ width: `${report.fundingScore}%` }}
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm relative">
                <span className="text-[8px] font-sans font-semibold tracking-[0.15em] text-white/40 uppercase block mb-1">
                  Risk Level
                </span>
                <div className="text-3xl font-serif font-light text-[#E25C5C] mt-2 tracking-wide uppercase">
                  {report.riskLevel}
                </div>
                <span className="text-[10px] font-sans font-light text-white/40 block mt-2">
                  System nominal. Monitoring variables.
                </span>
              </div>

              {/* Investor Readiness */}
              <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm relative">
                <span className="text-[8px] font-sans font-semibold tracking-[0.15em] text-white/40 uppercase block mb-1">
                  Investor Readiness
                </span>
                <div className="text-xl font-serif font-light text-white mt-3.5 uppercase flex items-center gap-2">
                  {report.investorReadiness}
                  <span className="relative flex h-2 w-2 mt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4C5B9] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4C5B9]"></span>
                  </span>
                </div>
                <span className="text-[10px] font-sans font-light text-white/40 block mt-2">
                  Ready for Series A Pitch deck matching
                </span>
              </div>
            </div>

            {/* Second Row: Market Fit Radar Chart & Risk Analysis & Outcome Probability */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              <div className="lg:col-span-8 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white">
                    Market Fit Radar Vector
                  </span>
                  <div className="flex gap-1.5">
                    <span className="bg-white/5 border border-white/10 text-white/40 font-sans text-[8px] tracking-wider px-2 py-0.5 rounded-sm">GROWTH</span>
                    <span className="bg-[#D4C5B9] text-black font-sans text-[8px] tracking-wider px-2 py-0.5 rounded-sm font-semibold">CURRENT</span>
                  </div>
                </div>

                {/* Highly styled SVG Radar Web Graphic */}
                <div className="flex-1 min-h-[240px] max-h-[300px] flex items-center justify-center p-2 relative bg-white/[0.01] rounded-sm border border-white/5">
                  <svg className="w-full max-w-[340px] h-full min-h-[220px]" viewBox="0 0 200 200">
                    <defs>
                      <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D4C5B9" stopOpacity="0.01" />
                        <stop offset="80%" stopColor="#D4C5B9" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#D4C5B9" stopOpacity="0.12" />
                      </radialGradient>
                    </defs>

                    {/* Concentric helper background circles */}
                    <circle cx="100" cy="100" r="80" fill="url(#radarGrad)" stroke="rgba(212, 197, 185, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(212, 197, 185, 0.08)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(212, 197, 185, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(212, 197, 185, 0.05)" strokeWidth="1" />

                    {/* Axis lines */}
                    {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const x2 = 100 + 80 * Math.cos(rad);
                      const y2 = 100 + 80 * Math.sin(rad);
                      return (
                        <line
                          key={idx}
                          x1="100"
                          y1="100"
                          x2={x2}
                          y2={y2}
                          stroke="rgba(212, 197, 185, 0.08)"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Radar polygon based on actual scores */}
                    {(() => {
                      // Map scores from the current report to angles
                      const scores = [
                        report.radarScores.marketFit,
                        report.radarScores.growth,
                        report.radarScores.techStack,
                        report.radarScores.team,
                        report.radarScores.funding,
                        report.radarScores.innovation
                      ];
                      const angles = [0, 60, 120, 180, 240, 300];
                      const points = angles.map((angle, idx) => {
                        const scoreRatio = scores[idx] / 100;
                        const rad = (angle * Math.PI) / 180;
                        const x = 100 + 80 * scoreRatio * Math.cos(rad);
                        const y = 100 + 80 * scoreRatio * Math.sin(rad);
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <>
                          {/* Inner translucent polygon fill */}
                          <polygon
                            points={points}
                            fill="rgba(212, 197, 185, 0.14)"
                            stroke="#D4C5B9"
                            strokeWidth="1.2"
                          />
                          {/* Outer node dots on vertices */}
                          {angles.map((angle, idx) => {
                            const scoreRatio = scores[idx] / 100;
                            const rad = (angle * Math.PI) / 180;
                            const x = 100 + 80 * scoreRatio * Math.cos(rad);
                            const y = 100 + 80 * scoreRatio * Math.sin(rad);
                            return (
                              <circle
                                key={idx}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="#0A0A0B"
                                stroke="#D4C5B9"
                                strokeWidth="1.2"
                              />
                            );
                          })}
                        </>
                      );
                    })()}

                    {/* Minimal text label markers */}
                    <text x="100" y="12" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">MARKET FIT</text>
                    <text x="175" y="55" textAnchor="start" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">GROWTH</text>
                    <text x="175" y="145" textAnchor="start" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">TECH</text>
                    <text x="100" y="195" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">INNOVATION</text>
                    <text x="25" y="145" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">FUNDING</text>
                    <text x="25" y="55" textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="sans-serif" fontWeight="semibold" letterSpacing="0.1em">TEAM</text>
                  </svg>
                </div>
              </div>

              {/* Risk Analysis Panel (Right 4 Columns) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Risk Analysis List card */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#E25C5C]" />
                    Risk Analysis
                  </span>
                  <div className="flex flex-col gap-4">
                    {report.risks.map((risk) => (
                      <div key={risk.id} className="flex gap-3">
                        <div className="mt-0.5">
                          <Shield className="w-3.5 h-3.5 text-[#E25C5C]/75" />
                        </div>
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-sans font-semibold text-white/90 uppercase tracking-wider text-[10px]">
                            {risk.title}
                          </span>
                          <span className="text-white/40 font-sans leading-normal">
                            {risk.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Landscape Competitor Map */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                    Ecosystem Landscape
                  </span>
                  <div className="flex flex-col gap-2">
                    {report.landscape.map((comp, idx) => {
                      const statusColor = comp.status === 'THREAD' ? 'text-[#E25C5C]/90 border-[#E25C5C]/20 bg-[#E25C5C]/5' : 'text-white/40 border-white/5 bg-white/[0.01]';
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-2 rounded-sm border transition-all duration-300 ${comp.isTarget
                            ? 'border-[#D4C5B9]/45 bg-[#D4C5B9]/5 shadow-sm'
                            : 'border-white/5 bg-white/[0.01]'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${comp.isTarget ? 'bg-[#D4C5B9] animate-pulse' : 'bg-white/15'}`} />
                            <span className={`text-xs font-semibold ${comp.isTarget ? 'text-[#D4C5B9] font-bold' : 'text-white/80'}`}>
                              {comp.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-[8px] font-sans font-bold uppercase px-1.5 py-0.5 rounded-sm border ${comp.isTarget ? 'text-[#D4C5B9] border-[#D4C5B9]/20 bg-[#D4C5B9]/10' : statusColor}`}>
                              {comp.status === 'THREAD' ? 'THREAT' : comp.status === 'STABLE' ? 'STABLE' : 'TARGET'}
                            </span>
                            <span className="text-xs font-serif text-white/90 font-medium">{comp.score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Third Row: Outcome Probabilities, Key Drivers, and Floating AI Assistant Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Outcome Probabilities and Key Drivers (Left 8 Columns) */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Outcome Probabilities Horizontal Chart */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                    Outcome Probabilities
                  </span>

                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-sans text-white/70">
                        <span className="font-medium">SUCCESS</span>
                        <span className="text-[#D4C5B9] font-bold">75%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#D4C5B9] h-full" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-sans text-white/70">
                        <span className="font-medium">ACQUISITION</span>
                        <span className="text-white/60 font-bold">15%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white/40 h-full" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-sans text-white/70">
                        <span className="font-medium">FAILURE / SHUTDOWN</span>
                        <span className="text-[#E25C5C] font-bold">10%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#E25C5C]/55 h-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Drivers Table */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                    Key Driver Metrics
                  </span>
                  <div className="flex flex-col gap-2.5 mt-1 text-xs">
                    <div className="grid grid-cols-3 text-[8px] font-sans font-semibold tracking-wider text-white/35 uppercase pb-1 border-b border-white/10">
                      <span>METRIC</span>
                      <span className="text-right">VALUE</span>
                      <span className="text-right">DELTA</span>
                    </div>
                    {report.keyDrivers.map((driver, idx) => (
                      <div key={idx} className="grid grid-cols-3 font-sans py-1.5 border-b border-white/5 items-center">
                        <span className="text-white/70 font-sans text-[11px]">{driver.metric}</span>
                        <span className="text-right text-white font-serif font-light text-xs">{driver.value}</span>
                        <span className={`text-right flex items-center justify-end gap-0.5 text-[11px] font-mono ${driver.isPositive ? 'text-emerald-400/80' : 'text-[#E25C5C]'}`}>
                          {driver.isPositive ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          {driver.delta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Floating AI Assistant Widget (Right 4 Columns) */}
              <div className="lg:col-span-4">
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 relative overflow-hidden flex flex-col gap-4 min-h-[220px]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4C5B9]" />
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.1em] text-white">
                        AI Assistant v2.1
                      </span>
                    </div>
                    <span className="text-[8px] font-sans font-bold text-white/50 tracking-widest bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm uppercase">Active</span>
                  </div>

                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    {report.fundingStrategy.details}
                  </p>

                  <div className="mt-auto pt-2">
                    <button
                      onClick={generateTermSheet}
                      disabled={termSheetLoading}
                      className="w-full py-2.5 bg-[#D4C5B9] text-[#0A0A0B] font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-white active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {termSheetLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          CALCULATING WEIGHTS...
                        </>
                      ) : termSheetGenerated ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          TERM SHEET CONSTRUCTED
                        </>
                      ) : (
                        'GENERATE TERM SHEET'
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Generated Term Sheet Modal Preview if generated */}
            <AnimatePresence>
              {termSheetGenerated && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    className="w-full max-w-lg bg-[#0E0E0F] border border-white/10 rounded-sm p-6 shadow-2xl flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="font-sans text-[10px] font-semibold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[#D4C5B9]" />
                        AI Draft term_sheet_v2.1
                      </span>
                      <button
                        onClick={() => setTermSheetGenerated(false)}
                        className="text-white/40 hover:text-white font-sans text-[10px] tracking-wider uppercase"
                      >
                        [CLOSE]
                      </button>
                    </div>

                    {/* Formatted Term Sheet Document mockup */}
                    <div className="bg-black p-5 rounded-sm border border-white/5 max-h-80 overflow-y-auto font-sans text-xs text-white/70 flex flex-col gap-3.5">
                      <div className="text-center font-serif text-sm tracking-wide text-white border-b border-white/10 pb-3">
                        SUMMARY OF PROPOSED TERMS
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">ISSUER:</span> {report.landscape[2]?.name || 'Project Startup'} Inc.
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">INVESTMENT AMOUNT:</span> $12,500,000 (US Dollars)
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">PRE-MONEY VALUATION:</span> $47,500,000 (US Dollars)
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">POST-MONEY VALUATION:</span> $60,000,000 (US Dollars)
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">BOARD OF DIRECTORS:</span> Three directors consisting of founders and lead Series-A venture appointee.
                      </div>
                      <div>
                        <span className="text-[#D4C5B9] font-medium uppercase tracking-wider text-[10px]">IP INDEMNIFICATION:</span> Standard proprietary software and molecular license assurances executed at close.
                      </div>
                      <div className="border-t border-white/5 pt-3 text-[9px] text-white/30 italic">
                        Disclaimer: This artificial intelligence blueprint constitutes standard commercial venture drafts and does not replace professional legal advisor signatures.
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-4 mt-2">
                      <button
                        onClick={() => setTermSheetGenerated(false)}
                        className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-[10px] font-sans font-semibold tracking-wider text-white/50 hover:text-white uppercase rounded-sm"
                      >
                        REVOKE DRAFT
                      </button>
                      <button
                        onClick={() => {
                          setTermSheetGenerated(false);
                        }}
                        className="flex-1 py-2.5 bg-[#D4C5B9] text-[#0A0A0B] text-[10px] font-sans font-bold tracking-wider uppercase rounded-sm hover:bg-white"
                      >
                        APPROVE BLUEPRINT
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

        {/* VIEW B: EXPORT / VIABILITY (Screenshot 4) */}
        {activeSubTab === 'export' && (
          <div className="flex flex-col gap-6">

            {/* Absolute loading overlay during exports */}
            <AnimatePresence>
              {exportingPdf && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-[#050506]/95 backdrop-blur-md flex flex-col items-center justify-center gap-3"
                >
                  <RefreshCw className="w-6 h-6 text-[#D4C5B9] animate-spin" />
                  <span className="font-sans text-[10px] text-white uppercase tracking-[0.2em] animate-pulse">
                    GENERATING VIABILITY PDF BLUEPRINT...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-serif font-light text-xl text-white tracking-tighter">
                  Startup Viability Report
                </h2>
                <div className="flex items-center gap-2 text-[9px] font-sans text-white/40 uppercase tracking-wider mt-1.5">
                  <span>GENERATED: 2026-07-03 04:03:25 UTC</span>
                  <span>•</span>
                  <span>ID: {report.id}</span>
                </div>
              </div>
              <div>
                <button
                  onClick={downloadPdf}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#D4C5B9] text-[#0A0A0B] rounded-sm text-xs font-sans font-bold hover:bg-white transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD PDF REPORT
                </button>
              </div>
            </div>

            {/* Top Row: Scores and Market Fit Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Aggregate score card (4 cols) */}
              <div className="lg:col-span-4 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-sans font-semibold tracking-[0.15em] text-white/40 uppercase">
                    Aggregate Viability Score
                  </span>
                  <BarChart4 className="w-4 h-4 text-[#D4C5B9]" />
                </div>

                <div className="my-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-serif font-light text-white">
                      {report.fundingScore}
                    </span>
                    <span className="text-xs font-sans text-white/30">
                      / 100
                    </span>
                  </div>
                  {/* Glowing progress line */}
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3.5">
                    <div
                      className="bg-[#D4C5B9] h-full"
                      style={{ width: `${report.fundingScore}%` }}
                    />
                  </div>
                </div>

                <span className="text-[10px] font-sans font-light text-white/40 leading-normal">
                  Top 15% of evaluated cohorts. Strong potential for Series A readiness vectoring.
                </span>
              </div>

              {/* Product market fit details card (8 cols) */}
              <div className="lg:col-span-8 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                  Product-Market Fit Analysis
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
                  <div className="bg-white/[0.01] p-4 rounded-sm border border-white/5 flex flex-col gap-1">
                    <span className="text-[8px] font-sans font-semibold tracking-wider text-white/40 uppercase">TAM (Total Addr. Market)</span>
                    <div className="text-xl font-serif font-light text-white mt-1">
                      {report.tam}
                    </div>
                    <span className="text-[9px] font-sans font-medium text-emerald-400/80 tracking-wide">+12% YoY Expansion</span>
                  </div>

                  <div className="bg-white/[0.01] p-4 rounded-sm border border-white/5 flex flex-col gap-1">
                    <span className="text-[8px] font-sans font-semibold tracking-wider text-white/40 uppercase">User Retention (M3)</span>
                    <div className="text-xl font-serif font-light text-white mt-1">
                      {report.userRetention}%
                    </div>
                    <span className="text-[9px] font-sans text-[#D4C5B9] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Above Industry Avg
                    </span>
                  </div>

                  <div className="bg-white/[0.01] p-4 rounded-sm border border-white/5 flex flex-col gap-1">
                    <span className="text-[8px] font-sans font-semibold tracking-wider text-white/40 uppercase">CAC Payback Period</span>
                    <div className="text-xl font-serif font-light text-white mt-1">
                      {report.cacPayback}
                    </div>
                    <span className="text-[9px] font-sans text-[#E25C5C]">Needs Optimization</span>
                  </div>
                </div>
              </div>

            </div>

            {/* SWOT Vectors & Market Opportunity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* SWOT lists (7 cols) */}
              <div className="lg:col-span-7 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-5">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                  SWOT VECTORS
                </span>

                {/* Core Strengths */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-sans font-bold text-[#D4C5B9] uppercase tracking-wider block">
                    Core Strengths
                  </span>
                  <div className="flex flex-col gap-2 font-sans text-xs text-white/70">
                    {report.strengths.map((str, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="w-1 h-3.5 bg-[#D4C5B9] shrink-0 rounded-sm mt-0.5" />
                        <span className="leading-normal">{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vulnerabilities */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-sans font-bold text-[#E25C5C] uppercase tracking-wider block">
                    Vulnerabilities
                  </span>
                  <div className="flex flex-col gap-2 font-sans text-xs text-white/70">
                    {report.vulnerabilities.map((vul, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="w-1 h-3.5 bg-[#E25C5C] shrink-0 rounded-sm mt-0.5" />
                        <span className="leading-normal">{vul}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Opportunity Assessment (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Market Opportunity Chart */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-4">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2">
                    Market Opportunity Assessment
                  </span>

                  {/* Vertical layout bars */}
                  <div className="flex flex-col gap-3.5 mt-2 text-xs">
                    {/* Incumbents */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between font-sans text-[10px] text-white/40">
                        <span>Incumbents</span>
                        <span className="font-serif">{report.marketOpportunity.incumbents}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-white/20 h-full" style={{ width: `${report.marketOpportunity.incumbents}%` }} />
                      </div>
                    </div>

                    {/* Niche Competitors */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between font-sans text-[10px] text-white/40">
                        <span>Niche Competitors</span>
                        <span className="font-serif">{report.marketOpportunity.niche}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-white/40 h-full" style={{ width: `${report.marketOpportunity.niche}%` }} />
                      </div>
                    </div>

                    {/* Target Startup */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between font-sans text-[10px] text-[#D4C5B9] font-semibold uppercase tracking-wider">
                        <span>Target Startup</span>
                        <span className="font-serif">{report.marketOpportunity.target}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div className="bg-[#D4C5B9] h-full" style={{ width: `${report.marketOpportunity.target}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Sentiment recommendation badge */}
                <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm flex flex-col gap-3 relative overflow-hidden">
                  <span className="text-[8px] font-sans font-semibold tracking-wider text-white/40 uppercase">AI Sentiment Recommendation</span>

                  <div className="text-base font-serif font-light text-[#D4C5B9] flex items-center gap-2 tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-[#D4C5B9]" />
                    {report.aiSentiment}
                  </div>

                  <p className="text-[11px] font-sans font-light text-white/50 leading-relaxed bg-white/[0.01] p-3 rounded-sm border border-white/5">
                    {report.aiSentimentDetails}
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW C: LIVE FEED */}
        {activeSubTab === 'live' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-serif font-light text-white border-b border-white/10 pb-2">
              Global Transaction Ledgers
            </h2>
            <div className="bg-[#0A0A0B] p-4 rounded-sm border border-white/5 font-mono text-[11px] text-white/40 flex flex-col gap-3 h-[450px] overflow-y-auto">
              <div>[04:01:22] INGESTED standard financial SEC registration index files...</div>
              <div>[04:02:40] Alpha Corp registered seed round increase of +1.5M in Delaware filing ledger.</div>
              <div>[04:03:01] System simulated 2,500 healthcare sector integrations: churn velocity lowered by -0.4%.</div>
              <div className="text-[#D4C5B9] font-medium">[04:03:15] ACTIVE: Recalculated valuation vectors on {report.landscape[2]?.name || 'Project Startup'}: cap weight indices optimal.</div>
              <div>[04:04:10] Competitor Beta Corp reported major customer attrition in European regions (-3.2%).</div>
              <div>[04:05:32] Analyzing sovereign debt yield shifts: predictive capital risk weights aligned.</div>
              <div className="text-white/70 font-semibold">[04:06:01] POLLING: Next database sharding telemetry update expected in 120 seconds...</div>
            </div>
          </div>
        )}

        {/* VIEW D: AI LOGIC PARAMETERS */}
        {activeSubTab === 'logic' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-serif font-light text-white border-b border-white/10 pb-2">
              Neural Network Weights Configuration
            </h2>
            <p className="text-xs text-white/50 font-sans">
              Below are the internal layer variables utilized by the V4.2 prediction kernel. Custom weight parameters can be simulation-tested prior to export.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-6 rounded-sm">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-sans font-medium text-white/85">Competitor Impact Coefficient (γ)</span>
                <input type="range" className="w-full accent-[#D4C5B9] bg-white/5 h-1" defaultValue="85" />
                <span className="text-[9px] text-white/35 font-sans">Multiplies threat coefficients calculated from competitor landscape lists.</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-sans font-medium text-white/85">IP / Proprietary Tech Weight (η)</span>
                <input type="range" className="w-full accent-[#D4C5B9] bg-white/5 h-1" defaultValue="70" />
                <span className="text-[9px] text-white/35 font-sans">Scales success probability based on patent licensing and software integrity scores.</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-sans font-medium text-white/85">Capital Burn Variance Tolerances (σ)</span>
                <input type="range" className="w-full accent-[#D4C5B9] bg-white/5 h-1" defaultValue="50" />
                <span className="text-[9px] text-white/35 font-sans">Determines risk levels calculated over funding target and burn rates.</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-sans font-medium text-white/85">Dynamic User Virality Multiplier (α)</span>
                <input type="range" className="w-full accent-[#D4C5B9] bg-white/5 h-1" defaultValue="65" />
                <span className="text-[9px] text-white/35 font-sans">Regulates PMF analyses based on retention and user acquisition cost metrics.</span>
              </div>
            </div>
          </div>
        )}
        {/* AI ANALYSIS */}
{report.aiAnalysis && (
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* Strengths */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4C5B9] border-b border-white/10 pb-2 mb-4">
        AI Strengths
      </h2>

      <div className="flex flex-col gap-3">
        {report.aiAnalysis.strengths.map((item, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-[#D4C5B9]">+</span>
            <p className="text-xs text-white/60 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Weaknesses */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E25C5C] border-b border-white/10 pb-2 mb-4">
        AI Weaknesses
      </h2>

      <div className="flex flex-col gap-3">
        {report.aiAnalysis.weaknesses.map((item, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-[#E25C5C]">−</span>
            <p className="text-xs text-white/60 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Opportunities */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4C5B9] border-b border-white/10 pb-2 mb-4">
        AI Opportunities
      </h2>

      <div className="flex flex-col gap-3">
        {report.aiAnalysis.opportunities.map((item, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-[#D4C5B9]">↗</span>
            <p className="text-xs text-white/60 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Threats */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E25C5C] border-b border-white/10 pb-2 mb-4">
        AI Threats
      </h2>

      <div className="flex flex-col gap-3">
        {report.aiAnalysis.threats.map((item, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-[#E25C5C]">!</span>
            <p className="text-xs text-white/60 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* GTM Recommendation */}
    <div className="lg:col-span-2 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2 mb-4">
        AI Go-To-Market Recommendation
      </h2>

      <p className="text-xs text-white/60 leading-relaxed">
        {report.aiAnalysis.gtm_recommendation}
      </p>
    </div>

    {/* Funding Strategy */}
    <div className="lg:col-span-2 glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4C5B9] border-b border-white/10 pb-2 mb-4">
        AI Funding Strategy
      </h2>

      <p className="text-xs text-white/60 leading-relaxed">
        {report.aiAnalysis.funding_strategy}
      </p>
    </div>

    {/* Investor Readiness */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2 mb-4">
        AI Investor Readiness
      </h2>

      <p className="text-xs text-white/60 leading-relaxed">
        {report.aiAnalysis.investor_readiness}
      </p>
    </div>

    {/* Growth Plan */}
    <div className="glass-panel border border-white/5 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white border-b border-white/10 pb-2 mb-4">
        AI Growth Plan
      </h2>

      <p className="text-xs text-white/60 leading-relaxed">
        {report.aiAnalysis.growth_plan}
      </p>
    </div>

    {/* Risk Summary */}
    <div className="lg:col-span-2 glass-panel border border-[#E25C5C]/10 bg-[#0C0C0D]/85 p-5 rounded-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E25C5C] border-b border-white/10 pb-2 mb-4">
        AI Risk Summary
      </h2>

      <p className="text-xs text-white/60 leading-relaxed">
        {report.aiAnalysis.risk_summary}
      </p>
    </div>

  </div>
)}
        {/* Similar Startups */}

        <div className="mt-10">

          <h2 className="text-xl font-bold text-white mb-4">
            Similar Startups
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {report.similarStartups?.map((startup, index) => (

              <div
                key={index}
                className="glass-panel rounded-xl p-5 border border-white/10"
              >

                <h3 className="text-lg font-semibold text-white">
                  {startup.startup_name}
                </h3>

                <p className="text-sm text-gray-400">
                  {startup.industry}
                </p>

                <p className="text-sm text-gray-400">
                  {startup.country}
                </p>

                <p className="text-sm text-gray-400">
                  Stage : {startup.stage}
                </p>

                <p className="text-sm text-gray-400">
                  Funding : ${startup.funding.toLocaleString()}
                </p>

                <div className="mt-3 text-cyan-400 font-semibold">

                  Similarity :
                  {startup.similarity_score.toFixed(2)}%

                </div>

              </div>

            ))}

          </div>

        </div>
      </main>
    </div>
  );
}