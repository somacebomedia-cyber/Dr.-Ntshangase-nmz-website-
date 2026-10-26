import React from 'react';
import { Stethoscope, Award, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { MedicalCrossIcon, CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';

interface ClinicalTeamSectionProps {
  onOpenBooking: () => void;
  onOpenPhotos: () => void;
}

export const ClinicalTeamSection: React.FC<ClinicalTeamSectionProps> = ({
  onOpenBooking,
  onOpenPhotos,
}) => {
  const { t, language } = useLanguage();

  const team = [
    {
      name: 'Dr M.N. Ntshangase',
      roleEn: 'Lead General Practitioner & HIV Specialist',
      roleZu: 'Udokotela Omkhulu & Nengcweti Ye-HIV',
      degrees: 'MBChB (Cuba / UP) · HIV Dip (CMSA)',
      experienceEn: '12+ Years Clinical Practice',
      experienceZu: 'Iminyaka engu-12+ Yokusebenza',
      focusEn: 'Primary care medicine, certified antiretroviral therapy (ART), chronic diseases & minor surgical procedures.',
      focusZu: 'Ukwelashwa jikelele, ukwelashwa okuqinisekisiwe kwe-ART, izifo ezingamahlalakhona nokuhlinza okuncane.',
      daysEn: 'Mon – Sat Consultations',
      daysZu: 'UMsombuluko – UMgqibelo',
      isLead: true,
      imageSrc: '/src/assets/images/hero_doctor_portrait_1793007985493.jpg',
    },
    {
      name: 'Sister N. Khumalo',
      roleEn: 'Senior Clinical Triage Nurse & Phlebotomist',
      roleZu: 'Umhlengikazi Omkhulu Wokuhlunga & Nokudonsa Igazi',
      degrees: 'BCur Nursing · Advanced Primary Healthcare',
      experienceEn: '9+ Years Triage & Phlebotomy',
      experienceZu: 'Iminyaka engu-9+ Yokuhlunga Iziguli',
      focusEn: 'Walk-in emergency triage, routine vital checks, pediatric immunization & venous blood sample collection.',
      focusZu: 'Ukuhlungwa okuphuthumayo, ukuhlola umfutho wegazi, ukugoma izingane nokuthatha amasampula egazi.',
      daysEn: 'Mon – Sat Daily Triage',
      daysZu: 'UMsombuluko – UMgqibelo Nsuku Zonke',
      isLead: false,
      imageSrc: '/src/assets/images/nurse_triage_portrait_1793007989179.jpg',
    },
    {
      name: 'Sister B. Dlamini',
      roleEn: 'Chronic Care & Maternal Health Nurse',
      roleZu: 'Umhlengikazi Wezifo Ezingamahlalakhona Nabakhulelwe',
      degrees: 'Dip General Nursing & Midwifery',
      experienceEn: '8+ Years Community Health',
      experienceZu: 'Iminyaka engu-8+ Empilweni Yomphakathi',
      focusEn: 'Hypertension and diabetes patient monitoring, antenatal wellness assessment, and chronic treatment counseling.',
      focusZu: 'Ukugadwa komfutho wegazi noshukela, ukuhlolwa kwabakhulelwe, nokwelulekwa ngemithi engamahlalakhona.',
      daysEn: 'Mon – Fri Schedule',
      daysZu: 'UMsombuluko – ULwesihlanu',
      isLead: false,
      imageSrc: '/src/assets/images/clinical_consultation_care_1793007987133.jpg',
    },
    {
      name: 'S. Cele',
      roleEn: 'Practice Manager & Patient Care Coordinator',
      roleZu: 'Umphathi Wesikhungo & Nomxhumanisi Weziguli',
      degrees: 'Healthcare Administration & EDI Billing',
      experienceEn: '7+ Years Practice Operations',
      experienceZu: 'Iminyaka engu-7+ Yokulawula Isikhungo',
      focusEn: 'Patient reception, electronic medical aid claims management, appointment coordination, and patient confidentiality.',
      focusZu: 'Ukwamukelwa kweziguli, ukufakwa kwezimangalo ze-medical aid, ukuhlela izikhathi nokugcina imfihlo.',
      daysEn: 'Mon – Sat Reception',
      daysZu: 'UMsombuluko – UMgqibelo e-Reception',
      isLead: false,
      imageSrc: '/src/assets/images/surgery_reception_desk_1793007988902.jpg',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f4fbfb] dark:bg-[#062421] border-y border-teal-900/10 dark:border-teal-500/15 transition-colors relative overflow-hidden">
      {/* Background Floating Circles Motif */}
      <CircleMotif variant="scatter-left" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
            {t.team.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {t.team.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {t.team.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white dark:bg-[#072d2a] border transition-all flex flex-col justify-between shadow-xs hover:shadow-lg ${
                member.isLead
                  ? 'border-teal-400 dark:border-teal-500 ring-2 ring-teal-500/20'
                  : 'border-slate-200/90 dark:border-teal-500/20'
              }`}
            >
              <div>
                {/* Visual Avatar / Real Photo Frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-[#041c1b] mb-5 shadow-inner group">
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Scrim & Schedule Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-end">
                      {member.isLead ? (
                        <div className="bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          {t.team.leadGp}
                        </div>
                      ) : (
                        <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {t.team.clinicalStaff}
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-teal-300">
                      {language === 'zu' ? member.daysZu : member.daysEn}
                    </span>
                  </div>
                </div>

                {/* Name & Credentials */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 mt-0.5">
                  {language === 'zu' ? member.roleZu : member.roleEn}
                </p>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                  {member.degrees}
                </p>

                {/* Focus Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {language === 'zu' ? member.focusZu : member.focusEn}
                </p>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-teal-900/50 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {language === 'zu' ? member.experienceZu : member.experienceEn}
                </span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-teal-700 dark:text-teal-300 hover:text-teal-900 dark:hover:text-white hover:underline cursor-pointer"
                >
                  {t.team.bookVisit} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
