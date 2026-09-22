import React from 'react';
import { PageView } from '../types';
import { 
  Building2, 
  Send, 
  LayoutDashboard, 
  Info, 
  Sparkles, 
  Menu, 
  X,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  hasGeminiKey: boolean;
  totalRequestsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  hasGeminiKey,
  totalRequestsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { page: PageView; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { page: 'citizen-form', label: 'Submit Request', icon: <Send className="w-4 h-4" /> },
    { page: 'dashboard', label: 'Policymaker Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { page: 'about', label: 'How It Works', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            id="nav-logo-button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 p-0.5 shadow-sm">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-white tracking-wider">जन</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  JanSetu <span className="text-amber-600">AI</span>
                </span>
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200/60">
                  GovTech
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                From Citizen Voice to Development Priorities
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => onNavigate(item.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.page === 'dashboard' && (
                    <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                      {totalRequestsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action & Status */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Gemini 3.8 Flash Powered</span>
            </div>

            <button
              id="header-submit-cta"
              onClick={() => onNavigate('citizen-form')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold shadow-xs transition-all hover:shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Voice a Need</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              id={`mobile-nav-${item.page}`}
              onClick={() => {
                onNavigate(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                currentPage === item.page
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.page === 'dashboard' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {totalRequestsCount} requests
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              id="mobile-voice-cta"
              onClick={() => {
                onNavigate('citizen-form');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-600 text-white font-medium shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Voice a Need (नागरिक अनुरोध दर्ज करें)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
