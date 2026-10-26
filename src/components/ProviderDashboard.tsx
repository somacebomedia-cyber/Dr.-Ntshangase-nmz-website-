import React, { useState, useEffect } from 'react';
import { Appointment, PatientRecord, AppointmentStatus } from '../types';
import {
  getAppointments,
  getPatients,
  saveAppointment,
  savePatient,
  updateAppointmentStatus,
  getSurgeryOpenStatus,
} from '../services/storage';
import { encryptHealthData, decryptHealthData } from '../services/crypto';
import { MedicalCrossIcon, CircleMotif } from './CircleMotifs';
import {
  Calendar,
  Clock,
  User,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  FileText,
  UserPlus,
  Stethoscope,
  ChevronRight,
  Eye,
  Lock,
  Unlock,
  Check,
  X
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [filterDate, setFilterDate] = useState<string>(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'queue' | 'patients'>('queue');
  const [searchQuery, setSearchQuery] = useState('');

  // Walk-in modal state
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInService, setWalkInService] = useState('General Medical Consultation');
  const [walkInSymptoms, setWalkInSymptoms] = useState('');

  // Clinical note editor state
  const [selectedAppointmentForNote, setSelectedAppointmentForNote] = useState<Appointment | null>(null);
  const [clinicalNoteText, setClinicalNoteText] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [decryptedNotes, setDecryptedNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAppointments(getAppointments());
    setPatients(getPatients());
  };

  // Filtered appointments by date and status
  const filteredAppointments = appointments.filter((a) => {
    const matchesDate = !filterDate || a.date === filterDate;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDate && matchesStatus && matchesSearch;
  });

  // Practice stats for today
  const todayAppointments = appointments.filter((a) => a.date === filterDate);
  const waitingRoomCount = todayAppointments.filter((a) => a.status === 'checked-in').length;
  const inConsultCount = todayAppointments.filter((a) => a.status === 'in-consult').length;
  const completedCount = todayAppointments.filter((a) => a.status === 'completed').length;
  const walkInCount = todayAppointments.filter((a) => a.isWalkIn).length;

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    updateAppointmentStatus(id, newStatus);
    loadData();
  };

  const handleRegisterWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const nextQueue = todayAppointments.length + 1;

    const walkInApt: Appointment = {
      id: `apt-w${Math.floor(100 + Math.random() * 900)}`,
      patientId: `pt-${Date.now()}`,
      patientName: walkInName.trim(),
      patientPhone: walkInPhone.trim() || 'N/A',
      patientEmail: 'reception@drntshangasesurgery.co.za',
      serviceId: 'walk-in',
      serviceName: walkInService,
      date: filterDate,
      timeSlot: timeStr,
      status: 'checked-in', // Walk-ins enter waiting room immediately
      isWalkIn: true,
      createdAt: now.toISOString(),
      queueNumber: nextQueue,
      symptoms: walkInSymptoms.trim() || 'Walk-in emergency triage / consultation',
    };

    saveAppointment(walkInApt);
    setWalkInName('');
    setWalkInPhone('');
    setWalkInSymptoms('');
    setShowWalkInModal(false);
    loadData();
  };

  const handleOpenNoteEditor = async (apt: Appointment) => {
    setSelectedAppointmentForNote(apt);
    if (apt.encryptedClinicalNotes) {
      const plain = await decryptHealthData(apt.encryptedClinicalNotes);
      setClinicalNoteText(plain);
    } else {
      setClinicalNoteText('');
    }
  };

  const handleSaveClinicalNote = async () => {
    if (!selectedAppointmentForNote) return;
    setIsSavingNote(true);

    try {
      const encrypted = await encryptHealthData(clinicalNoteText);
      updateAppointmentStatus(selectedAppointmentForNote.id, selectedAppointmentForNote.status, encrypted);
      setSelectedAppointmentForNote(null);
      setClinicalNoteText('');
      loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDecryptNoteInline = async (aptId: string, cipher: string) => {
    if (decryptedNotes[aptId]) {
      const next = { ...decryptedNotes };
      delete next[aptId];
      setDecryptedNotes(next);
      return;
    }
    const plain = await decryptHealthData(cipher);
    setDecryptedNotes((prev) => ({ ...prev, [aptId]: plain }));
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Floating Circles Motif */}
      <CircleMotif variant="ambient-orbs" />
      <CircleMotif variant="scatter-left" />

      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-teal-900/10 dark:border-teal-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider mb-1">
            <span>Healthcare Provider Console</span>
            <span aria-hidden="true">·</span>
            <span>Dr M.N. Ntshangase & Surgery Staff</span>
            <span aria-hidden="true">·</span>
            <span>Umzimkhulu Surgery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Daily Consulting Agenda & Queue Manager
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Monitor real-time patient queue, manage walk-in check-ins, and record encrypted clinical notes.
          </p>
        </div>

        {/* Rapid Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowWalkInModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0a5450] hover:bg-[#073b38] rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Check-in Walk-in Patient</span>
          </button>
        </div>
      </div>

      {/* KPI & Practice Metrics Cards - Always Signature Green Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="p-4 rounded-xl glass-panel">
          <span className="text-[11px] text-teal-200 font-semibold uppercase tracking-wider">
            Total for Date
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
            {todayAppointments.length}
          </p>
          <span className="text-xs text-teal-100/80 font-medium mt-1 block">Scheduled consults</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-amber-300/40">
          <span className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
            Waiting Room
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tabular-nums mt-1">
            {waitingRoomCount}
          </p>
          <span className="text-xs text-teal-100/80 font-medium mt-1 block">Checked-in & ready</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border-teal-300/40">
          <span className="text-[11px] text-teal-200 font-semibold uppercase tracking-wider">
            In Consult Room
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-teal-200 font-mono tabular-nums mt-1">
            {inConsultCount}
          </p>
          <span className="text-xs text-teal-100/80 font-medium mt-1 block">With Dr Ntshangase</span>
        </div>

        <div className="p-4 rounded-xl glass-panel">
          <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
            Completed Today
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums mt-1">
            {completedCount}
          </p>
          <span className="text-xs text-teal-100/80 font-medium mt-1 block">Concluded visits</span>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl glass-panel">
          <span className="text-[11px] text-teal-200 font-semibold uppercase tracking-wider">
            Walk-in Patients
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums mt-1">
            {walkInCount}
          </p>
          <span className="text-xs text-teal-100/80 font-medium mt-1 block">Direct arrivals</span>
        </div>
      </div>

      {/* Tabs and Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'queue'
                ? 'bg-[#0a5450] text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
            }`}
          >
            Today's Consult Queue
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'patients'
                ? 'bg-[#0a5450] text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30'
            }`}
          >
            Patient Registry ({patients.length})
          </button>
        </div>

        {/* Date Filter & Search */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-[#0a5450] text-white px-3 py-1.5 rounded-lg border border-teal-400/30 text-xs">
            <Calendar className="w-3.5 h-3.5 text-teal-200 shrink-0" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent border-none text-white font-mono focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#0a5450] text-white px-3 py-1.5 rounded-lg border border-teal-400/30 text-xs">
            <Filter className="w-3.5 h-3.5 text-teal-200 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none cursor-pointer w-full"
            >
              <option value="all" className="bg-[#073b38] text-white">All Statuses</option>
              <option value="checked-in" className="bg-[#073b38] text-white">Waiting Room</option>
              <option value="in-consult" className="bg-[#073b38] text-white">In Consult Room</option>
              <option value="booked" className="bg-[#073b38] text-white">Scheduled / Awaiting</option>
              <option value="completed" className="bg-[#073b38] text-white">Completed</option>
              <option value="cancelled" className="bg-[#073b38] text-white">Cancelled</option>
            </select>
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 text-teal-300 absolute left-3 top-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search patient or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-teal-400/30 bg-[#0a5450] text-white placeholder-teal-200/60 focus:outline-none focus:ring-1 focus:ring-teal-300"
            />
          </div>
        </div>
      </div>

      {/* TAB 1: Consult Queue Table */}
      {activeTab === 'queue' && (
        <div className="overflow-x-auto rounded-xl border border-teal-400/30 glass-panel shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#062e2c] border-b border-teal-600/40 text-teal-200 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Queue #</th>
                <th className="py-3.5 px-4">Slot</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4">Encrypted Notes</th>
                <th className="py-3.5 px-4 text-right">Queue Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-600/30">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-teal-200">
                    No appointments found matching the selected date and filters.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => {
                  const isCheckedIn = apt.status === 'checked-in';
                  const isInConsult = apt.status === 'in-consult';
                  const isCompleted = apt.status === 'completed';
                  const isCancelled = apt.status === 'cancelled';

                  return (
                    <tr
                      key={apt.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-teal-200">
                        #{apt.queueNumber || '—'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-white font-semibold">
                        {apt.timeSlot}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">
                          {apt.patientName}
                        </div>
                        <div className="text-[10px] text-teal-200/80 font-mono">
                          {apt.patientPhone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-teal-100">
                        {apt.serviceName}
                      </td>
                      <td className="py-3.5 px-4">
                        {apt.isWalkIn ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-teal-900 border border-teal-400/40 text-teal-200 font-semibold">
                            Walk-in
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-[#062e2c] border border-teal-500/30 text-teal-200">
                            Booked
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] rounded-full font-semibold ${
                            isInConsult
                              ? 'bg-teal-400 text-teal-950 font-bold animate-pulse'
                              : isCheckedIn
                              ? 'bg-amber-400 text-amber-950 font-bold'
                              : isCompleted
                              ? 'bg-teal-900 text-teal-200 border border-teal-500/30'
                              : isCancelled
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-400 text-emerald-950 font-bold'
                          }`}
                        >
                          {apt.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {apt.encryptedClinicalNotes ? (
                          <div className="space-y-1">
                            <button
                              onClick={() => handleDecryptNoteInline(apt.id, apt.encryptedClinicalNotes!)}
                              className="inline-flex items-center gap-1 text-[11px] text-teal-200 hover:text-white underline cursor-pointer"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                              <span>{decryptedNotes[apt.id] ? 'Hide Note' : 'Decrypt Note'}</span>
                            </button>
                            {decryptedNotes[apt.id] && (
                              <div className="p-2 rounded bg-[#062e2c] border border-teal-500/40 text-teal-100 font-mono text-[11px] max-w-xs">
                                {decryptedNotes[apt.id]}
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenNoteEditor(apt)}
                            className="inline-flex items-center gap-1 text-[11px] text-teal-200 hover:text-white underline cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Clinical Note</span>
                          </button>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isCheckedIn && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'in-consult')}
                              className="px-2.5 py-1 text-[11px] font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded transition-colors cursor-pointer"
                              title="Call into consult room"
                            >
                              Call In
                            </button>
                          )}
                          {isInConsult && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'completed')}
                              className="px-2.5 py-1 text-[11px] font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded transition-colors cursor-pointer"
                              title="Conclude consultation"
                            >
                              Finish
                            </button>
                          )}
                          {!isCheckedIn && !isInConsult && !isCompleted && !isCancelled && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'checked-in')}
                              className="px-2 py-1 text-[11px] font-semibold text-white bg-[#062e2c] border border-teal-400/40 hover:bg-[#084845] rounded cursor-pointer"
                              title="Mark as arrived at surgery"
                            >
                              Arrived
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenNoteEditor(apt)}
                            className="p-1 text-teal-200 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                            title="Edit clinical record note"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          {!isCancelled && !isCompleted && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'cancelled')}
                              title="Cancel slot"
                              className="p-1 text-rose-300 hover:bg-rose-950/60 rounded cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Patient Registry Directory */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((p) => (
              <div key={p.id} className="p-5 rounded-xl glass-panel space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-base">
                    {p.fullName}
                  </div>
                  <span className="text-[10px] font-mono text-teal-200">
                    ID: {p.idNumber.slice(0, 6)}...
                  </span>
                </div>

                <div className="text-xs space-y-1.5 text-teal-100">
                  <p><strong className="text-white">Phone:</strong> {p.phone}</p>
                  <p><strong className="text-white">DOB:</strong> {p.dateOfBirth} ({p.gender})</p>
                  <p><strong className="text-white">Address:</strong> {p.address}</p>
                  <p>
                    <strong className="text-white">Chronic Conditions:</strong>{' '}
                    <span className="text-teal-200 font-semibold">
                      {p.chronicConditions.join(', ') || 'None'}
                    </span>
                  </p>
                  <p>
                    <strong className="text-white">Allergies:</strong>{' '}
                    <span className="text-rose-300 font-semibold">
                      {p.allergies.join(', ') || 'None'}
                    </span>
                  </p>
                  <p><strong className="text-white">Last Visit:</strong> {p.lastVisitDate || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WALK-IN MODAL - Always Signature Green Card */}
      {showWalkInModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#0a5450] to-[#073b38] text-white rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-teal-400/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-teal-600/40">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-300" />
                <h3 className="font-bold text-base text-white">
                  Register Walk-in Patient
                </h3>
              </div>
              <button
                onClick={() => setShowWalkInModal(false)}
                className="text-teal-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-teal-200 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Busi Sithole"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-teal-200 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 082 123 4567"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-teal-200 mb-1">
                  Service Required
                </label>
                <select
                  value={walkInService}
                  onChange={(e) => setWalkInService(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-teal-500/50 bg-[#062e2c] text-white focus:outline-none focus:ring-1 focus:ring-teal-300 cursor-pointer"
                >
                  <option value="General Medical Consultation" className="bg-[#073b38]">General Medical Consultation</option>
                  <option value="HIV Care & ART Review" className="bg-[#073b38]">HIV Care & ART Review (CMSA)</option>
                  <option value="Chronic Illness Triage" className="bg-[#073b38]">Chronic Illness Triage</option>
                  <option value="Wound Care & Dressing" className="bg-[#073b38]">Wound Care & Dressing</option>
                  <option value="Acute Trauma / Emergency" className="bg-[#073b38]">Acute Trauma / Emergency</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-teal-200 mb-1">
                  Triage Observation / Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="Presenting symptoms or vital triage observations..."
                  value={walkInSymptoms}
                  onChange={(e) => setWalkInSymptoms(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300"
                />
              </div>

              <div className="p-2.5 rounded bg-[#062e2c] border border-teal-500/40 text-[11px] text-teal-100">
                Walk-in will immediately appear in the Waiting Room queue with next available sequence number.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Admit to Waiting Room Queue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ENCRYPTED CLINICAL NOTE MODAL - Always Signature Green Card */}
      {selectedAppointmentForNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#0a5450] to-[#073b38] text-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border-2 border-teal-400/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-teal-600/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-300" />
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Confidential Clinical Consultation Note
                  </h3>
                  <p className="text-[10px] text-teal-200">
                    Patient: {selectedAppointmentForNote.patientName} · Ref: {selectedAppointmentForNote.id.toUpperCase()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointmentForNote(null)}
                className="text-teal-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-teal-200 mb-1">
                  Doctor Clinical Examination & Prescription Notes
                </label>
                <textarea
                  rows={6}
                  placeholder="Record objective vitals (BP, PR, temp, glucose), physical exam findings, assessment, prescription changes, and next review date..."
                  value={clinicalNoteText}
                  onChange={(e) => setClinicalNoteText(e.target.value)}
                  className="w-full p-3 font-mono text-xs rounded-lg border border-teal-500/50 bg-[#062e2c] text-white placeholder-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#062e2c] border border-teal-500/40 text-[11px] text-teal-100 flex items-start gap-2">
                <Lock className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                <span>
                  Notes are encrypted with <strong>AES-GCM 256-bit</strong> prior to persisting. Only authorized practice profiles can decrypt and read this note.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppointmentForNote(null)}
                  className="px-4 py-2 text-xs text-teal-200 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingNote}
                  onClick={handleSaveClinicalNote}
                  className="px-4 py-2 text-xs font-bold text-teal-950 bg-teal-300 hover:bg-teal-200 rounded-lg shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSavingNote ? 'Encrypting & Saving...' : 'Save Encrypted Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
