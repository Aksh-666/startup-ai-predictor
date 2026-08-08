import React, { useState } from 'react';
import { Cpu, Bell, Settings, User, Search } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onSearch?: (query: string) => void;
}

export default function Header({ activeTab, setActiveTab, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationActive, setNotificationActive] = useState(true);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'input', label: 'Input' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'reports', label: 'Reports' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 px-12 py-5 flex items-center justify-between">
      {/* Brand logo */}
      <div 
        className="flex items-center gap-3.5 cursor-pointer select-none group"
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 transition-all duration-500">
          <span className="font-serif italic text-white text-xs font-light tracking-widest">S</span>
        </div>
        <span className="font-sans font-bold text-[14px] tracking-[0.2em] uppercase text-white group-hover:text-cyber-purple transition-colors duration-500">
          STARTUP <span className="font-light text-white/40">AI</span>
        </span>
      </div>

      {/* Navigation tabs */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative py-1 font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-white ${
                isActive 
                  ? 'text-white' 
                  : 'text-white/50'
              }`}
            >
              {item.label}
              {isActive && (
                <div className="absolute bottom-[-22px] left-0 right-0 h-[1.5px] bg-white" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-white/30" />
          <input
            type="text"
            placeholder="Search details..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-40 lg:w-52 pl-9 pr-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-sm text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-500 font-sans"
          />
        </div>

        {/* Notifications */}
        <button 
          onClick={() => setNotificationActive(false)}
          className="relative p-2 rounded hover:bg-white/5 transition-all duration-200 text-white/50 hover:text-white"
        >
          <Bell className="w-4 h-4" />
          {notificationActive && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyber-purple" />
          )}
        </button>

        {/* Settings */}
        <button className="p-2 rounded hover:bg-white/5 transition-all duration-200 text-white/50 hover:text-white">
          <Settings className="w-4 h-4" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
