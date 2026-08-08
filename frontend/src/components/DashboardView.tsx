import React, { useEffect, useState } from 'react';
import { Rocket, ShieldCheck, Terminal, Cpu, Database, Activity, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { TabType } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  // Stats and state values that change slightly over time to look highly active
  const [activeAgents, setActiveAgents] = useState(12450);
  const [throughput, setThroughput] = useState(14.6);
  const [networkEfficiency, setNetworkEfficiency] = useState(98.5);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time monitoring variations
      setActiveAgents(prev => prev + Math.floor(Math.random() * 5) - 2);
      setThroughput(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setNetworkEfficiency(prev => {
        const val = prev + (Math.random() * 0.2 - 0.1);
        return parseFloat(Math.min(99.9, Math.max(97.0, val)).toFixed(1));
      });
      setActiveStep(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Pitch panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Pulse engine indicator */}
        <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-sans font-medium uppercase tracking-[0.25em] text-white/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
          </span>
          V4.2 NEURAL ENGINE ACTIVE
        </div>

        {/* Core title */}
        <h1 className="font-serif font-light text-4xl lg:text-5xl leading-[1.1] text-white tracking-tighter">
          Predict Your <span className="italic">Startup's</span> <br />
          Future with <span className="font-bold">Valerius AI.</span>
        </h1>

        {/* Core details */}
        <p className="font-sans text-white/50 text-sm leading-relaxed max-w-sm font-light">
          Leverage deep neural networks to analyze market fit, team capability, and capital dynamics to forecast viability. Actionable intelligence for modern founders.
        </p>

        {/* Core CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          {/* Analyze business vector */}
          <button
            onClick={() => onNavigate('input')}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-sans font-semibold text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-white/90 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5 text-black" />
            Analyze Startup
          </button>

          {/* Sandbox workspace */}
          <button
            onClick={() => onNavigate('analytics')}
            className="flex items-center gap-2.5 px-6 py-3.5 border border-white/10 text-white/80 hover:text-white font-sans font-semibold text-[11px] uppercase tracking-[0.2em] rounded-sm bg-white/[0.02] hover:bg-white/5 hover:border-white/30 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-white/50" />
            View Sandbox
          </button>
        </div>

        {/* Dashboard statistics */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 mt-4">
          <div>
            <div className="text-3xl font-serif font-light text-white tracking-tight">99.8%</div>
            <div className="text-[9px] font-sans text-white/40 uppercase tracking-[0.2em] font-medium mt-1">
              Forecast Accuracy
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-light text-white tracking-tight">1.2M+</div>
            <div className="text-[9px] font-sans text-white/40 uppercase tracking-[0.2em] font-medium mt-1">
              Data Nodes Analyzed
            </div>
          </div>
        </div>
      </div>

      {/* Right Holographic terminal preview (NEXUS_CORE_OVERVIEW.sys) */}
      <div className="lg:col-span-7 w-full">
        <div className="w-full bg-[#121214] border border-white/10 rounded-sm overflow-hidden">
          {/* Window header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <span className="text-[9px] font-sans text-white/35 uppercase tracking-[0.2em]">
              NEXUS_CORE_OVERVIEW.sys
            </span>
          </div>

          {/* Window Canvas */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[380px] bg-black/20 relative">
            
            {/* Background cyber grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ 
                   backgroundImage: 'radial-gradient(#D4C5B9 1px, transparent 0), linear-gradient(0deg, #D4C5B9 1px, transparent 1px), linear-gradient(90deg, #D4C5B9 1px, transparent 1px)',
                   backgroundSize: '24px 24px'
                 }} 
            />

            {/* Left monitoring metrics inside the canvas */}
            <div className="md:col-span-5 flex flex-col gap-4 z-10">
              {/* Market Dynamics Card */}
              <div className="glass-panel p-4 rounded-sm border-white/5">
                <span className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.15em] block mb-2.5">
                  Global Market Dynamics
                </span>
                
                {/* Micro mini live stock tickers */}
                <div className="flex flex-col gap-2 font-mono text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-sans">BTC / USD</span>
                    <span className="text-white font-medium">+1.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-sans">ETH / USD</span>
                    <span className="text-white font-medium">+0.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 font-sans">SPY INDEX</span>
                    <span className="text-[#D4C5B9] font-medium">+0.4%</span>
                  </div>
                </div>

                {/* Animated sparkline canvas */}
                <div className="w-full h-12 mt-4 flex items-end gap-1.5 overflow-hidden">
                  {[24, 30, 21, 35, 42, 50, 36, 45, 60, 52, 48, 65, 78, 70, 85].map((h, idx) => (
                    <motion.div
                      key={idx}
                      className="flex-1 bg-gradient-to-t from-white/0 to-white/15 border-t border-white/20"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              {/* Performance Overview Card */}
              <div className="glass-panel p-4 rounded-sm border-white/5">
                <span className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.15em] block mb-2.5">
                  Performance Overview
                </span>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white/[0.02] p-2 rounded-sm border border-white/5">
                    <div className="text-xs font-sans font-medium text-white">{networkEfficiency}%</div>
                    <div className="text-[8px] font-sans text-white/30 mt-0.5 uppercase tracking-wider">Efficiency</div>
                  </div>
                  <div className="bg-white/[0.02] p-2 rounded-sm border border-white/5">
                    <div className="text-xs font-sans font-medium text-white">{throughput} PB/s</div>
                    <div className="text-[8px] font-sans text-white/30 mt-0.5 uppercase tracking-wider">Throughput</div>
                  </div>
                </div>
                <div className="bg-white/[0.02] p-2 rounded-sm border border-white/5 mt-2 flex justify-between items-center">
                  <span className="text-[8px] font-sans text-white/30 uppercase tracking-wider">Active Nodes</span>
                  <span className="text-xs font-sans font-medium text-white">{activeAgents.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Neural Net viz inside the canvas */}
            <div className="md:col-span-7 flex flex-col justify-between z-10 min-h-[220px]">
              {/* Main Command Center Monitor title */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-sm bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#D4C5B9]" />
                  <span className="text-[9px] font-sans text-white tracking-[0.2em] uppercase font-semibold">
                    VALERIUS AI - COMMAND
                  </span>
                </div>
                <span className="text-[8px] font-sans text-[#D4C5B9] uppercase tracking-widest font-medium">LIVE</span>
              </div>

              {/* Interactive Neural Net SVG */}
              <div className="relative flex-1 w-full flex items-center justify-center p-2 my-2 overflow-hidden bg-white/[0.01] rounded-sm border border-white/5">
                <svg className="w-full h-full min-h-[160px] max-h-[200px]" viewBox="0 0 300 150">
                  <defs>
                    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#D4C5B9" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Connecting lines between layers */}
                  {[
                    // Input to Hidden
                    { x1: 30, y1: 30, x2: 100, y2: 30 },
                    { x1: 30, y1: 30, x2: 100, y2: 60 },
                    { x1: 30, y1: 30, x2: 100, y2: 90 },
                    { x1: 30, y1: 75, x2: 100, y2: 30 },
                    { x1: 30, y1: 75, x2: 100, y2: 60 },
                    { x1: 30, y1: 75, x2: 100, y2: 90 },
                    { x1: 30, y1: 75, x2: 100, y2: 120 },
                    { x1: 30, y1: 120, x2: 100, y2: 60 },
                    { x1: 30, y1: 120, x2: 100, y2: 90 },
                    { x1: 30, y1: 120, x2: 100, y2: 120 },

                    // Hidden to Hidden 2
                    { x1: 100, y1: 30, x2: 180, y2: 30 },
                    { x1: 100, y1: 30, x2: 180, y2: 60 },
                    { x1: 100, y1: 60, x2: 180, y2: 30 },
                    { x1: 100, y1: 60, x2: 180, y2: 90 },
                    { x1: 100, y1: 90, x2: 180, y2: 60 },
                    { x1: 100, y1: 90, x2: 180, y2: 120 },
                    { x1: 100, y1: 120, x2: 180, y2: 90 },
                    { x1: 100, y1: 120, x2: 180, y2: 120 },

                    // Hidden 2 to Output
                    { x1: 180, y1: 30, x2: 260, y2: 50 },
                    { x1: 180, y1: 60, x2: 260, y2: 50 },
                    { x1: 180, y1: 60, x2: 260, y2: 100 },
                    { x1: 180, y1: 90, x2: 260, y2: 50 },
                    { x1: 180, y1: 90, x2: 260, y2: 100 },
                    { x1: 180, y1: 120, x2: 260, y2: 100 },
                  ].map((line, idx) => (
                    <motion.line
                      key={idx}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={idx % 3 === 0 ? 'url(#cyberGrad)' : 'rgba(255, 255, 255, 0.05)'}
                      strokeWidth={idx % 4 === 0 ? '1.2' : '0.6'}
                      initial={{ strokeDasharray: '4, 4', strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: idx % 2 === 0 ? -20 : 20 }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                    />
                  ))}

                  {/* Pulsing signal packet particles */}
                  {[
                    { x1: 30, y1: 75, x2: 100, y2: 60, delay: 0 },
                    { x1: 100, y1: 90, x2: 180, y2: 60, delay: 1.5 },
                    { x1: 180, y1: 60, x2: 260, y2: 100, delay: 0.8 },
                  ].map((p, idx) => (
                    <motion.circle
                      key={`packet-${idx}`}
                      r="2"
                      fill="#D4C5B9"
                      initial={{ cx: p.x1, cy: p.y1 }}
                      animate={{ cx: p.x2, cy: p.y2 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: p.delay,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  {/* Node Circles */}
                  {/* Layer 1 (Input) */}
                  {[30, 75, 120].map((y, idx) => (
                    <circle
                      key={`l1-${idx}`}
                      cx="30"
                      cy={y}
                      r="4"
                      fill="#0A0A0B"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="1.2"
                    />
                  ))}
                  {/* Layer 2 (Hidden 1) */}
                  {[30, 60, 90, 120].map((y, idx) => (
                    <motion.circle
                      key={`l2-${idx}`}
                      cx="100"
                      cy={y}
                      r="4"
                      fill="#0A0A0B"
                      stroke={idx === activeStep ? '#D4C5B9' : 'rgba(255, 255, 255, 0.3)'}
                      strokeWidth="1.2"
                      animate={{ r: idx === activeStep ? 5 : 4 }}
                    />
                  ))}
                  {/* Layer 3 (Hidden 2) */}
                  {[30, 60, 90, 120].map((y, idx) => (
                    <motion.circle
                      key={`l3-${idx}`}
                      cx="180"
                      cy={y}
                      r="4"
                      fill="#0A0A0B"
                      stroke={idx === (activeStep + 1) % 4 ? '#D4C5B9' : 'rgba(255, 255, 255, 0.3)'}
                      strokeWidth="1.2"
                      animate={{ r: idx === (activeStep + 1) % 4 ? 5 : 4 }}
                    />
                  ))}
                  {/* Layer 4 (Output) */}
                  {[50, 100].map((y, idx) => (
                    <circle
                      key={`l4-${idx}`}
                      cx="260"
                      cy={y}
                      r="5"
                      fill="#0A0A0B"
                      stroke="#D4C5B9"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>
              </div>

              {/* Status and Micro Bar indicators */}
              <div className="flex justify-between items-center mt-1">
                {/* System status optimal badge */}
                <div className="flex flex-col gap-0.5 border border-white/10 px-3 py-1 rounded bg-black/40">
                  <span className="text-[7px] font-sans text-white/30 uppercase tracking-[0.2em]">
                    SYSTEM_STATUS
                  </span>
                  <span className="text-xs font-sans font-medium text-white tracking-[0.1em] flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
                    NOMINAL
                  </span>
                </div>

                {/* Micro vertical equalizer bars */}
                <div className="flex items-end gap-1.5 h-9 pr-1">
                  {[
                    { h: 25, c: 'bg-white/20' },
                    { h: 60, c: 'bg-white/40' },
                    { h: 40, c: 'bg-white/20' },
                    { h: 80, c: 'bg-white/50' },
                    { h: 35, c: 'bg-[#D4C5B9]/40' },
                    { h: 90, c: 'bg-[#D4C5B9]/60' },
                  ].map((bar, idx) => (
                    <motion.div
                      key={idx}
                      className={`w-2 rounded-sm ${bar.c}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.h}%` }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1 + Math.random() * 0.8,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
