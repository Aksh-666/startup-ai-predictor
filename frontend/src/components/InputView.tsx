import React, { useState } from 'react';
import { Cpu, Rocket, HelpCircle, Loader, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StartupInput } from '../types';
import { DEFAULT_INPUT } from '../data';

interface InputViewProps {
  onSubmit: (input: StartupInput) => Promise<void>;
}

export default function InputView({ onSubmit }: InputViewProps) {
  const [formData, setFormData] = useState<StartupInput>({ ...DEFAULT_INPUT });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const industries = [
    { value: "ai", label: "Artificial Intelligence" },
    { value: "saas", label: "SaaS" },
    { value: "fintech", label: "FinTech" },
    { value: "healthtech", label: "HealthTech" },
    { value: "edtech", label: "EdTech" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "marketplace", label: "Marketplace" },
    { value: "enterprise", label: "Enterprise Software" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "cloud", label: "Cloud Computing" },
    { value: "blockchain", label: "Blockchain / Web3" },
    { value: "gaming", label: "Gaming" },
    { value: "iot", label: "Internet of Things (IoT)" },
    { value: "robotics", label: "Robotics" },
    { value: "agritech", label: "AgriTech" },
    { value: "foodtech", label: "FoodTech" },
    { value: "logistics", label: "Logistics" },
    { value: "travel", label: "TravelTech" },
    { value: "biotech", label: "BioTech" },
    { value: "cleantech", label: "CleanTech" }
  ];

  const models = [
    { value: "b2b", label: "B2B" },
    { value: "b2c", label: "B2C" },
    { value: "b2b2c", label: "B2B2C" },
    { value: "saas", label: "SaaS Subscription" },
    { value: "marketplace", label: "Marketplace" },
    { value: "subscription", label: "Subscription" },
    { value: "freemium", label: "Freemium" },
    { value: "usage", label: "Usage-Based Pricing" },
    { value: "enterprise", label: "Enterprise Licensing" },
    { value: "advertising", label: "Advertising" },
    { value: "commission", label: "Commission-Based" },
    { value: "transaction", label: "Transaction Fee" },
    { value: "api", label: "API as a Service" }
  ];

  const stages = [
    { value: "Idea", label: "Idea" },
    { value: "Prototype", label: "Prototype" },
    { value: "MVP", label: "MVP" },
    { value: "Pre-Seed", label: "Pre-Seed" },
    { value: "Seed", label: "Seed" },
    { value: "Series A", label: "Series A" },
    { value: "Series B", label: "Series B" },
    { value: "Series C", label: "Series C" },
    { value: "Growth", label: "Growth Stage" },
    { value: "Bootstrapped", label: "Bootstrapped" }
  ];

  const getExperienceLabel = (level: number) => {
    if (level === 0) return 'First-Time';
    if (level === 1) return 'Intermediate';
    return 'Serial';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      authorized: e.target.checked
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      founderExperience: parseInt(e.target.value)
    }));
  };

  const triggerAnalysisSequence = async () => {
    if (!formData.authorized) {
      alert('Please authorize Startup AI to process this data vector before proceeding.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisLogs([]);
    setCurrentProgress(0);

    const logs = [
      "Validating startup information...",
      "Extracting business features...",
      "Running ML prediction model...",
      "Searching knowledge base...",
      "Finding similar startups...",
      "Analyzing market context...",
      "Generating AI recommendations...",
      "Preparing startup report..."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setAnalysisLogs(prev => [...prev, `[SYS] ${logs[currentLogIndex]}`]);
        setCurrentProgress(
          Math.min(
            95,
            Math.round(((currentLogIndex + 1) / logs.length) * 95)
          )
        );
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(async () => {

          try {

            await onSubmit(formData);

            setCurrentProgress(100);

            await new Promise(resolve => setTimeout(resolve, 300));

          } finally {

            setIsAnalyzing(false);

          }

        }, 1000);
      }
    }, 700);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 relative">
      {/* Absolute full page loader for matrix calculations */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-lg bg-[#121214] border border-white/10 rounded-sm p-6 shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <Loader className="w-4 h-4 text-[#D4C5B9] animate-spin" />
                <span className="font-sans text-[9px] font-semibold text-white tracking-[0.2em] uppercase">
                  ACTIVE CORE NEURAL SIMULATOR
                </span>
                <span className="ml-auto font-mono text-xs text-[#D4C5B9]">{currentProgress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/[0.02] h-1 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="bg-[#D4C5B9] h-full"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>

              {/* Hacker console log screen */}
              <div className="bg-black/35 p-4 rounded-sm border border-white/5 h-64 overflow-y-auto font-mono text-[10px] text-white/50 flex flex-col gap-2">
                {analysisLogs.map((log, idx) => (
                  <div key={idx} className={idx === analysisLogs.length - 1 ? 'text-[#D4C5B9] font-medium' : ''}>
                    {log}
                  </div>
                ))}
                {/* Auto blinking command cursor */}
                <span className="inline-block w-1.5 h-3 bg-[#D4C5B9]/60 animate-pulse" />
              </div>

              <div className="flex justify-between items-center text-[9px] font-sans text-white/30 uppercase tracking-widest">
                <span>STATUS: NOMINAL</span>
                <span>THREADS: 24 active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full bg-[#121214] border border-white/10 rounded-sm p-8 shadow-sm">
        {/* Top Header */}
        <div className="flex flex-col items-center justify-center text-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4C5B9]">
            <Rocket className="w-5 h-5" />
          </div>
          <h2 className="font-serif font-light text-2xl text-white tracking-tighter">
            Initialize Startup Vector
          </h2>
          <span className="font-sans text-[9px] text-[#D4C5B9] uppercase tracking-[0.25em] block">
            READY FOR DATA INGESTION
          </span>
        </div>

        {/* Input Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Startup Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Startup Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Nexus Protocol"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans"
            />
          </div>

          {/* Industry Sector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Industry Sector
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              {industries.map(ind => (
                <option key={ind.value} value={ind.value} className="bg-[#121214]">
                  {ind.label}
                </option>
              ))}
            </select>
          </div>

          {/* Business Model */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Business Model
            </label>
            <select
              name="businessModel"
              value={formData.businessModel}
              onChange={handleInputChange}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              {models.map(mod => (
                <option key={mod.value} value={mod.value} className="bg-[#121214]">
                  {mod.label}
                </option>
              ))}
            </select>
          </div>

          {/* Current Stage */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Current Stage
            </label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleInputChange}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans cursor-pointer"
            >
              {stages.map(st => (
                <option key={st.value} value={st.value} className="bg-[#121214]">
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* HQ / Country */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              HQ / Country
            </label>
            <input
              type="text"
              name="hqCountry"
              value={formData.hqCountry}
              onChange={handleInputChange}
              placeholder="e.g., United States"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans"
            />
          </div>

          {/* Funding Target */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Funding Target (USD)
            </label>
            <input
              type="number"
              name="fundingTarget"
              value={formData.fundingTarget}
              onChange={handleInputChange}
              placeholder="e.g., 2000000"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans"
            />
          </div>

          {/* Team Size */}
          <div className="flex md:col-span-1 flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Team Size
            </label>
            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans"
            />
          </div>

          {/* Founder Experience Slider */}
          <div className="flex md:col-span-1 flex-col gap-1.5 justify-between">
            <div className="flex justify-between items-center text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              <span>Founder Experience Level</span>
              <span className="text-[#D4C5B9] font-semibold">
                {getExperienceLabel(formData.founderExperience)}
              </span>
            </div>
            <div className="relative pt-3 pb-2 flex items-center">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={formData.founderExperience}
                onChange={handleSliderChange}
                className="w-full accent-[#D4C5B9] bg-white/5 rounded-full h-1 cursor-pointer"
              />
            </div>
            <div className="flex justify-between font-sans text-[8px] text-white/30 uppercase tracking-widest">
              <span>First-Time</span>
              <span>Serial</span>
            </div>
          </div>

          {/* Core Problem Statement */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Core Problem Statement
            </label>
            <textarea
              name="coreProblem"
              value={formData.coreProblem}
              onChange={handleInputChange}
              placeholder="What specific problem are you solving?"
              rows={3}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans resize-y"
            />
          </div>

          {/* Target Customers */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Target Customers
            </label>
            <textarea
              name="targetCustomers"
              value={formData.targetCustomers}
              onChange={handleInputChange}
              placeholder="Define your ICP (Ideal Customer Profile)"
              rows={2}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans resize-y"
            />
          </div>

          {/* Key Competitors */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              Key Competitors
            </label>
            <textarea
              name="keyCompetitors"
              value={formData.keyCompetitors}
              onChange={handleInputChange}
              placeholder="List primary competitors"
              rows={2}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans resize-y"
            />
          </div>

          {/* GTM Strategy */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-sans font-medium text-white/40 uppercase tracking-[0.2em]">
              GTM Strategy
            </label>
            <textarea
              name="gtmStrategy"
              value={formData.gtmStrategy}
              onChange={handleInputChange}
              placeholder="Go-To-Market approach"
              rows={2}
              className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-white/30 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all duration-300 font-sans resize-y"
            />
          </div>

          {/* Authorization Checkbox */}
          <div className="md:col-span-2 flex items-start gap-2.5 mt-2">
            <input
              type="checkbox"
              id="authorized-cb"
              checked={formData.authorized}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded bg-white/5 border border-white/10 accent-white/80 cursor-pointer mt-0.5"
            />
            <label htmlFor="authorized-cb" className="text-[10px] text-white/40 leading-normal select-none cursor-pointer hover:text-white/60 transition-all duration-200">
              I authorize Valerius AI to process this data vector for predictive modeling.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={triggerAnalysisSequence}
            className="w-full md:w-auto px-12 py-4 bg-white hover:bg-white/95 text-black font-sans font-semibold text-[11px] tracking-[0.25em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
          >
            Analyze Business Vector
          </button>
        </div>
      </div>
    </div>
  );
}
