var FM = (globalThis.FM = globalThis.FM || {});

// Sujets brûlants de l'actualité française : le joueur doit reconnaître les débats de la télé.
FM.CARDS.push(
  { id: 'hot-narco-marseille', family: 'hot', post: 'interieur', who: { minister: 'interieur' },
    text: 'Encore un règlement de comptes à Marseille : 3 morts cette semaine. Le narcotrafic défie l\'État.',
    choices: [
      { label: 'Envoyer l\'armée', effects: { danger: -3, tension: 4, popularite: 3 }, campMod: { gauche: { popularite: -6 } } },
      { label: 'Parquet national anti-drogue', effects: { dette: 1, danger: -4, popularite: 2 } }
    ] },
  { id: 'hot-narco-port', family: 'hot', who: { name: 'Un douanier du Havre', role: 'Douanes françaises', portrait: '📦' },
    text: '10 tonnes de cocaïne saisies au Havre. On n\'en intercepte qu\'un dixième.',
    choices: [
      { label: 'Scanners dans tous les ports', effects: { dette: 2, danger: -3 } },
      { label: 'Légaliser le cannabis', effects: { dette: -2, popularite: -2, danger: -1, tension: -2 }, campMod: { droite: { popularite: -6 }, 'extreme-droite': { popularite: -8 }, gauche: { popularite: 5 } } }
    ] },
  { id: 'hot-retraites-64', family: 'hot', post: 'premier', who: { minister: 'premier' },
    when: { notFlags: ['reforme_retraites'] },
    text: 'Le Conseil d\'orientation des retraites prévoit 15 milliards de déficit. Il faut une réforme.',
    choices: [
      { label: 'Retraite à 65 ans', effects: { dette: -12, tension: 14, popularite: -8 }, setFlags: ['reforme_retraites'] },
      { label: 'Retour à 62 ans', effects: { dette: 15, tension: -10, popularite: 6 }, campMod: { droite: { popularite: -5 } } },
      { label: 'Conférence sociale', effects: { tension: -2, popularite: -1 } }
    ] },
  { id: 'hot-essence-2e', family: 'hot', who: { name: 'Une infirmière de la Creuse', role: '80 km de trajet par jour', portrait: '⛽' },
    when: { min: { baril: 115 } },
    text: 'Le gazole est à 2,30 € le litre. « Je travaille pour payer mon plein. »',
    choices: [
      { label: 'Ristourne de 20 centimes', effects: { dette: 8, popularite: 6, tension: -7 } },
      { label: 'Taxer les superprofits', effects: { dette: -4, popularite: 4, relations: { SA: -3 } }, campMod: { droite: { popularite: -3 } } },
      { label: '« Prenez le vélo »', effects: { popularite: -9, tension: 9 } }
    ] },
  { id: 'hot-caledonie', family: 'hot', who: { name: 'Un leader indépendantiste kanak', role: 'Nouvelle-Calédonie', portrait: '🌺' },
    text: 'Nouméa s\'embrase à nouveau autour du corps électoral. Barrages et incendies.',
    choices: [
      { label: 'Renvoyer des gendarmes', effects: { tension: 3, danger: -2, dette: 1 }, followups: [{ cardId: 'hot-caledonie-accord', inCards: 15 }] },
      { label: 'Rouvrir le dialogue', effects: { tension: -3, popularite: -1 }, followups: [{ cardId: 'hot-caledonie-accord', inCards: 10 }] }
    ] },
  { id: 'hot-caledonie-accord', family: 'hot', system: true, who: { name: 'Un médiateur de Matignon', role: 'Nouvelle-Calédonie', portrait: '🤝' },
    text: 'Un projet d\'accord prévoit un nouveau référendum d\'autodétermination dans 10 ans.',
    choices: [
      { label: 'Signer l\'accord', effects: { tension: -4, popularite: 2 }, campMod: { 'extreme-droite': { popularite: -4 } } },
      { label: 'Refuser', effects: { tension: 5, danger: 3 } }
    ] },
  { id: 'hot-canicule', family: 'hot', post: 'sante', who: { minister: 'sante' },
    when: { minMonth: 1 },
    text: 'Canicule : 44 °C à Lyon, les écoles sont des fours, les EHPAD suffoquent.',
    choices: [
      { label: 'Plan climatisation', effects: { dette: 4, popularite: 4 } },
      { label: 'Fermer les écoles', effects: { popularite: -2, tension: 3 } }
    ] },
  { id: 'hot-secheresse', family: 'hot', post: 'ecologie', who: { minister: 'ecologie' },
    text: 'Sécheresse historique : 70 départements en restriction d\'eau. Les méga-bassines divisent.',
    choices: [
      { label: 'Autoriser les bassines', effects: { tension: 6, popularite: 2 }, campMod: { gauche: { popularite: -6 } }, followups: [{ cardId: 'hot-sainte-soline', inCards: 5 }] },
      { label: 'Rationner l\'agriculture', effects: { tension: 5, popularite: -3 }, campMod: { droite: { popularite: -4 } } }
    ] },
  { id: 'hot-sainte-soline', family: 'hot', system: true, who: { name: 'Les Soulèvements de la Terre', role: 'Collectif écologiste', portrait: '💧' },
    text: '10 000 militants marchent sur le chantier d\'une méga-bassine. Les gendarmes sont débordés.',
    choices: [
      { label: 'Envoyer les CRS', effects: { tension: 6, popularite: -3 }, setFlags: ['crs_envoyes'], followups: [{ cardId: 'social-bavure', inCards: 3 }] },
      { label: 'Suspendre le chantier', effects: { tension: -6, popularite: -1 } }
    ] },
  { id: 'hot-inondations', family: 'hot', who: { name: 'La maire d\'une ville du Pas-de-Calais', role: 'Commune sinistrée', portrait: '🌊' },
    text: 'Troisième inondation en deux ans. Les assureurs ne veulent plus nous couvrir.',
    choices: [
      { label: 'Fonds de catastrophe', effects: { dette: 3, popularite: 4 } },
      { label: 'Obliger les assureurs', effects: { popularite: 3, tension: -1 } }
    ] },
  { id: 'hot-nucleaire-epr', family: 'hot', post: 'ecologie', who: { minister: 'ecologie' },
    text: 'EDF demande 60 milliards pour 6 nouveaux EPR. Ils seraient prêts « vers 2040, peut-être ».',
    choices: [
      { label: 'Construire les EPR', effects: { dette: 12, popularite: 1 }, campMod: { gauche: { popularite: -4 } } },
      { label: 'Tout miser sur l\'éolien', effects: { dette: 6, popularite: -1 }, campMod: { droite: { popularite: -4 }, 'extreme-droite': { popularite: -5 } } }
    ] },
  { id: 'hot-laicite-abaya', family: 'hot', post: 'education', who: { minister: 'education' },
    text: 'Polémique : des élèves arrivent en abaya au lycée. Les plateaux télé s\'enflamment.',
    choices: [
      { label: 'Interdire', effects: { tension: 3, popularite: 2 }, campMod: { 'extreme-gauche': { popularite: -6 } } },
      { label: 'Laisser les proviseurs gérer', effects: { popularite: -3 }, campMod: { 'extreme-droite': { popularite: -5 } } }
    ] },
  { id: 'hot-laicite-sport', family: 'hot', who: { name: 'Un député Les Républicains-ains-ains', role: 'Assemblée nationale', portrait: '⚽' },
    text: 'Je dépose une proposition de loi pour interdire le voile dans les compétitions sportives.',
    choices: [
      { label: 'Soutenir', effects: { tension: 4, popularite: 2, assemblee: 2 }, campMod: { gauche: { popularite: -6 } } },
      { label: 'S\'y opposer', effects: { tension: -2, popularite: -2 }, campMod: { droite: { popularite: -5 } } }
    ] },
  { id: 'hot-ia-emploi', family: 'hot', post: 'travail', who: { minister: 'travail' },
    text: 'Une banque annonce remplacer 5 000 conseillers par une IA qui « ne fait jamais grève ».',
    choices: [
      { label: 'Taxer les robots', effects: { dette: -2, popularite: 4, relations: { US: -4 } } },
      { label: 'Plan de formation', effects: { dette: 3, popularite: 2 } },
      { label: 'Vive le progrès', effects: { tension: 6, popularite: -4 } }
    ] },
  { id: 'hot-logement', family: 'hot', who: { name: 'Une famille de Bobigny', role: 'Demandeurs de HLM depuis 9 ans', portrait: '🏚️' },
    text: '2,7 millions de demandes de logement social en attente. Nous vivons à 5 dans 30 m².',
    choices: [
      { label: 'Plan 500 000 HLM', effects: { dette: 10, popularite: 5, tension: -4 } },
      { label: 'Réquisitionner les logements vides', effects: { tension: -2, popularite: 2 }, campMod: { droite: { popularite: -6 }, centre: { popularite: -3 } } }
    ] },
  { id: 'hot-airbnb', family: 'hot', who: { name: 'La maire de Paris', role: 'Anne Hidalgogo', portrait: '🗼' },
    text: 'Airbnb vide Paris de ses habitants. Je veux interdire les meublés touristiques.',
    choices: [
      { label: 'Encadrer Airbnb', effects: { popularite: 2, relations: { US: -2 } } },
      { label: 'Laisser faire', effects: { popularite: -2 } }
    ] },
  { id: 'hot-deserts-medicaux', family: 'hot', post: 'sante', who: { minister: 'sante' },
    text: '6 millions de Français sans médecin traitant. Faut-il obliger les jeunes médecins à s\'installer à la campagne ?',
    choices: [
      { label: 'Obliger', effects: { popularite: 5, tension: 4 }, followups: [{ cardId: 'social-medecins-greve', inCards: 4 }] },
      { label: 'Primes à l\'installation', effects: { dette: 2, popularite: 2 } }
    ] },
  { id: 'hot-limoges', family: 'hot', who: { name: 'Le maire de Limoges', role: 'Mairie incendiée en octobre 2026', portrait: '🔥' },
    text: 'Notre mairie est encore en ruine depuis les émeutes. On attend toujours l\'aide de l\'État.',
    choices: [
      { label: 'Plan de reconstruction', effects: { dette: 1, popularite: 3, tension: -3 } },
      { label: 'Les assurances paieront', effects: { popularite: -3, tension: 3 } }
    ] },
  { id: 'hot-semaine-4-jours', family: 'hot', post: 'travail', who: { minister: 'travail' },
    text: 'Et si on passait à la semaine de 4 jours dans la fonction publique ?',
    choices: [
      { label: 'Expérimenter', effects: { popularite: 4, tension: -3, dette: 1 }, campMod: { droite: { popularite: -3 } } },
      { label: 'Travailler plus', effects: { popularite: -3, tension: 4, dette: -2 } }
    ] },
  { id: 'hot-taxe-zucman', family: 'hot', who: { name: 'Gabriel Zucmanne', role: 'Économiste star', portrait: '🧑‍🏫' },
    text: 'Un impôt de 2 % sur les patrimoines au-dessus de 100 millions rapporterait 20 milliards.',
    choices: [
      { label: 'Taxe Zucmanne', effects: { dette: -15, popularite: 6, tension: -3 }, campMod: { droite: { popularite: -6 }, centre: { popularite: -3 } }, followups: [{ cardId: 'hot-exil-fiscal', inCards: 8 }] },
      { label: 'Ça ferait fuir les riches', effects: { popularite: -4, tension: 3 } }
    ] },
  { id: 'hot-exil-fiscal', family: 'hot', system: true, who: { name: 'Bernard Arnault-de-Rire', role: 'Homme le plus riche de France', portrait: '👜' },
    text: 'Je vous annonce que je pars en Belgique. Avec mes sacs, mes montres et mes impôts.',
    choices: [
      { label: 'Bon vent', effects: { dette: 3, popularite: 4 } },
      { label: 'Négocier une exemption', effects: { dette: -2, popularite: -6 } }
    ] },
  { id: 'hot-portable-ecole', family: 'hot', post: 'education', who: { minister: 'education' },
    text: 'Je propose d\'interdire totalement le smartphone au collège, même dans les sacs.',
    choices: [
      { label: 'Interdire', effects: { popularite: 3, tension: 1 } },
      { label: 'Ridicule', effects: { popularite: -1 } }
    ] },
  { id: 'hot-fin-de-vie', family: 'hot', who: { name: 'Un collectif de patients', role: 'Association pour mourir dans la dignité', portrait: '🕯️' },
    text: 'Après des années de débat, la loi sur l\'aide à mourir attend toujours d\'être promulguée.',
    choices: [
      { label: 'Faire aboutir la loi', effects: { popularite: 3 }, campMod: { droite: { popularite: -3 }, 'extreme-droite': { popularite: -4 } } },
      { label: 'Encore un débat', effects: { popularite: -2 } }
    ] },
  { id: 'hot-cheque-energie', family: 'hot', post: 'economie', who: { minister: 'economie' },
    when: { min: { baril: 100 } },
    text: 'Les factures de chauffage explosent cet hiver. Un chèque énergie coûterait 4 milliards.',
    choices: [
      { label: 'Chèque énergie', effects: { dette: 4, popularite: 4, tension: -5 } },
      { label: 'Mettez un pull', effects: { popularite: -6, tension: 6 } }
    ] }
);
