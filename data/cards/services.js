var FM = (globalThis.FM = globalThis.FM || {});

// Services publics : investir creuse la dette, couper fait monter la colère.
FM.CARDS.push(
  { id: 'services-urgences', family: 'services', post: 'sante', who: { minister: 'sante' },
    text: 'Les urgences ferment la nuit dans 40 hôpitaux. Il faut 3 milliards tout de suite.',
    choices: [
      { label: 'Débloquer 3 milliards', effects: { dette: 3, popularite: 5, tension: -4 } },
      { label: 'Pas un sou', effects: { tension: 7, popularite: -5 } }
    ] },
  { id: 'services-classes', family: 'services', post: 'education', who: { minister: 'education' }, when: { ministerCamp: ['centre', 'droite', 'extreme-droite'] },
    text: 'Je propose de fermer 3 000 classes : il y a moins d\'enfants. Économie : 1 milliard.',
    choices: [
      { label: 'Fermer les classes', effects: { dette: -1, tension: 6, popularite: -5 } },
      { label: 'Garder les classes', effects: { popularite: 3, loyalty: { education: -5 } } }
    ] },
  { id: 'services-petites-lignes', family: 'services', who: { name: 'Jean-Pierre Farandou-Doudou', role: 'PDG de la SNCF', portrait: '🚂' },
    text: 'Les petites lignes de train perdent 2 milliards par an. On les ferme ?',
    choices: [
      { label: 'Fermer les petites lignes', effects: { dette: -2, tension: 7, popularite: -6 } },
      { label: 'Les rénover', effects: { dette: 6, popularite: 5, tension: -2 } }
    ] },
  { id: 'services-commissariats', family: 'services', post: 'interieur', who: { minister: 'interieur' },
    text: 'Les commissariats tombent en ruine. À Marseille, les policiers ramènent leur propre papier toilette.',
    choices: [
      { label: 'Plan de 4 milliards', effects: { dette: 4, popularite: 3, danger: -2 } },
      { label: 'Repeindre les façades', effects: { dette: 0.5, popularite: -2, loyalty: { interieur: -8 } } }
    ] },
  { id: 'services-prisons', family: 'services', who: { name: 'Gérald Dard-Manin-de-Justice', role: 'Garde des Sceaux', portrait: '⚖️' },
    text: 'Les prisons sont pleines à 160 %. Il faut construire 15 000 places ou libérer des détenus.',
    choices: [
      { label: 'Construire des prisons', effects: { dette: 6, popularite: 2 }, campMod: { gauche: { popularite: -3 } } },
      { label: 'Peines alternatives', effects: { popularite: -3, tension: 2 }, campMod: { droite: { popularite: -4 }, 'extreme-droite': { popularite: -6 } } }
    ] },
  { id: 'services-fonctionnaires', family: 'services', post: 'economie', who: { minister: 'economie' },
    when: { ministerCamp: ['centre', 'droite'], trait: 'technocrate' },
    text: 'Mes tableurs sont formels : supprimer 100 000 postes de fonctionnaires économise 5 milliards par an.',
    choices: [
      { label: 'Supprimer les postes', effects: { deficit: -5, tension: 12, popularite: -7 } },
      { label: 'Geler les embauches', effects: { deficit: -2, tension: 4, popularite: -2 } }
    ] },
  { id: 'services-poste', family: 'services', who: { name: 'Un maire rural', role: 'Association des maires ruraux', portrait: '🏤' },
    text: 'La Poste ferme le dernier bureau du canton. Mes administrés font 40 km pour un recommandé.',
    choices: [
      { label: 'Maisons France Services', effects: { dette: 1, popularite: 3 } },
      { label: '« Il y a Internet »', effects: { popularite: -4, tension: 3 } }
    ] },
  { id: 'services-justice', family: 'services', who: { name: 'Une juge d\'instruction', role: 'Union syndicale des magistrats', portrait: '👩‍⚖️' },
    text: 'Il faut 3 ans pour juger un cambriolage. Nous croulons sous les dossiers.',
    choices: [
      { label: 'Recruter 1 500 magistrats', effects: { dette: 2, popularite: 3, danger: -1 } },
      { label: 'Juger plus vite (IA ?)', effects: { popularite: -2, tension: 2 } }
    ] },
  { id: 'services-cantines', family: 'services', post: 'education', who: { minister: 'education' }, when: { ministerCamp: ['extreme-gauche', 'gauche', 'centre'] },
    text: 'Proposition : cantine gratuite pour tous les écoliers. Coût : 3 milliards par an.',
    choices: [
      { label: 'Cantine gratuite', effects: { deficit: 3, popularite: 6, tension: -4 }, campMod: { droite: { popularite: -3 } } },
      { label: 'Trop cher', effects: { popularite: -2 } }
    ] },
  { id: 'services-psychiatrie', family: 'services', post: 'sante', who: { minister: 'sante' },
    text: 'La psychiatrie est en ruine : 8 mois d\'attente pour un rendez-vous d\'enfant.',
    choices: [
      { label: 'Plan psychiatrie', effects: { dette: 2, popularite: 3, tension: -2 } },
      { label: 'Remettre à plus tard', effects: { tension: 3, popularite: -2 } }
    ] },
  { id: 'services-tgv-sud', family: 'services', who: { name: 'Carole Delga-Dégât', role: 'Présidente de l\'Occitanie', portrait: '🚄' },
    text: 'Le TGV Bordeaux-Toulouse a besoin de 14 milliards de l\'État. Le Sud-Ouest attend depuis 30 ans.',
    choices: [
      { label: 'Financer', effects: { dette: 14, popularite: 4, tension: -2 } },
      { label: 'Reporter encore', effects: { popularite: -3, tension: 2 } }
    ] },
  { id: 'services-privatisation', family: 'services', post: 'economie', who: { minister: 'economie' }, when: { ministerCamp: ['centre', 'droite'] },
    text: 'On pourrait vendre les parts de l\'État dans la Française des Jeux et les aéroports. 10 milliards d\'un coup !',
    choices: [
      { label: 'Tout vendre', effects: { dette: -10, popularite: -5, tension: 5 }, campMod: { droite: { popularite: 4 } } },
      { label: 'Les bijoux de famille, non', effects: { popularite: 2, loyalty: { economie: -5 } } }
    ] },
  { id: 'services-ehpad', family: 'services', post: 'sante', who: { minister: 'sante' },
    text: 'Un nouveau scandale de maltraitance dans des EHPAD privés. Les familles sont en colère.',
    choices: [
      { label: 'Contrôles massifs', effects: { dette: 1, popularite: 4, tension: -2 } },
      { label: 'Commission d\'enquête', effects: { popularite: -2 } }
    ] },
  { id: 'services-armee-budget', family: 'services', post: 'armees', who: { minister: 'armees' },
    text: 'L\'armée réclame 5 milliards de plus par an. « Avec ce qui se passe dans le monde… »',
    choices: [
      { label: 'Accorder', effects: { deficit: 5, danger: -5, popularite: 1 } },
      { label: 'Refuser', effects: { danger: 4, loyalty: { armees: -12 } } }
    ] }
);
