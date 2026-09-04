import {
  Lead,
  Appointment,
  Client,
  PackageItem,
  BeforeAfterItem,
  AutomationItem,
  MessageConversation,
  ReviewItem,
  StaffMember,
  LeadStage
} from '../types';

import {
  INITIAL_KPI_DATA,
  INITIAL_LEADS,
  TODAY_APPOINTMENTS,
  CLIENTS_LIST,
  PACKAGE_TRACKER_DEMO,
  BEFORE_AFTER_GALLERY,
  AUTOMATIONS_LIST,
  CONVERSATIONS_LIST,
  REPUTATION_DATA,
  STAFF_MEMBERS
} from '../data/mockData';
import { isLocalDateToday } from '../domain/booking';

type Listener = () => void;

class ClinicStore {
  private listeners: Set<Listener> = new Set();

  public kpiData = { ...INITIAL_KPI_DATA };
  public leads: Lead[] = [...INITIAL_LEADS];
  public appointments: Appointment[] = [...TODAY_APPOINTMENTS];
  public clients: Client[] = [...CLIENTS_LIST];
  public packages: PackageItem[] = [{ ...PACKAGE_TRACKER_DEMO }];
  public beforeAfter: BeforeAfterItem[] = [...BEFORE_AFTER_GALLERY];
  public automations: AutomationItem[] = [...AUTOMATIONS_LIST];
  public conversations: MessageConversation[] = [...CONVERSATIONS_LIST];
  public reviews: ReviewItem[] = [...REPUTATION_DATA.reviewsList];
  public staff: StaffMember[] = [...STAFF_MEMBERS];

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * Called when a client completes the Smart Booking Wizard on the Client Frontend
   */
  public addBookingFromClient(booking: {
    serviceId: string;
    variantId: string;
    treatment: string;
    area: string;
    practitioner: string;
    date: string;
    time: string;
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    duration: number;
    price: number;
  }): void {
    const fullName = `${booking.firstName} ${booking.lastName}`.trim();
    const fullTreatment = `${booking.treatment} — ${booking.area}`;

    // 1. Create New Lead
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: fullName,
      phone: booking.phone,
      email: booking.email,
      treatment: fullTreatment,
      source: 'Website',
      stage: 'RDV Réservé',
      potentialValue: booking.price,
      temperature: 'CHAUD',
      lastContact: 'À l’instant',
      nextAction: 'Envoyer confirmation WhatsApp',
      owner: booking.practitioner !== 'Premier disponible' ? booking.practitioner : 'Yasmine B.',
      notes: `Réservation en ligne effectuée le ${booking.date} à ${booking.time}.`,
      aiNextBestAction: {
        insight: 'Réservation directe effectuée sur le site web.',
        recommendation: 'Valider les consignes pré-séance par message automatisé.',
        suggestedMessage: `Bonjour ${booking.firstName} ! ✨ Votre rendez-vous pour ${fullTreatment} est bien confirmé le ${booking.date} à ${booking.time} à la Maison Éclat Casablanca Gautier.`
      }
    };
    this.leads = [newLead, ...this.leads];

    // 2. Create New Appointment
    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      clientName: fullName,
      clientPhone: booking.phone,
      treatmentName: fullTreatment,
      practitioner: booking.practitioner,
      room: 'Cabine 01 (Candela)',
      equipment: booking.serviceId === 'laser' ? 'Candela GentleMax Pro' : 'À attribuer',
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
      status: 'Confirmed',
      price: booking.price,
      notes: `Réservation web démo (${booking.serviceId}/${booking.variantId})`
    };
    this.appointments = [newAppointment, ...this.appointments];

    // 3. Log WhatsApp Conversation
    const newConversation: MessageConversation = {
      id: `conv-${Date.now()}`,
      clientName: fullName,
      phone: booking.phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      leadSource: 'Website',
      lastMessage: `Réservation confirmée pour le ${booking.date} à ${booking.time}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 1,
      interestedTreatment: fullTreatment,
      potentialValue: newLead.potentialValue,
      leadTemperature: 'CHAUD',
      recommendedAction: 'Consignes pré-soin',
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: 'client',
          text: `Bonjour, je souhaite réserver une séance de ${fullTreatment} pour le ${booking.date} à ${booking.time}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `Bonjour ${booking.firstName} ! ✨ Votre rendez-vous est confirmé avec ${booking.practitioner} au 42 Boulevard d'Anfa, Gautier.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isAiGenerated: true
        }
      ]
    };
    this.conversations = [newConversation, ...this.conversations];

    // 4. Update KPIs
    if (isLocalDateToday(booking.date)) {
      this.kpiData.appointmentsToday += 1;
    }
    this.kpiData.newLeadsToday += 1;

    this.notify();
  }

  // Lead Operations
  public updateLeadStage(leadId: string, stage: LeadStage): void {
    this.leads = this.leads.map((l) => (l.id === leadId ? { ...l, stage } : l));
    this.notify();
  }

  // Chat Message Operations
  public addChatMessage(convId: string, sender: 'client' | 'ai' | 'staff', text: string, isAiGenerated?: boolean): void {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.conversations = this.conversations.map((conv) => {
      if (conv.id === convId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender,
          text,
          timestamp: timeStr,
          isAiGenerated
        };
        return {
          ...conv,
          lastMessage: text,
          timestamp: timeStr,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });
    this.notify();
  }

  // Automation Operations
  public toggleAutomation(autoId: string): void {
    this.automations = this.automations.map((a) =>
      a.id === autoId ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a
    );
    this.notify();
  }

  // Consent Operations
  public toggleConsent(photoId: string): void {
    this.beforeAfter = this.beforeAfter.map((b) =>
      b.id === photoId ? { ...b, consentStatus: !b.consentStatus } : b
    );
    this.notify();
  }
}

export const clinicStore = new ClinicStore();
