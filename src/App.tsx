import React, { useState, useEffect } from 'react';
import { PageView, CitizenRequest, HotspotCluster } from './types';
import { INITIAL_REQUESTS, DEMO_HOTSPOTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PriorityFormulaModal } from './components/PriorityFormulaModal';
import { ClusterExplanationModal } from './components/ClusterExplanationModal';
import { RequestDetailsModal } from './components/RequestDetailsModal';
import { HomePage } from './views/HomePage';
import { CitizenFormPage } from './views/CitizenFormPage';
import { ConfirmationPage } from './views/ConfirmationPage';
import { PolicymakerDashboard } from './views/PolicymakerDashboard';
import { AboutPage } from './views/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [requests, setRequests] = useState<CitizenRequest[]>(INITIAL_REQUESTS);
  const [hotspots, setHotspots] = useState<HotspotCluster[]>(DEMO_HOTSPOTS);
  const [lastSubmittedRequest, setLastSubmittedRequest] = useState<CitizenRequest | null>(null);
  
  // Modals state
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<CitizenRequest | null>(null);
  const [briefingHotspot, setBriefingHotspot] = useState<HotspotCluster | null>(null);
  const [formulaModalOpen, setFormulaModalOpen] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(true);

  // Check health on mount and retrieve any persisted server requests
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasGeminiKey === 'boolean') {
          setHasGeminiKey(data.hasGeminiKey);
        }
      })
      .catch((err) => console.warn('Health check note:', err));

    fetch('/api/requests')
      .then((res) => res.json())
      .then((data) => {
        if (data.requests && Array.isArray(data.requests) && data.requests.length > 0) {
          // Prepend any server requests to the initial demo list
          setRequests((prev) => {
            const existingIds = new Set(prev.map((r) => r.id));
            const newOnes = data.requests.filter((r: CitizenRequest) => !existingIds.has(r.id));
            return [...newOnes, ...prev];
          });
        }
      })
      .catch((err) => console.warn('Requests fetch note:', err));
  }, []);

  // Handle successful citizen request submission
  const handleCitizenSubmitSuccess = (newRequest: CitizenRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
    setLastSubmittedRequest(newRequest);
    setCurrentPage('confirmation');

    // Dynamically update cluster count if it matches an existing hotspot (e.g. Rohaniya)
    setHotspots((prevHotspots) => {
      return prevHotspots.map((h) => {
        if (
          h.district.toLowerCase() === newRequest.location.district.toLowerCase() ||
          h.blockOrWard.toLowerCase() === newRequest.location.blockOrWard.toLowerCase()
        ) {
          return {
            ...h,
            requestCount: h.requestCount + 1,
            totalPopulationAffected: h.totalPopulationAffected + 500,
          };
        }
        return h;
      });
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (requestId: string, newStatus: CitizenRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
    if (selectedRequestDetails?.id === requestId) {
      setSelectedRequestDetails((prev) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        hasGeminiKey={hasGeminiKey}
        totalRequestsCount={requests.length}
      />

      {/* Main Content View Switcher */}
      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            totalRequestsCount={requests.length}
          />
        )}

        {currentPage === 'citizen-form' && (
          <CitizenFormPage onSubmitSuccess={handleCitizenSubmitSuccess} />
        )}

        {currentPage === 'confirmation' && lastSubmittedRequest && (
          <ConfirmationPage
            request={lastSubmittedRequest}
            onNavigate={handleNavigate}
            onViewDetails={(req) => setSelectedRequestDetails(req)}
          />
        )}

        {currentPage === 'dashboard' && (
          <PolicymakerDashboard
            requests={requests}
            hotspots={hotspots}
            onViewRequestDetails={(req) => setSelectedRequestDetails(req)}
            onRequestClusterBriefing={(hotspot) => setBriefingHotspot(hotspot)}
            onOpenFormulaModal={() => setFormulaModalOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenFormulaModal={() => setFormulaModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <RequestDetailsModal
        request={selectedRequestDetails}
        isOpen={Boolean(selectedRequestDetails)}
        onClose={() => setSelectedRequestDetails(null)}
        onStatusChange={handleStatusChange}
      />

      <ClusterExplanationModal
        hotspot={briefingHotspot}
        isOpen={Boolean(briefingHotspot)}
        onClose={() => setBriefingHotspot(null)}
      />

      <PriorityFormulaModal
        isOpen={formulaModalOpen}
        onClose={() => setFormulaModalOpen(false)}
      />

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
