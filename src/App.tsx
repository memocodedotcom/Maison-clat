import React, { useState } from 'react';
import { HeaderSwitcher } from './components/common/HeaderSwitcher';
import { CustomerHomepage } from './components/customer/CustomerHomepage';
import { LaserLandingPage } from './components/customer/LaserLandingPage';
import { SmartBookingWizard } from './components/customer/SmartBookingWizard';
import { CustomerPWAPreview } from './components/customer/CustomerPWAPreview';

import { Sidebar, DashboardTab } from './components/dashboard/Sidebar';
import { OwnerOverview } from './components/dashboard/OwnerOverview';
import { LeadCRM } from './components/dashboard/LeadCRM';
import { SalesPipeline } from './components/dashboard/SalesPipeline';
import { WhatsAppInbox } from './components/dashboard/WhatsAppInbox';
import { AppointmentCalendar } from './components/dashboard/AppointmentCalendar';
import { Customer360 } from './components/dashboard/Customer360';
import { PackageTracker } from './components/dashboard/PackageTracker';
import { BeforeAfterGallery } from './components/dashboard/BeforeAfterGallery';
import { AutomationCenter } from './components/dashboard/AutomationCenter';
import { ReactivationHub } from './components/dashboard/ReactivationHub';
import { ReputationManager } from './components/dashboard/ReputationManager';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';
import { StaffManagement } from './components/dashboard/StaffManagement';
import { AIDailyBrief } from './components/dashboard/AIDailyBrief';
import { MobileOwnerView } from './components/dashboard/MobileOwnerView';

import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationPopover } from './components/common/NotificationPopover';

export function App() {
  const [currentView, setCurrentView] = useState<'website' | 'laser_landing' | 'booking' | 'dashboard' | 'pwa'>('website');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [bookingTreatment, setBookingTreatment] = useState<string>('Épilation Laser');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  const handleNavigateToBooking = (treatment?: string) => {
    if (treatment) setBookingTreatment(treatment);
    setCurrentView('booking');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-charcoal-900 flex flex-col font-sans">
      
      {/* Universal Top Header Switcher */}
      <HeaderSwitcher
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
      />

      {/* Global Modals & Popovers */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(type, id) => {
          setCurrentView('dashboard');
          if (type === 'lead') setDashboardTab('leads');
          else if (type === 'client') setDashboardTab('clients');
        }}
      />

      <NotificationPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateTab={(tab) => {
          setCurrentView('dashboard');
          setDashboardTab(tab);
        }}
      />

      {/* VIEW SWITCHING LOGIC */}
      <main className="flex-1">
        
        {/* 1. Customer Homepage */}
        {currentView === 'website' && (
          <CustomerHomepage
            onNavigateToBooking={handleNavigateToBooking}
            onNavigateToLaser={() => setCurrentView('laser_landing')}
          />
        )}

        {/* 2. Laser Landing Page */}
        {currentView === 'laser_landing' && (
          <LaserLandingPage
            onNavigateToBooking={handleNavigateToBooking}
          />
        )}

        {/* 3. Smart Multi-step Booking Wizard */}
        {currentView === 'booking' && (
          <SmartBookingWizard
            initialTreatment={bookingTreatment}
            onGoBackToSite={() => setCurrentView('website')}
          />
        )}

        {/* 4. Customer PWA Mobile Preview */}
        {currentView === 'pwa' && (
          <CustomerPWAPreview
            onNavigateToBooking={() => setCurrentView('booking')}
          />
        )}

        {/* 5. Business Dashboard (Revenue OS) */}
        {currentView === 'dashboard' && (
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <Sidebar
                activeTab={dashboardTab}
                onTabChange={(tab) => setDashboardTab(tab)}
              />
            </div>

            {/* Dashboard Sub-screen Content */}
            <div className="flex-1 bg-[#FAF9F6] min-h-[calc(100vh-3.5rem)]">
              {dashboardTab === 'overview' && (
                <OwnerOverview
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                  onOpenLeadDrawer={() => setDashboardTab('leads')}
                />
              )}

              {dashboardTab === 'ai_brief' && (
                <AIDailyBrief
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                />
              )}

              {dashboardTab === 'leads' && <LeadCRM />}

              {dashboardTab === 'pipeline' && <SalesPipeline />}

              {dashboardTab === 'messages' && <WhatsAppInbox />}

              {dashboardTab === 'appointments' && <AppointmentCalendar />}

              {dashboardTab === 'clients' && <Customer360 />}

              {dashboardTab === 'packages' && <PackageTracker />}

              {dashboardTab === 'treatments' && <BeforeAfterGallery />}

              {dashboardTab === 'automations' && <AutomationCenter />}

              {dashboardTab === 'reviews' && <ReputationManager />}

              {dashboardTab === 'reactivation' && <ReactivationHub />}

              {dashboardTab === 'analytics' && <AnalyticsDashboard />}

              {dashboardTab === 'team' && <StaffManagement />}

              {dashboardTab === 'settings' && (
                <div className="p-8 max-w-4xl mx-auto space-y-6">
                  <h1 className="text-2xl font-serif font-bold text-stone-900">Paramètres du Centre — Maison Éclat</h1>
                  <p className="text-xs text-stone-500 font-light">Casablanca Gautier • 42 Boulevard d'Anfa</p>
                  <div className="p-6 rounded-2xl bg-white border border-stone-200 text-xs text-stone-700">
                    Configuration des clés d'API WhatsApp Business, des salles de soin Candela GentleMax Pro et des droits d'accès du personnel.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default App;
