import React, { useState } from 'react';
import { UserRole } from '../types';
import { MedicalCrossIcon } from './CircleMotifs';
import { Moon, Sun, Menu, X, User, Stethoscope, Camera, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentRole: UserRole;
  onRoleToggle: (newRole: UserRole) => void;
  isDark: boolean;
  onDarkToggle: () => void;
  onOpenBooking: () => void;
  onOpenPhotos: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleToggle,
  isDark,
  onDarkToggle,
  onOpenBooking,
  onOpenPhotos,
  currentView,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { id: 'home', label: t.nav.overview },
    { id: 'services', label: t.nav.services },
    { id: 'hours', label: t.nav.hours },
    { id: 'portal', label: t.nav.portal },
    { id: 'dashboard', label: t.nav.dashboard },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#072623]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-teal-500/15 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 lg:gap-6">
          {/* Zone 1: Single Brand Wordmark with Doctor Medical Cross */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none min-w-0 flex-1 sm:flex-initial group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                DR M.N. NTSHANGASE
              </span>
              <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-wider text-teal-700 dark:text-teal-400 uppercase truncate max-w-[170px] sm:max-w-none">
                {language === 'zu'
                  ? 'Ukuhlinzwa Kwezokwelapha · Umzimkhulu'
                  : 'General Practitioner Surgery · Umzimkhulu'}
              </span>
            </div>
          </div>

          {/* Zone 2: Concise Single-Line Text Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-teal-600 dark:hover:text-teal-300 cursor-pointer ${
                    isActive
                      ? 'text-teal-700 dark:text-teal-300 font-bold'
                      : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Language Toggle, Theme Toggle, Role Switcher, Booking CTA */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Bilingual Language Switcher (EN | ZU) */}
            <div className="flex items-center bg-slate-100 dark:bg-teal-950/60 p-0.5 rounded-xl border border-slate-200 dark:border-teal-700/40">
              <button
                type="button"
                onClick={() => language !== 'en' && setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-teal-800 text-teal-800 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => language !== 'zu' && setLanguage('zu')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  language === 'zu'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Shintshela esiZulwini"
              >
                isiZulu
              </button>
            </div>

            {/* View Signage Reference Photos Modal trigger */}
            <button
              onClick={onOpenPhotos}
              title={t.nav.referencePhotos}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 rounded-xl hover:bg-slate-100 dark:hover:bg-teal-900/40 transition-colors cursor-pointer"
              aria-label="View reference photos"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Light / Dark Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-teal-950/60 p-0.5 rounded-xl border border-slate-200 dark:border-teal-700/40">
              <button
                type="button"
                onClick={() => isDark && onDarkToggle()}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  !isDark
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t.nav.lightMode}
              >
                <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
                <span className="hidden xl:inline">{t.nav.lightMode}</span>
              </button>
              <button
                type="button"
                onClick={() => !isDark && onDarkToggle()}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isDark
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={t.nav.darkMode}
              >
                <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-teal-200 fill-teal-200/20' : 'text-slate-400'}`} />
                <span className="hidden xl:inline">{t.nav.darkMode}</span>
              </button>
            </div>

            {/* Interactive Role Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-teal-950/60 p-0.5 rounded-xl border border-slate-200 dark:border-teal-700/40">
              <button
                onClick={() => onRoleToggle('patient')}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentRole === 'patient'
                    ? 'bg-white dark:bg-teal-800 text-teal-800 dark:text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.nav.patientRole}</span>
              </button>
              <button
                onClick={() => onRoleToggle('provider')}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  currentRole === 'provider'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{t.nav.providerRole}</span>
              </button>
            </div>

            {/* Primary Action Button Matching Reference Template */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookAppointment}</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Lang Button */}
          <div className="flex items-center gap-1 sm:gap-2 sm:hidden shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs font-bold rounded-lg bg-teal-50 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-200 dark:border-teal-700 shrink-0 cursor-pointer"
              title="Shintsha Ulimi / Switch Language"
            >
              {language === 'en' ? 'ZU' : 'EN'}
            </button>
            <button
              onClick={onDarkToggle}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 rounded-lg shrink-0 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-700 dark:text-slate-200 rounded-lg shrink-0 cursor-pointer"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 dark:border-teal-500/20 bg-white dark:bg-[#072422] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                  currentView === link.id
                    ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 font-bold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-teal-900/50 flex flex-col gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>{language === 'zu' ? 'Ulimi Lokusebenza:' : 'Select Language:'}</span>
              </span>
              <div className="flex bg-slate-100 dark:bg-teal-950 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    language === 'en'
                      ? 'bg-white dark:bg-teal-800 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('zu')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    language === 'zu'
                      ? 'bg-teal-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  isiZulu
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>{t.nav.lightMode} / {t.nav.darkMode}:</span>
              <div className="flex bg-slate-100 dark:bg-teal-950 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => isDark && onDarkToggle()}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                    !isDark
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.nav.lightMode}</span>
                </button>
                <button
                  type="button"
                  onClick={() => !isDark && onDarkToggle()}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                    isDark
                      ? 'bg-teal-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-teal-300" />
                  <span>{t.nav.darkMode}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>{t.nav.portal}:</span>
              <div className="flex bg-slate-100 dark:bg-teal-950 p-1 rounded-lg">
                <button
                  onClick={() => onRoleToggle('patient')}
                  className={`px-3 py-1 rounded text-xs ${
                    currentRole === 'patient'
                      ? 'bg-teal-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {t.nav.patientRole}
                </button>
                <button
                  onClick={() => onRoleToggle('provider')}
                  className={`px-3 py-1 rounded text-xs ${
                    currentRole === 'provider'
                      ? 'bg-teal-600 text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {t.nav.providerRole}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenPhotos();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-teal-800 rounded-xl"
            >
              <Camera className="w-4 h-4 text-teal-600" />
              <span>{t.nav.referencePhotos}</span>
            </button>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-bold text-white bg-teal-600 rounded-xl shadow-sm"
            >
              {t.nav.bookAppointment}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
