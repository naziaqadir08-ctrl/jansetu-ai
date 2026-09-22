import React from 'react';
import { PageView } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Code, 
  Calculator, 
  Globe, 
  Users, 
  Layers, 
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
  onOpenFormulaModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenFormulaModal,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Google Cloud Hackathon: Build with AI – Code for Communities (2nd Edition)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About JanSetu AI
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          <strong>Tagline:</strong> “From Citizen Voice to Development Priorities”
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Globe className="w-6 h-6 text-amber-600" />
          <span>Project Purpose & Public Administration Challenge</span>
        </h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            In many districts and municipal corporations across India, citizens encounter daily infrastructure bottlenecks—from waterlogged hospital access roads during the monsoon to contaminated tap lines or broken school transformers.
          </p>
          <p>
            Historically, citizen complaints arrive as fragmented verbal grievances, handwritten petitions in local languages like Hindi, or isolated social media posts. Civil administrators (District Collectors, DISHA committees, and Municipal Commissioners) lack a cohesive spatial mechanism to distinguish an isolated complaint from a <strong>concentrated community infrastructure emergency</strong>.
          </p>
          <p className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950 font-medium">
            <strong>JanSetu AI</strong> bridges this gap: it allows citizens to submit requests in Hindi or English (via text or voice), uses <strong>Google Gemini 3.8 Flash</strong> to extract structured domain intelligence, clusters overlapping petitions into geographical demand hotspots, and calculates a transparent priority index to assist human officials in prioritizing capital works.
          </p>
        </div>
      </div>

      {/* Google Gemini AI Integration Details */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm uppercase tracking-wider">
          <Cpu className="w-5 h-5" />
          <span>Google Cloud AI Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          How Google Gemini AI Powers JanSetu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              1. Multilingual Understanding
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Accepts native Hindi (देवनागरी), English, and mixed Hinglish dialects. Comprehends colloquial idioms (such as "खटोली पर ले जाना पड़ा" or "बिजली का ट्रांसफार्मर जला पड़ा है").
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              2. Structured Information Extraction
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Automatically parses unstructured text into Category, Subcategory, Core Problem, Affected Public Service, Urgency (High/Medium/Low), and Keywords.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              3. Summarization & Translation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Provides crisp, standardized English executive summaries and translations for municipal engineering rosters and state review meetings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Decision Briefings for Officials
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Generates executive policy briefing notes explaining why a spatial cluster (e.g., 34 petitions in Rohaniya Block) requires immediate administrative sanction.
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Priority System */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-600" />
              <span>Transparent Priority Scoring Model</span>
            </h2>
            <p className="text-xs text-slate-500">
              Prototype index engineered for the hackathon demonstration
            </p>
          </div>

          <button
            onClick={onOpenFormulaModal}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors self-start"
          >
            Inspect Detailed Formula
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
            <div className="text-lg font-black text-amber-800">35%</div>
            <div className="font-semibold text-slate-800 mt-1">Request Density</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Spatial concentration</div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-lg font-black text-blue-800">25%</div>
            <div className="font-semibold text-slate-800 mt-1">Population</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Citizens impacted</div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200">
            <div className="text-lg font-black text-purple-800">20%</div>
            <div className="font-semibold text-slate-800 mt-1">Infra Gap</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Deficit severity</div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
            <div className="text-lg font-black text-rose-800">15%</div>
            <div className="font-semibold text-slate-800 mt-1">Urgency</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Health & emergency</div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 col-span-2 sm:col-span-1">
            <div className="text-lg font-black text-emerald-800">5%</div>
            <div className="font-semibold text-slate-800 mt-1">Recency</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Submission age</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p>
            <strong>Governance Principle:</strong> JanSetu AI does not unilaterally execute tenders or transfer funds. It acts strictly as an objective, transparent decision-support copilot for elected public servants and municipal engineers.
          </p>
        </div>
      </div>

      {/* Beginner Step-by-Step Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-slate-700" />
          <span>Beginner Guide: How to Run and Test JanSetu AI</span>
        </h2>
        <p className="text-sm text-slate-600">
          Even if you are new to programming, here is how the application works step-by-step:
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
              Step 1: Test the Citizen Portal
            </strong>
            <p className="text-slate-600">
              Go to <strong>Submit Request</strong>. Click any of the 4 quick preset buttons (like the Hindi hospital road example) or type your own community grievance in Hindi or English. Click Submit to observe Gemini 3.8 Flash extract structured categories and compute the priority index.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
              Step 2: Inspect the Policymaker Dashboard
            </strong>
            <p className="text-slate-600">
              Navigate to <strong>Policymaker Dashboard</strong>. Explore the interactive India demand heatmap, filter by category or urgency, and click on any hotspot pin (such as Rohaniya or Danapur) to click <strong>"Gemini Decision Briefing"</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
              Step 3: Server-side Gemini API Key
            </strong>
            <p className="text-slate-600">
              The application runs on a secure full-stack Express + Vite architecture (<code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">server.ts</code>). The Gemini API key is kept safely on the server side via <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">process.env.GEMINI_API_KEY</code> and is never leaked to the browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
