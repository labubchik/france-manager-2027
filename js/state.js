var FM = (globalThis.FM = globalThis.FM || {});

// Point de départ réel : dette Insee fin juin 2026 (3 595,5 Md€, 119 % du PIB) extrapolée à mai 2027, Brent ~110 $.
FM.START = {
  dette: 3700, pib: 3085, baril: 110,
  popularite: 50, tension: 50, danger: 35, assemblee: 45, tvLeft: 5,
  wars: { golfe: 4, ukraine: 3, gaza: 3, liban: 2, taiwan: 1, soudan: 4, sahel: 2, pakafghan: 2 }
};

FM.GAUGES = ['popularite', 'tension', 'danger', 'assemblee'];

FM.clamp = function (v, min, max) { return Math.max(min, Math.min(max, v)); };

FM.createGame = function (opts) {
  var cand = FM.CANDIDATES.find(function (c) { return c.id === opts.candidateId; });
  if (!cand) throw new Error('Candidat inconnu : ' + opts.candidateId);
  var relations = {};
  Object.keys(FM.COUNTRIES).forEach(function (code) { relations[code] = FM.COUNTRIES[code].startRelation; });

  var state = {
    version: 1, seed: opts.seed, rngState: opts.seed >>> 0,
    candidateId: cand.id, camp: cand.camp,
    month: 0, cardInMonth: 0,
    dette: FM.START.dette, pib: FM.START.pib, baril: FM.START.baril,
    popularite: FM.START.popularite, tension: FM.START.tension, danger: FM.START.danger,
    assemblee: FM.START.assemblee,
    relations: relations,
    wars: Object.assign({}, FM.START.wars),
    cabinet: {}, usedMinisters: [],
    tvLeft: FM.START.tvLeft, lawFailStreak: 0,
    flags: {}, queue: [], recent: [], seen: {}, log: [],
    ending: null
  };

  FM.POSTS.forEach(function (post) {
    var id = opts.cabinet[post];
    var m = FM.MINISTERS.find(function (x) { return x.id === id; });
    if (!m || m.post !== post) throw new Error('Ministre invalide pour ' + post);
    state.cabinet[post] = { ministerId: id, loyalty: 60 };
    state.usedMinisters.push(id);
    state.assemblee += m.camp === cand.camp ? 3 : -2;
  });

  FM.applyEffects(state, cand.start || {});
  return state;
};

FM.applyEffects = function (state, fx) {
  var clamp = FM.clamp;
  if (!fx) return state;
  if (fx.dette) state.dette = Math.round((state.dette + fx.dette) * 10) / 10;
  FM.GAUGES.forEach(function (g) { if (fx[g]) state[g] = Math.round(clamp(state[g] + fx[g], 0, 100)); });
  if (fx.baril) state.baril = clamp(state.baril + fx.baril, 40, 200);
  if (fx.relations) Object.keys(fx.relations).forEach(function (c) {
    if (c in state.relations) state.relations[c] = clamp(state.relations[c] + fx.relations[c], -100, 100);
  });
  if (fx.wars) Object.keys(fx.wars).forEach(function (w) {
    if (w in state.wars) state.wars[w] = clamp(state.wars[w] + fx.wars[w], 0, 5);
  });
  if (fx.loyalty) Object.keys(fx.loyalty).forEach(function (p) {
    if (state.cabinet[p]) state.cabinet[p].loyalty = clamp(state.cabinet[p].loyalty + fx.loyalty[p], 0, 100);
  });
  return state;
};
