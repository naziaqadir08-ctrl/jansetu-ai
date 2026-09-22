import React from 'react';
import { CitizenRequest, PageView } from '../types';
import { 
  CheckCircle2, 
  Sparkles, 
  Send, 
  LayoutDashboard, 
  MapPin, 
  AlertTriangle, 
  Tag, 
  FileText,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ConfirmationPageProps {
  request: CitizenRequest;
  onNavigate: (page: PageView) => void;
  onViewDetails: (request: CitizenRequest) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  request,
  onNavigate,
  onViewDetails,
}) => {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your request has been received and analyzed by JanSetu AI.
        </h1>

        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          आपका अनुरोध सफलतापूर्वक दर्ज कर लिया गया है और गूगल जेमिनी एआई ने इसकी जांच कर प्राथमिकता निर्धारित कर दी है।
        </p>

        <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <span>Tracking ID:</span>
          <strong className="text-slate-900">{request.id}</strong>
        </div>
      </div>

      {/* AI Extraction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Google Gemini Structured Analysis</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
            Triage Complete
          </span>
        </div>

        {/* Priority Score Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Prototype Priority Score</div>
            <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-1.5">
              <span>{request.priority.totalScore}</span>
              <span className="text-xs text-slate-300 font-normal">/ 100</span>
            </div>
          </div>
          <div className="text-right text-xs">
            <div className="text-slate-400">Urgency Assessment</div>
            <div className="font-bold text-rose-400">{request.aiAnalysis.urgency} Urgency</div>
          </div>
        </div>

        {/* Extracted Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Category</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{request.aiAnalysis.category}</span>
            <span className="text-slate-600 text-[11px] mt-0.5 block">{request.aiAnalysis.subcategory}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Affected Public Service</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{request.aiAnalysis.affectedService}</span>
            <span className="text-slate-600 text-[11px] mt-0.5 block">Estimated ~{request.aiAnalysis.estimatedPopulationAffected.toLocaleString()} citizens impacted</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Identified Core Problem</span>
            <span className="font-semibold text-slate-900 mt-1 block">{request.aiAnalysis.problem}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Short Summary</span>
            <p className="text-slate-700 mt-1 leading-relaxed">{request.aiAnalysis.shortSummary}</p>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Extracted Keywords:
          </span>
          {request.aiAnalysis.keywords.map((k) => (
            <span key={k} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
              #{k}
            </span>
          ))}
        </div>

        {/* Location snippet */}
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>Reported Location: <strong>{request.location.villageOrLocality}, {request.location.blockOrWard}, {request.location.district}, {request.location.state}</strong></span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onViewDetails(request)}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all"
        >
          <FileText className="w-4 h-4 text-slate-600" />
          <span>View Detailed Dossier</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        >
          <LayoutDashboard className="w-4 h-4 text-amber-400" />
          <span>Track in Policymaker Dashboard</span>
        </button>

        <button
          onClick={() => onNavigate('citizen-form')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Submit Another Request</span>
        </button>
      </div>
    </div>
  );
};
