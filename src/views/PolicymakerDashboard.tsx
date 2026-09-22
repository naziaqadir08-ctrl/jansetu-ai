import React, { useState, useMemo } from 'react';
import { CitizenRequest, HotspotCluster, Category, UrgencyLevel } from '../types';
import { IndiaMap } from '../components/IndiaMap';
import { 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Sparkles, 
  Filter, 
  Search, 
  Calculator, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  Activity,
  Layers,
  Info
} from 'lucide-react';

interface PolicymakerDashboardProps {
  requests: CitizenRequest[];
  hotspots: HotspotCluster[];
  onViewRequestDetails: (request: CitizenRequest) => void;
  onRequestClusterBriefing: (hotspot: HotspotCluster) => void;
  onOpenFormulaModal: () => void;
}

export const PolicymakerDashboard: React.FC<PolicymakerDashboardProps> = ({
  requests,
  hotspots,
  onViewRequestDetails,
  onRequestClusterBriefing,
  onOpenFormulaModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotCluster | null>(hotspots[0] || null);

  // Compute KPIs
  const totalRequests = requests.length;
  const highPriorityRequests = requests.filter((r) => r.priority.totalScore >= 80).length;
  const criticalGapsCount = requests.filter((r) => r.aiAnalysis.infrastructureGapLevel === 'Critical').length;
  const totalPopulation = useMemo(() => {
    return requests.reduce((acc, r) => acc + (r.aiAnalysis.estimatedPopulationAffected || 0), 0);
  }, [requests]);

  // Compute category distribution
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    requests.forEach((r) => {
      counts[r.aiAnalysis.category] = (counts[r.aiAnalysis.category] || 0) + 1;
    });
    return counts;
  }, [requests]);

  const categories: Category[] = [
    'Healthcare & Emergency',
    'Roads & Transportation',
    'Water & Sanitation',
    'Electricity & Power',
    'Education & Schools',
    'Waste & Environment',
    'Public Safety & Lighting',
  ];

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchCat = selectedCategory === 'all' || r.aiAnalysis.category === selectedCategory;
      const matchUrg = selectedUrgency === 'all' || r.aiAnalysis.urgency === selectedUrgency;
      const matchSearch =
        !searchQuery ||
        r.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.aiAnalysis.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.blockOrWard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.aiAnalysis.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchUrg && matchSearch;
    });
  }, [requests, selectedCategory, selectedUrgency, searchQuery]);

  return (
    <div className="space-y-8 py-6 sm:py-10">
      {/* Top Banner: Decision Support & Disclaimer */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                Decision Support System
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                DISHA & Municipal PWD Cockpit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Community Infrastructure Priorities Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing grassroots citizen petitions into spatial clusters and multi-factor priority indices to assist District Collectors and Municipal Commissioners in evidence-based capital budgeting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenFormulaModal}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>View Priority Formula (35/25/20/15/5)</span>
            </button>
          </div>
        </div>

        {/* Prototype disclaimer label */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong>Hackathon Demo Data Notice:</strong> Includes realistic simulated petitions across UP, Bihar, Jharkhand, and Rajasthan to demonstrate clustering intelligence. JanSetu assists human administrators and does not unilaterally determine government expenditure.
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Petitions</span>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalRequests}</div>
          <p className="text-[11px] text-slate-500 mt-1">Grassroots citizen petitions triaged</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>High-Priority Needs</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600">{highPriorityRequests}</div>
          <p className="text-[11px] text-slate-500 mt-1">Priority index &gt;= 80 / 100</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Demand Hotspots</span>
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-700">{hotspots.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Concentrated spatial clusters</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Estimated Citizens Impacted</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">~{totalPopulation.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 mt-1">Across reported panchayats & wards</p>
        </div>
      </div>

      {/* Interactive Map & Hotspots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>Spatial Concentration & Infrastructure Hotspots</span>
            </h2>
            <p className="text-xs text-slate-500">
              Click pins or clusters on the map to inspect petition density and generate Gemini decision briefings.
            </p>
          </div>
        </div>

        <IndiaMap
          hotspots={hotspots}
          selectedHotspot={selectedHotspot}
          onSelectHotspot={(h) => setSelectedHotspot(h)}
          onRequestBriefing={(h) => onRequestClusterBriefing(h)}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Category Breakdown & Hotspot Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown Progress Bar Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <span>Requests by Category</span>
            </h3>
            <span className="text-xs text-slate-400">Total: {totalRequests}</span>
          </div>

          <div className="space-y-3">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const percentage = totalRequests > 0 ? Math.round((count / totalRequests) * 100) : 0;

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 truncate pr-2">{cat}</span>
                    <span className="font-bold text-slate-900 shrink-0">
                      {count} <span className="text-[10px] text-slate-400 font-normal">({percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            💡 <strong>Observation:</strong> Healthcare emergency access corridors and potable water pipelines exhibit the highest severity index in the current cycle.
          </div>
        </div>

        {/* Hotspots Quick List */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Concentrated Hotspot Clusters ({hotspots.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click to focus & brief</span>
          </div>

          <div className="space-y-3">
            {hotspots.map((h) => {
              const isSelected = selectedHotspot?.id === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{h.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                        {h.district}, {h.state}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-600">
                        Score: {h.averagePriorityScore}/100
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequestClusterBriefing(h);
                        }}
                        className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Briefing</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    {h.keyIssues.join(' • ')}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200/60">
                    <span>👥 ~{h.totalPopulationAffected.toLocaleString()} affected</span>
                    <span>📝 {h.requestCount} petitions</span>
                    <span className="text-amber-700 font-medium">{h.primaryCategory}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filterable Table: Citizen Requests */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              Verified Citizen Requests & Priority Rankings
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredRequests.length} of {totalRequests} petitions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search problem, district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900 w-44 sm:w-56"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Urgency Filter */}
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900 bg-white"
            >
              <option value="all">All Urgency</option>
              <option value="High">High Urgency</option>
              <option value="Medium">Medium Urgency</option>
              <option value="Low">Low Urgency</option>
            </select>
          </div>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Tracking ID & Citizen</th>
                <th className="py-3 px-4">Core Problem & Summary</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Urgency</th>
                <th className="py-3 px-4 text-right">Priority Score</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((r) => {
                const urgencyClass =
                  r.aiAnalysis.urgency === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : r.aiAnalysis.urgency === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700';

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                    onClick={() => onViewRequestDetails(r)}
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      <div>{r.id}</div>
                      <div className="text-[11px] text-slate-500 font-sans font-normal">
                        {r.citizenName || 'Anonymous'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {r.aiAnalysis.problem}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {r.aiAnalysis.shortSummary}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">
                        {r.location.district}, {r.location.state}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {r.location.blockOrWard}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 text-[11px] font-medium">
                        {r.aiAnalysis.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${urgencyClass}`}>
                        {r.aiAnalysis.urgency}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap font-bold text-slate-900">
                      <span className="text-amber-600 text-sm">
                        {r.priority.totalScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal"> / 100</span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewRequestDetails(r);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-700 font-semibold text-[11px] transition-colors"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-10 text-slate-500 text-xs">
              No citizen petitions matched your filter criteria. Try resetting search or category filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
