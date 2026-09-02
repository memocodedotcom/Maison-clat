import React from 'react';
import { Award, Users, DollarSign, Percent, Plus, ShieldCheck, Clock } from 'lucide-react';
import { STAFF_MEMBERS } from '../../data/mockData';

export const StaffManagement: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Équipe Médicale & Performance</span>
          <h1 className="text-2xl font-serif font-normal text-charcoal-900">Gestion des Praticiennes & Commissions</h1>
          <p className="text-stone-500 text-xs font-light mt-0.5">
            Suivi des chiffres d'affaires individuels, taux de ré-réservation et grilles de commissions.
          </p>
        </div>

        <button 
          onClick={() => alert('Ajout d’un nouveau membre d’équipe')}
          className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-2 shadow"
        >
          <Plus className="w-4 h-4 text-brand-400" />
          <span>Ajouter une praticienne</span>
        </button>
      </div>

      {/* STAFF CARDS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {STAFF_MEMBERS.map((st) => (
          <div key={st.id} className="bg-white rounded-3xl border border-ivory-border shadow-xl p-6 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={st.avatar} alt={st.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-300 shadow-sm" />
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">{st.name}</h3>
                  <p className="text-xs font-medium text-brand-800">{st.role}</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">CA Généré Ce Mois</span>
                  <span className="text-base font-serif font-bold text-emerald-600 mt-0.5 block">{st.revenueMonth} DH</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Taux Rebooking</span>
                  <span className="text-base font-serif font-bold text-stone-900 mt-0.5 block">{st.rebookingRate}%</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Panier Moyen</span>
                  <span className="text-base font-serif font-bold text-stone-900 mt-0.5 block">{st.averageTicket} DH</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold block">Forfaits Vendus</span>
                  <span className="text-base font-serif font-bold text-brand-800 mt-0.5 block">{st.packageSalesCount} forfaits</span>
                </div>
              </div>

              {/* Services Assigned */}
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5">Actes Habilités</span>
                <div className="flex flex-wrap gap-1">
                  {st.services.map((serv, idx) => (
                    <span key={idx} className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2.5 py-1 rounded-full border border-stone-200">
                      {serv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-semibold">
              <span className="text-stone-500">Commission Ventes: <strong className="text-stone-900">{st.commissionRate}%</strong></span>
              <button 
                onClick={() => alert(`Modification du planning de ${st.name}`)}
                className="text-brand-700 hover:underline"
              >
                Gérer planning →
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
