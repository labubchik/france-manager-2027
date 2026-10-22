const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FILES = ['js/rng.js', 'data/countries.js', 'data/candidates.js', 'data/ministers.js', 'js/state.js',
  'data/endings.js', 'js/rules.js', 'js/deck.js', 'js/engine.js', 'js/save.js', 'js/ui/controller.js'];

function setup() {
  const FM = load(...FILES);
  FM.CARDS.length = 0;
  FM.CARDS.push({ id: 'monde-calme', family: 'monde', who: { name: 'X', role: 'Y', portrait: '🙂' }, text: 't',
    choices: [{ label: 'A', effects: {} }, { label: 'Fin', ending: 'nucleaire' }] });
  const cab = {};
  for (const post of FM.POSTS) cab[post] = FM.MINISTERS.find(m => m.post === post).id;
  const state = FM.createGame({ candidateId: 'flipper', cabinet: cab, seed: 1 });
  const calls = { change: 0, ending: [], saved: 0, cleared: 0 };
  FM.saveGame = () => { calls.saved++; return true; };
  FM.clearSave = () => { calls.cleared++; };
  const ctrl = FM.createController(state, FM.createRng(state.rngState), {
    onChange: () => { calls.change++; },
    onEnding: (s, id) => { calls.ending.push(id); }
  });
  return { FM, ctrl, calls };
}

test('double choose resolves once', () => {
  const { ctrl, calls } = setup();
  assert.strictEqual(ctrl.choose(0), true);
  assert.strictEqual(ctrl.choose(0), false);
  assert.strictEqual(calls.change, 1);
});

test('unlock allows next choice', () => {
  const { ctrl, calls } = setup();
  ctrl.choose(0);
  ctrl.unlock();
  assert.strictEqual(ctrl.choose(0), true);
  assert.strictEqual(calls.change, 2);
  assert.strictEqual(calls.saved, 2);
});

test('ending calls onEnding and clears save', () => {
  const { ctrl, calls } = setup();
  ctrl.choose(1);
  assert.deepStrictEqual(calls.ending, ['nucleaire']);
  assert.strictEqual(calls.cleared, 1);
});

test('current card is available before any choice', () => {
  const { ctrl } = setup();
  assert.strictEqual(ctrl.current().id, 'monde-calme');
});
