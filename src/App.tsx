import React, { useState, useEffect } from 'react';
import { UserRole, ClinicalService, Appointment } from './types';
import { initializeStorage, getSurgeryOpenStatus } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ConsultingHoursCard } from './components/ConsultingHoursCard';
import { BookingWizard } from './components/BookingWizard';
import { PatientPortal } from './components/PatientPortal';
import { ProviderDashboard } from './components/ProviderDashboard';
import { ReferencePhotosModal } from './components/ReferencePhotosModal';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';
import { CircleMotif, MedicalCrossIcon } from './components/CircleMotifs';
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Phone,
  Camera,
  Heart,
  UserCheck,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [currentView, setCurrentView] = useState<string>('home');
  // Default to light mode (white background) so user immediately sees the pure white background with signature green cards
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dr_ntshangase_theme');
      if (saved) return saved === 'dark';
      return false;
    }
    return false;
  });

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<ClinicalService | null>(null);
  const [isPhotosOpen, setIsPhotosOpen] = useState<boolean>(false);

  // Initialize storage once on load
  useEffect(() => {
    initializeStorage();
  }, []);

  // Update theme class and inline background on root HTML & body elements
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (document.body) {
        document.body.classList.add('dark');
        document.body.style.backgroundColor = '#061c1a';
      }
      localStorage.setItem('dr_ntshangase_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      if (document.body) {
        document.body.classList.remove('dark');
        document.body.style.backgroundColor = '#ffffff';
      }
      localStorage.setItem('dr_ntshangase_theme', 'light');
    }
  }, [isDark]);

  const handleDarkToggle = () => {
    setIsDark((prev) => !prev);
  };

  const handleRoleToggle = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'provider') {
      setCurrentView('dashboard');
    } else {
      if (currentView === 'dashboard') {
        setCurrentView('portal');
      }
    }
  };

  const handleOpenBooking = (service?: ClinicalService) => {
    if (service) {
      setPreselectedService(service);
    }
    setIsBookingOpen(true);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: isDark ? '#061c1a' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
      }}
    >
      {/* Connectivity monitor */}
      <OfflineBanner />

      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleToggle={handleRoleToggle}
        isDark={isDark}
        onDarkToggle={handleDarkToggle}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhotos={() => setIsPhotosOpen(true)}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* If in Doctor/Staff Provider Dashboard Mode */}
        {currentView === 'dashboard' ? (
          <ProviderDashboard />
        ) : currentView === 'portal' ? (
          <PatientPortal onOpenBooking={() => handleOpenBooking()} />
        ) : currentView === 'services' ? (
          <div className="pt-6">
            <ServicesSection onSelectService={(s) => handleOpenBooking(s)} />
          </div>
        ) : currentView === 'hours' ? (
          <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                Official Surgery Operating Schedule
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Consulting Hours & Walk-in Access
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                Recreated directly from the physical surgery board in Umzimkhulu.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <ConsultingHoursCard onBookClick={() => handleOpenBooking()} />
            </div>
          </div>
        ) : (
          /* Public Homepage Overview */
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenPhotos={() => setIsPhotosOpen(true)}
              onViewServices={() => handleNavigate('services')}
            />

            {/* Quick Practice Highlights Strip - Green Cards on Page Background */}
            <section className="border-y border-teal-900/10 dark:border-teal-500/15 py-8 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
                  <div className="p-4 rounded-xl glass-panel space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      100%
                    </span>
                    <p className="text-xs font-bold text-teal-100">HIPAA & POPIA Encrypted</p>
                    <p className="text-[11px] text-teal-200/80">Client-Side AES-GCM Privacy</p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-teal-200 font-mono">
                      CMSA
                    </span>
                    <p className="text-xs font-bold text-teal-100">HIV Medicine Diploma</p>
                    <p className="text-[11px] text-teal-200/80">Specialized ART & Care</p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      6 Days
                    </span>
                    <p className="text-xs font-bold text-teal-100">Weekly Consulting</p>
                    <p className="text-[11px] text-teal-200/80">Mon–Fri 08–17h | Sat 08–13h</p>
                  </div>
                  <div className="p-4 rounded-xl glass-panel space-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-teal-200 font-mono">
                      Open
                    </span>
                    <p className="text-xs font-bold text-teal-100">Walk-ins Welcome</p>
                    <p className="text-[11px] text-teal-200/80">Triage for Urgent Care</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Specialized Clinical Services Bento Grid */}
            <ServicesSection onSelectService={(s) => handleOpenBooking(s)} />

            {/* Authentic Circles Design Motif Showcase Section */}
            <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-teal-500/5 to-transparent">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                      Signature Architectural Motif
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      The Circles Motif: Rooted in Physical Identity
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Every element of this platform honors the frosted glass graphics seen on Dr Ntshangase's surgery entrance doors in Umzimkhulu. The floating circles symbolize cellular vitality, holistic health, and continuous compassionate care across life stages.
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setIsPhotosOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a5450] dark:text-teal-300 hover:underline cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Compare With Physical Door Photo &rarr;</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="p-6 sm:p-8 rounded-2xl glass-panel shadow-lg border border-teal-400/30">
                      <CircleMotif variant="full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Practice FAQs and Location Guide */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-teal-900/10 dark:border-teal-500/15">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Patient Questions & Surgery Guidance
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Key information for visiting Dr M.N. Ntshangase in Umzimkhulu.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-2xl glass-panel">
                  <h4 className="font-bold text-white text-base">
                    Can I walk in without an appointment?
                  </h4>
                  <p className="text-xs text-teal-100/90 mt-2.5 leading-relaxed">
                    Yes! As displayed on our surgery entrance plaque, walk-ins are warmly welcomed throughout all consulting hours (08:00–17:00 weekdays, 08:00–13:00 Saturdays). Walk-in patients are triaged at reception upon arrival.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-panel">
                  <h4 className="font-bold text-white text-base">
                    What does the HIV Dip (CMSA) qualification mean?
                  </h4>
                  <p className="text-xs text-teal-100/90 mt-2.5 leading-relaxed">
                    Dr Ntshangase holds the prestigious Diploma in HIV Medicine from the Colleges of Medicine of South Africa (CMSA), certifying specialized clinical competence in antiretroviral therapy (ART), viral load suppression, and holistic immunological management.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-panel">
                  <h4 className="font-bold text-white text-base">
                    How is my medical data protected online?
                  </h4>
                  <p className="text-xs text-teal-100/90 mt-2.5 leading-relaxed">
                    We employ client-side Web Crypto API AES-GCM (256-bit) encryption. All clinical notes and symptoms are encrypted in your local browser before persistence, fulfilling both HIPAA and South Africa POPIA requirements.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-panel">
                  <h4 className="font-bold text-white text-base">
                    What should I bring to my consultation?
                  </h4>
                  <p className="text-xs text-teal-100/90 mt-2.5 leading-relaxed">
                    Please bring your South African ID card or passport, your digital appointment pass (saved on your phone or printed), medical aid card if applicable, and all current medications or chronic treatment cards.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenPhotos={() => setIsPhotosOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Booking Wizard Modal */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedService(null);
        }}
        preselectedService={preselectedService}
      />

      {/* Reference Physical Photos Modal */}
      <ReferencePhotosModal
        isOpen={isPhotosOpen}
        onClose={() => setIsPhotosOpen(false)}
      />
    </div>
  );
}
