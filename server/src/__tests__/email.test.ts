import { describe, it, expect } from 'vitest';
import { makeDisplayName, sanitize, isValidEmail } from '../utils/email';

describe('makeDisplayName', () => {
  it('abbreviates last name', () => {
    expect(makeDisplayName('Ion Popescu')).toBe('Ion P.');
  });
  it('handles single name', () => {
    expect(makeDisplayName('Andrei')).toBe('Andrei');
  });
  it('handles multiple spaces', () => {
    expect(makeDisplayName('Ana  Maria  Ionescu')).toBe('Ana I.');
  });
});

describe('sanitize', () => {
  it('strips newline injection', () => {
    expect(sanitize('hello\r\nworld')).not.toContain('\r\n');
  });
  it('strips angle brackets', () => {
    expect(sanitize('<script>alert(1)</script>')).not.toContain('<');
  });
  it('returns empty string for non-strings', () => {
    expect(sanitize(null)).toBe('');
    expect(sanitize(123)).toBe('');
  });
});

describe('isValidEmail', () => {
  it('validates correct emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user+tag@sub.domain.co')).toBe(true);
  });
  it('rejects invalid emails', () => {
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('@nodomain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
