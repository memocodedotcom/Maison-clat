export interface ServiceVariant {
  id: string;
  label: string;
  price: number;
}

export interface BookingService {
  id: string;
  title: string;
  description: string;
  duration: number;
  startingPrice: number;
  variants: ServiceVariant[];
}

export interface CustomerInformation {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface BookingValidationErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

export interface BookingDateOption {
  dayLabel: string;
  dateLabel: string;
  fullDate: string;
}

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'laser',
    title: 'Épilation Laser Candela®',
    description: 'Laser Alexandrite & Nd:YAG avec protocole personnalisé',
    duration: 45,
    startingPrice: 350,
    variants: [
      { id: 'face', label: 'Visage complet', price: 350 },
      { id: 'underarms', label: 'Aisselles', price: 350 },
      { id: 'arms', label: 'Bras complets', price: 700 },
      { id: 'bikini', label: 'Maillot (Échancré / Intégral)', price: 550 },
      { id: 'legs', label: 'Jambes complètes', price: 1200 },
      { id: 'body', label: 'Corps complet (Privilège)', price: 3900 },
    ],
  },
  {
    id: 'hydra',
    title: 'Hydrafacial MD Prestige',
    description: 'Nettoyage profond, extraction et effet glow',
    duration: 60,
    startingPrice: 1200,
    variants: [{ id: 'face', label: 'Visage complet', price: 1200 }],
  },
  {
    id: 'micro',
    title: 'Microneedling & Exosomes',
    description: 'Protocole visage pour cicatrices, pores et élasticité',
    duration: 60,
    startingPrice: 1800,
    variants: [{ id: 'face', label: 'Visage complet', price: 1800 }],
  },
  {
    id: 'carbon',
    title: 'Carbon Peel Hollywood',
    description: 'Protocole visage purifiant et lissant',
    duration: 45,
    startingPrice: 1400,
    variants: [{ id: 'face', label: 'Visage complet', price: 1400 }],
  },
  {
    id: 'tattoo',
    title: 'Détatouage Laser',
    description: 'Évaluation et traitement progressif d’un tatouage',
    duration: 30,
    startingPrice: 900,
    variants: [{ id: 'assessment', label: 'Zone à évaluer sur place', price: 900 }],
  },
  {
    id: 'diagnostic',
    title: 'Bilan Diagnostic Peau Visia®',
    description: 'Diagnostic épidermique initial',
    duration: 30,
    startingPrice: 0,
    variants: [{ id: 'face', label: 'Visage complet', price: 0 }],
  },
];

export const PRACTITIONERS = [
  { name: 'Premier disponible', role: 'Attribution automatique du créneau le plus rapide', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { name: 'Yasmine Bennani', role: 'Spécialiste Laser & Care Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
  { name: 'Dr. Sofia Berrada', role: 'Médecin Esthétique', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80' },
  { name: 'Kenza Chraibi', role: 'Experte Dermo-Esthétique', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
] as const;

export const DEMO_TIME_SLOTS = ['09:30', '10:15', '11:00', '11:45', '14:30', '15:15', '16:00', '17:30', '18:15'];

export function resolveInitialService(initialTreatment: string): BookingService {
  return BOOKING_SERVICES.find((service) =>
    service.title.toLocaleLowerCase('fr').includes(initialTreatment.toLocaleLowerCase('fr')) ||
    initialTreatment.toLocaleLowerCase('fr').includes(service.title.toLocaleLowerCase('fr'))
  ) ?? BOOKING_SERVICES[0];
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Offert';
  return `${new Intl.NumberFormat('fr-FR').format(price)} DH`;
}

export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createBookingDates(from: Date = new Date(), count = 7): BookingDateOption[] {
  const options: BookingDateOption[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());

  while (options.length < count) {
    if (cursor.getDay() !== 0) {
      options.push({
        dayLabel: new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(cursor).replace('.', ''),
        dateLabel: new Intl.DateTimeFormat('fr-FR', { day: '2-digit' }).format(cursor),
        fullDate: toLocalIsoDate(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return options;
}

export function validateCustomerInformation(customer: CustomerInformation): BookingValidationErrors {
  const errors: BookingValidationErrors = {};
  const digits = customer.phone.replace(/\D/g, '');

  if (!customer.firstName.trim()) errors.firstName = 'Indiquez votre prénom.';
  if (!customer.lastName.trim()) errors.lastName = 'Indiquez votre nom.';
  if (digits.length < 8 || digits.length > 15) errors.phone = 'Indiquez un numéro de téléphone valide.';
  if (customer.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
    errors.email = 'Indiquez une adresse email valide.';
  }

  return errors;
}

export function isLocalDateToday(date: string, today: Date = new Date()): boolean {
  return date === toLocalIsoDate(today);
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export function buildCalendarEvent(input: {
  title: string;
  date: string;
  time: string;
  duration: number;
  description: string;
  location: string;
}): string {
  const start = new Date(`${input.date}T${input.time}:00`);
  const end = new Date(start.getTime() + input.duration * 60_000);
  const compact = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Maison Eclat//Booking//FR',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${input.date}-${input.time.replace(':', '')}@maison-eclat.demo`,
    `DTSTAMP:${compact(new Date())}`,
    `DTSTART:${compact(start)}`,
    `DTEND:${compact(end)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    `DESCRIPTION:${escapeIcsText(input.description)}`,
    `LOCATION:${escapeIcsText(input.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

