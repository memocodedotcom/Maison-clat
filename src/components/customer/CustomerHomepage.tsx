import React from 'react';
import { Sparkles, Calendar, MessageCircle, ShieldCheck, Award, Star, MapPin, ChevronRight, CheckCircle2, Phone, Clock, ArrowRight } from 'lucide-react';

interface CustomerHomepageProps {
  onNavigateToBooking: (treatment?: string) => void;
  onNavigateToLaser: () => void;
}

export const CustomerHomepage: React.FC<CustomerHomepageProps> = ({
  onNavigateToBooking,
  onNavigateToLaser
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-charcoal-900 selection:bg-brand-200">
      
      {/* Top Banner Notice */}
      <div className="bg-charcoal-900 text-stone-300 py-2 px-4 text-xs font-medium text-center flex items-center justify-center space-x-2 border-b border-stone-800">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>Casablanca Gautier — Diagnostic de Peau Offert pour toute première réservation</span>
        <button 
          onClick={() => onNavigateToBooking()} 
          className="underline text-brand-400 font-semibold hover:text-brand-300 ml-2"
        >
          Réserver mon bilan →
        </button>
      </div>

      {/* Luxury Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-ivory-border sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 rounded-full bg-stone-900 text-brand-400 flex items-center justify-center font-serif text-xl font-bold shadow-md border border-brand-500/30">
              É
            </div>
            <div>
              <span className="font-serif text-2xl font-semibold tracking-wider text-charcoal-900 block">MAISON ÉCLAT</span>
              <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase block font-medium">Casablanca • Gautier</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-xs font-medium uppercase tracking-wider text-stone-700">
            <button onClick={onNavigateToLaser} className="hover:text-brand-600 transition flex items-center gap-1 font-semibold text-brand-600">
              <Sparkles className="w-3.5 h-3.5" /> Épilation Laser
            </button>
            <a href="#services" className="hover:text-brand-600 transition">Soins & Traitements</a>
            <a href="#technologie" className="hover:text-brand-600 transition">Technologie Candela</a>
            <a href="#resultats" className="hover:text-brand-600 transition">Avant / Après</a>
            <a href="#avis" className="hover:text-brand-600 transition">Avis Clientes</a>
            <a href="#contact" className="hover:text-brand-600 transition">Le Centre</a>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/212661248890?text=Bonjour%20Maison%20Éclat,%20je%20souhaite%20des%20informations"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-emerald-600/30 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/60 text-xs font-semibold transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigateToBooking()}
              className="px-5 py-2.5 rounded-full bg-charcoal-900 hover:bg-stone-800 text-brand-100 text-xs font-semibold tracking-wide uppercase shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Réserver
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#FAF9F6] via-[#F7F4EE] to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Centre d’Excellence Esthétique & Laser Médical</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-charcoal-900 tracking-tight leading-[1.15]">
                Votre peau. <br />
                <span className="font-normal italic text-brand-700">Votre confiance.</span> <br />
                Notre expertise.
              </h1>

              <p className="text-stone-600 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                Située au cœur du quartier Gautier à Casablanca, la <strong>Maison Éclat</strong> associe les dernières technologies médicales laser (Candela GentleMax Pro, Hydrafacial MD Elite) à une prise en charge d’exception sur-mesure.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => onNavigateToBooking()}
                  className="px-8 py-4 rounded-full bg-charcoal-900 hover:bg-stone-800 text-stone-100 text-sm font-semibold tracking-wide shadow-xl flex items-center justify-center space-x-2 group transition"
                >
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span>Réserver une consultation</span>
                  <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition" />
                </button>

                <a
                  href="https://wa.me/212661248890?text=Bonjour%20Maison%20Éclat,%20je%20souhaite%20réserver%20un%20diagnostic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-semibold shadow-sm flex items-center justify-center space-x-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Parler sur WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-stone-900 ml-1">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">327+ avis Google vérifiés</p>
                </div>

                <div>
                  <div className="flex items-center space-x-1.5 text-stone-900 font-bold text-sm mb-0.5">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    <span>Candela® Pro</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">Laser Médical Breveté</p>
                </div>

                <div>
                  <div className="flex items-center space-x-1.5 text-stone-900 font-bold text-sm mb-0.5">
                    <Award className="w-4 h-4 text-brand-600" />
                    <span>Médecins Qualifiés</span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">Protocoles Sur-Mesure</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand-300/40 via-brand-200/20 to-transparent blur-xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80"
                    alt="Maison Éclat Casablanca Clinic"
                    className="w-full h-[440px] object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent p-6 text-white">
                    <span className="text-[11px] uppercase tracking-widest text-brand-300 font-semibold">Casablanca Gautier</span>
                    <h3 className="text-xl font-serif text-white font-normal mt-0.5">L'Expérience Esthétique Haute Couture</h3>
                    <p className="text-xs text-stone-300 font-light mt-1">Cabines privatives dermo-esthétiques équipées des technologies de pointe.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Immediate Treatment Finder Section: "Quel résultat recherchez-vous ?" */}
      <section id="services" className="py-20 bg-white border-y border-ivory-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-600 block mb-2">Nos Spécialités Médicales</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-charcoal-900">Quel résultat recherchez-vous ?</h2>
            <p className="text-stone-500 text-sm font-light mt-3">
              Chaque protocole est précédé d'une consultation de diagnostic de peau personnalisée avec nos experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Épilation Laser */}
            <div 
              onClick={onNavigateToLaser}
              className="group cursor-pointer rounded-2xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=80"
                  alt="Épilation Laser Médicale"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-brand-500 text-stone-950 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  Populaire
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Laser Médical Candela®</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal-900 group-hover:text-brand-700 transition">
                    Épilation Laser Définitive
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mt-2">
                    Technologie Alexandrite & Nd:YAG compatible tous phototypes (I à VI). Suppression définitive et sans douleur grâce au jet d'air froid Zimmer.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Dès 350 DH / séance</span>
                  <span className="text-xs font-semibold text-brand-700 flex items-center group-hover:translate-x-1 transition">
                    Découvrir le protocole <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Hydrafacial MD */}
            <div 
              onClick={() => onNavigateToBooking('Hydrafacial MD Prestige')}
              className="group cursor-pointer rounded-2xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
                  alt="Hydrafacial MD Prestige"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-stone-900 text-stone-100 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  Soin Éclat
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hydrafacial® Original</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal-900 group-hover:text-brand-700 transition">
                    Hydrafacial MD Prestige
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mt-2">
                    Nettoyage profond, extraction des comédons et infusion de sérums antioxydants et boosters repulpants. Effet Glow instantané sans rougeur.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Dès 1 200 DH</span>
                  <span className="text-xs font-semibold text-brand-700 flex items-center group-hover:translate-x-1 transition">
                    Réserver ce soin <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Microneedling & Exosomes */}
            <div 
              onClick={() => onNavigateToBooking('Microneedling & Exosomes')}
              className="group cursor-pointer rounded-2xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&auto=format&fit=crop&q=80"
                  alt="Microneedling + Exosomes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Régénération Dermique</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal-900 group-hover:text-brand-700 transition">
                    Microneedling & Exosomes
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mt-2">
                    Traitement médical des cicatrices d'acné, pores dilatés et ridules. Stimulation intense du collagène naturel et sérums régénérants.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Dès 1 800 DH</span>
                  <span className="text-xs font-semibold text-brand-700 flex items-center group-hover:translate-x-1 transition">
                    Réserver ce soin <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Carbon Peel Hollywood */}
            <div 
              onClick={() => onNavigateToBooking('Carbon Peel Hollywood')}
              className="group cursor-pointer rounded-2xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512290900673-7002b521789c?w=600&auto=format&fit=crop&q=80"
                  alt="Carbon Peel Hollywood"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Peel au Carbone Médical</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal-900 group-hover:text-brand-700 transition">
                    Carbon Peel Hollywood
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mt-2">
                    Masque au carbone végétal éliminé par laser Q-Switched. Lisse le grain de peau, contrôle le sébum et illumine le teint immédiatement.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Dès 1 400 DH</span>
                  <span className="text-xs font-semibold text-brand-700 flex items-center group-hover:translate-x-1 transition">
                    Réserver ce soin <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: Détatouage Laser */}
            <div 
              onClick={() => onNavigateToBooking('Détatouage Laser')}
              className="group cursor-pointer rounded-2xl bg-[#FAF9F6] border border-stone-200 overflow-hidden hover:border-brand-400 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&auto=format&fit=crop&q=80"
                  alt="Détatouage Laser"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Laser Q-Switched Picoseconde</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal-900 group-hover:text-brand-700 transition">
                    Détatouage Laser Sécurisé
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed mt-2">
                    Effacement progressif des pigments noirs et colorés sans cicatrice. Anesthésie par froid pulsé pour un confort maximal.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">Dès 900 DH / séance</span>
                  <span className="text-xs font-semibold text-brand-700 flex items-center group-hover:translate-x-1 transition">
                    Réserver ce soin <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 6: Diagnostic & Consultation */}
            <div 
              onClick={() => onNavigateToBooking('Consultation Diagnostic Peau')}
              className="group cursor-pointer rounded-2xl bg-gradient-to-br from-charcoal-900 to-stone-900 text-white border border-stone-800 overflow-hidden hover:border-brand-500 hover:shadow-2xl transition-all duration-300 flex flex-col p-6 justify-between"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] uppercase font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Premier rendez-vous
                </div>
                <h3 className="text-2xl font-serif font-normal text-brand-200">
                  Consultation & Bilan Épidermique Sur-Mesure
                </h3>
                <p className="text-stone-300 text-xs font-light leading-relaxed">
                  Bilan complet par scanner de peau Visia® (taches, sébum, rougeurs profondes) et définition du protocole le plus adapté à votre peau.
                </p>
              </div>
              <div className="pt-6 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block line-through">500 DH</span>
                  <span className="text-sm font-bold text-emerald-400">Offert pour réservation web</span>
                </div>
                <span className="px-4 py-2 rounded-full bg-brand-500 text-stone-950 font-bold text-xs hover:bg-brand-400 transition">
                  Réserver bilan →
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Section: Technology & Medical Rigor */}
      <section id="technologie" className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-600 block">Excellence Médicale & Hygiène</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-charcoal-900 leading-tight">
                Pourquoi les clientes de Casablanca nous font confiance ?
              </h2>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                À la Maison Éclat, nous refusons les compromis. Nos équipements disposent tous des agréments médicaux CE et FDA pour vous garantir une sécurité totale et des résultats mesurables dès les premières séances.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-charcoal-900">Plateau Technique Candela GentleMax Pro®</h4>
                    <p className="text-xs text-stone-500 font-light mt-0.5">Dualité Alexandrite (755nm) & YAG (1064nm) certifiée pour peaux claires à noires.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-charcoal-900">Supervision Médicale Permanente</h4>
                    <p className="text-xs text-stone-500 font-light mt-0.5">Analyses de peau et réglages validés sous contrôle dermatologique par le Dr. Sofia Berrada.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-charcoal-900">Protocoles de Stérilisation Médicale</h4>
                    <p className="text-xs text-stone-500 font-light mt-0.5">Cabines désinfectées après chaque patiente, embouts à usage unique pour Hydrafacial et Laser.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=80"
                  alt="Salle de soin Maison Éclat"
                  className="rounded-2xl shadow-lg h-64 object-cover w-full border border-stone-200"
                />
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop&q=80"
                  alt="Équipement médical laser"
                  className="rounded-2xl shadow-lg h-64 object-cover w-full border border-stone-200 mt-6"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Reviews & Testimonials Section */}
      <section id="avis" className="py-20 bg-white border-t border-ivory-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center space-x-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal-900">Ce que nos clientes disent de nous</h2>
            <p className="text-stone-500 text-sm font-light mt-2">Plus de 320 avis certifiés sur Google et WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs font-light italic leading-relaxed">
                  "J'ai fait mon forfait laser corps complet chez Maison Éclat à Gautier. Dès la 3ème séance je n'avais presque plus aucun poil. Yasmine est adorable et très professionnelle !"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-900 font-bold text-xs flex items-center justify-center">
                  SE
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Sara El Mansouri</h4>
                  <span className="text-[10px] text-stone-500">Casablanca • Avis Google Vérifié</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs font-light italic leading-relaxed">
                  "Le meilleur Hydrafacial de Casablanca ! Ma peau était lumineuse et ultra hydratée pour le mariage de ma sœur. Le centre est propre, élégant et moderne."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-900 font-bold text-xs flex items-center justify-center">
                  IB
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Imane Berrada</h4>
                  <span className="text-[10px] text-stone-500">Casablanca • Avis WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 text-xs font-light italic leading-relaxed">
                  "Suivi dermo-esthétique parfait. Le diagnostic de peau au scanner m'a permis de comprendre exactement les besoins de ma peau. Je recommande à 100% !"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-900 font-bold text-xs flex items-center justify-center">
                  NB
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Nadia Bennani</h4>
                  <span className="text-[10px] text-stone-500">Casablanca • Avis Google</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="py-16 bg-[#FAF9F6] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-lg p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-600 block">Prendre Rendez-Vous</span>
              <h2 className="text-3xl font-serif text-charcoal-900">Maison Éclat Casablanca</h2>
              
              <div className="space-y-4 text-xs text-stone-600 font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <span>42 Boulevard d'Anfa, Quartier Gautier, Casablanca (Face à la clinique d'Anfa)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>+212 5 22 34 56 78 / +212 6 61 24 88 90</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Lundi – Samedi: 09h00 – 19h30 (Sur rendez-vous)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <button
                  onClick={() => onNavigateToBooking()}
                  className="px-6 py-3 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 text-xs font-semibold tracking-wide transition shadow"
                >
                  Réserver un rendez-vous
                </button>
                <a
                  href="https://wa.me/212661248890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-emerald-600/30 text-emerald-800 bg-emerald-50 text-xs font-semibold transition"
                >
                  Ecrire sur WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-stone-200 shadow-md h-64 bg-stone-100 flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80"
                alt="Map preview Casablanca Gautier"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold text-stone-900 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-600 fill-brand-100" />
                  <span>Casablanca Gautier • Maison Éclat</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="font-serif text-2xl text-stone-100 tracking-wider">MAISON ÉCLAT</div>
          <p className="text-stone-500 font-light max-w-lg mx-auto">
            Centre de Médecine Esthétique, Laser Médical & Soins Épidermiques de Haute Technologie.
          </p>
          <div className="pt-4 text-[11px] text-stone-600">
            © 2026 Maison Éclat Casablanca. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Quick Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-40 flex items-center space-x-3 shadow-2xl">
        <a
          href="https://wa.me/212661248890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-full bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => onNavigateToBooking()}
          className="flex-1 py-3 rounded-full bg-charcoal-900 text-brand-200 font-semibold text-xs flex items-center justify-center space-x-1.5 shadow"
        >
          <Calendar className="w-4 h-4" />
          <span>Réserver</span>
        </button>
      </div>

    </div>
  );
};
