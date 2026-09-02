import React, { useState } from 'react';
import { Bot, Sparkles, Send, CheckCircle2, Flame, ArrowRight, DollarSign, RefreshCw, Calendar } from 'lucide-react';
import { DashboardTab } from './Sidebar';

interface AIDailyBriefProps {
  onNavigateTab: (tab: DashboardTab) => void;
}

export const AIDailyBrief: React.FC<AIDailyBriefProps> = ({ onNavigateTab }) => {
  const [generatedMsg1, setGeneratedMsg1] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-charcoal-900 via-stone-900 to-stone-950 text-white p-8 rounded-3xl border border-stone-800 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Bot className="w-48 h-48 text-brand-400" />
        </div>

        <div className="flex items-center space-x-2 text-brand-400 text-xs uppercase font-bold tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Intelligence Propriétaire • Briefing Quotidien</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif text-stone-100 font-light leading-tight">
          Bonjour Yasmine, <br />
          <span className="font-normal italic text-brand-300">voici le résumé de votre activité hier à Casablanca.</span>
        </h1>

        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">
          Hier, votre centre a reçu <strong>18 nouvelles demandes</strong> (Instagram & WhatsApp). <br />
          <span className="text-emerald-400 font-semibold">11 ont réservé</span> immédiatement. <br />
          <span className="text-amber-400 font-semibold">7 n'ont pas encore réservé.</span> <br />
          Valeur potentielle restant à convertir aujourd'hui : <strong className="text-brand-300 font-bold">12 600 DH</strong>.
        </div>
      </div>

      {/* PRIORITIES ACTION LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-charcoal-900 flex items-center gap-2">
          <span>⚡ Vos 3 Priorités Financières Aujourd'hui</span>
        </h2>

        {/* PRIORITY 1 */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-lg p-6 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Priorité #1 • Lead Chaud À Relancer
            </span>
            <span className="text-lg font-serif font-bold text-brand-800">5 000 DH</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-brand-200 text-stone-950 font-bold text-sm flex items-center justify-center border border-brand-300">
              SA
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-stone-900 text-lg">Sara Amrani</h3>
              <p className="text-xs font-medium text-stone-600">Demande: Épilation Laser Corps Complet (Instagram)</p>
              <p className="text-xs text-stone-500 font-light italic">
                Raison: "Elle a demandé le tarif hier et n'a pas répondu après réception des informations tarifaires."
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-3">
            <span className="font-bold text-stone-900 block">Recommandation IA :</span>
            <p className="text-stone-700 font-light">
              Relancer avec les créneaux disponibles de ce jeudi (15h00) et vendredi (11h00) avec le bilan offert.
            </p>

            {generatedMsg1 ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-900 block">Message WhatsApp Généré :</span>
                <p className="text-xs text-stone-800 font-light italic bg-white p-2.5 rounded-lg border border-emerald-200">
                  {generatedMsg1}
                </p>
                <a
                  href={`https://wa.me/212661248890?text=${encodeURIComponent(generatedMsg1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer à Sara Amrani sur WhatsApp</span>
                </a>
              </div>
            ) : (
              <button
                onClick={() => setGeneratedMsg1("Bonjour Sara ! ✨ Nous avons réservé 2 créneaux de bilan laser offert pour vous ce jeudi à 15h ou vendredi à 11h à Casablanca Gautier. Souhaitez-vous bloquer l'un de ces créneaux ?")}
                className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs shadow transition flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Générer le message en 1-clic</span>
              </button>
            )}
          </div>
        </div>

        {/* PRIORITY 2 */}
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-900 px-3 py-1 rounded-full">
              Priorité #2 • Suivi Séance Forfait
            </span>
            <span className="text-lg font-serif font-bold text-brand-800">3 900 DH</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-brand-200 text-stone-950 font-bold text-sm flex items-center justify-center border border-brand-300">
              SE
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-lg">Sara El Mansouri</h3>
              <p className="text-xs font-medium text-stone-600">Forfait Laser Corps (4 / 6 séances complétées)</p>
              <p className="text-xs text-stone-500 font-light italic mt-0.5">
                Raison: "Intervalle de 4 semaines atteint. Cliente prête pour planifier sa séance 5."
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => onNavigateTab('packages')}
              className="px-5 py-2.5 rounded-full bg-charcoal-900 hover:bg-stone-800 text-brand-200 text-xs font-bold shadow transition"
            >
              Planifier séance 5 →
            </button>
          </div>
        </div>

        {/* PRIORITY 3 */}
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800 px-3 py-1 rounded-full">
              Priorité #3 • Réactivation Clients Dormants
            </span>
            <span className="text-lg font-serif font-bold text-emerald-600">14 200 DH</span>
          </div>

          <div>
            <h3 className="font-serif font-bold text-stone-900 text-lg">18 Clientes Inactives (60+ Jours)</h3>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              Anciennes clientes à forte valeur sans rendez-vous programmé depuis plus de 2 mois.
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => onNavigateTab('reactivation')}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Lancer la campagne WhatsApp globale →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
