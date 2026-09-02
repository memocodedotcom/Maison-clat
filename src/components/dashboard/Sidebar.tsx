import React from 'react';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Calendar,
  Contact,
  Package,
  Sparkles,
  Zap,
  MessageSquare,
  Star,
  RefreshCw,
  Award,
  BarChart3,
  Bot,
  Settings,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export type DashboardTab = 
  | 'overview'
  | 'leads'
  | 'pipeline'
  | 'appointments'
  | 'clients'
  | 'packages'
  | 'treatments'
  | 'automations'
  | 'messages'
  | 'reviews'
  | 'reactivation'
  | 'team'
  | 'analytics'
  | 'ai_brief'
  | 'settings';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  unreadLeadsCount?: number;
  unreadMessagesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  unreadLeadsCount = 7,
  unreadMessagesCount = 2
}) => {

  const NAV_ITEMS = [
    { id: 'overview' as DashboardTab, label: 'Vue d’ensemble', icon: LayoutDashboard },
    { id: 'ai_brief' as DashboardTab, label: 'AI Daily Brief', icon: Bot, highlight: true },
    { id: 'leads' as DashboardTab, label: 'Leads CRM', icon: Users, badge: unreadLeadsCount },
    { id: 'pipeline' as DashboardTab, label: 'Pipeline Ventes', icon: Kanban },
    { id: 'messages' as DashboardTab, label: 'Inbox WhatsApp', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'appointments' as DashboardTab, label: 'Agenda & RDV', icon: Calendar },
    { id: 'clients' as DashboardTab, label: 'Clientes 360', icon: Contact },
    { id: 'packages' as DashboardTab, label: 'Forfaits & Séances', icon: Package },
    { id: 'reactivation' as DashboardTab, label: 'Relance & Revenue', icon: RefreshCw, badgeText: '31.5K DH' },
    { id: 'automations' as DashboardTab, label: 'Automations', icon: Zap },
    { id: 'reviews' as DashboardTab, label: 'Avis & E-Réputation', icon: Star },
    { id: 'analytics' as DashboardTab, label: 'Analytics & ROI', icon: BarChart3 },
    { id: 'team' as DashboardTab, label: 'Équipe & Praticiens', icon: Award },
    { id: 'treatments' as DashboardTab, label: 'Catalogue Soins', icon: Sparkles },
    { id: 'settings' as DashboardTab, label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#1C1917] text-stone-300 border-r border-stone-800 flex flex-col justify-between h-[calc(100vh-3.5rem)] sticky top-14">
      
      {/* Navigation Links */}
      <div className="p-3 space-y-1 overflow-y-auto flex-1">
        <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-stone-500">
          Revenue OS • Business Engine
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-brand-500 text-stone-950 font-bold shadow-md'
                  : item.highlight
                  ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : item.highlight ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-stone-950 text-white' : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.badgeText && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.badgeText}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-stone-800 bg-stone-900/60">
        <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-500 text-stone-950 font-bold text-xs flex items-center justify-center border border-brand-300">
              YB
            </div>
            <div>
              <span className="text-xs font-semibold text-stone-100 block">Yasmine Bennani</span>
              <span className="text-[10px] text-stone-400 block font-light">Directrice — Maison Éclat</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-500" />
        </div>
      </div>

    </aside>
  );
};
