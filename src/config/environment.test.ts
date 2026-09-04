import { describe, expect, it } from 'vitest';
import { isProductionBackendConfigured, readEnvironment } from './environment';

describe('application environment', () => {
  it('defaults to safe demo mode', () => {
    expect(readEnvironment({})).toEqual({ demoMode: true, supabaseUrl: undefined, supabaseAnonKey: undefined });
  });

  it('recognizes an explicitly configured production backend', () => {
    const environment = readEnvironment({
      VITE_DEMO_MODE: 'false',
      VITE_SUPABASE_URL: 'https://example.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'public-key',
    });
    expect(environment.demoMode).toBe(false);
    expect(isProductionBackendConfigured(environment)).toBe(true);
  });

  it('does not consider partial credentials configured', () => {
    expect(isProductionBackendConfigured(readEnvironment({ VITE_DEMO_MODE: 'false', VITE_SUPABASE_URL: 'https://example.supabase.co' }))).toBe(false);
  });
});

