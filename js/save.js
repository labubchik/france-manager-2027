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
    if (state && typeof state.deficit !== 'number' && FM.START) state.deficit = FM.START.deficit;
    return FM.isValidSave(state) ? state : null;
  } catch (e) {
    return null;
  }
};

// Une sauvegarde qui ne correspond plus au contenu du jeu (candidat ou ministre supprimé, champ manquant) est ignorée.
FM.isValidSave = function (state) {
  if (!state || state.version !== 1 || typeof state.month !== 'number') return false;
  if (!FM.CANDIDATES) return true;
  if (!FM.CANDIDATES.some(function (c) { return c.id === state.candidateId; })) return false;
  if (!state.cabinet || !FM.POSTS.every(function (post) {
    var slot = state.cabinet[post];
    return slot && FM.MINISTERS.some(function (m) { return m.id === slot.ministerId && m.post === post; });
  })) return false;
  var arrays = ['queue', 'recent', 'log', 'usedMinisters'];
  var objects = ['seen', 'flags', 'relations', 'wars'];
  return arrays.every(function (k) { return Array.isArray(state[k]); }) &&
    objects.every(function (k) { return state[k] && typeof state[k] === 'object'; });
};

FM.clearSave = function (storage) {
  try {
    var st = store(storage);
    if (st) st.removeItem(FM.SAVE_KEY);
  } catch (e) { /* rien à effacer */ }
};
