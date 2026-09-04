export interface ApplicationEnvironment {
  demoMode: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export function readEnvironment(source: Record<string, string | boolean | undefined>): ApplicationEnvironment {
  const demoValue = source.VITE_DEMO_MODE;
  return {
    demoMode: demoValue === undefined || String(demoValue).toLowerCase() !== 'false',
    supabaseUrl: typeof source.VITE_SUPABASE_URL === 'string' ? source.VITE_SUPABASE_URL.trim() || undefined : undefined,
    supabaseAnonKey: typeof source.VITE_SUPABASE_ANON_KEY === 'string' ? source.VITE_SUPABASE_ANON_KEY.trim() || undefined : undefined,
  };
}

export function isProductionBackendConfigured(environment: ApplicationEnvironment): boolean {
  return Boolean(environment.supabaseUrl && environment.supabaseAnonKey);
}

export const appEnvironment = readEnvironment(import.meta.env);

