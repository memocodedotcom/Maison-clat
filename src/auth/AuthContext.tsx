import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { appEnvironment, isProductionBackendConfigured } from '../config/environment';
import { getSupabaseClient } from '../lib/supabase';

interface AuthContextValue {
  demoMode: boolean;
  backendConfigured: boolean;
  loading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(!appEnvironment.demoMode && isProductionBackendConfigured(appEnvironment));

  useEffect(() => {
    if (appEnvironment.demoMode || !isProductionBackendConfigured(appEnvironment)) {
      return;
    }

    let mounted = true;
    let unsubscribe: () => void = () => undefined;
    void getSupabaseClient().then(async (client) => {
      if (!client || !mounted) return;
      const { data } = await client.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
      const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
        setSession(nextSession);
        setLoading(false);
      });
      unsubscribe = () => listener.subscription.unsubscribe();
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const client = await getSupabaseClient();
    if (!client) return 'Le service d’authentification n’est pas configuré.';
    const { error } = await client.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  }, []);

  const signOut = useCallback(async () => {
    const client = await getSupabaseClient();
    if (client) await client.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    demoMode: appEnvironment.demoMode,
    backendConfigured: isProductionBackendConfigured(appEnvironment),
    loading,
    session,
    signIn,
    signOut,
  }), [loading, session, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
