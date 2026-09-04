import { describe, expect, it } from 'vitest';
import { resolveRoute } from './routing';

describe('route resolution', () => {
  it('resolves public routes', () => {
    expect(resolveRoute('#/')).toEqual({ portal: 'customer', page: 'home' });
    expect(resolveRoute('#/reservation')).toEqual({ portal: 'customer', page: 'booking' });
  });

  it('resolves only known admin tabs', () => {
    expect(resolveRoute('#/admin/leads')).toEqual({ portal: 'admin', tab: 'leads' });
    expect(resolveRoute('#/admin/not-real')).toEqual({ portal: 'not-found' });
  });

  it('returns not found for unknown public paths', () => {
    expect(resolveRoute('#/unknown')).toEqual({ portal: 'not-found' });
  });
});
