import React, { useState } from 'react';
import { Camera, ShieldCheck, Check, Plus, Lock, Eye, Sparkles } from 'lucide-react';
import { BEFORE_AFTER_GALLERY } from '../../data/mockData';
import { BeforeAfterItem } from '../../types';

export const BeforeAfterGallery: React.FC = () => {
  const [gallery, setGallery] = useState<BeforeAfterItem[]>(BEFORE_AFTER_GALLERY);

  const toggleConsent = (id: string) => {
    setGallery((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, consentStatus: !item.consentStatus };
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
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Galerie Médicale & Preuves Visuelles</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Suivi Avant / Après & Consentements</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Démonstration de l'efficacité des soins et gestion stricte des autorisations de publication marketing.
          </p>
        </div>

        <button 
          onClick={() => alert('Sélection d’une photo depuis la caméra ou le dossier client')}
          className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-2 shadow"
        >
          <Camera className="w-4 h-4 text-brand-400" />
          <span>Ajouter une comparaison photo</span>
        </button>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6">
            
            {/* Header Item */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{item.clientName}</h3>
                <p className="text-xs font-medium text-brand-800">{item.treatment}</p>
              </div>

              {/* Marketing Consent Badge Toggle */}
              <button
                onClick={() => toggleConsent(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                  item.consentStatus
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
                title="Cliquer pour modifier l'autorisation de consentement"
              >
                {item.consentStatus ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" /> Autorisation Marketing OK
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> Usage Interne Uniquement
                  </>
                )}
              </button>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 h-52 bg-stone-100">
                  <img src={item.beforeImage} alt="Avant soin" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-stone-950/80 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                    AVANT
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-light block text-center">{item.beforeDate}</span>
              </div>

              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden border border-brand-300 h-52 bg-stone-100 shadow-sm">
                  <img src={item.afterImage} alt="Après soin" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-brand-500 text-stone-950 text-[10px] px-2.5 py-1 rounded-full font-bold">
                    APRÈS
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-light block text-center">{item.afterDate}</span>
              </div>
            </div>

            {/* Session Notes */}
            <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-stone-900 block">{item.sessionLabel}</span>
              <p className="text-stone-600 font-light">{item.notes}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
