var FM = (globalThis.FM = globalThis.FM || {});

FM.SAVE_KEY = 'france-manager-2027';

// localStorage peut être absent ou lever (file://, navigation privée) : le jeu doit rester jouable.
function store(storage) {
  return storage !== undefined ? storage : globalThis.localStorage;
}

FM.saveGame = function (state, storage) {
  try {
    var st = store(storage);
    if (!st) return false;
    st.setItem(FM.SAVE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
};

FM.loadGame = function (storage) {
  try {
    var st = store(storage);
    if (!st) return null;
    var raw = st.getItem(FM.SAVE_KEY);
    if (!raw) return null;
    var state = JSON.parse(raw);
    return state && state.version === 1 ? state : null;
  } catch (e) {
    return null;
  }
};

FM.clearSave = function (storage) {
  try {
    var st = store(storage);
    if (st) st.removeItem(FM.SAVE_KEY);
  } catch (e) { /* rien à effacer */ }
};
