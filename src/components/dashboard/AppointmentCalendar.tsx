import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Filter, Plus, User, ShieldCheck, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { TODAY_APPOINTMENTS } from '../../data/mockData';
import { Appointment } from '../../types';

export const AppointmentCalendar: React.FC = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [appointments, setAppointments] = useState<Appointment[]>(TODAY_APPOINTMENTS);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Planning & Ressources Médicales</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Agenda des Rendez-Vous</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Gestion intelligente des créneaux, des salles et des équipements laser sans conflit.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Switcher Pills */}
          <div className="bg-stone-200 p-1 rounded-full flex text-xs font-medium text-stone-700">
            {(['day', 'week', 'month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-full uppercase tracking-wider text-[10px] font-bold transition ${
                  viewMode === mode ? 'bg-charcoal-900 text-brand-200 shadow-sm' : 'hover:text-stone-900'
                }`}
              >
                {mode === 'day' ? 'Jour' : mode === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Nouveau rdv ajouté à l’agenda')}
            className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-brand-400" />
            <span>Nouveau RDV</span>
          </button>
        </div>
      </div>

      {/* Date Navigation & Resource Status Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ivory-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-semibold text-charcoal-900 text-base">Mercredi 2 Septembre 2026</span>
          <button className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-stone-600 font-medium">Candela Pro: En cours</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-stone-600 font-medium">Hydrafacial Elite: Libre</span>
          </div>
        </div>
      </div>

      {/* CALENDAR TIMELINE VIEW & DRAWER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Schedule Timeline */}
        <div className={`${selectedAppt ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4`}>
          <div className="space-y-3">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                onClick={() => setSelectedAppt(appt)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  selectedAppt?.id === appt.id
                    ? 'bg-brand-50/60 border-brand-400 shadow-md ring-1 ring-brand-400'
                    : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-center bg-white p-2 rounded-xl border border-stone-200 min-w-[70px] shadow-sm">
                    <span className="text-xs font-mono font-bold text-stone-900 block">{appt.time}</span>
                    <span className="text-[10px] text-stone-400 font-light">{appt.duration} min</span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">{appt.clientName}</h4>
                    <p className="text-xs font-semibold text-brand-800">{appt.treatmentName}</p>
                    
                    {/* Resource allocation tag */}
                    <div className="flex items-center space-x-2 text-[10px] text-stone-500 font-light mt-1">
                      <span>👤 {appt.practitioner}</span>
                      <span>•</span>
                      <span>🚪 {appt.room}</span>
                      <span>•</span>
                      <span>⚡ {appt.equipment}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-serif font-bold text-stone-900 text-sm">{appt.price} DH</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    appt.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : appt.status === 'In Treatment'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : appt.status === 'Confirmed'
                      ? 'bg-brand-100 text-brand-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Appointment Drawer */}
        {selectedAppt && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-semibold text-brand-600">Détails de la séance</span>
                <h3 className="text-lg font-serif font-bold text-charcoal-900">{selectedAppt.clientName}</h3>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 text-[10px] uppercase font-semibold block">Soin</span>
                <span className="font-semibold text-stone-900 text-sm block mt-0.5">{selectedAppt.treatmentName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold block">Praticien</span>
                  <span className="font-semibold text-stone-900 block mt-0.5">{selectedAppt.practitioner}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-stone-400 text-[10px] uppercase font-semibold block">Salle & Machine</span>
                  <span className="font-semibold text-stone-900 block mt-0.5">{selectedAppt.room}</span>
                </div>
              </div>

              {selectedAppt.notes && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <span className="font-bold block text-[10px] uppercase">Notes de séance :</span>
                  <p className="font-light mt-0.5">{selectedAppt.notes}</p>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => alert(`Statut du RDV de ${selectedAppt.clientName} mis à jour : COMPLÉTÉ`)}
                className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow"
              >
                Marquer comme "Terminé ✓"
              </button>
              <button
                onClick={() => alert(`Rappel SMS/WhatsApp envoyé à ${selectedAppt.clientName}`)}
                className="w-full py-2.5 rounded-full border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-50 transition"
              >
                Envoyer un rappel WhatsApp
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
