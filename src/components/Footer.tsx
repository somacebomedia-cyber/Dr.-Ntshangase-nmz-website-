import React from 'react';
import { MedicalCrossIcon, CircleMotif } from './CircleMotifs';
import { MapPin, Phone, Mail, ShieldCheck, Heart, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPhotos: () => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPhotos, onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-[#072b28] text-slate-300 border-t border-teal-900/50 overflow-hidden">
      {/* Circle Motif in footer background */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-15">
        <CircleMotif variant="full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Practice Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MedicalCrossIcon size="md" className="bg-teal-600 shadow-sm" />
              <div>
                <span className="font-extrabold text-base tracking-wider text-white block">
                  DR M.N. NTSHANGASE
                </span>
                <span className="text-[11px] text-teal-300 font-mono block">
                  MBChB (Cuba/UP) · HIV Dip (CMSA)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.practiceDesc}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>{t.footer.portalBadge}</span>
            </div>
          </div>

          {/* Col 2: Clinical Departments */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.departmentsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  {t.footer.dep1}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  {t.footer.dep2}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  {t.footer.dep3}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  {t.footer.dep4}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  {t.footer.dep5}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Physical Consulting Hours Plaque Schedule */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-300" />
              <span>{t.footer.hoursTitle}</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex flex-wrap items-baseline justify-between gap-1 border-b border-teal-900/60 pb-1">
                <span>{language === 'zu' ? 'UMsombuluko – ULwesihlanu:' : 'Monday – Friday:'}</span>
                <span className="text-white font-bold shrink-0">08:00 – 17:00</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-1 border-b border-teal-900/60 pb-1">
                <span>{language === 'zu' ? 'UMgqibelo:' : 'Saturday:'}</span>
                <span className="text-white font-bold shrink-0">08:00 – 13:00</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-1 text-rose-300 border-b border-teal-900/60 pb-1">
                <span>{language === 'zu' ? 'ISonto Nezinsuku Zekhefu:' : 'Sunday & Holidays:'}</span>
                <span className="font-bold shrink-0">{language === 'zu' ? 'KUVALIWE' : 'CLOSED'}</span>
              </div>
              <div className="pt-1 text-emerald-300 font-sans font-semibold">
                {t.hoursCard.walkinsWelcome}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenPhotos}
                className="text-xs text-teal-300 hover:text-white underline cursor-pointer"
              >
                {t.footer.viewPhotos}
              </button>
            </div>
          </div>

          {/* Col 4: Location & Contact in Umzimkhulu */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>{t.footer.locationTitle}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p>
                Main Commercial Hub, Umzimkhulu<br />
                Harry Gwala District, KwaZulu-Natal, 3297
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-300" />
                <span className="font-mono text-white">+27 (0)39 259 0184</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-300" />
                <span>reception@drntshangasesurgery.co.za</span>
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.footer.bookNowBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-teal-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>{t.footer.accreditation}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
