# Dr M.N. Ntshangase GP Surgery — Web Application & Clinical Portal

A premium, elegant, and responsive digital surgery platform for Dr M.N. Ntshangase (MBChB Cuba/UP, HIV Dip CMSA) in Umzimkhulu. The platform seamlessly integrates online appointment scheduling, a secure encrypted patient portal, and an intuitive healthcare provider management dashboard, wrapped in an authentic glassmorphic interface inspired by the clinic's physical signage and circle motifs.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned during the interactive clarification phase:

- **Authentication & Access Model**: One-click role switcher with encrypted credential profiles, allowing seamless toggling between Patient Portal mode and Healthcare Provider (Dr. Ntshangase & Practice Staff) Dashboard mode.
- **Clinical Focus**: Deep specialization highlighted across general medical consultations, chronic disease management (hypertension, diabetes), HIV clinical care & antiretroviral therapy review (CMSA Diploma certified), and wound care.
- **Offline & Security Model**: Local-first encrypted browser storage (Web Crypto API AES-GCM) with automatic offline synchronization and clear connectivity status indicator.

---

### 1. Overview & Core Concept

- **What It Does**: Provides the Umzimkhulu community and surrounding KwaZulu-Natal / Eastern Cape region with 24/7 online appointment booking, digital intake, encrypted health record access, and walking queue transparency, while giving Dr Ntshangase and the clinic staff an intuitive dashboard to manage patient flow.
- **Target Audience**: 
  - **Patients & Families**: Seeking compassionate, high-quality primary healthcare, HIV wellness management, and chronic illness follow-ups.
  - **Clinical Team**: Dr M.N. Ntshangase and surgery staff who need to track appointments, register walk-ins, log clinical consult notes, and manage schedule availability.
- **Key Value**: Eliminates long waiting-room delays in rural/peri-urban clinics, protects sensitive patient information with client-side encryption, and honors the physical clinic's trusted brand identity.

---

### 2. User Experience & Visual Design

#### Visual Identity & Design System
- **Signage Palette Exact Match**:
  - Primary Brand Teal: `#0A5450` / Deep Pine `#073B38` (matching the surgery entrance sign and consultation hours board).
  - Accent Seafoam & Mint: `#14B8A6`, `#2DD4BF`, `#5EEAD4`, `#CCFBF1` (matching the frosted door graphics).
  - Neutral Canvas: Light mode `#F8FAFC` / crisp white `#FFFFFF`; Dark mode `#061A19` / obsidian teal `#0A2624`.
  - Contrast Borders: Hairline translucent borders (`border-white/20` or `border-teal-900/15`).
- **Signature Circle Motif & Glassmorphism**:
  - Custom SVG/CSS layered floating pebble and circle compositions directly echoing the entrance door film (`IMG_20260910_101257_883_9387b7f6.jpg`).
  - Frosted glass cards (`backdrop-blur-md bg-white/75 dark:bg-teal-950/50`) with smooth specular highlights.
- **Typography & Rhythm**:
  - Headings: `Plus Jakarta Sans` for clean, professional authority.
  - Body: `DM Sans` for high legibility at 15–16px across mobile and desktop.
  - Clinical Metrics & Hours: Tabular monospace numbers (`font-mono tabular-nums`) for appointment slots, consulting hours, and vitals.
- **Motion & Accessibility**:
  - Framer Motion page reveals, gentle floating circle animations, smooth modal transitions (<200ms).
  - Accessible contrast ratios meeting WCAG AA standards.
  - Accessible dark mode toggle with persistent local preference.

#### Core User Flows
1. **Public Practice Showcase & Discovery**:
   - Top Bar (One line brand wordmark: "Dr M.N. Ntshangase", 4 clean navigation links, "Book Appointment" CTA).
   - Hero section with practice credentials, surgery overview, and quick walk-in status pill.
   - Services Bento grid highlighting General Consultations, HIV Care (CMSA), Chronic Disease Clinic, and Wound Care.
   - Consulting Hours panel matching physical sign (Mon–Fri 08:00–17:00, Sat 08:00–13:00, Sun Closed, Walk-ins Welcome).
   - Interactive Practice Location & Contact guide for Umzimkhulu.
2. **Online Appointment Scheduling**:
   - Step 1: Select Service & Visit Reason.
   - Step 2: Choose Date & Time Slot (respecting real consulting hours and existing bookings).
   - Step 3: Enter Patient Details (with encrypted secure storage option).
   - Step 4: Instant Confirmation with Digital Appointment Pass (downloadable/printable).
3. **Patient Portal**:
   - View scheduled upcoming appointments and past visit summaries.
   - Secure personal health summary (allergies, chronic medications, vitals tracker).
   - Prescription refill request and doctor message inquiry.
4. **Healthcare Provider Dashboard (Dr & Staff)**:
   - Live daily schedule view & queue status (Scheduled, Waiting Room, In Consult, Completed).
   - Quick "Register Walk-in Patient" drawer.
   - Patient Medical Records directory with encrypted clinical notes editor.
   - Schedule slot blackout / emergency leave control.
   - Daily practice stats (total consults, active patients, walk-in vs pre-booked split).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Web Crypto Encryption for Medical Privacy**
  - *Chosen Approach*: Standard Web Crypto API (AES-GCM 256-bit) to encrypt patient health records, clinical notes, and sensitive visit reasons before writing to storage.
  - *Why*: Ensures strict privacy protection conforming to HIPAA and South Africa's POPIA health data guidelines without requiring external cloud backend dependencies.
  - *Alternative Considered*: Plaintext localStorage (rejected as insecure for healthcare data).
- **Decision 2: Universal Role Switcher & Pre-Populated Clinical Seed Data**
  - *Chosen Approach*: An intuitive role-switch toggle in the top navigation allowing reviewers and users to experience both the Patient view (book, view pass, check records) and the Doctor/Staff view (manage queue, write clinical notes, update hours).
  - *Why*: Provides immediate interactive evaluation of the entire dual-sided healthcare workflow.
- **Decision 3: Offline-First Architecture with Connectivity Indicator**
  - *Chosen Approach*: Auto-synchronizing offline database wrapper that intercepts reads/writes and maintains a non-intrusive network indicator banner when offline.
  - *Why*: Umzimkhulu is a regional hub where mobile connectivity can fluctuate; ensuring patients and staff can view their appointment passes and clinic hours offline is critical.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Dr M.N. Ntshangase Surgery                      │
│                             (React 19 + Vite)                          │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark, Links, Dark Toggle, Role Switcher)     │
├────────────────────────────────┬───────────────────────────────────────┤
│          Patient Flow          │             Provider Flow             │
│  - Practice Landing & Services │  - Daily Consult Schedule & Queue     │
│  - Interactive Booking Engine  │  - Walk-In Registration Drawer        │
│  - Digital Appointment Pass    │  - Encrypted Patient Records & Notes  │
│  - Patient Health Portal       │  - Slot Availability Controls         │
├────────────────────────────────┴───────────────────────────────────────┤
│                  Core State & Security Services                         │
│  - Security Engine: Web Crypto API (AES-GCM 256-bit encryption/decryption)│
│  - Storage Engine: Persistent Encrypted LocalStore / Offline Sync     │
│  - Theme Engine: Light/Dark Mode with CSS Custom Properties            │
│  - Motion Engine: Framer Motion Transitions & Floating Circles Canvas │
└────────────────────────────────────────────────────────────────────────┘
```

#### State & Data Entities
- `Appointment`: ID, patientId, patientName, phone, email, serviceType, date, timeSlot, status ('booked' | 'checked-in' | 'in-consult' | 'completed' | 'cancelled'), isWalkIn, encryptedNotes.
- `PatientRecord`: ID, fullName, idNumber, contactNumber, dateOfBirth, chronicConditions, allergies, currentMedications, encryptedClinicalHistory.
- `ConsultingSlot`: Day, startTime, endTime, capacity, isAvailable.
- `PracticeConfig`: Doctor name, qualifications, address (Umzimkhulu), contact phone, hours matrix.

---

### 5. Step-by-Step Implementation Sequence

1. **Brand Assets & Circle Theme Foundation**:
   - Embed high-resolution reference images from `/public/assets/aistudio/`.
   - Implement custom animated Circle Motif component with layered floating teal bubbles and curved horizon.
   - Configure global Tailwind tokens for medical deep teal (`#0A5450`), fresh mint, dark slate backgrounds, and glassmorphism.
2. **Encryption & Data Storage Engine**:
   - Implement `src/services/crypto.ts` with AES-GCM encryption/decryption and key derivation.
   - Implement `src/services/storage.ts` with offline persistence, seed data (appointments, sample patients, clinical notes).
3. **Public Landing Experience**:
   - Build Header adhering to Top Bar Contract (Wordmark, Nav links, Action CTA, Role Switcher, Dark Mode Toggle).
   - Hero banner with Doctor credentials: `MBChB (CUBA/UP) | HIV DIP (CMSA)`.
   - Specialization & Services showcase (General Medicine, HIV Care, Chronic Disease, Wound Care).
   - Authentic Consulting Hours card matching physical photo `IMG_20260910_101243_738_081ecf3e.jpg`.
   - Umzimkhulu location details, emergency guidelines, and patient testimonials.
4. **Interactive Appointment Booking Wizard**:
   - Multi-step booking modal / inline workflow with calendar date picker, time slot generation (08:00–17:00 M–F, 08:00–13:00 Sat), patient info validation, and confirmation pass generation.
5. **Patient Portal View**:
   - View my appointments, digital pass barcode, medication refill tracker, encrypted health profile.
6. **Provider Management Dashboard**:
   - Daily queue manager with live status updates (Checked In, In Consult, Done).
   - Rapid Walk-in registration tool.
   - Patient records table with encrypted clinical notes reader/editor.
   - Operating hours and slot availability manager.
7. **Offline Support & PWA Compliance**:
   - Offline detection hook with banner toast.
   - Service worker / manifest setup and in-app install prompt.
8. **Verification & Build Validation**:
   - Verify compilation with `compile_applet` and test responsiveness across all screen sizes.
