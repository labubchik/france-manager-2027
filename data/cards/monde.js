var FM = (globalThis.FM = globalThis.FM || {});

// Événements du monde : baril, catastrophes, scandales et faits divers absurdes.
FM.CARDS.push(
  { id: 'monde-opep-baisse', family: 'monde', who: { leader: 'SA' },
    text: '« L\'OPEP va ouvrir les vannes. Le baril va baisser… si vous signez quelques contrats. »',
    choices: [
      { label: 'Signer les contrats', effects: { baril: -12, relations: { SA: 10 }, popularite: -2 } },
      { label: 'Non merci', effects: { baril: -3, relations: { SA: -5 } } }
    ] },
  { id: 'monde-opep-hausse', family: 'monde', who: { name: 'Un trader de la City', role: 'Marchés pétroliers', portrait: '📈' },
    text: 'L\'OPEP réduit sa production. Le baril s\'envole, les marchés paniquent.',
    choices: [
      { label: 'Puiser dans les stocks', effects: { baril: -4, dette: 1 } },
      { label: 'Laisser faire', effects: { baril: 10, tension: 3 } }
    ] },
  { id: 'monde-ormuz-rouvert', family: 'monde', who: { name: 'L\'Organisation maritime internationale', role: 'ONU', portrait: '🚢' },
    when: { war: { golfe: 3 } },
    text: 'Un premier convoi de pétroliers a franchi Ormuz. Fragile accalmie sur les marchés.',
    choices: [
      { label: 'Saluer l\'accord', effects: { baril: -10, wars: { golfe: -1 } } },
      { label: 'Rester prudent', effects: { baril: -5 } }
    ] },
  { id: 'monde-agence-notation', family: 'monde', who: { name: 'Une analyste de Moudy\'s', role: 'Agence de notation', portrait: '🏦' },
    when: { min: { dette: 122 } },
    text: 'Nous dégradons la note de la France. Vos taux d\'intérêt vont grimper.',
    choices: [
      { label: 'Annoncer des économies', effects: { dette: -6, tension: 6, popularite: -3 } },
      { label: '« Les agences se trompent »', effects: { dette: 12, popularite: 1 } }
    ] },
  { id: 'monde-tempete', family: 'monde', who: { name: 'Météo-France', role: 'Vigilance rouge', portrait: '🌪️' },
    text: 'Une tempête historique ravage la Bretagne. 500 000 foyers sans électricité.',
    choices: [
      { label: 'Catastrophe naturelle', effects: { dette: 3, popularite: 4 } },
      { label: 'Venir en bottes', effects: { popularite: 2, dette: 1 } }
    ] },
  { id: 'monde-feux-foret', family: 'monde', post: 'interieur', who: { minister: 'interieur' },
    when: { minMonth: 2 },
    text: 'Les Landes brûlent : 30 000 hectares partis en fumée. Il manque des Canadair.',
    choices: [
      { label: 'Acheter 12 Canadair', effects: { dette: 1, popularite: 3 } },
      { label: 'Louer à l\'étranger', effects: { popularite: -2, relations: { IT: 3 } } }
    ] },
  { id: 'monde-pandemie', family: 'monde', post: 'sante', who: { minister: 'sante' },
    text: 'Un nouveau virus respiratoire circule. Pas de panique… pour l\'instant.',
    choices: [
      { label: 'Masques et vigilance', effects: { dette: 1, popularite: 1, tension: 1 } },
      { label: 'Confinement préventif', effects: { dette: 8, popularite: -6, tension: 8 } }
    ] },
  { id: 'monde-scandale-tournedos', family: 'monde', who: { name: 'Un chef étoilé', role: 'Gastronomie française', portrait: '👨‍🍳' },
    text: 'Une fuite révèle que le dîner d\'État pour le roi d\'Angleterre a coûté 450 000 €.',
    choices: [
      { label: 'Assumer, c\'est la France', effects: { popularite: -3, relations: { GB: 5 } } },
      { label: 'Diffuser une vidéo de vous en pâtes', effects: { popularite: 2 } }
    ] },
  { id: 'monde-jo-dette', family: 'monde', who: { name: 'Tony Estanguette', role: 'Héritage des JO', portrait: '🏅' },
    text: 'Les JO d\'hiver dans les Alpes en 2030 coûteront 2 milliards de plus que prévu.',
    choices: [
      { label: 'Payer', effects: { dette: 2, popularite: 1 } },
      { label: 'Version low cost', effects: { popularite: -2, dette: -0.5 } }
    ] },
  { id: 'monde-ovni', family: 'monde', who: { name: 'Un gendarme du Cantal', role: 'Brigade de Murat', portrait: '🛸' },
    text: 'Des lumières étranges au-dessus du Cantal. Les réseaux sociaux s\'emballent.',
    choices: [
      { label: 'Déclassifier les dossiers', effects: { popularite: 3 } },
      { label: 'C\'était un ballon météo', effects: { popularite: -1 } }
    ] },
  { id: 'monde-baguette', family: 'monde', who: { name: 'Le président des boulangers', role: 'Confédération de la boulangerie', portrait: '🥖' },
    text: 'La baguette passe à 1,50 €. C\'est la panique nationale.',
    choices: [
      { label: 'Bouclier baguette', effects: { dette: 1, popularite: 4 } },
      { label: 'Manger des biscottes', effects: { popularite: -5, tension: 4 } }
    ] },
  { id: 'monde-elon', family: 'monde', who: { name: 'Elon Muskadet', role: 'Milliardaire', portrait: '🚀' },
    text: '« Je construis une gigafactory en France si vous supprimez le droit du travail. Et je veux un château. »',
    choices: [
      { label: 'Dérouler le tapis rouge', effects: { dette: -3, popularite: -3, relations: { US: 5 } } },
      { label: 'Refuser', effects: { popularite: 3, relations: { US: -3 } } }
    ] },
  { id: 'monde-loto', family: 'monde', post: 'economie', who: { minister: 'economie' },
    text: 'Idée géniale : un Loto spécial « Rembourser la dette » avec un dîner à l\'Élysée à gagner.',
    choices: [
      { label: 'Lancer le Loto', effects: { dette: -2, popularite: 1 } },
      { label: 'C\'est ridicule', effects: { loyalty: { economie: -3 } } }
    ] },
  { id: 'monde-tour-de-france', family: 'monde', who: { name: 'Le directeur du Tour de France', role: 'Cyclisme', portrait: '🚴‍♂️' },
    text: 'Le Tour de France veut faire étape devant l\'Élysée. Vous montez sur le podium ?',
    choices: [
      { label: 'Monter sur le podium', effects: { popularite: 3 } },
      { label: 'Trop de risques de sifflets', effects: { popularite: -1 } }
    ] },
  { id: 'monde-krach', family: 'monde', who: { name: 'Un trader de la City', role: 'Marchés financiers', portrait: '📉' },
    when: { minMonth: 10 },
    text: 'Krach boursier mondial : la bulle de l\'IA éclate. Le CAC 40 perd 18 % en une semaine.',
    choices: [
      { label: 'Plan de relance', effects: { dette: 15, popularite: 3, tension: -3 } },
      { label: 'Laisser le marché purger', effects: { tension: 8, popularite: -4 } }
    ] },
  { id: 'monde-coupe-du-monde', family: 'monde', who: { name: 'Didier Des-champions', role: 'Sélectionneur', portrait: '⚽' },
    when: { minMonth: 12, maxMonth: 16 },
    text: 'Les Bleus sont en finale de la Coupe du monde ! Vous allez au stade ?',
    choices: [
      { label: 'Aller au stade', effects: { popularite: 5, dette: 0.1 } },
      { label: 'Regarder à l\'Élysée', effects: { popularite: 1 } }
    ] },
  { id: 'monde-hacker-elysee', family: 'monde', who: { name: 'Un hacker de 16 ans', role: 'Depuis sa chambre', portrait: '🧑‍💻' },
    text: 'Le compte X de l\'Élysée a été piraté. Il publie des recettes de crêpes depuis ce matin.',
    choices: [
      { label: 'L\'embaucher à l\'ANSSI', effects: { popularite: 3, danger: -1 } },
      { label: 'Porter plainte', effects: { popularite: -1 } }
    ] },
  { id: 'monde-canicule-tourisme', family: 'monde', who: { name: 'La ministre du Tourisme', role: 'Secrétariat d\'État', portrait: '🏖️' },
    text: 'Record de touristes : 100 millions de visiteurs. Mais Paris est saturé.',
    choices: [
      { label: 'Taxe touristique', effects: { dette: -1, popularite: 1, relations: { US: -1 } } },
      { label: 'Plus il y en a, mieux c\'est', effects: { dette: -0.5, tension: 2 } }
    ] }
);
