import React, { useState, useEffect } from 'react';
import { HotspotCluster } from '../types';
import { X, Sparkles, AlertCircle, FileText, CheckCircle2, RefreshCw, Printer, Download } from 'lucide-react';

interface ClusterExplanationModalProps {
  hotspot: HotspotCluster | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClusterExplanationModal: React.FC<ClusterExplanationModalProps> = ({
  hotspot,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [engine, setEngine] = useState<string>('Gemini 3.8 Flash');

  useEffect(() => {
    if (!isOpen || !hotspot) return;

    if (hotspot.aiPolicyExplanation) {
      setExplanation(hotspot.aiPolicyExplanation);
    }

    // Call server Gemini endpoint to fetch or refresh rich markdown explanation
    const fetchExplanation = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/generate-cluster-explanation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clusterTitle: hotspot.title,
            category: hotspot.primaryCategory,
            requestCount: hotspot.requestCount,
            population: hotspot.totalPopulationAffected,
            keyIssues: hotspot.keyIssues,
            state: hotspot.state,
            district: hotspot.district,
          }),
        });
        const data = await response.json();
        if (data.success && data.explanation) {
          setExplanation(data.explanation);
          if (data.engine) setEngine(data.engine);
        }
      } catch (err) {
        console.warn('Using pre-cached explanation');
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, [isOpen, hotspot]);

  if (!isOpen || !hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">
                  Gemini Policymaker Decision Briefing
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {engine}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {hotspot.district}, {hotspot.state} • {hotspot.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hotspot Overview Bar */}
        <div className="bg-amber-50/60 border-b border-amber-200/50 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Primary Domain:</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-medium">
              {hotspot.primaryCategory}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500">Petitions:</span>{' '}
              <strong className="text-slate-900">{hotspot.requestCount} citizen voices</strong>
            </div>
            <div>
              <span className="text-slate-500">Affected Population:</span>{' '}
              <strong className="text-slate-900">~{hotspot.totalPopulationAffected.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-500">Priority Score:</span>{' '}
              <strong className="text-rose-600 font-bold">{hotspot.averagePriorityScore}/100</strong>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
              <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
              <p className="font-medium text-slate-700">Synthesizing citizen petitions with Gemini 3.8 Flash...</p>
              <p className="text-xs text-slate-400">Extracting root infrastructure bottlenecks and recommended policy interventions</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Key Issues Reported by Citizens in this Cluster
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {hotspot.keyIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Narrative Markdown */}
              <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-white p-5 rounded-xl border border-slate-200">
                {explanation}
              </div>

              {/* Action advice */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Decision Support Guidance:</strong> This synthesis is prepared to aid District Development Coordination & Monitoring Committees (DISHA) and Public Works engineers. Field ground-truthing is recommended prior to formal tender release.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Export ID: REF-{hotspot.id} • JanSetu AI GovTech
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Briefing</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
