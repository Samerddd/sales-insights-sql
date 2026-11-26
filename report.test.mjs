import assert from 'node:assert/strict';
import test from 'node:test';
import { monthlyRevenue } from './report.mjs';

test('calculates paid revenue without counting multi-line orders twice', () => {
  assert.deepEqual(monthlyRevenue('2026-01-01', '2026-03-01'), [
    { month: '2026-01', paid_orders: 3, customers: 2, revenue_cents: 9500 },
    { month: '2026-02', paid_orders: 1, customers: 1, revenue_cents: 5000 },
  ]);
});

test('includes the start and excludes the end', () => {
  assert.deepEqual(monthlyRevenue('2026-01-12', '2026-01-21'), [
    { month: '2026-01', paid_orders: 1, customers: 1, revenue_cents: 1500 },
  ]);
});

test('validates dates and handles an empty range', () => {
  assert.throws(() => monthlyRevenue('2026-02-30', '2026-03-01'), /date range/);
  assert.throws(() => monthlyRevenue('2026-03-01', '2026-02-01'), /date range/);
  assert.deepEqual(monthlyRevenue('2026-03-01', '2026-04-01'), []);
});
