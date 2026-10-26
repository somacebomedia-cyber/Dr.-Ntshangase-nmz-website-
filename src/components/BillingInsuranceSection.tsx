import React from 'react';
import { ShieldCheck, CheckCircle2, CreditCard, Receipt, FileText, ArrowRight, HelpCircle } from 'lucide-react';
import { CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';

interface BillingInsuranceSectionProps {
  onOpenBooking: () => void;
}

export const BillingInsuranceSection: React.FC<BillingInsuranceSectionProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  const medicalSchemes = [
    'Discovery Health',
    'Government Employees (GEMS)',
    'Bonitas Medical Fund',
    'Medihelp',
    'Fedhealth',
    'Momentum Health',
    'Polmed (SAPS)',
    'Bestmed',
    'KeyHealth & Bankmed',
  ];

  const guarantees = [
    t.billing.guarantee1,
    t.billing.guarantee2,
    t.billing.guarantee3,
    t.billing.guarantee4,
    t.billing.guarantee5,
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f8fbfb] dark:bg-[#062421] border-y border-teal-900/10 dark:border-teal-500/15 transition-colors relative overflow-hidden">
      {/* Background Floating Circles Motif */}
      <CircleMotif variant="scatter-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual Card with Real Surgery Reception Photo & Trust Badges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-teal-500/30 shadow-xl bg-white dark:bg-[#072d2a] p-4 sm:p-6">
              {/* Welcoming Reception Photo */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden shadow-sm mb-5 group">
                <img
                  src="/src/assets/images/surgery_reception_desk_1793007988902.jpg"
                  alt="Surgery reception desk and appointment check-in"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">
                      {t.billing.receptionLabel}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {t.billing.receptionSub}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Top Accent Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-teal-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                    R
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t.billing.ediBillingTitle}
                    </span>
                    <span className="text-[10px] text-teal-700 dark:text-teal-400">
                      {t.billing.ediBillingSub}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                  {t.billing.contractedBadge}
                </span>
              </div>

              {/* Middle Section: Medical Aid Grid */}
              <div className="py-4 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  {t.billing.schemesHeader}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {medicalSchemes.map((scheme, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-[#052422] border border-slate-200/60 dark:border-teal-900/40 text-[11px] font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span className="truncate">{scheme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card: Cash & Card Notice */}
              <div className="pt-3 border-t border-slate-100 dark:border-teal-900/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{t.billing.paymentMethods}</span>
                </div>
                <span className="font-semibold text-teal-700 dark:text-teal-300">
                  {t.billing.hpcsaTariff}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Billing Information & Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
                {t.billing.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                {t.billing.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {t.billing.body}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {guarantees.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto justify-center px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 text-center"
              >
                <span>{t.billing.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                {t.billing.queriesText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
