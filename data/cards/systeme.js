var FM = (globalThis.FM = globalThis.FM || {});

FM.CARDS.push(
  { id: 'monde-calme', family: 'monde', system: true, who: { name: 'Votre secrétaire', role: 'Élysée', portrait: '☕' },
    text: 'Journée calme, Monsieur le Président. C\'est suspect. Un café ?',
    choices: [{ label: 'Volontiers', effects: { tension: -1 } }, { label: 'Au travail !', effects: { popularite: 1 } }] }
);

// Point de non-retour nucléaire : toujours une dernière chance de désescalade. Ton sobre.
(function () {
  ['US', 'RU', 'CN', 'IL', 'GB', 'IN', 'PK', 'KP', 'IR'].forEach(function (code) {
    FM.CARDS.push({
      id: 'nucleaire-' + code, family: 'nucleaire', system: true, who: { leader: code },
      text: 'Ligne rouge. Les forces stratégiques sont en alerte maximale, et le monde retient son souffle. Votre réponse décidera de tout.',
      choices: [
        { label: 'Désescalade immédiate', effects: { popularite: -8, relations: (function () { var r = {}; r[code] = 40; return r; })(), danger: -10 } },
        { label: 'Médiation de l\'ONU', effects: { relations: (function () { var r = {}; r[code] = 25; return r; })(), danger: -5, dette: 2 } },
        { label: 'Tenir bon', ending: 'nucleaire' }
      ]
    });
  });
})();
