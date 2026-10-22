var FM = (globalThis.FM = globalThis.FM || {});

(function () {
  var h = FM.ui.h;
  var SWIPE_THRESHOLD = 90;

  var GAUGES = [
    { key: 'dette', icon: '💶', label: 'Dette' },
    { key: 'popularite', icon: '❤️', label: 'Popularité' },
    { key: 'tension', icon: '🔥', label: 'Tension' },
    { key: 'danger', icon: '🎯', label: 'Danger' }
  ];

  // Part de la barre remplie (0..1) et couleur selon la proximité d'une fin.
  function gaugeView(state, key) {
    if (key === 'dette') {
      var r = FM.debtRatio(state);
      var f = FM.clamp((r - 100) / 32, 0, 1);
      return { fill: f, value: FM.ui.formatMd(state.dette) + ' · ' + r.toLocaleString('fr-FR') + ' %', risk: f };
    }
    var v = state[key];
    var risk = key === 'popularite' ? 1 - v / 100 : v / 100;
    return { fill: v / 100, value: v + ' / 100', risk: risk };
  }

  function riskColor(risk) {
    if (risk > 0.8) return 'var(--danger)';
    if (risk > 0.6) return 'var(--warn)';
    return 'var(--good)';
  }

  FM.ui.screens.play = function (root, p) {
    var state = p.state;
    var rng = FM.createRng(state.seed, state.rngState);
    var refs = {};
    var ctrl = FM.createController(state, rng, {
      onChange: function (s, card, outcome) {
        if (outcome.text) toast(outcome.text);
        setTimeout(function () { render(); ctrl.unlock(); }, 260);
      },
      onEnding: function (s, endingId) {
        setTimeout(function () { FM.ui.show('ending', { state: s, endingId: endingId }); }, 350);
      }
    });

    var hud = h('div', { class: 'hud' }, GAUGES.map(function (g) {
      var bar = h('i');
      var dot = h('span', { class: 'dot' });
      var value = h('div', { class: 'gauge-value' });
      var el = h('div', { class: 'gauge', title: g.label }, [
        h('div', { class: 'gauge-icon', 'aria-hidden': 'true' }, g.icon),
        h('div', { class: 'gauge-label' }, g.label),
        value, h('div', { class: 'bar' }, bar), dot
      ]);
      refs[g.key] = { el: el, bar: bar, dot: dot, value: value, last: null };
      return el;
    }));

    var dateEl = h('b');
    var barilEl = h('span');
    var status = h('div', { class: 'status' }, [
      h('span', {}, ['📅 ', dateEl]),
      barilEl,
      h('button', { class: 'icon-btn', onclick: openPanel, 'aria-label': 'Ouvrir le tableau de bord' }, '☰ État')
    ]);
    var stage = h('div', { class: 'stage' });
    var toastEl = h('div', { class: 'toast', role: 'status' });

    root.appendChild(hud);
    root.appendChild(status);
    root.appendChild(stage);
    root.appendChild(toastEl);

    function toast(text) {
      toastEl.textContent = text;
      toastEl.classList.add('show');
      clearTimeout(toast.t);
      toast.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
    }

    function showPreview(choice) {
      var g = choice ? FM.affectedGauges(choice) : {};
      GAUGES.forEach(function (gg) { refs[gg.key].dot.className = 'dot' + (g[gg.key] ? ' s' + g[gg.key] : ''); });
    }

    function renderHud() {
      GAUGES.forEach(function (g) {
        var v = gaugeView(state, g.key);
        var r = refs[g.key];
        r.bar.style.width = Math.round(v.fill * 100) + '%';
        r.bar.style.background = riskColor(v.risk);
        r.value.textContent = v.value;
        var raw = g.key === 'dette' ? Math.round(state.dette) : state[g.key];
        if (r.last !== null && r.last !== raw) {
          r.el.classList.remove('bump'); void r.el.offsetWidth; r.el.classList.add('bump');
        }
        r.last = raw;
      });
      dateEl.textContent = FM.dateLabel(state.month);
      barilEl.textContent = '🛢️ ' + Math.round(state.baril) + ' $';
    }

    function render() {
      renderHud();
      showPreview(null);
      stage.innerHTML = '';
      var card = ctrl.current();
      var who = FM.renderWho(card, state);
      var visible = FM.visibleChoices(card, state);
      var swipeable = visible.length === 2;

      var hintL = h('div', { class: 'card-hint left' }, swipeable ? visible[0].choice.label : '');
      var hintR = h('div', { class: 'card-hint right' }, swipeable ? visible[1].choice.label : '');
      var cardEl = h('article', { class: 'card enter family-' + card.family }, [
        h('div', { class: 'card-top' }, [
          h('div', { class: 'card-portrait', 'aria-hidden': 'true' }, who.portrait),
          h('div', { class: 'card-name' }, who.name),
          h('div', { class: 'card-role' }, who.role)
        ]),
        h('p', { class: 'card-text' }, card.text),
        hintL, hintR
      ]);

      var choicesEl = h('div', { class: 'choices' + (visible.length === 3 ? ' three' : '') }, visible.map(function (v, i) {
        var keys = swipeable ? (i === 0 ? '←' : '→') : String(i + 1);
        return h('button', {
          class: 'choice',
          onclick: function () { pick(v.index, i === 0 ? -1 : 1); },
          onmouseenter: function () { showPreview(v.choice); },
          onmouseleave: function () { showPreview(null); },
          onfocus: function () { showPreview(v.choice); },
          onblur: function () { showPreview(null); }
        }, [h('kbd', {}, keys), v.choice.label]);
      }));

      stage.appendChild(cardEl);
      stage.appendChild(choicesEl);
      stage.appendChild(h('p', { class: 'keyhint' }, swipeable
        ? 'Glissez la carte, ou utilisez ← → au clavier'
        : 'Touches 1, 2, 3 au clavier'));

      refs.card = cardEl;
      refs.visible = visible;
      if (swipeable) enableSwipe(cardEl, hintL, hintR, visible);
    }

    function pick(index, dir) {
      var cardEl = refs.card;
      if (!ctrl.choose(index)) return;
      if (cardEl) {
        cardEl.style.transform = 'translateX(' + (dir * 140) + '%) rotate(' + (dir * 18) + 'deg)';
        cardEl.style.opacity = '0';
      }
      renderHud();
    }

    function enableSwipe(cardEl, hintL, hintR, visible) {
      var startX = null, dx = 0;
      cardEl.addEventListener('pointerdown', function (e) {
        startX = e.clientX; dx = 0;
        cardEl.classList.add('dragging');
        cardEl.setPointerCapture(e.pointerId);
      });
      cardEl.addEventListener('pointermove', function (e) {
        if (startX === null) return;
        dx = e.clientX - startX;
        cardEl.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 18) + 'deg)';
        var side = dx < -20 ? 0 : dx > 20 ? 1 : -1;
        hintL.style.opacity = side === 0 ? Math.min(1, -dx / SWIPE_THRESHOLD) : 0;
        hintR.style.opacity = side === 1 ? Math.min(1, dx / SWIPE_THRESHOLD) : 0;
        showPreview(side === -1 ? null : visible[side].choice);
      });
      function end() {
        if (startX === null) return;
        startX = null;
        cardEl.classList.remove('dragging');
        if (Math.abs(dx) >= SWIPE_THRESHOLD) {
          pick(visible[dx < 0 ? 0 : 1].index, dx < 0 ? -1 : 1);
        } else {
          cardEl.style.transform = '';
          hintL.style.opacity = 0; hintR.style.opacity = 0;
          showPreview(null);
        }
      }
      cardEl.addEventListener('pointerup', end);
      cardEl.addEventListener('pointercancel', end);
    }

    function onKey(e) {
      if (document.querySelector('.panel-backdrop')) {
        if (e.key === 'Escape') closePanel();
        return;
      }
      var visible = refs.visible || [];
      var i = FM.keyToChoice(e, visible.length);
      if (i >= 0) { e.preventDefault(); pick(visible[i].index, i === 0 ? -1 : 1); }
    }
    document.addEventListener('keydown', onKey);
    FM.ui.cleanup = function () { document.removeEventListener('keydown', onKey); closePanel(); };

    function closePanel() {
      var bd = document.querySelector('.panel-backdrop');
      if (bd) bd.remove();
    }

    function openPanel() {
      var rows = function (items) { return items.map(function (x) { return h('div', { class: 'panel-row' }, x); }); };
      var cabinet = FM.POSTS.map(function (post) {
        var m = FM.ministerAt(state, post);
        var loy = state.cabinet[post].loyalty;
        return [
          h('span', { 'aria-hidden': 'true' }, m.portrait),
          h('div', { class: 'grow' }, [m.name, h('small', {}, FM.POST_LABELS[post] + ' · ' + m.party + ' · ' + FM.TRAIT_LABELS[m.trait])]),
          h('div', { class: 'mini-bar', title: 'Loyauté ' + loy }, h('i', { style: 'width:' + loy + '%;background:' + riskColor(1 - loy / 100) }))
        ];
      });
      var relations = Object.keys(FM.COUNTRIES).map(function (code) {
        var c = FM.COUNTRIES[code], v = state.relations[code];
        return [
          h('span', { 'aria-hidden': 'true' }, c.flag),
          h('div', { class: 'grow' }, [c.name, h('small', {}, c.leader)]),
          h('span', { class: 'rel', style: 'color:' + (v < -50 ? 'var(--danger)' : v > 30 ? 'var(--good)' : 'var(--ink-soft)') }, (v > 0 ? '+' : '') + v)
        ];
      });
      var WAR_LABELS = { golfe: 'Golfe / Iran', ukraine: 'Ukraine', gaza: 'Gaza', liban: 'Liban', taiwan: 'Taïwan', soudan: 'Soudan', sahel: 'Sahel', pakafghan: 'Pakistan-Afghanistan' };
      var wars = Object.keys(state.wars).map(function (w) {
        return [h('div', { class: 'grow' }, WAR_LABELS[w]), h('span', {}, '■'.repeat(state.wars[w]) + '□'.repeat(5 - state.wars[w]))];
      });
      var panel = h('aside', { class: 'panel', role: 'dialog', 'aria-label': 'Tableau de bord' }, [
        h('button', { class: 'icon-btn', onclick: closePanel }, '✕ Fermer'),
        h('h3', {}, '🏛️ Assemblée et Élysée'),
        h('div', {}, rows([
          [h('div', { class: 'grow' }, 'Soutien à l\'Assemblée'), h('b', {}, state.assemblee + ' / 100')],
          [h('div', { class: 'grow' }, 'Allocutions TV restantes'), h('b', {}, String(state.tvLeft))],
          [h('div', { class: 'grow' }, 'Dette / PIB'), h('b', {}, FM.debtRatio(state).toLocaleString('fr-FR') + ' %')]
        ])),
        h('h3', {}, '👔 Gouvernement (loyauté)'), h('div', {}, rows(cabinet)),
        h('h3', {}, '🌍 Relations internationales'), h('div', {}, rows(relations)),
        h('h3', {}, '⚔️ Conflits dans le monde'), h('div', {}, rows(wars))
      ]);
      var backdrop = h('div', { class: 'panel-backdrop', onclick: function (e) { if (e.target === backdrop) closePanel(); } }, panel);
      document.body.appendChild(backdrop);
    }

    render();
  };
})();
