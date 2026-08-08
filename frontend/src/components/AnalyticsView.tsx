import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Terminal, Play, RotateCcw, AlertTriangle, ShieldCheck, Database, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { AnalysisReport } from '../types';

interface AnalyticsViewProps {
  report: AnalysisReport;
}

export default function AnalyticsView({ report }: AnalyticsViewProps) {
  // Sandbox parameters
  const [marketingBudget, setMarketingBudget] = useState(50);
  const [teamSizeParam, setTeamSizeParam] = useState(40);
  const [productQuality, setProductQuality] = useState(85);
  const [marketHype, setMarketHype] = useState(60);

  // Live log simulation
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Connecting sandbox parameters to V4.2 prediction kernel...',
    '[SYS] Listening on node network vector [PORT 3000]',
    '[SYS] Baseline Success Probability loaded: ' + report.successProbability + '%',
    '[SYS] Baseline Funding Score loaded: ' + report.fundingScore + '/100'
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic calculations based on sandbox variables
  const deltaSuccess = Math.round(
    ((marketingBudget - 50) * 0.1) + 
    ((teamSizeParam - 40) * 0.08) + 
    ((productQuality - 85) * 0.2) + 
    ((marketHype - 60) * 0.12)
  );
  
  const currentSuccess = Math.min(99, Math.max(35, report.successProbability + deltaSuccess));
  const currentFunding = Math.min(99, Math.max(40, report.fundingScore + Math.round(deltaSuccess * 0.75)));

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate incoming real-time logs occasionally
  useEffect(() => {
    const timer = setInterval(() => {
      const actions = [
        `Re-indexing competitor cluster weights...`,
        `Monte Carlo variance check: delta success probability is now ${deltaSuccess >= 0 ? '+' : ''}${deltaSuccess}%`,
        `Analyzing European regulatory patent drafts...`,
        `Testing product quality sensitivity curve at ${productQuality}%...`,
        `Simulating series-A cap table dilutions...`,
        `System node efficiency stable at 98.4%`
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLogs(prev => [...prev, `[SYS] ${randomAction}`]);
    }, 4500);

    return () => clearInterval(timer);
  }, [deltaSuccess, productQuality]);

  const resetParams = () => {
    setMarketingBudget(50);
    setTeamSizeParam(40);
    setProductQuality(85);
    setMarketHype(60);
    setLogs(prev => [...prev, '[SYS] Sandbox variables reset to startup base vectors.']);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* View Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-5">
        <h2 className="font-serif font-light text-2xl text-white tracking-tighter">
          Predictive Simulation Sandbox
        </h2>
        <span className="font-sans text-[9px] text-[#D4C5B9] uppercase tracking-[0.25em] block">
          Adjust strategic parameters to model changes in predicted outcome viability
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Hand: Sliders Panel */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-sm relative flex flex-col gap-5 border border-white/5">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#D4C5B9]" />
                Variable Adjustments
              </span>
              <button 
                onClick={resetParams}
                className="flex items-center gap-1.5 text-[9px] font-sans font-medium uppercase tracking-[0.15em] text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-1 rounded-sm transition-all duration-200 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#D4C5B9]" />
                Reset Baseline
              </button>
            </div>

            {/* Parameter 1: Marketing Spend */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-white/60 font-light">Marketing & Acquisition Budget</span>
                <span className="text-[#D4C5B9] font-semibold">{marketingBudget}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={marketingBudget}
                onChange={(e) => setMarketingBudget(parseInt(e.target.value))}
                className="w-full accent-[#D4C5B9] bg-white/5 h-1 rounded cursor-pointer"
              />
              <span className="text-[10px] text-white/45 font-light leading-relaxed">
                Controls customer acquisition speeds. Over-allocation risks burning runway prematurely.
              </span>
            </div>

            {/* Parameter 2: Hiring Velocity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-white/60 font-light">Engineering Hiring Velocity</span>
                <span className="text-[#D4C5B9] font-semibold">{teamSizeParam}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={teamSizeParam}
                onChange={(e) => setTeamSizeParam(parseInt(e.target.value))}
                className="w-full accent-[#D4C5B9] bg-white/5 h-1 rounded cursor-pointer"
              />
              <span className="text-[10px] text-white/45 font-light leading-relaxed">
                Accelerates GTM and scaling capabilities. Over-hiring causes communication bottlenecks.
              </span>
            </div>

            {/* Parameter 3: Product Integrity */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-white/60 font-light">Product Quality / Core IP Integrity</span>
                <span className="text-[#D4C5B9] font-semibold">{productQuality}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={productQuality}
                onChange={(e) => setProductQuality(parseInt(e.target.value))}
                className="w-full accent-[#D4C5B9] bg-white/5 h-1 rounded cursor-pointer"
              />
              <span className="text-[10px] text-white/45 font-light leading-relaxed">
                Highly correlated with customer retention (LTV) and defensibility against incumbents.
              </span>
            </div>

            {/* Parameter 4: Brand Authority */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-white/60 font-light">PR Hype & Market Alignment</span>
                <span className="text-[#D4C5B9] font-semibold">{marketHype}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={marketHype}
                onChange={(e) => setMarketHype(parseInt(e.target.value))}
                className="w-full accent-[#D4C5B9] bg-white/5 h-1 rounded cursor-pointer"
              />
              <span className="text-[10px] text-white/45 font-light leading-relaxed">
                Influences initial sign-up conversions and early venture investor sentiment.
              </span>
            </div>
          </div>
        </div>

        {/* Right Hand: Gauges and Console logs */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Real-time recalculated gauges */}
          <div className="glass-panel-purple p-6 rounded relative grid grid-cols-2 gap-4">
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
                 style={{ 
                   backgroundImage: 'radial-gradient(#ddb7ff 1px, transparent 0)',
                   backgroundSize: '16px 16px'
                 }} 
            />

            {/* Gauge 1: Recalculated Success probability */}
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.15em]">
                Recalculated Success
              </span>
              
              {/* Circular SVG Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center mt-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="rgba(255, 255, 255, 0.03)" 
                    strokeWidth="6" 
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="#D4C5B9" 
                    strokeWidth="6" 
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * currentSuccess) / 100 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-serif font-light text-white tracking-tight">
                    {currentSuccess}%
                  </span>
                  <span className="text-[8px] font-sans font-medium text-white/40 uppercase tracking-widest">Success</span>
                </div>
              </div>

              <span className="text-[9px] font-sans text-white/40 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                Baseline: {report.successProbability}%
                <span className={deltaSuccess >= 0 ? 'text-[#D4C5B9]' : 'text-white/30'}>
                  ({deltaSuccess >= 0 ? '+' : ''}{deltaSuccess}%)
                </span>
              </span>
            </div>

            {/* Gauge 2: Recalculated Funding score */}
            <div className="flex flex-col items-center text-center gap-2">
              <span className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.15em]">
                Funding Potential
              </span>

              {/* Circular SVG Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center mt-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="rgba(255, 255, 255, 0.03)" 
                    strokeWidth="6" 
                  />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="#FFFFFF" 
                    strokeWidth="6" 
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * currentFunding) / 100 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-serif font-light text-white tracking-tight">
                    {currentFunding}/100
                  </span>
                  <span className="text-[8px] font-sans font-medium text-white/40 uppercase tracking-widest">Score</span>
                </div>
              </div>

              <span className="text-[9px] font-sans text-white/40 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                Baseline: {report.fundingScore}/100
                <span className={deltaSuccess >= 0 ? 'text-white/60' : 'text-white/30'}>
                  ({deltaSuccess >= 0 ? '+' : ''}{Math.round(deltaSuccess * 0.75)}%)
                </span>
              </span>
            </div>
          </div>

          {/* Scrolling system logs console */}
          <div className="bg-black/35 p-4 rounded-sm border border-white/10 h-44 flex flex-col gap-2 relative">
            <div className="flex justify-between items-center text-[9px] font-sans text-white/30 border-b border-white/5 pb-2 mb-1 select-none">
              <span className="flex items-center gap-1.5 uppercase tracking-[0.2em] font-medium text-white/50">
                <Terminal className="w-3.5 h-3.5 text-[#D4C5B9]" />
                Sandbox Console Telemetry
              </span>
              <span className="uppercase tracking-widest text-[#D4C5B9]">LIVE</span>
            </div>
            
            <div 
              ref={logContainerRef}
              className="flex-1 overflow-y-auto font-mono text-[9px] text-white/40 flex flex-col gap-1.5 pr-2 scrollbar-none"
            >
              {logs.map((log, idx) => (
                <div key={idx}>
                  {log}
                </div>
              ))}
              <span className="inline-block w-1.5 h-3 bg-[#D4C5B9]/60 animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
