import React, { useState, useRef, useEffect } from 'react';
import { Language, CitizenRequest } from '../types';
import { SAMPLE_INPUTS } from '../data/mockData';
import { 
  Send, 
  Mic, 
  MicOff, 
  MapPin, 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Languages,
  LocateFixed,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface CitizenFormPageProps {
  onSubmitSuccess: (request: CitizenRequest) => void;
}

export const CitizenFormPage: React.FC<CitizenFormPageProps> = ({ onSubmitSuccess }) => {
  const [language, setLanguage] = useState<Language>('hi');
  const [text, setText] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [district, setDistrict] = useState('Varanasi');
  const [blockOrWard, setBlockOrWard] = useState('Rohaniya Block');
  const [villageOrLocality, setVillageOrLocality] = useState('Karsara Village');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Submitting state
  const [submitting, setSubmitting] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize SpeechRecognition if available in browser
  useEffect(() => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceFeedback(language === 'hi' ? 'बोलना शुरू करें...' : 'Listening, speak now...');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript) {
          setText((prev) => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${currentTranscript.trim()}` : currentTranscript.trim();
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsRecording(false);
        setVoiceFeedback('');
      };

      recognition.onend = () => {
        setIsRecording(false);
        setVoiceFeedback('');
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition setup failed:', e);
      setVoiceSupported(false);
    }
  }, [language]);

  const toggleVoiceRecording = () => {
    if (!voiceSupported || !recognitionRef.current) {
      alert('Voice recording via Web Speech is not supported in this browser window. Please type your request.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setVoiceFeedback('');
    } else {
      try {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo must be smaller than 5MB');
      return;
    }

    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setVillageOrLocality(`GPS Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`);
        alert('Location coordinates captured from your device sensor!');
      },
      (err) => {
        console.warn(err);
        alert('Could not retrieve GPS location. Please type your locality or district manually.');
      }
    );
  };

  const applySampleInput = (sample: typeof SAMPLE_INPUTS[0]) => {
    setLanguage(sample.lang);
    setText(sample.text);
    setState(sample.state);
    setDistrict(sample.district);
    setBlockOrWard(sample.ward);
    setVillageOrLocality(sample.locality);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setErrorMsg('Please describe your community request or problem.');
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);
    setAnalysisStep('Initiating Google Gemini 3.8 Flash Analysis...');

    try {
      setTimeout(() => setAnalysisStep('Analyzing multilingual text & translating...'), 400);
      setTimeout(() => setAnalysisStep('Extracting category, urgency, and affected service...'), 900);
      setTimeout(() => setAnalysisStep('Computing transparent priority score (density & population)...'), 1400);

      const res = await fetch('/api/analyze-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          language,
          citizenName,
          photoUrl,
          location: {
            state,
            district,
            blockOrWard,
            villageOrLocality,
            rawAddress: `${villageOrLocality}, ${blockOrWard}, ${district}, ${state}`,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze request');
      }

      onSubmitSuccess(data.request);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong while communicating with Gemini.');
    } finally {
      setSubmitting(false);
      setAnalysisStep('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8">
      {/* Title & Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Languages className="w-3.5 h-3.5 text-amber-700" />
          <span>Citizen Request Portal • नागरिक पोर्टल</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          What does your community need?
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          आपके क्षेत्र में किस विकास कार्य (सड़क, पानी, अस्पताल, बिजली, स्कूल) की सबसे ज़्यादा ज़रूरत है?
          लिखें या बोलें, जनसेतु AI इसे अधिकारियों तक पहुंचाएगा।
        </p>
      </div>

      {/* Quick Test Presets (Beginner Friendly) */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-700" />
          <span>Quick Test Presets (Click to autofill with one tap)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAMPLE_INPUTS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applySampleInput(s)}
              className="text-left p-2.5 rounded-xl bg-white border border-amber-200/70 hover:border-amber-400 hover:shadow-xs text-xs transition-all group"
            >
              <div className="font-semibold text-slate-900 group-hover:text-amber-700 flex items-center justify-between">
                <span>{s.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800">
                  {s.lang === 'hi' ? 'Hindi' : 'English'}
                </span>
              </div>
              <p className="text-slate-500 line-clamp-1 mt-0.5">{s.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Input Language / भाषा चुनें
            </label>
            <span className="text-xs text-slate-500">Gemini 3.8 Flash automatically parses Hindi and English</span>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium">
            <button
              type="button"
              id="lang-hi-btn"
              onClick={() => setLanguage('hi')}
              className={`px-4 py-2 rounded-lg transition-all ${
                language === 'hi'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              type="button"
              id="lang-en-btn"
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Text and Voice Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="citizen-text-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {language === 'hi' ? 'अपनी समस्या या विकास अनुरोध लिखें' : 'Write your request or complaint'} *
            </label>
            
            {/* Voice Input Button */}
            <button
              type="button"
              id="voice-input-btn"
              onClick={toggleVoiceRecording}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-600" />}
              <span>{isRecording ? 'Stop Recording' : 'Voice Input (बोलकर लिखें)'}</span>
            </button>
          </div>

          {voiceFeedback && (
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>{voiceFeedback}</span>
            </div>
          )}

          <textarea
            id="citizen-text-input"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'उदा: हमारे गांव से अस्पताल जाने वाली सड़क बहुत खराब है और बारिश में एम्बुलेंस नहीं पहुंच पाती...'
                : 'E.g., Drinking water pipeline in our ward has ruptured and sewage is mixing into taps...'
            }
            className="w-full p-4 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-900 placeholder:text-slate-400 font-sans leading-relaxed"
          />
        </div>

        {/* Location Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Location Details (स्थान का विवरण)
            </label>

            <button
              type="button"
              onClick={handleDetectLocation}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span>Detect My Location</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">State (राज्य)</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Uttar Pradesh"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">District (ज़िला)</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Varanasi"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Block / Ward (ब्लॉक / वार्ड)</label>
              <input
                type="text"
                value={blockOrWard}
                onChange={(e) => setBlockOrWard(e.target.value)}
                placeholder="e.g. Rohaniya Block"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Village / Locality (गांव / मोहल्ला)</label>
              <input
                type="text"
                value={villageOrLocality}
                onChange={(e) => setVillageOrLocality(e.target.value)}
                placeholder="e.g. Karsara Village"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Optional Photo & Citizen Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Photo upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              Optional Photo (तस्वीर संलग्न करें)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />

            {!photoUrl ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-200 hover:border-amber-400 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-amber-700 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="text-xs font-medium">Upload photo of road, pipeline, or site</span>
                <span className="text-[10px] text-slate-400">PNG, JPG up to 5MB</span>
              </button>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
                <img src={photoUrl} alt="Upload preview" className="w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoUrl(null);
                    setPhotoName(null);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/60 p-1 text-[10px] text-white truncate px-2">
                  {photoName}
                </div>
              </div>
            )}
          </div>

          {/* Citizen Name (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Your Name / Contact (Optional)
            </label>
            <p className="text-[11px] text-slate-400">
              Citizens can remain anonymous or provide their name for grievance progress tracking.
            </p>
            <input
              type="text"
              value={citizenName}
              onChange={(e) => setCitizenName(e.target.value)}
              placeholder="e.g. Rameshwar Yadav (Leave blank for Anonymous)"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:border-amber-500 text-slate-900"
            />
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Gemini AI automatically categorizes and calculates community priority index</span>
          </div>

          <button
            type="submit"
            id="citizen-submit-btn"
            disabled={submitting}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              submitting ? 'opacity-80 cursor-wait' : 'hover:scale-[1.02]'
            }`}
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{analysisStep || 'Analyzing Request...'}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Request (अनुरोध दर्ज करें)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
