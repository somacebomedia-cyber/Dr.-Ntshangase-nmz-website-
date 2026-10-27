/**
 * Centralized Image Assets
 * Direct Vite imports guarantee bundler resolution, fingerprinting, and 100% asset availability on Vercel and all deployment environments.
 */
import heroDoctorPortrait from './assets/images/hero_doctor_portrait_1793007985493.jpg';
import nurseTriagePortrait from './assets/images/nurse_triage_portrait_1793007989179.jpg';
import clinicalConsultationCare from './assets/images/clinical_consultation_care_1793007987133.jpg';
import surgeryReceptionDesk from './assets/images/surgery_reception_desk_1793007988902.jpg';
import facilityMedicalRoom from './assets/images/facility_medical_room_1793007986328.jpg';

// Reference photos from Dr Ntshangase surgery
import plaqueConsultingHours from './assets/aistudio/IMG_20260910_101243_738_081ecf3e.jpg';
import doorFilmCircles from './assets/aistudio/IMG_20260910_101257_883_9387b7f6.jpg';
import surgeryEntranceSign from './assets/aistudio/IMG_20260910_101312_918_e06909d7.jpg';
import referenceSignBoard from './assets/aistudio/IMG_992ab5d9-a133-401d-858c-b84af85c59c1_f6908198.jpg';

export const IMAGES = {
  heroDoctor: heroDoctorPortrait,
  nurseTriage: nurseTriagePortrait,
  clinicalConsultation: clinicalConsultationCare,
  surgeryReception: surgeryReceptionDesk,
  facilityRoom: facilityMedicalRoom,
  reference: {
    hoursPlaque: plaqueHoursImg(plaqueConsultingHours),
    doorFilm: doorFilmCircles,
    entranceSign: surgeryEntranceSign,
    signBoard: referenceSignBoard,
  },
} as const;

function plaqueHoursImg(src: string) {
  return src;
}

export default IMAGES;
