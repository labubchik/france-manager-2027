const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers/load');

const FM = load('js/save.js');

function fakeStorage() {
  const data = {};
  return {
    getItem: k => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: k => { delete data[k]; },
    data
  };
}

const throwing = {
  getItem() { throw new Error('denied'); },
  setItem() { throw new Error('denied'); },
  removeItem() { throw new Error('denied'); }
};

test('round trip', () => {
  const st = fakeStorage();
  assert.strictEqual(FM.saveGame({ version: 1, month: 4 }, st), true);
  assert.deepStrictEqual(FM.loadGame(st), { version: 1, month: 4 });
  FM.clearSave(st);
  assert.strictEqual(FM.loadGame(st), null);
});

test('throwing storage', () => {
  assert.strictEqual(FM.saveGame({ version: 1 }, throwing), false);
  assert.strictEqual(FM.loadGame(throwing), null);
  assert.doesNotThrow(() => FM.clearSave(throwing));
});

test('undefined storage', () => {
  const saved = globalThis.localStorage;
  try {
    delete globalThis.localStorage;
    assert.strictEqual(FM.saveGame({ version: 1 }), false);
    assert.strictEqual(FM.loadGame(), null);
    assert.doesNotThrow(() => FM.clearSave());
  } finally {
    if (saved !== undefined) globalThis.localStorage = saved;
  }
});

test('corrupt json', () => {
  const st = fakeStorage();
  st.setItem(FM.SAVE_KEY, '{oops');
  assert.strictEqual(FM.loadGame(st), null);
});

test('wrong version', () => {
  const st = fakeStorage();
  st.setItem(FM.SAVE_KEY, JSON.stringify({ version: 0 }));
  assert.strictEqual(FM.loadGame(st), null);
});
