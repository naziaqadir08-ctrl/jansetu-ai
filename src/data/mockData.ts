import { CitizenRequest, HotspotCluster, PriorityScoreBreakdown } from '../types';

export function calculatePriorityScore(
  densityScore: number, // 0 - 100
  populationScore: number, // 0 - 100
  gapScore: number, // 0 - 100
  urgencyScore: number, // 0 - 100
  recencyScore: number // 0 - 100
): PriorityScoreBreakdown {
  // Prototype formula as specified:
  // Density: 35%
  // Population: 25%
  // Gap: 20%
  // Urgency: 15%
  // Recency: 5%
  const total = Math.round(
    densityScore * 0.35 +
    populationScore * 0.25 +
    gapScore * 0.20 +
    urgencyScore * 0.15 +
    recencyScore * 0.05
  );

  return {
    requestDensity: Math.round(densityScore),
    populationAffected: Math.round(populationScore),
    infrastructureGap: Math.round(gapScore),
    urgency: Math.round(urgencyScore),
    recency: Math.round(recencyScore),
    totalScore: Math.min(100, Math.max(0, total)),
  };
}

export const INITIAL_REQUESTS: CitizenRequest[] = [
  {
    id: 'REQ-2026-0891',
    citizenName: 'Rameshwar Yadav',
    originalText: 'हमारे गांव से अस्पताल जाने वाली सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं पहुंच पाती। पिछले हफ्ते एक गर्भवती महिला को खटोली पर ले जाना पड़ा।',
    inputLanguage: 'hi',
    detectedLanguage: 'Hindi',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    audioRecorded: true,
    submittedAt: '2026-09-21T08:30:00Z',
    location: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      blockOrWard: 'Rohaniya Block',
      villageOrLocality: 'Karsara Village, Near Primary Health Sub-Centre',
      coordinates: { lat: 25.2677, lng: 82.8984 },
      rawAddress: 'Karsara Gram, Rohaniya, Varanasi, UP 221311',
    },
    aiAnalysis: {
      category: 'Healthcare & Emergency',
      subcategory: 'Emergency Access & Road Connectivity',
      problem: 'Severely degraded rural road preventing ambulance and emergency medical transit during rains',
      affectedService: 'Emergency healthcare & maternal care accessibility',
      urgency: 'High',
      shortSummary: 'Poor road connectivity is critically obstructing emergency medical vehicles and patient transit to the nearest hospital.',
      englishTranslation: 'The road from our village to the hospital is in very poor condition, and during rains, ambulances cannot reach. Last week, a pregnant woman had to be carried on a cot.',
      keywords: ['hospital road', 'ambulance access', 'rural health', 'monsoon washout', 'emergency healthcare'],
      infrastructureGapLevel: 'Critical',
      estimatedPopulationAffected: 14500,
      similarityGroupId: 'VARANASI-ROHANIYA-ROAD',
    },
    priority: calculatePriorityScore(88, 85, 92, 95, 90),
    status: 'Priority Clustered',
    isDemoData: true,
  },
  {
    id: 'REQ-2026-0890',
    citizenName: 'Sunita Devi',
    originalText: 'रोहनिया के करसरा और माधोपुर संपर्क मार्ग पर 2 फीट पानी भर जाता है। अस्पताल तक जाने का कोई दूसरा रास्ता नहीं है। तुरंत पक्की सड़क चाहिए।',
    inputLanguage: 'hi',
    detectedLanguage: 'Hindi',
    submittedAt: '2026-09-20T14:15:00Z',
    location: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      blockOrWard: 'Rohaniya Block',
      villageOrLocality: 'Madhopur Contact Road',
      coordinates: { lat: 25.2690, lng: 82.9010 },
      rawAddress: 'Madhopur, Rohaniya, Varanasi, UP',
    },
    aiAnalysis: {
      category: 'Roads & Transportation',
      subcategory: 'Rural Feeder Road & Drainage',
      problem: 'Severe waterlogging (up to 2ft) on sole link road connecting to healthcare facilities',
      affectedService: 'Public transit & hospital corridor access',
      urgency: 'High',
      shortSummary: 'Feeder road submerged under water during downpours, isolating residents from medical centres.',
      englishTranslation: 'Water accumulates up to 2 feet on the contact road between Karsara and Madhopur in Rohaniya. There is no other route to reach the hospital. Concrete road is urgently needed.',
      keywords: ['waterlogging', 'feeder road', 'hospital access', 'culvert drainage', 'paved road'],
      infrastructureGapLevel: 'Critical',
      estimatedPopulationAffected: 11000,
      similarityGroupId: 'VARANASI-ROHANIYA-ROAD',
    },
    priority: calculatePriorityScore(85, 80, 88, 90, 85),
    status: 'Priority Clustered',
    isDemoData: true,
  },
  {
    id: 'REQ-2026-0885',
    citizenName: 'Amit Kumar Sinha',
    originalText: 'Drinking water pipeline in Danapur Ward 12 has been broken for 18 days. Dirty sewage water is mixing with the tap supply, causing severe diarrhea among school children.',
    inputLanguage: 'en',
    detectedLanguage: 'English',
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
    submittedAt: '2026-09-19T10:45:00Z',
    location: {
      state: 'Bihar',
      district: 'Patna',
      blockOrWard: 'Danapur Nagar Parishad Ward 12',
      villageOrLocality: 'Near Balaji Mandir & Govt Middle School',
      coordinates: { lat: 25.6324, lng: 85.0443 },
      rawAddress: 'Ward 12, Danapur Cantt, Patna, Bihar 801503',
    },
    aiAnalysis: {
      category: 'Water & Sanitation',
      subcategory: 'Potable Pipeline Contamination',
      problem: 'Cross-contamination of drinking water line with municipal drain posing acute public health hazard',
      affectedService: 'Municipal drinking water & pediatric public health',
      urgency: 'High',
      shortSummary: 'Broken water pipeline contaminated with sewage is causing waterborne illness outbreak among school students.',
      keywords: ['drinking water', 'pipeline contamination', 'sewage leak', 'diarrhea outbreak', 'school health'],
      infrastructureGapLevel: 'Critical',
      estimatedPopulationAffected: 18500,
      similarityGroupId: 'PATNA-DANAPUR-WATER',
    },
    priority: calculatePriorityScore(92, 90, 95, 95, 80),
    status: 'Under Review',
    isDemoData: true,
  },
  {
    id: 'REQ-2026-0882',
    citizenName: 'Priya Sharma',
    originalText: 'No streetlights from Sanganer bus stand to Girls Senior Secondary School for 1.5 km. Girl students and women returning from coaching after 6 PM feel unsafe due to complete darkness.',
    inputLanguage: 'en',
    detectedLanguage: 'English',
    submittedAt: '2026-09-18T16:20:00Z',
    location: {
      state: 'Rajasthan',
      district: 'Jaipur',
      blockOrWard: 'Sanganer Ward 8',
      villageOrLocality: 'Mahila Vidyalaya Road',
      coordinates: { lat: 26.8140, lng: 75.7725 },
      rawAddress: 'Sanganer Zone, Jaipur Municipal Corporation, Rajasthan',
    },
    aiAnalysis: {
      category: 'Public Safety & Lighting',
      subcategory: 'Pedestrian Corridors & Women Safety',
      problem: '1.5 km dark corridor lacking functional street illumination along school commuting stretch',
      affectedService: 'Public safety & female education mobility',
      urgency: 'High',
      shortSummary: 'Absence of street lighting along school access road poses serious safety concerns for female students and commuters.',
      keywords: ['streetlights', 'women safety', 'girls school', 'pedestrian safety', 'solar lights'],
      infrastructureGapLevel: 'Moderate',
      estimatedPopulationAffected: 9500,
      similarityGroupId: 'JAIPUR-SANGANER-LIGHTS',
    },
    priority: calculatePriorityScore(78, 75, 70, 85, 75),
    status: 'AI Triaged',
    isDemoData: true,
  },
  {
    id: 'REQ-2026-0879',
    citizenName: 'Mohd. Irfan Ansari',
    originalText: 'कांके ब्लॉक के 4 प्राथमिक विद्यालयों में पिछले 6 महीने से बिजली का ट्रांसफार्मर जला पड़ा है। पंखे और कंप्यूटर लैब नहीं चल रहे, बच्चे भीषण गर्मी में पढ़ाई करने को मजबूर हैं।',
    inputLanguage: 'hi',
    detectedLanguage: 'Hindi',
    submittedAt: '2026-09-17T11:10:00Z',
    location: {
      state: 'Jharkhand',
      district: 'Ranchi',
      blockOrWard: 'Kanke Block',
      villageOrLocality: 'Hessag & Arsande Panchayat',
      coordinates: { lat: 23.4358, lng: 85.3216 },
      rawAddress: 'Kanke, Ranchi, Jharkhand 834006',
    },
    aiAnalysis: {
      category: 'Electricity & Power',
      subcategory: 'Institutional Transformer & School Grid',
      problem: 'Blown distribution transformer unserviced for 6 months disabling power in four primary schools',
      affectedService: 'Public education, ICT lab, and basic classroom ventilation',
      urgency: 'Medium',
      shortSummary: 'Burnt electric transformer has left four village primary schools without fans and digital learning for half a year.',
      englishTranslation: 'In Kanke block, electric transformers in 4 primary schools have been burnt for the past 6 months. Fans and computer labs are not working, and children are forced to study in extreme heat.',
      keywords: ['transformer repair', 'school electrification', 'heatwave relief', 'digital education'],
      infrastructureGapLevel: 'Moderate',
      estimatedPopulationAffected: 6200,
      similarityGroupId: 'RANCHI-KANKE-POWER',
    },
    priority: calculatePriorityScore(72, 65, 80, 75, 68),
    status: 'AI Triaged',
    isDemoData: true,
  },
  {
    id: 'REQ-2026-0870',
    citizenName: 'Deepak Patil',
    originalText: 'Open garbage dump near weekly vegetable market in Nashik Ward 24 is overflowing onto main road. Stray cattle hazard and severe stench affecting over 500 small vendors and residents daily.',
    inputLanguage: 'en',
    detectedLanguage: 'English',
    submittedAt: '2026-09-16T09:00:00Z',
    location: {
      state: 'Maharashtra',
      district: 'Nashik',
      blockOrWard: 'Nashik East Ward 24',
      villageOrLocality: 'Panchavati Mandi Area',
      coordinates: { lat: 20.0063, lng: 73.7903 },
      rawAddress: 'Panchavati, Nashik, Maharashtra 422003',
    },
    aiAnalysis: {
      category: 'Waste & Environment',
      subcategory: 'Marketplace Municipal Waste & Sanitation',
      problem: 'Uncollected open dump obstructing transit and causing sanitation hazard at key vegetable market',
      affectedService: 'Solid waste management & urban market sanitation',
      urgency: 'Medium',
      shortSummary: 'Overflowing municipal garbage at central market area causing pedestrian disruption and hygiene hazards.',
      keywords: ['solid waste', 'market sanitation', 'stray animals', 'health hazard', 'daily garbage pickup'],
      infrastructureGapLevel: 'Moderate',
      estimatedPopulationAffected: 12000,
      similarityGroupId: 'NASHIK-WASTE-24',
    },
    priority: calculatePriorityScore(68, 72, 65, 70, 60),
    status: 'Action Planned',
    isDemoData: true,
  }
];

export const DEMO_HOTSPOTS: HotspotCluster[] = [
  {
    id: 'HOTSPOT-VARANASI',
    title: 'Rohaniya Healthcare Access Corridor',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    blockOrWard: 'Rohaniya Block',
    coordinates: { lat: 25.2680, lng: 82.8995 },
    requestCount: 34,
    primaryCategory: 'Healthcare & Emergency',
    averagePriorityScore: 89,
    totalPopulationAffected: 46000,
    urgencyDistribution: {
      high: 28,
      medium: 5,
      low: 1,
    },
    keyIssues: [
      'Unpaved culvert washing out during monsoons',
      'Ambulance refusal/delay exceeding 45+ minutes to reach district hospital',
      'High incidence of seasonal maternal and pediatric emergency transit failure'
    ],
    aiPolicyExplanation: 'JanSetu AI identifies a systemic bottleneck: 34 citizen petitions over 60 days correlate with a single 3.2 km unpaved feeder road. The road is the sole lifeline connecting 4 gram panchayats to the primary health centre. Prioritizing bituminous resurfacing with two box-culverts will resolve 78% of the citizen emergency complaints in this cluster.',
  },
  {
    id: 'HOTSPOT-PATNA',
    title: 'Danapur Water Safety & Pipeline Cluster',
    state: 'Bihar',
    district: 'Patna',
    blockOrWard: 'Danapur Ward 12',
    coordinates: { lat: 25.6324, lng: 85.0443 },
    requestCount: 42,
    primaryCategory: 'Water & Sanitation',
    averagePriorityScore: 91,
    totalPopulationAffected: 38000,
    urgencyDistribution: {
      high: 36,
      medium: 6,
      low: 0,
    },
    keyIssues: [
      'Contaminated water tap supply in dense residential settlement',
      'High incidence of waterborne gastrointestinal illnesses',
      'Sewage seepage into legacy iron pipelines'
    ],
    aiPolicyExplanation: '42 overlapping requests indicate localized contamination rather than household issues. A shared underground drain breach is impacting the potable water distribution line near the Balaji Mandir quadrant. Rapid pipe replacement under Jal Jeevan Mission would resolve water safety for an estimated 38,000 residents.',
  },
  {
    id: 'HOTSPOT-JAIPUR',
    title: 'Sanganer Educational Corridor Illumination',
    state: 'Rajasthan',
    district: 'Jaipur',
    blockOrWard: 'Sanganer Ward 8',
    coordinates: { lat: 26.8140, lng: 75.7725 },
    requestCount: 22,
    primaryCategory: 'Public Safety & Lighting',
    averagePriorityScore: 78,
    totalPopulationAffected: 16500,
    urgencyDistribution: {
      high: 15,
      medium: 6,
      low: 1,
    },
    keyIssues: [
      'Dark pedestrian link along girl schools and coaching institutes',
      'Heightened safety apprehension after dusk',
      'Non-functional legacy sodium vapor fixtures'
    ],
    aiPolicyExplanation: '22 citizen voices, predominantly students and working women, focus on a 1.5 km corridor. Installing 35 solar LED smart streetlights would directly safeguard daily commuting for approximately 16,500 residents and students with rapid execution time.',
  },
  {
    id: 'HOTSPOT-RANCHI',
    title: 'Kanke Block Educational Electrification',
    state: 'Jharkhand',
    district: 'Ranchi',
    blockOrWard: 'Kanke Block',
    coordinates: { lat: 23.4358, lng: 85.3216 },
    requestCount: 19,
    primaryCategory: 'Electricity & Power',
    averagePriorityScore: 75,
    totalPopulationAffected: 21000,
    urgencyDistribution: {
      high: 10,
      medium: 8,
      low: 1,
    },
    keyIssues: [
      'Extended outage in government primary schools and anganwadi centres',
      'Disruption of midday meal water pumps and digital classrooms',
      'Damaged transformer awaiting replacement'
    ],
    aiPolicyExplanation: '19 coordinated reports across 3 neighboring panchayats identify an unreplaced 63kVA distribution transformer. Resolving this one substation asset restores regular power to 4 schools and 2 health sub-centres serving over 21,000 rural residents.',
  }
];

export const SAMPLE_INPUTS = [
  {
    label: 'Healthcare & Hospital Road (Hindi)',
    lang: 'hi' as const,
    text: 'हमारे गांव से अस्पताल जाने वाली सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं पहुंच पाती।',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    ward: 'Rohaniya Block',
    locality: 'Karsara Village, Near Primary Health Sub-Centre',
  },
  {
    label: 'Drinking Water Contamination (English)',
    lang: 'en' as const,
    text: 'Drinking water pipeline in our ward has been broken and sewage water is leaking into tap supply. Many children have fallen sick with diarrhea.',
    state: 'Bihar',
    district: 'Patna',
    ward: 'Danapur Ward 12',
    locality: 'Near Balaji Mandir',
  },
  {
    label: 'School Power & Fans (Hindi)',
    lang: 'hi' as const,
    text: 'हमारे सरकारी प्राथमिक स्कूल में पिछले 4 महीने से बिजली का ट्रांसफार्मर खराब है। भीषण गर्मी में बच्चे बिना पंखे के बैठते हैं।',
    state: 'Jharkhand',
    district: 'Ranchi',
    ward: 'Kanke Block',
    locality: 'Hessag Panchayat School',
  },
  {
    label: 'Streetlights & Safety (English)',
    lang: 'en' as const,
    text: 'No streetlights on the 1.5 km road from bus stand to girls high school. It is completely dark after 6 PM and unsafe for women and students.',
    state: 'Rajasthan',
    district: 'Jaipur',
    ward: 'Sanganer Ward 8',
    locality: 'Mahila Vidyalaya Road',
  }
];
