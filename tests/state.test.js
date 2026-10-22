const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js'];

function anyCabinet(FM) {
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  return cab;
}

test('createGame uses real start data', () => {
  const FM = load(...FILES);
  const s = FM.createGame({ candidateId: FM.CANDIDATES[0].id, cabinet: anyCabinet(FM), seed: 1 });
  assert.strictEqual(s.dette, 3700);
  assert.strictEqual(s.baril, 110);
  assert.strictEqual(s.month, 0);
  assert.strictEqual(s.wars.golfe, 4);
});

test('candidate modifiers apply', () => {
  const FM = load(...FILES);
  FM.CANDIDATES.push({ id: 'test', name: 'Test', camp: 'centre', start: { popularite: 5 } });
  const s = FM.createGame({ candidateId: 'test', cabinet: anyCabinet(FM), seed: 1 });
  assert.strictEqual(s.popularite, 55);
});

test('cabinet loyalty starts at 60', () => {
  const FM = load(...FILES);
  const s = FM.createGame({ candidateId: FM.CANDIDATES[0].id, cabinet: anyCabinet(FM), seed: 1 });
  for (const post of FM.POSTS) assert.strictEqual(s.cabinet[post].loyalty, 60);
});

test('applyEffects clamps', () => {
  const FM = load(...FILES);
  const s = FM.createGame({ candidateId: FM.CANDIDATES[0].id, cabinet: anyCabinet(FM), seed: 1 });
  s.popularite = 98;
  s.relations.US = -95;
  FM.applyEffects(s, { popularite: 10, relations: { US: -20 }, dette: 50 });
  assert.strictEqual(s.popularite, 100);
  assert.strictEqual(s.relations.US, -100);
  assert.strictEqual(s.dette, 3750);
});

test('data integrity', () => {
  const FM = load(...FILES);
  assert.strictEqual(FM.CANDIDATES.length, 12);
  assert.ok(FM.CANDIDATES.some(c => c.name === 'Jean-Luc Aichonchon'));
  for (const post of FM.POSTS) {
    const n = FM.MINISTERS.filter(m => m.post === post).length;
    assert.ok(n >= 3 && n <= 4, post + ' has ' + n);
  }
  const ids = [...FM.CANDIDATES, ...FM.MINISTERS].map(x => x.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  for (const code of Object.keys(FM.COUNTRIES)) {
    assert.ok(FM.COUNTRIES[code].flag && FM.COUNTRIES[code].name, code);
  }
});

test('applyEffects keeps gauges whole numbers', () => {
  const FM = load(...FILES);
  const s = FM.createGame({ candidateId: FM.CANDIDATES[0].id, cabinet: anyCabinet(FM), seed: 1 });
  s.danger = 40; s.tension = 40;
  FM.applyEffects(s, { danger: 1.2, tension: 4.5 });
  assert.ok(Number.isInteger(s.danger) && Number.isInteger(s.tension), s.danger + ' ' + s.tension);
});

test('structural deficit starts at 160 and moves with effects', () => {
  const FM = load(...FILES);
  const s = FM.createGame({ candidateId: FM.CANDIDATES[0].id, cabinet: anyCabinet(FM), seed: 1 });
  assert.strictEqual(s.deficit, 160);
  FM.applyEffects(s, { deficit: -10 });
  assert.strictEqual(s.deficit, 150);
});
