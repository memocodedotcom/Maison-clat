export type LeadSource = 'Instagram' | 'WhatsApp' | 'Meta Ads' | 'Website' | 'Google' | 'Walk-in';

export type LeadStage = 
  | 'Nouveau Lead'
  | 'Contacté'
  | 'Qualifié'
  | 'RDV Réservé'
  | 'Confirmé'
  | 'Présent'
  | 'Traitement vendu'
  | 'Forfait actif'
  | 'À réactiver';

export type LeadTemperature = 'CHAUD' | 'TIÈDE' | 'FROID';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  treatment: string;
  source: LeadSource;
  stage: LeadStage;
  potentialValue: number;
  temperature: LeadTemperature;
  lastContact: string;
  nextAction: string;
  owner: string;
  notes?: string;
  aiNextBestAction?: {
    insight: string;
    recommendation: string;
    suggestedMessage: string;
  };
}

export type AppointmentStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Arrived'
  | 'In Treatment'
  | 'Completed'
  | 'No Show'
  | 'Cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientAvatar?: string;
  treatmentName: string;
  practitioner: string;
  room: string;
  equipment: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: AppointmentStatus;
  price: number;
  notes?: string;
}

export interface ClientTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'inquiry' | 'consultation' | 'package_purchased' | 'session_completed' | 'review_left';
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  customerSince: string;
  totalSpent: number;
  visitCount: number;
  activePackage?: string;
  favoriteTreatments: string[];
  leadSource: LeadSource;
  lastVisit: string;
  nextAppointment?: string;
  tags: string[];
  timeline: ClientTimelineItem[];
}

export interface SessionLog {
  sessionNum: number;
  date: string;
  status: 'Completed' | 'Scheduled' | 'Pending';
  practitioner: string;
  notes?: string;
}

export interface PackageItem {
  id: string;
  clientName: string;
  packageName: string;
  totalSessions: number;
  completedSessions: number;
  pricePaid: number;
  remainingSessions: number;
  lastSessionDate: string;
  nextRecommendedDate: string;
  status: 'active' | 'renewal_recommended' | 'completed';
  assignedPractitioner: string;
  sessionLogs: SessionLog[];
}

export interface BeforeAfterItem {
  id: string;
  clientName: string;
  treatment: string;
  beforeImage: string;
  afterImage: string;
  beforeDate: string;
  afterDate: string;
  sessionLabel: string;
  consentStatus: boolean; // Marketing consent
  notes: string;
}

export interface AutomationItem {
  id: string;
  title: string;
  status: 'active' | 'paused';
  trigger: string;
  audience: string;
  messagesSent: number;
  bookingsGenerated: number;
  revenueAttributed: number;
  category: 'reminders' | 'recovery' | 'renewal' | 'reactivation' | 'reviews';
  conditionLogic: {
    when: string;
    ifCondition: string;
    thenAction: string;
    messagePreview: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'ai' | 'staff';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface MessageConversation {
  id: string;
  clientName: string;
  phone: string;
  avatar: string;
  leadSource: LeadSource;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  interestedTreatment: string;
  potentialValue: number;
  leadTemperature: LeadTemperature;
  recommendedAction: string;
  messages: ChatMessage[];
}

export interface ReviewItem {
  id: string;
  clientName: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google Reviews' | 'Direct Feedback';
  status: 'published' | 'pending_request' | 'negative_alert';
  treatment: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  revenueMonth: number;
  averageTicket: number;
  rebookingRate: number;
  packageSalesCount: number;
  commissionRate: number;
  services: string[];
}

export interface RevenueOpportunity {
  id: string;
  title: string;
  count: number;
  totalValue: number;
  badge: string;
}
