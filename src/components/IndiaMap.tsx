import React, { useState } from 'react';
import { HotspotCluster, Category } from '../types';
import { MapPin, Sparkles, Users, AlertTriangle, ChevronRight, Layers } from 'lucide-react';

interface IndiaMapProps {
  hotspots: HotspotCluster[];
  selectedHotspot: HotspotCluster | null;
  onSelectHotspot: (hotspot: HotspotCluster) => void;
  onRequestBriefing: (hotspot: HotspotCluster) => void;
  selectedCategory: string;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  hotspots,
  selectedHotspot,
  onSelectHotspot,
  onRequestBriefing,
  selectedCategory,
}) => {
  const [hoveredPin, setHoveredPin] = useState<HotspotCluster | null>(null);

  // Map latitude/longitude to SVG viewBox (0 0 800 680)
  // India approx bounds: Lat 8N to 37N, Lng 68E to 97E
  const projectCoords = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 92.5;
    const minLat = 9.0;
    const maxLat = 34.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 680 + 60;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 540 + 60;

    return { x, y };
  };

  const filteredHotspots = hotspots.filter((h) => {
    if (selectedCategory === 'all') return true;
    return h.primaryCategory === selectedCategory;
  });

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl overflow-hidden text-white">
      {/* Header bar within map */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              National Infrastructure Demand Heatmap
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Live Prototype
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive spatial cluster intelligence from citizen petitions across India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse inline-block" />
            <span className="text-slate-300">Critical Demand (&gt;85)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-300">Elevated (70-85)</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center">
        <svg
          viewBox="0 0 800 640"
          className="w-full h-full object-contain select-none"
        >
          {/* Subtle Grid / Lat-Long Matrix */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            <radialGradient id="hotspotGlowRose" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hotspotGlowAmber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="640" fill="url(#grid)" />

          {/* India Landmass Silhouette Geometric Path (Stylized representative boundary) */}
          <g id="india-landmass-layer" className="transition-all duration-300">
            {/* Mainland polygon */}
            <path
              d="M 330 65 
                 C 360 85, 380 110, 420 120 
                 C 470 135, 510 130, 560 145 
                 C 600 155, 660 140, 710 160 
                 C 740 180, 730 220, 690 235 
                 C 660 250, 640 230, 610 240 
                 C 580 250, 560 270, 540 290 
                 C 510 320, 530 350, 510 390 
                 C 480 430, 460 480, 430 540 
                 C 410 580, 390 605, 380 610 
                 C 370 605, 350 560, 340 520 
                 C 330 480, 310 440, 300 400 
                 C 285 360, 270 330, 250 310 
                 C 230 290, 200 290, 180 270 
                 C 165 250, 180 220, 210 200 
                 C 230 180, 250 160, 270 130 
                 C 290 100, 310 75, 330 65 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2"
              className="filter drop-shadow-md"
            />

            {/* Internal State/Zonal Reference Corridors */}
            <path
              d="M 270 170 Q 380 190 540 240"
              fill="none"
              stroke="#334155"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M 230 270 Q 370 290 510 340"
              fill="none"
              stroke="#334155"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <path
              d="M 285 360 Q 370 410 470 440"
              fill="none"
              stroke="#334155"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* State Names subtle labels */}
            <text x="320" y="160" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">NORTHERN REGION</text>
            <text x="440" y="240" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">UTTAR PRADESH</text>
            <text x="560" y="250" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">BIHAR</text>
            <text x="560" y="295" fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="middle">JHARKHAND</text>
            <text x="260" y="220" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">RAJASTHAN</text>
            <text x="270" y="330" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">MAHARASHTRA</text>
            <text x="390" y="320" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">MADHYA PRADESH</text>
            <text x="380" y="470" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">SOUTHERN ZONE</text>
          </g>

          {/* Hotspots Clusters Radar Circles & Markers */}
          {filteredHotspots.map((hotspot) => {
            const { x, y } = projectCoords(hotspot.coordinates.lat, hotspot.coordinates.lng);
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isCritical = hotspot.averagePriorityScore >= 85;
            const markerColor = isCritical ? '#f43f5e' : '#f59e0b';
            const glowId = isCritical ? 'url(#hotspotGlowRose)' : 'url(#hotspotGlowAmber)';

            return (
              <g
                key={hotspot.id}
                id={`map-pin-${hotspot.id}`}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectHotspot(hotspot)}
                onMouseEnter={() => setHoveredPin(hotspot)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                {/* Radar ripple rings */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 42 : 28}
                  fill={glowId}
                  className="animate-ping origin-center opacity-60"
                  style={{ animationDuration: isCritical ? '2s' : '3s' }}
                />

                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 20 : 14}
                  fill={markerColor}
                  fillOpacity="0.25"
                  stroke={markerColor}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                />

                {/* Center Solid Pin */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : 6}
                  fill={markerColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="filter drop-shadow-sm"
                />

                {/* Score badge / pill near pin */}
                <g transform={`translate(${x + 12}, ${y - 12})`}>
                  <rect
                    width="68"
                    height="20"
                    rx="10"
                    fill="#0f172a"
                    stroke={isSelected ? '#f59e0b' : '#334155'}
                    strokeWidth={isSelected ? '1.5' : '1'}
                    className="filter drop-shadow-md"
                  />
                  <text
                    x="8"
                    y="14"
                    fill="#f8fafc"
                    fontSize="10"
                    fontWeight="700"
                  >
                    ★ {hotspot.averagePriorityScore}
                  </text>
                  <text
                    x="38"
                    y="14"
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="500"
                  >
                    ({hotspot.requestCount}p)
                  </text>
                </g>

                {/* City/District Label */}
                <text
                  x={x}
                  y={y + 24}
                  fill={isSelected ? '#fbbf24' : '#e2e8f0'}
                  fontSize={isSelected ? '12' : '11'}
                  fontWeight="700"
                  textAnchor="middle"
                  className="filter drop-shadow-xs"
                >
                  {hotspot.district}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Mini Tooltip when hovering over a pin */}
        {hoveredPin && !selectedHotspot && (
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md max-w-xs pointer-events-none">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-amber-400">
              <span>{hoveredPin.district}, {hoveredPin.state}</span>
              <span className="px-1.5 py-0.5 rounded-sm bg-rose-950 text-rose-300 text-[10px]">
                Priority: {hoveredPin.averagePriorityScore}/100
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1 font-medium">{hoveredPin.title}</p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
              <span>👥 ~{hoveredPin.totalPopulationAffected.toLocaleString()} affected</span>
              <span>📝 {hoveredPin.requestCount} petitions</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Hotspot Detailed Drawer / Floating Card */}
      {selectedHotspot && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-amber-500/40 backdrop-blur-md transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {selectedHotspot.primaryCategory}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Priority Score: {selectedHotspot.averagePriorityScore}/100
                </span>
                <span className="text-xs text-slate-400">
                  {selectedHotspot.blockOrWard}, {selectedHotspot.district}, {selectedHotspot.state}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                {selectedHotspot.title}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 max-w-3xl">
                {selectedHotspot.aiPolicyExplanation?.slice(0, 180)}...
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-400">Concentrated Petitions</div>
                <div className="text-lg font-extrabold text-amber-400">
                  {selectedHotspot.requestCount} <span className="text-xs text-slate-300 font-normal">citizens</span>
                </div>
              </div>

              <button
                id="btn-gemini-briefing"
                onClick={() => onRequestBriefing(selectedHotspot)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Gemini Decision Briefing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
