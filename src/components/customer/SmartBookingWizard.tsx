import React, { useState } from 'react';
import { Check, Calendar as CalendarIcon, Clock, User, Sparkles, MapPin, ChevronLeft, MessageCircle, CalendarCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useClinicStore } from '../../hooks/useClinicStore';

interface SmartBookingWizardProps {
  initialTreatment?: string;
  onBookingComplete?: (bookingData: any) => void;
  onGoBackToSite: () => void;
}

export const SmartBookingWizard: React.FC<SmartBookingWizardProps> = ({
  initialTreatment = 'Épilation Laser',
  onBookingComplete,
  onGoBackToSite
}) => {
  const { addBookingFromClient } = useClinicStore();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedTreatment, setSelectedTreatment] = useState<string>(initialTreatment);
  const [selectedArea, setSelectedArea] = useState<string>('Corps complet');
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>('Premier disponible');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-04');
  const [selectedTime, setSelectedTime] = useState<string>('14:30');
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const TREATMENTS = [
    { id: 'laser', title: 'Épilation Laser Candela®', desc: 'Laser Alexandrite & Nd:YAG médical indolore', duration: '45 min', price: 'Dès 350 DH' },
    { id: 'hydra', title: 'Hydrafacial MD Prestige', desc: 'Nettoyage profond, extraction et effet Glow', duration: '60 min', price: '1 200 DH' },
    { id: 'micro', title: 'Microneedling & Exosomes', desc: 'Traite cicatrices d’acné, pores et élasticité', duration: '60 min', price: '1 800 DH' },
    { id: 'carbon', title: 'Carbon Peel Hollywood', desc: 'Laser Q-Switched purifiant et lissant', duration: '45 min', price: '1 400 DH' },
    { id: 'tattoo', title: 'Détatouage Laser', desc: 'Effacement progressif des tatouages', duration: '30 min', price: '900 DH' },
    { id: 'diag', title: 'Bilan Diagnostic Peau Visia®', desc: 'Diagnostic épidermique offert', duration: '30 min', price: 'OFFERT' }
  ];

  const AREAS = [
    'Visage complet',
    'Aisselles',
    'Bras complets',
    'Maillot (Échancré / Intégral)',
    'Jambes complètes',
    'Corps complet (Privilège)'
  ];

  const PRACTITIONERS = [
    { name: 'Premier disponible', role: 'Attribution automatique du créneau le plus rapide', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Yasmine Bennani', role: 'Spécialiste Laser & Care Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Dr. Sofia Berrada', role: 'Médecin Esthétique', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Kenza Chraibi', role: 'Experte Dermo-Esthétique', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' }
  ];

  const TIME_SLOTS = [
    '09:30', '10:15', '11:00', '11:45', '14:30', '15:15', '16:00', '17:30', '18:15'
  ];

  const handleNextStep = () => {
    if (step === 6) {
      if (!customerInfo.firstName || !customerInfo.phone) {
        alert('Veuillez renseigner au moins votre prénom et votre numéro de téléphone.');
        return;
      }
      // Register booking in Central Clinic Store
      addBookingFromClient({
        treatment: selectedTreatment,
        area: selectedArea,
        practitioner: selectedPractitioner,
        date: selectedDate,
        time: selectedTime,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        email: customerInfo.email
      });
    }
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 px-4 sm:px-6 lg:px-8 text-charcoal-900">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onGoBackToSite}
            className="flex items-center space-x-1 text-xs text-stone-500 hover:text-stone-900 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Retour au site</span>
          </button>
          
          <div className="text-center">
            <span className="font-serif text-xl font-bold tracking-wide text-charcoal-900">MAISON ÉCLAT</span>
            <span className="text-[10px] text-brand-700 block font-medium">Casablanca Gautier</span>
          </div>

          <div className="text-xs text-stone-400 font-mono">
            Étape {step} / 7
          </div>
        </div>

        {/* Wizard Progress Bar */}
        {step < 7 && (
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mb-8">
            <div
              className="bg-brand-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Wizard Card Container */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 relative">
          
          {/* STEP 1: CHOOSE TREATMENT */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">Étape 1</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">Choisissez votre soin ou consultation</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Sélectionnez le traitement principal souhaité.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TREATMENTS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTreatment(item.title)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTreatment.includes(item.title) || selectedTreatment === item.title
                        ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400 shadow-sm'
                        : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif font-semibold text-stone-900 text-base">{item.title}</h4>
                        <span className="text-xs font-bold text-brand-800">{item.price}</span>
                      </div>
                      <p className="text-stone-500 text-xs font-light">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-2 text-[11px] text-stone-400 font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 font-semibold text-xs uppercase tracking-wider shadow transition"
                >
                  Étape suivante →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE AREA */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">Étape 2</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">Quelle zone souhaitez-vous traiter ?</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Soin sélectionné: <strong className="text-stone-900">{selectedTreatment}</strong></p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AREAS.map((area, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedArea(area)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      selectedArea === area
                        ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400 text-stone-900 font-semibold'
                        : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300 text-stone-700 font-normal'
                    }`}
                  >
                    <span className="text-sm">{area}</span>
                    {selectedArea === area && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 font-semibold text-xs uppercase tracking-wider shadow transition"
                >
                  Étape suivante →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE PRACTITIONER */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">Étape 3</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">Choisissez votre spécialiste</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Vous pouvez choisir votre praticien favori ou l'option premier disponible.</p>
              </div>

              <div className="space-y-3">
                {PRACTITIONERS.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPractitioner(p.name)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center space-x-4 transition ${
                      selectedPractitioner === p.name
                        ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400'
                        : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover border border-stone-300" />
                    <div className="flex-1">
                      <h4 className="font-serif font-semibold text-stone-900 text-base">{p.name}</h4>
                      <p className="text-stone-500 text-xs font-light">{p.role}</p>
                    </div>
                    {selectedPractitioner === p.name && (
                      <Check className="w-5 h-5 text-brand-600" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 font-semibold text-xs uppercase tracking-wider shadow transition"
                >
                  Étape suivante →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 & 5: DATE & TIME */}
          {(step === 4 || step === 5) && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">Étapes 4 & 5</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">Date et heure du rendez-vous</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Disponibilités en temps réel au centre de Casablanca Gautier.</p>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">1. Choisissez la date</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[
                    { day: 'Jeu', date: '04', full: '2026-09-04' },
                    { day: 'Ven', date: '05', full: '2026-09-05' },
                    { day: 'Sam', date: '06', full: '2026-09-06' },
                    { day: 'Lun', date: '08', full: '2026-09-08' },
                    { day: 'Mar', date: '09', full: '2026-09-09' },
                    { day: 'Mer', date: '10', full: '2026-09-10' },
                    { day: 'Jeu', date: '11', full: '2026-09-11' },
                  ].map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-3 rounded-xl border text-center transition ${
                        selectedDate === d.full
                          ? 'bg-charcoal-900 text-brand-200 border-charcoal-900 font-bold shadow'
                          : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-light">{d.day}</span>
                      <span className="block text-base font-serif font-bold">{d.date}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Grid */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">2. Choisissez l'horaire disponible</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 rounded-xl border text-center text-xs font-semibold transition ${
                        selectedTime === t
                          ? 'bg-brand-500 text-stone-950 border-brand-500 shadow-sm'
                          : 'bg-[#FAF9F6] border-stone-200 text-stone-800 hover:border-brand-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 font-semibold text-xs uppercase tracking-wider shadow transition"
                >
                  Coordonnées →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: CUSTOMER INFO */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">Étape 6</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal-900">Vos coordonnées</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Aucun mot de passe ni compte requis. Réservation en 10 secondes.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sara"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: El Mansouri"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Téléphone WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 6 XX XX XX XX"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-brand-500 text-xs"
                  />
                  <span className="text-[10px] text-stone-500 mt-1 block">Vous recevrez votre confirmation immédiate sur ce numéro.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email (Optionnel)</label>
                  <input
                    type="email"
                    placeholder="Ex: sara@example.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-brand-500 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
                >
                  Confirmer la réservation ✨
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: INSTANT CONFIRMATION */}
          {step === 7 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 shadow-sm animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-emerald-700 block mb-1">Réservation Validée</span>
                <h2 className="text-3xl font-serif text-charcoal-900">Merci {customerInfo.firstName || 'Sara'} !</h2>
                <p className="text-stone-500 text-xs font-light mt-1">Votre rendez-vous est transmis au centre de Casablanca Gautier.</p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-light">Soin</span>
                  <span className="font-semibold text-stone-900">{selectedTreatment}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-light">Zone</span>
                  <span className="font-semibold text-stone-900">{selectedArea}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-light">Spécialiste</span>
                  <span className="font-semibold text-stone-900">{selectedPractitioner}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-light">Date & Heure</span>
                  <span className="font-bold text-brand-800">{selectedDate} à {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-light">Lieu</span>
                  <span className="font-semibold text-stone-900">42 Bd d'Anfa, Gautier</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button 
                  onClick={() => alert('Événement ajouté à votre Google Calendar !')}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition flex items-center justify-center space-x-2"
                >
                  <CalendarCheck className="w-4 h-4 text-brand-400" />
                  <span>Ajouter au calendrier</span>
                </button>

                <a
                  href={`https://wa.me/212661248890?text=Bonjour%20Maison%20Éclat,%20je%20confirme%20mon%20rendez-vous%20du%20${selectedDate}%20à%20${selectedTime}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Contacter sur WhatsApp</span>
                </a>

                <button 
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto px-4 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition"
                >
                  Modifier mon rdv
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
