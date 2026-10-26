import React from 'react';
import { CLINICAL_SERVICES } from '../services/storage';
import { Stethoscope, ShieldCheck, Activity, Bandage, HeartPulse, ArrowRight } from 'lucide-react';
import { ClinicalService } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ClinicalService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
      case 'Bandage':
        return <Bandage className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
      default:
        return <HeartPulse className="w-5 h-5 text-teal-700 dark:text-teal-300" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-800 dark:text-teal-300 uppercase">
            <span>Primary Care Surgery</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Medicine</span>
            <span aria-hidden="true">·</span>
            <span>Umzimkhulu Hub</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Specialized Clinical Services & Surgical Procedures
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Delivering dedicated healthcare by Dr M.N. Ntshangase, backed by an MBChB and CMSA HIV Medicine Diploma. Each consultation ensures dignity, clinical accuracy, and strict patient privacy.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINICAL_SERVICES.map((service, idx) => {
            const isMarquee = service.id === 'hiv-care' || service.id === 'gen-consult';

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-panel glass-card-hover ${
                  isMarquee ? 'lg:col-span-1 border-teal-600/30 dark:border-teal-400/30 ring-1 ring-teal-500/10' : ''
                }`}
              >
                <div>
                  {/* Top metadata unboxed */}
                    <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-900/60 border border-teal-400/30 flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-teal-200">
                      <span>{service.durationMinutes} mins</span>
                      {service.badge && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-bold text-teal-200">{service.badge}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-teal-200">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm text-teal-50/90 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-8 pt-4 border-t border-teal-600/40 flex items-center justify-between">
                  <span className="text-xs text-teal-200/90">
                    In-person consultation
                  </span>
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-teal-200 transition-colors cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Schedule Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Walk-In & Emergency Info Box (matching physical surgery notice) */}
          <div className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#0a5450] to-[#073b38] text-white shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-teal-200/90 uppercase tracking-wider mb-3">
                <span>Immediate Care</span>
                <span aria-hidden="true">·</span>
                <span>No Booking Required</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Walk-ins Welcome Daily
              </h3>
              <p className="mt-3 text-sm text-teal-100/90 leading-relaxed">
                Acute distress, sudden trauma, or fever? You can walk directly into our surgery in Umzimkhulu during consulting hours. Patients are triaged promptly upon arrival.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-teal-700/60 text-xs flex items-center justify-between">
              <span className="text-teal-200 font-mono">08:00 – 17:00 Weekdays</span>
              <span className="text-teal-200 font-mono">08:00 – 13:00 Sat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
