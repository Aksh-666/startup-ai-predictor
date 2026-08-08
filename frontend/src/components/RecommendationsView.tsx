import React from 'react';
import { Target, TrendingUp, Compass, Award, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AnalysisReport } from '../types';

interface RecommendationsViewProps {
  report: AnalysisReport;
}

export default function RecommendationsView({ report }: RecommendationsViewProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Overview header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-5">
        <h2 className="font-serif font-light text-2xl text-white tracking-tighter">
          Strategic System Recommendations
        </h2>
        <span className="font-sans text-[9px] text-[#D4C5B9] uppercase tracking-[0.25em] block">
          AI-generated tactical roadmap based on current startup parameters
        </span>
      </div>

      {/* Grid containing recommendations modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Go-To-Market Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5"
        >
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
              <Compass className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
              Go-To-Market Strategy
            </h3>
          </div>

          <div className="flex flex-col gap-3 font-sans text-[11px] md:text-xs text-white/70 leading-relaxed font-light">
            <p className="bg-white/[0.02] p-3 rounded-sm border border-white/10 text-[#D4C5B9] font-medium leading-relaxed">
              {report.aiAnalysis?.gtm_recommendation ??
                "AI-generated go-to-market recommendation is not available."}
            </p>

            <p className="text-white/45">
              This recommendation is generated using the startup's market,
              business model, target customers, competition, and ML prediction.
            </p>
          </div>
        </motion.div>

        {/* Target Segments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5"
        >
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
              <Target className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
              Target Segments
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-white/[0.01] p-4 rounded-sm border border-white/5">
              <span className="text-[8px] font-sans font-semibold tracking-widest text-white/40 uppercase block mb-1.5">
                PRIMARY ICP
              </span>
              <span className="text-xs font-serif font-light text-white tracking-wide block">
                DevOps & Platform Eng.
              </span>
              <span className="text-[9px] font-sans font-medium tracking-wider text-[#D4C5B9] block mt-1">
                +18% Expansion Est.
              </span>
              <div className="text-[10px] text-white/45 mt-3 font-sans border-t border-white/5 pt-2 font-light leading-relaxed">
                Requires automated audit trails & zero-trust compliance standards.
              </div>
            </div>

            <div className="bg-white/[0.01] p-4 rounded-sm border border-white/5">
              <span className="text-[8px] font-sans font-semibold tracking-widest text-white/40 uppercase block mb-1.5">
                SECONDARY ICP
              </span>
              <span className="text-xs font-serif font-light text-white tracking-wide block">
                Healthcare Ops & Compliance
              </span>
              <span className="text-[9px] font-sans font-medium tracking-wider text-white/50 block mt-1">
                +12% YoY Growth
              </span>
              <div className="text-[10px] text-white/45 mt-3 font-sans border-t border-white/5 pt-2 font-light leading-relaxed">
                Requires legacy database mapping and HIPAA-grade server isolated nodes.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Funding Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5"
        >


          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
                <Award className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
                Funding Strategy
              </h3>
            </div>
            {/* Live Analysis blinking tag */}
            <div className="flex items-center gap-1.5 text-[8px] font-sans font-semibold text-[#D4C5B9] uppercase tracking-[0.15em] bg-white/5 border border-[#D4C5B9]/20 px-2.5 py-1 rounded-sm animate-pulse">
              <span className="w-1 h-1 rounded-full bg-[#D4C5B9]" />
              Live Analysis
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/[0.01] p-3 rounded-sm border border-white/5">
              <span className="text-[8px] font-sans font-semibold tracking-widest text-white/40 uppercase">Target Raise</span>
              <div className="text-base font-serif font-light text-white mt-1.5 tracking-tight">
                {report.fundingStrategy.targetRaise}
              </div>
              <span className="text-[9px] font-sans font-medium text-[#D4C5B9] mt-0.5 block tracking-wide uppercase">{report.fundingStrategy.stage} Stage</span>
            </div>

            <div className="bg-white/[0.01] p-3 rounded-sm border border-white/5">
              <span className="text-[8px] font-sans font-semibold tracking-widest text-white/40 uppercase">Runway Ext.</span>
              <div className="text-base font-serif font-light text-white mt-1.5 tracking-tight">
                {report.fundingStrategy.runwayExt}
              </div>
              <span className="text-[9px] font-sans font-medium text-white/40 mt-0.5 block tracking-wide uppercase">Optimized Cache</span>
            </div>
          </div>

          <p className="font-sans text-[11px] md:text-xs text-white/55 leading-relaxed bg-white/[0.01] p-3 rounded-sm border border-white/5 font-light">
            {report.fundingStrategy.details}
          </p>
        </motion.div>

        {/* Growth & Scalability */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5"
        >


          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
              Growth & Scalability
            </h3>
          </div>

          <div className="flex flex-col gap-5">
            {/* Database Sharding Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-white text-[11px] font-sans font-medium">Database Sharding (EU Region)</span>
                <span className="text-[#E25C5C] bg-[#E25C5C]/5 border border-[#E25C5C]/10 px-2 py-0.5 rounded-sm text-[8px] uppercase font-semibold tracking-wider">
                  Critical
                </span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-[#D4C5B9] h-full"
                  style={{ width: `${report.growthScalability.databaseSharding}%` }}
                />
              </div>
              <span className="text-[9px] font-sans text-white/40 font-light">
                Projected bottleneck in 14 days at current transaction volume.
              </span>
            </div>

            {/* Microservices Migration Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-white text-[11px] font-sans font-medium">Microservices Migration</span>
                <span className="text-[#D4C5B9] bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm text-[8px] uppercase font-semibold tracking-wider">
                  In Progress
                </span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-white/40 h-full"
                  style={{ width: `${report.growthScalability.microservices}%` }}
                />
              </div>
              <span className="text-[9px] font-sans text-white/40 font-light">
                Auth service isolation complete. Next segment: Payment gateway migration.
              </span>
            </div>
          </div>
        </motion.div>
        {/* Investor Readiness */}
        {report.aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5 md:col-span-2"
          >
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>

              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
                AI Investor Readiness
              </h3>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              {report.aiAnalysis.investor_readiness}
            </p>
          </motion.div>
        )}
        {/* AI Growth Plan */}
        {report.aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="glass-panel p-6 rounded-sm relative overflow-hidden border border-white/5"
          >
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
                <TrendingUp className="w-4.5 h-4.5" />
              </div>

              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
                AI Growth Plan
              </h3>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              {report.aiAnalysis.growth_plan}
            </p>
          </motion.div>
        )}
        {/* AI Risk Summary */}
        {report.aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="glass-panel p-6 rounded-sm relative overflow-hidden border border-[#E25C5C]/10"
          >
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-9 h-9 rounded-sm bg-[#E25C5C]/5 border border-[#E25C5C]/10 flex items-center justify-center text-[#E25C5C]">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>

              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-white">
                AI Risk Summary
              </h3>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              {report.aiAnalysis.risk_summary}
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
