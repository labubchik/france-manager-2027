var FM = (globalThis.FM = globalThis.FM || {});

FM.POSTS = ['premier', 'economie', 'interieur', 'etrangeres', 'armees', 'sante', 'education', 'travail', 'ecologie'];

FM.POST_LABELS = {
  premier: 'Premier ministre',
  economie: 'Économie et Finances',
  interieur: 'Intérieur',
  etrangeres: 'Affaires étrangères',
  armees: 'Armées',
  sante: 'Santé',
  education: 'Éducation',
  travail: 'Travail',
  ecologie: 'Écologie et Énergie'
};

FM.TRAIT_LABELS = {
  cogneur: '👊 Cogneur', gaffeur: '🤦 Gaffeur', ambitieux: '🐍 Ambitieux',
  loyal: '🐕 Loyal', technocrate: '📊 Technocrate', populiste: '📣 Populiste'
};

// Ministrables : vraies personnalités, noms parodiques.
FM.MINISTERS = [
  { id: 'cazeneuf', name: 'Bernard Cazeneuf', realName: 'Bernard Cazeneuve', post: 'premier', camp: 'gauche', trait: 'technocrate', competence: 4, portrait: '👓' },
  { id: 'bardebile', name: 'Jordan Bardébile', realName: 'Jordan Bardella', post: 'premier', camp: 'extreme-droite', trait: 'populiste', competence: 2, portrait: '🤳' },
  { id: 'bornee', name: 'Élisabeth Bornée', realName: 'Élisabeth Borne', post: 'premier', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '📐' },
  { id: 'barnie', name: 'Michel Barnié', realName: 'Michel Barnier', post: 'premier', camp: 'droite', trait: 'loyal', competence: 3, portrait: '🏔️' },

  { id: 'lemere', name: 'Bruno Le Mère', realName: 'Bruno Le Maire', post: 'economie', camp: 'centre', trait: 'ambitieux', competence: 3, portrait: '📖' },
  { id: 'coquerelle', name: 'Éric Coquerelle', realName: 'Éric Coquerel', post: 'economie', camp: 'extreme-gauche', trait: 'populiste', competence: 2, portrait: '🐞' },
  { id: 'panierrepas', name: 'Agnès Panier-Repas', realName: 'Agnès Pannier-Runacher', post: 'economie', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🧺' },
  { id: 'tanguette', name: 'Jean-Philippe Tanguette', realName: 'Jean-Philippe Tanguy', post: 'economie', camp: 'extreme-droite', trait: 'gaffeur', competence: 3, portrait: '🧮' },

  { id: 'dardmanin', name: 'Gérald Dard-Manin', realName: 'Gérald Darmanin', post: 'interieur', camp: 'centre', trait: 'cogneur', competence: 3, portrait: '🚔' },
  { id: 'nunuche', name: 'Laurent Nunuche', realName: 'Laurent Nuñez', post: 'interieur', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '🗂️' },
  { id: 'chenumou', name: 'Sébastien Chenu-Mou', realName: 'Sébastien Chenu', post: 'interieur', camp: 'extreme-droite', trait: 'cogneur', competence: 2, portrait: '🦴' },
  { id: 'wokequiez', name: 'Laurent Woke-quiez', realName: 'Laurent Wauquiez', post: 'interieur', camp: 'droite', trait: 'ambitieux', competence: 3, portrait: '🧥' },

  { id: 'barreau', name: 'Jean-Noël Barreau', realName: 'Jean-Noël Barrot', post: 'etrangeres', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🗺️' },
  { id: 'villepain', name: 'Dominique de Villepain', realName: 'Dominique de Villepin', post: 'etrangeres', camp: 'centre', trait: 'ambitieux', competence: 5, portrait: '🎭' },
  { id: 'royalement', name: 'Ségolène Royalement', realName: 'Ségolène Royal', post: 'etrangeres', camp: 'gauche', trait: 'gaffeur', competence: 2, portrait: '🌹' },
  { id: 'marioni', name: 'Thierry Marioni', realName: 'Thierry Mariani', post: 'etrangeres', camp: 'extreme-droite', trait: 'gaffeur', competence: 2, portrait: '🪆' },

  { id: 'lecornichon', name: 'Sébastien Lecornichon', realName: 'Sébastien Lecornu', post: 'armees', camp: 'centre', trait: 'loyal', competence: 4, portrait: '🥒' },
  { id: 'devilliersblinde', name: 'Pierre de Villiers-Blindé', realName: 'Pierre de Villiers', post: 'armees', camp: 'droite', trait: 'cogneur', competence: 5, portrait: '🎖️' },
  { id: 'lachaudiere', name: 'Bastien Lachaudière', realName: 'Bastien Lachaud', post: 'armees', camp: 'extreme-gauche', trait: 'populiste', competence: 2, portrait: '🔥' },

  { id: 'buzynette', name: 'Agnès Buzynette', realName: 'Agnès Buzyn', post: 'sante', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '🩺' },
  { id: 'veranda', name: 'Olivier Véranda', realName: 'Olivier Véran', post: 'sante', camp: 'centre', trait: 'loyal', competence: 3, portrait: '🏡' },
  { id: 'juvinasse', name: 'Philippe Juvinasse', realName: 'Philippe Juvin', post: 'sante', camp: 'droite', trait: 'gaffeur', competence: 3, portrait: '🚑' },

  { id: 'blanquette', name: 'Jean-Michel Blanquette', realName: 'Jean-Michel Blanquer', post: 'education', camp: 'centre', trait: 'cogneur', competence: 3, portrait: '🍲' },
  { id: 'ndiadia', name: 'Pap Ndiadia', realName: 'Pap Ndiaye', post: 'education', camp: 'gauche', trait: 'technocrate', competence: 4, portrait: '🎓' },
  { id: 'oupsdea', name: 'Amélie Oups-déa-Castéra', realName: 'Amélie Oudéa-Castéra', post: 'education', camp: 'centre', trait: 'gaffeur', competence: 2, portrait: '🎾' },
  { id: 'bellecantine', name: 'Najat Vallaud-Belle-Cantine', realName: 'Najat Vallaud-Belkacem', post: 'education', camp: 'gauche', trait: 'populiste', competence: 3, portrait: '🍽️' },

  { id: 'binette', name: 'Sophie Binette', realName: 'Sophie Binet', post: 'travail', camp: 'extreme-gauche', trait: 'populiste', competence: 3, portrait: '⛏️' },
  { id: 'panoramix', name: 'Astrid Panoramix-Bouvet', realName: 'Astrid Panosyan-Bouvet', post: 'travail', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🧙' },
  { id: 'bergerie', name: 'Laurent Bergerie', realName: 'Laurent Berger', post: 'travail', camp: 'gauche', trait: 'loyal', competence: 4, portrait: '🐑' },
  { id: 'menagerie', name: 'Thomas Ménagerie', realName: 'Thomas Ménagé', post: 'travail', camp: 'extreme-droite', trait: 'populiste', competence: 2, portrait: '🦁' },

  { id: 'rousseaumerguez', name: 'Sandrine Rousseau-Merguez', realName: 'Sandrine Rousseau', post: 'ecologie', camp: 'gauche', trait: 'gaffeur', competence: 2, portrait: '🌭' },
  { id: 'hublot', name: 'Nicolas Hublot', realName: 'Nicolas Hulot', post: 'ecologie', camp: 'centre', trait: 'ambitieux', competence: 3, portrait: '🚁' },
  { id: 'bechut', name: 'Christophe Béchut', realName: 'Christophe Béchu', post: 'ecologie', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '📉' }
];
