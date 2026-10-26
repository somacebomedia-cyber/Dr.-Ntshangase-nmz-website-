import React from 'react';
import { CircleMotif } from './CircleMotifs';
import { ConsultingHoursCard } from './ConsultingHoursCard';
import { Calendar, Shield, MapPin, Clock, ArrowRight, Camera } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenPhotos: () => void;
  onViewServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenPhotos,
  onViewServices,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Subtle Circles Motif */}
      <CircleMotif variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Clinical Practice Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Trust Kicker with Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              <span>Umzimkhulu Surgery</span>
              <span aria-hidden="true">·</span>
              <span>Harry Gwala District</span>
              <span aria-hidden="true">·</span>
              <span>MBChB (Cuba/UP)</span>
              <span aria-hidden="true">·</span>
              <span>HIV Dip (CMSA)</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Exceptional Medical Care & Clinical Excellence in Umzimkhulu.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Welcome to the private surgery of <strong className="text-slate-900 dark:text-white font-semibold">Dr M.N. Ntshangase</strong>. Offering comprehensive general consultations, specialized HIV therapy management, continuous chronic disease treatment, and sterile wound surgery with complete patient confidentiality.
            </p>

            {/* Credentials Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl glass-panel flex flex-col justify-center">
                <span className="text-[11px] text-teal-200 font-medium uppercase tracking-wider">Qualifications</span>
                <span className="text-sm font-bold text-white mt-0.5">MBChB (Cuba / UP)</span>
              </div>
              <div className="p-3.5 rounded-xl glass-panel flex flex-col justify-center">
                <span className="text-[11px] text-teal-200 font-medium uppercase tracking-wider">Specialty Diploma</span>
                <span className="text-sm font-bold text-teal-200 mt-0.5">HIV Dip (CMSA)</span>
              </div>
              <div className="p-3.5 rounded-xl glass-panel flex flex-col justify-center">
                <span className="text-[11px] text-teal-200 font-medium uppercase tracking-wider">Consultations</span>
                <span className="text-sm font-bold text-white mt-0.5">Bookings & Walk-ins</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0a5450] hover:bg-[#073b38] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>

              <button
                onClick={onViewServices}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-800 dark:hover:text-white bg-white/80 dark:bg-teal-900/40 border border-slate-300 dark:border-teal-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-800/50 transition-all cursor-pointer"
              >
                <span>View Clinical Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPhotos}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 hover:underline cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Surgery Signage Photos</span>
              </button>
            </div>

            {/* Location & Contact Notice */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
              <span>Main Commercial Hub, Umzimkhulu, Harry Gwala District, KZN</span>
            </div>
          </div>

          {/* Right Column: Physical Plaque Reproduction & Circles Emblem */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The Authentic Consulting Hours Plaque */}
            <ConsultingHoursCard onBookClick={onOpenBooking} />

            {/* Graphic Circle Motif Door Film Recreation below */}
            <div className="w-full max-w-md mt-6 rounded-xl glass-panel p-4 border border-teal-400/25">
              <div className="flex items-center justify-between text-xs text-teal-200 mb-2">
                <span className="font-semibold text-white">Practice Emblem Motif</span>
                <span className="text-teal-200">From Main Entrance Door</span>
              </div>
              <CircleMotif variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
