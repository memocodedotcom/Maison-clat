import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, TrendingUp, AlertTriangle, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { REPUTATION_DATA } from '../../data/mockData';

export const ReputationManager: React.FC = () => {
  const [reviews, setReviews] = useState(REPUTATION_DATA.reviewsList);
  const [autoRequestEnabled, setAutoRequestEnabled] = useState<boolean>(true);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Réputation & Visibilité Google</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">E-Réputation & Collection d'Avis</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Automatisez la collecte d'avis 5 étoiles auprès de vos clientes satisfaites après chaque soin.
          </p>
        </div>

        {/* Auto-Trigger Toggle */}
        <div className="bg-white p-3 rounded-2xl border border-ivory-border shadow-soft flex items-center space-x-3 text-xs">
          <span className="font-semibold text-stone-800">Demandes automatiques post-soin</span>
          <button
            onClick={() => setAutoRequestEnabled(!autoRequestEnabled)}
            className={`w-11 h-6 rounded-full transition p-1 flex items-center ${
              autoRequestEnabled ? 'bg-emerald-500 justify-end' : 'bg-stone-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
          </button>
        </div>
      </div>

      {/* TOP RATING METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Note Google Maps</span>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-serif font-bold text-charcoal-900">{REPUTATION_DATA.googleRating}</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-stone-500 font-light block">Basé sur 327 avis certifiés</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Nouveaux Avis Ce Mois</span>
          <div className="text-3xl font-serif font-bold text-emerald-600">+{REPUTATION_DATA.reviewsThisMonth}</div>
          <span className="text-[11px] text-emerald-600 font-semibold block flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +28% vs mois dernier
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Taux de Conversion SMS/WA</span>
          <div className="text-3xl font-serif font-bold text-charcoal-900">{REPUTATION_DATA.requestConversionRate}</div>
          <span className="text-[11px] text-stone-500 font-light block">1 cliente sur 3 dépose un avis</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Alertes Avis Négatifs</span>
          <div className="text-3xl font-serif font-bold text-emerald-600">0</div>
          <span className="text-[11px] text-stone-500 font-light block">Aucun signalement critique</span>
        </div>

      </div>

      {/* RECENT REVIEWS FEED */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6">
        <h3 className="font-serif font-bold text-charcoal-900 text-lg">Derniers Avis Reçus</h3>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-stone-900">{rev.clientName}</h4>
                  <span className="text-[10px] text-stone-500 font-light">• Soin: {rev.treatment}</span>
                </div>

                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-stone-700 font-light italic leading-relaxed">"{rev.text}"</p>

              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-400">
                <span>Source: {rev.source} ({rev.date})</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Publié sur Google Maps</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
