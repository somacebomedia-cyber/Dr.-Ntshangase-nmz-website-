import React, { useState } from 'react';
import { CLINICAL_SERVICES } from '../services/storage';
import {
  Stethoscope,
  ShieldCheck,
  Activity,
  Bandage,
  HeartPulse,
  ArrowRight,
  ArrowDown,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';
import { ClinicalService } from '../types';
import { CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../assets';

interface ServicesSectionProps {
  onSelectService: (service: ClinicalService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(CLINICAL_SERVICES[0].id);
  const { t, language } = useLanguage();

  const activeService =
    CLINICAL_SERVICES.find((s) => s.id === activeServiceId) || CLINICAL_SERVICES[0];

  const handleSelectService = (serviceId: string, shouldScroll = true) => {
    setActiveServiceId(serviceId);
    if (shouldScroll && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const detailsEl = document.getElementById('clinical-department-details');
        if (detailsEl) {
          const yOffset = -75;
          const y = detailsEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleScrollToDepartments = () => {
    const listEl = document.getElementById('departments-selector-list');
    if (listEl) {
      const yOffset = -75;
      const y = listEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Bandage':
        return <Bandage className={className} />;
      default:
        return <HeartPulse className={className} />;
    }
  };

  // Facility-specific rich metadata with English & isiZulu localizations
  const facilityDetails: Record<
    string,
    {
      titleZu: string;
      features: string[];
      featuresZu: string[];
      equipment: string;
      equipmentZu: string;
      clinicalScope: string;
      clinicalScopeZu: string;
      imageLabel: string;
      imageLabelZu: string;
      imageSrc: string;
    }
  > = {
    'gen-consult': {
      titleZu: 'Ukubonana Okujwayelekile Nodokotela',
      features: [
        'Full systemic clinical examination (vitals, ENT, chest & abdomen)',
        'Differential diagnosis and customized prescription protocol',
        'Direct referrals to district and regional hospital specialists if required',
        'Official medical certificates, sick notes & insurance completion',
      ],
      featuresZu: [
        'Ukuhlolwa komzimba okuphelele (umfutho wegazi, izindlebe, umphimbo, isifuba & nesisu)',
        'Ukutholakala kwesifo nemiyalelo yemithi elungiselelwe isiguli',
        'Ukudluliselwa ngqo kodokotela abayizazi ezibhedlela zesifunda uma kunesidingo',
        'Izitifiketi zokugula ezisemthethweni, izincwadi zasesibhedlela namafomu omshwalense',
      ],
      equipment: 'Welch Allyn Diagnostic Set, Digital ECG & SpO2 Monitor',
      equipmentZu: 'Isethi Yokuhlola Yakwa-Welch Allyn, i-Digital ECG ne-SpO2 Monitor',
      clinicalScope: 'Adult & pediatric acute illnesses, infections, physical check-ups',
      clinicalScopeZu: 'Ukugula okubucayi kwabantu abadala nezingane, izifo ezithathelwanayo, nokuhlola impilo',
      imageLabel: 'Consulting Room 1 · Dr M.N. Ntshangase',
      imageLabelZu: 'Igumbi Lokubonisana 1 · UDkt M.N. Ntshangase',
      imageSrc: IMAGES.facilityRoom,
    },
    'hiv-care': {
      titleZu: 'Umtholampilo We-HIV Nemithi ye-ART',
      features: [
        'Confidential CD4 count & viral load monitoring management',
        'Antiretroviral therapy (ART) initiation, switching & side-effect mitigation',
        'Pre-exposure & Post-exposure prophylaxis (PrEP & PEP)',
        'Management of opportunistic infections & immunological support',
      ],
      featuresZu: [
        'Ukubalwa kwamasosha omzimba (CD4) nokuhlola ukuthi igciwane linciphe kangakanani (Viral Load)',
        'Ukuqalisa imithi ye-ART, ukuyishintsha nokuvikela imiphumela engemihle',
        'Ukuvikelwa ngaphambi nangemuva kokuchayeka egciwaneni (PrEP & PEP)',
        'Ukwelashwa kwezifo ezihlasela amasosha aphelile nokusekela amasosha',
      ],
      equipment: 'Direct Phlebotomy Station & Confidential Rapid Testing Desk',
      equipmentZu: 'Isiteshi Sokudonsa Igazi & Nedeski Lokuhlola Okusheshayo Eliyimfihlo',
      clinicalScope: 'Comprehensive HIV Medicine certified by CMSA (Colleges of Medicine SA)',
      clinicalScopeZu: 'Imithi ye-HIV ephelele eqinisekiswe yi-CMSA (Colleges of Medicine SA)',
      imageLabel: 'Specialized Immunology Clinic Suite',
      imageLabelZu: 'Ikamelo Elikhethekile Lokwelapha Amasosha Omzimba',
      imageSrc: IMAGES.clinicalConsultation,
    },
    'chronic-mgmt': {
      titleZu: 'Ukunakekelwa Kwezifo Ezingamahlalakhona',
      features: [
        'Hypertension (high blood pressure) titration and cardiovascular screening',
        'Type 1 & Type 2 Diabetes management (HbA1c monitoring & dietary guidance)',
        'Asthma, COPD, epilepsy, and arthritis chronic script renewal',
        'Routine organ function monitoring (kidney, liver, and lipids)',
      ],
      featuresZu: [
        'Umfutho wegazi ophezulu nokuhlolwa kwenhliziyo nemithambo',
        'Ukwelashwa koshukela (Type 1 & Type 2, HbA1c kanye nesiqondiso sokudla)',
        'Isifuba somoya (Asthma), isithuthwane, nesifo samalunga (Arthritis) nokuvuselelwa kwemiyalelo',
        'Ukuhlolwa kokusebenza kwezinso, isibindi, kanye namafutha egazini',
      ],
      equipment: 'Automated Omron BP Monitors & Point-of-Care Glucometers',
      equipmentZu: 'Imishini Yakwa-Omron Yokuhlola Umfutho Neglucose Yokuhlola Ushukela',
      clinicalScope: 'Long-term health preservation, lifestyle coaching, and chronic stability',
      clinicalScopeZu: 'Ukugcina impilo yesikhathi eside, isiqondiso sempilo, nokuzinza kwezifo',
      imageLabel: 'Chronic Care & Vital Signs Assessment Wing',
      imageLabelZu: 'Isigceme Sokuhlolwa Kwezifo Ezingamahlalakhona',
      imageSrc: IMAGES.clinicalConsultation,
    },
    'wound-care': {
      titleZu: 'Ukuhlinza Okuncane & Nokubopha Amanxeba',
      features: [
        'Sterile suture closure of traumatic lacerations and cuts',
        'Post-operative wound dressing, suture removal & drain monitoring',
        'Diabetic foot ulcer debridement & non-healing chronic wound therapy',
        'Minor surgical excision of superficial cysts, abscess incision & drainage',
      ],
      featuresZu: [
        'Ukuthunga amanxeba okuhlanzekile ngenxa yokulimala nokusikwa',
        'Ukubopha amanxeba ngemuva kokuhlinzwa, ukukhipha imithungo nokuhlola',
        'Ukwelashwa kwamanxeba ezinyawo zoshukela angenzeki kalula',
        'Ukukhishwa kwezinsumpa ezincane, ukuchoba amathumba nokukhipha ubomvu',
      ],
      equipment: 'Autoclave Sterilization Unit & Medical Minor Surgery Surgical Tray',
      equipmentZu: 'Umshini Wokuhlanza i-Autoclave Ne-Tray Yokuhlinza Okuncane',
      clinicalScope: 'Aseptic minor surgery, wound dressing, and burn treatment',
      clinicalScopeZu: 'Ukuhlinza okuncane okuhlanzekile, ukubopha amanxeba, nokwelapha ukusha',
      imageLabel: 'Sterile Minor Surgery & Procedure Theatre',
      imageLabelZu: 'Igumbi Lokuhlinza Okuncane Okuhlanzekile',
      imageSrc: IMAGES.facilityRoom,
    },
    'rapid-screen': {
      titleZu: 'Ukuhlola Okusheshayo Kwaselabhorethri',
      features: [
        'Rapid blood glucose, cholesterol & urine dipstick testing',
        'Pregnancy testing & early antenatal wellness screening',
        'HIV 1/2 rapid antibody diagnostic testing with pre/post-counseling',
        'Instant results and personalized clinical action plan within 15 minutes',
      ],
      featuresZu: [
        'Ukuhlolwa koshukela wegazi, i-cholesterol nomchamo ngokushesha',
        'Ukuhlolwa kokukhulelwa nokunakekelwa kokuqala kukamama osakhulelwe',
        'Ukuhlolwa okusheshayo kwe-HIV nokwelulekwa ngaphambi nangemuva',
        'Imiphumela esheshayo nohlelo lokwelashwa phakathi kwemizuzu engu-15',
      ],
      equipment: 'Certified Rapid Diagnostic Kits & Centrifuge',
      equipmentZu: 'Izinsiza Zokuhlola Ezivunyelwe ne-Centrifuge',
      clinicalScope: 'Immediate point-of-care diagnostics for rapid clinical decision making',
      clinicalScopeZu: 'Ukuhlola okusheshayo khona lapho ukuze kuthathwe izinqumo zokwelapha ngokushesha',
      imageLabel: 'On-Site Diagnostic Testing Laboratory',
      imageLabelZu: 'ILabhorethri Yokuhlola Yasendaweni',
      imageSrc: IMAGES.facilityRoom,
    },
  };

  const details = facilityDetails[activeService.id] || facilityDetails['gen-consult'];
  const activeTitle = language === 'zu' ? details.titleZu : activeService.title;
  const activeScope = language === 'zu' ? details.clinicalScopeZu : details.clinicalScope;
  const activeFeatures = language === 'zu' ? details.featuresZu : details.features;
  const activeEquipment = language === 'zu' ? details.equipmentZu : details.equipment;
  const activeImageLabel = language === 'zu' ? details.imageLabelZu : details.imageLabel;

  return (
    <section id="services" className="py-16 sm:py-24 bg-white dark:bg-[#061c1a] transition-colors relative overflow-hidden">
      {/* Background Random Floating Circles */}
      <CircleMotif variant="scatter-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-teal-800 dark:text-teal-300 uppercase">
            <span>{t.facilities.kicker}</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.facilities.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.facilities.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Interactive Facilities Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Category Navigation */}
          <motion.div
            id="departments-selector-list"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-3"
          >
            {CLINICAL_SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              const svcDetails = facilityDetails[service.id];
              const svcTitle = language === 'zu' && svcDetails ? svcDetails.titleZu : service.title;

              return (
                <div
                  key={service.id}
                  onClick={() => handleSelectService(service.id, true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectService(service.id, true);
                    }
                  }}
                  className={`w-full p-3.5 sm:p-4 rounded-xl flex items-center justify-between transition-all text-left cursor-pointer select-none ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-lg ring-2 ring-teal-500/50'
                      : 'bg-[#f8fbfb] dark:bg-[#072d2a] text-slate-700 dark:text-slate-200 hover:bg-teal-50/80 dark:hover:bg-teal-900/40 border border-slate-200/80 dark:border-teal-700/40'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1 mr-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-teal-700/40'
                      }`}
                    >
                      {getIcon(service.icon)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold tracking-tight truncate">
                        {svcTitle}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 truncate ${
                          isActive ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {service.durationMinutes} {language === 'zu' ? 'imizuzu' : 'mins'} · {service.badge || (language === 'zu' ? 'Ukubonisana' : 'Consultation')}
                      </p>
                      {/* Mobile-only active viewing feedback */}
                      {isActive && (
                        <span className="lg:hidden inline-flex items-center gap-1 text-[11px] font-semibold text-teal-100 mt-1">
                          <span>{t.facilities.viewingDetails}</span>
                          <ArrowDown className="w-3 h-3 animate-bounce" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Actions: Quick Book directly or tap to view details */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-teal-800 hover:bg-teal-50 shadow-xs'
                          : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                      }`}
                      title={`${t.facilities.quickBook} ${svcTitle}`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.facilities.quickBook}</span>
                    </button>

                    <span className={`text-sm hidden sm:inline-block ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {isActive ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Walk-in Note */}
            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-900 dark:text-teal-200">
              <span className="font-bold block">{t.facilities.walkinNoticeTitle}</span>
              <p className="mt-1 text-[11px] text-teal-800/90 dark:text-teal-300">
                {t.facilities.walkinNoticeBody}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Detailed Showcase Card with Clinical Photography */}
          <motion.div
            id="clinical-department-details"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 p-4 sm:p-6 lg:p-8 rounded-2xl bg-white dark:bg-[#072d2a] border border-slate-200 dark:border-teal-500/30 shadow-lg scroll-mt-20"
          >
            {/* Mobile Top Navigation Helper */}
            <div className="lg:hidden mb-4 p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-900 dark:text-teal-200 truncate mr-2">
                {activeTitle}
              </span>
              <button
                type="button"
                onClick={handleScrollToDepartments}
                className="text-teal-700 dark:text-teal-300 font-bold hover:underline cursor-pointer flex items-center gap-1 text-[11px] shrink-0"
              >
                {t.facilities.backToDepartments}
              </button>
            </div>

            {/* Visual Photo Header with Badge */}
            <div className="relative aspect-16/9 rounded-xl overflow-hidden shadow-md mb-6 group">
              <img
                src={details.imageSrc}
                alt={activeImageLabel}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#062421]/90 via-[#062421]/40 to-transparent flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30 flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                    <span>{activeImageLabel}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    {t.facilities.scopeLabel}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                    {activeTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
                    {activeScope}
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Overview Content */}
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.facilities.procedureHeader}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {t.facilities.procedureDesc}
                </p>
              </div>

              {/* Specific Clinical Features Checklist */}
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  {t.facilities.includedHeader}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f8fbfb] dark:bg-[#052422] border border-slate-100 dark:border-teal-900/50"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Equipment & Diagnostics Note */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-teal-950/30 border border-slate-200/80 dark:border-teal-800/40 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    {t.facilities.equipmentHeader}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {activeEquipment}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-semibold">
                  <Award className="w-4 h-4" />
                  <span>{t.facilities.standardsLabel}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200/80 dark:border-teal-900/50">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>
                    {t.facilities.estimatedTime}: <strong>{activeService.durationMinutes} {language === 'zu' ? 'Imizuzu' : 'Minutes'}</strong>
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(activeService)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  <span>{t.facilities.scheduleBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
