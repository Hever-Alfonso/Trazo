// Author: Hever-Alfonso

// external imports
import { describe, it, expect } from 'vitest';

// internal imports
import { nextId, shortId } from '@/utils/id';

/**
 * Covers the id generator: the empty case, the normal case and the gap left by
 * a deleted record, which is the reason the function reads the maximum instead
 * of the length.
 */
describe('nextId', () => {
  it('returns 1 for an empty collection', () => {
    expect(nextId([])).toBe(1);
  });

  it('returns one past the highest id', () => {
    expect(nextId([{ id: 1 }, { id: 2 }, { id: 3 }])).toBe(4);
  });

  it('survives gaps left by deleted records', () => {
    expect(nextId([{ id: 1 }, { id: 3 }])).toBe(4); // length + 1 would return 3
  });

  it('does not depend on the order of the collection', () => {
    expect(nextId([{ id: 7 }, { id: 2 }, { id: 5 }])).toBe(8);
  });
});

/**
 * Covers the chip label: the padding applied to short ids and the ids that are
 * already longer than the padding.
 */
describe('shortId', () => {
  it('pads single digit ids to two characters', () => {
    expect(shortId('PRJ', 1)).toBe('PRJ-01');
  });

  it('keeps two digit ids unchanged', () => {
    expect(shortId('TSK', 12)).toBe('TSK-12');
  });

  it('does not truncate ids longer than two digits', () => {
    expect(shortId('SPR', 100)).toBe('SPR-100');
  });
});
