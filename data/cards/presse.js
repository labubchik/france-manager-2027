var FM = (globalThis.FM = globalThis.FM || {});

// La Une : les opposants et vos propres ministres disent des bêtises.
// Opposant → recadrer / ignorer / contre-attaquer. Ministre → recadrer / ignorer / virer.
FM.CARDS.push(
  { id: 'presse-aichonchon-insulte', family: 'presse', who: { name: 'Jean-Luc Aichonchon', role: 'Chef de l\'opposition', portrait: '📢' },
    when: { notCandidate: 'aichonchon' },
    text: '« Ce Président est un petit marquis poudré qui gouverne pour les rentiers ! » La phrase tourne partout.',
    choices: [
      { label: 'Ignorer', effects: { popularite: -2 } },
      { label: 'Contre-attaquer', effects: { popularite: 2, tension: 4 } },
      { label: 'Répondre avec humour', effects: { popularite: 3 } }
    ] },
  { id: 'presse-lepain-sondage', family: 'presse', who: { name: 'Marine Le Pain', role: 'Opposition', portrait: '🥖' }, when: { notCandidate: 'lepain' },
    text: '« Les Français regrettent déjà leur vote », lance-t-elle en brandissant un sondage.',
    choices: [
      { label: 'Ignorer', effects: { popularite: -1 } },
      { label: 'Contre-attaquer', effects: { popularite: 1, tension: 3 } },
      { label: 'Publier vos propres sondages', effects: { popularite: 2, dette: 0.1 } }
    ] },
  { id: 'presse-bardebile-tiktok', family: 'presse', who: { name: 'Jordan Bardébile', role: 'Star de TikTok', portrait: '🤳' },
    text: 'Une vidéo TikTok de 45 secondes vous ridiculise : 12 millions de vues.',
    choices: [
      { label: 'Faire votre propre TikTok', effects: { popularite: 3, tension: -1 } },
      { label: 'Ignorer', effects: { popularite: -3 } }
    ] },
  { id: 'presse-retropedalo', family: 'presse', who: { name: 'Bruno Rétropédalo', role: 'Opposition', portrait: '🚲' }, when: { notCandidate: 'retropedalo' },
    text: '« Le laxisme de ce gouvernement est criminel », déclare-t-il au JDD après un fait divers.',
    choices: [
      { label: 'Ignorer', effects: { popularite: -2 } },
      { label: 'Contre-attaquer', effects: { popularite: 1, tension: 3 } },
      { label: 'Annoncer des mesures', effects: { popularite: 2, dette: 1, danger: -1 } }
    ] },
  { id: 'presse-hollande', family: 'presse', who: { name: 'François Hollandouille', role: 'Ancien Président', portrait: '🛵' },
    text: 'Dans un livre, l\'ancien Président explique qu\'il « aurait fait mieux, et en scooter ».',
    choices: [
      { label: 'Ignorer', effects: {} },
      { label: 'Contre-attaquer', effects: { popularite: 2 } }
    ] },
  { id: 'presse-sarkozy', family: 'presse', who: { name: 'Nicolas Sarkoze-Tout', role: 'Ancien Président', portrait: '🕴️' },
    text: 'Entre deux procès, il confie au Figaro : « Ce Président n\'a pas l\'étoffe. »',
    choices: [
      { label: 'Ignorer', effects: { popularite: -1 } },
      { label: 'Rappeler ses procès', effects: { popularite: 2, tension: 2 }, campMod: { droite: { popularite: -4 } } }
    ] },
  { id: 'presse-hanouna', family: 'presse', who: { name: 'Cyril Hanounouille', role: 'Animateur télé', portrait: '🎤' },
    text: 'Votre ministre est la tête de Turc de l\'émission phare. Les jeunes adorent.',
    choices: [
      { label: 'Aller sur le plateau', effects: { popularite: 3, tension: 1 }, campMod: { gauche: { popularite: -3 } } },
      { label: 'Ignorer', effects: { popularite: -2 } }
    ] },
  { id: 'presse-gaffe-ministre', family: 'presse', post: 'economie', who: { minister: 'economie' },
    when: { trait: 'gaffeur' },
    text: 'Votre ministre, au micro : « 1 500 € par mois, on vit très bien, il suffit de ne pas acheter de bêtises. »',
    choices: [
      { label: 'Recadrer', effects: { popularite: -1, loyalty: { economie: -12 } } },
      { label: 'Ignorer', effects: { popularite: -6, tension: 5 } },
      { label: 'Virer', fire: 'economie', effects: { popularite: 3, assemblee: -2 } }
    ] },
  { id: 'presse-gaffe-sante', family: 'presse', post: 'sante', who: { minister: 'sante' },
    when: { trait: 'gaffeur' },
    text: 'Votre ministre de la Santé conseille aux malades « d\'éviter les urgences le week-end, c\'est bondé ».',
    choices: [
      { label: 'Recadrer', effects: { popularite: -1, loyalty: { sante: -12 } } },
      { label: 'Ignorer', effects: { popularite: -5, tension: 3 } },
      { label: 'Virer', fire: 'sante', effects: { popularite: 3 } }
    ] },
  { id: 'presse-gaffe-education', family: 'presse', post: 'education', who: { minister: 'education' },
    when: { trait: 'gaffeur' },
    text: '« Les profs travaillent trop peu », déclare votre ministre de l\'Éducation sur BFM.',
    choices: [
      { label: 'Recadrer', effects: { tension: -2, loyalty: { education: -12 } } },
      { label: 'Ignorer', effects: { tension: 7, popularite: -2 } },
      { label: 'Virer', fire: 'education', effects: { popularite: 2, tension: -4 } }
    ] },
  { id: 'presse-gaffe-etrangeres', family: 'presse', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { trait: 'gaffeur' },
    text: 'Votre ministre des Affaires étrangères confond l\'Autriche et l\'Australie en conférence de presse.',
    choices: [
      { label: 'Recadrer', effects: { loyalty: { etrangeres: -10 } } },
      { label: 'En rire', effects: { popularite: 1, relations: { DE: -2 } } },
      { label: 'Virer', fire: 'etrangeres', effects: { popularite: 2 } }
    ] },
  { id: 'presse-gaffe-ecologie', family: 'presse', post: 'ecologie', who: { minister: 'ecologie' },
    when: { trait: 'gaffeur' },
    text: 'Votre ministre de l\'Écologie déclare que « le barbecue est un symbole de virilité toxique ». Le pays s\'enflamme.',
    choices: [
      { label: 'Recadrer', effects: { popularite: 1, loyalty: { ecologie: -12 } } },
      { label: 'Ignorer', effects: { popularite: -4, tension: 3 } },
      { label: 'Virer', fire: 'ecologie', effects: { popularite: 3 }, campMod: { gauche: { popularite: -3 } } }
    ] },
  { id: 'presse-ambitieux-interview', family: 'presse', post: 'interieur', who: { minister: 'interieur' },
    when: { trait: 'ambitieux' },
    text: 'Dans Le Parisien, votre ministre de l\'Intérieur : « Moi, Président ? J\'y pense en me rasant. »',
    choices: [
      { label: 'Recadrer', effects: { loyalty: { interieur: -15 } } },
      { label: 'Ignorer', effects: { popularite: -2, danger: 2 } },
      { label: 'Virer', fire: 'interieur', effects: { popularite: 1, assemblee: -3 } }
    ] },
  { id: 'presse-canard', family: 'presse', who: { name: 'Le Canard Enchaîné-mais-libre', role: 'Hebdomadaire satirique', portrait: '🦆' },
    text: 'Révélation : les travaux de l\'Élysée ont coûté 2 millions, dont 400 000 € de vaisselle.',
    choices: [
      { label: 'S\'excuser', effects: { popularite: -1 } },
      { label: 'Nier en bloc', effects: { popularite: -5, tension: 2 } },
      { label: 'Revendre la vaisselle', effects: { popularite: 3, dette: -0.1 } }
    ] },
  { id: 'presse-mediapart', family: 'presse', post: 'premier', who: { minister: 'premier' },
    text: 'Mediapart révèle que votre Premier ministre a des comptes dans un paradis fiscal.',
    choices: [
      { label: 'Soutenir', effects: { popularite: -6, loyalty: { premier: 15 } } },
      { label: 'Exiger des explications', effects: { popularite: -1, loyalty: { premier: -10 } } },
      { label: 'Virer', fire: 'premier', effects: { popularite: 4, assemblee: -4 } }
    ] },
  { id: 'presse-zemoule', family: 'presse', who: { name: 'Éric Zémoule', role: 'Polémiste', portrait: '📚' }, when: { notCandidate: 'zemoule' },
    text: 'Dans son 14e livre, il annonce « le suicide de la France sous votre mandat ».',
    choices: [
      { label: 'Ignorer', effects: {} },
      { label: 'Contre-attaquer', effects: { popularite: 1, tension: 3 }, campMod: { 'extreme-droite': { popularite: -3 } } }
    ] },
  { id: 'presse-cnews', family: 'presse', who: { name: 'Pascal Pralongue', role: 'Animateur de CNous', portrait: '📡' },
    text: 'Une chaîne d\'info tourne en boucle : « La France est-elle encore gouvernée ? »',
    choices: [
      { label: 'Donner une interview', effects: { popularite: 2 }, campMod: { gauche: { popularite: -3 } } },
      { label: 'Saisir l\'Arcom', effects: { popularite: -1, tension: 2 }, campMod: { droite: { popularite: -3 } } }
    ] }
);
