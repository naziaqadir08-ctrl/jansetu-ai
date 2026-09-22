import React from 'react';
import { X, ShieldCheck, Calculator, Info, CheckCircle2 } from 'lucide-react';

interface PriorityFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriorityFormulaModal: React.FC<PriorityFormulaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const factors = [
    {
      name: 'Request Density',
      weight: '35%',
      color: 'bg-amber-500',
      description: 'Measures spatial clustering of petitions within a 3-5 km geographic radius. Identifies collective community consensus over isolated individual grievances.',
      example: '30+ petitions in a single panchayat yields ~90-100/100.',
    },
    {
      name: 'Population Affected',
      weight: '25%',
      color: 'bg-blue-500',
      description: 'Estimates total citizens impacted by the infrastructure deficit (e.g., trunk feeder road, district hospital pipeline, or central transformer).',
      example: 'Inter-village trunk road affecting 20,000+ residents receives top weighting.',
    },
    {
      name: 'Infrastructure Gap Severity',
      weight: '20%',
      color: 'bg-purple-500',
      description: 'Categorizes systemic deficit into Critical (complete absence/destruction), Moderate (partial failure), or Minor (service maintenance).',
      example: 'Washed-out bridge or contaminated tap line scores Critical (90+).',
    },
    {
      name: 'Urgency & Vulnerability',
      weight: '15%',
      color: 'bg-rose-500',
      description: 'Evaluates acute risks to human life, emergency transit, maternity, or child health extracted by Gemini AI from citizen narrative.',
      example: 'Inability for ambulances to reach emergency patients elevates urgency.',
    },
    {
      name: 'Recency & Persistence',
      weight: '5%',
      color: 'bg-emerald-500',
      description: 'Rewards fresh active citizen distress calls while preventing neglected multi-month unresolved issues from dropping out of sight.',
      example: 'Recent complaints submitted within last 7-30 days.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">
                Transparent Priority Scoring Formula
              </h3>
              <p className="text-xs text-slate-500">
                Mathematical index translating citizen petitions into prioritized infrastructure needs
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Transparent Formula Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm shadow-inner">
            <div className="text-amber-400 font-bold mb-1 font-sans flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>Priority Index Formula (0 – 100):</span>
            </div>
            <div className="overflow-x-auto py-1 text-slate-200">
              Total Score = (Density × 0.35) + (Population × 0.25) + (Infra Gap × 0.20) + (Urgency × 0.15) + (Recency × 0.05)
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Weight Distribution & Indicators
            </h4>
            <div className="space-y-3">
              {factors.map((factor) => (
                <div key={factor.name} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <span className={`w-2.5 h-2.5 rounded-full ${factor.color}`} />
                      <span>{factor.name}</span>
                    </div>
                    <span className="font-bold text-sm text-slate-900 px-2 py-0.5 rounded-md bg-white border border-slate-200">
                      {factor.weight} Weight
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {factor.description}
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1 italic">
                    Example: {factor.example}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Governance & Disclaimer notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Hackathon Prototype & Governance Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              <strong>Notice:</strong> These priority scores are transparent <em>prototype and demo assumptions</em> engineered for the <strong>Build with AI: Code for Communities Hackathon</strong>. They are designed to support human decision-makers (District Collectors, Municipal Commissioners, and Elected Representatives) by highlighting concentrated evidence, and are <strong>NOT official government statutory criteria</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
