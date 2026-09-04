import React from 'react';
import { Search, Bell, ExternalLink, ShieldCheck, Menu, LogOut } from 'lucide-react';

interface AdminHeaderBarProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onNavigateToClientSite: () => void;
  unreadCount?: number;
  onOpenMenu: () => void;
  onSignOut?: () => void;
}

export const AdminHeaderBar: React.FC<AdminHeaderBarProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onNavigateToClientSite,
  onOpenMenu,
  onSignOut,
  unreadCount = 3
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#1C1917] text-white border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left Brand Identifier */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onOpenMenu}
            className="lg:hidden p-2 -ml-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800"
            aria-label="Ouvrir la navigation"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-200 flex items-center justify-center text-stone-900 font-serif font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg tracking-wide font-medium text-stone-100">MAISON ÉCLAT</span>
              <span className="text-[10px] uppercase font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-400" /> Revenue OS
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-light hidden sm:block">Portail d'Administration & Équipe Médicale</p>
          </div>
        </div>

        {/* Center: Switch to Client Frontend Link */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={onNavigateToClientSite}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-brand-200 text-xs font-semibold border border-stone-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Voir Site Client Web</span>
          </button>
        </div>

        {/* Right Tools: CMD+K Search & Notifications */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 px-2.5 py-1.5 rounded-lg text-stone-300 text-xs transition"
            title="Recherche rapide (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden lg:inline text-stone-400">Rechercher...</span>
            <kbd className="hidden lg:inline-block bg-stone-800 text-[10px] text-stone-400 px-1.5 py-0.5 rounded font-mono border border-stone-700">⌘K</kbd>
          </button>

          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition"
            title="Centre de notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-stone-950 animate-pulse"></span>
            )}
          </button>

          {onSignOut && (
            <button type="button" onClick={onSignOut} className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition" aria-label="Se déconnecter" title="Se déconnecter">
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-stone-800">
            <div className="w-7 h-7 rounded-full bg-brand-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              YB
            </div>
            <span className="text-xs font-medium text-stone-200">Yasmine</span>
          </div>
        </div>

      </div>
    </header>
  );
};
