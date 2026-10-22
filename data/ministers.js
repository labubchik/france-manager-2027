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
  { id: 'cazeneuf', name: 'Bernard Cazeneuf', realName: 'Bernard Cazeneuve', party: 'La Convention (ex-PS)', post: 'premier', camp: 'gauche', trait: 'technocrate', competence: 4, portrait: '👓' },
  { id: 'bardebile', name: 'Jordan Bardébile', realName: 'Jordan Bardella', party: 'Rassemblement Nationouille', post: 'premier', camp: 'extreme-droite', trait: 'populiste', competence: 2, portrait: '🤳' },
  { id: 'bornee', name: 'Élisabeth Bornée', realName: 'Élisabeth Borne', party: 'Renaissance-moi', post: 'premier', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '📐' },
  { id: 'barnie', name: 'Michel Barnié', realName: 'Michel Barnier', party: 'Les Républicains-ains-ains', post: 'premier', camp: 'droite', trait: 'loyal', competence: 3, portrait: '🏔️' },

  { id: 'lemere', name: 'Bruno Le Mère', realName: 'Bruno Le Maire', party: 'Renaissance-moi', post: 'economie', camp: 'centre', trait: 'ambitieux', competence: 3, portrait: '📖' },
  { id: 'coquerelle', name: 'Éric Coquerelle', realName: 'Éric Coquerel', party: 'La France Insoumise-moi-pas', post: 'economie', camp: 'extreme-gauche', trait: 'populiste', competence: 2, portrait: '🐞' },
  { id: 'panierrepas', name: 'Agnès Panier-Repas', realName: 'Agnès Pannier-Runacher', party: 'Renaissance-moi', post: 'economie', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🧺' },
  { id: 'tanguette', name: 'Jean-Philippe Tanguette', realName: 'Jean-Philippe Tanguy', party: 'Rassemblement Nationouille', post: 'economie', camp: 'extreme-droite', trait: 'gaffeur', competence: 3, portrait: '🧮' },

  { id: 'dardmanin', name: 'Gérald Dard-Manin', realName: 'Gérald Darmanin', party: 'Renaissance-moi', post: 'interieur', camp: 'centre', trait: 'cogneur', competence: 3, portrait: '🚔' },
  { id: 'nunuche', name: 'Laurent Nunuche', realName: 'Laurent Nuñez', party: 'Sans étiquette (préfet)', post: 'interieur', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '🗂️' },
  { id: 'chenumou', name: 'Sébastien Chenu-Mou', realName: 'Sébastien Chenu', party: 'Rassemblement Nationouille', post: 'interieur', camp: 'extreme-droite', trait: 'cogneur', competence: 2, portrait: '🦴' },
  { id: 'wokequiez', name: 'Laurent Woke-quiez', realName: 'Laurent Wauquiez', party: 'Les Républicains-ains-ains', post: 'interieur', camp: 'droite', trait: 'ambitieux', competence: 3, portrait: '🧥' },

  { id: 'barreau', name: 'Jean-Noël Barreau', realName: 'Jean-Noël Barrot', party: 'MoDem (Mouvement des Dormeurs)', post: 'etrangeres', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🗺️' },
  { id: 'villepain', name: 'Dominique de Villepain', realName: 'Dominique de Villepin', party: 'La France Humaniste (ex-UMP)', post: 'etrangeres', camp: 'droite', trait: 'ambitieux', competence: 5, portrait: '🎭' },
  { id: 'royalement', name: 'Ségolène Royalement', realName: 'Ségolène Royal', party: 'Ex-Parti Socialo', post: 'etrangeres', camp: 'gauche', trait: 'gaffeur', competence: 2, portrait: '🌹' },
  { id: 'marioni', name: 'Thierry Marioni', realName: 'Thierry Mariani', party: 'Rassemblement Nationouille', post: 'etrangeres', camp: 'extreme-droite', trait: 'gaffeur', competence: 2, portrait: '🪆' },

  { id: 'lecornichon', name: 'Sébastien Lecornichon', realName: 'Sébastien Lecornu', party: 'Renaissance-moi', post: 'armees', camp: 'centre', trait: 'loyal', competence: 4, portrait: '🥒' },
  { id: 'devilliersblinde', name: 'Pierre de Villiers-Blindé', realName: 'Pierre de Villiers', party: 'Sans étiquette (ex-chef d\'état-major)', post: 'armees', camp: 'droite', trait: 'cogneur', competence: 5, portrait: '🎖️' },
  { id: 'lachaudiere', name: 'Bastien Lachaudière', realName: 'Bastien Lachaud', party: 'La France Insoumise-moi-pas', post: 'armees', camp: 'extreme-gauche', trait: 'populiste', competence: 2, portrait: '🔥' },

  { id: 'buzynette', name: 'Agnès Buzynette', realName: 'Agnès Buzyn', party: 'Renaissance-moi', post: 'sante', camp: 'centre', trait: 'technocrate', competence: 4, portrait: '🩺' },
  { id: 'veranda', name: 'Olivier Véranda', realName: 'Olivier Véran', party: 'Renaissance-moi', post: 'sante', camp: 'centre', trait: 'loyal', competence: 3, portrait: '🏡' },
  { id: 'juvinasse', name: 'Philippe Juvinasse', realName: 'Philippe Juvin', party: 'Les Républicains-ains-ains', post: 'sante', camp: 'droite', trait: 'gaffeur', competence: 3, portrait: '🚑' },

  { id: 'blanquette', name: 'Jean-Michel Blanquette', realName: 'Jean-Michel Blanquer', party: 'Sans étiquette (ex-macroniste)', post: 'education', camp: 'centre', trait: 'cogneur', competence: 3, portrait: '🍲' },
  { id: 'ndiadia', name: 'Pap Ndiadia', realName: 'Pap Ndiaye', party: 'Sans étiquette (ex-gouvernement Borne)', post: 'education', camp: 'gauche', trait: 'technocrate', competence: 4, portrait: '🎓' },
  { id: 'oupsdea', name: 'Amélie Oups-déa-Castéra', realName: 'Amélie Oudéa-Castéra', party: 'Renaissance-moi', post: 'education', camp: 'centre', trait: 'gaffeur', competence: 2, portrait: '🎾' },
  { id: 'bellecantine', name: 'Najat Vallaud-Belle-Cantine', realName: 'Najat Vallaud-Belkacem', party: 'Parti Socialo', post: 'education', camp: 'gauche', trait: 'populiste', competence: 3, portrait: '🍽️' },

  { id: 'binette', name: 'Sophie Binette', realName: 'Sophie Binet', party: 'CGT (syndicat)', post: 'travail', camp: 'extreme-gauche', trait: 'populiste', competence: 3, portrait: '⛏️' },
  { id: 'panoramix', name: 'Astrid Panoramix-Bouvet', realName: 'Astrid Panosyan-Bouvet', party: 'Renaissance-moi', post: 'travail', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '🧙' },
  { id: 'bergerie', name: 'Laurent Bergerie', realName: 'Laurent Berger', party: 'Ex-CFDT (syndicat)', post: 'travail', camp: 'gauche', trait: 'loyal', competence: 4, portrait: '🐑' },
  { id: 'menagerie', name: 'Thomas Ménagerie', realName: 'Thomas Ménagé', party: 'Rassemblement Nationouille', post: 'travail', camp: 'extreme-droite', trait: 'populiste', competence: 2, portrait: '🦁' },

  { id: 'rousseaumerguez', name: 'Sandrine Rousseau-Merguez', realName: 'Sandrine Rousseau', party: 'Les Écolos du Gazon', post: 'ecologie', camp: 'gauche', trait: 'gaffeur', competence: 2, portrait: '🌭' },
  { id: 'hublot', name: 'Nicolas Hublot', realName: 'Nicolas Hulot', party: 'Sans étiquette (ex-ministre écolo)', post: 'ecologie', camp: 'centre', trait: 'ambitieux', competence: 3, portrait: '🚁' },
  { id: 'bechut', name: 'Christophe Béchut', realName: 'Christophe Béchu', party: 'Horizons Lointains', post: 'ecologie', camp: 'centre', trait: 'technocrate', competence: 3, portrait: '📉' }
];
