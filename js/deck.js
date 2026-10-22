var FM = (globalThis.FM = globalThis.FM || {});

// Chaque fichier data/cards/*.js ajoute ses cartes ici.
FM.CARDS = FM.CARDS || [];
FM.RECENT_SIZE = 30;

FM.cardById = function (id) {
  return FM.CARDS.find(function (c) { return c.id === id; });
};

FM.ministerAt = function (state, post) {
  var slot = state.cabinet[post];
  return slot && FM.MINISTERS.find(function (m) { return m.id === slot.ministerId; });
};

function stateValue(state, key) {
  if (key === 'dette') return FM.debtRatio ? FM.debtRatio(state) : state.dette;
  return state[key];
}

// Conditions d'un bloc `when` (sans `once` ni anti-répétition).
function matches(w, state) {
  if (!w) return true;
  if (w.minMonth !== undefined && state.month < w.minMonth) return false;
  if (w.maxMonth !== undefined && state.month > w.maxMonth) return false;
  if (w.flags && !w.flags.every(function (f) { return state.flags[f]; })) return false;
  if (w.notFlags && w.notFlags.some(function (f) { return state.flags[f]; })) return false;
  if (w.candidate && w.candidate !== state.candidateId) return false;
  if (w.camp && w.camp.indexOf(state.camp) === -1) return false;
  if (w.tvLeft && state.tvLeft <= 0) return false;
  if (w.war && Object.keys(w.war).some(function (k) { return state.wars[k] < w.war[k]; })) return false;
  if (w.min && Object.keys(w.min).some(function (k) { return stateValue(state, k) < w.min[k]; })) return false;
  if (w.max && Object.keys(w.max).some(function (k) { return stateValue(state, k) > w.max[k]; })) return false;
  if (w.relationBelow && Object.keys(w.relationBelow).some(function (k) { return state.relations[k] > w.relationBelow[k]; })) return false;
  if (w.relationAbove && Object.keys(w.relationAbove).some(function (k) { return state.relations[k] < w.relationAbove[k]; })) return false;
  if (w.any && !w.any.some(function (sub) { return matches(sub, state); })) return false;
  return true;
}

FM.isEligible = function (card, state, ignoreRecent) {
  if (card.system) return false;
  if (card.once && state.seen[card.id]) return false;
  if (!ignoreRecent && state.recent.indexOf(card.id) !== -1) return false;
  if (card.choices.some(function (ch) { return ch.tv; }) && state.tvLeft <= 0) return false;
  return matches(card.when, state);
};

FM.cardWeight = function (card, state) {
  var w = card.weight !== undefined ? card.weight : 1;
  if (card.when && card.when.trait && card.post) {
    var m = FM.ministerAt(state, card.post);
    if (m && m.trait === card.when.trait) w *= 3;
  }
  if ((card.family === 'guerre' || card.family === 'immigration')) {
    var total = Object.keys(state.wars).reduce(function (s, k) { return s + state.wars[k]; }, 0);
    if (total >= 15) w *= 2;
  }
  return w;
};

function weightedPick(cards, state, rng) {
  var weights = cards.map(function (c) { return FM.cardWeight(c, state); });
  var total = weights.reduce(function (a, b) { return a + b; }, 0);
  var r = rng.next() * total;
  for (var i = 0; i < cards.length; i++) {
    r -= weights[i];
    if (r < 0) return cards[i];
  }
  return cards[cards.length - 1];
}

FM.drawCard = function (state, rng) {
  var due = state.queue.findIndex(function (q) { return q.inCards <= 0; });
  if (due !== -1) {
    var queued = FM.cardById(state.queue[due].cardId);
    state.queue.splice(due, 1);
    if (queued) return queued;
  }
  var pool = FM.CARDS.filter(function (c) { return FM.isEligible(c, state); });
  if (!pool.length) pool = FM.CARDS.filter(function (c) { return FM.isEligible(c, state, true); });
  if (!pool.length) return FM.cardById('monde-calme');
  return weightedPick(pool, state, rng);
};
