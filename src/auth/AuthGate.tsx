import React, { FormEvent, useState } from 'react';
import { LockKeyhole, LoaderCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from './AuthContext';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { demoMode, backendConfigured, loading, session, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (demoMode) return <>{children}</>;

  if (!backendConfigured) {
    return (
      <GateLayout icon={<ShieldAlert className="w-8 h-8" aria-hidden="true" />} title="Configuration requise">
        <p className="text-sm text-stone-600">Le mode production est actif, mais les variables Supabase publiques ne sont pas configurées. Consultez <code>.env.example</code>.</p>
      </GateLayout>
    );
  }

  if (loading) {
    return <GateLayout icon={<LoaderCircle className="w-8 h-8 animate-spin" aria-hidden="true" />} title="Vérification de la session"><p className="text-sm text-stone-600">Connexion sécurisée en cours…</p></GateLayout>;
  }

  if (session) return <>{children}</>;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const message = await signIn(email.trim(), password);
    setError(message);
    setSubmitting(false);
  };

  return (
    <GateLayout icon={<LockKeyhole className="w-8 h-8" aria-hidden="true" />} title="Accès équipe Maison Éclat">
      <form className="space-y-4 text-left" onSubmit={submit}>
        <div>
          <label htmlFor="staff-email" className="block text-xs font-semibold text-stone-700 mb-1">Email professionnel</label>
          <input id="staff-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-brand-500" />
        </div>
        <div>
          <label htmlFor="staff-password" className="block text-xs font-semibold text-stone-700 mb-1">Mot de passe</label>
          <input id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-brand-500" />
        </div>
        {error && <p className="text-xs text-red-700" role="alert">Connexion impossible. Vérifiez vos informations ou contactez l’administrateur.</p>}
        <button type="submit" disabled={submitting} className="w-full px-5 py-3 rounded-full bg-stone-900 text-brand-200 text-xs font-bold uppercase tracking-wider disabled:opacity-50">
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </GateLayout>
  );
};

const GateLayout: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-5 py-12">
    <section className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-xl p-8 text-center" aria-labelledby="auth-gate-heading">
      <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 text-brand-800 flex items-center justify-center mb-5">{icon}</div>
      <p className="font-serif text-xl tracking-wide">MAISON ÉCLAT</p>
      <h1 id="auth-gate-heading" className="font-serif text-3xl mt-3 mb-5">{title}</h1>
      {children}
    </section>
  </main>
);
