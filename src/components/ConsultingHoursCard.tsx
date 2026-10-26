import React, { useState, useEffect } from 'react';
import { getSurgeryOpenStatus } from '../services/storage';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ConsultingHoursCardProps {
  onBookClick?: () => void;
  className?: string;
}

export const ConsultingHoursCard: React.FC<ConsultingHoursCardProps> = ({
  onBookClick,
  className = '',
}) => {
  const [status, setStatus] = useState(getSurgeryOpenStatus());

  useEffect(() => {
    // Refresh status every 60 seconds
    const interval = setInterval(() => {
      setStatus(getSurgeryOpenStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative max-w-md w-full mx-auto ${className}`}>
      {/* Physical Sign Metal Plaque Recreation - Always Signature Pine Green Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-teal-400/40 shadow-2xl bg-gradient-to-b from-[#0a5450] to-[#073b38] text-white transition-all">
        {/* Sign Corner Fasteners / Screws (matching photo IMG_20260910_101243_738_081ecf3e.jpg) */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-0.5 bg-slate-600" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-0.5 bg-slate-600" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-0.5 bg-slate-600" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-slate-300 border border-slate-400 shadow-inner flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-0.5 bg-slate-600" />
        </div>

        {/* Top Header Banner: CONSULTING HOURS */}
        <div className="bg-[#08423f] py-4 px-6 text-center border-b border-teal-600/40">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-wider text-white uppercase font-sans">
            CONSULTING HOURS
          </h3>
        </div>

        {/* Middle Schedule Table - Replicating exact typography and layout */}
        <div className="p-6 sm:p-8 space-y-6 text-center bg-gradient-to-b from-[#094744] to-[#062e2c]">
          {/* Monday - Friday */}
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-teal-200 tracking-wider uppercase">
              MONDAY – FRIDAY
            </h4>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              08:00 – 17:00
            </p>
          </div>

          <div className="w-20 h-px bg-teal-400/25 mx-auto" />

          {/* Saturday */}
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-teal-200 tracking-wider uppercase">
              SATURDAY
            </h4>
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              08:00 – 13:00
            </p>
          </div>

          <div className="w-20 h-px bg-teal-400/25 mx-auto" />

          {/* Sunday & Public Holidays */}
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-teal-300/80 tracking-wider uppercase">
              SUNDAY & PUBLIC HOLIDAYS
            </h4>
            <p className="text-xl sm:text-2xl font-extrabold text-rose-300 tracking-wide font-mono">
              CLOSED
            </p>
          </div>
        </div>

        {/* Bottom Banner: Walk-ins Welcome */}
        <div className="bg-[#08423f] py-3.5 px-6 text-center border-t border-teal-600/40">
          <p className="text-sm sm:text-base font-bold text-teal-100 tracking-wide">
            Walk-ins Welcome Daily
          </p>
        </div>
      </div>

      {/* Real-time Status Badge below the sign - Green Card */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#0a5450] to-[#073b38] border border-teal-400/30 shadow-md flex items-center justify-between gap-3 text-xs text-white">
        <div className="flex items-center gap-2">
          {status.isOpen ? (
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Surgery Open Now</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-300" />
              <span>Currently Closed</span>
            </span>
          )}
          <span className="text-teal-400">·</span>
          <span className="text-teal-100 font-medium">
            {status.nextOpenNotice}
          </span>
        </div>

        {onBookClick && (
          <button
            onClick={onBookClick}
            className="text-xs font-semibold text-teal-200 hover:text-white hover:underline shrink-0 cursor-pointer"
          >
            Select Slot &rarr;
          </button>
        )}
      </div>
    </div>
  );
};
