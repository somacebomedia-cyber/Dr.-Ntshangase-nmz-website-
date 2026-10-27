import React from 'react';
import { X, CheckCircle, ExternalLink } from 'lucide-react';
import { IMAGES } from '../assets';

interface ReferencePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencePhotosModal: React.FC<ReferencePhotosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const photos = [
    {
      src: IMAGES.reference.entranceSign,
      title: 'Physical Surgery Entrance Sign',
      subtitle: 'DR M.N. NTSHANGASE · MBCHB (CUBA/UP) | HIV DIP (CMSA)',
      details: 'Deep pine/medical teal sign with white cross badge, located above the surgery entrance in Umzimkhulu.',
    },
    {
      src: IMAGES.reference.doorFilm,
      title: 'Entrance Door Film (Circles Motif)',
      subtitle: 'The Signature Circles & Curved Horizon Graphic',
      details: 'Layered organic teal/seafoam bubbles and curved horizon motif, faithfully reproduced throughout this web application.',
    },
    {
      src: IMAGES.reference.hoursPlaque,
      title: 'Consulting Hours Metal Plaque',
      subtitle: 'Mon–Fri 08:00–17:00 | Sat 08:00–13:00 | Walk-ins Welcome',
      details: 'Physical schedule board mounted on exterior brick wall, inspiring the digital schedule card and hours engine.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4">
      {/* Modal Dialog Frame - Always Signature Pine Green Card */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0a5450] to-[#073b38] text-white rounded-2xl shadow-2xl border-2 border-teal-400/40 overflow-hidden">
        {/* Header */}
        <div className="bg-[#08423f] text-white p-4 sm:p-5 flex items-center justify-between border-b border-teal-600/40">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold tracking-tight truncate">Surgery Photo Gallery</h3>
            <p className="text-[11px] sm:text-xs text-teal-200 truncate">
              Dr M.N. Ntshangase General Practitioner Surgery · Umzimkhulu, KZN
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery */}
        <div className="p-4 sm:p-6 max-h-[78vh] overflow-y-auto space-y-4 sm:space-y-6">
          <p className="text-xs text-teal-100/90 leading-relaxed">
            This digital platform was designed from the ground up to honor the exact visual identity, colors, typography, and circles motifs present on Dr Ntshangase's surgery building in Umzimkhulu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-teal-400/30 bg-[#062e2c] flex flex-col shadow-lg"
              >
                <div className="relative aspect-4/3 bg-[#041c1b] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-teal-300 mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-teal-100/80 mt-2 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-teal-600/40 flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Visual Motif Matched</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08423f] border-t border-teal-600/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0a5450] hover:bg-[#073b38] border border-teal-400/30 rounded-lg cursor-pointer transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
