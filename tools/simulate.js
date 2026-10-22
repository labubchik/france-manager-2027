// Simule des parties jouées au hasard pour équilibrer les chiffres.
// Usage : node tools/simulate.js [nombre de parties]
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function loadGame() {
  delete globalThis.FM;
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.startsWith('js/ui/'));
  for (const s of scripts) {
    const abs = path.join(ROOT, s);
    delete require.cache[require.resolve(abs)];
    require(abs);
  }
  return globalThis.FM;
}

function playOne(FM, seed) {
  const rng = FM.createRng(seed);
  const cand = rng.pick(FM.CANDIDATES);
  const cabinet = {};
  for (const post of FM.POSTS) cabinet[post] = rng.pick(FM.MINISTERS.filter(m => m.post === post)).id;
  const state = FM.createGame({ candidateId: cand.id, cabinet, seed });
  let cards = 0;
  for (;;) {
    const card = FM.drawCard(state, rng);
    const visible = FM.visibleChoices(card, state);
    const { outcome } = FM.resolveChoice(state, card, rng.pick(visible).index, rng);
    cards++;
    if (outcome.ending) return { ending: outcome.ending, cards, month: state.month, ratio: FM.debtRatio(state) };
    if (cards > 1000) throw new Error('partie sans fin');
  }
}

function simulate(n, baseSeed) {
  const FM = loadGame();
  const endings = {};
  const lengths = [];
  for (let i = 0; i < n; i++) {
    const r = playOne(FM, (baseSeed || 1000) + i);
    endings[r.ending] = (endings[r.ending] || 0) + 1;
    lengths.push(r.cards);
  }
  lengths.sort((a, b) => a - b);
  return { n, endings, medianCards: lengths[Math.floor(n / 2)] };
}

module.exports = { simulate };

if (require.main === module) {
  const n = Number(process.argv[2]) || 1000;
  const r = simulate(n);
  console.log('Parties :', r.n, '· médiane de cartes jouées :', r.medianCards, '(' + Math.round(r.medianCards / 3) + ' mois)');
  for (const [k, v] of Object.entries(r.endings).sort((a, b) => b[1] - a[1])) {
    console.log('  ' + k.padEnd(12) + String(v).padStart(5) + '  ' + (100 * v / n).toFixed(1) + ' %');
  }
}
