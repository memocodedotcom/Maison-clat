import { describe, expect, it } from 'vitest';
import {
  BOOKING_SERVICES,
  buildCalendarEvent,
  createBookingDates,
  formatPrice,
  isLocalDateToday,
  resolveInitialService,
  validateCustomerInformation,
} from './booking';

describe('booking catalogue', () => {
  it('resolves the abbreviated initial treatment', () => {
    expect(resolveInitialService('Épilation Laser').id).toBe('laser');
  });

  it('keeps starting prices aligned with the lowest variant price', () => {
    for (const service of BOOKING_SERVICES) {
      expect(service.startingPrice).toBe(Math.min(...service.variants.map((variant) => variant.price)));
    }
  });

  it('formats paid and free services', () => {
    expect(formatPrice(0)).toBe('Offert');
    expect(formatPrice(1200)).toContain('1');
    expect(formatPrice(1200)).toContain('200 DH');
  });
});

describe('booking dates', () => {
  it('generates future clinic dates and skips Sundays', () => {
    const dates = createBookingDates(new Date(2026, 8, 4), 4);
    expect(dates.map((date) => date.fullDate)).toEqual(['2026-09-04', '2026-09-05', '2026-09-07', '2026-09-08']);
  });

  it('compares dates using local calendar values', () => {
    expect(isLocalDateToday('2026-09-04', new Date(2026, 8, 4, 23, 30))).toBe(true);
    expect(isLocalDateToday('2026-09-05', new Date(2026, 8, 4, 23, 30))).toBe(false);
  });
});

describe('customer validation', () => {
  it('requires both names and a plausible phone number', () => {
    const errors = validateCustomerInformation({ firstName: '', lastName: '', phone: '123', email: '' });
    expect(errors).toMatchObject({ firstName: expect.any(String), lastName: expect.any(String), phone: expect.any(String) });
  });

  it('rejects malformed optional email and accepts valid details', () => {
    expect(validateCustomerInformation({ firstName: 'Sara', lastName: 'Amrani', phone: '+212 612 345 678', email: 'bad' }).email).toBeDefined();
    expect(validateCustomerInformation({ firstName: 'Sara', lastName: 'Amrani', phone: '+212 612 345 678', email: 'sara@example.com' })).toEqual({});
  });
});

describe('calendar export', () => {
  it('creates a complete calendar event and escapes text', () => {
    const event = buildCalendarEvent({
      title: 'Soin, visage',
      date: '2026-09-04',
      time: '14:30',
      duration: 45,
      description: 'Ligne 1\nLigne 2',
      location: 'Casablanca; Gautier',
    });
    expect(event).toContain('BEGIN:VCALENDAR');
    expect(event).toContain('SUMMARY:Soin\\, visage');
    expect(event).toContain('DESCRIPTION:Ligne 1\\nLigne 2');
    expect(event).toContain('END:VCALENDAR');
  });
});

