const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js', 'js/deck.js'];

function card(id, extra) {
  return Object.assign({ id, family: 'monde', who: { name: 'X', role: 'Y', portrait: '🙂' }, text: 't',
    choices: [{ label: 'A', effects: {} }, { label: 'B', effects: {} }] }, extra);
}

function setup(cards, cabinetOverride) {
  const FM = load(...FILES);
  FM.CARDS.length = 0;
  FM.CARDS.push(card('monde-calme'), ...cards);
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  Object.assign(cab, cabinetOverride || {});
  const s = FM.createGame({ candidateId: 'flipper', cabinet: cab, seed: 1 });
  return { FM, s, rng: FM.createRng(5) };
}

test('queued followup comes first when due', () => {
  const { FM, s, rng } = setup([card('a'), card('suite', { once: true, when: { flags: ['jamais'] } })]);
  s.queue.push({ cardId: 'suite', inCards: 0 });
  assert.strictEqual(FM.drawCard(s, rng).id, 'suite');
  assert.strictEqual(s.queue.length, 0);
});

test('queued followup waits', () => {
  const { FM, s, rng } = setup([card('a'), card('suite', { when: { flags: ['jamais'] } })]);
  s.queue.push({ cardId: 'suite', inCards: 2 });
  for (let i = 0; i < 20; i++) assert.notStrictEqual(FM.drawCard(s, rng).id, 'suite');
});

test('when.flags filters', () => {
  const { FM, s } = setup([]);
  const c = card('f', { when: { flags: ['crs_envoyes'] } });
  assert.strictEqual(FM.isEligible(c, s), false);
  s.flags.crs_envoyes = true;
  assert.strictEqual(FM.isEligible(c, s), true);
});

test('when.notFlags filters', () => {
  const { FM, s } = setup([]);
  const c = card('f', { when: { notFlags: ['x'] } });
  assert.strictEqual(FM.isEligible(c, s), true);
  s.flags.x = true;
  assert.strictEqual(FM.isEligible(c, s), false);
});

test('when.candidate filters', () => {
  const { FM, s } = setup([]);
  assert.strictEqual(FM.isEligible(card('c', { when: { candidate: 'aichonchon' } }), s), false);
  assert.strictEqual(FM.isEligible(card('c', { when: { candidate: 'flipper' } }), s), true);
});

test('when.minMonth filters', () => {
  const { FM, s } = setup([]);
  const c = card('m', { when: { minMonth: 3 } });
  assert.strictEqual(FM.isEligible(c, s), false);
  s.month = 3;
  assert.strictEqual(FM.isEligible(c, s), true);
});

test('when.min and when.any filter on gauges', () => {
  const { FM, s } = setup([]);
  s.tension = 50;
  const c = card('g', { when: { any: [{ min: { tension: 70 } }, { flags: ['grande_loi'] }] } });
  assert.strictEqual(FM.isEligible(c, s), false);
  s.flags.grande_loi = true;
  assert.strictEqual(FM.isEligible(c, s), true);
});

test('once cards never repeat', () => {
  const { FM, s } = setup([]);
  const c = card('o', { once: true });
  s.seen.o = 1;
  assert.strictEqual(FM.isEligible(c, s), false);
});

test('recent cards are skipped', () => {
  const { FM, s } = setup([]);
  s.recent.push('r');
  assert.strictEqual(FM.isEligible(card('r'), s), false);
});

test('exhausted deck still returns a card', () => {
  const { FM, s, rng } = setup([card('a'), card('b')]);
  s.recent.push('a', 'b', 'monde-calme');
  assert.ok(FM.drawCard(s, rng));
});

test('trait triples weight', () => {
  const { FM, s } = setup([], { interieur: 'dardmanin' });
  const c = card('t', { post: 'interieur', when: { trait: 'cogneur' } });
  assert.strictEqual(FM.cardWeight(c, s), 3);
});

test('when.notCandidate filters', () => {
  const { FM, s } = setup([]);
  assert.strictEqual(FM.isEligible(card('n', { when: { notCandidate: 'flipper' } }), s), false);
  assert.strictEqual(FM.isEligible(card('n', { when: { notCandidate: 'aichonchon' } }), s), true);
});
