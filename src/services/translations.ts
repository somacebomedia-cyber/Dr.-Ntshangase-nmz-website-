import { Language } from '../types';

export interface Translations {
  nav: {
    overview: string;
    services: string;
    hours: string;
    portal: string;
    dashboard: string;
    bookAppointment: string;
    referencePhotos: string;
    language: string;
    patientRole: string;
    providerRole: string;
    lightMode: string;
    darkMode: string;
    surgerySignage: string;
  };
  hero: {
    kicker: string;
    titleStart: string;
    titleAccent: string;
    body: string;
    bookCta: string;
    exploreCta: string;
    signageCta: string;
    consultationsCount: string;
    ratingText: string;
    locationHub: string;
    doctorTitle: string;
    doctorSubtitle: string;
    doctorStatus: string;
    doctorStatusSub: string;
    emergencyBadge: string;
    emergencyBadgeSub: string;
  };
  quickBooking: {
    kicker: string;
    title: string;
    subtitle: string;
    emergencyTitle: string;
    emergencySub: string;
    emergencyBadge: string;
    medicalTitle: string;
    medicalSub: string;
    medicalBadge: string;
    hivTitle: string;
    hivSub: string;
    hivBadge: string;
    chronicTitle: string;
    chronicSub: string;
    chronicBadge: string;
    scheduleCta: string;
  };
  facilities: {
    kicker: string;
    title: string;
    subtitle: string;
    walkinNoticeTitle: string;
    walkinNoticeBody: string;
    scopeLabel: string;
    procedureHeader: string;
    procedureDesc: string;
    includedHeader: string;
    equipmentHeader: string;
    standardsLabel: string;
    estimatedTime: string;
    scheduleBtn: string;
    viewDetailsBelow: string;
    viewingDetails: string;
    quickBook: string;
    backToDepartments: string;
  };
  urgentBanner: {
    walkinBadge: string;
    title: string;
    body: string;
    priorityBtn: string;
    hoursBtn: string;
    callReception: string;
    bedsideLabel: string;
    triageTitle: string;
    triageSub: string;
    popiaTitle: string;
    popiaSub: string;
  };
  billing: {
    kicker: string;
    title: string;
    body: string;
    receptionLabel: string;
    receptionSub: string;
    ediBillingTitle: string;
    ediBillingSub: string;
    contractedBadge: string;
    schemesHeader: string;
    paymentMethods: string;
    hpcsaTariff: string;
    guarantee1: string;
    guarantee2: string;
    guarantee3: string;
    guarantee4: string;
    guarantee5: string;
    ctaBtn: string;
    queriesText: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    verified: string;
  };
  team: {
    kicker: string;
    title: string;
    subtitle: string;
    leadGp: string;
    clinicalStaff: string;
    bookVisit: string;
  };
  hoursCard: {
    bannerTitle: string;
    monFri: string;
    saturday: string;
    sundayHolidays: string;
    closed: string;
    walkinsWelcome: string;
    openNow: string;
    closedNow: string;
    selectSlot: string;
  };
  scheduleSection: {
    kicker: string;
    title: string;
    body: string;
    viewSignagePhotos: string;
    scheduleAppointment: string;
  };
  faqs: {
    kicker: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  footer: {
    practiceDesc: string;
    portalBadge: string;
    departmentsTitle: string;
    dep1: string;
    dep2: string;
    dep3: string;
    dep4: string;
    dep5: string;
    hoursTitle: string;
    viewPhotos: string;
    locationTitle: string;
    bookNowBtn: string;
    allRightsReserved: string;
    accreditation: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      overview: 'Overview',
      services: 'Facilities & Services',
      hours: 'Consulting Hours',
      portal: 'Patient Portal',
      dashboard: 'Dr Console',
      bookAppointment: 'Book Appointment',
      referencePhotos: 'Gallery',
      language: 'Language',
      patientRole: 'Patient',
      providerRole: 'Dr & Staff',
      lightMode: 'Light',
      darkMode: 'Dark',
      surgerySignage: 'Gallery',
    },
    hero: {
      kicker: 'Umzimkhulu Surgery · Harry Gwala District · MBChB (Cuba/UP) · HIV Dip (CMSA)',
      titleStart: 'Exceptional Care,',
      titleAccent: 'Every Time.',
      body: "Welcome to the private surgery of Dr M.N. Ntshangase in Umzimkhulu. Providing dignified general medicine, specialized HIV viral suppression, chronic illness management, and sterile wound care with strict client-side privacy.",
      bookCta: 'Book Appointment',
      exploreCta: 'Find Service & Rates',
      signageCta: 'Gallery',
      consultationsCount: '15,000+ Consultations in Umzimkhulu & Harry Gwala',
      ratingText: '4.9 / 5.0 Rating',
      locationHub: 'Umzimkhulu Central Hub',
      doctorTitle: 'Dr M.N. Ntshangase',
      doctorSubtitle: 'Lead Medical Practitioner · MBChB (Cuba/UP) · HIV Dip (CMSA)',
      doctorStatus: 'Dr Ntshangase Online',
      doctorStatusSub: 'Open for Bookings & Walk-ins',
      emergencyBadge: 'Emergency Walk-ins',
      emergencyBadgeSub: 'Triaged upon arrival daily',
    },
    quickBooking: {
      kicker: 'Fast Clinical Intake',
      title: 'Easily Book Your Doctor',
      subtitle: 'Select a specialized care stream for scheduled appointments or visit our Umzimkhulu surgery as a walk-in patient.',
      emergencyTitle: 'Emergency & Urgent Care',
      emergencySub: 'Immediate walk-in triage & acute treatment',
      emergencyBadge: 'Walk-in Welcome',
      medicalTitle: 'Medical Center & GP',
      medicalSub: 'Full physical check-up & diagnostic consultation',
      medicalBadge: '30 Mins',
      hivTitle: 'HIV & ART Specialist Clinic',
      hivSub: 'Certified CMSA immunological viral suppression',
      hivBadge: 'CMSA Diploma',
      chronicTitle: 'Chronic Care & Minor Surgery',
      chronicSub: 'Diabetes, hypertension & sterile surgical dressing',
      chronicBadge: 'Comprehensive',
      scheduleCta: 'Schedule Consultation',
    },
    facilities: {
      kicker: 'Clinical Departments · Comprehensive Care · Umzimkhulu Surgery',
      title: 'Facilities and Services',
      subtitle: "Explore the specialized medical facilities available at Dr M.N. Ntshangase's surgery. Select any department below to view clinical capabilities and schedule your consultation.",
      walkinNoticeTitle: 'Need Walk-in Attention?',
      walkinNoticeBody: 'You can walk in directly without pre-booking Monday–Friday (08:00–17:00) and Saturday (08:00–13:00).',
      scopeLabel: 'Clinical Department',
      procedureHeader: 'Procedure & Patient Care Overview',
      procedureDesc: 'Every patient receives confidential, unhurried attention with full adherence to national clinical protocols and ethical privacy guidelines.',
      includedHeader: 'What is Included in this Service:',
      equipmentHeader: 'Diagnostic Facility & Equipment:',
      standardsLabel: 'HPCSA & CMSA Standards',
      estimatedTime: 'Estimated Time',
      scheduleBtn: 'Schedule Consultation',
      viewDetailsBelow: 'Tap to view details below',
      viewingDetails: 'Viewing details below',
      quickBook: 'Book',
      backToDepartments: '↑ Back to department list',
    },
    urgentBanner: {
      walkinBadge: 'Walk-ins Welcome Daily · 08:00 – 17:00',
      title: 'Urgent Medical Care & Walk-in Consultations',
      body: "Experiencing sudden fever, injury, severe distress, or needing urgent chronic ART medication renewal? Walk directly into Dr M.N. Ntshangase's surgery in Umzimkhulu. Patients are triaged upon arrival by our qualified clinical nursing team.",
      priorityBtn: 'Book Priority Slot Online',
      hoursBtn: 'Check Consulting Hours',
      callReception: 'Call Reception (+27 39 259 0184)',
      bedsideLabel: 'Compassionate Clinical Bedside Care',
      triageTitle: 'Immediate Triage',
      triageSub: 'Vitals checked on arrival',
      popiaTitle: 'POPIA Encrypted',
      popiaSub: 'Confidential records',
    },
    billing: {
      kicker: 'Transparent Financial Policy',
      title: 'Health Insurance and Billing Information',
      body: "At Dr M.N. Ntshangase's surgery, quality clinical care comes with complete pricing transparency. We eliminate confusion by providing clear upfront costs, processing medical scheme claims directly, and offering compassionate fee options for pensioners and community members in Umzimkhulu.",
      receptionLabel: 'Practice Reception',
      receptionSub: 'Friendly Check-In & Claims Desk',
      ediBillingTitle: 'Direct Medical Aid Billing',
      ediBillingSub: 'Real-time EDI Claims',
      contractedBadge: 'Contracted Rates',
      schemesHeader: 'Accepted South African Schemes:',
      paymentMethods: 'Card, Cash & EFT Accepted',
      hpcsaTariff: 'HPCSA Tariff Compliant',
      guarantee1: 'Direct Electronic Claims (EDI) submitted in real-time to your medical scheme',
      guarantee2: 'Transparent flat-rate consultation fee for private cash & self-paying patients',
      guarantee3: 'Subsidized compassionate rate for SASSA pensioners and vulnerable community members',
      guarantee4: 'Detailed itemized receipts provided instantly for tax and medical savings refund',
      guarantee5: 'Zero surprise co-payments on contracted standard primary care consultations',
      ctaBtn: 'Book With Medical Aid or Cash',
      queriesText: 'Queries? Call +27 39 259 0184',
    },
    testimonials: {
      kicker: 'Community Trust',
      title: "Patient's Testimonials",
      subtitle: 'Read authentic experiences from patients receiving primary care and specialized medicine at our surgery.',
      verified: 'Verified Patient',
    },
    team: {
      kicker: 'Medical Professionals',
      title: 'Meet Our Team',
      subtitle: 'A compassionate, HPCSA-accredited clinical care team dedicated to patient health and dignity in Umzimkhulu.',
      leadGp: 'Lead GP',
      clinicalStaff: 'Clinical Staff',
      bookVisit: 'Book Visit',
    },
    hoursCard: {
      bannerTitle: 'CONSULTING HOURS',
      monFri: 'MONDAY – FRIDAY',
      saturday: 'SATURDAY',
      sundayHolidays: 'SUNDAY & PUBLIC HOLIDAYS',
      closed: 'CLOSED',
      walkinsWelcome: 'Walk-ins Welcome Daily',
      openNow: 'Surgery Open Now',
      closedNow: 'Currently Closed',
      selectSlot: 'Select Slot',
    },
    scheduleSection: {
      kicker: 'Practice Operations',
      title: 'Consulting Hours & Physical Surgery Access',
      body: 'Dr M.N. Ntshangase operates an open walk-in policy throughout all standard surgery hours. Whether you require acute triage, routine check-ups, or chronic medication collection, our clinical doors in Umzimkhulu are open to the entire Harry Gwala community.',
      viewSignagePhotos: 'Gallery',
      scheduleAppointment: 'Schedule Appointment',
    },
    faqs: {
      kicker: 'Patient Guidance',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about visiting Dr M.N. Ntshangase in Umzimkhulu.',
      q1: 'Can I walk in without an online appointment?',
      a1: 'Yes! As stated on our physical surgery plaque, walk-ins are warmly welcomed during all consulting hours (08:00–17:00 weekdays, 08:00–13:00 Saturdays). Walk-in patients are triaged at reception upon arrival.',
      q2: 'What does the HIV Dip (CMSA) qualification mean?',
      a2: 'Dr Ntshangase holds the Diploma in HIV Medicine from the Colleges of Medicine of South Africa (CMSA), certifying specialized clinical competence in antiretroviral therapy (ART), viral suppression, and immunological management.',
      q3: 'How is my medical data protected online?',
      a3: 'We employ client-side Web Crypto API AES-GCM (256-bit) encryption. All clinical notes and symptoms are encrypted in your local browser before storage, fulfilling both HIPAA and South Africa POPIA requirements.',
      q4: 'What should I bring to my consultation?',
      a4: 'Please bring your South African ID card or passport, your digital appointment pass (saved on your phone or printed), medical aid card if applicable, and all current chronic medications or clinic road-to-health cards.',
    },
    footer: {
      practiceDesc: 'Dignified primary healthcare, certified HIV viral suppression management, continuous chronic treatment, and sterile minor surgery serving the Umzimkhulu and Harry Gwala community.',
      portalBadge: 'Client-Side AES-256 Encrypted Health Portal',
      departmentsTitle: 'Departments & Care',
      dep1: 'General Medical Practice & Check-ups',
      dep2: 'HIV Medicine & Antiretroviral (ART) Clinic',
      dep3: 'Hypertension & Diabetes Chronic Management',
      dep4: 'Minor Surgery, Suture & Wound Dressing',
      dep5: 'Point-of-Care Laboratory Rapid Screening',
      hoursTitle: 'Consulting Hours',
      viewPhotos: 'Gallery →',
      locationTitle: 'Practice Location',
      bookNowBtn: 'Book Appointment Now',
      allRightsReserved: 'Dr M.N. Ntshangase General Practitioner Surgery. All rights reserved.',
      accreditation: 'HPCSA Registered Practice · CMSA Diploma Accredited · POPIA & HIPAA Encrypted',
    },
  },
  zu: {
    nav: {
      overview: 'Isifinyezo',
      services: 'Izinsiza & Nemicikilisho',
      hours: 'Izikhathi Zokubona Udokotela',
      portal: 'Ingosi Yeziguli',
      dashboard: 'Ideski Likadokotela',
      bookAppointment: 'Bhukha Isikhathi',
      referencePhotos: 'Igalari',
      language: 'Ulimi',
      patientRole: 'Isiguli',
      providerRole: 'Udokotela & Abasebenzi',
      lightMode: 'Ukukhanya',
      darkMode: 'Ubumnyama',
      surgerySignage: 'Igalari',
    },
    hero: {
      kicker: 'Ukuhlinzwa Kase-Mzimkhulu · Isifunda sase-Harry Gwala · MBChB (Cuba/UP) · HIV Dip (CMSA)',
      titleStart: 'Ukunakekelwa Okusezingeni,',
      titleAccent: 'Ngaso Sonke Isikhathi.',
      body: "Siyakwamukela endaweni yokuhlinza ezimele kaDkt M.N. Ntshangase eMzimkhulu. Sinikezela ngokwelashwa okunesizotha kwezokwelapha jikelele, ukulawulwa kwegciwane lesandulela ngculazi (HIV), ukwelashwa kwezifo ezingamahlalakhona, nokubopha amanxeba ngokugcina imfihlo yesiguli.",
      bookCta: 'Bhukha Isikhathi Sokubonana',
      exploreCta: 'Buka Izinsiza & Amanani',
      signageCta: 'Igalari',
      consultationsCount: 'Ukubonisana Okungaphezu kuka-15,000+ eMzimkhulu nase-Harry Gwala',
      ratingText: 'Isilinganiso sika-4.9 / 5.0',
      locationHub: 'Isikhungo SaseMzimkhulu',
      doctorTitle: 'UDkt M.N. Ntshangase',
      doctorSubtitle: 'Udokotela Omkhulu Wokwelapha · MBChB (Cuba/UP) · HIV Dip (CMSA)',
      doctorStatus: 'UDkt Ntshangase Ukhona',
      doctorStatusSub: 'Kuvuliwe Ukubhukha & Nabafikayo',
      emergencyBadge: 'Abaphuthumayo & Nabangabhukhanga',
      emergencyBadgeSub: 'Bahlolwa ngokushesha lapho befika nsuku zonke',
    },
    quickBooking: {
      kicker: 'Ukwamukelwa Okusheshayo',
      title: 'Bhukha Udokotela Wakho Kalula',
      subtitle: 'Khetha uhlobo lokunakekelwa oludingayo ukuze ubhukhe, noma woza ngqo eMzimkhulu ngaphandle kokubhukha.',
      emergencyTitle: 'Ukunakekelwa Okuphuthumayo',
      emergencySub: 'Ukuhlungwa ngokushesha nokwelashwa okubucayi',
      emergencyBadge: 'Wamukelekile Ngaphandle Kokubhukha',
      medicalTitle: 'Isikhungo Sezokwelapha & GP',
      medicalSub: 'Ukuhlolwa komzimba okuphelele nokubonana nodokotela',
      medicalBadge: 'Imizuzu engu-30',
      hivTitle: 'Umtholampilo We-HIV Nemithi ye-ART',
      hivSub: 'Ukwelashwa okuqinisekiswe yi-CMSA kokucindezela igciwane',
      hivBadge: 'Idiploma ye-CMSA',
      chronicTitle: 'Izifo Ezingamahlalakhona & Amanxeba',
      chronicSub: 'Ushukela, umfutho wegazi ophezulu nokubopha amanxeba',
      chronicBadge: 'Okuphelele',
      scheduleCta: 'Hlela Isikhathi Sokubonana',
    },
    facilities: {
      kicker: 'Iminyango Yezokwelapha · Ukunakekelwa Okuphelele · Ukuhlinzwa KaseMzimkhulu',
      title: 'Izikhungo Nemisebenzi Yezokwelapha',
      subtitle: 'Hlola izikhungo zezokwelapha ezikhethekile ezikhona endaweni yokuhlinza kaDkt M.N. Ntshangase. Khetha umnyango ngezansi ukuze ubone amakhono nezikhathi.',
      walkinNoticeTitle: 'Udinga Ukubona Udokotela Ngaphandle Kokubhukha?',
      walkinNoticeBody: 'Ungangena ngqo ngaphandle kokubhukha phakathi koMsombuluko kuya kuLwesihlanu (08:00–17:00) nangoMgqibelo (08:00–13:00).',
      scopeLabel: 'Umnyango Wezokwelapha',
      procedureHeader: 'Inqubo Nokubukeza Kokunakekelwa Kwesiguli',
      procedureDesc: 'Isiguli ngasinye sithola ukunakwa okuyimfihlo, okungaphuthumi ngokuhambisana ngokugcwele nemithetho yezokwelapha kazwelonke kanye nokuvikelwa kobumfihlo.',
      includedHeader: 'Okufakwe Kulolu Sizo:',
      equipmentHeader: 'Izinsiza Zokuhlola & Nemishini:',
      standardsLabel: 'Amazinga e-HPCSA & CMSA',
      estimatedTime: 'Isikhathi Esilinganiselwe',
      scheduleBtn: 'Bhukha Lolu Sizo',
      viewDetailsBelow: 'Cindezela ukuze ubone ngezansi',
      viewingDetails: 'Kubukwa imininingwane ngezansi',
      quickBook: 'Bhukha',
      backToDepartments: '↑ Buyela ohlwini lweminyango',
    },
    urgentBanner: {
      walkinBadge: 'Abangabhukhanga Bamukelekile Nsuku Zonke · 08:00 – 17:00',
      title: 'Ukunakekelwa Okuphuthumayo & Nabafika Bengabhukhanga',
      body: 'Ingabe uphethwe umkhuhlane omkhulu, ukulimala, ukugula okungazelelwe, noma udinga ukuthola imithi yakho ye-ART ngokushesha? Ngena ngqo eMzimkhulu endaweni kaDkt M.N. Ntshangase. Iziguli zihlolwa ngokushesha ithimba lethu labahlengikazi abaqeqeshiwe lapho zifika.',
      priorityBtn: 'Bhukha Isikhathi Esisheshayo Ku-inthanethi',
      hoursBtn: 'Bheka Izikhathi Zokusebenza',
      callReception: 'Shayela e-Reception (+27 39 259 0184)',
      bedsideLabel: 'Ukunakekelwa Okunesihawu Kwabezempilo',
      triageTitle: 'Ukuhlolwa Okusheshayo (Triage)',
      triageSub: 'Kuhlolwa umfutho wegazi namazinga lapho ufika',
      popiaTitle: 'Imininingwane Evikelekile (POPIA)',
      popiaSub: 'Amafayela agcinwa eyimfihlo',
    },
    billing: {
      kicker: 'Inqubomgomo Yezimali Esobala',
      title: 'Umshwalense Wezempilo Nemigomo Yokukhokha',
      body: 'Endaweni kaDkt M.N. Ntshangase, ukunakekelwa kwezokwelapha okusezingeni eliphezulu kuhambisana namanani acacile. Siqeda ukudideka ngokunikeza izindleko ezicacile ngaphambili, ukufaka izicelo zezinsiza zezokwelapha ngokushesha, kanye nokunikeza izaphulelo ezinomusa kubahola impesheni ye-SASSA namalungu omphakathi aseMzimkhulu.',
      receptionLabel: 'Ideski Lokwamukela Iziguli',
      receptionSub: 'Ideski Lokungena Nezimangalo Zomshwalense',
      ediBillingTitle: 'Ukukhokhelwa Ngqo Yizinsiza Zezokwelapha (Medical Aid)',
      ediBillingSub: 'Izicelo ze-EDI Zangempela',
      contractedBadge: 'Amanani Anqunyiwe',
      schemesHeader: 'Izinsiza Zezokwelapha Zaseningizimu Afrika Ezamukelwayo:',
      paymentMethods: 'Kwamukelwa Amakhadi, Imali Eyizinhlamvu & ne-EFT',
      hpcsaTariff: 'Kuhambisana Nemigomo ye-HPCSA',
      guarantee1: 'Izicelo ze-EDI zithunyelwa ngokushesha emshwalenseni wakho wezempilo ngesikhathi sangempela',
      guarantee2: 'Inkokhelo eyisicaba necacile yeziguli ezizikhokhelayo ngokheshi',
      guarantee3: 'Amanani ehlisiwe anomusa kubantu abadala abahola impesheni ye-SASSA',
      guarantee4: 'Irisidi ecacisiwe enikezwa ngokushesha ukuze ubuyiselwe intela noma imadlana yomshwalense',
      guarantee5: 'Akukho zinkokhelo ezifihliwe ezingalindelekile ekubonisaneni okujwayelekile',
      ctaBtn: 'Bhukha Nge-Medical Aid Noma Ngokheshi',
      queriesText: 'Imibuzo? Shayela ku: +27 39 259 0184',
    },
    testimonials: {
      kicker: 'Ukuthenjwa Umphakathi',
      title: 'Ubufakazi Bweziguli Zethu',
      subtitle: 'Funda ngokuhlangenwe nakho kwangempela kweziguli ezithola usizo nokwelashwa endaweni yethu eMzimkhulu.',
      verified: 'Isiguli Esiqinisekisiwe',
    },
    team: {
      kicker: 'Ochwepheshe Bezempilo',
      title: 'Hlangana Nethimba Lethu',
      subtitle: 'Ithimba lezokwelapha elinesihawu, eligunyazwe yi-HPCSA elizinikele empilweni nasesithunzini seziguli eMzimkhulu.',
      leadGp: 'Udokotela Omkhulu',
      clinicalStaff: 'Abasebenzi Bezempilo',
      bookVisit: 'Bhukha Ukuvakashela',
    },
    hoursCard: {
      bannerTitle: 'IZIKHATHI ZOKUBONA UDOKOTELA',
      monFri: 'UMSOMBULUKO – ULWESIHLANU',
      saturday: 'UMGQIBELO',
      sundayHolidays: 'ISONTO NEZINSUKU ZEKHEFU',
      closed: 'KUVALIWE',
      walkinsWelcome: 'Abafika Bengabhukhanga Bamukelekile Nsuku Zonke',
      openNow: 'Kuvuliwe Manje',
      closedNow: 'Kuvaliwe Okwamanje',
      selectSlot: 'Khetha Isikhathi',
    },
    scheduleSection: {
      kicker: 'Ukusebenza Kwesikhungo',
      title: 'Izikhathi Zokusebenza & Nokufika Endaweni',
      body: 'UDkt M.N. Ntshangase unomgomo ovulekile wokwamukela iziguli ezingabhukhanga ngazo zonke izikhathi zokusebenza. Noma ngabe udinga usizo oluphuthumayo, ukuhlolwa okujwayelekile, noma ukuthola imithi yakho engamahlalakhona, iminyango yethu eMzimkhulu ivulekele umphakathi wonke wase-Harry Gwala.',
      viewSignagePhotos: 'Igalari',
      scheduleAppointment: 'Hlela Isikhathi Sokubonana',
    },
    faqs: {
      kicker: 'Ukuqondiswa Kweziguli',
      title: 'Imibuzo Ebuzwa Njalo',
      subtitle: 'Konke odinga ukukwazi mayelana nokuvakashela uDkt M.N. Ntshangase eMzimkhulu.',
      q1: 'Ngingeza yini ngaphandle kokubhukha ku-inthanethi?',
      a1: 'Yebo! Njengoba kubhalwe ebhodini lethu lokuhlinzwa, abangabhukhanga bamukelekile ngezandla ezimhlophe ngazo zonke izikhathi zokusebenza (08:00–17:00 phakathi nesonto, 08:00–13:00 ngoMgqibelo). Iziguli zihlolwa khona lapho e-reception uma zifika.',
      q2: 'Kusho ukuthini ukufaneleka kwe-HIV Dip (CMSA)?',
      a2: 'UDkt Ntshangase uphethe iDiploma kuMithi ye-HIV evela ku-Colleges of Medicine of South Africa (CMSA), eqinisekisa ubuchwepheshe obukhethekile ekunakekelweni nasekudambiseni igciwane le-HIV (ART) kanye nokugcina amasosha omzimba eqinile.',
      q3: 'Imininingwane yami yezempilo ivikelwe kanjani ku-inthanethi?',
      a3: 'Sisebenzisa ukubethela okusezingeni eliphezulu kwe-Web Crypto API AES-GCM (256-bit). Wonke amanothi ezokwelapha nezimpawu zokugula kubethelwa kusiphequluli sakho ngaphambi kokugcinwa, kuhambisana nemithetho ye-POPIA yaseNingizimu Afrika kanye ne-HIPAA.',
      q4: 'Yini okufanele ngize nayo lapho ngizobona udokotela?',
      a4: 'Sicela uphathe umazisi wakho waseNingizimu Afrika (ID) noma iphasiphothi, iphasi yakho yokubonana eyidijithali (eselula noma eprintiwe), ikhadi lomshwalense wezempilo uma unalo, nawo wonke amakhadi emithi yezifo ezingamahlalakhona.',
    },
    footer: {
      practiceDesc: 'Ukunakekelwa kwezokwelapha okunesizotha, ukulawulwa kokuncipha kwegciwane le-HIV, ukwelashwa okuqhubekayo kwezifo ezingamahlalakhona, nokuhlinzwa okuncane okuhlanzekile okusiza umphakathi waseMzimkhulu nase-Harry Gwala.',
      portalBadge: 'Ingosi Yezempilo Ebethelwe nge-AES-256',
      departmentsTitle: 'Iminyango & Nokunakekelwa',
      dep1: 'Ukwelashwa Jikelele & Nokuhlolwa Komzimba',
      dep2: 'Umtholampilo We-HIV Nemithi ye-ART',
      dep3: 'Ukunakekelwa Komfutho Wegazi & Ushukela',
      dep4: 'Ukuhlinzwa Okuncane & Nokubopha Amanxeba',
      dep5: 'Ukuhlolwa Kwasendaweni Kwaselabhorethri',
      hoursTitle: 'Izikhathi Zokusebenza',
      viewPhotos: 'Igalari Yezithombe →',
      locationTitle: 'Indawo Yesikhungo',
      bookNowBtn: 'Bhukha Isikhathi Manje',
      allRightsReserved: 'Ukuhlinzwa KukaDkt M.N. Ntshangase (General Practitioner). Wonke amalungelo agodliwe.',
      accreditation: 'Ibhaliswe ne-HPCSA · Iqinisekiswe yi-CMSA Diploma · Ibethelwe nge-POPIA & HIPAA',
    },
  },
};
