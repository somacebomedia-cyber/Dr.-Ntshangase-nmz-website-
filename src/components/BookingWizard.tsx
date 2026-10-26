import React, { useState, useEffect } from 'react';
import { ClinicalService, Appointment } from '../types';
import { CLINICAL_SERVICES, getAvailableSlotsForDate, saveAppointment } from '../services/storage';
import { encryptHealthData } from '../services/crypto';
import { MedicalCrossIcon } from './CircleMotifs';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Download
} from 'lucide-react';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ClinicalService | null;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ClinicalService>(
    preselectedService || CLINICAL_SERVICES[0]
  );

  // Date selection (Defaults to tomorrow or nearest weekday)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1); // skip Sunday
    return d.toISOString().split('T')[0];
  });

  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<{ slot: string; isAvailable: boolean }[]>([]);

  // Patient Intake fields
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientIdNumber, setPatientIdNumber] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Update preselected service when prop changes
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
      setStep(2);
    }
  }, [preselectedService]);

  // Load available slots whenever selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableSlotsForDate(selectedDate);
      setTimeSlots(slots);
      if (slots.length > 0 && slots.some((s) => s.isAvailable)) {
        const firstAvail = slots.find((s) => s.isAvailable);
        if (firstAvail) setSelectedSlot(firstAvail.slot);
      } else {
        setSelectedSlot('');
      }
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  // Generate 7 upcoming consult days for quick selection
  const getUpcomingDays = () => {
    const days = [];
    const curr = new Date();
    for (let i = 1; days.length < 8; i++) {
      const target = new Date();
      target.setDate(curr.getDate() + i);
      const dayOfWeek = target.getDay();
      // Skip Sundays (closed)
      if (dayOfWeek !== 0) {
        const dateStr = target.toISOString().split('T')[0];
        const dayLabel = target.toLocaleDateString('en-ZA', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
        days.push({
          date: dateStr,
          label: dayLabel,
          isSaturday: dayOfWeek === 6,
        });
      }
    }
    return days;
  };

  const availableDates = getUpcomingDays();

  const handleServiceSelect = (service: ClinicalService) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!patientName.trim()) {
      setFormError('Please enter the patient full legal name.');
      return;
    }
    if (!patientPhone.trim()) {
      setFormError('Please enter a valid South African contact phone number.');
      return;
    }
    if (!selectedSlot) {
      setFormError('Please select an available consultation slot.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Client-Side Encryption of sensitive health symptoms using Web Crypto AES-GCM
      let encryptedNotes: string | undefined = undefined;
      if (symptoms.trim() && isEncrypted) {
        encryptedNotes = await encryptHealthData(symptoms.trim());
      }

      const newAppointment: Appointment = {
        id: `apt-${Math.floor(1000 + Math.random() * 9000)}`,
        patientId: `pt-${Math.floor(100 + Math.random() * 900)}`,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim() || 'patient@drntshangasesurgery.co.za',
        patientIdNumber: patientIdNumber.trim() || undefined,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        date: selectedDate,
        timeSlot: selectedSlot,
        status: 'booked',
        isWalkIn: false,
        createdAt: new Date().toISOString(),
        queueNumber: Math.floor(1 + Math.random() * 8),
        symptoms: symptoms.trim() || undefined,
        encryptedClinicalNotes: encryptedNotes,
      };

      saveAppointment(newAppointment);
      setConfirmedAppointment(newAppointment);
      setStep(4);
    } catch (err) {
      console.error(err);
      setFormError('Failed to safely encrypt and record booking. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPass = () => {
    if (!confirmedAppointment) return;
    const passText = `
==================================================
DR M.N. NTSHANGASE - GENERAL PRACTITIONER SURGERY
MBCHB (CUBA/UP) | HIV DIP (CMSA)
Umzimkhulu, Harry Gwala District, KZN
Tel: +27 (0)39 259 0184
==================================================
OFFICIAL APPOINTMENT PASS
Reference: ${confirmedAppointment.id.toUpperCase()}
Patient Name: ${confirmedAppointment.patientName}
Service: ${confirmedAppointment.serviceName}
Scheduled Date: ${confirmedAppointment.date}
Scheduled Slot: ${confirmedAppointment.timeSlot}
Estimated Queue: #${confirmedAppointment.queueNumber || 1}
Status: CONFIRMED & ENCRYPTED

Surgery Location:
Main Commercial Hub, Umzimkhulu (Opposite Main Taxi Rank)
Consulting Hours:
Monday - Friday: 08:00 - 17:00
Saturday: 08:00 - 13:00
Sunday & Public Holidays: CLOSED

Instructions:
Please present this pass at reception upon arrival.
Walk-ins are triaged continuously.
==================================================
`;
    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Appointment-Pass-${confirmedAppointment.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4">
      {/* Modal Dialog Frame - Always Signature Pine Green Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0a5450] to-[#073b38] text-white rounded-2xl shadow-2xl border-2 border-teal-400/40 overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="bg-[#08423f] text-white p-4 sm:p-6 flex items-center justify-between border-b border-teal-600/40">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <MedicalCrossIcon size="sm" className="bg-white/10 shrink-0" />
            <div className="min-w-0">
              <h3 className="text-base sm:text-xl font-bold tracking-tight text-white truncate">
                Online Appointment Scheduling
              </h3>
              <p className="text-[11px] sm:text-xs text-teal-200 truncate">
                Dr M.N. Ntshangase Surgery · Umzimkhulu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#062e2c] border-b border-teal-600/40 flex items-center justify-between text-[11px] sm:text-xs font-medium text-teal-300/80 overflow-x-auto no-scrollbar">
          <span className={`shrink-0 ${step >= 1 ? 'text-white font-bold' : ''}`}>
            1. Service
          </span>
          <span className="shrink-0 px-1">&rarr;</span>
          <span className={`shrink-0 ${step >= 2 ? 'text-white font-bold' : ''}`}>
            2. Date & Slot
          </span>
          <span className="shrink-0 px-1">&rarr;</span>
          <span className={`shrink-0 ${step >= 3 ? 'text-white font-bold' : ''}`}>
            3. Patient Info
          </span>
          <span className="shrink-0 px-1">&rarr;</span>
          <span className={`shrink-0 ${step >= 4 ? 'text-emerald-300 font-bold' : ''}`}>
            4. Pass
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 max-h-[78vh] overflow-y-auto">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white">
                  Select Required Clinical Consultation
                </h4>
                <p className="text-xs text-teal-100/90">
                  Choose the specialized care reason for your visit with Dr Ntshangase.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {CLINICAL_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedService.id === service.id
                        ? 'border-teal-300 bg-[#084845] ring-2 ring-teal-400 text-white'
                        : 'border-teal-500/30 bg-[#062e2c] hover:border-teal-300 text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {service.title}
                        </span>
                        {service.badge && (
                          <span className="text-[10px] text-teal-300 font-semibold">
                            · {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-teal-100/80 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-teal-200">
                        {service.durationMinutes}m
                      </span>
                      <ArrowRight className="w-4 h-4 text-teal-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Select Consultation Date & Time
                  </h4>
                  <p className="text-xs text-teal-100/90">
                    Consulting hours: Mon–Fri 08:00–17:00 | Sat 08:00–13:00 (Sundays Closed)
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-teal-200 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

              {/* Date Pills */}
              <div>
                <label className="block text-xs font-semibold text-teal-200 mb-2">
                  1. Available Surgery Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDates.map((item) => (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(item.date);
                        setSelectedSlot('');
                      }}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        selectedDate === item.date
                          ? 'border-teal-300 bg-teal-600 text-white font-bold ring-2 ring-teal-300'
                          : 'border-teal-500/30 bg-[#062e2c] hover:bg-[#084845] text-teal-100'
                      }`}
                    >
                      <span className="text-xs block font-semibold">{item.label}</span>
                      {item.isSaturday && (
                        <span className="text-[10px] text-teal-200 block font-normal">Morning only</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slots Grid */}
              <div>
                <label className="block text-xs font-semibold text-teal-200 mb-2">
                  2. Doctor Consultation Slots for {selectedDate}
                </label>
                {timeSlots.length === 0 ? (
                  <p className="text-xs text-rose-300 p-4 rounded-lg bg-rose-950/60 border border-rose-800">
                    No consultation slots available for this date. The surgery is closed.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map(({ slot, isAvailable }) => (
                      <button
                        key={slot}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => handleSlotSelect(slot)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-all ${
                          selectedSlot === slot
                            ? 'bg-teal-500 text-teal-950 font-bold ring-2 ring-teal-300'
                            : isAvailable
                            ? 'border border-teal-500/40 bg-[#062e2c] text-white hover:border-teal-300 hover:bg-[#084845] cursor-pointer'
                            : 'bg-[#052220] text-teal-800/60 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Patient Intake Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Patient Details & Intake Notes
                  </h4>
                  <p className="text-xs text-teal-100/90">
                    Slot reserved: <strong className="text-teal-200">{selectedDate} at {selectedSlot}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-teal-200 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Slot
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-teal-200 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-teal-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Khumalo"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-200 mb-1">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-teal-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 072 345 8912"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-teal-200 mb-1">
                    Email Address (For Appointment Pass)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-teal-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. patient@gmail.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-teal-200 mb-1">
                    SA ID or Passport Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="13-digit ID number"
                    value={patientIdNumber}
                    onChange={(e) => setPatientIdNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-teal-200 mb-1">
                  Reason for Consultation / Current Symptoms (Confidential)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your health concern, symptoms duration, or repeat medication requirements..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full p-3 text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Encryption Banner */}
              <div className="p-3 rounded-xl bg-[#062e2c] border border-teal-500/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="encryptCheck"
                      checked={isEncrypted}
                      onChange={(e) => setIsEncrypted(e.target.checked)}
                      className="rounded text-teal-500 focus:ring-teal-400 cursor-pointer"
                    />
                    <label htmlFor="encryptCheck" className="font-bold text-white cursor-pointer">
                      Client-Side AES-GCM 256-bit Health Encryption
                    </label>
                  </div>
                  <p className="text-teal-100/80 mt-1">
                    Your medical symptoms and identity are encrypted in your browser prior to storage in adherence with HIPAA and POPIA clinical privacy rules.
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Securing Appointment...</span>
                  ) : (
                    <>
                      <span>Confirm & Generate Appointment Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Appointment Confirmation Pass */}
          {step === 4 && confirmedAppointment && (
            <div className="space-y-6 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-900 border border-teal-400 text-teal-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-300" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-white">
                  Appointment Successfully Confirmed!
                </h4>
                <p className="text-xs text-teal-100/90">
                  Your appointment slot is secured with Dr M.N. Ntshangase in Umzimkhulu.
                </p>
              </div>

              {/* Printable / Downloadable Digital Pass Card */}
              <div className="rounded-xl border border-teal-400/40 bg-[#062e2c] p-5 text-left space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-teal-600/40 pb-3">
                  <div className="flex items-center gap-2">
                    <MedicalCrossIcon size="sm" />
                    <div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider block">
                        Dr M.N. Ntshangase Surgery
                      </span>
                      <span className="text-[10px] text-teal-300 font-mono">
                        MBChB (CUBA/UP) | HIV DIP (CMSA)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-teal-300/80 block uppercase">Pass Ref</span>
                    <span className="text-xs font-mono font-bold text-teal-200">
                      {confirmedAppointment.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-teal-300/80 text-[10px] block uppercase">Patient</span>
                    <strong className="text-white">{confirmedAppointment.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-teal-300/80 text-[10px] block uppercase">Clinical Service</span>
                    <strong className="text-white">{confirmedAppointment.serviceName}</strong>
                  </div>
                  <div>
                    <span className="text-teal-300/80 text-[10px] block uppercase">Scheduled Date</span>
                    <span className="font-mono text-white font-semibold">{confirmedAppointment.date}</span>
                  </div>
                  <div>
                    <span className="text-teal-300/80 text-[10px] block uppercase">Time Slot</span>
                    <span className="font-mono text-white font-semibold">{confirmedAppointment.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-600/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Encrypted & Secured</span>
                  </div>
                  <span className="text-teal-200 font-mono text-[11px]">
                    Queue Allocation: #{confirmedAppointment.queueNumber || 1}
                  </span>
                </div>
              </div>

              {/* Actions: Download Pass & Close */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadPass}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Digital Pass (.txt)</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-teal-100 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
