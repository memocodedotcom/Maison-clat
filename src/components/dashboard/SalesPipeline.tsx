import React, { useState } from 'react';
import { Kanban, Sparkles, Plus, Flame, ChevronRight, DollarSign } from 'lucide-react';
import { LeadStage } from '../../types';
import { INITIAL_LEADS } from '../../data/mockData';

export const SalesPipeline: React.FC = () => {
  const STAGES: LeadStage[] = [
    'Nouveau Lead',
    'Contacté',
    'Qualifié',
    'RDV Réservé',
    'Confirmé',
    'Présent',
    'Traitement vendu',
    'Forfait actif',
    'À réactiver'
  ];

  const [leads, setLeads] = useState(INITIAL_LEADS);

  const getLeadsByStage = (stage: LeadStage) => {
    return leads.filter((l) => l.stage === stage);
  };

  const calculateStageTotal = (stage: LeadStage) => {
    return getLeadsByStage(stage).reduce((sum, l) => sum + l.potentialValue, 0);
  };

  const moveLeadToNextStage = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const currentIndex = STAGES.indexOf(l.stage);
          const nextStage = STAGES[Math.min(currentIndex + 1, STAGES.length - 1)];
          return { ...l, stage: nextStage };
        }
        return l;
      })
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Pipeline Commercial & Conversions</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Pipeline de Vente Kanban</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Suivez le parcours complet de vos clientes du 1er message Instagram au renouvellement de forfait.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-sm font-semibold">
            Valeur Totale Pipeline: <span className="text-brand-800 font-bold">142 800 DH</span>
          </div>
        </div>
      </div>

      {/* Kanban Board Horizon Scroll */}
      <div className="flex space-x-4 overflow-x-auto pb-6 pt-2">
        {STAGES.map((stage) => {
          const stageLeads = getLeadsByStage(stage);
          const totalVal = calculateStageTotal(stage);

          return (
            <div
              key={stage}
              className="w-72 flex-shrink-0 bg-stone-100/70 rounded-2xl border border-stone-200 p-3 space-y-3 flex flex-col justify-between"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                <div>
                  <h3 className="font-serif font-semibold text-stone-900 text-sm">{stage}</h3>
                  <span className="text-[10px] text-stone-500 font-light">{stageLeads.length} prospects</span>
                </div>
                <span className="text-xs font-bold text-brand-800 bg-white px-2 py-0.5 rounded-full border border-stone-200">
                  {totalVal} DH
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 text-center text-stone-400 text-xs font-light border border-dashed border-stone-300 rounded-xl">
                    Aucun prospect à ce stade
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-brand-400 hover:shadow-md transition space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold bg-stone-100 px-2 py-0.5 rounded-full text-stone-600">
                          {lead.source}
                        </span>
                        {lead.temperature === 'CHAUD' && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-amber-500" /> CHAUD
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-serif font-semibold text-stone-900 text-sm">{lead.name}</h4>
                        <p className="text-xs text-stone-600 font-light mt-0.5">{lead.treatment}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                        <span className="font-bold text-brand-800">{lead.potentialValue} DH</span>
                        <button
                          onClick={() => moveLeadToNextStage(lead.id)}
                          className="text-[10px] font-semibold text-stone-700 bg-stone-100 hover:bg-brand-500 hover:text-stone-950 px-2.5 py-1 rounded-full transition flex items-center gap-0.5"
                          title="Avancer au stade suivant"
                        >
                          Avancer <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
