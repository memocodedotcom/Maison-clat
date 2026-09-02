import React, { useState } from 'react';
import { Package, Sparkles, CheckCircle2, Clock, Calendar, AlertTriangle, Plus, ChevronRight } from 'lucide-react';
import { PACKAGE_TRACKER_DEMO } from '../../data/mockData';
import { PackageItem } from '../../types';

export const PackageTracker: React.FC = () => {
  const [pkg, setPkg] = useState<PackageItem>(PACKAGE_TRACKER_DEMO);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Fidélisation & Suivi des Cures</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Suivi des Forfaits & Séances</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Assurez un taux de complétion de 100% de vos forfaits et déclenchez automatiquement le renouvellement.
          </p>
        </div>

        <button 
          onClick={() => alert('Création d’un nouveau forfait client')}
          className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-2 shadow"
        >
          <Plus className="w-4 h-4 text-brand-400" />
          <span>Vendre un forfait</span>
        </button>
      </div>

      {/* FLAGSHIP PACKAGE CARD */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 lg:p-8 space-y-8">
        
        {/* Package Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-serif font-bold text-charcoal-900">{pkg.packageName}</h2>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Forfait Actif
              </span>
            </div>
            <p className="text-xs text-stone-500 font-light mt-1">
              Cliente: <strong className="text-stone-900">{pkg.clientName}</strong> • Praticien référent: <strong className="text-stone-900">{pkg.assignedPractitioner}</strong>
            </p>
          </div>

          {/* Renewal Recommendation Alert Badge */}
          {pkg.status === 'renewal_recommended' && (
            <div className="bg-amber-50 border border-amber-300/80 p-3.5 rounded-2xl flex items-center space-x-3 text-amber-900 text-xs shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold block">Renouvellement Recommandé !</span>
                <span className="text-[11px] font-light">Proposer l'offre privilège -20% sur la 2ème zone dès aujourd'hui.</span>
              </div>
              <button 
                onClick={() => alert('Proposition d’offre de renouvellement envoyée par WhatsApp !')}
                className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-[10px] ml-2"
              >
                Proposer
              </button>
            </div>
          )}
        </div>

        {/* Visual Progress Bar Section */}
        <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Progression de la cure</span>
            <span className="text-sm font-serif font-bold text-brand-800">
              {pkg.completedSessions} / {pkg.totalSessions} séances effectuées
            </span>
          </div>

          <div className="w-full bg-stone-200 h-3.5 rounded-full overflow-hidden border border-stone-300/60 p-0.5">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(pkg.completedSessions / pkg.totalSessions) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[11px] text-stone-500 font-light pt-1">
            <span>Montant Réglé: <strong>{pkg.pricePaid} DH</strong></span>
            <span>Séance suivante recommandée: <strong className="text-stone-900">{pkg.nextRecommendedDate}</strong></span>
          </div>
        </div>

        {/* Sessions Timeline Table */}
        <div className="space-y-3">
          <h3 className="font-serif font-semibold text-charcoal-900 text-lg">Journal des Séances du Forfait</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pkg.sessionLogs.map((log) => (
              <div
                key={log.sessionNum}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                  log.status === 'Completed'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif font-bold text-stone-900">Séance {log.sessionNum}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {log.status === 'Completed' ? 'Complétée ✓' : 'À planifier'}
                    </span>
                  </div>

                  <span className="text-xs text-stone-600 font-medium block">{log.date}</span>
                  {log.notes && (
                    <p className="text-[11px] text-stone-500 font-light mt-1 italic">{log.notes}</p>
                  )}
                </div>

                {log.status !== 'Completed' && (
                  <button
                    onClick={() => alert(`Séance ${log.sessionNum} planifiée dans l'agenda !`)}
                    className="w-full py-2 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition shadow-sm mt-2"
                  >
                    Planifier cette séance →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
