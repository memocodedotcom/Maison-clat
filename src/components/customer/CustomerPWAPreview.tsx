import React from 'react';
import { Sparkles, Calendar, Award, MessageCircle, Clock, ChevronRight, CheckCircle2, QrCode } from 'lucide-react';

interface CustomerPWAPreviewProps {
  onNavigateToBooking: () => void;
}

export const CustomerPWAPreview: React.FC<CustomerPWAPreviewProps> = ({ onNavigateToBooking }) => {
  return (
    <div className="min-h-screen bg-stone-900 py-10 px-4 flex flex-col items-center justify-center text-stone-900 font-sans">
      
      {/* Device Top Label */}
      <div className="text-center mb-6 space-y-1">
        <span className="text-xs uppercase font-semibold tracking-widest text-brand-400">Aesthetic Client Portal • PWA</span>
        <h2 className="text-2xl font-serif text-white">Aperçu Application Cliente Mobile</h2>
        <p className="text-stone-400 text-xs font-light">L'expérience VIP sur le téléphone de vos clientes</p>
      </div>

      {/* Mobile Phone Mockup Frame */}
      <div className="w-full max-w-[390px] bg-[#FAF9F6] rounded-[44px] shadow-2xl border-[8px] border-stone-800 overflow-hidden relative min-h-[760px] flex flex-col justify-between">
        
        {/* iOS Dynamic Island / Notch */}
        <div className="w-full bg-[#FAF9F6] pt-3 pb-2 px-6 flex justify-between items-center border-b border-stone-200 text-[10px] font-semibold text-stone-600">
          <span>09:41</span>
          <div className="w-24 h-4 bg-stone-900 rounded-full mx-auto"></div>
          <span>5G • 100%</span>
        </div>

        {/* PWA Main Screen */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-brand-700 tracking-wider">Membre VIP</span>
              <h3 className="text-xl font-serif font-semibold text-stone-900">Bonjour Sara 👋</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-200 text-brand-900 font-bold text-sm flex items-center justify-center border border-brand-300">
              SE
            </div>
          </div>

          {/* Next Appointment Card */}
          <div className="bg-gradient-to-br from-stone-900 to-charcoal-900 text-white p-5 rounded-3xl shadow-lg border border-stone-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Prochain RDV Confirmé
              </span>
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>

            <div>
              <h4 className="text-lg font-serif font-medium text-stone-100">Laser — Corps Complet</h4>
              <p className="text-xs text-stone-300 font-light mt-0.5">Spécialiste: Yasmine Bennani</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <div className="flex items-center space-x-1.5 text-brand-300 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Jeudi 4 Septembre à 16:00</span>
              </div>
              <button 
                onClick={() => alert('RDV Confirmé sur votre agenda!')}
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-3 py-1 rounded-full text-[10px] font-bold"
              >
                Confirmer
              </button>
            </div>
          </div>

          {/* Active Package Progression Card */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900">Mon Forfait Laser Corps</span>
              <span className="text-xs font-bold text-brand-700">4 / 6 séances</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
                <div className="bg-brand-500 h-full w-[66%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-stone-500 font-light">66% du protocole complété (Séance 5 recommandée ce mois-ci)</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-light">Prochaine séance recommandée</span>
              <button 
                onClick={onNavigateToBooking}
                className="text-brand-700 font-semibold underline text-[11px]"
              >
                Planifier →
              </button>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-medium">
            <button
              onClick={onNavigateToBooking}
              className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 text-brand-900 text-left space-y-2 hover:bg-brand-100 transition"
            >
              <Calendar className="w-5 h-5 text-brand-700" />
              <span className="block font-semibold">Réserver un soin</span>
            </button>

            <a
              href="https://wa.me/212661248890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-left space-y-2 hover:bg-emerald-100 transition"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span className="block font-semibold">WhatsApp Direct</span>
            </a>
          </div>

          {/* Offers & Loyalty */}
          <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-900 font-bold">
                🎁
              </div>
              <div>
                <h5 className="font-semibold text-stone-900">Offre Privilège Anniversaire</h5>
                <p className="text-[10px] text-stone-500 font-light">-20% sur la gamme Hydrafacial MD</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>

        </div>

        {/* Mobile App Bottom Nav Bar */}
        <div className="bg-white border-t border-stone-200 px-6 py-3 flex items-center justify-around text-[10px] font-medium text-stone-500">
          <div className="flex flex-col items-center text-brand-700 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Accueil</span>
          </div>
          <div className="flex flex-col items-center hover:text-stone-900 cursor-pointer">
            <Calendar className="w-4 h-4" />
            <span>RDV</span>
          </div>
          <div className="flex flex-col items-center hover:text-stone-900 cursor-pointer">
            <Award className="w-4 h-4" />
            <span>Forfaits</span>
          </div>
          <div className="flex flex-col items-center hover:text-stone-900 cursor-pointer">
            <QrCode className="w-4 h-4" />
            <span>Pass VIP</span>
          </div>
        </div>

      </div>

    </div>
  );
};
