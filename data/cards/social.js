var FM = (globalThis.FM = globalThis.FM || {});

// Manifs et grèves. Presque toujours une option CRS : rapide, mais ça laisse des traces.
FM.CARDS.push(
  { id: 'social-tracteurs-periph', family: 'social', who: { name: 'Arnaud Rousseau-Tracteur', role: 'Patron de la FNSEA', portrait: '🚜' },
    text: '3 000 tracteurs bloquent le périphérique et déversent du fumier devant la préfecture. On fait quoi ?',
    choices: [
      { label: 'Céder sur les normes', effects: { dette: 4, tension: -8, popularite: 3 }, campMod: { gauche: { popularite: -3 } } },
      { label: 'Envoyer les CRS', effects: { tension: -5, popularite: -7 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 6 }] }
    ] },
  { id: 'social-greve-sncf', family: 'social', who: { name: 'Fabien Villedieu-Rail', role: 'Syndicat SUD-Rail', portrait: '🚆' },
    text: 'Grève reconductible à la SNCF pendant les vacances de février. Les Français dorment dans les gares.',
    choices: [
      { label: 'Augmenter les cheminots', effects: { dette: 3, tension: -6, popularite: -2 } },
      { label: 'Service minimum forcé', effects: { tension: 9, popularite: 3 }, campMod: { gauche: { popularite: -6 }, 'extreme-gauche': { popularite: -8 } } }
    ] },
  { id: 'social-profs', family: 'social', post: 'education', who: { minister: 'education' },
    text: 'Les profs sont dans la rue : « 2 000 € après bac+5, c\'est une blague ? »',
    choices: [
      { label: 'Revaloriser de 10 %', effects: { dette: 8, tension: -8, popularite: 4 } },
      { label: '« Ils ont les vacances »', effects: { tension: 10, popularite: -4, loyalty: { education: -5 } } }
    ] },
  { id: 'social-etudiants', family: 'social', who: { name: 'Une présidente de l\'UNEF', role: 'Syndicat étudiant', portrait: '🎒' },
    text: 'La Sorbonne est occupée. Les étudiants réclament des repas à 1 € et la fin de Parcoursup.',
    choices: [
      { label: 'Repas à 1 € pour tous', effects: { dette: 2, tension: -5, popularite: 2 } },
      { label: 'Évacuer la Sorbonne', effects: { tension: -2, popularite: -6 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 5 }] }
    ] },
  { id: 'social-gilets-jaunes', family: 'social', who: { name: 'Jacline Mouraux-Retour', role: 'Figure des gilets jaunes', portrait: '🦺' },
    text: 'Les gilets jaunes sont de retour sur les ronds-points. Le prix du gazole les a réveillés.',
    when: { min: { baril: 105 } },
    choices: [
      { label: 'Chèque carburant', effects: { dette: 6, tension: -9, popularite: 4 } },
      { label: 'Dégager les ronds-points', effects: { tension: 6, popularite: -6 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 7 }] }
    ] },
  { id: 'social-cgt-raffineries', family: 'social', who: { name: 'Philippe Martinez-Moustache', role: 'CGT Pétrole', portrait: '🥸' },
    text: 'Les raffineries sont bloquées. Une station-service sur trois est à sec.',
    choices: [
      { label: 'Réquisitionner', effects: { tension: 8, popularite: -2 } },
      { label: 'Négocier les salaires', effects: { dette: 2, tension: -6, popularite: -1 } },
      { label: 'Envoyer les CRS', effects: { tension: -3, popularite: -6 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 6 }] }
    ] },
  { id: 'social-infirmieres', family: 'social', post: 'sante', who: { minister: 'sante' },
    text: 'Les infirmières défilent avec des pancartes « Applaudissez-nous en euros ».',
    choices: [
      { label: 'Prime de 200 € par mois', effects: { dette: 5, tension: -7, popularite: 5 } },
      { label: 'Un merci télévisé', effects: { tension: 6, popularite: -3 } }
    ] },
  { id: 'social-routiers', family: 'social', who: { name: 'Un routier en colère', role: 'Fédération du transport', portrait: '🚛' },
    text: 'Les routiers bloquent les dépôts pétroliers et les entrepôts d\'Amazon. Plus de papier toilette dans les supermarchés.',
    choices: [
      { label: 'Baisser la taxe gazole', effects: { dette: 5, tension: -7, popularite: 2 }, campMod: { gauche: { popularite: -3 } } },
      { label: 'Envoyer les CRS', effects: { tension: -4, popularite: -5 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 6 }] }
    ] },
  { id: 'social-cites', family: 'social', post: 'interieur', who: { minister: 'interieur' },
    when: { trait: 'cogneur' },
    text: 'Trois nuits de violences urbaines après une course-poursuite. Je propose le couvre-feu et 10 000 CRS.',
    choices: [
      { label: 'Couvre-feu et CRS', effects: { tension: -6, popularite: 2, danger: 2 }, setFlags: ['crs_envoyes'], campMod: { gauche: { popularite: -8 } }, followups: [{ cardId: 'social-bavure', inCards: 4 }] },
      { label: 'Médiateurs et éducateurs', effects: { dette: 2, tension: -3, popularite: -2, loyalty: { interieur: -10 } }, campMod: { droite: { popularite: -4 }, 'extreme-droite': { popularite: -6 } } }
    ] },
  { id: 'social-retraites-manif', family: 'social', who: { name: 'L\'intersyndicale', role: '8 syndicats, 1 banderole', portrait: '📣' },
    when: { flags: ['reforme_retraites'] },
    text: '2 millions de personnes dans la rue contre votre réforme des retraites. L\'intersyndicale exige le retrait.',
    choices: [
      { label: 'Tenir bon', effects: { tension: 12, popularite: -5, dette: -5 } },
      { label: 'Retirer la réforme', effects: { tension: -12, popularite: -2, dette: 8, assemblee: -4 }, clearFlags: ['reforme_retraites'] }
    ] },
  { id: 'social-pecheurs', family: 'social', who: { name: 'Un patron pêcheur breton', role: 'Comité des pêches', portrait: '🎣' },
    text: 'Les pêcheurs bloquent les ports : Bruxelles réduit encore les quotas de sole.',
    choices: [
      { label: 'Aide d\'urgence', effects: { dette: 2, tension: -4, popularite: 2 } },
      { label: 'Se fâcher avec Bruxelles', effects: { popularite: 4, relations: { DE: -6 }, tension: -3 } }
    ] },
  { id: 'social-taxis-vtc', family: 'social', who: { name: 'Un chauffeur de taxi', role: 'Collectif des taxis parisiens', portrait: '🚕' },
    text: 'Taxis contre VTC : opération escargot sur l\'A1, des voitures Uber retournées à Roissy.',
    choices: [
      { label: 'Encadrer les VTC', effects: { tension: -5, popularite: -1 } },
      { label: 'Envoyer les CRS', effects: { tension: -2, popularite: -4 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 8 }] }
    ] },
  { id: 'social-medecins-greve', family: 'social', post: 'sante', who: { minister: 'sante' },
    text: 'Les médecins généralistes ferment leurs cabinets : ils veulent la consultation à 35 €.',
    choices: [
      { label: 'Accorder 35 €', effects: { dette: 3, tension: -4, popularite: 1 } },
      { label: 'Refuser', effects: { tension: 6, popularite: -4 } }
    ] },
  { id: 'social-black-bloc', family: 'social', post: 'interieur', who: { minister: 'interieur' },
    text: 'Le 1er Mai a dégénéré : des black blocs ont incendié un McDo et trois banques à Paris.',
    choices: [
      { label: 'Fermeté totale', effects: { tension: -3, popularite: 3, danger: 1 }, setFlags: ['crs_envoyes'], campMod: { gauche: { popularite: -4 } } },
      { label: 'Ne pas surréagir', effects: { tension: 4, popularite: -3 }, campMod: { droite: { popularite: -4 }, 'extreme-droite': { popularite: -6 } } }
    ] },
  { id: 'social-livreurs', family: 'social', who: { name: 'Mamadou, livreur', role: 'Collectif des livreurs à vélo', portrait: '🚴' },
    text: 'Les livreurs à vélo bloquent les plateformes : « Payés 2,80 € la course, sous la pluie. »',
    choices: [
      { label: 'Imposer un salaire minimum', effects: { tension: -5, popularite: 3, relations: { US: -3 } } },
      { label: 'Laisser le marché faire', effects: { tension: 5, popularite: -2 } }
    ] },
  { id: 'social-agriculteurs-mercosur', family: 'social', who: { name: 'Arnaud Rousseau-Tracteur', role: 'Patron de la FNSEA', portrait: '🚜' },
    text: 'Le traité Mercosur arrive au vote à Bruxelles. Les agriculteurs menacent de « bloquer Paris un mois ».',
    choices: [
      { label: 'Mettre un veto', effects: { tension: -8, popularite: 5, relations: { DE: -10 } } },
      { label: 'Signer le traité', effects: { tension: 10, popularite: -6, dette: -4, relations: { DE: 8 } } }
    ] },
  { id: 'social-pompiers', family: 'social', who: { name: 'Un capitaine des pompiers', role: 'Pompiers professionnels', portrait: '🚒' },
    text: 'Les pompiers manifestent et aspergent la police de mousse. Ambiance.',
    choices: [
      { label: 'Prime de risque', effects: { dette: 1, tension: -4, popularite: 2 } },
      { label: '« Pas de passe-droit »', effects: { tension: 5, popularite: -3 } }
    ] },
  { id: 'social-bavure', family: 'social', system: true, who: { name: 'Une journaliste de Mediapart-à-l\'heure', role: 'Enquête', portrait: '📹' },
    text: 'Une vidéo montre un CRS frappant un manifestant à terre. Elle tourne en boucle sur les réseaux.',
    choices: [
      { label: 'Suspendre le CRS', effects: { tension: -5, popularite: 1, loyalty: { interieur: -10 } } },
      { label: 'Soutenir la police', effects: { tension: 9, popularite: -4 }, campMod: { droite: { popularite: 5 }, 'extreme-droite': { popularite: 7 } } }
    ] }
);
