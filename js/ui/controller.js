var FM = (globalThis.FM = globalThis.FM || {});

// Fait le lien entre l'écran de jeu et le moteur. Le verrou empêche qu'un double clic résolve deux choix.
FM.createController = function (state, rng, hooks) {
  var locked = false;
  var card = (state.currentCardId && FM.cardById(state.currentCardId)) || FM.drawCard(state, rng);
  state.currentCardId = card.id;

  return {
    current: function () { return card; },
    unlock: function () { locked = false; },
    choose: function (index) {
      if (locked || state.ending) return false;
      locked = true;
      var result = FM.resolveChoice(state, card, index, rng);
      if (result.outcome.ending) {
        state.ending = result.outcome.ending;
        FM.clearSave();
        hooks.onEnding(state, result.outcome.ending);
        return true;
      }
      card = FM.drawCard(state, rng);
      state.currentCardId = card.id;
      state.rngState = rng.state();
      FM.saveGame(state);
      hooks.onChange(state, card, result.outcome);
      return true;
    }
  };
};
