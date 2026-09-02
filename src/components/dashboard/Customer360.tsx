import React, { useState } from 'react';
import { Contact, DollarSign, Calendar, Sparkles, Star, Tag, Clock, ArrowDown, CheckCircle2, MessageSquare, Camera } from 'lucide-react';
import { CLIENTS_LIST } from '../../data/mockData';
import { Client } from '../../types';

export const Customer360: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client>(CLIENTS_LIST[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'timeline' | 'photos'>('overview');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Profile Banner */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-5">
            <img
              src={selectedClient.avatar}
              alt={selectedClient.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-brand-300 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">{selectedClient.name}</h1>
                <div className="flex space-x-1">
                  {selectedClient.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-500 font-light mt-1">
                {selectedClient.phone} • {selectedClient.email} • Source: <strong className="text-stone-700">{selectedClient.leadSource}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-left border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Valeur Client (LTV)</span>
              <span className="text-2xl font-serif font-bold text-brand-800">{selectedClient.totalSpent} DH</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Séances Totales</span>
              <span className="text-2xl font-serif font-bold text-stone-900">{selectedClient.visitCount} visites</span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 text-xs font-semibold text-stone-500 space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'overview' ? 'border-brand-500 text-stone-900 font-bold' : 'border-transparent hover:text-stone-700'
            }`}
          >
            Vue d'ensemble 360°
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'timeline' ? 'border-brand-500 text-stone-900 font-bold' : 'border-transparent hover:text-stone-700'
            }`}
          >
            Chronologie Parcours
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`pb-3 transition border-b-2 ${
              activeTab === 'packages' ? 'border-brand-500 text-stone-900 font-bold' : 'border-transparent hover:text-stone-700'
            }`}
          >
            Forfaits Actifs
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Customer Details */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-ivory-border shadow-soft space-y-6">
          <h3 className="font-serif font-semibold text-charcoal-900 text-base">Informations Médicales & Profil</h3>

          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Forfait En Cours</span>
              <span className="font-bold text-stone-900 block mt-0.5">{selectedClient.activePackage}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Soins Préférés</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedClient.favoriteTreatments.map((t, i) => (
                  <span key={i} className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[10px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Dernière Visite</span>
              <span className="font-semibold text-stone-900 block mt-0.5">{selectedClient.lastVisit}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Timeline Lifecycle */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-ivory-border shadow-soft space-y-6">
          <h3 className="font-serif font-semibold text-charcoal-900 text-base">Chronologie du Parcours Cliente</h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-200">
            {selectedClient.timeline.map((item, idx) => (
              <div key={item.id} className="relative flex items-start space-x-4">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-white shadow-sm flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-stone-950" />
                </div>
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{item.title}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-xs text-stone-600 font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
