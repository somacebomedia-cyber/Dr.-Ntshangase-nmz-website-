import React from 'react';
import { Phone, Clock, ArrowRight } from 'lucide-react';
import { CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';

interface UrgentCareBannerProps {
  onOpenBooking: () => void;
  onNavigateHours: () => void;
}

export const UrgentCareBanner: React.FC<UrgentCareBannerProps> = ({
  onOpenBooking,
  onNavigateHours,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white dark:bg-[#061c1a] relative overflow-hidden">
      {/* Background Random Floating Circles */}
      <CircleMotif variant="ambient-orbs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-700 to-[#0a5450] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-teal-400/30">
          {/* Subtle decorative circles embedded */}
          <div className="absolute -bottom-6 right-1/4 opacity-20 pointer-events-none w-64 max-w-full overflow-hidden">
            <CircleMotif variant="compact" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/25">
                <Clock className="w-3.5 h-3.5 text-teal-200" />
                <span>{t.urgentBanner.walkinBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                {t.urgentBanner.title}
              </h2>

              <p className="text-sm sm:text-base text-teal-50 max-w-2xl leading-relaxed">
                {t.urgentBanner.body}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-teal-900 bg-white hover:bg-teal-50 rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  {t.urgentBanner.priorityBtn}
                </button>

                <button
                  onClick={onNavigateHours}
                  className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-teal-800/60 hover:bg-teal-800 border border-teal-300/40 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>{t.urgentBanner.hoursBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <a
                  href="tel:+27392590184"
                  className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-teal-100 hover:text-white underline underline-offset-4 cursor-pointer pt-1 sm:pt-0"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{t.urgentBanner.callReception}</span>
                </a>
              </div>
            </div>

            {/* Right Clinical Consultation Image & Badges */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-lg border border-white/25">
                <img
                  src="/src/assets/images/clinical_consultation_care_1793007987133.jpg"
                  alt="Clinical doctor and patient consultation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-semibold text-white">
                    {t.urgentBanner.bedsideLabel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="font-bold text-teal-200 block">{t.urgentBanner.triageTitle}</span>
                  <span className="text-[11px] text-teal-50">{t.urgentBanner.triageSub}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="font-bold text-teal-200 block">{t.urgentBanner.popiaTitle}</span>
                  <span className="text-[11px] text-teal-50">{t.urgentBanner.popiaSub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
