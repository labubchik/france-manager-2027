const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js',
  'data/endings.js', 'js/rules.js', 'js/deck.js', 'js/engine.js', 'js/save.js'];

function fakeStorage(value) {
  const data = { 'france-manager-2027': JSON.stringify(value) };
  return { getItem: k => data[k] ?? null, setItem: (k, v) => { data[k] = v; }, removeItem: k => { delete data[k]; } };
}

function validGame(FM) {
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  return FM.createGame({ candidateId: 'flipper', cabinet: cab, seed: 1 });
}

test('valid save loads', () => {
  const FM = load(...FILES);
  assert.ok(FM.loadGame(fakeStorage(validGame(FM))));
});

test('save with unknown minister is rejected', () => {
  const FM = load(...FILES);
  const s = validGame(FM);
  s.cabinet.interieur.ministerId = 'ministre-supprime';
  assert.strictEqual(FM.loadGame(fakeStorage(s)), null);
});

test('save with unknown candidate is rejected', () => {
  const FM = load(...FILES);
  const s = validGame(FM);
  s.candidateId = 'disparu';
  assert.strictEqual(FM.loadGame(fakeStorage(s)), null);
});

test('minimal version-1 save is rejected', () => {
  const FM = load(...FILES);
  assert.strictEqual(FM.loadGame(fakeStorage({ version: 1 })), null);
});

test('save with missing post is rejected', () => {
  const FM = load(...FILES);
  const s = validGame(FM);
  delete s.cabinet.ecologie;
  assert.strictEqual(FM.loadGame(fakeStorage(s)), null);
});
