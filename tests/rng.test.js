const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FM = load('js/rng.js');

test('same seed gives same sequence', () => {
  const a = FM.createRng(42);
  const b = FM.createRng(42);
  for (let i = 0; i < 100; i++) assert.strictEqual(a.next(), b.next());
});

test('resume from state', () => {
  const r = FM.createRng(42);
  for (let i = 0; i < 10; i++) r.next();
  const resumed = FM.createRng(42, r.state());
  for (let i = 0; i < 10; i++) assert.strictEqual(resumed.next(), r.next());
});

test('int is inclusive and bounded', () => {
  const r = FM.createRng(7);
  const seen = new Set();
  for (let i = 0; i < 1000; i++) {
    const v = r.int(1, 3);
    assert.ok(v >= 1 && v <= 3);
    seen.add(v);
  }
  assert.deepStrictEqual([...seen].sort(), [1, 2, 3]);
});
