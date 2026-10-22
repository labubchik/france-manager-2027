var FM = (globalThis.FM = globalThis.FM || {});

// Allocutions TV : étape 1, le ton (consomme une allocution) ; étape 2, l'annonce.
(function () {
  var TONES = function (next, extra) {
    return [
      { label: 'Ton ferme', tv: true, clearFlags: ['grande_loi'], effects: Object.assign({ tension: -6, popularite: -1 }, extra && extra.ferme), followups: [{ cardId: next, inCards: 0 }] },
      { label: 'Ton empathique', tv: true, clearFlags: ['grande_loi'], effects: Object.assign({ tension: -4, popularite: 3 }, extra && extra.empathique), followups: [{ cardId: next, inCards: 0 }] },
      { label: 'Ton solennel', tv: true, clearFlags: ['grande_loi'], effects: Object.assign({ tension: -5, popularite: 1, danger: -1 }, extra && extra.solennel), followups: [{ cardId: next, inCards: 0 }] }
    ];
  };
  var ME = { name: 'Vous', role: 'Allocution télévisée', portrait: '📺' };

  FM.CARDS.push(
    { id: 'tv-colere-sociale', family: 'tv', who: ME, when: { min: { tension: 70 } },
      text: 'Le pays gronde. Les chaînes attendent votre allocution de 20 h. Quel ton adoptez-vous ?',
      choices: TONES('tv-colere-sociale-2') },
    { id: 'tv-colere-sociale-2', family: 'tv', system: true, who: ME,
      text: '« Mes chers compatriotes, ce soir, j\'annonce… »',
      choices: [
        { label: 'Une prime pour tous', effects: { dette: 10, popularite: 6, tension: -10 } },
        { label: 'Un grand débat national', effects: { popularite: 2, tension: -6 } },
        { label: 'Que l\'ordre sera rétabli', effects: { tension: -4, popularite: -2, danger: -2 }, campMod: { droite: { popularite: 4 }, 'extreme-droite': { popularite: 5 } } }
      ] },

    { id: 'tv-grande-loi', family: 'tv', who: ME, when: { flags: ['grande_loi'] },
      text: 'Votre grande réforme divise le pays. Vous prenez la parole avant le vote. Quel ton ?',
      choices: TONES('tv-grande-loi-2') },
    { id: 'tv-grande-loi-2', family: 'tv', system: true, who: ME,
      text: '« Cette réforme, je la porterai jusqu\'au bout, parce que… »',
      choices: [
        { label: '« …c\'est juste »', effects: { popularite: 3, assemblee: 4 } },
        { label: '« …l\'Europe nous l\'impose »', effects: { popularite: -3, assemblee: 6, relations: { DE: 4 } } },
        { label: 'Annoncer un référendum', effects: { popularite: 5, assemblee: -4, tension: -3 } }
      ] },

    { id: 'tv-guerre-golfe', family: 'tv', who: ME, when: { war: { golfe: 4 }, min: { tension: 60 } },
      text: 'La guerre dans le Golfe fait flamber l\'essence et inquiète le pays. Vous parlez à la nation.',
      choices: TONES('tv-guerre-golfe-2', { solennel: { popularite: 3 } }) },
    { id: 'tv-guerre-golfe-2', family: 'tv', system: true, who: ME,
      text: '« Face à cette crise, la France… »',
      choices: [
        { label: '« …protégera vos portefeuilles »', effects: { dette: 8, popularite: 5, tension: -6 } },
        { label: '« …portera la paix »', effects: { popularite: 3, danger: -3 } },
        { label: '« …ne cédera pas »', effects: { popularite: 2, danger: 4, relations: { IR: -10, US: 5 } } }
      ] },

    { id: 'tv-scandale', family: 'tv', who: ME, when: { max: { popularite: 25 } },
      text: 'Votre popularité s\'effondre. Vos conseillers vous supplient de « reprendre la main » à la télé.',
      choices: TONES('tv-scandale-2', { empathique: { popularite: 5 } }) },
    { id: 'tv-scandale-2', family: 'tv', system: true, who: ME,
      text: '« J\'ai entendu votre colère. C\'est pourquoi… »',
      choices: [
        { label: 'Remanier le gouvernement', effects: { popularite: 5, assemblee: -3, loyalty: { premier: -20 } } },
        { label: 'Baisser les impôts', effects: { dette: 12, popularite: 7 } },
        { label: 'Faire son mea culpa', effects: { popularite: 4, tension: -3 } }
      ] },

    { id: 'tv-voeux', family: 'tv', who: ME, when: { minMonth: 7, max: { tension: 75 } }, once: true,
      text: '31 décembre, 20 h. Les traditionnels vœux du Président. Quel ton pour la nouvelle année ?',
      choices: TONES('tv-voeux-2', { empathique: { popularite: 4 } }) },
    { id: 'tv-voeux-2', family: 'tv', system: true, who: ME,
      text: '« Pour cette nouvelle année, je fais un vœu… »',
      choices: [
        { label: 'Le plein emploi', effects: { popularite: 2 } },
        { label: 'Le désendettement', effects: { popularite: -1, dette: -4 } },
        { label: 'La paix dans le monde', effects: { popularite: 2, danger: -1 } }
      ] },

    { id: 'tv-vie-chere', family: 'tv', who: ME, when: { min: { baril: 125 } },
      text: 'Le baril dépasse 125 $ et les prix flambent. Vous devez rassurer les Français.',
      choices: TONES('tv-vie-chere-2') },
    { id: 'tv-vie-chere-2', family: 'tv', system: true, who: ME,
      text: '« Contre la vie chère, j\'annonce ce soir… »',
      choices: [
        { label: 'Blocage des prix', effects: { dette: 6, popularite: 6, tension: -6 } },
        { label: 'Hausse des salaires', effects: { popularite: 4, tension: -4, assemblee: -2 } },
        { label: 'Des conseils d\'économie', effects: { popularite: -5, tension: 5 } }
      ] },

    { id: 'tv-insecurite', family: 'tv', who: ME, when: { min: { danger: 65 } },
      text: 'Menaces, ingérences, attaques : le pays a peur. Vous vous adressez à la nation.',
      choices: TONES('tv-insecurite-2', { ferme: { danger: -3 } }) },
    { id: 'tv-insecurite-2', family: 'tv', system: true, who: ME,
      text: '« Pour protéger les Français, je décide… »',
      choices: [
        { label: 'Vigipirate renforcé', effects: { danger: -6, dette: 2, tension: 2 } },
        { label: 'Une loi de programmation', effects: { danger: -4, dette: 5, popularite: 2 } },
        { label: 'L\'unité nationale', effects: { danger: -2, popularite: 3, tension: -3 } }
      ] }
  );
})();
