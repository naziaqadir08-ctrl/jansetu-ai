import React from 'react';
import { PageView } from '../types';
import { 
  Send, 
  LayoutDashboard, 
  Sparkles, 
  Mic, 
  MapPin, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Languages,
  Activity
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  totalRequestsCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  totalRequestsCount,
}) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-8 sm:p-14 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Hackathon badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Cloud Hackathon • Build with AI: Code for Communities</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Voice. <br className="hidden sm:inline" />
            Your Community. <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Better Development.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            JanSetu AI transforms citizen requests into development intelligence for better-informed decisions.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            नागरिकों की समस्याओं (सड़क, पानी, अस्पताल, बिजली) को समझकर नीति निर्माताओं तक प्राथमिकता के आधार पर पहुंचाने वाला कृत्रिम बुद्धिमत्ता (AI) मंच।
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-submit-request-btn"
              onClick={() => onNavigate('citizen-form')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Submit a Request</span>
            </button>

            <button
              id="hero-view-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white font-semibold text-sm sm:text-base border border-slate-700 shadow-md transition-all hover:scale-[1.02]"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>View Dashboard</span>
            </button>
          </div>

          {/* Micro stats banner */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-xl font-bold text-amber-400">{totalRequestsCount}+</div>
              <div className="text-slate-400">Citizen Petitions</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">Hindi + Eng</div>
              <div className="text-slate-400">Multilingual & Voice</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-400">Gemini 3.8</div>
              <div className="text-slate-400">AI Triage & Synthesis</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-400">5 Factors</div>
              <div className="text-slate-400">Transparent Priority</div>
            </div>
          </div>
        </div>
      </section>

      {/* Concrete Example: Citizen Voice -> Gemini AI Extraction */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full">
            Intelligent Triage in Action
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            How JanSetu AI Understands Citizen Needs
          </h2>
          <p className="text-sm text-slate-600">
            Natural language input in Hindi or English is converted into structured public administration intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">
          {/* Left: Raw Citizen Input */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-amber-600" />
                Citizen Input (नागरिक की आवाज़)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">
                Hindi Text / Voice
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 font-sans text-slate-900 text-sm leading-relaxed">
              “हमारे गांव से अस्पताल जाने वाली सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं पहुंच पाती।”
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Karsara Village, Rohaniya Block, Varanasi (UP)</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Submitted via Web Portal with optional voice recording
              </div>
            </div>
          </div>

          {/* Middle: Arrow indicator */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-2">
            <div className="p-3 rounded-full bg-amber-100 text-amber-700 border border-amber-200 shadow-xs mb-1">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Gemini 3.8 Flash</span>
            <span className="text-[10px] text-slate-400">Semantic Extraction</span>
          </div>

          {/* Right: Extracted Intelligence */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800 text-slate-400">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Structured Policy Intelligence
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold">
                Urgency: High
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-slate-400 text-[10px] block">Category</span>
                <span className="font-bold text-slate-100">Healthcare & Emergency</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-slate-400 text-[10px] block">Affected Service</span>
                <span className="font-bold text-slate-100">Emergency Medical Transit</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs space-y-1">
              <span className="text-slate-400 text-[10px] block">Summary</span>
              <p className="text-slate-200 text-xs">
                Poor road connectivity is critically obstructing emergency ambulances from reaching patients in time.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
              <span>Prototype Priority Score:</span>
              <strong className="text-amber-400 font-bold text-sm">89 / 100</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Flow */}
      <section className="space-y-8 bg-slate-100/70 p-8 sm:p-12 rounded-3xl border border-slate-200/80">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            End-to-End GovTech Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            From Citizen Voice to Development Priorities
          </h2>
          <p className="text-sm text-slate-600">
            Bridging grassroots community needs with evidence-based administrative sanction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Citizen Voice</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizens submit infrastructure grievances using Hindi, English, speech/voice input, location tags, and optional photographic proof.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Gemini AI Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Gemini 3.8 Flash extracts core problem, affected service, urgency classification, keywords, and concise English summaries.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Spatial Hotspots</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine aggregates overlapping petitions into district and ward demand hotspots using a transparent 5-factor priority formula.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900">Policymaker Action</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              District Collectors and Municipal Engineers review AI decision briefings to target road resurfacing, pipelines, and lighting efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-amber-600 text-white text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
          Ready to experience the platform?
        </h2>
        <p className="text-amber-100 max-w-xl mx-auto text-sm sm:text-base">
          Submit a simulated or real community request, or explore the live interactive Policymaker Decision Dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('citizen-form')}
            className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
          >
            Submit a Citizen Request
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-slate-950 font-bold text-sm shadow-md transition-transform hover:scale-105"
          >
            Open Policymaker Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};
