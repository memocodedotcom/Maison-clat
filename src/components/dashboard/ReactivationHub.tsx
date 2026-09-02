import React, { useState } from 'react';
import { RefreshCw, DollarSign, Send, Users, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ReactivationHub: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('60');
  const [campaignSent, setCampaignSent] = useState<boolean>(false);

  const SEGMENTS = [
    { id: '30', title: 'Inactives 30+ Jours', count: 14, potential: '8 400 DH', desc: 'Dernière séance il y a 1 mois' },
    { id: '60', title: 'Inactives 60+ Jours (Priorité VIP)', count: 18, potential: '14 200 DH', desc: 'Clientes à forte valeur sans RDV futur' },
    { id: '90', title: 'Inactives 90+ Jours', count: 15, potential: '8 900 DH', desc: 'Risque de perte définitive' },
    { id: 'unfinished', title: 'Forfaits Inachevés', count: 8, potential: '12 800 DH', desc: 'Au moins 2 séances restantes non réservées' },
  ];

  const handleLaunchCampaign = () => {
    setCampaignSent(true);
    setTimeout(() => {
      alert('Campagne de réactivation lancée avec succès sur WhatsApp auprès du segment sélectionné !');
    }, 300);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Récupération de Chiffre d'Affaires</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Hub de Réactivation des Clientes Dormantes</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Récupérez jusqu'à 31 500 DH d'opportunités dormantes en 1-clic grâce aux offres VIP sur-mesure.
          </p>
        </div>

        {/* Global Potential Strip */}
        <div className="bg-gradient-to-r from-stone-900 to-charcoal-900 text-white p-4 rounded-2xl border border-stone-800 shadow-xl flex items-center space-x-6">
          <div>
            <span className="text-[10px] text-brand-300 uppercase font-semibold block">Clientes Inactives</span>
            <span className="text-xl font-serif font-bold">47 clientes</span>
          </div>
          <div className="border-l border-stone-700 pl-6">
            <span className="text-[10px] text-brand-300 uppercase font-semibold block">Revenu Récupérable Estimé</span>
            <span className="text-2xl font-serif font-bold text-emerald-400">31 500 DH</span>
          </div>
        </div>
      </div>

      {/* SEGMENT SELECTION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            onClick={() => {
              setSelectedSegment(seg.id);
              setCampaignSent(false);
            }}
            className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedSegment === seg.id
                ? 'bg-brand-50/70 border-brand-400 shadow-md ring-1 ring-brand-400'
                : 'bg-white border-ivory-border hover:border-stone-300 shadow-soft'
            }`}
          >
            <div>
              <span className="text-xs font-serif font-bold text-stone-900 block">{seg.title}</span>
              <p className="text-[11px] text-stone-500 font-light mt-1">{seg.desc}</p>
            </div>

            <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">{seg.count} clientes</span>
              <span className="font-serif font-bold text-emerald-600">{seg.potential}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CAMPAIGN LAUNCH PANEL */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <span className="text-[10px] uppercase font-semibold text-brand-600">Lancer une campagne de relance</span>
            <h3 className="text-xl font-serif font-bold text-charcoal-900">
              Campagne VIP: Segment {SEGMENTS.find(s => s.id === selectedSegment)?.title}
            </h3>
          </div>

          <span className="text-sm font-serif font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {SEGMENTS.find(s => s.id === selectedSegment)?.potential} potentiels
          </span>
        </div>

        {/* Campaign Offer Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          
          <div className="space-y-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Intitulé de l'Offre Incitative</label>
              <input
                type="text"
                defaultValue="Offre Privilège Éclat — Bilan & Booster Hydrafacial offert"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Message WhatsApp Personnalisé</label>
              <textarea
                rows={4}
                defaultValue="Bonjour {{prenom}} ✨ Vous nous manquez à la Maison Éclat Casablanca Gautier ! Pour fêter la rentrée, profitez d'un Booster Hydrafacial offert pour toute réservation cette semaine. Cliquez pour choisir votre horaire."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-500 font-light"
              ></textarea>
            </div>
          </div>

          {/* Target Audience Preview */}
          <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Aperçu du Ciblage</h4>
            <ul className="space-y-2 text-stone-600 font-light">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Audience ciblée: {SEGMENTS.find(s => s.id === selectedSegment)?.count} clientes premium</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Envoi automatisé via API officielle WhatsApp Business</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Suivi des réponses et attribution automatique du chiffre d'affaires</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={handleLaunchCampaign}
                disabled={campaignSent}
                className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center space-x-2 ${
                  campaignSent
                    ? 'bg-emerald-600 text-white'
                    : 'bg-charcoal-900 hover:bg-stone-800 text-brand-200'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{campaignSent ? 'Campagne envoyée avec succès ✓' : 'Lancer la campagne WhatsApp en 1-clic'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
