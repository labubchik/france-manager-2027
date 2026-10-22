var FM = (globalThis.FM = globalThis.FM || {});

(function () {
  var h = FM.ui.h;
  var CAMP_LABELS = {
    'extreme-gauche': 'Gauche radicale', gauche: 'Gauche', centre: 'Centre',
    droite: 'Droite', 'extreme-droite': 'Droite nationale'
  };
  FM.ui.CAMP_LABELS = CAMP_LABELS;

  FM.ui.screens.title = function (root) {
    var saved = FM.loadGame();
    root.appendChild(h('div', { class: 'title-wrap' }, [
      h('div', { class: 'tricolore' }, [h('span'), h('span'), h('span')]),
      h('h1', { class: 'logo' }, ['France ', h('em', {}, 'Manager'), ' 2027']),
      h('p', { class: 'tagline' }, 'Cinq ans à l\'Élysée. 3 700 milliards de dette. Une seule question : tiendrez-vous ?'),
      h('div', { class: 'menu' }, [
        h('button', { class: 'btn btn-primary', onclick: function () { FM.ui.show('candidate'); } }, 'Nouvelle partie'),
        saved && !saved.ending ? h('button', { class: 'btn', onclick: function () { FM.ui.show('play', { state: saved }); } },
          'Continuer (' + FM.dateLabel(saved.month) + ')') : null
      ]),
      h('p', { class: 'fineprint' }, 'Jeu satirique. Toute ressemblance avec des personnes existantes est totalement volontaire, mais les noms ont été massacrés.')
    ]));
  };

  FM.ui.screens.candidate = function (root) {
    root.appendChild(h('header', { class: 'setup-head' }, [
      h('p', { class: 'step' }, 'Étape 1 sur 3'),
      h('h2', {}, 'Qui êtes-vous ?'),
      h('p', { class: 'sub' }, 'Choisissez votre candidat. Chacun démarre avec ses forces et ses casseroles.')
    ]));
    root.appendChild(h('div', { class: 'grid' }, FM.CANDIDATES.map(function (c) {
      return h('button', { class: 'pick', onclick: function () { FM.ui.show('cabinet', { candidateId: c.id, cabinet: {}, index: 0 }); } }, [
        h('span', { class: 'pick-portrait' }, c.portrait),
        h('span', { class: 'pick-name' }, c.name),
        h('span', { class: 'pick-meta' }, c.party + ' · ' + CAMP_LABELS[c.camp]),
        h('span', { class: 'pick-plus' }, '＋ ' + c.bonus),
        h('span', { class: 'pick-minus' }, '－ ' + c.malus)
      ]);
    })));
  };

  FM.ui.screens.cabinet = function (root, p) {
    var post = FM.POSTS[p.index];
    var cand = FM.CANDIDATES.find(function (c) { return c.id === p.candidateId; });
    root.appendChild(h('header', { class: 'setup-head' }, [
      h('p', { class: 'step' }, 'Étape 2 sur 3 · Poste ' + (p.index + 1) + ' / ' + FM.POSTS.length),
      h('h2', {}, FM.POST_LABELS[post]),
      h('p', { class: 'sub' }, cand.name + ', qui nommez-vous ? Un ministre de votre camp renforce votre soutien à l\'Assemblée.')
    ]));
    var options = FM.MINISTERS.filter(function (m) { return m.post === post; });
    root.appendChild(h('div', { class: 'grid' }, options.map(function (m) {
      return h('button', { class: 'pick' + (m.camp === cand.camp ? ' same-camp' : ''), onclick: function () {
        var cabinet = Object.assign({}, p.cabinet); cabinet[post] = m.id;
        if (p.index + 1 < FM.POSTS.length) FM.ui.show('cabinet', { candidateId: p.candidateId, cabinet: cabinet, index: p.index + 1 });
        else FM.ui.show('briefing', { candidateId: p.candidateId, cabinet: cabinet });
      } }, [
        h('span', { class: 'pick-portrait' }, m.portrait),
        h('span', { class: 'pick-name' }, m.name),
        h('span', { class: 'pick-meta' }, m.party + ' · ' + CAMP_LABELS[m.camp]),
        h('span', { class: 'pick-trait' }, FM.TRAIT_LABELS[m.trait]),
        h('span', { class: 'pick-stars', 'aria-label': 'Compétence ' + m.competence + ' sur 5' }, '★'.repeat(m.competence) + '☆'.repeat(5 - m.competence))
      ]);
    })));
    if (p.index > 0) root.appendChild(h('button', { class: 'btn btn-ghost', onclick: function () {
      FM.ui.show('cabinet', { candidateId: p.candidateId, cabinet: p.cabinet, index: p.index - 1 });
    } }, '← Poste précédent'));
  };

  FM.ui.screens.briefing = function (root, p) {
    var seed = Math.floor(Math.random() * 2147483647);
    var state = FM.createGame({ candidateId: p.candidateId, cabinet: p.cabinet, seed: seed });
    var cand = FM.CANDIDATES.find(function (c) { return c.id === p.candidateId; });
    var facts = [
      ['💶', 'Dette publique', FM.ui.formatMd(state.dette) + ' · ' + FM.debtRatio(state).toLocaleString('fr-FR') + ' % du PIB (record historique)'],
      ['🛢️', 'Baril de Brent', state.baril + ' $ · le détroit d\'Ormuz est bloqué'],
      ['🌍', 'Golfe et Iran', 'Le conflit s\'éternise depuis le printemps 2026, la navigation est paralysée'],
      ['🇺🇦', 'Ukraine', 'La guerre continue, des négociations patinent'],
      ['🕊️', 'Gaza et Liban', 'Une trêve fragile, des frappes continuent au Liban'],
      ['🇸🇩', 'Soudan, Sahel', 'Guerres oubliées, déplacements massifs de population'],
      ['🔥', 'En France', 'Les émeutes d\'octobre 2026 (mairie de Limoges incendiée) ont laissé des traces'],
      ['🏛️', 'Votre majorité', 'Soutien à l\'Assemblée : ' + state.assemblee + ' / 100']
    ];
    root.appendChild(h('header', { class: 'setup-head' }, [
      h('p', { class: 'step' }, 'Étape 3 sur 3'),
      h('h2', {}, 'Situation au départ'),
      h('p', { class: 'sub' }, 'Mai 2027. ' + cand.name + ' vient d\'être élu·e. Voici l\'héritage.')
    ]));
    root.appendChild(h('ul', { class: 'facts' }, facts.map(function (f) {
      return h('li', {}, [h('span', { class: 'fact-icon' }, f[0]), h('span', {}, [h('b', {}, f[1]), h('br'), f[2]])]);
    })));
    root.appendChild(h('button', { class: 'btn btn-primary btn-wide', onclick: function () {
      FM.saveGame(state);
      FM.ui.show('play', { state: state });
    } }, 'Prendre ses fonctions'));
  };
})();
