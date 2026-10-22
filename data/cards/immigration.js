var FM = (globalThis.FM = globalThis.FM || {});

// Immigration : des vagues dont la taille suit les guerres en cours. Effets différents selon le camp.
(function () {
  var CHOICES = function (scale) {
    return [
      { label: 'Accueillir', effects: { dette: 1 * scale, tension: 3 * scale }, campMod: { gauche: { popularite: 3 }, 'extreme-gauche': { popularite: 4 }, droite: { popularite: -5 }, 'extreme-droite': { popularite: -10 } } },
      { label: 'Fermer les frontières', effects: { tension: 2, relations: { IT: -6, DE: -4 } }, campMod: { 'extreme-droite': { popularite: 6 }, droite: { popularite: 3 }, gauche: { popularite: -6 }, 'extreme-gauche': { popularite: -8 } } },
      { label: 'Accord européen', effects: { dette: 0.5 * scale, tension: 1, relations: { IT: 6, DE: 4 } }, campMod: { centre: { popularite: 2 } } }
    ];
  };

  FM.CARDS.push(
    { id: 'immigration-lampedusa', family: 'immigration', who: { leader: 'IT' },
      text: '« 8 000 migrants sont arrivés à Lampedusa en trois jours. Beaucoup veulent rejoindre la France. »',
      choices: CHOICES(1) },
    { id: 'immigration-lampedusa-soudan', family: 'immigration', who: { leader: 'IT' },
      when: { war: { soudan: 4 } },
      text: '« La guerre au Soudan jette des familles entières sur la mer : 25 000 arrivées ce mois-ci. »',
      choices: CHOICES(2) },
    { id: 'immigration-manche', family: 'immigration', post: 'interieur', who: { minister: 'interieur' },
      text: 'Sur les plages du Nord, 3 000 personnes attendent de traverser la Manche en small boat.',
      choices: [
        { label: 'Démanteler les camps', effects: { tension: 3, relations: { GB: 6 } }, campMod: { gauche: { popularite: -5 }, droite: { popularite: 3 } } },
        { label: 'Centres d\'accueil', effects: { dette: 1, tension: 1 }, campMod: { 'extreme-droite': { popularite: -6 }, gauche: { popularite: 2 } } },
        { label: 'Exiger que Londres paie', effects: { relations: { GB: -6 }, dette: -0.5 } }
      ] },
  { id: 'immigration-golfe', family: 'immigration', who: { name: 'Le Haut-Commissaire aux réfugiés', role: 'ONU', portrait: '🇺🇳' },
      when: { war: { golfe: 4 } },
      text: 'La guerre du Golfe a déplacé 2 millions de personnes. L\'ONU demande à la France d\'accueillir 30 000 réfugiés.',
      choices: [
        { label: 'Accueillir 30 000', effects: { dette: 2, tension: 4 }, campMod: { gauche: { popularite: 4 }, 'extreme-droite': { popularite: -8 }, droite: { popularite: -4 } } },
        { label: 'Accueillir 5 000', effects: { dette: 0.5, tension: 1 } },
        { label: 'Financer des camps sur place', effects: { dette: 1.5 }, campMod: { droite: { popularite: 2 } } }
      ] },
    { id: 'immigration-tunisie', family: 'immigration', post: 'interieur', who: { minister: 'interieur' },
      text: 'On peut payer la Tunisie 1 milliard pour qu\'elle retienne les départs. Comme l\'a fait l\'Italie.',
      choices: [
        { label: 'Payer un pays tiers', effects: { dette: 1, tension: -2 }, campMod: { gauche: { popularite: -5 }, droite: { popularite: 3 } } },
        { label: 'Refuser', effects: { tension: 2 }, campMod: { 'extreme-droite': { popularite: -4 } } }
      ] },
    { id: 'immigration-regularisation', family: 'immigration', post: 'travail', who: { minister: 'travail' },
      text: 'Les restaurants et le BTP manquent de bras. Je propose de régulariser les travailleurs sans papiers.',
      choices: [
        { label: 'Régulariser', effects: { dette: -2, tension: 2 }, campMod: { gauche: { popularite: 4 }, 'extreme-droite': { popularite: -8 }, droite: { popularite: -5 } } },
        { label: 'Refuser', effects: { loyalty: { travail: -6 } }, campMod: { gauche: { popularite: -3 } } }
      ] },
    { id: 'immigration-mayotte', family: 'immigration', who: { name: 'Une élue de Mayotte', role: 'Députée de Mayotte', portrait: '🏝️' },
      text: 'Mayotte étouffe : les arrivées depuis les Comores dépassent tout. L\'île réclame l\'aide de l\'État.',
      choices: [
        { label: 'Opération de sécurisation', effects: { dette: 1, tension: 2 }, campMod: { droite: { popularite: 3 } } },
        { label: 'Plan de développement', effects: { dette: 2, popularite: 1 } },
        { label: 'Fin du droit du sol local', effects: { tension: 3 }, campMod: { gauche: { popularite: -6 }, 'extreme-droite': { popularite: 5 } } }
      ] },
    { id: 'immigration-sahel', family: 'immigration', who: { leader: 'IT' },
      when: { war: { sahel: 3 } },
      text: '« Avec le chaos au Sahel, les routes migratoires explosent : 15 000 personnes arrivent en Sicile. »',
      choices: CHOICES(1.5) },
    { id: 'immigration-ukraine', family: 'immigration', who: { leader: 'UA' },
      when: { war: { ukraine: 4 } },
      text: '« Une nouvelle offensive pousse 500 000 Ukrainiens vers l\'ouest. L\'Europe doit les accueillir. »',
      choices: [
        { label: 'Protection temporaire', effects: { dette: 2, relations: { UA: 10 } }, campMod: { 'extreme-droite': { popularite: -3 } } },
        { label: 'Quotas limités', effects: { relations: { UA: -5 } } }
      ] },
    { id: 'immigration-oqtf', family: 'immigration', post: 'interieur', who: { minister: 'interieur' },
      when: { trait: 'cogneur' },
      text: 'Un fait divers impliquant un étranger sous obligation de quitter le territoire enflamme le pays.',
      choices: [
        { label: 'Rétention prolongée', effects: { tension: 2, popularite: 2 }, campMod: { gauche: { popularite: -6 } } },
        { label: 'Ne pas instrumentaliser', effects: { popularite: -3, tension: 3 }, campMod: { droite: { popularite: -4 } } }
      ] }
  );
})();
