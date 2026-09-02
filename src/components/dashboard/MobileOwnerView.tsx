import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, MessageSquare, Menu, DollarSign, Sparkles, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import { INITIAL_KPI_DATA, TODAY_APPOINTMENTS, INITIAL_LEADS } from '../../data/mockData';
import { DashboardTab } from './Sidebar';

interface MobileOwnerViewProps {
  onNavigateTab: (tab: DashboardTab) => void;
}

export const MobileOwnerView: React.FC<MobileOwnerViewProps> = ({ onNavigateTab }) => {
  const [mobileTab, setMobileTab] = useState<'home' | 'leads' | 'calendar' | 'messages'>('home');

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 pb-20 font-sans">
      
      {/* Top Mobile Bar */}
      <div className="bg-charcoal-900 text-white p-4 sticky top-14 z-30 flex items-center justify-between border-b border-stone-800">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400">Owner Mobile • Maison Éclat</span>
          <h2 className="text-lg font-serif font-semibold">Bonjour Yasmine 👋</h2>
        </div>
        <div className="bg-brand-500 text-stone-950 font-bold text-xs px-2.5 py-1 rounded-full">
          8 450 DH aujourd'hui
        </div>
      </div>

      {/* Main Mobile Screen Body */}
      <div className="p-4 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">CA Aujourd'hui</span>
            <span className="text-xl font-serif font-bold text-stone-900 mt-1 block">8 450 DH</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Rendez-Vous</span>
            <span className="text-xl font-serif font-bold text-brand-800 mt-1 block">18 rdv</span>
          </div>
        </div>

        {/* Urgent Actions Section */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-stone-900 text-base">🔥 Priorités du jour</h3>

          <div
            onClick={() => onNavigateTab('leads')}
            className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔥</span>
              <div>
                <h4 className="font-bold text-xs text-amber-950">7 prospects Instagram en attente</h4>
                <p className="text-[10px] text-amber-800 font-light">Valeur potentielle: 12 600 DH</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-600" />
          </div>

          <div
            onClick={() => onNavigateTab('appointments')}
            className="p-4 rounded-2xl bg-orange-50 border border-orange-200 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">📅</span>
              <div>
                <h4 className="font-bold text-xs text-orange-950">5 rdv non confirmés pour demain</h4>
                <p className="text-[10px] text-orange-800 font-light">Relance WhatsApp 1-clic disponible</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </div>
        </div>

        {/* Today's Appointments List */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Prochains RDV</h4>
            <button onClick={() => onNavigateTab('appointments')} className="text-xs text-brand-700 font-semibold">Voir tout</button>
          </div>

          <div className="space-y-2">
            {TODAY_APPOINTMENTS.slice(0, 3).map((appt) => (
              <div key={appt.id} className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">{appt.clientName} ({appt.time})</span>
                  <span className="text-[10px] text-stone-500 font-light">{appt.treatmentName}</span>
                </div>
                <span className="font-bold text-brand-800">{appt.price} DH</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-stone-950 text-stone-400 border-t border-stone-800 py-2.5 px-6 flex items-center justify-around text-[10px] font-medium z-40">
        <button onClick={() => setMobileTab('home')} className={`flex flex-col items-center ${mobileTab === 'home' ? 'text-brand-400 font-bold' : ''}`}>
          <LayoutDashboard className="w-4 h-4" />
          <span>Accueil</span>
        </button>

        <button onClick={() => onNavigateTab('leads')} className="flex flex-col items-center hover:text-white">
          <Users className="w-4 h-4" />
          <span>Leads (7)</span>
        </button>

        <button onClick={() => onNavigateTab('appointments')} className="flex flex-col items-center hover:text-white">
          <Calendar className="w-4 h-4" />
          <span>Agenda</span>
        </button>

        <button onClick={() => onNavigateTab('messages')} className="flex flex-col items-center hover:text-white">
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>
      </div>

    </div>
  );
};
