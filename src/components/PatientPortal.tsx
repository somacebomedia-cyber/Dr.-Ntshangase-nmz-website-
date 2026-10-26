import React, { useState, useEffect } from 'react';
import { Appointment, PatientRecord } from '../types';
import { getAppointments, getPatients, cancelAppointment, updateAppointmentStatus } from '../services/storage';
import { decryptHealthData } from '../services/crypto';
import { MedicalCrossIcon, CircleMotif } from './CircleMotifs';
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  FileText,
  Pill,
  Download,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle,
  Search,
  ArrowRight,
  Plus
} from 'lucide-react';

interface PatientPortalProps {
  onOpenBooking: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ onOpenBooking }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pt-001');
  const [activeTab, setActiveTab] = useState<'appointments' | 'records' | 'prescriptions'>('appointments');
  const [decryptedNotes, setDecryptedNotes] = useState<Record<string, string>>({});
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const apts = getAppointments();
    const pts = getPatients();
    setAppointments(apts);
    setPatients(pts);
  };

  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Filter appointments for this patient
  const patientAppointments = appointments.filter(
    (a) =>
      a.patientId === selectedPatientId ||
      a.patientName.toLowerCase().includes(currentPatient?.fullName.toLowerCase() || '')
  );

  const handleDecryptNote = async (aptId: string, encryptedContent: string) => {
    if (decryptedNotes[aptId]) {
      // Toggle hide
      const copy = { ...decryptedNotes };
      delete copy[aptId];
      setDecryptedNotes(copy);
      return;
    }

    setDecryptingId(aptId);
    try {
      const plaintext = await decryptHealthData(encryptedContent);
      setDecryptedNotes((prev) => ({ ...prev, [aptId]: plaintext }));
    } catch (e) {
      console.error(e);
    } finally {
      setDecryptingId(null);
    }
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you wish to cancel this appointment?')) {
      cancelAppointment(id);
      loadData();
      setActionSuccess('Appointment successfully cancelled.');
      setTimeout(() => setActionSuccess(null), 4000);
    }
  };

  const handleCheckIn = (id: string) => {
    updateAppointmentStatus(id, 'checked-in');
    loadData();
    setActionSuccess('You have checked in at Dr Ntshangase surgery! Please proceed to reception.');
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleDownloadPass = (apt: Appointment) => {
    const passText = `
==================================================
DR M.N. NTSHANGASE - GENERAL PRACTITIONER SURGERY
MBCHB (CUBA/UP) | HIV DIP (CMSA)
Umzimkhulu, Harry Gwala District, KZN
Tel: +27 (0)39 259 0184
==================================================
APPOINTMENT DIGITAL PASS
Pass Reference: ${apt.id.toUpperCase()}
Patient Name: ${apt.patientName}
Service: ${apt.serviceName}
Scheduled Date: ${apt.date}
Scheduled Slot: ${apt.timeSlot}
Current Status: ${apt.status.toUpperCase()}
Queue Number: #${apt.queueNumber || 1}

Surgery Address:
Main Commercial Hub, Umzimkhulu
Consulting Hours: Mon-Fri 08:00-17:00, Sat 08:00-13:00
==================================================
`;
    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pass-${apt.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Floating Circles Motif */}
      <CircleMotif variant="ambient-orbs" />
      <CircleMotif variant="scatter-right" />

      {/* Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-teal-900/10 dark:border-teal-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-1">
            <span>Secure Patient Enclave</span>
            <span aria-hidden="true">·</span>
            <span>AES-GCM Encrypted</span>
            <span aria-hidden="true">·</span>
            <span>POPIA & HIPAA Compliant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Patient Portal & Health Records
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Review your consultations with Dr M.N. Ntshangase, manage digital passes, and access encrypted clinical notes.
          </p>
        </div>

        {/* Demo Patient Profile Switcher - Green Card */}
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#0a5450] to-[#073b38] text-white p-2.5 rounded-xl border border-teal-400/40 shadow-sm shrink-0 w-full sm:w-auto">
          <User className="w-4 h-4 text-teal-200 shrink-0" />
          <div className="flex flex-col text-xs min-w-0 flex-1">
            <span className="text-[10px] text-teal-200 uppercase tracking-wider font-semibold">Active Profile:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="font-bold text-white bg-transparent border-none focus:outline-none cursor-pointer truncate max-w-full"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#073b38] text-white">
                  {p.fullName} ({p.idNumber.slice(0, 6)}...)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Patient Vitals & Summary Strip - Green Cards */}
      {currentPatient && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl glass-panel">
            <span className="text-[11px] text-teal-200 uppercase tracking-wider block font-medium">
              Patient Full Name
            </span>
            <span className="text-base font-bold text-white mt-1 block">
              {currentPatient.fullName}
            </span>
            <span className="text-xs text-teal-100/80 font-mono mt-0.5 block">
              DOB: {currentPatient.dateOfBirth} ({currentPatient.gender})
            </span>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <span className="text-[11px] text-teal-200 uppercase tracking-wider block font-medium">
              Contact & Location
            </span>
            <span className="text-sm font-semibold text-white mt-1 block">
              {currentPatient.phone}
            </span>
            <span className="text-xs text-teal-100/80 truncate mt-0.5 block">
              {currentPatient.address}
            </span>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <span className="text-[11px] text-teal-200 uppercase tracking-wider block font-medium">
              Chronic Care Registry
            </span>
            <span className="text-sm font-bold text-teal-200 mt-1 block">
              {currentPatient.chronicConditions.length > 0
                ? currentPatient.chronicConditions.join(', ')
                : 'None registered'}
            </span>
            <span className="text-xs text-teal-100/80 mt-0.5 block">
              Blood Type: {currentPatient.bloodType || 'Pending'}
            </span>
          </div>

          <div className="p-4 rounded-xl glass-panel">
            <span className="text-[11px] text-teal-200 uppercase tracking-wider block font-medium">
              Known Drug Allergies
            </span>
            <span className="text-sm font-bold text-rose-300 mt-1 block">
              {currentPatient.allergies.length > 0
                ? currentPatient.allergies.join(', ')
                : 'No Known Drug Allergies'}
            </span>
            <span className="text-xs text-teal-100/80 mt-0.5 block">
              Last Visit: {currentPatient.lastVisitDate || 'First consult'}
            </span>
          </div>
        </div>
      )}

      {/* Portal Tabs Bar */}
      <div className="flex items-center gap-2 mb-6 border-b border-teal-900/10 dark:border-teal-500/20 pb-2 overflow-x-auto no-scrollbar max-w-full">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'bg-[#0a5450] text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
          }`}
        >
          My Scheduled Visits ({patientAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'prescriptions'
              ? 'bg-[#0a5450] text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
          }`}
        >
          Prescriptions & Medication Refills
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
            activeTab === 'records'
              ? 'bg-[#0a5450] text-white shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
          }`}
        >
          Encrypted Clinical History
        </button>
      </div>

      {/* TAB 1: Appointments List */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Upcoming & Past Appointments
            </h3>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0a5450] hover:bg-[#073b38] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Another Visit</span>
            </button>
          </div>

          {patientAppointments.length === 0 ? (
            <div className="text-center py-12 rounded-2xl glass-panel p-6">
              <Calendar className="w-10 h-10 text-teal-200 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">
                No Appointments on Record
              </h4>
              <p className="text-xs text-teal-100/80 mt-1 max-w-sm mx-auto">
                You currently do not have any scheduled consultations with Dr M.N. Ntshangase.
              </p>
              <button
                onClick={onOpenBooking}
                className="mt-4 px-4 py-2 text-xs font-semibold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-lg cursor-pointer"
              >
                Schedule First Consultation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {patientAppointments.map((apt) => {
                const isCancelled = apt.status === 'cancelled';
                const isCompleted = apt.status === 'completed';
                const isCheckedIn = apt.status === 'checked-in';
                const isInConsult = apt.status === 'in-consult';

                return (
                  <div
                    key={apt.id}
                    className="p-5 rounded-xl glass-panel transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">
                          {apt.serviceName}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-teal-900 text-teal-200 border border-teal-500/30'
                              : isCancelled
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : isInConsult
                              ? 'bg-teal-500 text-teal-950 font-bold animate-pulse'
                              : isCheckedIn
                              ? 'bg-amber-400 text-amber-950 font-semibold'
                              : 'bg-emerald-400 text-emerald-950 font-semibold'
                          }`}
                        >
                          {apt.status.toUpperCase()}
                        </span>
                        {apt.isWalkIn && (
                          <span className="text-[10px] font-medium text-teal-200">
                            (Walk-in Queue)
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-teal-100">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-300" />
                          <strong className="font-mono text-white">{apt.date}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-300" />
                          <strong className="font-mono text-white">{apt.timeSlot}</strong>
                        </span>
                        <span>
                          Ref: <strong className="font-mono text-teal-200">{apt.id.toUpperCase()}</strong>
                        </span>
                      </div>

                      {apt.symptoms && (
                        <p className="text-xs text-teal-200/90 italic">
                          "{apt.symptoms}"
                        </p>
                      )}

                      {/* Encrypted Clinical Note View for Patient */}
                      {apt.encryptedClinicalNotes && (
                        <div className="mt-2 pt-2 border-t border-teal-600/40 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-200 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                              Encrypted Clinical Record
                            </span>
                            <button
                              onClick={() => handleDecryptNote(apt.id, apt.encryptedClinicalNotes!)}
                              className="text-[11px] text-teal-200 hover:text-white underline flex items-center gap-1 cursor-pointer"
                            >
                              {decryptedNotes[apt.id] ? (
                                <>
                                  <EyeOff className="w-3 h-3" /> Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" /> Decrypt & View
                                </>
                              )}
                            </button>
                          </div>

                          {decryptedNotes[apt.id] && (
                            <div className="mt-2 p-2.5 rounded bg-[#062e2c] border border-teal-500/40 text-teal-100 font-mono text-xs">
                              {decryptedNotes[apt.id]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {!isCancelled && !isCompleted && (
                        <>
                          {!isCheckedIn && !isInConsult && (
                            <button
                              onClick={() => handleCheckIn(apt.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                            >
                              Check In Online
                            </button>
                          )}
                          <button
                            onClick={() => handleCancel(apt.id)}
                            className="px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-950/60 border border-rose-800/60 rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDownloadPass(apt)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white border border-teal-400/40 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-teal-300" />
                        <span>Pass</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Prescriptions & Meds */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Current Authorized Medications & Refill Schedule
            </h3>
            <span className="text-xs text-teal-800 dark:text-teal-300 font-mono">
              Dr M.N. Ntshangase Surgery Formulary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPatient.currentMedications.length > 0 ? (
              currentPatient.currentMedications.map((med, idx) => (
                <div key={idx} className="p-4 rounded-xl glass-panel flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-900 border border-teal-400/40 text-teal-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{med}</h4>
                    <p className="text-xs text-teal-100/90 mt-0.5">
                      Dispensed via Umzimkhulu surgery pharmacy protocol. Refill authorized upon clinical review.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-medium">Active Prescription</span>
                      <button
                        onClick={() => {
                          alert(`Repeat script request for "${med}" forwarded to Dr Ntshangase's desk for authorization.`);
                        }}
                        className="text-xs font-semibold text-teal-200 hover:text-white hover:underline cursor-pointer"
                      >
                        Request Repeat Script &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-teal-100 col-span-2 p-6 rounded-xl glass-panel text-center">
                No active chronic medications on file for this patient profile.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Encrypted Clinical History */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl glass-panel flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-100">
              <span className="font-bold block text-white text-sm">
                End-to-End Encrypted Patient Dossier
              </span>
              Clinical visit summaries are protected with client-side AES-GCM (256-bit). Neither external servers nor unauthorized personnel can inspect these medical notes.
            </div>
          </div>

          <div className="p-6 rounded-xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Clinical Examination & Consult Dossier
                </h4>
                <p className="text-xs text-teal-200">
                  Last clinical visit recorded on {currentPatient.lastVisitDate || 'N/A'}
                </p>
              </div>

              <button
                onClick={() =>
                  handleDecryptNote('patient-history', currentPatient.encryptedMedicalHistory || '')
                }
                className="px-3 py-1.5 text-xs font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                {decryptedNotes['patient-history'] ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Lock Dossier
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Unlock Encrypted Dossier
                  </>
                )}
              </button>
            </div>

            {decryptedNotes['patient-history'] ? (
              <div className="p-4 rounded-lg bg-[#062e2c] border border-teal-500/40 text-teal-100 text-xs font-mono leading-relaxed">
                {decryptedNotes['patient-history']}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#052220] border border-teal-800 text-teal-300/80 text-xs font-mono text-center">
                [Ciphertext Encrypted at Rest — Click 'Unlock Encrypted Dossier' with AES-GCM]
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
