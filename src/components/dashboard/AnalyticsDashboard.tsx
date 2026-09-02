import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Award, Sparkles, Percent } from 'lucide-react';
import { CHANNEL_ROI_DATA } from '../../data/mockData';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Performance Financière & Attributon</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Analytics & ROI Canaux d'Acquisition</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Mesurez le retour sur investissement exact de vos campagnes Instagram, WhatsApp et Meta Ads.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-2xl border border-ivory-border shadow-soft text-xs font-semibold">
          Chiffre d'Affaires Mensuel: <span className="text-xl font-serif font-bold text-brand-800 ml-1">142 800 DH</span>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Panier Moyen Par Cliente</span>
          <div className="text-2xl font-serif font-bold text-charcoal-900">1 850 DH</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">+12% grâce aux forfaits multi-zones</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Taux de Re-Réservation (Rebooking)</span>
          <div className="text-2xl font-serif font-bold text-emerald-600">84%</div>
          <span className="text-[11px] text-stone-500 font-light block">Fidélisation exceptionnelle</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Taux de Présence (Show-Up)</span>
          <div className="text-2xl font-serif font-bold text-charcoal-900">82%</div>
          <span className="text-[11px] text-stone-500 font-light block">No-shows limités à 8%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-2">
          <span className="text-stone-500 text-xs font-medium">Vente de Forfaits / Consultation</span>
          <div className="text-2xl font-serif font-bold text-brand-800">74%</div>
          <span className="text-[11px] text-stone-500 font-light block">Conversion en cure 6 séances</span>
        </div>

      </div>

      {/* CHANNEL ROI TABLE */}
      <div className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div>
            <h3 className="font-serif font-bold text-charcoal-900 text-lg">Retour sur Investissement par Canal (ROI)</h3>
            <p className="text-xs text-stone-500 font-light">Comprendre d'où viennent vos clients les plus rentables</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Canal d'Acquisition</th>
                <th className="p-4">Leads Reçus</th>
                <th className="p-4">RDV Réservés</th>
                <th className="p-4">Ventes Forfaits</th>
                <th className="p-4">Revenu Généré</th>
                <th className="p-4">ROI Estímé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {CHANNEL_ROI_DATA.map((ch, idx) => (
                <tr key={idx} className="hover:bg-stone-50 transition font-medium">
                  <td className="p-4 font-bold text-stone-900">{ch.channel}</td>
                  <td className="p-4 text-stone-700">{ch.leads} leads</td>
                  <td className="p-4 text-stone-700">{ch.appointments} rdv</td>
                  <td className="p-4 text-stone-700">{ch.sales} ventes</td>
                  <td className="p-4 font-bold text-brand-800">{ch.revenue} DH</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ch.roi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
