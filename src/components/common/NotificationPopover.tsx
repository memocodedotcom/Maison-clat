import React from 'react';
import { Bell, X } from 'lucide-react';
import type { DashboardTab } from '../dashboard/Sidebar';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: DashboardTab) => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  const NOTIFICATIONS: Array<{ id: string; title: string; desc: string; time: string; tab: DashboardTab }> = [
    { id: '1', title: 'Nouveau lead chaud Instagram', desc: 'Sara Amrani demande le tarif Laser Corps (5 000 DH)', time: 'Il y a 10m', tab: 'leads' },
    { id: '2', title: 'RDV Non Confirmé pour demain', desc: 'Imane B. n\'a pas encore répondu au SMS de relance', time: 'Il y a 25m', tab: 'appointments' },
    { id: '3', title: 'Forfait Laser bientôt terminé', desc: 'Sara El Mansouri a complété sa séance 4/6. Proposer renouvellement.', time: 'Il y a 1h', tab: 'packages' },
    { id: '4', title: 'Nouvel Avis Google 5 étoiles', desc: 'Meryem Tazi a publié un avis suite au SMS automatisé', time: 'Il y a 2h', tab: 'reviews' },
  ];

  return (
    <div className="fixed top-16 right-4 z-50 w-96 bg-white rounded-3xl border border-stone-200 shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
      
      <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6]">
        <div className="flex items-center space-x-2 font-serif font-bold text-stone-900 text-sm">
          <Bell className="w-4 h-4 text-brand-600" />
          <span>Notifications Prioritaires</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-stone-100 max-h-96 overflow-y-auto">
        {NOTIFICATIONS.map((n) => (
          <button
            type="button"
            key={n.id}
            onClick={() => {
              onNavigateTab(n.tab);
              onClose();
            }}
            className="block w-full p-4 hover:bg-stone-50 transition space-y-1 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900">{n.title}</span>
              <span className="text-[10px] text-stone-400">{n.time}</span>
            </div>
            <p className="text-stone-600 font-light">{n.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-3 bg-[#FAF9F6] border-t border-stone-200 text-center text-stone-500 font-semibold hover:text-stone-900 cursor-pointer">
        Marquer toutes comme lues
      </div>

    </div>
  );
};
