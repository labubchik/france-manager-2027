var FM = (globalThis.FM = globalThis.FM || {});

// Guerres réelles : choix sobres, aucun humour sur la guerre ni sur les victimes.
FM.CARDS.push(
  { id: 'guerre-ormuz-escorte', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    when: { war: { golfe: 3 } },
    text: 'Le détroit d\'Ormuz reste bloqué. Nos alliés proposent une mission navale d\'escorte des pétroliers.',
    choices: [
      { label: 'Envoyer la Marine', effects: { dette: 3, baril: -8, danger: 6, relations: { IR: -15, US: 8, SA: 8 } } },
      { label: 'Rester en retrait', effects: { baril: 3, relations: { US: -6 } } },
      { label: 'Proposer une médiation', effects: { danger: -2, relations: { IR: 6, US: -3 }, wars: { golfe: -1 } } }
    ] },
  { id: 'guerre-golfe-escalade', family: 'guerre', who: { name: 'Le chef d\'état-major des armées', role: 'État-major', portrait: '🎖️' },
    when: { war: { golfe: 4 } },
    text: 'Frappes croisées dans le Golfe. Nos bases aux Émirats sont à portée de missiles.',
    choices: [
      { label: 'Renforcer nos bases', effects: { dette: 2, danger: 4, relations: { IR: -8 } } },
      { label: 'Évacuer les civils français', effects: { dette: 1, danger: -2, popularite: 2 } },
      { label: 'Appeler au cessez-le-feu', effects: { relations: { IR: 4, US: -4 }, wars: { golfe: -1 } } }
    ] },
  { id: 'guerre-iran-bombe', family: 'guerre', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { war: { golfe: 3 }, notFlags: ['iran_bombe'], minMonth: 8 },
    text: 'Nos services estiment que l\'Iran est à quelques semaines de la bombe. Les négociations sont au point mort.',
    choices: [
      { label: 'Relancer la négociation', effects: { relations: { IR: 8, US: -6 }, danger: -2 } },
      { label: 'Sanctions maximales', effects: { relations: { IR: -15 }, baril: 6, danger: 3 }, setFlags: ['iran_bombe'] },
      { label: 'Soutenir des frappes', effects: { relations: { IR: -30, IL: 10, US: 10 }, wars: { golfe: 1 }, danger: 8, baril: 10 } }
    ] },
  { id: 'guerre-ukraine-negos', family: 'guerre', who: { leader: 'UA' },
    when: { war: { ukraine: 2 } },
    text: 'Les pourparlers de paix piétinent. Kiev demande des garanties de sécurité européennes.',
    choices: [
      { label: 'Garanties et soldats', effects: { dette: 6, danger: 8, relations: { UA: 20, RU: -25 } } },
      { label: 'Garanties sans soldats', effects: { dette: 2, relations: { UA: 8, RU: -8 } } },
      { label: 'Pousser au compromis', effects: { relations: { UA: -15, RU: 10, US: 5 }, wars: { ukraine: -1 } } }
    ] },
  { id: 'guerre-ukraine-offensive', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    when: { war: { ukraine: 3 } },
    text: 'Nouvelle offensive russe à l\'est. Kiev réclame en urgence des systèmes antiaériens.',
    choices: [
      { label: 'Livrer des armes', effects: { dette: 3, relations: { UA: 12, RU: -12 }, danger: 3 } },
      { label: 'Sanctionner davantage', effects: { relations: { RU: -8 }, baril: 2 } },
      { label: 'Rester neutre', effects: { relations: { UA: -10, DE: -5 } } }
    ] },
  { id: 'guerre-ukraine-drone', family: 'guerre', who: { name: 'Le chef d\'état-major des armées', role: 'État-major', portrait: '🎖️' },
    when: { war: { ukraine: 4 }, relationBelow: { RU: -60 } },
    text: 'Un drone non identifié a survolé une base nucléaire française en Bretagne.',
    choices: [
      { label: 'Riposte diplomatique', effects: { relations: { RU: -10 }, danger: 3 } },
      { label: 'Demander une enquête de l\'OTAN', effects: { danger: 1, relations: { US: 3 } } },
      { label: 'Ouvrir un canal avec Moscou', effects: { relations: { RU: 10 }, danger: -4, popularite: -3 } }
    ] },
  { id: 'guerre-gaza-treve', family: 'guerre', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { war: { gaza: 2 } },
    text: 'La trêve à Gaza est violée chaque jour. L\'aide humanitaire peine à entrer.',
    choices: [
      { label: 'Condamner fermement', effects: { relations: { IL: -10 } }, campMod: { gauche: { popularite: 3 } } },
      { label: 'Pont aérien humanitaire', effects: { dette: 1, popularite: 2, relations: { IL: -4 } } },
      { label: 'Médiation avec l\'Égypte', effects: { relations: { IL: 2 }, wars: { gaza: -1 } } }
    ] },
  { id: 'guerre-gaza-armes', family: 'guerre', who: { name: 'Une ONG de défense des droits humains', role: 'Amnesty-et-Compagnie', portrait: '📜' },
    when: { war: { gaza: 3 } },
    text: 'Des composants français se retrouvent dans des armes utilisées à Gaza. L\'ONG demande un embargo.',
    choices: [
      { label: 'Suspendre les ventes', effects: { relations: { IL: -15, US: -4 } }, campMod: { gauche: { popularite: 4 }, droite: { popularite: -3 } } },
      { label: 'Contrôles renforcés', effects: { relations: { IL: -3 } } },
      { label: 'Ne rien changer', effects: { relations: { IL: 5 } }, campMod: { gauche: { popularite: -5 }, 'extreme-gauche': { popularite: -7 } } }
    ] },
  { id: 'guerre-liban', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    when: { war: { liban: 2 } },
    text: 'Au Liban, nos 700 casques bleus sont pris entre deux feux.',
    choices: [
      { label: 'Maintenir et renforcer', effects: { dette: 1, danger: 3 } },
      { label: 'Rapatrier nos soldats', effects: { danger: -2, relations: { IL: 3 } } },
      { label: 'Initiative diplomatique', effects: { wars: { liban: -1 }, relations: { IL: -3 } } }
    ] },
  { id: 'guerre-taiwan-blocus', family: 'guerre', who: { leader: 'CN' },
    when: { minMonth: 12 },
    text: '« Exercices militaires » autour de Taïwan : un quasi-blocus. Washington exige un soutien européen.',
    choices: [
      { label: 'Soutenir Washington', effects: { relations: { CN: -18, US: 10 }, wars: { taiwan: 1 }, danger: 3 } },
      { label: 'Appeler au calme', effects: { relations: { US: -6 } } },
      { label: 'Envoyer une frégate', effects: { relations: { CN: -25, US: 15 }, wars: { taiwan: 1 }, danger: 6 } }
    ] },
  { id: 'guerre-taiwan-puces', family: 'guerre', post: 'economie', who: { minister: 'economie' },
    when: { war: { taiwan: 2 } },
    text: 'La crise de Taïwan bloque les puces électroniques : les usines Renault et Airbus s\'arrêtent.',
    choices: [
      { label: 'Usine de puces en France', effects: { dette: 10, popularite: 2 } },
      { label: 'Chômage partiel', effects: { dette: 4, tension: 3 } }
    ] },
  { id: 'guerre-soudan', family: 'guerre', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { war: { soudan: 3 } },
    text: 'Au Soudan, la guerre s\'étend au Darfour. Des millions de personnes ont fui.',
    choices: [
      { label: 'Aide humanitaire massive', effects: { dette: 1, popularite: 1 } },
      { label: 'Sanctionner les belligérants', effects: { relations: { SA: -4 }, wars: { soudan: -1 } } },
      { label: 'Ne pas s\'en mêler', effects: { wars: { soudan: 1 } } }
    ] },
  { id: 'guerre-sahel', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    when: { war: { sahel: 2 } },
    text: 'Les juntes du Sahel perdent du terrain face aux groupes armés. Nos anciens partenaires appellent à l\'aide.',
    choices: [
      { label: 'Renvoyer des troupes', effects: { dette: 3, danger: 5, wars: { sahel: -1 } } },
      { label: 'Formation et renseignement', effects: { dette: 1, danger: 1 } },
      { label: 'Rester à l\'écart', effects: { wars: { sahel: 1 }, danger: 2 } }
    ] },
  { id: 'guerre-pakafghan', family: 'guerre', post: 'etrangeres', who: { minister: 'etrangeres' },
    when: { war: { pakafghan: 2 } },
    text: 'Les affrontements reprennent à la frontière Pakistan-Afghanistan malgré la trêve du Qatar.',
    choices: [
      { label: 'Soutenir la médiation', effects: { relations: { PK: 5 }, wars: { pakafghan: -1 } } },
      { label: 'Rester neutre', effects: {} }
    ] },
  { id: 'guerre-cyberattaque', family: 'guerre', who: { name: 'Le directeur de l\'ANSSI', role: 'Cybersécurité', portrait: '💻' },
    text: 'Une cyberattaque paralyse trois hôpitaux et la SNCF. La piste étatique est privilégiée.',
    choices: [
      { label: 'Accuser publiquement', effects: { relations: { RU: -10 }, danger: 3, popularite: 2 } },
      { label: 'Riposte discrète', effects: { dette: 1, danger: -2 } },
      { label: 'Renforcer nos défenses', effects: { dette: 3, danger: -3 } }
    ] },
  { id: 'guerre-fregate', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    when: { war: { golfe: 3 } },
    text: 'Une frégate française a été visée par un drone en mer Rouge. Pas de blessés.',
    choices: [
      { label: 'Riposter', effects: { danger: 5, relations: { IR: -10 }, popularite: 3 } },
      { label: 'Retirer la frégate', effects: { danger: -2, baril: 2, popularite: -2 } }
    ] },
  { id: 'guerre-opex-otages', family: 'guerre', post: 'armees', who: { minister: 'armees' },
    text: 'Deux humanitaires français ont été enlevés au Sahel. Les forces spéciales sont prêtes.',
    choices: [
      { label: 'Opération de libération', effects: { danger: 3, popularite: 4 } },
      { label: 'Négocier discrètement', effects: { dette: 0.5, popularite: 1, danger: 1 } }
    ] }
);
