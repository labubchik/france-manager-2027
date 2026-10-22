var FM = (globalThis.FM = globalThis.FM || {});

// Lois : on porte (vote incertain), on passe en force (49.3) ou on enterre.
FM.CARDS.push(
  { id: 'lois-superprofits', family: 'lois', post: 'economie', who: { minister: 'economie' }, when: { ministerCamp: ['extreme-gauche', 'gauche', 'centre', 'extreme-droite'] },
    text: 'Je propose une taxe exceptionnelle sur les superprofits des pétroliers et des banques.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 50, onPass: { dette: -10, popularite: 5 }, onFail: { popularite: -2 } } },
      { label: '49.3', use493: true, vote: { onPass: { dette: -10, popularite: 5 } } },
      { label: 'Enterrer', effects: { loyalty: { economie: -8 } } }
    ] },
  { id: 'lois-immigration', family: 'lois', post: 'interieur', who: { minister: 'interieur' }, when: { ministerCamp: ['centre', 'droite', 'extreme-droite'] },
    text: 'Ma loi immigration : quotas, fin de l\'aide médicale d\'État, expulsions accélérées.',
    choices: [
      { label: 'Porter la loi', setFlags: ['grande_loi'], vote: { difficulty: 55, onPass: { popularite: 3, tension: 4 }, onFail: { popularite: -3 } },
        campMod: { gauche: { popularite: -6 }, 'extreme-gauche': { popularite: -8 } } },
      { label: '49.3', use493: true, vote: { onPass: { popularite: 2, tension: 5 } } },
      { label: 'Enterrer', effects: { loyalty: { interieur: -12 } }, campMod: { 'extreme-droite': { popularite: -6 } } }
    ] },
  { id: 'lois-budget', family: 'lois', post: 'premier', who: { minister: 'premier' },
    when: { minMonth: 5 },
    text: 'Le budget de l\'an prochain doit passer. Sans majorité, c\'est la censure assurée.',
    choices: [
      { label: 'Négocier article par article', vote: { difficulty: 45, onPass: { dette: -5, popularite: 1 }, onFail: { dette: 10, popularite: -4 } } },
      { label: '49.3', use493: true, vote: { onPass: { dette: -5 } } },
      { label: 'Budget de rigueur', effects: { dette: -15, tension: 10, popularite: -6, assemblee: -5 } }
    ] },
  { id: 'lois-proportionnelle', family: 'lois', who: { name: 'François Bayrouille', role: 'Président du MoDem', portrait: '🐴' },
    text: 'La proportionnelle aux législatives, je la demande depuis 1987. C\'est maintenant ou jamais.',
    choices: [
      { label: 'Porter la loi', setFlags: ['grande_loi'], vote: { difficulty: 50, onPass: { assemblee: -5, popularite: 4 }, onFail: { popularite: -2 } } },
      { label: 'Enterrer', effects: { assemblee: -3 } }
    ] },
  { id: 'lois-smic', family: 'lois', post: 'travail', who: { minister: 'travail' }, when: { ministerCamp: ['extreme-gauche', 'gauche'] },
    text: 'Je veux augmenter le SMIC de 10 %. Le patronat hurle déjà.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 55, onPass: { popularite: 7, tension: -6, dette: 3 }, onFail: { popularite: -2, tension: 3 } }, campMod: { droite: { popularite: -3 } } },
      { label: 'Coup de pouce de 2 %', effects: { popularite: 1, tension: -2 } },
      { label: 'Enterrer', effects: { tension: 5, loyalty: { travail: -10 } } }
    ] },
  { id: 'lois-assurance-chomage', family: 'lois', post: 'travail', who: { minister: 'travail' }, when: { ministerCamp: ['centre', 'droite'] },
    text: 'Réforme de l\'assurance chômage : on réduit la durée d\'indemnisation de 25 %.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 50, onPass: { dette: -8, tension: 7, popularite: -3 }, onFail: { popularite: -2 } }, campMod: { gauche: { popularite: -5 } } },
      { label: '49.3', use493: true, vote: { onPass: { dette: -8, tension: 7 } } },
      { label: 'Enterrer', effects: { loyalty: { travail: -6 } } }
    ] },
  { id: 'lois-ric', family: 'lois', who: { name: 'Un collectif citoyen', role: 'Pétition à 2 millions de signatures', portrait: '🗳️' },
    text: 'Nous voulons le référendum d\'initiative citoyenne. Le peuple doit pouvoir décider !',
    choices: [
      { label: 'Porter la loi', setFlags: ['grande_loi'], vote: { difficulty: 60, onPass: { popularite: 6, tension: -5, assemblee: -4 }, onFail: { popularite: -1, tension: 3 } } },
      { label: 'Enterrer', effects: { popularite: -3, tension: 4 } }
    ] },
  { id: 'lois-ecologie-pesticides', family: 'lois', post: 'ecologie', who: { minister: 'ecologie' }, when: { ministerCamp: ['extreme-gauche', 'gauche', 'centre'] },
    text: 'Je veux interdire le glyphosate pour de bon. Les agriculteurs vont sortir les tracteurs.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 55, onPass: { popularite: 3, tension: 6 }, onFail: { popularite: -2 } }, campMod: { gauche: { popularite: 3 }, droite: { popularite: -4 } } },
      { label: 'Enterrer', effects: { loyalty: { ecologie: -12 }, tension: -2 } }
    ] },
  { id: 'lois-securite-globale', family: 'lois', post: 'interieur', who: { minister: 'interieur' },
    when: { trait: 'cogneur' },
    text: 'Ma loi : reconnaissance faciale dans les gares et interdiction de filmer les policiers.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 55, onPass: { danger: -4, tension: 6, popularite: -2 }, onFail: { popularite: -2 } }, campMod: { gauche: { popularite: -6 } } },
      { label: '49.3', use493: true, vote: { onPass: { danger: -4, tension: 8 } } },
      { label: 'Enterrer', effects: { loyalty: { interieur: -10 } } }
    ] },
  { id: 'lois-niches-fiscales', family: 'lois', post: 'economie', who: { minister: 'economie' },
    text: 'On supprime 30 niches fiscales. 12 milliards d\'économies, et 12 lobbies en colère.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 55, onPass: { dette: -12, popularite: -2, danger: 2 }, onFail: { popularite: -1 } } },
      { label: '49.3', use493: true, vote: { onPass: { dette: -12, danger: 2 } } },
      { label: 'Enterrer', effects: { loyalty: { economie: -6 } } }
    ] },
  { id: 'lois-isf', family: 'lois', who: { name: 'Un député insoumis', role: 'La France Insoumise-moi-pas', portrait: '💎' },
    text: 'Rétablissons l\'ISF ! Les riches ont gagné 30 % en deux ans pendant que le peuple trime.',
    choices: [
      { label: 'Soutenir le texte', vote: { difficulty: 60, onPass: { dette: -6, popularite: 5 }, onFail: { popularite: 1 } }, campMod: { droite: { popularite: -6 }, centre: { popularite: -4 } } },
      { label: 'S\'y opposer', effects: { popularite: -2, assemblee: 2 }, campMod: { gauche: { popularite: -5 } } }
    ] },
  { id: 'lois-decentralisation', family: 'lois', post: 'premier', who: { minister: 'premier' },
    text: 'Grand acte de décentralisation : on donne plus de pouvoir et d\'impôts aux régions.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 45, onPass: { dette: -3, popularite: 2 }, onFail: { popularite: -1 } } },
      { label: 'Enterrer', effects: { loyalty: { premier: -5 } } }
    ] },
  { id: 'lois-service-national', family: 'lois', post: 'armees', who: { minister: 'armees' },
    text: 'Je propose un service militaire volontaire de 10 mois pour les 18-25 ans.',
    choices: [
      { label: 'Porter la loi', vote: { difficulty: 50, onPass: { dette: 3, danger: -3, popularite: 2 }, onFail: { popularite: -1 } } },
      { label: 'Service obligatoire', setFlags: ['grande_loi'], vote: { difficulty: 65, onPass: { dette: 6, danger: -5, tension: 6 }, onFail: { popularite: -3 } } },
      { label: 'Enterrer', effects: { loyalty: { armees: -8 } } }
    ] },
  { id: 'lois-audiovisuel', family: 'lois', who: { name: 'Delphine Ernotte-Coupée', role: 'Présidente de France Télévisions', portrait: '📺' },
    text: 'Le projet de privatiser France 2 fait trembler les couloirs. Vous tranchez ?',
    choices: [
      { label: 'Privatiser', vote: { difficulty: 60, onPass: { dette: -4, popularite: -4, tension: 3 }, onFail: { popularite: -2 } }, campMod: { 'extreme-droite': { popularite: 5 } } },
      { label: 'Renforcer le service public', effects: { dette: 1, popularite: 1 } }
    ] },
  { id: 'lois-cannabis', family: 'lois', who: { name: 'Un collectif de maires', role: 'Élus de grandes villes', portrait: '🌿' },
    text: 'Proposition de loi transpartisane : légaliser le cannabis, le taxer, et assécher les dealers.',
    choices: [
      { label: 'Soutenir', vote: { difficulty: 60, onPass: { dette: -3, danger: -3, popularite: -1 }, onFail: { popularite: -1 } }, campMod: { 'extreme-droite': { popularite: -8 }, droite: { popularite: -5 }, gauche: { popularite: 4 } } },
      { label: 'Jamais', effects: { popularite: 1 }, campMod: { gauche: { popularite: -3 } } }
    ] },
  { id: 'lois-constitution-ecologie', family: 'lois', post: 'ecologie', who: { minister: 'ecologie' },
    text: 'Inscrire la protection du climat dans la Constitution. Symbolique, mais beau.',
    choices: [
      { label: 'Porter la réforme', setFlags: ['grande_loi'], vote: { difficulty: 60, onPass: { popularite: 3, relations: { DE: 3 } }, onFail: { popularite: -2 } } },
      { label: 'Enterrer', effects: { loyalty: { ecologie: -8 } } }
    ] },
  { id: 'lois-dissolution', family: 'lois', post: 'premier', who: { minister: 'premier' },
    when: { max: { assemblee: 30 }, minMonth: 12 },
    text: 'L\'Assemblée est ingouvernable. Une dissolution ? C\'est un pari, Monsieur le Président.',
    choices: [
      { label: 'Dissoudre', effects: { assemblee: 15, popularite: -6, tension: 6 } },
      { label: 'Tenir', effects: { assemblee: -2 } }
    ] }
);
