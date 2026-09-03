import { useState, useEffect } from 'react';
import { clinicStore } from '../services/store';

export function useClinicStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = clinicStore.subscribe(() => {
      setTick((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  return {
    kpiData: clinicStore.kpiData,
    leads: clinicStore.leads,
    appointments: clinicStore.appointments,
    clients: clinicStore.clients,
    packages: clinicStore.packages,
    beforeAfter: clinicStore.beforeAfter,
    automations: clinicStore.automations,
    conversations: clinicStore.conversations,
    reviews: clinicStore.reviews,
    staff: clinicStore.staff,

    // Action Dispatchers
    addBookingFromClient: clinicStore.addBookingFromClient.bind(clinicStore),
    updateLeadStage: clinicStore.updateLeadStage.bind(clinicStore),
    addChatMessage: clinicStore.addChatMessage.bind(clinicStore),
    toggleAutomation: clinicStore.toggleAutomation.bind(clinicStore),
    toggleConsent: clinicStore.toggleConsent.bind(clinicStore),
  };
}
