var FM = (globalThis.FM = globalThis.FM || {});

// Géopolitique : les dirigeants étrangers (noms parodiques, pays toujours affiché) font leurs demandes.
FM.CARDS.push(
  { id: 'geo-tromp-f35', family: 'geo', who: { leader: 'US' },
    text: '« Achetez nos F-35, sinon je taxe votre fromage à 200 %. Le camembert, c\'est fini. »',
    choices: [
      { label: 'Acheter des F-35', effects: { dette: 12, relations: { US: 15 }, popularite: -4 }, campMod: { 'extreme-droite': { popularite: -3 } } },
      { label: 'Refuser, on a le Rafale', effects: { popularite: 5, relations: { US: -18 }, dette: 3 } },
      { label: 'Négocier', effects: { relations: { US: -4 }, dette: 2 } }
    ] },
  { id: 'geo-tromp-otan', family: 'geo', who: { leader: 'US' },
    text: '« L\'OTAN, c\'est 3,5 % du PIB pour la défense. Vous êtes à 2 %. Ça fait 40 milliards par an de plus, payez ! »',
    choices: [
      { label: 'Monter à 3,5 %', effects: { deficit: 40, relations: { US: 12 }, danger: -4 } },
      { label: 'Défense européenne', effects: { deficit: 10, relations: { US: -8, DE: 8 }, danger: -2 } },
      { label: 'Ignorer', effects: { relations: { US: -12 }, danger: 3 } }
    ] },
  { id: 'geo-tromp-droits-douane', family: 'geo', who: { leader: 'US' },
    when: { relationBelow: { US: 0 } },
    text: '« Taxes de 50 % sur vos vins et vos sacs à main. Personne ne me manque de respect. »',
    choices: [
      { label: 'Représailles européennes', effects: { relations: { US: -10, DE: 5 }, popularite: 4, dette: 4 } },
      { label: 'Faire des excuses', effects: { relations: { US: 15 }, popularite: -6 } }
    ] },
  { id: 'geo-tromp-golf', family: 'geo', who: { leader: 'US' },
    text: '« Venez jouer au golf à Mar-a-Lago ! On parlera de l\'Iran. Je gagne toujours, au fait. »',
    choices: [
      { label: 'Y aller (et perdre)', effects: { relations: { US: 12 }, popularite: -3 } },
      { label: 'Décliner poliment', effects: { relations: { US: -5 } } }
    ] },
  { id: 'geo-poutrine-gaz', family: 'geo', who: { leader: 'RU' },
    text: '« Votre énergie coûte cher, mon ami. Levez les sanctions et le gaz russe coulera à nouveau. »',
    choices: [
      { label: 'Refuser fermement', effects: { relations: { RU: -10, UA: 5 }, danger: 3 } },
      { label: 'Discuter discrètement', effects: { relations: { RU: 15, UA: -15, DE: -10 }, popularite: -6, baril: -3 } }
    ] },
  { id: 'geo-poutrine-ingerence', family: 'geo', post: 'interieur', who: { minister: 'interieur' },
    text: 'Nos services démasquent une vaste campagne russe de désinformation sur les réseaux sociaux.',
    choices: [
      { label: 'Expulser 20 diplomates', effects: { relations: { RU: -15 }, danger: 4, popularite: 3 } },
      { label: 'Discrètement contrer', effects: { dette: 1, danger: -1 } }
    ] },
  { id: 'geo-xi-airbus', family: 'geo', who: { leader: 'CN' },
    text: '« Nous achetons 300 Airbus. En échange, oubliez Taïwan et nos voitures électriques. »',
    choices: [
      { label: 'Accepter', effects: { dette: -8, relations: { CN: 15, US: -10 }, popularite: -2 } },
      { label: 'Refuser', effects: { relations: { CN: -15 }, popularite: 2 } }
    ] },
  { id: 'geo-xi-terres-rares', family: 'geo', who: { leader: 'CN' },
    when: { relationBelow: { CN: -10 } },
    text: '« Nous suspendons nos exportations de terres rares vers la France. Bonne chance pour vos batteries. »',
    choices: [
      { label: 'Plan minier français', effects: { dette: 8, popularite: 2, relations: { CN: -5 } } },
      { label: 'Aller à Pékin s\'excuser', effects: { relations: { CN: 20 }, popularite: -5 } }
    ] },
  { id: 'geo-salami-rafale', family: 'geo', who: { leader: 'SA' },
    text: '« Je vous achète 80 Rafale. Ne parlons pas des droits de l\'homme, c\'est si ennuyeux. »',
    choices: [
      { label: 'Signer le contrat', effects: { dette: -12, relations: { SA: 15 }, popularite: -4 }, campMod: { gauche: { popularite: -4 } } },
      { label: 'Exiger des garanties', effects: { relations: { SA: -12 }, popularite: 3 } }
    ] },
  { id: 'geo-salami-psg', family: 'geo', who: { leader: 'SA' },
    text: '« Après le PSG, je veux racheter l\'Olympique de Marseille. Et peut-être la tour Eiffel. »',
    choices: [
      { label: 'L\'OM, d\'accord', effects: { dette: -2, relations: { SA: 10 }, popularite: -3 } },
      { label: 'Jamais l\'OM !', effects: { relations: { SA: -8 }, popularite: 5 } }
    ] },
  { id: 'geo-tebboum-visas', family: 'geo', who: { leader: 'DZ' },
    text: '« Si vous réduisez nos visas, nous ne reprendrons plus aucun de nos ressortissants expulsés. »',
    choices: [
      { label: 'Réduire les visas', effects: { relations: { DZ: -18 }, popularite: 2, tension: 2 }, campMod: { gauche: { popularite: -4 } } },
      { label: 'Apaiser', effects: { relations: { DZ: 12 }, popularite: -2 }, campMod: { 'extreme-droite': { popularite: -6 }, droite: { popularite: -3 } } }
    ] },
  { id: 'geo-tebboum-memoire', family: 'geo', who: { leader: 'DZ' },
    text: '« La France doit des excuses officielles pour la colonisation. »',
    choices: [
      { label: 'Geste mémoriel', effects: { relations: { DZ: 20 }, popularite: -2 }, campMod: { 'extreme-droite': { popularite: -8 }, droite: { popularite: -4 } } },
      { label: 'Refuser la repentance', effects: { relations: { DZ: -15 }, popularite: 1 }, campMod: { gauche: { popularite: -4 } } }
    ] },
  { id: 'geo-merzi-dette', family: 'geo', who: { leader: 'DE' },
    when: { min: { dette: 125 } },
    text: '« Votre dette inquiète Berlin. Il faut un plan de rigueur, sinon les marchés vont vous punir. »',
    choices: [
      { label: 'Plan de rigueur', effects: { deficit: -10, tension: 10, popularite: -5, relations: { DE: 12 } } },
      { label: '« Occupez-vous de vos affaires »', effects: { relations: { DE: -12 }, popularite: 3 } }
    ] },
  { id: 'geo-merzi-defense', family: 'geo', who: { leader: 'DE' },
    text: '« Faisons enfin un char franco-allemand. Mais c\'est nous qui choisissons le moteur. »',
    choices: [
      { label: 'D\'accord', effects: { relations: { DE: 12 }, loyalty: { armees: -8 } } },
      { label: 'Le moteur sera français', effects: { relations: { DE: -8 }, loyalty: { armees: 8 } } }
    ] },
  { id: 'geo-melonade-migrants', family: 'geo', who: { leader: 'IT' },
    text: '« Je laisse passer les migrants vers Vintimille tant que l\'Europe ne m\'aide pas. »',
    choices: [
      { label: 'Fermer la frontière', effects: { relations: { IT: -10 }, popularite: 2, tension: 2 } },
      { label: 'Accord de répartition', effects: { relations: { IT: 12 }, popularite: -2 } }
    ] },
  { id: 'geo-starmere-manche', family: 'geo', who: { leader: 'GB' },
    text: '« Payez-nous pour garder les plages du Nord, ou nous renvoyons les migrants chez vous. »',
    choices: [
      { label: 'Accepter l\'argent', effects: { dette: -1, relations: { GB: 10 }, popularite: -3 } },
      { label: '« Rejoignez l\'UE ! »', effects: { relations: { GB: -10 }, popularite: 3 } }
    ] },
  { id: 'geo-palestine', family: 'geo', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { notFlags: ['palestine_reconnue'] },
    text: 'Plusieurs pays européens nous pressent de reconnaître officiellement l\'État de Palestine.',
    choices: [
      { label: 'Reconnaître la Palestine', setFlags: ['palestine_reconnue'], effects: { relations: { IL: -20, US: -8, SA: 10, DZ: 10 }, danger: 3 }, campMod: { gauche: { popularite: 5 }, 'extreme-droite': { popularite: -5 } } },
      { label: 'Attendre un accord de paix', effects: { relations: { IL: 5 } }, campMod: { gauche: { popularite: -5 }, 'extreme-gauche': { popularite: -7 } } }
    ] },
  { id: 'geo-zelenskeur-armes', family: 'geo', who: { leader: 'UA' },
    text: '« Il nous faut des missiles longue portée, maintenant. Chaque jour compte. »',
    choices: [
      { label: 'Livrer les missiles', effects: { dette: 3, relations: { UA: 15, RU: -15 }, danger: 4 } },
      { label: 'Aide humanitaire seulement', effects: { dette: 1, relations: { UA: -8 } } }
    ] },
  { id: 'geo-modidi-rafale', family: 'geo', who: { leader: 'IN' },
    text: '« Nous voulons 100 Rafale de plus. Et des transferts de technologie. Beaucoup. »',
    choices: [
      { label: 'Signer', effects: { dette: -10, relations: { IN: 15, PK: -10 }, loyalty: { armees: 5 } } },
      { label: 'Sans transfert', effects: { dette: -4, relations: { IN: 3 } } }
    ] },
  { id: 'geo-kim-missile', family: 'geo', who: { leader: 'KP' },
    text: '« J\'ai tiré un missile au-dessus du Japon pour fêter mon anniversaire. Envoyez un cadeau. »',
    choices: [
      { label: 'Condamner à l\'ONU', effects: { relations: { KP: -10 }, popularite: 1 } },
      { label: 'Ignorer', effects: { danger: 1 } }
    ] },
  { id: 'geo-netanyahouuu-visite', family: 'geo', who: { leader: 'IL' },
    text: '« Je souhaite venir à Paris pour une visite officielle. Le tapis rouge, s\'il vous plaît. »',
    choices: [
      { label: 'Le recevoir', effects: { relations: { IL: 12 }, tension: 5 }, campMod: { gauche: { popularite: -5 } } },
      { label: 'Refuser', effects: { relations: { IL: -15, US: -4 } }, campMod: { droite: { popularite: -3 } } }
    ] },
  { id: 'geo-khamenouille-otages', family: 'geo', who: { leader: 'IR' },
    text: '« Deux de vos ressortissants sont nos invités en prison. Libérez notre agent, et nous parlerons. »',
    choices: [
      { label: 'Échange de prisonniers', effects: { popularite: 5, relations: { IR: 10, US: -5 } } },
      { label: 'Pas de chantage', effects: { relations: { IR: -10 }, danger: 3, popularite: -2 } }
    ] },
  { id: 'geo-cop', family: 'geo', post: 'ecologie', who: { minister: 'ecologie' },
    text: 'La COP s\'ouvre à Dubaï, chez des pétroliers. On y va ou on boycotte ?',
    choices: [
      { label: 'Y aller en jet', effects: { popularite: -3, relations: { SA: 5 } } },
      { label: 'Y aller en train', effects: { popularite: 3, dette: 0.1 } },
      { label: 'Boycotter', effects: { relations: { SA: -6 }, loyalty: { ecologie: -10 } } }
    ] }
);
