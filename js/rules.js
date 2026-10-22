var FM = (globalThis.FM = globalThis.FM || {});

// ~40 cartes pour un mandat de 60 mois.
FM.MONTHS_PER_CARD = 1.5;
FM.EFFECT_SCALE = 2.2;
FM.TERM_MONTHS = 60;
FM.FAILLITE_RATIO = 1.32;
FM.REVERSION = { tension: 0.04, popularite: 0.015, danger: 0.01 };
FM.DANGER_PER_HOSTILE = 0.6;

// Ce qui se passe tout seul quand un mois se termine.
FM.monthTick = function (state, rng) {
  state.pib = Math.round(state.pib * 1.0025 * 10) / 10;
  FM.applyEffects(state, { dette: 13 + (state.baril - 80) * 0.1 });
  // Le baril fluctue autour de 90 $, tiré vers le haut par la guerre du Golfe.
  FM.applyEffects(state, { baril: rng.int(-6, 6) + (state.wars.golfe - 2) * 1.5 + (90 - state.baril) * 0.1 });
  FM.applyEffects(state, { tension: Math.round((state.baril - 100) * 0.05) });
  // L'opinion oublie vite : les jauges reviennent doucement vers la normale.
  FM.applyEffects(state, {
    tension: Math.round((50 - state.tension) * FM.REVERSION.tension),
    popularite: Math.round((50 - state.popularite) * FM.REVERSION.popularite),
    danger: Math.round((30 - state.danger) * FM.REVERSION.danger)
  });
  // Chaque pays franchement hostile fait monter le risque d'« accident ».
  var hostile = Object.keys(state.relations).filter(function (c) { return state.relations[c] <= -60; }).length;
  FM.applyEffects(state, { danger: Math.round(hostile * FM.DANGER_PER_HOSTILE) });
  Object.keys(state.wars).forEach(function (w) {
    if (state.wars[w] > 0 && rng.chance(0.1)) {
      var fx = {}; fx[w] = rng.chance(0.5) ? 1 : -1;
      FM.applyEffects(state, { wars: fx });
    }
  });
  return state;
};

FM.debtRatio = function (state) {
  return Math.round((state.dette / state.pib) * 1000) / 10;
};

// Une seule fin à la fois, par ordre de priorité.
FM.checkEnding = function (state) {
  if (state.ending) return state.ending;
  if (state.danger >= 100) return 'accident';
  if (state.dette / state.pib >= FM.FAILLITE_RATIO) return 'faillite';
  if (state.tension >= 100) return 'emeutes';
  if (state.popularite <= 0) return 'destitution';
  if (state.month >= FM.TERM_MONTHS) return state.popularite >= 50 ? 'reelu' : 'victoire';
  return null;
};
