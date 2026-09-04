import type { SupabaseClient } from '@supabase/supabase-js';
import { appEnvironment, isProductionBackendConfigured } from '../config/environment';

let clientPromise: Promise<SupabaseClient | null> | null = null;

export function getSupabaseClient(): Promise<SupabaseClient | null> {
  if (!isProductionBackendConfigured(appEnvironment)) return Promise.resolve(null);

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(appEnvironment.supabaseUrl!, appEnvironment.supabaseAnonKey!, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }),
    );
  }

  return clientPromise;
}

