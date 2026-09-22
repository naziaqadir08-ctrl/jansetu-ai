import React from 'react';
import { CitizenRequest } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  Tag, 
  Users, 
  CheckCircle2, 
  Languages,
  Activity,
  FileCheck
} from 'lucide-react';

interface RequestDetailsModalProps {
  request: CitizenRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (requestId: string, newStatus: CitizenRequest['status']) => void;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  isOpen,
  onClose,
  onStatusChange,
}) => {
  if (!isOpen || !request) return null;

  const urgencyColors = {
    High: 'bg-rose-100 text-rose-800 border-rose-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const statusList: CitizenRequest['status'][] = [
    'Submitted',
    'AI Triaged',
    'Priority Clustered',
    'Under Review',
    'Action Planned',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-slate-900">
                  Citizen Request Dossier
                </h3>
                <span className="font-mono text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {request.id}
                </span>
                {request.isDemoData && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Simulated Demo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Logged on {new Date(request.submittedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Priority Score Header Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">JanSetu Priority Score (Prototype Index)</div>
              <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-2">
                <span>{request.priority.totalScore}</span>
                <span className="text-xs text-slate-300 font-normal">/ 100</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {request.priority.totalScore >= 80 ? 'High Community Priority' : 'Moderate Priority'}
                </span>
              </div>
            </div>

            {/* Formula weights quick pills */}
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                <div className="text-slate-400">Density (35%)</div>
                <div className="font-bold text-slate-200">{request.priority.requestDensity}</div>
              </div>
              <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                <div className="text-slate-400">Pop (25%)</div>
                <div className="font-bold text-slate-200">{request.priority.populationAffected}</div>
              </div>
              <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                <div className="text-slate-400">Gap (20%)</div>
                <div className="font-bold text-slate-200">{request.priority.infrastructureGap}</div>
              </div>
              <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                <div className="text-slate-400">Urgency (15%)</div>
                <div className="font-bold text-slate-200">{request.priority.urgency}</div>
              </div>
              <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
                <div className="text-slate-400">Recency (5%)</div>
                <div className="font-bold text-slate-200">{request.priority.recency}</div>
              </div>
            </div>
          </div>

          {/* Original Citizen Voice Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider">
                <Languages className="w-4 h-4 text-amber-600" />
                Original Citizen Petition ({request.detectedLanguage || 'Regional'})
              </span>
              <span>By: {request.citizenName || 'Anonymous Citizen'}</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60 text-slate-900 text-sm leading-relaxed font-sans">
              “{request.originalText}”
            </div>

            {request.aiAnalysis.englishTranslation && request.inputLanguage === 'hi' && (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">AI English Translation: </span>
                {request.aiAnalysis.englishTranslation}
              </div>
            )}

            {request.photoUrl && (
              <div className="mt-2">
                <div className="text-xs font-semibold text-slate-600 mb-1.5">Attached Photographic Evidence:</div>
                <img 
                  src={request.photoUrl} 
                  alt="Citizen uploaded proof"
                  className="rounded-xl w-full max-h-56 object-cover border border-slate-200 shadow-xs"
                />
              </div>
            )}
          </div>

          {/* Gemini AI Extracted Information */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Google Gemini AI Structured Intelligence</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-medium block">Category & Subcategory</span>
                <span className="font-bold text-slate-900 text-sm">{request.aiAnalysis.category}</span>
                <span className="text-xs text-slate-600 block mt-0.5">{request.aiAnalysis.subcategory}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-slate-400 font-medium block">Urgency & Risk Profile</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${urgencyColors[request.aiAnalysis.urgency]}`}>
                    {request.aiAnalysis.urgency} Urgency
                  </span>
                  <span className="text-xs text-slate-600">
                    Gap: {request.aiAnalysis.infrastructureGapLevel}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2">
                <span className="text-[11px] text-slate-400 font-medium block">Core Problem Identified</span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">
                  {request.aiAnalysis.problem}
                </span>
                <div className="text-xs text-slate-600 mt-1">
                  <strong>Affected Public Service:</strong> {request.aiAnalysis.affectedService}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2">
                <span className="text-[11px] text-slate-400 font-medium block">Executive Summary</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  {request.aiAnalysis.shortSummary}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Keywords:
              </span>
              {request.aiAnalysis.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Population */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Geographic Coordinates & Ward
              </span>
              <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                {request.location.villageOrLocality}, {request.location.blockOrWard}
              </div>
              <div className="text-xs text-slate-500">
                {request.location.district}, {request.location.state}
              </div>
            </div>

            <div className="sm:text-right bg-white px-3 py-2 rounded-lg border border-slate-200 shrink-0">
              <div className="text-[11px] text-slate-500 flex items-center gap-1 sm:justify-end">
                <Users className="w-3 h-3 text-blue-600" /> Estimated Impact
              </div>
              <div className="font-bold text-slate-900 text-sm">
                ~{request.aiAnalysis.estimatedPopulationAffected.toLocaleString()} citizens
              </div>
            </div>
          </div>

          {/* Workflow Status Tracker */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
              Policymaker Administrative Stage
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {statusList.map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange?.(request.id, st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    request.status === st
                      ? 'bg-amber-600 text-white shadow-xs font-semibold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
