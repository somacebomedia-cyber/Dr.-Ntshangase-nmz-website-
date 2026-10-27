import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CircleMotif } from './CircleMotifs';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      quoteEn:
        'Dr Ntshangase is exceptionally gentle and thorough. He took the time to explain my blood test results and created an ART management plan that has kept my viral load completely undetectable for three straight years. Umzimkhulu is blessed to have him.',
      quoteZu:
        'UDkt Ntshangase unesihawu nesineke esiyingqayizivele. Wathatha isikhathi engichazela ngemiphumela yami yegazi futhi wangenzela uhlelo lwe-ART olwenza igciwane lingatholakali nhlobo iminyaka emithathu ilandelana. UMzimkhulu ubusisekile ngokuba naye.',
      name: 'Thandiwe M.',
      roleEn: 'Chronic & HIV Care Patient',
      roleZu: 'Isiguli Se-HIV Nezifo Ezingamahlalakhona',
      locationEn: 'Umzimkhulu Central',
      locationZu: 'Isikhungo SaseMzimkhulu',
      rating: 5,
    },
    {
      quoteEn:
        'I walked in on a busy Tuesday morning with a severe cut on my arm from farm work. The nursing team cleaned and prepped the wound immediately, and Dr Ntshangase sutured it with sterile precision. The scar is barely visible today.',
      quoteZu:
        'Ngafika ngolwesibili ekuseni ngilimele kabuhlungu engalweni ngenxa yomsebenzi wasepulazini. Abahlengikazi balihlanza ngokushesha inxeba, uDkt Ntshangase walithunga ngokucophelela okukhulu. Namuhla isibazi asisabonakali nokubonakala.',
      name: 'Sipho Dlamini',
      roleEn: 'Minor Surgery Walk-in Patient',
      roleZu: 'Isiguli Esafika Singabhukhanga (Wound Care)',
      locationEn: 'Harry Gwala District',
      locationZu: 'Isifunda sase-Harry Gwala',
      rating: 5,
    },
    {
      quoteEn:
        'The online booking pass saved me hours of waiting! I booked my mother’s hypertension review on my phone, received the encrypted confirmation pass, and we were attended to promptly. Transparent fees and true dignity for elderly patients.',
      quoteZu:
        'Iphasi yokubhukha ku-inthanethi yangisindisa emahoreni amaningi okulinda! Ngabhukhela umama wami ohlolwa umfutho wegazi efonini yami, ngathola iphasi evikelekile, sasizwa ngokushesha. Amanani acacile nesizotha sangempela kubantu abadala.',
      name: 'Noluthando Cele',
      roleEn: 'Family Healthcare Patient',
      roleZu: 'Isiguli Sokunakekelwa Komndeni',
      locationEn: 'Rietvlei Area',
      locationZu: 'Indawo yase-Rietvlei',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#061c1a] transition-colors relative overflow-hidden">
      {/* Background Floating Circles Motif */}
      <CircleMotif variant="ambient-orbs" />
      <CircleMotif variant="scatter-right" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest">
            {t.testimonials.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* 3 Clean Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl bg-[#f8fbfb] dark:bg-[#072d2a] border border-slate-200/90 dark:border-teal-500/20 shadow-xs hover:shadow-md hover:border-teal-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300">
                    <Quote className="w-5 h-5 fill-teal-600 text-teal-600 dark:fill-teal-300 dark:text-teal-300" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                  "{language === 'zu' ? item.quoteZu : item.quoteEn}"
                </p>
              </div>

              {/* Patient Attribution */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-teal-900/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                    {language === 'zu' ? item.roleZu : item.roleEn} · {language === 'zu' ? item.locationZu : item.locationEn}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  <span>{t.testimonials.verified}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
