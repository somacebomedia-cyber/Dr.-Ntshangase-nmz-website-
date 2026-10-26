import React from 'react';
import { MedicalCrossIcon, CircleMotif } from './CircleMotifs';
import { MapPin, Phone, Mail, ShieldCheck, Heart, Clock } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPhotos: () => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenPhotos, onNavigate }) => {
  return (
    <footer className="relative bg-[#051c1a] text-slate-300 border-t border-teal-900/40 overflow-hidden">
      {/* Circle Motif in footer background */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-20">
        <CircleMotif variant="full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Practice Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MedicalCrossIcon size="md" className="bg-teal-700/50" />
              <div>
                <span className="font-extrabold text-base tracking-wider text-white block">
                  DR M.N. NTSHANGASE
                </span>
                <span className="text-[11px] text-teal-400 font-mono block">
                  MBCHB (CUBA/UP) | HIV DIP (CMSA)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Providing holistic primary healthcare, certified HIV medicine management, chronic illness stabilization, and minor surgery for the Umzimkhulu community.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4" />
              <span>HIPAA & POPIA Encrypted Records</span>
            </div>
          </div>

          {/* Col 2: Consulting Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>Consulting Hours</span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>Monday – Friday:</span>
                <span className="text-white font-bold">08:00 – 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-bold">08:00 – 13:00</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Sunday & Holidays:</span>
                <span className="font-bold">CLOSED</span>
              </div>
              <div className="pt-2 text-emerald-400 font-sans font-semibold">
                Walk-ins Welcome Daily
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinical Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Overview & Surgery Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-teal-300 transition-colors"
                >
                  HIV & Chronic Care Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Patient Portal & Encrypted Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Healthcare Provider Queue Console
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPhotos}
                  className="hover:text-teal-300 transition-colors text-teal-400 font-medium"
                >
                  View Surgery Physical Signage Photos &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Umzimkhulu Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Practice Location</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                Main Commercial Hub, Umzimkhulu<br />
                Harry Gwala District, KwaZulu-Natal, 3297
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-mono">+27 (0)39 259 0184</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>reception@drntshangasesurgery.co.za</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-3 text-center text-xs font-bold text-white bg-[#0a5450] hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-teal-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Dr M.N. Ntshangase General Practitioner Surgery. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>HPCSA Registered</span>
            <span>·</span>
            <span>POPIA Certified</span>
            <span>·</span>
            <span>Umzimkhulu, South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
