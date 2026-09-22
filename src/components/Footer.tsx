import React from 'react';
import { PageView } from '../types';
import { Sparkles, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
                जन
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                JanSetu <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              <strong>“From Citizen Voice to Development Priorities”</strong> — Bridging grassroots citizen petitions with data-driven infrastructure prioritization for municipal corporations, district collectors, and public works departments across India.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-amber-300 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Cloud Hackathon: Build with AI – Code for Communities (2nd Edition)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('citizen-form')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Citizen Request Portal (नागरिक पोर्टल)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Policymaker Decision Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Priority Formula & AI Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Governance & Ethics</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Transparent Decision Support:</strong> JanSetu AI does not autonomously allocate budgets. It aggregates grassroots evidence to empower elected officials and civil administrators with spatial clarity and citizen priority indices.
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              Sample data is clearly flagged for demonstration purposes.
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 JanSetu AI. Built with Google Gemini 3.8 Flash & Google Cloud.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Hindi (हिंदी) & English Multilingual Support</span>
            <span>•</span>
            <span className="text-slate-400">Prototype Priority Engine (35/25/20/15/5)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
