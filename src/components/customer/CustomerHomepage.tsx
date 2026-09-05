import React, { Suspense, lazy, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock3,
  Crosshair,
  Fingerprint,
  Layers3,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  X,
} from 'lucide-react';
import { BOOKING_SERVICES, formatPrice } from '../../domain/booking';

const EclatScene = lazy(() => import('./EclatScene'));

interface CustomerHomepageProps {
  onNavigateToBooking: (treatment?: string) => void;
  onNavigateToLaser: () => void;
  onNavigateToAdmin?: () => void;
}

const treatmentIcons = [Crosshair, Sparkles, Layers3, Fingerprint, Microscope, UserRoundCheck];

const concerns = [
  { label: 'Pilosité', service: 'Épilation Laser Candela®', note: 'Un bilan permet d’adapter la technologie au phototype et à la zone.' },
  { label: 'Éclat & texture', service: 'Hydrafacial MD Prestige', note: 'Un protocole progressif peut cibler hydratation, grain de peau et luminosité.' },
  { label: 'Cicatrices & pores', service: 'Microneedling & Exosomes', note: 'La consultation vérifie les indications, la sensibilité et les contre-indications.' },
  { label: 'Pigmentation', service: 'Bilan Diagnostic Peau Visia®', note: 'L’analyse initiale aide à documenter la peau avant toute recommandation.' },
];

const faqs = [
  ['Combien de séances faut-il prévoir ?', 'Le nombre de séances varie selon la zone, le protocole, la peau et la réponse individuelle. Une estimation personnalisée est donnée après consultation.'],
  ['Est-ce adapté à tous les phototypes ?', 'La technologie et les paramètres doivent être choisis selon le phototype et les antécédents. Le centre confirme l’éligibilité pendant le bilan.'],
  ['Comment préparer un rendez-vous ?', 'Les instructions dépendent du traitement. Une confirmation détaillée doit être envoyée après validation du rendez-vous par l’équipe.'],
  ['Puis-je modifier ou annuler ?', 'Oui. Les délais et éventuels frais doivent être présentés avant confirmation, puis rappelés dans le message de réservation.'],
  ['Comment mes photos sont-elles utilisées ?', 'Une photo clinique et une utilisation marketing nécessitent des consentements distincts. Un consentement marketing peut être refusé ou retiré.'],
];

export const CustomerHomepage: React.FC<CustomerHomepageProps> = ({ onNavigateToBooking, onNavigateToLaser, onNavigateToAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState(0);

  const closeAndScroll = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="premium-site min-h-screen bg-[#08080a] text-[#f5f0e8] selection:bg-[#d5b975] selection:text-[#111113]">
      <header className="premium-nav sticky top-0 z-50 border-b border-white/10 bg-[#08080a]/72 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-3 text-left" aria-label="Retour en haut">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d6b873]/40 bg-gradient-to-br from-[#241f16] to-[#0e0e10] font-serif text-xl text-[#e3c987] shadow-[0_0_30px_rgba(214,184,115,.12)]">É</span>
            <span>
              <span className="block font-serif text-xl tracking-[.12em] text-white">MAISON ÉCLAT</span>
              <span className="block text-[11px] uppercase tracking-[.28em] text-[#9d978f]">Casablanca · Gautier</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-[#c9c3ba] lg:flex" aria-label="Navigation principale">
            <button type="button" onClick={() => closeAndScroll('soins')} className="hover:text-white">Soins</button>
            <button type="button" onClick={() => closeAndScroll('approche')} className="hover:text-white">Approche</button>
            <button type="button" onClick={() => closeAndScroll('resultats')} className="hover:text-white">Résultats</button>
            <button type="button" onClick={() => closeAndScroll('faq')} className="hover:text-white">Questions</button>
            <button type="button" onClick={() => closeAndScroll('contact')} className="hover:text-white">Le centre</button>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="https://wa.me/212661248890" target="_blank" rel="noopener noreferrer" className="premium-icon-button" aria-label="Contacter Maison Éclat sur WhatsApp"><MessageCircle className="h-4 w-4" /></a>
            <GoldButton onClick={() => onNavigateToBooking()}>Réserver un diagnostic</GoldButton>
          </div>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="premium-icon-button lg:hidden" aria-expanded={menuOpen} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b0b0d]/96 px-5 py-5 backdrop-blur-2xl lg:hidden">
            <nav className="grid gap-2" aria-label="Navigation mobile">
              {[['soins', 'Soins'], ['approche', 'Approche'], ['resultats', 'Résultats'], ['faq', 'Questions'], ['contact', 'Le centre']].map(([id, label]) => (
                <button type="button" key={id} onClick={() => closeAndScroll(id)} className="rounded-xl px-4 py-3 text-left text-base text-[#ddd7ce] hover:bg-white/5">{label}</button>
              ))}
              <button type="button" onClick={() => onNavigateToBooking()} className="mt-2 rounded-xl bg-[#d5b975] px-4 py-3 font-semibold text-[#111113]">Réserver un diagnostic</button>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="premium-hero relative isolate overflow-hidden border-b border-white/10">
          <div className="premium-aurora premium-aurora-one" />
          <div className="premium-aurora premium-aurora-two" />
          <div className="premium-grid absolute inset-0 opacity-30" />
          <div className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
            <div className="relative z-10 max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d5b975]/25 bg-[#d5b975]/[.08] px-4 py-2 text-sm text-[#e6d09b] backdrop-blur-xl">
                <Sparkles className="h-4 w-4" /> Esthétique avancée · Casablanca Gautier
              </div>
              <h1 className="font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[.88] tracking-[-.045em] text-white">
                La précision<br />
                <span className="premium-gold-text italic">révèle l’éclat.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#b9b3aa]">
                Un parcours esthétique personnalisé, conçu autour de votre peau, de vos objectifs et d’un suivi attentif—dans un environnement discret et contemporain.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <GoldButton onClick={() => onNavigateToBooking()} large>Réserver un diagnostic <ArrowRight className="h-4 w-4" /></GoldButton>
                <button type="button" onClick={() => closeAndScroll('soins')} className="premium-glass-button">Explorer les protocoles <MoveRight className="h-4 w-4" /></button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#aaa49b]">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d5b975]" /> Consultation préalable</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#d5b975]" /> Parcours sur rendez-vous</span>
                <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-[#d5b975]" /> Données confidentielles</span>
              </div>
            </div>

            <div className="relative min-h-[470px] lg:min-h-[620px]" aria-label="Sculpture lumineuse Maison Éclat">
              <div className="absolute inset-[10%] rounded-full bg-[#d4b16c]/10 blur-[90px]" />
              <Suspense fallback={<div className="absolute inset-[18%] rounded-full border border-[#d5b975]/20 bg-[#d5b975]/5" />}>
                <EclatScene />
              </Suspense>
              <GlassCard className="absolute bottom-3 left-0 max-w-[260px] p-5 sm:left-7">
                <span className="text-xs uppercase tracking-[.22em] text-[#d7bd7d]">Votre première étape</span>
                <p className="mt-2 font-serif text-2xl text-white">Comprendre avant d’agir.</p>
                <p className="mt-2 text-sm leading-6 text-[#aaa49b]">Le diagnostic oriente le protocole, le rythme et le suivi.</p>
              </GlassCard>
            </div>
          </div>
        </section>

        <section aria-label="Engagements" className="border-b border-white/10 bg-[#0c0c0f]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-5 md:grid-cols-4 md:divide-y-0 lg:px-8">
            <TrustItem icon={UserRoundCheck} title="Évaluation individuelle" text="Chaque parcours commence par l’écoute." />
            <TrustItem icon={Crosshair} title="Paramètres personnalisés" text="Selon l’indication et le phototype." />
            <TrustItem icon={ShieldCheck} title="Protocoles encadrés" text="Traçabilité et suivi à chaque étape." />
            <TrustItem icon={MapPin} title="Casablanca Gautier" text="Un espace confidentiel sur rendez-vous." />
          </div>
        </section>

        <section id="soins" className="premium-section relative overflow-hidden">
          <div className="premium-aurora premium-aurora-three" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <SectionIntro eyebrow="Protocoles" title="Une approche ciblée, jamais standardisée." text="Explorez les familles de soins. Le choix final dépend toujours du diagnostic, de l’éligibilité et des objectifs convenus avec l’équipe." />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {BOOKING_SERVICES.map((service, index) => {
                const Icon = treatmentIcons[index] ?? Sparkles;
                return (
                  <button type="button" key={service.id} onClick={() => service.id === 'laser' ? onNavigateToLaser() : onNavigateToBooking(service.title)} className="premium-treatment-card group text-left">
                    <div className="flex items-start justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#d5b975]/20 bg-[#d5b975]/[.08] text-[#d9c183]"><Icon className="h-5 w-5" /></span>
                <span className="text-sm text-[#d7bd7d]">{service.startingPrice === 0 ? 'Diagnostic offert' : `Dès ${formatPrice(service.startingPrice)}`}</span>
                    </div>
                    <h3 className="mt-10 font-serif text-3xl text-white">{service.title}</h3>
                    <p className="mt-3 min-h-12 text-base leading-7 text-[#aaa49b]">{service.description}</p>
                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
                      <span className="inline-flex items-center gap-2 text-[#8f8981]"><Clock3 className="h-4 w-4" /> {service.duration} min</span>
                      <span className="inline-flex items-center gap-1 text-[#e5d09e]">Découvrir <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="approche" className="premium-section border-y border-white/10 bg-[#0c0c0f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div>
              <SectionIntro eyebrow="Conciergerie diagnostic" title="Commencez par ce que vous souhaitez changer." text="Sélectionnez votre priorité. Cette orientation est informative et ne remplace pas l’évaluation professionnelle." compact />
              <div className="mt-8 flex flex-wrap gap-2">
                {concerns.map((concern, index) => (
                  <button type="button" key={concern.label} onClick={() => setSelectedConcern(index)} aria-pressed={selectedConcern === index} className={`rounded-full border px-4 py-2.5 text-sm transition ${selectedConcern === index ? 'border-[#d5b975]/60 bg-[#d5b975]/15 text-[#f2dfad]' : 'border-white/10 bg-white/[.03] text-[#aaa49b] hover:border-white/25 hover:text-white'}`}>{concern.label}</button>
                ))}
              </div>
            </div>
            <GlassCard className="relative overflow-hidden p-7 sm:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 bg-[#d5b975]/10 blur-[60px]" />
              <span className="relative text-xs uppercase tracking-[.24em] text-[#d7bd7d]">Orientation suggérée</span>
              <h3 className="relative mt-5 font-serif text-4xl text-white">{concerns[selectedConcern].service}</h3>
              <p className="relative mt-4 max-w-xl text-base leading-7 text-[#b0aaa1]">{concerns[selectedConcern].note}</p>
              <div className="relative mt-8 flex flex-wrap items-center gap-4">
                <GoldButton onClick={() => onNavigateToBooking(concerns[selectedConcern].service)}>Choisir un créneau <ArrowRight className="h-4 w-4" /></GoldButton>
                <span className="text-sm text-[#827d76]">Confirmation finale par l’équipe</span>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="premium-section">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111114]">
              <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&auto=format&fit=crop&q=85" alt="Soin esthétique du visage, image d’ambiance" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover opacity-75 saturate-[.75]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
              <GlassCard className="absolute inset-x-5 bottom-5 p-5 sm:inset-x-7 sm:bottom-7">
                <span className="text-xs uppercase tracking-[.2em] text-[#d7bd7d]">Image d’ambiance</span>
                <p className="mt-2 text-sm leading-6 text-[#c2bcb3]">Les équipements, praticiens et locaux réels doivent être photographiés avant publication commerciale.</p>
              </GlassCard>
            </div>
            <div>
              <SectionIntro eyebrow="Méthode" title="Le luxe se mesure dans la qualité du suivi." text="Une expérience premium ne repose pas uniquement sur le décor. Elle repose sur une information claire, des décisions documentées et une continuité entre chaque visite." compact />
              <div className="mt-10 space-y-4">
                <JourneyStep number="01" title="Diagnostic privé" text="Objectifs, historique, sensibilité et attentes sont clarifiés avant le protocole." />
                <JourneyStep number="02" title="Protocole personnalisé" text="Durée, fréquence, prix et préparation sont expliqués avant confirmation." />
                <JourneyStep number="03" title="Séance documentée" text="Les paramètres et observations utiles suivent le parcours client." />
                <JourneyStep number="04" title="Suivi continu" text="Rappels, progression et prochaine recommandation restent accessibles à l’équipe." />
              </div>
            </div>
          </div>
        </section>

        <section id="resultats" className="premium-section border-y border-white/10 bg-[#0c0c0f]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_.85fr] lg:items-end">
              <SectionIntro eyebrow="Preuves & résultats" title="Des résultats documentés, pas des promesses absolues." text="La galerie commerciale doit utiliser des cas authentiques, consentis, photographiés dans des conditions comparables et accompagnés de leur contexte." compact />
              <div className="lg:text-right"><span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.07] px-4 py-2 text-sm text-emerald-200"><ShieldCheck className="h-4 w-4" /> Publication après validation du consentement</span></div>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <EvidenceCard icon={Fingerprint} title="Même lumière, même angle" text="Un protocole photo constant rend la comparaison plus honnête et utile." />
              <EvidenceCard icon={Layers3} title="Contexte du traitement" text="Nombre de séances, période et protocole sont présentés avec chaque cas." />
              <EvidenceCard icon={Lock} title="Consentement distinct" text="Le suivi clinique ne donne jamais automatiquement un droit de publication." />
            </div>
            <div className="mt-6 rounded-[30px] border border-dashed border-white/15 bg-white/[.025] px-6 py-12 text-center">
              <p className="font-serif text-3xl text-white">Galerie authentique prête à être connectée</p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#98928a]">Aucune photographie de stock n’est présentée comme un résultat client. Les premiers cas seront affichés après validation des médias et des consentements.</p>
            </div>
          </div>
        </section>

        <section className="premium-section">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionIntro eyebrow="Confiance" title="Ce qui doit être vérifiable avant de réserver." text="Les preuves réelles renforcent davantage une marque premium que des chiffres spectaculaires ou des témoignages anonymes." />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ProofCard icon={UserRoundCheck} title="Équipe identifiée" text="Portraits, fonctions et qualifications réelles." />
              <ProofCard icon={Microscope} title="Technologies documentées" text="Modèles, indications et sécurité expliqués." />
              <ProofCard icon={Star} title="Avis vérifiés" text="Connexion directe au profil Google du centre." />
              <ProofCard icon={ShieldCheck} title="Politiques claires" text="Confidentialité, consentement et annulation." />
            </div>
          </div>
        </section>

        <section id="faq" className="premium-section border-y border-white/10 bg-[#0c0c0f]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
            <div>
              <SectionIntro eyebrow="Questions fréquentes" title="Décider avec une information claire." text="Ces réponses générales doivent être relues par le responsable clinique avant publication." compact />
              <button type="button" onClick={() => onNavigateToBooking()} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#e4cd94] hover:text-white">Poser une question lors du diagnostic <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map(([question, answer]) => (
                <details key={question} className="premium-faq group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg text-white"><span>{question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[#d5b975] transition group-open:rotate-45">+</span></summary>
                  <p className="max-w-2xl pb-6 pr-12 text-base leading-7 text-[#a9a39a]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="premium-section relative overflow-hidden">
          <div className="premium-aurora premium-aurora-four" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <GlassCard className="overflow-hidden p-7 sm:p-12 lg:p-16">
              <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
                <div>
                  <span className="text-xs uppercase tracking-[.28em] text-[#d7bd7d]">Votre première visite</span>
                  <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.8rem,6vw,5.6rem)] leading-[.96] text-white">Commençons par comprendre votre peau.</h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-[#aaa49b]">Choisissez un créneau de démonstration ou échangez avec le centre avant de réserver.</p>
                </div>
                <div className="space-y-4 lg:justify-self-end">
                  <GoldButton onClick={() => onNavigateToBooking()} large>Réserver un diagnostic <Calendar className="h-4 w-4" /></GoldButton>
                  <a href="https://wa.me/212661248890" target="_blank" rel="noopener noreferrer" className="premium-glass-button w-full justify-center">Écrire sur WhatsApp <MessageCircle className="h-4 w-4" /></a>
                  <div className="pt-2 text-sm leading-6 text-[#88827a]"><MapPin className="mr-2 inline h-4 w-4 text-[#d5b975]" />42 Boulevard d’Anfa · Casablanca Gautier</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#070708] px-5 pb-28 pt-12 lg:pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr] lg:px-3">
          <div><p className="font-serif text-2xl tracking-[.12em] text-white">MAISON ÉCLAT</p><p className="mt-3 max-w-md text-sm leading-6 text-[#7f7a73]">Expérience esthétique personnalisée à Casablanca. Les contenus et données visibles sur cette version restent démonstratifs jusqu’à validation par le centre.</p></div>
          <div><p className="text-sm font-semibold text-white">Explorer</p><div className="mt-4 grid gap-3 text-sm text-[#8f8982]"><button type="button" onClick={() => closeAndScroll('soins')} className="text-left hover:text-white">Soins</button><button type="button" onClick={() => closeAndScroll('resultats')} className="text-left hover:text-white">Résultats</button><button type="button" onClick={() => closeAndScroll('faq')} className="text-left hover:text-white">Questions fréquentes</button></div></div>
          <div><p className="text-sm font-semibold text-white">Professionnels</p><div className="mt-4 grid gap-3 text-sm text-[#8f8982]"><span>Confidentialité</span><span>Consentement images</span><span>Conditions de réservation</span>{onNavigateToAdmin && <button type="button" onClick={onNavigateToAdmin} className="inline-flex items-center gap-2 text-left hover:text-white"><Lock className="h-3.5 w-3.5" /> Espace équipe</button>}</div></div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#69655f] sm:flex-row sm:items-center sm:justify-between lg:px-3"><span>© 2026 Maison Éclat Casablanca</span><span>Version de démonstration · Informations à valider avant publication</span></div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl border border-white/10 bg-[#0d0d10]/90 p-2 shadow-2xl backdrop-blur-2xl lg:hidden">
        <a href="https://wa.me/212661248890" target="_blank" rel="noopener noreferrer" className="premium-glass-button flex-1 justify-center px-4 py-3"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        <button type="button" onClick={() => onNavigateToBooking()} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d5b975] px-4 py-3 text-sm font-semibold text-[#111113]"><Calendar className="h-4 w-4" /> Réserver</button>
      </div>
    </div>
  );
};

const GoldButton: React.FC<{ onClick: () => void; children: React.ReactNode; large?: boolean }> = ({ onClick, children, large }) => <button type="button" onClick={onClick} className={`premium-gold-button ${large ? 'px-6 py-4' : 'px-5 py-3'}`}>{children}</button>;
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <div className={`premium-glass ${className}`}>{children}</div>;
const SectionIntro: React.FC<{ eyebrow: string; title: string; text: string; compact?: boolean }> = ({ eyebrow, title, text, compact }) => <div className={compact ? 'max-w-xl' : 'mx-auto max-w-3xl text-center'}><span className="text-xs uppercase tracking-[.28em] text-[#d7bd7d]">{eyebrow}</span><h2 className="mt-5 font-serif text-[clamp(2.7rem,5vw,5rem)] leading-[.98] tracking-[-.025em] text-white">{title}</h2><p className={`mt-5 text-base leading-7 text-[#9f9991] ${compact ? '' : 'mx-auto max-w-2xl'}`}>{text}</p></div>;
const TrustItem: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; text: string }> = ({ icon: Icon, title, text }) => <div className="px-4 py-7 sm:px-6"><Icon className="h-5 w-5 text-[#d5b975]" /><p className="mt-3 text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-[#77726c]">{text}</p></div>;
const JourneyStep: React.FC<{ number: string; title: string; text: string }> = ({ number, title, text }) => <div className="group grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-transparent p-4 transition hover:border-white/10 hover:bg-white/[.025]"><span className="font-serif text-xl text-[#d5b975]">{number}</span><div><h3 className="text-base font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-[#918b84]">{text}</p></div></div>;
const EvidenceCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; text: string }> = ({ icon: Icon, title, text }) => <GlassCard className="p-6"><Icon className="h-6 w-6 text-[#d5b975]" /><h3 className="mt-8 font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#918b84]">{text}</p></GlassCard>;
const ProofCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; text: string }> = ({ icon: Icon, title, text }) => <div className="rounded-[24px] border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-[#d5b975]/25 hover:bg-white/[.045]"><Icon className="h-5 w-5 text-[#d5b975]" /><h3 className="mt-7 text-base font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#8f8982]">{text}</p></div>;
