import React from 'react';
import { LayoutDashboard, Globe, Calendar, Smartphone, Sparkles, Search, Bell, ShieldCheck } from 'lucide-react';

interface HeaderSwitcherProps {
  currentView: 'website' | 'laser_landing' | 'booking' | 'dashboard' | 'pwa';
  onViewChange: (view: 'website' | 'laser_landing' | 'booking' | 'dashboard' | 'pwa') => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const HeaderSwitcher: React.FC<HeaderSwitcherProps> = ({
  currentView,
  onViewChange,
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 3
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#1C1917] text-white border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left Brand Badge */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-600 via-brand-500 to-amber-200 flex items-center justify-center text-stone-900 font-serif font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg tracking-wide font-medium text-stone-100">MAISON ÉCLAT</span>
              <span className="text-[10px] uppercase font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-400" /> Casablanca
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-light hidden sm:block">Aesthetic Center Revenue OS</p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <nav className="flex items-center space-x-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-xs font-medium">
          <button
            onClick={() => onViewChange('website')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'website'
                ? 'bg-brand-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Site Web</span>
          </button>

          <button
            onClick={() => onViewChange('laser_landing')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'laser_landing'
                ? 'bg-brand-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Épilation Laser</span>
          </button>

          <button
            onClick={() => onViewChange('booking')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'booking'
                ? 'bg-brand-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Réservation</span>
          </button>

          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'dashboard'
                ? 'bg-brand-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Revenue OS</span>
          </button>

          <button
            onClick={() => onViewChange('pwa')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'pwa'
                ? 'bg-brand-500 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">App Cliente</span>
          </button>
        </nav>

        {/* Right Tools: CMD+K Search & Notifications */}
        <div className="flex items-center space-x-2">
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
        </div>

      </div>
    </header>
  );
};
