import React, { useState, useEffect } from 'react';
import { CustomerHomepage } from './components/customer/CustomerHomepage';
import { LaserLandingPage } from './components/customer/LaserLandingPage';
import { SmartBookingWizard } from './components/customer/SmartBookingWizard';
import { CustomerPWAPreview } from './components/customer/CustomerPWAPreview';

import { AdminHeaderBar } from './components/common/AdminHeaderBar';
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

import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationPopover } from './components/common/NotificationPopover';
import { DemoBanner } from './components/common/DemoBanner';
import { resolveRoute } from './routing';

export function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#/');
  const [bookingTreatment, setBookingTreatment] = useState<string>('Épilation Laser');

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      setIsMobileNavigationOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    setCurrentHash(hash);
  };

  const handleNavigateToBooking = (treatment?: string) => {
    if (treatment) setBookingTreatment(treatment);
    navigateTo('#/reservation');
  };

  const route = resolveRoute(currentHash);
  const isAdminView = route.portal === 'admin';
  const adminTab: DashboardTab = route.portal === 'admin' ? route.tab : 'overview';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-charcoal-900 flex flex-col font-sans">
      <DemoBanner />
      
      {/* Global Search & Notifications Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(type, _id) => {
          if (type === 'lead') navigateTo('#/admin/leads');
          else if (type === 'client') navigateTo('#/admin/clients');
        }}
      />

      <NotificationPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateTab={(tab) => {
          navigateTo(`#/admin/${tab}`);
        }}
      />

      {/* PORTAL 1: OWNER & TEAM BACKEND OS (/#/admin/*) */}
      {isAdminView ? (
        <div className="flex flex-col min-h-screen">
          <AdminHeaderBar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
            onNavigateToClientSite={() => navigateTo('#/')}
            onOpenMenu={() => setIsMobileNavigationOpen(true)}
          />

          <div className="flex flex-1">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <Sidebar
                activeTab={adminTab}
                onTabChange={(tab) => navigateTo(`#/admin/${tab}`)}
              />
            </div>

            {isMobileNavigationOpen && (
              <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation administrative">
                <button
                  type="button"
                  className="absolute inset-0 bg-stone-950/60"
                  onClick={() => setIsMobileNavigationOpen(false)}
                  aria-label="Fermer la navigation"
                />
                <div className="relative w-64 max-w-[85vw] h-full shadow-2xl">
                  <Sidebar
                    activeTab={adminTab}
                    onTabChange={(tab) => {
                      setIsMobileNavigationOpen(false);
                      navigateTo(`#/admin/${tab}`);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Admin Content Area */}
            <div className="flex-1 bg-[#FAF9F6] min-h-[calc(100vh-3.5rem)]">
              {adminTab === 'overview' && (
                <OwnerOverview
                  onNavigateTab={(tab) => navigateTo(`#/admin/${tab}`)}
                  onOpenLeadDrawer={() => navigateTo('#/admin/leads')}
                />
              )}

              {adminTab === 'ai_brief' && (
                <AIDailyBrief
                  onNavigateTab={(tab) => navigateTo(`#/admin/${tab}`)}
                />
              )}

              {adminTab === 'leads' && <LeadCRM />}

              {adminTab === 'pipeline' && <SalesPipeline />}

              {adminTab === 'messages' && <WhatsAppInbox />}

              {adminTab === 'appointments' && <AppointmentCalendar />}

              {adminTab === 'clients' && <Customer360 />}

              {adminTab === 'packages' && <PackageTracker />}

              {adminTab === 'treatments' && <BeforeAfterGallery />}

              {adminTab === 'automations' && <AutomationCenter />}

              {adminTab === 'reviews' && <ReputationManager />}

              {adminTab === 'reactivation' && <ReactivationHub />}

              {adminTab === 'analytics' && <AnalyticsDashboard />}

              {adminTab === 'team' && <StaffManagement />}

              {adminTab === 'settings' && (
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
        </div>
      ) : (
        /* PORTAL 2: CLIENT-FACING FRONTEND (/#/, /#/epilation-laser, /#/reservation, /#/mon-espace) */
        <main className="flex-1">
          {route.portal === 'customer' && route.page === 'laser' ? (
            <LaserLandingPage
              onNavigateToBooking={handleNavigateToBooking}
            />
          ) : route.portal === 'customer' && route.page === 'booking' ? (
            <SmartBookingWizard
              initialTreatment={bookingTreatment}
              onGoBackToSite={() => navigateTo('#/')}
            />
          ) : route.portal === 'customer' && route.page === 'account' ? (
            <CustomerPWAPreview
              onNavigateToBooking={() => navigateTo('#/reservation')}
            />
          ) : route.portal === 'customer' && route.page === 'home' ? (
            <CustomerHomepage
              onNavigateToBooking={handleNavigateToBooking}
              onNavigateToLaser={() => navigateTo('#/epilation-laser')}
              onNavigateToAdmin={() => navigateTo('#/admin/overview')}
            />
          ) : (
            <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
              <div className="max-w-md">
                <p className="text-xs uppercase tracking-widest text-brand-700 font-semibold">Erreur 404</p>
                <h1 className="font-serif text-4xl mt-2">Cette page n’existe pas</h1>
                <p className="text-sm text-stone-500 mt-3">Le lien est incorrect ou la page a été déplacée.</p>
                <button type="button" onClick={() => navigateTo('#/')} className="mt-6 px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold">Retour à l’accueil</button>
              </div>
            </div>
          )}
        </main>
      )}

    </div>
  );
}

export default App;
