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
  RevenueOpportunity
} from '../types';

export const INITIAL_KPI_DATA = {
  caToday: '8 450 DH',
  caMonth: '142 800 DH',
  appointmentsToday: 18,
  showUpRate: '82%',
  newLeadsToday: 14,
  recoveredRevenueMonth: '34 200 DH',
};

export const REVENUE_OPPORTUNITIES: RevenueOpportunity[] = [
  { id: '1', title: '7 Leads chauds non convertis', count: 7, totalValue: 8200, badge: '🔥 Conversion immédiate' },
  { id: '2', title: '6 Forfaits en fin de parcours (Session 4/6+)', count: 6, totalValue: 5400, badge: '💰 Renouvellement' },
  { id: '3', title: '12 Clientes prêtes pour séance suivante', count: 12, totalValue: 3200, badge: '⚡ Séance à planifier' },
  { id: '4', title: '9 Clientes premium inactives (+60 jours)', count: 9, totalValue: 1800, badge: '😴 Réactivation VIP' },
];

export const ACTION_CARDS_TODAY = [
  { id: 'leads_wait', icon: '🔥', title: '7 prospects attendent une réponse', count: 7, color: 'border-amber-200 bg-amber-50/50 text-amber-900', action: 'Voir les leads' },
  { id: 'unconfirmed_appts', icon: '📅', title: '5 rendez-vous non confirmés pour demain', count: 5, color: 'border-orange-200 bg-orange-50/50 text-orange-900', action: 'Envoyer relances' },
  { id: 'ending_packages', icon: '💰', title: '8 forfaits bientôt terminés (Renouvellement)', count: 8, color: 'border-brand-200 bg-brand-50/50 text-brand-900', action: 'Proposer l’offre' },
  { id: 'next_session_ready', icon: '⚡', title: '12 clientes prêtes pour leur prochaine séance', count: 12, color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900', action: 'Planifier en 1-clic' },
  { id: 'reactivation_dormant', icon: '😴', title: '24 clientes à réactiver (Offre VIP)', count: 24, color: 'border-stone-200 bg-stone-100/60 text-stone-800', action: 'Lancer campagne' },
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sara Amrani',
    phone: '+212 6 61 24 88 90',
    email: 'sara.amrani@gmail.com',
    treatment: 'Épilation Laser Corps Complet',
    source: 'Instagram',
    stage: 'Nouveau Lead',
    potentialValue: 5000,
    temperature: 'CHAUD',
    lastContact: 'Il y a 2h',
    nextAction: 'Relancer aujourd’hui',
    owner: 'Yasmine B.',
    notes: 'Demande les tarifs du forfait corps complet suite à un reel Instagram.',
    aiNextBestAction: {
      insight: 'Cette cliente a demandé le prix du forfait corps complet hier mais n’a pas réservé.',
      recommendation: 'Envoyer un suivi WhatsApp avec 2 créneaux disponibles cette semaine et l’offre bilan offert.',
      suggestedMessage: 'Bonjour Sara ! ✨ Nous avons 2 créneaux disponibles ce jeudi à 15h ou vendredi à 11h pour votre bilan épidermique offert à Casablanca Gautier. Souhaitez-vous réserver ?'
    }
  },
  {
    id: 'lead-2',
    name: 'Imane Alaoui',
    phone: '+212 6 62 11 45 78',
    email: 'imane.alaoui@hotmail.com',
    treatment: 'Hydrafacial MD Prestige',
    source: 'WhatsApp',
    stage: 'Contacté',
    potentialValue: 1800,
    temperature: 'CHAUD',
    lastContact: 'Il y a 30m',
    nextAction: 'Envoyer lien de réservation',
    owner: 'Yasmine B.',
    notes: 'Cherche un soin éclat avant un mariage ce samedi.',
    aiNextBestAction: {
      insight: 'Urgence décelée (événement ce week-end).',
      recommendation: 'Proposer le créneau express Hydrafacial Glow vendredi 16h00.',
      suggestedMessage: 'Bonjour Imane 🌸 Nous avons réservé un créneau Glow d’exception ce vendredi à 16h00 avec notre spécialiste. Cliquez sur le lien pour valider votre rendez-vous.'
    }
  },
  {
    id: 'lead-3',
    name: 'Salma Berrada',
    phone: '+212 6 63 90 12 34',
    treatment: 'Détatouage Laser Q-Switched',
    source: 'Meta Ads',
    stage: 'Qualifié',
    potentialValue: 3200,
    temperature: 'TIÈDE',
    lastContact: 'Hier à 16:45',
    nextAction: 'Partager cas Avant/Après',
    owner: 'Dr. Sofia B.',
    notes: 'Tatouage poignet 4cm. Inquiète pour la douleur.',
    aiNextBestAction: {
      insight: 'Hésitation liée au confort du soin.',
      recommendation: 'Envoyer vidéo du système d’anestésie par le froid pulsé Candela.',
      suggestedMessage: 'Bonjour Salma ! Chez Maison Éclat, le détatouage utilise la technologie Zimmer Cryo 6 pour un confort total. Souhaitez-vous voir une démonstration en vidéo ?'
    }
  },
  {
    id: 'lead-4',
    name: 'Nadia Bennani',
    phone: '+212 6 65 43 21 09',
    treatment: 'Microneedling + Exosomes',
    source: 'Instagram',
    stage: 'RDV Réservé',
    potentialValue: 2500,
    temperature: 'CHAUD',
    lastContact: 'Il y a 1h',
    nextAction: 'Confirmer rendez-vous',
    owner: 'Yasmine B.',
    notes: 'Rendez-vous programmé pour le 4 septembre à 14h00.'
  },
  {
    id: 'lead-5',
    name: 'Meryem Idrissi',
    phone: '+212 6 68 77 66 55',
    treatment: 'Laser Maillot + Aisselles',
    source: 'Website',
    stage: 'Confirmé',
    potentialValue: 1900,
    temperature: 'CHAUD',
    lastContact: 'Il y a 4h',
    nextAction: 'Préparation séance',
    owner: 'Kenza C.'
  },
  {
    id: 'lead-6',
    name: 'Ghita Filali',
    phone: '+212 6 64 12 34 56',
    treatment: 'Carbon Peel Hollywood',
    source: 'Walk-in',
    stage: 'Présent',
    potentialValue: 1400,
    temperature: 'CHAUD',
    lastContact: 'En cabine',
    nextAction: 'Proposer forfait 3 soins',
    owner: 'Kenza C.'
  }
];

export const TODAY_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-1',
    clientName: 'Sara El Mansouri',
    clientPhone: '+212 6 61 11 22 33',
    treatmentName: 'Épilation Laser — Jambes Complètes',
    practitioner: 'Yasmine B.',
    room: 'Cabine 01 (Candela)',
    equipment: 'Candela GentleMax Pro',
    date: '2026-09-02',
    time: '09:00',
    duration: 45,
    status: 'Completed',
    price: 1200,
    notes: 'Séance 4/6 effectuée. Résultat excellent sur les gambes.'
  },
  {
    id: 'appt-2',
    clientName: 'Imane Berrada',
    clientPhone: '+212 6 62 44 55 66',
    treatmentName: 'Hydrafacial MD Prestige',
    practitioner: 'Kenza C.',
    room: 'Cabine 03 (Soin Visage)',
    equipment: 'Hydrafacial Elite MD',
    date: '2026-09-02',
    time: '10:30',
    duration: 60,
    status: 'In Treatment',
    price: 1800,
    notes: 'Sensibilité zone T. Booster Britenol appliqué.'
  },
  {
    id: 'appt-3',
    clientName: 'Nadia Rhazali',
    clientPhone: '+212 6 63 77 88 99',
    treatmentName: 'Microneedling + Exosomes',
    practitioner: 'Dr. Sofia B.',
    room: 'Cabine Médicale 02',
    equipment: 'Dermapen 4 Pro',
    date: '2026-09-02',
    time: '12:00',
    duration: 60,
    status: 'Confirmed',
    price: 2500
  },
  {
    id: 'appt-4',
    clientName: 'Salma Berrada',
    clientPhone: '+212 6 64 33 22 11',
    treatmentName: 'Carbon Peel Hollywood',
    practitioner: 'Kenza C.',
    room: 'Cabine 01 (Candela)',
    equipment: 'Spectra Q-Switched',
    date: '2026-09-02',
    time: '14:00',
    duration: 45,
    status: 'Arrived',
    price: 1400
  },
  {
    id: 'appt-5',
    clientName: 'Ghita Amrani',
    clientPhone: '+212 6 65 99 88 77',
    treatmentName: 'Détatouage Laser — Poignet',
    practitioner: 'Dr. Sofia B.',
    room: 'Cabine Médicale 02',
    equipment: 'Spectra Q-Switched',
    date: '2026-09-02',
    time: '15:30',
    duration: 30,
    status: 'Confirmed',
    price: 1100
  },
  {
    id: 'appt-6',
    clientName: 'Meryem Idrissi',
    clientPhone: '+212 6 66 55 44 33',
    treatmentName: 'Consultation Diagnostic Peau',
    practitioner: 'Yasmine B.',
    room: 'Consultation VIP',
    equipment: 'Visia Skin Analysis',
    date: '2026-09-02',
    time: '17:00',
    duration: 30,
    status: 'Pending',
    price: 300
  }
];

export const CLIENTS_LIST: Client[] = [
  {
    id: 'cli-1',
    name: 'Sara El Mansouri',
    phone: '+212 6 61 11 22 33',
    email: 'sara.elmansouri@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    customerSince: 'Janv. 2026',
    totalSpent: 7850,
    visitCount: 11,
    activePackage: 'Laser Corps Complet (4/6)',
    favoriteTreatments: ['Épilation Laser', 'Hydrafacial MD'],
    leadSource: 'Instagram',
    lastVisit: '02 Sept. 2026',
    nextAppointment: '27 Août 2026 (À planifier)',
    tags: ['Client VIP', 'Haute Valeur', 'Ambassadrice'],
    timeline: [
      { id: 't1', date: '12 Jan 2026', title: 'Demande Instagram', description: 'Renseignement tarif forfait laser corps complet', type: 'inquiry' },
      { id: 't2', date: '15 Jan 2026', title: 'Consultation Diagnostic', description: 'Phototype III validé par Dr. Sofia', type: 'consultation' },
      { id: 't3', date: '15 Jan 2026', title: 'Achat Forfait 6 séances', description: 'Paiement 3 900 DH réglé en 2 fois', type: 'package_purchased' },
      { id: 't4', date: '03 Mai 2026', title: 'Séance 1/6 Laser', description: 'Aucune rougeur post-soin. Paramètres retenus: YAG 18J', type: 'session_completed' },
      { id: 't5', date: '01 Juin 2026', title: 'Séance 2/6 Laser', description: 'Réduction pilaire constatée de 30%', type: 'session_completed' },
      { id: 't6', date: '30 Juin 2026', title: 'Séance 3/6 Laser', description: 'Zone aisselles presque nette', type: 'session_completed' },
      { id: 't7', date: '29 Juil 2026', title: 'Séance 4/6 Laser', description: 'Superbe tolérance. Cliente très satisfaite', type: 'session_completed' },
      { id: 't8', date: '02 Août 2026', title: 'Avis Google déposé', description: 'Avis 5 étoiles publié suite au SMS d’automation', type: 'review_left' }
    ]
  },
  {
    id: 'cli-2',
    name: 'Imane Berrada',
    phone: '+212 6 62 44 55 66',
    email: 'imane.b@outook.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    customerSince: 'Févr. 2026',
    totalSpent: 4200,
    visitCount: 4,
    activePackage: 'Abonnement Hydrafacial Glow',
    favoriteTreatments: ['Hydrafacial MD', 'Carbon Peel'],
    leadSource: 'WhatsApp',
    lastVisit: 'Aujourd’hui',
    tags: ['Régulière', 'Soin Visage'],
    timeline: [
      { id: 'tb1', date: '10 Fév 2026', title: 'Premier Soin Hydrafacial', description: 'Soin Signature 1200 DH', type: 'session_completed' }
    ]
  },
  {
    id: 'cli-3',
    name: 'Salma Berrada',
    phone: '+212 6 64 33 22 11',
    email: 'salma.berrada@yahoo.fr',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    customerSince: 'Mars 2026',
    totalSpent: 6400,
    visitCount: 6,
    activePackage: 'Détatouage 5 Séances (3/5)',
    favoriteTreatments: ['Détatouage Laser'],
    leadSource: 'Meta Ads',
    lastVisit: '14 Août 2026',
    tags: ['Patient Laser'],
    timeline: []
  }
];

export const PACKAGE_TRACKER_DEMO: PackageItem = {
  id: 'pkg-1',
  clientName: 'Sara El Mansouri',
  packageName: 'LASER CORPS COMPLET — Forfait 6 Séances',
  totalSessions: 6,
  completedSessions: 4,
  pricePaid: 3900,
  remainingSessions: 2,
  lastSessionDate: '29 Juillet 2026',
  nextRecommendedDate: '27 Août 2026',
  status: 'renewal_recommended',
  assignedPractitioner: 'Yasmine B.',
  sessionLogs: [
    { sessionNum: 1, date: '03 Mai 2026', status: 'Completed', practitioner: 'Yasmine B.', notes: 'Bilan initial + séance 1. Excellent confort.' },
    { sessionNum: 2, date: '01 Juin 2026', status: 'Completed', practitioner: 'Yasmine B.', notes: 'Zone aisselles & jambes. Repousse très ralentie.' },
    { sessionNum: 3, date: '30 Juin 2026', status: 'Completed', practitioner: 'Yasmine B.', notes: 'Réglage joules augmenté à 20J/cm².' },
    { sessionNum: 4, date: '29 Juillet 2026', status: 'Completed', practitioner: 'Yasmine B.', notes: 'Zone maillot nette à 80%.' },
    { sessionNum: 5, date: '27 Août 2026 (Recommandé)', status: 'Pending', practitioner: 'Yasmine B.', notes: 'Prévue ce mois-ci.' },
    { sessionNum: 6, date: 'À définir', status: 'Pending', practitioner: 'Yasmine B.' }
  ]
};

export const BEFORE_AFTER_GALLERY: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    clientName: 'Sara El Mansouri',
    treatment: 'Épilation Laser Candela — Jambes',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80',
    beforeDate: 'Avant Séance 1 (Mai 2026)',
    afterDate: 'Après Séance 4 (Juillet 2026)',
    sessionLabel: '4 Séances complétées (-85% pilosité)',
    consentStatus: true,
    notes: 'Phototype III — Élimination quasi-totale avec Candela GentleMax Pro.'
  },
  {
    id: 'ba-2',
    clientName: 'Imane Berrada',
    treatment: 'Hydrafacial MD + Booster Pigmentation',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&auto=format&fit=crop&q=80',
    beforeDate: 'Avant soin (Peau terne & pores fermés)',
    afterDate: 'Immédiatement après soin (Effet Glow)',
    sessionLabel: '1 Séance Hydrafacial MD',
    consentStatus: true,
    notes: 'Clarification des pores et teint décongestionné.'
  }
];

export const AUTOMATIONS_LIST: AutomationItem[] = [
  {
    id: 'auto-1',
    title: 'Confirmation immédiate WhatsApp',
    status: 'active',
    trigger: 'Rendez-vous créé dans l’agenda',
    audience: 'Toutes les nouvelles réservations',
    messagesSent: 342,
    bookingsGenerated: 342,
    revenueAttributed: 184500,
    category: 'reminders',
    conditionLogic: {
      when: 'Réservation validée en ligne ou par le secrétariat',
      ifCondition: 'Numéro WhatsApp valide',
      thenAction: 'Envoyer récapitulatif interactif avec lieu Google Maps Casablanca Gautier + bouton de modification',
      messagePreview: 'Bonjour {{prenom}} ✨ Votre RDV pour {{soin}} chez Maison Éclat est confirmé le {{date}} à {{heure}}.'
    }
  },
  {
    id: 'auto-2',
    title: 'Rappel 24h avant RDV (+ Confirmation 1-clic)',
    status: 'active',
    trigger: '24 heures avant l’heure du rendez-vous',
    audience: 'Tous les rendez-vous confirmés',
    messagesSent: 289,
    bookingsGenerated: 265,
    revenueAttributed: 142000,
    category: 'reminders',
    conditionLogic: {
      when: 'H-24 avant la séance',
      ifCondition: 'Statut du RDV = Confirmé ou À Confirmer',
      thenAction: 'Envoyer SMS / WhatsApp interactif avec boutons [Confirmer] / [Reporter]',
      messagePreview: 'Bonjour {{prenom}}, merci de confirmer votre présence demain à {{heure}} pour votre séance de {{soin}}.'
    }
  },
  {
    id: 'auto-3',
    title: 'Récupération No-Show (Relance 2h après rdv manqué)',
    status: 'active',
    trigger: 'Marqué "No-Show" dans l’agenda',
    audience: 'Clientes ayant manqué leur créneau',
    messagesSent: 34,
    bookingsGenerated: 19,
    revenueAttributed: 24800,
    category: 'recovery',
    conditionLogic: {
      when: '2 heures après le créneau non honoré',
      ifCondition: 'Aucun message de réannulation préalable',
      thenAction: 'Envoyer message bienveillant avec lien de re-planification prioritaire sans pénalité',
      messagePreview: 'Bonjour {{prenom}}, nous avons manqué votre présence aujourd’hui. Un imprévu ? Reprogrammez gratuitement ici.'
    }
  },
  {
    id: 'auto-4',
    title: 'Relance Séance Suivante (Suivi Forfait)',
    status: 'active',
    trigger: '28 jours après la séance précédente',
    audience: 'Clientes avec forfait actif en cours',
    messagesSent: 156,
    bookingsGenerated: 118,
    revenueAttributed: 78000,
    category: 'renewal',
    conditionLogic: {
      when: '28 jours après séance N',
      ifCondition: 'Nombre de séances restant > 0 ET aucun RDV futur',
      thenAction: 'Proposer les créneaux idéaux de la semaine selon l’intervalle recommandé',
      messagePreview: 'Bonjour {{prenom}}, c’est le moment idéal pour votre séance {{session_num}} de laser pour un résultat optimal.'
    }
  },
  {
    id: 'auto-5',
    title: 'Proposition Renouvellement Forfait (Séance 5/6)',
    status: 'active',
    trigger: 'Séance 5 effectuée',
    audience: 'Clientes en fin de forfait',
    messagesSent: 48,
    bookingsGenerated: 32,
    revenueAttributed: 64000,
    category: 'renewal',
    conditionLogic: {
      when: 'Dès la fin de la séance 5',
      ifCondition: 'Client très satisfait',
      thenAction: 'Proposer l’offre privilège renouvellement (-20% sur la 2ème zone ou l’entretien)',
      messagePreview: 'Félicitations {{prenom}} pour vos résultats ! Bénéficiez de -20% sur votre forfait de finition.'
    }
  },
  {
    id: 'auto-6',
    title: 'Réactivation Clientes Inactives (60+ Jours)',
    status: 'active',
    trigger: '60 jours sans visite',
    audience: 'Anciennes clientes à fort LTV',
    messagesSent: 88,
    bookingsGenerated: 27,
    revenueAttributed: 31500,
    category: 'reactivation',
    conditionLogic: {
      when: '60 jours d’inactivité',
      ifCondition: 'Aucun RDV à venir',
      thenAction: 'Envoyer offre VIP diagnostic éclat + cadeau dermo-esthétique',
      messagePreview: 'Bonjour {{prenom}}, vous nous manquez à la Maison Éclat ! Bénéficiez d’un soin coup d’éclat offert.'
    }
  }
];

export const CONVERSATIONS_LIST: MessageConversation[] = [
  {
    id: 'conv-1',
    clientName: 'Sara Amrani',
    phone: '+212 6 61 24 88 90',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    leadSource: 'Instagram',
    lastMessage: 'Et vous avez disponibilité vendredi aprèm ?',
    timestamp: '14:22',
    unreadCount: 1,
    interestedTreatment: 'Épilation Laser Corps Complet',
    potentialValue: 5000,
    leadTemperature: 'CHAUD',
    recommendedAction: 'Réserver la consultation',
    messages: [
      { id: 'm1', sender: 'client', text: 'Salam svp prix laser jambes complètes et maillot ?', timestamp: '14:10' },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Salam Sara ! ✨ Nos tarifs pour le forfait d’exception Laser Corps Complet (Jambes + Maillot + Aisselles) sont de 3 900 DH pour 6 séances sur notre technologie médicale Candela GentleMax Pro. Souhaitez-vous faire un bilan offert avec notre médecin ?',
        timestamp: '14:11',
        isAiGenerated: true
      },
      { id: 'm3', sender: 'client', text: 'Oui super ! Et vous avez disponibilité vendredi aprèm ?', timestamp: '14:22' }
    ]
  },
  {
    id: 'conv-2',
    clientName: 'Imane Alaoui',
    phone: '+212 6 62 11 45 78',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    leadSource: 'WhatsApp',
    lastMessage: 'C’est noté merci pour les informations.',
    timestamp: '11:45',
    unreadCount: 0,
    interestedTreatment: 'Hydrafacial MD',
    potentialValue: 1800,
    leadTemperature: 'CHAUD',
    recommendedAction: 'Proposer créneau rdv',
    messages: [
      { id: 'm4', sender: 'client', text: 'Bonjour, est-ce que le soin Hydrafacial convient avant un mariage dans 3 jours ?', timestamp: '11:30' },
      {
        id: 'm5',
        sender: 'ai',
        text: 'Bonjour Imane 🌸 Tout à fait ! Notre soin Hydrafacial MD Prestige apporte un coup d’éclat immédiat sans éviction sociale ni rougeur.',
        timestamp: '11:32',
        isAiGenerated: true
      },
      { id: 'm6', sender: 'client', text: 'C’est noté merci pour les informations.', timestamp: '11:45' }
    ]
  }
];

export const REPUTATION_DATA = {
  googleRating: 4.8,
  totalReviews: 327,
  reviewsThisMonth: 23,
  requestConversionRate: '31%',
  reviewsList: [
    {
      id: 'rev-1',
      clientName: 'Meryem Tazi',
      rating: 5,
      text: 'Centre exceptionnel à Casablanca Gautier. Épilation laser indolore grâce à la machine Candela et équipe aux petits soins avec Yasmine.',
      date: 'Hier',
      source: 'Google Reviews',
      status: 'published',
      treatment: 'Épilation Laser'
    },
    {
      id: 'rev-2',
      clientName: 'Khadija El Fassi',
      rating: 5,
      text: 'Le meilleur Hydrafacial de Casablanca. Peau repulpée et lumineuse dès la fin de séance. Ambiance très apaisante.',
      date: 'Il y a 3 jours',
      source: 'Google Reviews',
      status: 'published',
      treatment: 'Hydrafacial MD'
    }
  ] as ReviewItem[]
};

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Dr. Sofia Berrada',
    role: 'Médecin Esthétique & Directrice Médicale',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    revenueMonth: 68400,
    averageTicket: 2450,
    rebookingRate: 88,
    packageSalesCount: 19,
    commissionRate: 15,
    services: ['Diagnostic Peau', 'Microneedling Exosomes', 'Détatouage Laser']
  },
  {
    id: 'st-2',
    name: 'Yasmine Bennani',
    role: 'Spécialiste Laser & Care OS Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    revenueMonth: 54200,
    averageTicket: 1650,
    rebookingRate: 84,
    packageSalesCount: 22,
    commissionRate: 10,
    services: ['Épilation Laser Candela', 'Soins Corps', 'Consultations']
  },
  {
    id: 'st-3',
    name: 'Kenza Chraibi',
    role: 'Experte Dermo-Esthétique',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    revenueMonth: 38900,
    averageTicket: 1400,
    rebookingRate: 79,
    packageSalesCount: 14,
    commissionRate: 10,
    services: ['Hydrafacial MD', 'Carbon Peel', 'Peeling Médical']
  }
];

export const CHANNEL_ROI_DATA = [
  { channel: 'Instagram Ads & Bio', leads: 68, appointments: 32, sales: 18, revenue: 31400, roi: '4.8x' },
  { channel: 'WhatsApp AI Direct', leads: 44, appointments: 28, sales: 16, revenue: 26800, roi: '6.2x' },
  { channel: 'Meta Ads (Facebook/Insta)', leads: 52, appointments: 21, sales: 11, revenue: 19200, roi: '3.4x' },
  { channel: 'Site Web Direct (SEO)', leads: 29, appointments: 14, sales: 9, revenue: 16500, roi: '8.1x' },
  { channel: 'Google Search & Maps', leads: 24, appointments: 12, sales: 8, revenue: 14800, roi: '5.5x' },
];
