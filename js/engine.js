var FM = (globalThis.FM = globalThis.FM || {});

// Guerres qui rendent chaque puissance nucléaire dangereuse.
FM.WAR_COUNTRIES = { RU: ['ukraine'], IR: ['golfe'], US: ['golfe'], IL: ['gaza', 'liban'], CN: ['taiwan'], PK: ['pakafghan'], KP: ['taiwan'] };

FM.MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// month 0 = mai 2027.
FM.dateLabel = function (month) {
  var m = 4 + month;
  return FM.MONTH_NAMES[m % 12] + ' ' + (2027 + Math.floor(m / 12));
};

function addEffects(a, b) {
  var out = JSON.parse(JSON.stringify(a || {}));
  Object.keys(b || {}).forEach(function (k) {
    if (typeof b[k] === 'object') {
      out[k] = out[k] || {};
      Object.keys(b[k]).forEach(function (kk) { out[k][kk] = (out[k][kk] || 0) + b[k][kk]; });
    } else {
      out[k] = (out[k] || 0) + b[k];
    }
  });
  return out;
}

function scaleByCompetence(fx, minister) {
  if (!minister) return fx;
  var f = 0.8 + 0.1 * minister.competence;
  if (fx.popularite > 0) fx.popularite = Math.round(fx.popularite * f);
  if (fx.tension < 0) fx.tension = Math.round(fx.tension * f);
  if (fx.danger < 0) fx.danger = Math.round(fx.danger * f);
  return fx;
}

function resolvePost(post, state) {
  return post === '$betrayal' ? state.betrayalPost : post;
}

function availableReplacements(post, state) {
  return FM.MINISTERS.filter(function (m) { return m.post === post && state.usedMinisters.indexOf(m.id) === -1; });
}

function nuclearCountries(state) {
  return Object.keys(FM.COUNTRIES).filter(function (code) {
    return FM.COUNTRIES[code].nuclear || (code === 'IR' && state.flags.iran_bombe);
  });
}

function scheduleSystemCards(state) {
  FM.POSTS.forEach(function (post) {
    var flag = 'trahison_' + post;
    if (state.cabinet[post].loyalty <= 0 && !state.flags[flag] && !state.betrayalPending) {
      state.flags[flag] = true;
      state.betrayalPost = post;
      state.betrayalPending = true;
      state.queue.push({ cardId: 'ministre-trahison', inCards: 0 });
      FM.applyEffects(state, { danger: 10 });
    }
  });
  nuclearCountries(state).forEach(function (code) {
    var flag = 'nonretour_' + code;
    var wars = FM.WAR_COUNTRIES[code] || [];
    var hot = wars.some(function (w) { return state.wars[w] >= 3; });
    if (state.relations[code] <= -90 && hot && !state.flags[flag]) {
      state.flags[flag] = true;
      state.queue.push({ cardId: 'nucleaire-' + code, inCards: 0 });
    }
  });
}

FM.resolveChoice = function (state, card, choiceIndex, rng) {
  var choice = card.choices[choiceIndex];
  var texts = [];

  var fx = addEffects(choice.effects, choice.campMod && choice.campMod[state.camp]);
  if (card.post) scaleByCompetence(fx, FM.ministerAt(state, card.post));
  FM.applyEffects(state, fx);

  if (choice.use493) {
    FM.applyEffects(state, { popularite: -8, tension: 6, assemblee: -5 });
    FM.applyEffects(state, choice.vote && choice.vote.onPass);
    state.lawFailStreak = 0;
    texts.push('Loi adoptée (49.3)');
  } else if (choice.vote) {
    if (state.assemblee + rng.int(-10, 10) >= choice.vote.difficulty) {
      FM.applyEffects(state, choice.vote.onPass);
      state.lawFailStreak = 0;
      texts.push('Loi adoptée');
    } else {
      FM.applyEffects(state, choice.vote.onFail);
      state.lawFailStreak++;
      if (state.lawFailStreak >= 3) FM.applyEffects(state, { popularite: -5 });
      texts.push('Loi rejetée');
    }
  }

  if (choice.fire) {
    var post = resolvePost(choice.fire, state);
    var pool = availableReplacements(post, state);
    if (pool.length) {
      var old = FM.ministerAt(state, post);
      var next = rng.pick(pool);
      state.cabinet[post] = { ministerId: next.id, loyalty: 60 };
      state.usedMinisters.push(next.id);
      delete state.flags['trahison_' + post];
      texts.push(old.name + ' est remplacé·e par ' + next.name);
    }
  }

  if (choice.tv) state.tvLeft--;
  if (card.id === 'ministre-trahison') state.betrayalPending = false;

  (choice.setFlags || []).forEach(function (f) { state.flags[f] = true; });
  (choice.clearFlags || []).forEach(function (f) { delete state.flags[f]; });

  state.queue.forEach(function (q) { q.inCards--; });
  (choice.followups || []).forEach(function (f) { state.queue.push({ cardId: f.cardId, inCards: f.inCards }); });

  if (choice.ending) state.ending = choice.ending;

  if (!card.system) {
    state.recent.push(card.id);
    if (state.recent.length > FM.RECENT_SIZE) state.recent.shift();
  }
  state.seen[card.id] = (state.seen[card.id] || 0) + 1;
  state.log.push(FM.dateLabel(state.month) + ' : ' + FM.renderWho(card, state).name + ' → ' + choice.label);
  if (state.log.length > 20) state.log.shift();

  state.cardInMonth++;
  if (state.cardInMonth >= FM.CARDS_PER_MONTH) {
    state.cardInMonth = 0;
    state.month++;
    FM.monthTick(state, rng);
  }

  scheduleSystemCards(state);
  state.rngState = rng.state();

  return { state: state, outcome: { text: texts.join(' · ') || null, ending: FM.checkEnding(state) } };
};

FM.visibleChoices = function (card, state) {
  return card.choices
    .map(function (choice, index) { return { choice: choice, index: index }; })
    .filter(function (v) {
      if (v.choice.fire && !availableReplacements(resolvePost(v.choice.fire, state), state).length) return false;
      if (v.choice.tv && state.tvLeft <= 0) return false;
      return true;
    });
};

// Aperçu à la Reigns : quelles jauges bougent, et à quel point, sans dire dans quel sens.
FM.affectedGauges = function (choice) {
  var fx = addEffects(choice.effects, choice.use493 ? { popularite: -8, tension: 6 } : {});
  var size = function (v, big) { v = Math.abs(v || 0); return v === 0 ? 0 : (v < big ? 1 : 2); };
  return {
    dette: size(fx.dette, 20),
    popularite: size(fx.popularite, 8),
    tension: size(fx.tension, 8),
    danger: size(fx.danger, 8)
  };
};

FM.renderWho = function (card, state) {
  var who = card.who || {};
  if (who.leader) {
    var c = FM.COUNTRIES[who.leader];
    return { name: c.leader, role: c.flag + ' ' + c.name, portrait: c.flag };
  }
  if (who.minister) {
    var post = resolvePost(who.minister, state);
    var m = FM.ministerAt(state, post);
    return { name: m.name, role: 'Ministre · ' + FM.POST_LABELS[post], portrait: m.portrait };
  }
  return { name: who.name, role: who.role, portrait: who.portrait };
};
