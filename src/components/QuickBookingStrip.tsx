import React from 'react';
import { Stethoscope, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { ClinicalService } from '../types';
import { CLINICAL_SERVICES } from '../services/storage';
import { CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';

interface QuickBookingStripProps {
  onSelectService: (service: ClinicalService) => void;
  onOpenBooking: () => void;
}

export const QuickBookingStrip: React.FC<QuickBookingStripProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t.quickBooking.emergencyTitle,
      subtitle: t.quickBooking.emergencySub,
      icon: HeartPulse,
      serviceId: 'gen-consult',
      badge: t.quickBooking.emergencyBadge,
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-200 dark:border-emerald-800/40',
    },
    {
      title: t.quickBooking.medicalTitle,
      subtitle: t.quickBooking.medicalSub,
      icon: Stethoscope,
      serviceId: 'gen-consult',
      badge: t.quickBooking.medicalBadge,
      accentColor: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/40',
      borderColor: 'border-teal-200 dark:border-teal-800/40',
    },
    {
      title: t.quickBooking.hivTitle,
      subtitle: t.quickBooking.hivSub,
      icon: ShieldCheck,
      serviceId: 'hiv-care',
      badge: t.quickBooking.hivBadge,
      accentColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
      borderColor: 'border-cyan-200 dark:border-cyan-800/40',
    },
    {
      title: t.quickBooking.chronicTitle,
      subtitle: t.quickBooking.chronicSub,
      icon: Activity,
      serviceId: 'chronic-mgmt',
      badge: t.quickBooking.chronicBadge,
      accentColor: 'text-teal-700 dark:text-teal-300',
      bgColor: 'bg-teal-50/80 dark:bg-teal-950/30',
      borderColor: 'border-teal-200 dark:border-teal-800/40',
    },
  ];

  const handleCardClick = (serviceId: string) => {
    const service = CLINICAL_SERVICES.find((s) => s.id === serviceId) || CLINICAL_SERVICES[0];
    onSelectService(service);
  };

  return (
    <section className="py-12 bg-[#f4fbfb] dark:bg-[#062421] border-y border-teal-900/10 dark:border-teal-500/15 transition-colors relative overflow-hidden">
      {/* Subtle organic circles background composition */}
      <CircleMotif variant="scatter-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
            {t.quickBooking.kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {t.quickBooking.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
            {t.quickBooking.subtitle}
          </p>
        </div>

        {/* 4 Clean Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <button
                key={index}
                onClick={() => handleCardClick(cat.serviceId)}
                className="group p-6 rounded-2xl bg-white dark:bg-[#072d2a] border border-slate-200/90 dark:border-teal-500/20 shadow-xs hover:shadow-md hover:border-teal-500/40 dark:hover:border-teal-400/50 transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Icon in circular badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-full ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${cat.accentColor}`} />
                    </div>
                    <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-2 py-0.5 rounded-full">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-teal-900/50 flex items-center justify-between text-xs font-semibold text-teal-700 dark:text-teal-300 group-hover:translate-x-0.5 transition-transform">
                  <span>{t.quickBooking.scheduleCta}</span>
                  <span>&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
