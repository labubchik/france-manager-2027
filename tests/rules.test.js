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
  // déficit structurel 160 Md€/an → 13,3 par mois, + 3 liés au baril
  assert.strictEqual(s.dette, 3716.3);
});

test('faillite at 150 percent (still above threshold)', () => {
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

test('faillite threshold is 132 percent', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.dette = 1.32 * s.pib;
  assert.strictEqual(FM.checkEnding(s), 'faillite');
  s.dette = 1.31 * s.pib;
  assert.strictEqual(FM.checkEnding(s), null);
});

test('monthTick pulls tension back toward normal', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.baril = 100; s.tension = 90;
  for (const w of Object.keys(s.wars)) s.wars[w] = 0;
  FM.monthTick(s, FM.createRng(3));
  assert.ok(s.tension < 90 && s.tension >= 85, String(s.tension));
});

test('monthTick raises danger with hostile countries', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.danger = 30;
  for (const c of Object.keys(s.relations)) s.relations[c] = -80;
  FM.monthTick(s, FM.createRng(3));
  assert.ok(s.danger > 33, String(s.danger));
});

test('default pace constants', () => {
  const FM = load(...FILES);
  assert.strictEqual(FM.MONTHS_PER_CARD, 1.5);
  assert.ok(FM.EFFECT_SCALE > 1);
});

test('oil price settles instead of hitting the ceiling', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  const rng = FM.createRng(11);
  for (let i = 0; i < 60; i++) FM.monthTick(s, rng);
  assert.ok(s.baril < 160, String(s.baril));
});

test('lower structural deficit slows the debt', () => {
  const FM = load(...FILES);
  const a = newGame(FM), b = newGame(FM);
  a.baril = b.baril = 80;
  b.deficit = 40;
  FM.monthTick(a, FM.createRng(3)); FM.monthTick(b, FM.createRng(3));
  assert.ok(Math.abs((a.dette - 3700) - 160 / 12) < 0.1, String(a.dette));
  assert.ok(Math.abs((b.dette - 3700) - 40 / 12) < 0.1, String(b.dette));
});

test('a budget surplus reduces the debt', () => {
  const FM = load(...FILES);
  const s = newGame(FM);
  s.baril = 80; s.deficit = -24;
  FM.monthTick(s, FM.createRng(3));
  assert.ok(s.dette < 3700, String(s.dette));
});
