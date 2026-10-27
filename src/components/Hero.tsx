import React from 'react';
import { CircleMotif, MedicalCrossIcon } from './CircleMotifs';
import { Calendar, Shield, MapPin, Clock, ArrowRight, Camera, Star, CheckCircle, HeartPulse, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets';

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
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#f8fcfa] via-white to-[#f4fbfb] dark:from-[#061c1a] dark:via-[#072422] dark:to-[#061c1a] transition-colors">
      {/* Background Random Floating Circles & Ambient Orbs */}
      <CircleMotif variant="ambient-orbs" />
      <CircleMotif variant="scatter-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition Matching Reference Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Trust Kicker with Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
              <span>{t.hero.kicker}</span>
            </div>

            {/* Display Headline */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.titleStart} <span className="text-teal-600 dark:text-teal-400">{t.hero.titleAccent}</span>
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.body}
            </p>

            {/* CTAs matching reference dual buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{t.hero.bookCta}</span>
              </button>

              <button
                onClick={onViewServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-white bg-white dark:bg-[#072d2a] border border-slate-300/80 dark:border-teal-700/60 rounded-xl hover:bg-slate-50 dark:hover:bg-teal-800/40 transition-all cursor-pointer shadow-xs text-center"
              >
                <span>{t.hero.exploreCta}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={onOpenPhotos}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 hover:underline cursor-pointer text-center"
              >
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span>{t.hero.signageCta}</span>
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-slate-200/80 dark:border-teal-900/50">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#072422] bg-teal-700 text-white text-xs font-bold flex items-center justify-center shadow-xs overflow-hidden">
                  <img
                    src={IMAGES.heroDoctor}
                    alt="Dr Ntshangase"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#072422] bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shadow-xs overflow-hidden">
                  <img
                    src={IMAGES.nurseTriage}
                    alt="Sister Khumalo"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#072422] bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  BD
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#072422] bg-slate-800 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  SC
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-800 dark:text-slate-200">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {t.hero.consultationsCount}
                  </span>
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-teal-900/50 text-xs text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span>{t.hero.locationHub}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Arched Doctor Portrait with Actual High-Fidelity Medical Photo */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full max-w-full">
            {/* The Arched Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] aspect-4/5 rounded-t-full rounded-b-3xl bg-gradient-to-b from-teal-500/25 via-teal-600/15 to-teal-800/35 dark:from-teal-500/15 dark:via-teal-800/20 dark:to-teal-950/40 p-3 sm:p-4 border-2 border-teal-500/30 shadow-2xl overflow-hidden flex items-end justify-center">
              <div className="relative w-full h-full rounded-t-full rounded-b-2xl overflow-hidden shadow-inner group">
                <img
                  src={IMAGES.heroDoctor}
                  alt="Dr M.N. Ntshangase - Lead General Practitioner"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle scrim at bottom for text contrast */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#062421]/95 via-[#062421]/60 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">
                    {language === 'zu' ? 'Udokotela Wokwelapha Omkhulu' : 'Lead Medical Practitioner'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {t.hero.doctorTitle}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-teal-100 font-mono">
                    MBChB (Cuba/UP) · HIV Dip (CMSA)
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Floating Overlay Card 1: Doctor Status (Hidden on mobile to eliminate side-scroll) */}
            <div className="hidden sm:flex absolute -top-4 -left-2 sm:-left-6 p-3 sm:p-4 rounded-xl bg-white/95 dark:bg-[#072d2a]/95 backdrop-blur-md border border-slate-200/90 dark:border-teal-500/30 shadow-xl items-center gap-3 animate-float-slow z-20">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-700/50 flex items-center justify-center text-teal-700 dark:text-teal-300 shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.hero.doctorStatus}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.hero.doctorStatusSub}
                </p>
              </div>
            </div>

            {/* Desktop Floating Overlay Card 2: Walk-in & Emergency Badge (Hidden on mobile to eliminate side-scroll) */}
            <div className="hidden sm:flex absolute -bottom-4 -right-2 sm:-right-4 p-3 sm:p-4 rounded-xl bg-white/95 dark:bg-[#072d2a]/95 backdrop-blur-md border border-slate-200/90 dark:border-teal-500/30 shadow-xl items-center gap-3 animate-float-gentle z-20">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {t.hero.emergencyBadge}
                </span>
                <p className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold">
                  {t.hero.emergencyBadgeSub}
                </p>
              </div>
            </div>

            {/* Mobile-Only Contained Status Badges (Zero overflow, completely contained in layout flow) */}
            <div className="flex sm:hidden flex-col gap-2.5 mt-4 w-full max-w-[340px]">
              <div className="p-3 rounded-xl bg-white/95 dark:bg-[#072d2a]/95 backdrop-blur-md border border-slate-200/90 dark:border-teal-500/30 shadow-md flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/50 border border-teal-200 dark:border-teal-700/50 flex items-center justify-center text-teal-700 dark:text-teal-300 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {t.hero.doctorStatus}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {t.hero.doctorStatusSub}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/95 dark:bg-[#072d2a]/95 backdrop-blur-md border border-slate-200/90 dark:border-teal-500/30 shadow-md flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                    {t.hero.emergencyBadge}
                  </span>
                  <p className="text-[11px] text-teal-700 dark:text-teal-300 font-semibold truncate">
                    {t.hero.emergencyBadgeSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
