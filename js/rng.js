var FM = (globalThis.FM = globalThis.FM || {});

// Générateur pseudo-aléatoire mulberry32 : à graine, et reprenable depuis son état.
FM.createRng = function (seed, savedState) {
  var s = (savedState !== undefined ? savedState : seed) >>> 0;

  function next() {
    s = (s + 0x6d2b79f5) >>> 0;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return {
    next: next,
    int: function (min, max) { return min + Math.floor(next() * (max - min + 1)); },
    pick: function (arr) { return arr[Math.floor(next() * arr.length)]; },
    chance: function (p) { return next() < p; },
    state: function () { return s; }
  };
};
