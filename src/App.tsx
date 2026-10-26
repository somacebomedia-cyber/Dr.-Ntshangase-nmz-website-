import React, { useState, useEffect } from 'react';
import { UserRole, ClinicalService } from './types';
import { initializeStorage } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickBookingStrip } from './components/QuickBookingStrip';
import { ServicesSection } from './components/ServicesSection';
import { UrgentCareBanner } from './components/UrgentCareBanner';
import { BillingInsuranceSection } from './components/BillingInsuranceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ClinicalTeamSection } from './components/ClinicalTeamSection';
import { ConsultingHoursCard } from './components/ConsultingHoursCard';
import { BookingWizard } from './components/BookingWizard';
import { PatientPortal } from './components/PatientPortal';
import { ProviderDashboard } from './components/ProviderDashboard';
import { ReferencePhotosModal } from './components/ReferencePhotosModal';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';
import { CircleMotif } from './components/CircleMotifs';
import { Camera, ArrowRight } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('patient');
  const [currentView, setCurrentView] = useState<string>('home');
  const { t, language } = useLanguage();

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
      className="min-h-screen flex flex-col transition-colors duration-200 w-full max-w-full overflow-x-hidden"
      style={{
        backgroundColor: isDark ? '#061c1a' : '#ffffff',
        color: isDark ? '#f8fafc' : '#0f172a',
      }}
    >
      {/* Connectivity monitor */}
      <OfflineBanner />

      {/* Top Navbar with English / Zulu Language Toggle */}
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
          <div className="pt-2">
            <ServicesSection onSelectService={(s) => handleOpenBooking(s)} />
            <BillingInsuranceSection onOpenBooking={() => handleOpenBooking()} />
          </div>
        ) : currentView === 'hours' ? (
          <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <CircleMotif variant="ambient-orbs" />
            <div className="max-w-2xl mx-auto text-center mb-10 relative z-10">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
                {t.scheduleSection.kicker}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                {t.scheduleSection.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                {t.scheduleSection.body}
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <ConsultingHoursCard onBookClick={() => handleOpenBooking()} />
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setIsPhotosOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>
                  {language === 'zu'
                    ? 'Igalari Yezithombe →'
                    : 'Gallery →'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Public Homepage Overview - Matching Reference Image Structure */
          <>
            {/* 1. Hero Section: Headline "Exceptional Care, Every Time" + Arched Doctor Portal & Badges */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenPhotos={() => setIsPhotosOpen(true)}
              onViewServices={() => handleNavigate('services')}
            />

            {/* 2. Row 2 in Reference: "Easily Book Your Doctor" Quick Action Cards */}
            <QuickBookingStrip
              onSelectService={(s) => handleOpenBooking(s)}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 3. Row 3 in Reference: "Facilities and Services" Interactive 2-Column Showcase */}
            <ServicesSection onSelectService={(s) => handleOpenBooking(s)} />

            {/* 4. Row 4 in Reference: 24/7 Consultation & Walk-in Triage Full-Width Banner */}
            <UrgentCareBanner
              onOpenBooking={() => handleOpenBooking()}
              onNavigateHours={() => handleNavigate('hours')}
            />

            {/* 5. Row 5 in Reference: Health Insurance & Billing Information */}
            <BillingInsuranceSection onOpenBooking={() => handleOpenBooking()} />

            {/* 6. Row 6 in Reference: Patient's Testimonials */}
            <TestimonialsSection />

            {/* 7. Row 7 in Reference: Meet Our Team */}
            <ClinicalTeamSection
              onOpenBooking={() => handleOpenBooking()}
              onOpenPhotos={() => setIsPhotosOpen(true)}
            />

            {/* Practice Operating Schedule & Walk-in Access */}
            <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-white via-teal-50/40 to-white dark:from-[#061c1a] dark:via-teal-950/20 dark:to-[#061c1a] border-t border-slate-200/80 dark:border-teal-900/40">
              {/* Background Random Floating Circles */}
              <CircleMotif variant="ambient-orbs" />
              <CircleMotif variant="scatter-right" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
                      {t.scheduleSection.kicker}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                      {t.scheduleSection.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.scheduleSection.body}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                      <button
                        onClick={() => setIsPhotosOpen(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 hover:bg-teal-200 dark:hover:bg-teal-800/60 rounded-xl transition-colors cursor-pointer text-center"
                      >
                        <Camera className="w-4 h-4 shrink-0" />
                        <span>{t.scheduleSection.viewSignagePhotos}</span>
                      </button>

                      <button
                        onClick={() => handleOpenBooking()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors cursor-pointer text-center"
                      >
                        <span>{t.scheduleSection.scheduleAppointment}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex justify-center">
                    <ConsultingHoursCard onBookClick={() => handleOpenBooking()} />
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Practice FAQs */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 dark:border-teal-900/40">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
                  {t.faqs.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.faqs.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {t.faqs.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-2xl bg-[#f8fbfb] dark:bg-[#072d2a] border border-slate-200/80 dark:border-teal-900/40 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {t.faqs.q1}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.faqs.a1}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f8fbfb] dark:bg-[#072d2a] border border-slate-200/80 dark:border-teal-900/40 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {t.faqs.q2}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.faqs.a2}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f8fbfb] dark:bg-[#072d2a] border border-slate-200/80 dark:border-teal-900/40 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {t.faqs.q3}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.faqs.a3}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f8fbfb] dark:bg-[#072d2a] border border-slate-200/80 dark:border-teal-900/40 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    {t.faqs.q4}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.faqs.a4}
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
