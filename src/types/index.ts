/**
 * Data models for Dr M.N. Ntshangase GP Surgery
 */

export type UserRole = 'patient' | 'provider';

export type AppointmentStatus = 'booked' | 'checked-in' | 'in-consult' | 'completed' | 'cancelled';

export interface ClinicalService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  category: 'general' | 'hiv' | 'chronic' | 'procedures';
  icon: string;
  badge?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientIdNumber?: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  status: AppointmentStatus;
  isWalkIn: boolean;
  createdAt: string;
  symptoms?: string;
  encryptedClinicalNotes?: string;
  queueNumber?: number;
  reminderSent?: boolean;
}

export interface PatientRecord {
  id: string;
  fullName: string;
  idNumber: string; // RSA ID format or Passport
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Other';
  address: string;
  bloodType?: string;
  chronicConditions: string[];
  allergies: string[];
  currentMedications: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  lastVisitDate?: string;
  encryptedMedicalHistory?: string;
}

export interface ConsultingHoursConfig {
  dayName: string;
  dayIndex: number; // 0=Sun, 1=Mon, ..., 6=Sat
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  notes?: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  qualifications: string;
  credentials: string[];
  practiceName: string;
  location: string;
  district: string;
  province: string;
  phone: string;
  email: string;
  emergencyHotline: string;
  consultingHours: ConsultingHoursConfig[];
}
