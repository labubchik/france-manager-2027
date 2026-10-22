var FM = (globalThis.FM = globalThis.FM || {});

FM.ui = FM.ui || { screens: {} };

// Petit utilitaire de création d'éléments : h('div', { class: 'x', onclick: fn }, [enfants]).
FM.ui.h = function (tag, attrs, children) {
  var el = document.createElement(tag);
  Object.keys(attrs || {}).forEach(function (k) {
    var v = attrs[k];
    if (v === undefined || v === null || v === false) return;
    if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (k === 'style') el.setAttribute('style', v);
    else el.setAttribute(k, v === true ? '' : v);
  });
  [].concat(children === undefined ? [] : children).forEach(function (c) {
    if (c === null || c === undefined || c === false) return;
    el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  });
  return el;
};

FM.ui.cleanup = null;

FM.ui.show = function (name, params) {
  FM.ui.root = FM.ui.root || document.getElementById('app');
  if (FM.ui.cleanup) { FM.ui.cleanup(); FM.ui.cleanup = null; }
  FM.ui.root.innerHTML = '';
  FM.ui.root.className = 'screen screen-' + name;
  FM.ui.screens[name](FM.ui.root, params || {});
  window.scrollTo(0, 0);
};

FM.ui.formatMd = function (v) {
  return Math.round(v).toLocaleString('fr-FR') + ' Md€';
};
