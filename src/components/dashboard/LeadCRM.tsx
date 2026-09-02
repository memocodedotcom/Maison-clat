import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  X,
  ChevronRight,
  Plus,
  Send,
  Flame,
  Bot
} from 'lucide-react';
import { Lead } from '../../types';
import { INITIAL_LEADS } from '../../data/mockData';

interface LeadCRMProps {
  onSelectLead?: (lead: Lead) => void;
}

export const LeadCRM: React.FC<LeadCRMProps> = () => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(INITIAL_LEADS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery);
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const [aiGeneratedMsg, setAiGeneratedMsg] = useState<string | null>(null);

  const handleGenerateAiMsg = (lead: Lead) => {
    if (lead.aiNextBestAction?.suggestedMessage) {
      setAiGeneratedMsg(lead.aiNextBestAction.suggestedMessage);
    } else {
      setAiGeneratedMsg(`Bonjour ${lead.name} ! ✨ Nous avons des disponibilités cette semaine à la Maison Éclat Casablanca Gautier pour votre soin ${lead.treatment}. Souhaitez-vous bloquer votre créneau ?`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Acquisition & Suivi Prospects</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Lead CRM & Intelligence</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Convertissez vos prospects Instagram, Meta et WhatsApp en rendez-vous qualifiés.
          </p>
        </div>

        <button 
          onClick={() => alert('Nouveau lead ajouté au CRM !')}
          className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-2 shadow"
        >
          <Plus className="w-4 h-4 text-brand-400" />
          <span>Ajouter un prospect</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ivory-border shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, soin, téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Source:
          </span>
          {['all', 'Instagram', 'WhatsApp', 'Meta Ads', 'Website'].map((src) => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                sourceFilter === src
                  ? 'bg-charcoal-900 text-brand-200 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {src === 'all' ? 'Toutes' : src}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT: TABLE + SIDE DRAWER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Lead Table */}
        <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-3xl border border-ivory-border shadow-soft overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Prospect</th>
                  <th className="p-4">Traitement</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Valeur</th>
                  <th className="p-4">Dernier Contact</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setAiGeneratedMsg(null);
                    }}
                    className={`cursor-pointer hover:bg-stone-50 transition ${
                      selectedLead?.id === lead.id ? 'bg-brand-50/50 font-medium' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-200 text-stone-900 font-bold text-xs flex items-center justify-center">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-stone-900 flex items-center gap-1">
                            {lead.name}
                            {lead.temperature === 'CHAUD' && (
                              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400 font-light">{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-stone-800">{lead.treatment}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700">
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-brand-800">{lead.potentialValue} DH</td>
                    <td className="p-4 text-stone-500 font-light">{lead.lastContact}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-amber-100 text-amber-900">
                        {lead.nextAction}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Detailed Side Drawer with AI Next Best Action */}
        {selectedLead && (
          <div className="lg:col-span-5 bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6 relative flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500 text-stone-950 font-bold text-sm flex items-center justify-center border border-brand-300">
                    {selectedLead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-charcoal-900">{selectedLead.name}</h3>
                    <p className="text-xs text-stone-500">{selectedLead.phone} • {selectedLead.source}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Overview Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Soin d'intérêt</span>
                  <span className="font-semibold text-stone-900 block mt-0.5">{selectedLead.treatment}</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Valeur Potentielle</span>
                  <span className="font-bold text-brand-800 block mt-0.5">{selectedLead.potentialValue} DH</span>
                </div>
              </div>

              {/* AI NEXT BEST ACTION CARD */}
              <div className="bg-gradient-to-br from-stone-900 via-charcoal-900 to-stone-950 text-white p-5 rounded-2xl border border-stone-800 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <Bot className="w-4 h-4" />
                    <span>AI Next Best Action</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    Score: 92/100
                  </span>
                </div>

                <p className="text-xs text-stone-300 font-light italic leading-relaxed">
                  "{selectedLead.aiNextBestAction?.insight || 'Demande de tarif effectuée par message direct.'}"
                </p>

                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                  <span className="text-[10px] uppercase font-bold text-brand-300 block mb-1">Recommandation</span>
                  <span className="text-stone-200 font-medium">
                    {selectedLead.aiNextBestAction?.recommendation || 'Envoyer un suivi avec les créneaux disponibles cette semaine.'}
                  </span>
                </div>

                {/* AI Action Buttons */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => handleGenerateAiMsg(selectedLead)}
                    className="flex-1 py-2.5 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs shadow transition flex items-center justify-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Générer le message</span>
                  </button>

                  <button
                    onClick={() => alert(`Lead ${selectedLead.name} marqué comme contacté !`)}
                    className="px-3 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition"
                  >
                    Marquer contacté
                  </button>
                </div>
              </div>

              {/* AI Message Preview Output */}
              {aiGeneratedMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      Message WhatsApp suggéré :
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(aiGeneratedMsg)}
                      className="text-[10px] underline text-emerald-700"
                    >
                      Copier
                    </button>
                  </div>
                  <p className="text-xs text-stone-800 font-light italic leading-relaxed bg-white p-3 rounded-xl border border-emerald-200">
                    {aiGeneratedMsg}
                  </p>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(aiGeneratedMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer directement sur WhatsApp</span>
                  </a>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
