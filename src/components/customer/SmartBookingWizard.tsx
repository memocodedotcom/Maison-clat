import React, { FormEvent, useMemo, useState } from 'react';
import { CalendarCheck, Check, CheckCircle2, ChevronLeft, Clock, MessageCircle } from 'lucide-react';
import { useClinicStore } from '../../hooks/useClinicStore';
import {
  BOOKING_SERVICES,
  BookingValidationErrors,
  CustomerInformation,
  DEMO_TIME_SLOTS,
  PRACTITIONERS,
  buildCalendarEvent,
  createBookingDates,
  formatPrice,
  resolveInitialService,
  validateCustomerInformation,
} from '../../domain/booking';

export interface BookingSubmission {
  serviceId: string;
  variantId: string;
  treatment: string;
  area: string;
  practitioner: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
}

interface SmartBookingWizardProps {
  initialTreatment?: string;
  onBookingComplete?: (bookingData: BookingSubmission) => void;
  onGoBackToSite: () => void;
}

const BOOKING_STEPS = 5;

export const SmartBookingWizard: React.FC<SmartBookingWizardProps> = ({ initialTreatment = 'Épilation Laser', onBookingComplete, onGoBackToSite }) => {
  const { addBookingFromClient } = useClinicStore();
  const initialService = useMemo(() => resolveInitialService(initialTreatment), [initialTreatment]);
  const bookingDates = useMemo(() => createBookingDates(), []);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(initialService.id);
  const selectedService = BOOKING_SERVICES.find((service) => service.id === serviceId) ?? BOOKING_SERVICES[0];
  const [variantId, setVariantId] = useState(initialService.variants[0].id);
  const selectedVariant = selectedService.variants.find((variant) => variant.id === variantId) ?? selectedService.variants[0];
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>('Premier disponible');
  const [selectedDate, setSelectedDate] = useState(bookingDates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState(DEMO_TIME_SLOTS[0]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInformation>({ firstName: '', lastName: '', phone: '', email: '' });
  const [errors, setErrors] = useState<BookingValidationErrors>({});

  const selectService = (nextServiceId: string) => {
    const nextService = BOOKING_SERVICES.find((service) => service.id === nextServiceId) ?? BOOKING_SERVICES[0];
    setServiceId(nextService.id);
    setVariantId(nextService.variants[0].id);
  };

  const next = () => setStep((current) => Math.min(current + 1, BOOKING_STEPS));
  const back = () => setStep((current) => Math.max(current - 1, 1));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateCustomerInformation(customerInfo);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const booking: BookingSubmission = {
      serviceId: selectedService.id,
      variantId: selectedVariant.id,
      treatment: selectedService.title,
      area: selectedVariant.label,
      practitioner: selectedPractitioner,
      date: selectedDate,
      time: selectedTime,
      duration: selectedService.duration,
      price: selectedVariant.price,
      firstName: customerInfo.firstName.trim(),
      lastName: customerInfo.lastName.trim(),
      phone: customerInfo.phone.trim(),
      email: customerInfo.email.trim() || undefined,
    };

    addBookingFromClient(booking);
    onBookingComplete?.(booking);
    setStep(6);
  };

  const updateCustomer = (field: keyof CustomerInformation, value: string) => {
    setCustomerInfo((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const downloadCalendarEvent = () => {
    const content = buildCalendarEvent({
      title: `${selectedService.title} — Maison Éclat`,
      date: selectedDate,
      time: selectedTime,
      duration: selectedService.duration,
      description: `Réservation ${selectedVariant.label} avec ${selectedPractitioner}.`,
      location: "42 Boulevard d'Anfa, Gautier, Casablanca",
    });
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `maison-eclat-${selectedDate}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 px-4 sm:px-6 lg:px-8 text-charcoal-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6">
          <button type="button" onClick={onGoBackToSite} className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition">
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Retour au site</span>
          </button>
          <div className="text-center">
            <span className="font-serif text-xl font-bold tracking-wide text-charcoal-900">MAISON ÉCLAT</span>
            <span className="text-[10px] text-brand-700 block font-medium">Casablanca Gautier</span>
          </div>
          <div className="text-xs text-stone-500 font-mono" aria-live="polite">
            {step <= BOOKING_STEPS ? `Étape ${step} / ${BOOKING_STEPS}` : 'Terminé'}
          </div>
        </div>

        {step <= BOOKING_STEPS && (
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mb-8" aria-hidden="true">
            <div className="bg-brand-500 h-full transition-all duration-300" style={{ width: `${(step / BOOKING_STEPS) * 100}%` }} />
          </div>
        )}

        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10 relative">
          {step === 1 && (
            <section className="space-y-6" aria-labelledby="booking-treatment-heading">
              <header>
                <StepLabel>Étape 1</StepLabel>
                <h1 id="booking-treatment-heading" className="text-2xl sm:text-3xl font-serif">Choisissez votre soin ou consultation</h1>
                <p className="text-stone-500 text-xs mt-1">Les tarifs affichés sont ceux de cette démonstration.</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BOOKING_SERVICES.map((service) => {
                  const selected = selectedService.id === service.id;
                  return (
                    <button type="button" key={service.id} onClick={() => selectService(service.id)} aria-pressed={selected} className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${selected ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400 shadow-sm' : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-400'}`}>
                      <span>
                        <span className="flex items-start justify-between gap-3 mb-1">
                          <span className="font-serif font-semibold text-stone-900 text-base">{service.title}</span>
                          <span className="text-xs font-bold text-brand-800 whitespace-nowrap">{service.startingPrice === 0 ? formatPrice(0) : `Dès ${formatPrice(service.startingPrice)}`}</span>
                        </span>
                        <span className="text-stone-500 text-xs">{service.description}</span>
                      </span>
                      <span className="mt-4 pt-2 text-[11px] text-stone-500 font-medium flex items-center gap-1"><Clock className="w-3 h-3" aria-hidden="true" /> {service.duration} min</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-4 flex justify-end"><PrimaryButton onClick={next}>Étape suivante →</PrimaryButton></div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-6" aria-labelledby="booking-variant-heading">
              <header>
                <StepLabel>Étape 2</StepLabel>
                <h1 id="booking-variant-heading" className="text-2xl sm:text-3xl font-serif">Précisez votre demande</h1>
                <p className="text-stone-500 text-xs mt-1">Soin sélectionné : <strong className="text-stone-900">{selectedService.title}</strong></p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.variants.map((variant) => {
                  const selected = selectedVariant.id === variant.id;
                  return (
                    <button type="button" key={variant.id} onClick={() => setVariantId(variant.id)} aria-pressed={selected} className={`p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition ${selected ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400 font-semibold' : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-400 text-stone-700'}`}>
                      <span className="text-sm">{variant.label}</span>
                      <span className="flex items-center gap-2 text-xs text-brand-800 whitespace-nowrap">{formatPrice(variant.price)} {selected && <Check className="w-4 h-4" aria-hidden="true" />}</span>
                    </button>
                  );
                })}
              </div>
              <NavigationButtons onBack={back} onNext={next} />
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6" aria-labelledby="booking-practitioner-heading">
              <header>
                <StepLabel>Étape 3</StepLabel>
                <h1 id="booking-practitioner-heading" className="text-2xl sm:text-3xl font-serif">Choisissez votre spécialiste</h1>
                <p className="text-stone-500 text-xs mt-1">Choisissez une personne ou laissez le centre attribuer le premier créneau.</p>
              </header>
              <div className="space-y-3">
                {PRACTITIONERS.map((practitioner) => {
                  const selected = selectedPractitioner === practitioner.name;
                  return (
                    <button type="button" key={practitioner.name} onClick={() => setSelectedPractitioner(practitioner.name)} aria-pressed={selected} className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition ${selected ? 'bg-brand-50/60 border-brand-400 ring-1 ring-brand-400' : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-400'}`}>
                      <img src={practitioner.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-stone-300" />
                      <span className="flex-1"><span className="font-serif font-semibold text-stone-900 text-base block">{practitioner.name}</span><span className="text-stone-500 text-xs block">{practitioner.role}</span></span>
                      {selected && <Check className="w-5 h-5 text-brand-600" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <NavigationButtons onBack={back} onNext={next} />
            </section>
          )}

          {step === 4 && (
            <section className="space-y-6" aria-labelledby="booking-time-heading">
              <header>
                <StepLabel>Étape 4</StepLabel>
                <h1 id="booking-time-heading" className="text-2xl sm:text-3xl font-serif">Date et heure du rendez-vous</h1>
                <p className="text-amber-800 text-xs mt-1"><strong>Mode démo :</strong> ces créneaux illustrent le parcours et ne représentent pas une disponibilité réelle.</p>
              </header>
              <fieldset>
                <legend className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Choisissez la date</legend>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {bookingDates.map((date) => (
                    <button type="button" key={date.fullDate} onClick={() => setSelectedDate(date.fullDate)} aria-pressed={selectedDate === date.fullDate} className={`p-3 rounded-xl border text-center transition ${selectedDate === date.fullDate ? 'bg-charcoal-900 text-brand-200 border-charcoal-900 font-bold shadow' : 'bg-[#FAF9F6] border-stone-200 hover:border-stone-400 text-stone-700'}`}>
                      <span className="block text-[10px] uppercase">{date.dayLabel}</span><span className="block text-base font-serif font-bold">{date.dateLabel}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Choisissez l’horaire de démonstration</legend>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {DEMO_TIME_SLOTS.map((time) => (
                    <button type="button" key={time} onClick={() => setSelectedTime(time)} aria-pressed={selectedTime === time} className={`py-3 rounded-xl border text-center text-xs font-semibold transition ${selectedTime === time ? 'bg-brand-500 text-stone-950 border-brand-500 shadow-sm' : 'bg-[#FAF9F6] border-stone-200 text-stone-800 hover:border-brand-300'}`}>{time}</button>
                  ))}
                </div>
              </fieldset>
              <NavigationButtons onBack={back} onNext={next} nextLabel="Coordonnées →" />
            </section>
          )}

          {step === 5 && (
            <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-labelledby="booking-contact-heading">
              <header><StepLabel>Étape 5</StepLabel><h1 id="booking-contact-heading" className="text-2xl sm:text-3xl font-serif">Vos coordonnées</h1><p className="text-stone-500 text-xs mt-1">Les champs marqués d’un astérisque sont obligatoires.</p></header>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="firstName" label="Prénom *" error={errors.firstName}><input id="firstName" name="firstName" autoComplete="given-name" value={customerInfo.firstName} onChange={(event) => updateCustomer('firstName', event.target.value)} className={inputClass(errors.firstName)} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'firstName-error' : undefined} /></FormField>
                  <FormField id="lastName" label="Nom *" error={errors.lastName}><input id="lastName" name="lastName" autoComplete="family-name" value={customerInfo.lastName} onChange={(event) => updateCustomer('lastName', event.target.value)} className={inputClass(errors.lastName)} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'lastName-error' : undefined} /></FormField>
                </div>
                <FormField id="phone" label="Téléphone WhatsApp *" error={errors.phone} hint="La confirmation réelle sera activée après connexion du compte WhatsApp Business."><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+212 6 XX XX XX XX" value={customerInfo.phone} onChange={(event) => updateCustomer('phone', event.target.value)} className={inputClass(errors.phone)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'} /></FormField>
                <FormField id="email" label="Email (optionnel)" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" placeholder="sara@example.com" value={customerInfo.email} onChange={(event) => updateCustomer('email', event.target.value)} className={inputClass(errors.email)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></FormField>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-xs text-stone-700"><strong>{selectedService.title}</strong> — {selectedVariant.label}<br />{selectedDate} à {selectedTime} · {selectedService.duration} min · {formatPrice(selectedVariant.price)}</div>
              <div className="pt-4 flex items-center justify-between gap-3"><SecondaryButton onClick={back}>← Retour</SecondaryButton><button type="submit" className="px-6 sm:px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md transition">Enregistrer la réservation démo</button></div>
            </form>
          )}

          {step === 6 && (
            <section className="text-center space-y-6 py-4" aria-labelledby="booking-success-heading">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300 shadow-sm"><CheckCircle2 className="w-10 h-10" aria-hidden="true" /></div>
              <header><span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-1">Réservation enregistrée en mode démo</span><h1 id="booking-success-heading" className="text-3xl font-serif">Merci {customerInfo.firstName} !</h1><p className="text-stone-500 text-xs mt-1">La réservation est visible dans cette session, mais n’a pas été transmise à un centre réel.</p></header>
              <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200 text-left max-w-md mx-auto space-y-3 text-xs"><SummaryLine label="Soin" value={selectedService.title} /><SummaryLine label="Option" value={selectedVariant.label} /><SummaryLine label="Spécialiste" value={selectedPractitioner} /><SummaryLine label="Date et heure" value={`${selectedDate} à ${selectedTime}`} /><SummaryLine label="Tarif démo" value={formatPrice(selectedVariant.price)} last /></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button type="button" onClick={downloadCalendarEvent} className="w-full sm:w-auto px-5 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition flex items-center justify-center gap-2"><CalendarCheck className="w-4 h-4 text-brand-400" aria-hidden="true" />Télécharger le calendrier</button>
                <a href="https://wa.me/212661248890" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-5 py-3 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" aria-hidden="true" />Contacter le centre</a>
                <button type="button" onClick={() => setStep(1)} className="w-full sm:w-auto px-4 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition">Nouvelle simulation</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const inputClass = (error?: string) => `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-300 text-sm ${error ? 'border-red-500' : 'border-stone-300 focus:border-brand-500'}`;
const StepLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-xs uppercase font-semibold text-brand-600 tracking-widest block mb-1">{children}</span>;
const FormField: React.FC<{ id: string; label: string; error?: string; hint?: string; children: React.ReactNode }> = ({ id, label, error, hint, children }) => <div><label htmlFor={id} className="block text-xs font-semibold text-stone-700 mb-1">{label}</label>{children}{error ? <p id={`${id}-error`} className="text-xs text-red-700 mt-1" role="alert">{error}</p> : hint ? <p id={`${id}-hint`} className="text-[10px] text-stone-500 mt-1">{hint}</p> : null}</div>;
const PrimaryButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => <button type="button" onClick={onClick} className="px-8 py-3.5 rounded-full bg-charcoal-900 text-brand-200 hover:bg-stone-800 font-semibold text-xs uppercase tracking-wider shadow transition">{children}</button>;
const SecondaryButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => <button type="button" onClick={onClick} className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition">{children}</button>;
const NavigationButtons: React.FC<{ onBack: () => void; onNext: () => void; nextLabel?: string }> = ({ onBack, onNext, nextLabel = 'Étape suivante →' }) => <div className="pt-4 flex items-center justify-between gap-3"><SecondaryButton onClick={onBack}>← Retour</SecondaryButton><PrimaryButton onClick={onNext}>{nextLabel}</PrimaryButton></div>;
const SummaryLine: React.FC<{ label: string; value: string; last?: boolean }> = ({ label, value, last }) => <div className={`flex justify-between gap-4 ${last ? '' : 'border-b border-stone-200/80 pb-2'}`}><span className="text-stone-500">{label}</span><span className="font-semibold text-stone-900 text-right">{value}</span></div>;
