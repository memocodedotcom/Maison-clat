import type { DashboardTab } from './components/dashboard/Sidebar';

const ADMIN_TABS: DashboardTab[] = [
  'overview', 'ai_brief', 'leads', 'pipeline', 'messages', 'appointments', 'clients',
  'packages', 'treatments', 'automations', 'reviews', 'reactivation', 'analytics', 'team', 'settings',
];

export type AppRoute =
  | { portal: 'customer'; page: 'home' | 'laser' | 'booking' | 'account' }
  | { portal: 'admin'; tab: DashboardTab }
  | { portal: 'not-found' };

export function resolveRoute(hash: string): AppRoute {
  const normalized = hash || '#/';
  if (normalized === '#/' || normalized === '#') return { portal: 'customer', page: 'home' };
  if (normalized === '#/epilation-laser') return { portal: 'customer', page: 'laser' };
  if (normalized === '#/reservation') return { portal: 'customer', page: 'booking' };
  if (normalized === '#/mon-espace') return { portal: 'customer', page: 'account' };
  if (normalized === '#/admin' || normalized === '#/dashboard') return { portal: 'admin', tab: 'overview' };

  const match = normalized.match(/^#\/(?:admin|dashboard)\/([^/?#]+)$/);
  if (match && ADMIN_TABS.includes(match[1] as DashboardTab)) {
    return { portal: 'admin', tab: match[1] as DashboardTab };
  }

  return { portal: 'not-found' };
}

