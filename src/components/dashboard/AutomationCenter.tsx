import React, { useState } from 'react';
import { Zap, MessageSquare, DollarSign, CalendarCheck, CheckCircle2, Play, Pause, ChevronRight, X, Sparkles } from 'lucide-react';
import { AUTOMATIONS_LIST } from '../../data/mockData';
import { AutomationItem } from '../../types';

export const AutomationCenter: React.FC = () => {
  const [automations, setAutomations] = useState<AutomationItem[]>(AUTOMATIONS_LIST);
  const [selectedAuto, setSelectedAuto] = useState<AutomationItem | null>(AUTOMATIONS_LIST[3]);

  const toggleAutomationStatus = (id: string) => {
    setAutomations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: item.status === 'active' ? 'paused' : 'active' };
        }
        return item;
      })
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Pilote Automatique de Revenus</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Moteur d'Automations WhatsApp</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Relances de séance, confirmations, récupération no-show et demandes d'avis 100% automatisées.
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-ivory-border shadow-soft flex items-center space-x-4 text-xs font-semibold">
          <div>
            <span className="text-stone-400 text-[10px] block uppercase">Chiffre d'Affaires Généré</span>
            <span className="text-lg font-serif font-bold text-emerald-600">419 800 DH</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID + DETAIL MODAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Automation Cards */}
        <div className={`${selectedAuto ? 'lg:col-span-7' : 'lg:col-span-12'} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
          {automations.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAuto(item)}
              className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedAuto?.id === item.id
                  ? 'bg-brand-50/60 border-brand-400 shadow-md ring-1 ring-brand-400'
                  : 'bg-white border-ivory-border hover:border-stone-300 shadow-soft'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {item.status === 'active' ? 'ACTIF ✓' : 'EN PAUSE'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAutomationStatus(item.id);
                    }}
                    className="text-stone-400 hover:text-stone-900"
                  >
                    {item.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-stone-900 text-base">{item.title}</h3>
                <p className="text-stone-500 text-xs font-light mt-1">Déclencheur: {item.trigger}</p>
              </div>

              <div className="pt-3 border-t border-stone-200/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">RDV Générés</span>
                  <span className="font-bold text-stone-900">{item.bookingsGenerated} rdv</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Revenu Attribué</span>
                  <span className="font-bold text-emerald-600">+{item.revenueAttributed} DH</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Rule Viewer (WHEN / IF / THEN) */}
        {selectedAuto && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-brand-600" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">{selectedAuto.title}</h3>
              </div>
              <button
                onClick={() => setSelectedAuto(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Logical Blocks (WHEN / IF / THEN) */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-1">
                <span className="font-bold text-brand-800 uppercase tracking-widest text-[10px]">QUAND (TRIGGER)</span>
                <p className="font-semibold text-stone-900 text-sm">{selectedAuto.conditionLogic.when}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-1">
                <span className="font-bold text-brand-800 uppercase tracking-widest text-[10px]">SI (CONDITION)</span>
                <p className="font-semibold text-stone-900 text-sm">{selectedAuto.conditionLogic.ifCondition}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-1">
                <span className="font-bold text-brand-800 uppercase tracking-widest text-[10px]">ALORS (ACTION)</span>
                <p className="font-semibold text-stone-900 text-sm">{selectedAuto.conditionLogic.thenAction}</p>
              </div>
            </div>

            {/* Message Preview */}
            <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 space-y-2 text-xs border border-stone-800">
              <span className="text-[10px] uppercase font-bold text-brand-400">Aperçu Message WhatsApp Envoyé</span>
              <p className="font-light italic leading-relaxed text-stone-300">
                "{selectedAuto.conditionLogic.messagePreview}"
              </p>
            </div>

            <button
              onClick={() => alert(`Règle d'automation "${selectedAuto.title}" enregistrée !`)}
              className="w-full py-3 rounded-full bg-charcoal-900 text-brand-200 font-bold text-xs hover:bg-stone-800 transition shadow"
            >
              Modifier cette automation →
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
