import React from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  RefreshCw,
  PhoneCall,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { INITIAL_KPI_DATA, REVENUE_OPPORTUNITIES, ACTION_CARDS_TODAY, TODAY_APPOINTMENTS } from '../../data/mockData';
import { DashboardTab } from './Sidebar';

interface OwnerOverviewProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenLeadDrawer: (leadId: string) => void;
}

export const OwnerOverview: React.FC<OwnerOverviewProps> = ({
  onNavigateTab,
  onOpenLeadDrawer
}) => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-ivory-border shadow-soft">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-semibold tracking-widest text-brand-600">Tableau de bord propriétaire</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Casablanca Gautier Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-charcoal-900 mt-1">
            Bonjour Yasmine 👋
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm font-light mt-0.5">
            Voici ce qui mérite votre attention aujourd’hui pour maximiser votre chiffre d'affaires.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateTab('ai_brief')}
            className="px-4 py-2.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition flex items-center space-x-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Consulter AI Daily Brief</span>
          </button>
          <button
            onClick={() => onNavigateTab('reactivation')}
            className="px-4 py-2.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition flex items-center space-x-2 shadow-md"
          >
            <Zap className="w-4 h-4 text-brand-400" />
            <span>Relancer les 18.6K DH</span>
          </button>
        </div>
      </div>

      {/* TOP KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: CA Aujourd'hui */}
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>CA Aujourd'hui</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {INITIAL_KPI_DATA.caToday}
            </div>
            <div className="flex items-center text-[11px] text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>+14% par rapport à hier</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Rendez-vous */}
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Rendez-vous programmés</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {INITIAL_KPI_DATA.appointmentsToday}
            </div>
            <p className="text-[11px] text-stone-500 font-light mt-1">12 effectués • 6 en attente</p>
          </div>
        </div>

        {/* KPI 3: Taux de présence */}
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Taux de présence (Show-up)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {INITIAL_KPI_DATA.showUpRate}
            </div>
            <p className="text-[11px] text-stone-500 font-light mt-1">Objectif clinic: 85%</p>
          </div>
        </div>

        {/* KPI 4: Nouveaux Leads */}
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium">
            <span>Nouveaux Leads (Instagram/WA)</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              {INITIAL_KPI_DATA.newLeadsToday}
            </div>
            <p className="text-[11px] text-stone-500 font-light mt-1">7 demandes en attente de réponse</p>
          </div>
        </div>

      </div>

      {/* "À TRAITER AUJOURD'HUI" ACTION CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-semibold text-charcoal-900 flex items-center gap-2">
            <span>⚡ À traiter aujourd'hui</span>
            <span className="text-xs font-sans font-normal text-stone-500">(Actions directes à fort impact financier)</span>
          </h2>
          <button 
            onClick={() => onNavigateTab('leads')}
            className="text-xs text-brand-700 font-semibold hover:underline"
          >
            Tout traiter →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTION_CARDS_TODAY.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                if (card.id.includes('lead')) onNavigateTab('leads');
                else if (card.id.includes('appt')) onNavigateTab('appointments');
                else if (card.id.includes('package')) onNavigateTab('packages');
                else onNavigateTab('reactivation');
              }}
              className={`p-4 rounded-2xl border ${card.color} shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{card.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{card.title}</h4>
                  <span className="text-[11px] text-stone-600 underline font-semibold mt-0.5 block">{card.action}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>
          ))}
        </div>
      </div>

      {/* TWO COLUMN GRID: TODAY'S APPOINTMENTS & REVENUE OPPORTUNITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Today's Appointments Timeline */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-ivory-border shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="text-lg font-serif font-semibold text-charcoal-900">Agenda du jour</h3>
              <p className="text-xs text-stone-500 font-light">Statuts et équipements en cabine</p>
            </div>
            <button
              onClick={() => onNavigateTab('appointments')}
              className="text-xs text-brand-700 font-semibold hover:underline"
            >
              Voir le planning →
            </button>
          </div>

          <div className="space-y-3">
            {TODAY_APPOINTMENTS.map((appt) => (
              <div
                key={appt.id}
                className="p-3.5 rounded-2xl border border-stone-200 bg-[#FAF9F6] flex items-center justify-between hover:border-brand-300 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-xs font-mono font-bold text-stone-900 bg-white px-2.5 py-1.5 rounded-xl border border-stone-200 shadow-sm">
                    {appt.time}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900">{appt.clientName}</h4>
                    <p className="text-[11px] text-stone-500 font-light">{appt.treatmentName} • {appt.practitioner}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-stone-900">{appt.price} DH</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    appt.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : appt.status === 'In Treatment'
                      ? 'bg-blue-100 text-blue-800 animate-pulse'
                      : appt.status === 'Confirmed'
                      ? 'bg-brand-100 text-brand-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {appt.status === 'Completed' ? 'CONFIRMÉ ✓' : appt.status === 'In Treatment' ? 'EN CABINE' : appt.status === 'Confirmed' ? 'CONFIRMÉ' : 'À CONFIRMER'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue Opportunities & Sales Funnel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Revenue Opportunities Card */}
          <div className="bg-gradient-to-br from-charcoal-900 via-stone-900 to-stone-950 text-white p-6 rounded-3xl border border-stone-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-300">Opportunités de Revenus</span>
                <div className="text-3xl font-serif font-bold text-white mt-1">18 600 DH</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {REVENUE_OPPORTUNITIES.map((op) => (
                <div key={op.id} className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-stone-200">{op.title}</h5>
                    <span className="text-[10px] text-stone-400 font-light">{op.badge}</span>
                  </div>
                  <span className="font-bold text-emerald-400">{op.totalValue} DH</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('reactivation')}
              className="w-full py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
            >
              Voir et relancer les opportunités →
            </button>
          </div>

          {/* Sales Funnel Card */}
          <div className="bg-white p-6 rounded-3xl border border-ivory-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h4 className="font-serif font-semibold text-charcoal-900">Entonnoir de Conversion</h4>
              <span className="text-[11px] text-stone-500">Ce mois-ci</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1 text-stone-700">
                  <span>Leads Entrants</span>
                  <span>42</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[100%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1 text-stone-700">
                  <span>RDV Réservés</span>
                  <span>24 <span className="text-[10px] text-emerald-600 font-normal">(57% conv.)</span></span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[57%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1 text-stone-700">
                  <span>Présents en Centre</span>
                  <span>19 <span className="text-[10px] text-emerald-600 font-normal">(79% show-up)</span></span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-500 h-full w-[45%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1 text-stone-700">
                  <span>Forfaits Vendus</span>
                  <span>14 <span className="text-[10px] text-emerald-600 font-normal">(74% vente)</span></span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[33%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
