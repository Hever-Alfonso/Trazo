// Author: Hever-Alfonso

// external imports
import { describe, it, expect } from 'vitest';

// internal imports
import { formatDate, formatDayMonth, formatDateRange, daysBetween, isPastDate } from '@/utils/date';

/**
 * Covers the display format and the UTC rule: a date-only string must render
 * the same day regardless of the timezone offset.
 */
describe('formatDate', () => {
  it('formats an ISO date as day, month and year', () => {
    expect(formatDate('2026-02-02')).toBe('02 Feb 2026');
  });

  it('keeps the same day in negative timezone offsets', () => {
    expect(formatDate('2026-01-01')).toBe('01 Jan 2026');
  });
});

/** Covers the short format used when the year is already known from context. */
describe('formatDayMonth', () => {
  it('formats an ISO date without the year', () => {
    expect(formatDayMonth('2026-01-05')).toBe('05 Jan');
  });
});

/** Covers the sprint window label built from the two short dates. */
describe('formatDateRange', () => {
  it('formats a sprint window', () => {
    expect(formatDateRange('2026-01-05', '2026-01-19')).toBe('05 Jan – 19 Jan');
  });
});

/**
 * Covers the day maths behind the sprint counters: the normal count, both
 * limits and the rule that the time of day never changes the result.
 */
describe('daysBetween', () => {
  it('counts whole days between two dates', () => {
    expect(daysBetween('2026-01-05', '2026-01-19')).toBe(14);
  });

  it('returns 0 for the same date', () => {
    expect(daysBetween('2026-01-05', '2026-01-05')).toBe(0);
  });

  it('returns a negative number when the end date is in the past', () => {
    expect(daysBetween('2026-01-19', '2026-01-05')).toBe(-14);
  });

  it('ignores the time of day', () => {
    expect(daysBetween('2026-01-05T23:59:00Z', '2026-01-06T00:01:00Z')).toBe(1);
  });
});

/** Covers the overdue flag on both sides of today. */
describe('isPastDate', () => {
  it('is true for a date before today', () => {
    expect(isPastDate('2020-01-01')).toBe(true);
  });

  it('is false for a date far in the future', () => {
    expect(isPastDate('2999-01-01')).toBe(false);
  });
});
