export type Language = 'hi' | 'en';

export type UrgencyLevel = 'High' | 'Medium' | 'Low';

export type Category = 
  | 'Healthcare & Emergency'
  | 'Roads & Transportation'
  | 'Water & Sanitation'
  | 'Electricity & Power'
  | 'Education & Schools'
  | 'Waste & Environment'
  | 'Public Safety & Lighting';

export interface PriorityScoreBreakdown {
  requestDensity: number; // 35% weight
  populationAffected: number; // 25% weight
  infrastructureGap: number; // 20% weight
  urgency: number; // 15% weight
  recency: number; // 5% weight
  totalScore: number; // 0-100 calculated
}

export interface CitizenRequest {
  id: string;
  citizenName?: string;
  originalText: string;
  inputLanguage: Language;
  detectedLanguage?: string;
  photoUrl?: string;
  audioRecorded?: boolean;
  submittedAt: string; // ISO string
  
  // Location
  location: {
    state: string;
    district: string;
    blockOrWard: string;
    villageOrLocality: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    rawAddress?: string;
  };

  // Gemini AI Extracted Fields
  aiAnalysis: {
    category: Category;
    subcategory: string;
    problem: string;
    affectedService: string;
    urgency: UrgencyLevel;
    shortSummary: string;
    englishTranslation?: string;
    keywords: string[];
    infrastructureGapLevel: 'Critical' | 'Moderate' | 'Low';
    estimatedPopulationAffected: number;
    similarityGroupId?: string;
  };

  // Priority Scoring (Prototype Transparent Formula)
  priority: PriorityScoreBreakdown;

  // Status for policymaker review
  status: 'Submitted' | 'AI Triaged' | 'Priority Clustered' | 'Under Review' | 'Action Planned';
  isDemoData?: boolean;
}

export interface HotspotCluster {
  id: string;
  title: string;
  state: string;
  district: string;
  blockOrWard: string;
  coordinates: { lat: number; lng: number };
  requestCount: number;
  primaryCategory: Category;
  averagePriorityScore: number;
  totalPopulationAffected: number;
  urgencyDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  keyIssues: string[];
  aiPolicyExplanation?: string;
}

export type PageView = 
  | 'home' 
  | 'citizen-form' 
  | 'confirmation' 
  | 'dashboard' 
  | 'request-details' 
  | 'about';
