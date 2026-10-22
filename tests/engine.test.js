const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js',
  'data/endings.js', 'js/rules.js', 'js/deck.js', 'js/engine.js'];

function card(id, choices, extra) {
  return Object.assign({ id, family: 'monde', who: { name: 'X', role: 'Y', portrait: '🙂' }, text: 't', choices }, extra);
}

function setup(cabinetOverride, candidateId) {
  const FM = load(...FILES);
  FM.CARDS.length = 0;
  FM.CARDS.push(
    card('monde-calme', [{ label: 'A', effects: {} }, { label: 'B', effects: {} }]),
    card('ministre-trahison', [{ label: 'Virer', fire: '$betrayal' }, { label: 'Pardonner', effects: {} }], { system: true, who: { minister: '$betrayal' } }),
    card('nucleaire-RU', [{ label: 'Désescalade', effects: {} }, { label: 'Tenir bon', ending: 'nucleaire' }], { system: true, who: { leader: 'RU' } })
  );
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  Object.assign(cab, cabinetOverride || {});
  const s = FM.createGame({ candidateId: candidateId || 'flipper', cabinet: cab, seed: 1 });
  // Ces tests vérifient la mécanique au rythme historique (3 cartes par mois, effets bruts).
  FM.MONTHS_PER_CARD = 1 / 3;
  FM.EFFECT_SCALE = 1;
  return { FM, s, rng: FM.createRng(9) };
}

const plain = (fx) => card('p', [{ label: 'A', effects: fx }, { label: 'B', effects: {} }]);

test('applies effects and campMod', () => {
  const { FM, s, rng } = setup();
  s.popularite = 50; s.tension = 50;
  const c = card('c', [{ label: 'A', effects: { popularite: 5 }, campMod: { centre: { popularite: -10, tension: 4 } } }, { label: 'B' }]);
  FM.resolveChoice(s, c, 0, rng);
  assert.strictEqual(s.popularite, 45);
  assert.strictEqual(s.tension, 54);
});

test('competence scales favourable effects', () => {
  const { FM, s, rng } = setup({ interieur: 'nunuche' }); // compétence 4
  s.cabinet.interieur.ministerId = 'devilliersblinde'; // compétence 5 (test direct)
  s.popularite = 50;
  const up = card('u', [{ label: 'A', effects: { popularite: 10 } }, { label: 'B' }], { post: 'interieur' });
  FM.resolveChoice(s, up, 0, rng);
  assert.strictEqual(s.popularite, 63);
  const down = card('d', [{ label: 'A', effects: { popularite: -10 } }, { label: 'B' }], { post: 'interieur' });
  FM.resolveChoice(s, down, 0, rng);
  assert.strictEqual(s.popularite, 53);
});

test('third card of month ticks month', () => {
  const { FM, s, rng } = setup();
  const before = s.dette;
  for (let i = 0; i < 3; i++) FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(s.month, 1);
  assert.ok(s.dette > before);
});

const law = card('loi', [
  { label: 'Porter', vote: { difficulty: 50, onPass: { popularite: 5 }, onFail: { popularite: -2 } } },
  { label: '49.3', use493: true, vote: { difficulty: 50, onPass: { popularite: 5 }, onFail: {} } },
  { label: 'Enterrer', effects: {} }
]);

test('vote passes with high support', () => {
  const { FM, s, rng } = setup();
  s.assemblee = 90; s.popularite = 50;
  const r = FM.resolveChoice(s, law, 0, rng);
  assert.strictEqual(r.outcome.text, 'Loi adoptée');
  assert.strictEqual(s.popularite, 55);
});

test('vote fails with low support', () => {
  const { FM, s, rng } = setup();
  s.assemblee = 10; s.popularite = 50;
  const r = FM.resolveChoice(s, law, 0, rng);
  assert.strictEqual(r.outcome.text, 'Loi rejetée');
  assert.strictEqual(s.popularite, 48);
});

test('three failed votes cost popularity', () => {
  const { FM, s, rng } = setup();
  s.assemblee = 0; s.popularite = 50;
  for (let i = 0; i < 3; i++) FM.resolveChoice(s, law, 0, rng);
  assert.strictEqual(s.popularite, 50 - 2 * 3 - 5);
});

test('49.3 forces the law and costs popularity', () => {
  const { FM, s, rng } = setup();
  s.assemblee = 0; s.popularite = 50; s.tension = 50;
  const r = FM.resolveChoice(s, law, 1, rng);
  assert.strictEqual(r.outcome.text, 'Loi adoptée (49.3)');
  assert.strictEqual(s.popularite, 50 - 8 + 5);
  assert.strictEqual(s.tension, 56);
});

test('fire replaces minister with unused one of same post', () => {
  const { FM, s, rng } = setup({ interieur: 'dardmanin' });
  const c = card('f', [{ label: 'Virer', fire: 'interieur' }, { label: 'Garder' }]);
  FM.resolveChoice(s, c, 0, rng);
  const m = FM.ministerAt(s, 'interieur');
  assert.notStrictEqual(m.id, 'dardmanin');
  assert.strictEqual(m.post, 'interieur');
  assert.strictEqual(s.cabinet.interieur.loyalty, 60);
});

test('fire hidden when post exhausted', () => {
  const { FM, s } = setup();
  for (const m of FM.MINISTERS) if (m.post === 'interieur' && !s.usedMinisters.includes(m.id)) s.usedMinisters.push(m.id);
  const c = card('f', [{ label: 'Virer', fire: 'interieur' }, { label: 'Garder' }]);
  assert.deepStrictEqual(FM.visibleChoices(c, s).map(v => v.index), [1]);
});

test('tv decrements and hides at zero', () => {
  const { FM, s, rng } = setup();
  const c = card('tv', [{ label: 'Ferme', tv: true }, { label: 'Rien' }]);
  s.tvLeft = 1;
  FM.resolveChoice(s, c, 0, rng);
  assert.strictEqual(s.tvLeft, 0);
  assert.deepStrictEqual(FM.visibleChoices(c, s).map(v => v.index), [1]);
});

test('zero loyalty queues betrayal once', () => {
  const { FM, s, rng } = setup();
  s.cabinet.travail.loyalty = 0;
  FM.resolveChoice(s, plain({}), 1, rng);
  FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(s.queue.filter(q => q.cardId === 'ministre-trahison').length, 1);
  assert.strictEqual(s.betrayalPost, 'travail');
  assert.strictEqual(FM.drawCard(s, rng).id, 'ministre-trahison');
});

test('nuclear point of no return queued', () => {
  const { FM, s, rng } = setup();
  s.relations.RU = -95; s.wars.ukraine = 4;
  FM.resolveChoice(s, plain({}), 1, rng);
  assert.ok(s.queue.some(q => q.cardId === 'nucleaire-RU'));
  s.queue.length = 0;
  FM.resolveChoice(s, plain({}), 1, rng);
  assert.ok(!s.queue.some(q => q.cardId === 'nucleaire-RU'));
});

test('ending choice ends game', () => {
  const { FM, s, rng } = setup();
  const r = FM.resolveChoice(s, FM.cardById('nucleaire-RU'), 1, rng);
  assert.strictEqual(r.outcome.ending, 'nucleaire');
});

test('affectedGauges sizes', () => {
  const { FM } = setup();
  const g = FM.affectedGauges({ effects: { popularite: -3, dette: 50 } });
  assert.deepStrictEqual(g, { dette: 2, popularite: 1, tension: 0, danger: 0 });
});

test('renderWho leader shows flag and country', () => {
  const { FM, s } = setup();
  const who = FM.renderWho(FM.cardById('nucleaire-RU'), s);
  assert.strictEqual(who.name, 'Vladimir Poutrine');
  assert.ok(who.role.includes('🇷🇺') && who.role.includes('Russie'));
});

test('candidate tvBonus adds popularity on tv choices', () => {
  const { FM, s, rng } = setup(null, 'aichonchon');
  s.popularite = 40;
  const c = card('tvb', [{ label: 'Ferme', tv: true, effects: {} }, { label: 'Rien' }]);
  FM.resolveChoice(s, c, 0, rng);
  assert.strictEqual(s.popularite, 40 + FM.CANDIDATES.find(x => x.id === 'aichonchon').tvBonus);
});

test('betrayal alone never ends the game', () => {
  const { FM, s, rng } = setup();
  s.danger = 95;
  s.cabinet.travail.loyalty = 0;
  const r = FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(r.outcome.ending, null);
  assert.ok(s.danger < 100);
});

test('default pace: about 40 cards make a full term', () => {
  const { FM, s, rng } = setup();
  FM.MONTHS_PER_CARD = 1.5;
  s.dette = 3000; // pas de faillite : on ne teste que le rythme
  let r;
  for (let i = 0; i < 40; i++) r = FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(s.month, 60);
  assert.ok(['victoire', 'reelu'].includes(r.outcome.ending) || r.outcome.ending, String(r.outcome.ending));
  assert.strictEqual(FM.dateLabel(1.5), 'Juin 2027');
});

test('month tick runs once per elapsed month', () => {
  const { FM, s, rng } = setup();
  FM.MONTHS_PER_CARD = 1.5;
  let ticks = 0;
  const orig = FM.monthTick;
  FM.monthTick = (st, r) => { ticks++; return orig(st, r); };
  FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(ticks, 1);
  FM.resolveChoice(s, plain({}), 1, rng);
  assert.strictEqual(ticks, 3);
});

test('effect scale amplifies card effects', () => {
  const { FM, s, rng } = setup();
  FM.EFFECT_SCALE = 2;
  s.popularite = 50; s.dette = 3700;
  FM.resolveChoice(s, plain({ popularite: 5, dette: 4 }), 0, rng);
  assert.strictEqual(s.popularite, 60);
  assert.ok(s.dette >= 3708);
});

test('a gauge limit reached by a card ends the game before monthly drift', () => {
  const { FM, s, rng } = setup();
  FM.MONTHS_PER_CARD = 1.5;
  s.tension = 95;
  const r = FM.resolveChoice(s, plain({ tension: 10 }), 0, rng);
  assert.strictEqual(r.outcome.ending, 'emeutes');
});

test('real deficit estimates are not amplified by EFFECT_SCALE', () => {
  const { FM, s, rng } = setup();
  FM.EFFECT_SCALE = 2.2;
  s.deficit = 160;
  FM.resolveChoice(s, plain({ deficit: -10 }), 0, rng);
  assert.strictEqual(s.deficit, 150);
});

test('deficit changes show as a big debt dot in the preview', () => {
  const { FM } = setup();
  assert.strictEqual(FM.affectedGauges({ effects: { deficit: -5 } }).dette, 2);
  assert.strictEqual(FM.affectedGauges({ effects: { deficit: 1 } }).dette, 1);
});
