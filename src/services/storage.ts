import { Appointment, PatientRecord, DoctorProfile, ConsultingHoursConfig, ClinicalService } from '../types';
import { encryptHealthData, decryptHealthData } from './crypto';

const APPOINTMENTS_STORAGE_KEY = 'dr_ntshangase_appointments_v1';
const PATIENTS_STORAGE_KEY = 'dr_ntshangase_patients_v1';
const PROFILE_STORAGE_KEY = 'dr_ntshangase_profile_v1';

export const CLINICAL_SERVICES: ClinicalService[] = [
  {
    id: 'gen-consult',
    title: 'General Medical Consultation',
    subtitle: 'Primary Healthcare & Diagnostic Evaluation',
    description: 'Thorough clinical assessment, acute illness diagnosis, vital sign evaluation, prescription management, and specialist referral routing.',
    durationMinutes: 30,
    category: 'general',
    icon: 'Stethoscope',
    badge: 'Popular',
  },
  {
    id: 'hiv-care',
    title: 'HIV Care & ART Management',
    subtitle: 'CMSA Diploma Certified Clinical Counseling',
    description: 'Confidential viral load monitoring, CD4 tracking, Antiretroviral Therapy (ART) initiation & regimen review, PrEP/PEP consultation, and opportunistic infection prevention.',
    durationMinutes: 45,
    category: 'hiv',
    icon: 'ShieldCheck',
    badge: 'CMSA Certified',
  },
  {
    id: 'chronic-care',
    title: 'Chronic Illness Management',
    subtitle: 'Hypertension, Diabetes, Asthma & Cardiac Health',
    description: 'Structured continuous care plans, blood glucose & HbA1c tracking, blood pressure staging, medication titration, lifestyle counseling, and repeat script issuance.',
    durationMinutes: 30,
    category: 'chronic',
    icon: 'Activity',
  },
  {
    id: 'minor-surgery',
    title: 'Wound Care & Minor Surgery',
    subtitle: 'Debridement, Suturing, Abscess Drainage & Dressings',
    description: 'Sterile surgical dressings, acute laceration repair, stitch removal, burn management, incision and drainage of abscesses, and diabetic foot care.',
    durationMinutes: 45,
    category: 'procedures',
    icon: 'Bandage',
  },
  {
    id: 'wellness-check',
    title: 'Preventative Health & Screening',
    subtitle: 'Full Body Wellness & Occupational Screenings',
    description: 'Cardiovascular risk stratification, cervical & breast screening guidelines, cholesterol and lipid profile, urinalysis, and lifestyle health checkups.',
    durationMinutes: 30,
    category: 'general',
    icon: 'HeartPulse',
  },
];

export const CONSULTING_HOURS: ConsultingHoursConfig[] = [
  { dayName: 'Monday', dayIndex: 1, openTime: '08:00', closeTime: '17:00', isOpen: true },
  { dayName: 'Tuesday', dayIndex: 2, openTime: '08:00', closeTime: '17:00', isOpen: true },
  { dayName: 'Wednesday', dayIndex: 3, openTime: '08:00', closeTime: '17:00', isOpen: true },
  { dayName: 'Thursday', dayIndex: 4, openTime: '08:00', closeTime: '17:00', isOpen: true },
  { dayName: 'Friday', dayIndex: 5, openTime: '08:00', closeTime: '17:00', isOpen: true },
  { dayName: 'Saturday', dayIndex: 6, openTime: '08:00', closeTime: '13:00', isOpen: true, notes: 'Morning surgery only' },
  { dayName: 'Sunday & Public Holidays', dayIndex: 0, openTime: '00:00', closeTime: '00:00', isOpen: false, notes: 'Emergency triage only' },
];

export const DEFAULT_DOCTOR_PROFILE: DoctorProfile = {
  name: 'Dr M.N. Ntshangase',
  title: 'General Practitioner Surgery',
  qualifications: 'MBCHB (CUBA/UP) | HIV DIP (CMSA)',
  credentials: [
    'Bachelor of Medicine and Surgery (MBChB, Cuba / University of Pretoria)',
    'Diploma in HIV Medicine (CMSA - Colleges of Medicine of South Africa)',
    'HPCSA Registered Medical Practitioner',
    'Certified in Chronic Disease & Primary Emergency Care',
  ],
  practiceName: 'Dr M.N. Ntshangase General Practitioner Surgery',
  location: 'Main Commercial Hub, Umzimkhulu',
  district: 'Harry Gwala District',
  province: 'KwaZulu-Natal, 3297',
  phone: '+27 (0)39 259 0184',
  email: 'reception@drntshangasesurgery.co.za',
  emergencyHotline: '+27 (0)82 890 1234',
  consultingHours: CONSULTING_HOURS,
};

// Seed Patients
const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'pt-001',
    fullName: 'Sipho Khumalo',
    idNumber: '8405125289083',
    phone: '072 345 8912',
    email: 'sipho.k@gmail.com',
    dateOfBirth: '1984-05-12',
    gender: 'Male',
    address: 'Clydesdale Village, Umzimkhulu',
    bloodType: 'O+',
    chronicConditions: ['Hypertension (Stage 1)', 'Hyperlipidemia'],
    allergies: ['Penicillin'],
    currentMedications: ['Amlodipine 5mg daily', 'Atorvastatin 10mg nocte'],
    emergencyContact: {
      name: 'Nokuthula Khumalo',
      relationship: 'Spouse',
      phone: '071 987 6543',
    },
    lastVisitDate: '2026-10-14',
    encryptedMedicalHistory: 'Follow-up for BP control. BP today 128/82 mmHg. Adherence good. Repeat script for 3 months issued.',
  },
  {
    id: 'pt-002',
    fullName: 'Zandile Mthembu',
    idNumber: '9208240194082',
    phone: '083 456 7890',
    email: 'zandile.m@yahoo.com',
    dateOfBirth: '1992-08-24',
    gender: 'Female',
    address: 'Riverside Extension 3, Umzimkhulu',
    bloodType: 'A+',
    chronicConditions: ['Type 2 Diabetes Mellitus'],
    allergies: ['Sulfa drugs'],
    currentMedications: ['Metformin 850mg BD', 'Gliclazide 40mg OM'],
    emergencyContact: {
      name: 'Bongani Mthembu',
      relationship: 'Brother',
      phone: '082 112 3344',
    },
    lastVisitDate: '2026-10-18',
    encryptedMedicalHistory: 'HbA1c test result 6.8%. Dietary counseling reiterated. Foot exam clear, no peripheral neuropathy noted.',
  },
  {
    id: 'pt-003',
    fullName: 'Themba Dlamini',
    idNumber: '7611035623081',
    phone: '078 912 3456',
    email: 'themba.dlamini@workmail.co.za',
    dateOfBirth: '1976-11-03',
    gender: 'Male',
    address: 'Singisi Area, Umzimkhulu',
    bloodType: 'B+',
    chronicConditions: ['Asthma (Mild Persistent)'],
    allergies: ['None known'],
    currentMedications: ['Salbutamol Inhaler PRN', 'Budesonide 200mcg BD'],
    emergencyContact: {
      name: 'Gcinile Dlamini',
      relationship: 'Wife',
      phone: '079 555 1234',
    },
    lastVisitDate: '2026-09-30',
    encryptedMedicalHistory: 'Winter bronchospasm resolved. Peak expiratory flow rate 480 L/min. Refill authorized.',
  },
  {
    id: 'pt-004',
    fullName: 'Nomvula Cele',
    idNumber: '9803150245089',
    phone: '061 234 5678',
    email: 'nomvula.c@gmail.com',
    dateOfBirth: '1998-03-15',
    gender: 'Female',
    address: 'Madakeni Ward 4, Umzimkhulu',
    bloodType: 'O-',
    chronicConditions: [],
    allergies: ['Aspirin'],
    currentMedications: [],
    emergencyContact: {
      name: 'Thabo Cele',
      relationship: 'Father',
      phone: '061 999 8877',
    },
    lastVisitDate: '2026-10-20',
    encryptedMedicalHistory: 'Post-excision wound dressed. Wound edges clean, granulation tissue healthy. Suture removal scheduled in 4 days.',
  },
];

// Seed Appointments with today's date dynamically
function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTomorrowDateStr(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function initializeStorage() {
  const today = getTodayDateStr();
  const tomorrow = getTomorrowDateStr();

  // Initialize Patients if empty
  if (!localStorage.getItem(PATIENTS_STORAGE_KEY)) {
    // Encrypt medical history for seed patients
    Promise.all(
      INITIAL_PATIENTS.map(async (p) => {
        const encrypted = p.encryptedMedicalHistory
          ? await encryptHealthData(p.encryptedMedicalHistory)
          : '';
        return { ...p, encryptedMedicalHistory: encrypted };
      })
    ).then((encryptedPatients) => {
      localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(encryptedPatients));
    });
  }

  // Initialize Appointments if empty
  if (!localStorage.getItem(APPOINTMENTS_STORAGE_KEY)) {
    const seedAppointments: Appointment[] = [
      {
        id: 'apt-101',
        patientId: 'pt-001',
        patientName: 'Sipho Khumalo',
        patientPhone: '072 345 8912',
        patientEmail: 'sipho.k@gmail.com',
        serviceId: 'chronic-care',
        serviceName: 'Chronic Illness Management',
        date: today,
        timeSlot: '08:30',
        status: 'in-consult',
        isWalkIn: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        queueNumber: 1,
        symptoms: 'Quarterly blood pressure review and prescription renewal',
      },
      {
        id: 'apt-102',
        patientId: 'pt-002',
        patientName: 'Zandile Mthembu',
        patientPhone: '083 456 7890',
        patientEmail: 'zandile.m@yahoo.com',
        serviceId: 'hiv-care',
        serviceName: 'HIV Care & ART Management',
        date: today,
        timeSlot: '09:30',
        status: 'checked-in',
        isWalkIn: false,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        queueNumber: 2,
        symptoms: 'Routine viral load review and counseling session',
      },
      {
        id: 'apt-103',
        patientId: 'pt-004',
        patientName: 'Nomvula Cele',
        patientPhone: '061 234 5678',
        patientEmail: 'nomvula.c@gmail.com',
        serviceId: 'minor-surgery',
        serviceName: 'Wound Care & Minor Surgery',
        date: today,
        timeSlot: '10:30',
        status: 'booked',
        isWalkIn: true,
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        queueNumber: 3,
        symptoms: 'Dressing change and evaluation of left forearm healing',
      },
      {
        id: 'apt-104',
        patientId: 'pt-003',
        patientName: 'Themba Dlamini',
        patientPhone: '078 912 3456',
        patientEmail: 'themba.dlamini@workmail.co.za',
        serviceId: 'gen-consult',
        serviceName: 'General Medical Consultation',
        date: today,
        timeSlot: '14:00',
        status: 'booked',
        isWalkIn: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        queueNumber: 4,
        symptoms: 'Chest tightness following recent physical exertion',
      },
      {
        id: 'apt-105',
        patientId: 'pt-demo-new',
        patientName: 'Ayanda Ndlovu',
        patientPhone: '073 667 8901',
        patientEmail: 'ayanda.n@outlook.com',
        serviceId: 'wellness-check',
        serviceName: 'Preventative Health & Screening',
        date: tomorrow,
        timeSlot: '09:00',
        status: 'booked',
        isWalkIn: false,
        createdAt: new Date().toISOString(),
        queueNumber: 1,
        symptoms: 'Executive comprehensive health screening checkup',
      },
    ];

    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(seedAppointments));
  }

  if (!localStorage.getItem(PROFILE_STORAGE_KEY)) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_DOCTOR_PROFILE));
  }
}

// Appointment Repository
export function getAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error loading appointments:', e);
    return [];
  }
}

export function saveAppointment(appointment: Appointment): Appointment {
  const existing = getAppointments();
  const index = existing.findIndex((a) => a.id === appointment.id);
  if (index >= 0) {
    existing[index] = appointment;
  } else {
    existing.push(appointment);
  }
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(existing));
  return appointment;
}

export function updateAppointmentStatus(
  id: string,
  newStatus: Appointment['status'],
  clinicalNotes?: string
): Appointment | null {
  const list = getAppointments();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) return null;

  list[index].status = newStatus;
  if (clinicalNotes !== undefined) {
    list[index].encryptedClinicalNotes = clinicalNotes;
  }
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(list));
  return list[index];
}

export function cancelAppointment(id: string): boolean {
  return updateAppointmentStatus(id, 'cancelled') !== null;
}

// Patients Repository
export function getPatients(): PatientRecord[] {
  try {
    const raw = localStorage.getItem(PATIENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_PATIENTS;
  } catch (e) {
    console.error('Error loading patients:', e);
    return INITIAL_PATIENTS;
  }
}

export function getPatientById(id: string): PatientRecord | undefined {
  const list = getPatients();
  return list.find((p) => p.id === id);
}

export function savePatient(patient: PatientRecord): PatientRecord {
  const list = getPatients();
  const idx = list.findIndex((p) => p.id === patient.id);
  if (idx >= 0) {
    list[idx] = patient;
  } else {
    list.push(patient);
  }
  localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(list));
  return patient;
}

// Real-Time Surgery Open Status
export function getSurgeryOpenStatus(now: Date = new Date()): {
  isOpen: boolean;
  message: string;
  nextOpenNotice: string;
} {
  const day = now.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  if (day === 0) {
    return {
      isOpen: false,
      message: 'Closed today (Sunday)',
      nextOpenNotice: 'Opens Monday at 08:00 AM',
    };
  }

  if (day === 6) {
    // Saturday: 08:00 to 13:00
    const openMinutes = 8 * 60;
    const closeMinutes = 13 * 60;
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const remainingMinutes = closeMinutes - currentMinutes;
      const remH = Math.floor(remainingMinutes / 60);
      const remM = remainingMinutes % 60;
      return {
        isOpen: true,
        message: `Open Saturday Surgery (Closes at 13:00 - ${remH}h ${remM}m remaining)`,
        nextOpenNotice: 'Walk-ins Welcome',
      };
    } else if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        message: 'Opening soon this morning',
        nextOpenNotice: 'Opens at 08:00 AM',
      };
    } else {
      return {
        isOpen: false,
        message: 'Closed for Saturday afternoon',
        nextOpenNotice: 'Opens Monday at 08:00 AM',
      };
    }
  }

  // Weekdays: 08:00 to 17:00
  const openMinutes = 8 * 60;
  const closeMinutes = 17 * 60;
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    const remainingMinutes = closeMinutes - currentMinutes;
    const remH = Math.floor(remainingMinutes / 60);
    const remM = remainingMinutes % 60;
    return {
      isOpen: true,
      message: `Open for Consultations (Closes at 17:00 - ${remH}h ${remM}m left today)`,
      nextOpenNotice: 'Walk-ins Welcome',
    };
  } else if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      message: 'Closed overnight',
      nextOpenNotice: 'Opens today at 08:00 AM',
    };
  } else {
    return {
      isOpen: false,
      message: 'Closed for the day',
      nextOpenNotice: day === 5 ? 'Opens Saturday at 08:00 AM' : 'Opens tomorrow at 08:00 AM',
    };
  }
}

// Generate valid consultation slots for a chosen date
export function getAvailableSlotsForDate(dateStr: string): { slot: string; isAvailable: boolean }[] {
  const chosenDate = new Date(`${dateStr}T00:00:00`);
  const day = chosenDate.getDay();

  if (day === 0) {
    // Sunday: Closed
    return [];
  }

  const startHour = 8;
  const endHour = day === 6 ? 13 : 17; // 13:00 on Saturday, 17:00 on Mon-Fri

  const existingAppointments = getAppointments().filter(
    (a) => a.date === dateStr && a.status !== 'cancelled'
  );
  const bookedSlots = new Set(existingAppointments.map((a) => a.timeSlot));

  const slots: { slot: string; isAvailable: boolean }[] = [];
  for (let h = startHour; h < endHour; h++) {
    const slot1 = `${String(h).padStart(2, '0')}:00`;
    const slot2 = `${String(h).padStart(2, '0')}:30`;
    slots.push({ slot: slot1, isAvailable: !bookedSlots.has(slot1) });
    slots.push({ slot: slot2, isAvailable: !bookedSlots.has(slot2) });
  }

  return slots;
}
