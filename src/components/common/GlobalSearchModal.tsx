import React, { useState, useEffect } from 'react';
import { Search, X, User, Phone, Package, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { CLIENTS_LIST, INITIAL_LEADS } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredClients = CLIENTS_LIST.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query)
  );

  const filteredLeads = INITIAL_LEADS.filter(l =>
    l.name.toLowerCase().includes(query.toLowerCase()) || l.treatment.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-stone-200 shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center space-x-3 bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher cliente, prospect, téléphone, soin, forfait..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-stone-900 font-medium focus:outline-none placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[400px] overflow-y-auto space-y-4 text-xs">
          
          {/* Clients Section */}
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">Clientes 360°</span>
            <div className="space-y-1">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => {
                    onSelectResult('client', client.id);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-stone-100 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3">
                    <img src={client.avatar} alt={client.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-stone-900">{client.name}</h4>
                      <p className="text-[11px] text-stone-500">{client.phone} • LTV: {client.totalSpent} DH</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Leads Section */}
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">Prospects CRM</span>
            <div className="space-y-1">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => {
                    onSelectResult('lead', lead.id);
                    onClose();
                  }}
                  className="p-3 rounded-xl hover:bg-stone-100 cursor-pointer flex items-center justify-between transition"
                >
                  <div>
                    <h4 className="font-semibold text-stone-900">{lead.name}</h4>
                    <p className="text-[11px] text-stone-500">{lead.treatment} • {lead.source}</p>
                  </div>
                  <span className="font-bold text-brand-800">{lead.potentialValue} DH</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#FAF9F6] border-t border-stone-200 text-[11px] text-stone-400 flex items-center justify-between font-mono">
          <span>Taper pour rechercher...</span>
          <span>Échap pour fermer</span>
        </div>

      </div>
    </div>
  );
};
