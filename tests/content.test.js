const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { load, ROOT } = require('./helpers/load');

// Charge exactement les scripts d'index.html (hors UI), dans le même ordre.
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.startsWith('js/ui/'));
const FM = load(...scripts);

const EFFECT_KEYS = ['dette', 'popularite', 'tension', 'danger', 'assemblee', 'baril', 'relations', 'loyalty', 'wars'];
const SYSTEM_FAMILIES = ['nucleaire'];
const allChoices = () => FM.CARDS.flatMap(c => c.choices.map(ch => ({ c, ch })));

function checkEffects(fx, where) {
  if (!fx) return;
  for (const k of Object.keys(fx)) {
    assert.ok(EFFECT_KEYS.includes(k), where + ': clé inconnue ' + k);
    if (k === 'relations') for (const c of Object.keys(fx[k])) assert.ok(FM.COUNTRIES[c], where + ': pays ' + c);
    if (k === 'loyalty') for (const p of Object.keys(fx[k])) assert.ok(FM.POSTS.includes(p), where + ': poste ' + p);
    if (k === 'wars') for (const w of Object.keys(fx[k])) assert.ok(w in FM.START.wars, where + ': guerre ' + w);
    if (typeof fx[k] === 'number') assert.ok(Number.isFinite(fx[k]), where + ': ' + k);
  }
}

test('card ids unique', () => {
  const ids = FM.CARDS.map(c => c.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepStrictEqual(dup, []);
});

test('every card has 2 or 3 choices with labels <= 40 chars', () => {
  for (const c of FM.CARDS) {
    assert.ok(c.choices.length >= 2 && c.choices.length <= 3, c.id);
    for (const ch of c.choices) assert.ok(ch.label && ch.label.length <= 40, c.id + ': ' + ch.label);
    const always = c.choices.filter(ch => !ch.fire);
    assert.ok(always.length >= 2, c.id + ' needs 2 choices without fire');
  }
});

test('card text <= 220 chars', () => {
  for (const c of FM.CARDS) assert.ok(c.text && c.text.length <= 220, c.id + ' (' + (c.text || '').length + ')');
});

test('effects keys valid', () => {
  for (const { c, ch } of allChoices()) {
    checkEffects(ch.effects, c.id);
    if (ch.vote) { checkEffects(ch.vote.onPass, c.id); checkEffects(ch.vote.onFail, c.id); }
    if (ch.campMod) for (const camp of Object.keys(ch.campMod)) checkEffects(ch.campMod[camp], c.id);
    if (ch.fire && ch.fire !== '$betrayal') assert.ok(FM.POSTS.includes(ch.fire), c.id + ': fire ' + ch.fire);
    if (ch.ending) assert.ok(FM.ENDINGS[ch.ending], c.id + ': ending ' + ch.ending);
  }
});

test('followups and system cards resolve', () => {
  for (const { c, ch } of allChoices()) {
    for (const f of ch.followups || []) assert.ok(FM.cardById(f.cardId), c.id + ' → ' + f.cardId);
  }
  assert.ok(FM.cardById('monde-calme'));
  assert.ok(FM.cardById('ministre-trahison'));
  for (const code of Object.keys(FM.COUNTRIES)) {
    if (FM.COUNTRIES[code].nuclear || code === 'IR') assert.ok(FM.cardById('nucleaire-' + code), 'nucleaire-' + code);
  }
});

test('leader cards reference known countries', () => {
  for (const c of FM.CARDS) {
    if (c.who && c.who.leader) assert.ok(FM.COUNTRIES[c.who.leader], c.id);
    if (c.who && c.who.minister && c.who.minister !== '$betrayal') assert.ok(FM.POSTS.includes(c.who.minister), c.id);
    if (c.post) assert.ok(FM.POSTS.includes(c.post), c.id + ' post');
  }
});

test('common pool >= 150', () => {
  const common = FM.CARDS.filter(c => !c.system && !(c.when && c.when.candidate) && !SYSTEM_FAMILIES.includes(c.family));
  assert.ok(common.length >= 150, 'seulement ' + common.length);
});

test('each candidate has 3 to 5 specific cards', () => {
  for (const cand of FM.CANDIDATES) {
    const n = FM.CARDS.filter(c => c.when && c.when.candidate === cand.id).length;
    assert.ok(n >= 3 && n <= 5, cand.id + ': ' + n);
  }
});

test('family coverage', () => {
  const min = { social: 15, services: 12, hot: 20, lois: 15, presse: 15, tv: 6, geo: 20, guerre: 15, immigration: 8, monde: 15 };
  for (const fam of Object.keys(min)) {
    const n = FM.CARDS.filter(c => c.family === fam && !c.system).length;
    assert.ok(n >= min[fam], fam + ': ' + n + ' < ' + min[fam]);
  }
});

test('every nuclear card has a de-escalation choice', () => {
  for (const c of FM.CARDS.filter(x => x.id.startsWith('nucleaire-'))) {
    assert.ok(c.system, c.id + ' must be system');
    assert.ok(c.choices.some(ch => !ch.ending), c.id);
  }
});

test('Aichonchon present', () => {
  assert.ok(FM.CANDIDATES.some(c => c.name === 'Jean-Luc Aichonchon'));
});
