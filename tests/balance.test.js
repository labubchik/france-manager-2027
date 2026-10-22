const test = require('node:test');
const assert = require('node:assert');
const { simulate } = require('../tools/simulate');

const result = simulate(500, 1000);

test('no crash', () => {
  assert.strictEqual(result.n, 500);
});

test('games are not instantly lost', () => {
  assert.ok(result.medianCards >= 45, 'médiane ' + result.medianCards);
});

test('random play rarely wins', () => {
  const wins = (result.endings.victoire || 0) + (result.endings.reelu || 0);
  const rate = wins / result.n;
  assert.ok(rate >= 0.02 && rate <= 0.35, 'taux de victoire ' + rate);
});

test('defeats are varied', () => {
  const defeats = Object.keys(result.endings).filter(k => k !== 'victoire' && k !== 'reelu');
  assert.ok(defeats.length >= 4, 'fins : ' + JSON.stringify(result.endings));
});
