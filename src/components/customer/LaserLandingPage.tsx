import React, { useState } from 'react';
import { Sparkles, Calendar, ShieldCheck, Check, ChevronRight, HelpCircle, Star, MessageCircle, ArrowRight, Zap, RefreshCw, Eye } from 'lucide-react';

interface LaserLandingPageProps {
  onNavigateToBooking: (area?: string) => void;
}

export const LaserLandingPage: React.FC<LaserLandingPageProps> = ({ onNavigateToBooking }) => {
  const [selectedArea, setSelectedArea] = useState<string>('Corps complet');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const AREAS = [
    { name: 'Corps complet', price: '3 900 DH', unitPrice: '800 DH', duration: '60 min', sessions: '6 séances', highlight: 'Le plus populaire' },
    { name: 'Maillot & Aisselles', price: '1 900 DH', unitPrice: '400 DH', duration: '30 min', sessions: '6 séances', highlight: 'Best Seller' },
    { name: 'Jambes complètes', price: '2 400 DH', unitPrice: '500 DH', duration: '45 min', sessions: '6 séances' },
    { name: 'Visage complet / Lèvre', price: '900 DH', unitPrice: '200 DH', duration: '20 min', sessions: '6 séances' },
    { name: 'Bras complets', price: '1 500 DH', unitPrice: '350 DH', duration: '30 min', sessions: '6 séances' },
    { name: 'Zone au choix', price: 'Dès 350 DH', unitPrice: '350 DH', duration: '20 min', sessions: 'À la carte' },
  ];

  const FAQS = [
    {
      q: 'Est-ce que l’épilation laser Candela est indolore ?',
      a: 'Grâce au système d’anesthésie par froid pulsé Zimmer Cryo 6 intégré à notre laser Candela GentleMax Pro, l’épiderme est refroidi en continu à -30°C. La sensation est assimilée à une petite étincelle très supportable.'
    },
    {
      q: 'Combien de séances sont nécessaires pour un résultat définitif ?',
      a: 'En moyenne 6 séances espacées de 4 à 6 semaines permettent d’éliminer 85% à 95% de la pilosité. Des séances d’entretien (1 fois par an) peuvent être conseillées.'
    },
    {
      q: 'Le laser convient-il aux peaux mates et noires marocaines ?',
      a: 'Absolument ! Notre laser GentleMax Pro est équipé de la longueur d’onde Nd:YAG 1064nm spécialement conçue pour cibler le follicule en toute sécurité sans brûler la mélanine des peaux mates ou foncées (phototypes IV à VI).'
    },
    {
      q: 'Quelles sont les précautions avant ma séance à Casablanca ?',
      a: 'Rasez la zone 24h avant la séance (ne pas épiler à la cire ou pince), évitez l’exposition solaire directe 10 jours avant et appliquez une crème apaisante après le soin.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-charcoal-900 selection:bg-brand-200">
      
      {/* Laser Header Breadcrumb */}
      <div className="bg-white border-b border-ivory-border py-3 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-stone-500">
            <span>Maison Éclat</span>
            <span>/</span>
            <span>Soins Médicaux</span>
            <span>/</span>
            <span className="font-semibold text-brand-700">Épilation Laser Candela GentleMax Pro®</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Créneaux disponibles cette semaine à Gautier</span>
          </div>
        </div>
      </div>

      {/* Hero Section Conversion */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-800">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Technologie Médicale Brevetée — Candela® GentleMax Pro</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal-900 leading-tight">
                Épilation Laser Définitive à Casablanca Gautier. <br />
                <span className="italic font-normal text-brand-700">Indolore. Sécurisée. Tous Phototypes.</span>
              </h1>

              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                Dites adieu aux poils incarnés et à la corvée de la cire. Profitez de l'efficacité inégalée du laser référence mondiale Candela® opéré par des spécialistes diplômées sous supervision dermatologique.
              </p>

              {/* Key Highlights Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 font-medium pt-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Réduction de 85% à 95% dès 6 séances</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Refroidissement continu Zimmer® (-30°C)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>100% sécurisé peaux mâtes et bronzées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Bilan & Test d’essai OFFERTS</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => onNavigateToBooking('Épilation Laser')}
                  className="px-8 py-4 rounded-full bg-charcoal-900 hover:bg-stone-800 text-brand-100 text-xs font-semibold uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 transition"
                >
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span>Réserver ma consultation laser</span>
                </button>
                <a
                  href="https://wa.me/212661248890?text=Bonjour%20je%20souhaite%20des%20infos%20laser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-full border border-emerald-600/30 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100 text-xs font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Demander tarif sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Card Offer */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-brand-200 shadow-xl p-6 lg:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-brand-500 text-stone-950 font-bold text-[10px] uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow">
                  Offre Spéciale Forfait
                </div>
                
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">Forfait Privilège 6 Séances</span>
                  <h3 className="text-2xl font-serif font-medium text-charcoal-900 mt-1">Laser Corps Complet</h3>
                  <p className="text-xs text-stone-500 mt-1">Jambes + Maillot + Aisselles + Zones visage offertes</p>
                </div>

                <div className="bg-brand-50/60 rounded-2xl p-4 border border-brand-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 line-through">5 400 DH</span>
                    <div className="text-3xl font-serif font-bold text-brand-800">3 900 DH</div>
                    <span className="text-[10px] text-stone-500 font-medium">Paiement échelonné en 3x sans frais possible</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-full">
                      Économisez 1 500 DH
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-brand-600" />
                    <span>6 séances de traitement complet Candela®</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-brand-600" />
                    <span>Consultation médicale initiale & test flash offerts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-brand-600" />
                    <span>Garantie résultats & suivi personnalisé</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigateToBooking('Épilation Laser — Corps Complet')}
                  className="w-full py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
                >
                  Réserver ce forfait en 1-clic →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Treatment Areas Grid */}
      <section className="py-16 bg-white border-y border-ivory-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 block mb-1">Zones & Tarification MAD</span>
            <h2 className="text-3xl font-serif text-charcoal-900">Choisissez votre zone d'intervention</h2>
            <p className="text-stone-500 text-xs font-light mt-2">Possibilité de composer votre forfait sur-mesure lors du premier entretien.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map((area, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSelectedArea(area.name);
                  onNavigateToBooking(`Épilation Laser — ${area.name}`);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedArea === area.name 
                    ? 'bg-brand-50/50 border-brand-400 shadow-md ring-1 ring-brand-400'
                    : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-serif font-semibold text-charcoal-900">{area.name}</h3>
                    {area.highlight && (
                      <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                        {area.highlight}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 space-y-1 font-light">
                    <p>Durée séance: {area.duration}</p>
                    <p>Recommandation: {area.sessions}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block font-light">Forfait 6 séances</span>
                    <span className="text-lg font-serif font-bold text-brand-800">{area.price}</span>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-full bg-charcoal-900 text-brand-200 text-xs font-semibold hover:bg-stone-800 transition">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Technology Focus Section */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-charcoal-900 rounded-3xl p-8 lg:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-stone-800">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-brand-400" />
                <span>La référence médicale mondiale</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-serif font-normal text-stone-100">
                Pourquoi le laser Candela GentleMax Pro® fait la différence ?
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                Contrairement aux appareils d'lumière pulsée (IPL) de salons classiques, le Candela GentleMax Pro est un laser médical de classe IV associant deux longueurs d'onde de haute précision (Alexandrite 755nm et Nd:YAG 1064nm).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-stone-300 pt-2">
                <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                  <span className="font-semibold text-brand-300 block mb-1">Alexandrite 755nm</span>
                  <span>Cible la mélanine des poils fins à moyens sur peaux claires (Phototypes I à III).</span>
                </div>

                <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800">
                  <span className="font-semibold text-brand-300 block mb-1">Nd:YAG 1064nm</span>
                  <span>Traverse l'épiderme en toute sécurité pour peaux mates, méditerranéennes et foncées.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=80"
                  alt="Technologie Candela Laser"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent flex items-end p-6">
                  <span className="text-xs text-brand-200 font-serif">Candela Medical Equipment • Casablanca Gautier</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-white border-t border-ivory-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-charcoal-900">Questions Fréquentes — Épilation Laser</h2>
            <p className="text-stone-500 text-xs font-light mt-2">Tout ce qu'il faut savoir avant votre première séance</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-stone-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-serif text-lg font-medium text-charcoal-900 bg-[#FAF9F6] hover:bg-stone-100 flex items-center justify-between"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-600 text-xl font-sans font-bold">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>

                {activeFaq === index && (
                  <div className="px-6 py-4 bg-white text-stone-600 text-xs font-light leading-relaxed border-t border-stone-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-xl font-serif text-charcoal-900">Prête à dire adieu à la pilosité ?</h3>
            <button
              onClick={() => onNavigateToBooking('Épilation Laser')}
              className="px-8 py-4 rounded-full bg-charcoal-900 hover:bg-stone-800 text-brand-200 text-xs font-bold uppercase tracking-wider shadow-lg transition"
            >
              Réserver ma première séance laser →
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
