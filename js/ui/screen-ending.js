var FM = (globalThis.FM = globalThis.FM || {});

(function () {
  var h = FM.ui.h;

  FM.ui.screens.ending = function (root, p) {
    var s = p.state;
    var e = FM.ENDINGS[p.endingId];
    var cand = FM.CANDIDATES.find(function (c) { return c.id === s.candidateId; });
    var months = Math.min(Math.floor(s.month), FM.TERM_MONTHS);
    root.appendChild(h('div', { class: 'ending' }, [
      h('div', { class: 'ending-icon', 'aria-hidden': 'true' }, e.icon),
      h('p', { class: 'step' }, cand.name + ' · ' + FM.dateLabel(s.month)),
      h('h2', {}, e.title),
      h('p', {}, e.text),
      h('div', { class: 'ending-stats' }, [
        h('div', {}, [h('b', {}, months + ' mois'), 'tenus sur 60']),
        h('div', {}, [h('b', {}, FM.ui.formatMd(s.dette)), FM.debtRatio(s).toLocaleString('fr-FR') + ' % du PIB']),
        h('div', {}, [h('b', {}, s.popularite + ' / 100'), 'popularité']),
        h('div', {}, [h('b', {}, s.tension + ' / 100'), 'tension sociale'])
      ]),
      h('h3', {}, 'Vos derniers arbitrages'),
      h('ul', { class: 'ending-log' }, s.log.slice(-5).map(function (l) { return h('li', {}, l); })),
      h('button', { class: 'btn btn-primary btn-wide', onclick: function () { FM.ui.show('title'); } }, 'Rejouer')
    ]));
  };
})();
