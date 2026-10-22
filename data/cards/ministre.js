var FM = (globalThis.FM = globalThis.FM || {});

// Vie du gouvernement : ambitions, loyautés, remaniements, trahisons.
FM.CARDS.push(
  { id: 'ministre-complot', family: 'ministre', post: 'premier', who: { minister: 'premier' },
    when: { trait: 'ambitieux', minMonth: 6 },
    text: 'On me rapporte que votre Premier ministre dîne chaque semaine avec les chefs de l\'opposition.',
    choices: [
      { label: 'Le convoquer', effects: { loyalty: { premier: -15 }, danger: -2 } },
      { label: 'Faire semblant de rien', effects: { danger: 4, loyalty: { premier: 5 } } },
      { label: 'Le virer', fire: 'premier', effects: { assemblee: -5, popularite: 1 } }
    ] },
  { id: 'ministre-ambition-interieur', family: 'ministre', post: 'interieur', who: { minister: 'interieur' },
    when: { trait: 'ambitieux' },
    text: 'Je voudrais être numéro 2 du gouvernement. Et avoir un plus grand bureau. Et une escorte.',
    choices: [
      { label: 'Accorder', effects: { loyalty: { interieur: 20, premier: -10 } } },
      { label: 'Refuser', effects: { loyalty: { interieur: -15 } } }
    ] },
  { id: 'ministre-loyal-sacrifice', family: 'ministre', post: 'travail', who: { minister: 'travail' },
    when: { trait: 'loyal' },
    text: 'Monsieur le Président, si un fusible doit sauter pour calmer la rue, je suis prêt.',
    choices: [
      { label: 'Accepter sa démission', fire: 'travail', effects: { tension: -6, popularite: 2 } },
      { label: 'Le garder', effects: { loyalty: { travail: 15 } } },
      { label: 'Le décorer', effects: { loyalty: { travail: 20 }, popularite: -1 } }
    ] },
  { id: 'ministre-technocrate-rapport', family: 'ministre', post: 'economie', who: { minister: 'economie' },
    when: { trait: 'technocrate' },
    text: 'J\'ai rédigé un rapport de 900 pages sur la dette. Conclusion : il faut « des efforts ».',
    choices: [
      { label: 'Appliquer le plan', effects: { dette: -8, tension: 6, popularite: -3 } },
      { label: 'Le ranger dans un tiroir', effects: { loyalty: { economie: -8 } } }
    ] },
  { id: 'ministre-populiste-promesse', family: 'ministre', post: 'travail', who: { minister: 'travail' },
    when: { trait: 'populiste' },
    text: 'J\'ai promis à la télé la retraite à 60 ans pour tous. Vous me suivez, hein ?',
    choices: [
      { label: 'Le désavouer', effects: { popularite: -2, loyalty: { travail: -15 } } },
      { label: 'Le suivre', effects: { popularite: 5, dette: 12, assemblee: -3 } }
    ] },
  { id: 'ministre-guerre-des-egos', family: 'ministre', post: 'premier', who: { minister: 'premier' },
    text: 'Votre Premier ministre et votre ministre de l\'Économie ne se parlent plus. Il faut trancher.',
    choices: [
      { label: 'Donner raison à Matignon', effects: { loyalty: { premier: 10, economie: -15 } } },
      { label: 'Donner raison à Bercy', effects: { loyalty: { premier: -15, economie: 10 } } }
    ] },
  { id: 'ministre-remaniement', family: 'ministre', who: { name: 'Votre secrétaire général', role: 'Élysée', portrait: '🗂️' },
    when: { minMonth: 18 },
    text: 'Les Français s\'ennuient. Un petit remaniement relancerait la machine. On change le ministre du Travail ?',
    choices: [
      { label: 'Remanier', fire: 'travail', effects: { popularite: 3, assemblee: -2 } },
      { label: 'Changer les secrétaires d\'État', effects: { popularite: 1, assemblee: 1 } },
      { label: 'Rien ne change', effects: { popularite: -1 } }
    ] },
  { id: 'ministre-cabinet-fete', family: 'ministre', post: 'sante', who: { minister: 'sante' },
    text: 'Fuite d\'une vidéo : votre ministre fête son anniversaire dans un ministère, champagne et DJ.',
    choices: [
      { label: 'Le défendre', effects: { popularite: -4, loyalty: { sante: 10 } } },
      { label: 'Exiger des excuses', effects: { popularite: -1, loyalty: { sante: -8 } } },
      { label: 'Le virer', fire: 'sante', effects: { popularite: 3 } }
    ] },
  { id: 'ministre-trahison', family: 'ministre', system: true, who: { minister: '$betrayal' },
    text: 'Votre ministre a fuité au Monde tous les secrets du Conseil des ministres et menace de démissionner avec fracas.',
    choices: [
      { label: 'Le virer', fire: '$betrayal', effects: { popularite: -2, assemblee: -4, danger: -6 } },
      { label: 'Pardonner', effects: { popularite: -3, danger: 3 } },
      { label: 'Acheter sa loyauté', effects: { dette: 1, danger: -3 } }
    ] }
);
