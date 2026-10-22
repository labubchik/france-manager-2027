const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js', 'data/endings.js', 'js/rules.js'];

function newGame(FM) {
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  return FM.createGame({ candidateId: 'flipper', cabinet: cab, seed: 1 });
}

test('monthTick grows debt', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.baril = 110;
  FM.monthTick(s, FM.createRng(3));
  assert.strictEqual(s.dette, 3716);
});

test('faillite at 150 percent', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.dette = 1.5 * s.pib;
  assert.strictEqual(FM.checkEnding(s), 'faillite');
});

test('priority when several endings', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.danger = 100; s.tension = 100; s.popularite = 0;
  assert.strictEqual(FM.checkEnding(s), 'accident');
});

test('pre-set ending wins', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.ending = 'nucleaire'; s.danger = 100; s.popularite = 0;
  assert.strictEqual(FM.checkEnding(s), 'nucleaire');
});

test('term end', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.month = 60; s.popularite = 60;
  assert.strictEqual(FM.checkEnding(s), 'reelu');
  s.popularite = 30;
  assert.strictEqual(FM.checkEnding(s), 'victoire');
});

test('no ending mid-game', () => {
  const FM = load(...FILES);
  assert.strictEqual(FM.checkEnding(newGame(FM)), null);
});

test('start ratio about 120', () => {
  const FM = load(...FILES);
  const r = FM.debtRatio(newGame(FM));
  assert.ok(r >= 119 && r <= 121, String(r));
});

test('every ending has title and text', () => {
  const FM = load(...FILES);
  for (const id of ['victoire', 'reelu', 'faillite', 'destitution', 'emeutes', 'accident', 'nucleaire']) {
    assert.ok(FM.ENDINGS[id] && FM.ENDINGS[id].title && FM.ENDINGS[id].text, id);
  }
});
