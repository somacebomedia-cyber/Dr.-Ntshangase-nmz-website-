import React, { useState } from 'react';
import { UserRole } from '../types';
import { MedicalCrossIcon } from './CircleMotifs';
import { Moon, Sun, Menu, X, Shield, User, Stethoscope, Camera } from 'lucide-react';

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

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'hours', label: 'Hours & Walk-ins' },
    { id: 'portal', label: 'Patient Portal' },
    { id: 'dashboard', label: 'Dr Dashboard' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#072422]/90 backdrop-blur-md border-b border-teal-900/10 dark:border-teal-500/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Zone 1: Single Brand Wordmark with Doctor Medical Cross */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0 group"
          >
            <MedicalCrossIcon size="md" className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                DR M.N. NTSHANGASE
              </span>
              <span className="text-[11px] font-medium tracking-wide text-teal-800 dark:text-teal-300/90 uppercase whitespace-nowrap">
                General Practitioner Surgery
              </span>
            </div>
          </div>

          {/* Zone 2: 4-5 Concise Single-Line Text Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-teal-700 dark:hover:text-teal-300 ${
                    isActive
                      ? 'text-teal-800 dark:text-teal-300 font-semibold'
                      : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Role Switcher, Dark Mode, Booking CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* View Signage Reference Photos Modal trigger */}
            <button
              onClick={onOpenPhotos}
              title="View physical surgery signage photos"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/40 transition-colors"
              aria-label="View reference photos"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Dedicated Light / Dark Mode Toggle */}
            <div className="flex items-center bg-teal-950/5 dark:bg-teal-400/10 p-0.5 rounded-lg border border-teal-900/15 dark:border-teal-400/20">
              <button
                type="button"
                onClick={() => isDark && onDarkToggle()}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  !isDark
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Light Mode (White background)"
              >
                <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => !isDark && onDarkToggle()}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isDark
                    ? 'bg-[#0a5450] text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Dark Mode (Dark green background)"
              >
                <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-teal-200 fill-teal-200/20' : 'text-slate-400'}`} />
                <span>Dark</span>
              </button>
            </div>

            {/* Interactive Role Switcher */}
            <div className="flex items-center bg-teal-950/5 dark:bg-teal-400/10 p-1 rounded-lg border border-teal-900/10 dark:border-teal-400/20">
              <button
                onClick={() => onRoleToggle('patient')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentRole === 'patient'
                    ? 'bg-white dark:bg-teal-800 text-teal-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Patient</span>
              </button>
              <button
                onClick={() => onRoleToggle('provider')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentRole === 'provider'
                    ? 'bg-[#0a5450] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Dr & Staff</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0a5450] hover:bg-[#073b38] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 hover:shadow-teal-900/20 cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onDarkToggle}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-md"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-md"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-teal-900/10 dark:border-teal-500/20 bg-white dark:bg-[#072422] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === link.id
                    ? 'bg-teal-50 dark:bg-teal-900/40 text-teal-900 dark:text-teal-200 font-bold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-teal-900/50 flex flex-col gap-3">
            {/* Mobile Theme Mode Switcher */}
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Theme Appearance:</span>
              <div className="flex bg-slate-100 dark:bg-teal-950 p-1 rounded-md">
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
                  <span>Light (White)</span>
                </button>
                <button
                  type="button"
                  onClick={() => !isDark && onDarkToggle()}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                    isDark
                      ? 'bg-[#0a5450] text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-teal-300" />
                  <span>Dark (Green)</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Current Portal Role:</span>
              <div className="flex bg-slate-100 dark:bg-teal-950 p-1 rounded-md">
                <button
                  onClick={() => onRoleToggle('patient')}
                  className={`px-3 py-1 rounded text-xs ${
                    currentRole === 'patient'
                      ? 'bg-teal-700 text-white font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Patient
                </button>
                <button
                  onClick={() => onRoleToggle('provider')}
                  className={`px-3 py-1 rounded text-xs ${
                    currentRole === 'provider'
                      ? 'bg-[#0a5450] text-white font-medium'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Dr & Staff
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onOpenPhotos();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-teal-800 rounded-lg"
            >
              <Camera className="w-4 h-4" />
              <span>View Surgery Signage Photos</span>
            </button>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#0a5450] rounded-lg shadow-sm"
            >
              Book Online Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
