var FM = (globalThis.FM = globalThis.FM || {});

// Cartes propres à chaque candidat : ses tics, ses promesses, ses casseroles.
FM.CARDS.push(
  // Marine Le Pain
  { id: 'cand-lepain-frexit', family: 'candidat', when: { candidate: 'lepain' }, who: { name: 'Un conseiller souverainiste', role: 'Votre équipe de campagne', portrait: '🇫🇷' },
    text: 'Vous aviez promis de « renégocier les traités européens ». Bruxelles attend votre lettre.',
    choices: [
      { label: 'Bras de fer avec Bruxelles', effects: { relations: { DE: -15 }, popularite: 4, dette: 6 } },
      { label: 'Oublier discrètement', effects: { popularite: -5, relations: { DE: 5 } } }
    ] },
  { id: 'cand-lepain-assistants', family: 'candidat', when: { candidate: 'lepain', minMonth: 4 }, who: { name: 'Un juge du tribunal correctionnel', role: 'Affaire des assistants parlementaires', portrait: '⚖️' },
    text: 'L\'affaire des assistants parlementaires revient dans la presse. L\'opposition parle d\'« immunité de confort ».',
    choices: [
      { label: 'Dénoncer un complot', effects: { tension: 5, popularite: 1 } },
      { label: 'Profil bas', effects: { popularite: -2 } }
    ] },
  { id: 'cand-lepain-tva', family: 'candidat', when: { candidate: 'lepain' }, post: 'economie', who: { minister: 'economie' },
    text: 'Votre promesse phare : TVA à 0 % sur 100 produits de première nécessité. Coût : 12 milliards.',
    choices: [
      { label: 'Tenir la promesse', effects: { deficit: 12, popularite: 7, tension: -4 } },
      { label: 'Promesse divisée par deux', effects: { deficit: 6, popularite: 2 } }
    ] },
  { id: 'cand-lepain-chats', family: 'candidat', when: { candidate: 'lepain' }, who: { name: 'Votre chargé de com', role: 'Élysée', portrait: '🐈' },
    text: 'Une vidéo de vous et vos chats à l\'Élysée ferait exploser les compteurs. On tourne ?',
    choices: [
      { label: 'Action !', effects: { popularite: 4 } },
      { label: 'Restons présidentiels', effects: { popularite: -1 } }
    ] },

  // Raphaël Glucksmoule
  { id: 'cand-glucksmoule-europe', family: 'candidat', when: { candidate: 'glucksmoule' }, who: { leader: 'DE' },
    text: '« Cher Raphaël, vous êtes le plus européen des Français. Un emprunt commun pour la défense ? »',
    choices: [
      { label: 'Signer des deux mains', effects: { dette: -6, relations: { DE: 12 }, danger: -3 }, campMod: { gauche: { popularite: -1 } } },
      { label: 'Prendre le temps', effects: { relations: { DE: -4 } } }
    ] },
  { id: 'cand-glucksmoule-ouvriers', family: 'candidat', when: { candidate: 'glucksmoule' }, who: { name: 'Un ouvrier de Florange', role: 'Sidérurgie', portrait: '🏭' },
    text: '« Vous parlez bien de l\'Ukraine, mais nous, ici, vous nous connaissez ? »',
    choices: [
      { label: 'Visiter l\'usine', effects: { popularite: 4, tension: -2 } },
      { label: 'Envoyer un ministre', effects: { popularite: -2 } }
    ] },
  { id: 'cand-glucksmoule-ps', family: 'candidat', when: { candidate: 'glucksmoule' }, who: { name: 'Olivier Faurecia', role: 'Premier secrétaire du PS', portrait: '🌹' },
    text: '« Le PS vous a fait roi. Il est temps de nommer nos amis aux postes clés. »',
    choices: [
      { label: 'Nommer les amis', effects: { assemblee: 8, popularite: -4 } },
      { label: 'Refuser le clientélisme', effects: { assemblee: -6, popularite: 3 } }
    ] },

  // Jean-Luc Aichonchon
  { id: 'cand-aichonchon-6e', family: 'candidat', when: { candidate: 'aichonchon' }, who: { name: 'Manuel Bompardon', role: 'Votre bras droit', portrait: '📜' },
    text: 'L\'heure est venue : convoquons l\'Assemblée constituante pour la VIe République !',
    choices: [
      { label: 'Constituante maintenant', setFlags: ['grande_loi'], effects: { tension: 8, assemblee: -10, popularite: 3 } },
      { label: 'Plus tard', effects: { popularite: -3 } }
    ] },
  { id: 'cand-aichonchon-smic', family: 'candidat', when: { candidate: 'aichonchon' }, post: 'economie', who: { minister: 'economie' },
    text: 'SMIC à 1 600 € net, comme promis ? Les marchés tremblent, le peuple attend.',
    choices: [
      { label: 'On applique !', effects: { dette: 15, popularite: 8, tension: -6 } },
      { label: 'Par étapes', effects: { dette: 5, popularite: 2 } }
    ] },
  { id: 'cand-aichonchon-colere', family: 'candidat', when: { candidate: 'aichonchon' }, who: { name: 'Un journaliste de France Inter', role: 'Conférence de presse', portrait: '🎙️' },
    text: '« Monsieur le Président, vos relations avec la presse sont-elles apaisées ? »',
    choices: [
      { label: '« La République, c\'est moi ! »', effects: { popularite: -4, tension: 3 } },
      { label: 'Sourire et respirer', effects: { popularite: 3 } }
    ] },
  { id: 'cand-aichonchon-otan', family: 'candidat', when: { candidate: 'aichonchon' }, who: { leader: 'US' },
    text: '« On me dit que vous voulez quitter l\'OTAN. C\'est une blague ? Répondez vite. »',
    choices: [
      { label: 'Quitter le commandement intégré', effects: { relations: { US: -25 }, popularite: 3, danger: 4 } },
      { label: 'Pas tout de suite', effects: { relations: { US: 5 }, popularite: -2 } }
    ] },

  // Édouard Flipper
  { id: 'cand-flipper-havre', family: 'candidat', when: { candidate: 'flipper' }, who: { name: 'Le maire par intérim du Havre', role: 'Votre ville', portrait: '⚓' },
    text: 'Le Havre réclame un grand port à 2 milliards. « Vous ne pouvez pas oublier les vôtres. »',
    choices: [
      { label: 'Financer le port', effects: { dette: 2, popularite: 1 } },
      { label: 'Pas de favoritisme', effects: { popularite: 1, loyalty: { premier: -3 } } }
    ] },
  { id: 'cand-flipper-barbe', family: 'candidat', when: { candidate: 'flipper' }, who: { name: 'Votre coiffeur', role: 'Élysée', portrait: '🪒' },
    text: 'Votre barbe a blanchi d\'un coup. Les sondages montrent qu\'elle rassure les Français.',
    choices: [
      { label: 'La garder', effects: { popularite: 2 } },
      { label: 'Tout raser', effects: { popularite: -2, tension: -1 } }
    ] },
  { id: 'cand-flipper-rigueur', family: 'candidat', when: { candidate: 'flipper' }, post: 'economie', who: { minister: 'economie' },
    text: 'Vous aviez promis « 100 milliards d\'économies ». On commence où ?',
    choices: [
      { label: 'Par les dépenses sociales', effects: { deficit: -15, tension: 10, popularite: -5 } },
      { label: 'Par les niches fiscales', effects: { deficit: -5, danger: 3 } },
      { label: 'Plus tard', effects: { popularite: -2 } }
    ] },

  // Gabriel Attaque
  { id: 'cand-attaque-jeunes', family: 'candidat', when: { candidate: 'attaque' }, who: { name: 'Votre conseiller com', role: 'Élysée', portrait: '📱' },
    text: 'On lance votre podcast hebdo « Le Président en 15 minutes » ?',
    choices: [
      { label: 'Lancer le podcast', effects: { popularite: 3 } },
      { label: 'Trop gadget', effects: { popularite: -1 } }
    ] },
  { id: 'cand-attaque-macron', family: 'candidat', when: { candidate: 'attaque' }, who: { name: 'Emmanuel Macaron', role: 'Ancien Président', portrait: '🍬' },
    text: '« Gabriel, je reste disponible pour te conseiller. Tous les jours. Je t\'envoie des SMS à 2 h du matin. »',
    choices: [
      { label: 'Écouter le maître', effects: { popularite: -3, assemblee: 4 } },
      { label: 'Couper le cordon', effects: { popularite: 4, assemblee: -3 } }
    ] },
  { id: 'cand-attaque-autorite', family: 'candidat', when: { candidate: 'attaque' }, post: 'education', who: { minister: 'education' },
    text: 'Votre idée de campagne : l\'uniforme obligatoire dans toutes les écoles. On généralise ?',
    choices: [
      { label: 'Généraliser', effects: { dette: 2, popularite: 2, tension: 2 } },
      { label: 'Expérimenter encore', effects: { popularite: -1 } }
    ] },

  // Bruno Rétropédalo
  { id: 'cand-retropedalo-ordre', family: 'candidat', when: { candidate: 'retropedalo' }, post: 'interieur', who: { minister: 'interieur' },
    text: 'Vous aviez promis « l\'ordre partout ». Les maires réclament des policiers, pas des discours.',
    choices: [
      { label: '10 000 policiers', effects: { dette: 6, danger: -4, popularite: 3 } },
      { label: 'Des discours, encore', effects: { popularite: -4 } }
    ] },
  { id: 'cand-retropedalo-vendee', family: 'candidat', when: { candidate: 'retropedalo' }, who: { name: 'Le Puy du Fou-Fou', role: 'Parc historique', portrait: '🏰' },
    text: 'Le Puy du Fou vous propose de jouer Charles Martel dans le nouveau spectacle.',
    choices: [
      { label: 'Monter à cheval', effects: { popularite: 2 }, campMod: { droite: { popularite: 2 } } },
      { label: 'Décliner', effects: {} }
    ] },
  { id: 'cand-retropedalo-wokequiez', family: 'candidat', when: { candidate: 'retropedalo' }, who: { name: 'Laurent Woke-quiez', role: 'Rival chez LR', portrait: '🧥' },
    text: '« Bruno, la droite ne t\'appartient pas. Je prépare 2032. »',
    choices: [
      { label: 'Le neutraliser', effects: { assemblee: -3, danger: 2 } },
      { label: 'Lui offrir un ministère', effects: { assemblee: 4, popularite: -1 } }
    ] },

  // Éric Zémoule
  { id: 'cand-zemoule-remigration', family: 'candidat', when: { candidate: 'zemoule' }, who: { name: 'Sarah Knafouille', role: 'Votre bras droite', portrait: '📣' },
    text: 'Votre ministère de la « Remigration » est prêt. Le Conseil constitutionnel aussi, pour le censurer.',
    choices: [
      { label: 'Créer le ministère', effects: { tension: 12, popularite: 2, relations: { DZ: -20 } } },
      { label: 'Renoncer', effects: { popularite: -6 } }
    ] },
  { id: 'cand-zemoule-livre', family: 'candidat', when: { candidate: 'zemoule' }, who: { name: 'Votre éditeur', role: 'Éditions Rubempré', portrait: '📚' },
    text: 'Votre nouveau livre « La France a tort » sort demain. Promo à l\'Élysée ?',
    choices: [
      { label: 'Signatures à l\'Élysée', effects: { popularite: -3, dette: -0.1 } },
      { label: 'Repousser la sortie', effects: { popularite: 1 } }
    ] },
  { id: 'cand-zemoule-deputes', family: 'candidat', when: { candidate: 'zemoule' }, who: { name: 'Marine Le Pain', role: 'Alliée encombrante', portrait: '🥖' },
    text: '« Sans mes députés, tu ne fais rien passer. Alors on discute du partage des ministères ? »',
    choices: [
      { label: 'Alliance', effects: { assemblee: 15, popularite: -2 } },
      { label: 'Jamais', effects: { assemblee: -5, popularite: 2 } }
    ] },

  // François Ruffian
  { id: 'cand-ruffian-picardie', family: 'candidat', when: { candidate: 'ruffian' }, who: { name: 'Une caissière d\'Amiens', role: 'Votre circonscription', portrait: '🛒' },
    text: '« Vous nous aviez promis de ne pas devenir un Parisien. Alors, ce salaire de Président ? »',
    choices: [
      { label: 'Le baisser de moitié', effects: { popularite: 5 } },
      { label: '« C\'est la fonction »', effects: { popularite: -4 } }
    ] },
  { id: 'cand-ruffian-film', family: 'candidat', when: { candidate: 'ruffian' }, who: { name: 'Votre ancien caméraman', role: 'Documentariste', portrait: '🎥' },
    text: 'On pourrait tourner « Merci Président », un documentaire sur les coulisses de l\'Élysée !',
    choices: [
      { label: 'Tourner', effects: { popularite: 4, danger: 1 } },
      { label: 'Pas de caméras ici', effects: { popularite: -1 } }
    ] },
  { id: 'cand-ruffian-lfi', family: 'candidat', when: { candidate: 'ruffian' }, who: { name: 'Jean-Luc Aichonchon', role: 'Ancien camarade', portrait: '📢' },
    text: '« Tu m\'as trahi, François. Mes députés voteront contre tout ce que tu proposes. »',
    choices: [
      { label: 'Faire la paix', effects: { assemblee: 8, popularite: -2 } },
      { label: 'Assumer la rupture', effects: { assemblee: -4, popularite: 3 } }
    ] },

  // Fabien Rousquette
  { id: 'cand-rousquette-banquet', family: 'candidat', when: { candidate: 'rousquette' }, who: { name: 'Le chef de l\'Élysée', role: 'Cuisines', portrait: '🍷' },
    text: 'Le grand banquet républicain : viande, fromage, vin rouge. Les écolos vont hurler.',
    choices: [
      { label: 'Banquet !', effects: { popularite: 4 }, campMod: { gauche: { popularite: -1 } } },
      { label: 'Menu végétarien', effects: { popularite: -3 } }
    ] },
  { id: 'cand-rousquette-nucleaire', family: 'candidat', when: { candidate: 'rousquette' }, post: 'ecologie', who: { minister: 'ecologie' },
    text: 'Vous êtes un communiste pro-nucléaire. On relance 10 réacteurs ?',
    choices: [
      { label: '10 réacteurs', effects: { dette: 10, popularite: 2, baril: -2 } },
      { label: 'Juste 2', effects: { dette: 3 } }
    ] },
  { id: 'cand-rousquette-pcf', family: 'candidat', when: { candidate: 'rousquette' }, who: { name: 'L\'Humanité-Dimanche', role: 'Journal du parti', portrait: '📰' },
    text: 'Le journal du parti titre : « Le Président oublie la lutte des classes ».',
    choices: [
      { label: 'Nationaliser une autoroute', effects: { dette: 8, popularite: 3 } },
      { label: 'Ignorer', effects: { popularite: -2 } }
    ] },

  // Xavier Bertrempe
  { id: 'cand-bertrempe-hauts-de-france', family: 'candidat', when: { candidate: 'bertrempe' }, who: { name: 'Un élu des Hauts-de-France', role: 'Votre région', portrait: '🍟' },
    text: 'Le Nord veut une usine de batteries à 3 milliards. « Vous nous devez bien ça. »',
    choices: [
      { label: 'Financer', effects: { dette: 3, popularite: 2, tension: -2 } },
      { label: 'Pas de favoritisme', effects: { popularite: -1 } }
    ] },
  { id: 'cand-bertrempe-charisme', family: 'candidat', when: { candidate: 'bertrempe' }, who: { name: 'Un coach en communication', role: 'Conseiller', portrait: '🎭' },
    text: 'Les Français vous trouvent « sérieux mais ennuyeux ». Je propose un passage chez Hanounouille.',
    choices: [
      { label: 'Y aller', effects: { popularite: 3, tension: 1 } },
      { label: 'Rester sérieux', effects: { popularite: -1 } }
    ] },
  { id: 'cand-bertrempe-sante', family: 'candidat', when: { candidate: 'bertrempe' }, post: 'sante', who: { minister: 'sante' },
    text: 'Ancien ministre de la Santé, vous voulez frapper fort : un médecin à moins de 30 minutes pour tous.',
    choices: [
      { label: 'Plan national', effects: { dette: 4, popularite: 4 } },
      { label: 'Trop cher', effects: { popularite: -2 } }
    ] },

  // Natacha Polochon
  { id: 'cand-polochon-souverainete', family: 'candidat', when: { candidate: 'polochon' }, who: { name: 'Un haut fonctionnaire de Bercy', role: 'Direction du Trésor', portrait: '🏛️' },
    text: 'Vous voulez sortir des règles budgétaires européennes ? Il faudrait un référendum.',
    choices: [
      { label: 'Référendum', setFlags: ['grande_loi'], effects: { relations: { DE: -15 }, popularite: 4, tension: 3 } },
      { label: 'Négocier', effects: { relations: { DE: 3 } } }
    ] },
  { id: 'cand-polochon-deputes', family: 'candidat', when: { candidate: 'polochon' }, who: { name: 'Votre directeur de cabinet', role: 'Élysée', portrait: '🛏️' },
    text: 'Sans parti, vous n\'avez aucun député. Il faut acheter, pardon, convaincre des alliés.',
    choices: [
      { label: 'Ouvrir à droite', effects: { assemblee: 10, popularite: -2 } },
      { label: 'Ouvrir à gauche', effects: { assemblee: 10, popularite: -2 } },
      { label: 'Gouverner par référendums', effects: { assemblee: -5, popularite: 3 } }
    ] },
  { id: 'cand-polochon-medias', family: 'candidat', when: { candidate: 'polochon' }, who: { name: 'Un grand patron de presse', role: 'Groupe médiatique', portrait: '🗞️' },
    text: '« Vous qui êtes journaliste, vous savez comment ça marche. Un peu de publicité d\'État ? »',
    choices: [
      { label: 'Refuser', effects: { popularite: 2, danger: 2 } },
      { label: 'Accepter', effects: { popularite: -3, danger: -2 } }
    ] },

  // Marine Tondeuse
  { id: 'cand-tondeuse-vol', family: 'candidat', when: { candidate: 'tondeuse' }, post: 'ecologie', who: { minister: 'ecologie' },
    text: 'Votre promesse : interdire les vols intérieurs quand le train fait moins de 4 heures.',
    choices: [
      { label: 'Interdire', effects: { popularite: 2, tension: 3, dette: -1 } },
      { label: 'Taxer les jets privés', effects: { dette: -2, popularite: 4 } }
    ] },
  { id: 'cand-tondeuse-jardin', family: 'candidat', when: { candidate: 'tondeuse' }, who: { name: 'Le jardinier de l\'Élysée', role: 'Parc présidentiel', portrait: '🌻' },
    text: 'Vous voulez transformer la pelouse de l\'Élysée en potager participatif ?',
    choices: [
      { label: 'Potager !', effects: { popularite: 3 } },
      { label: 'Garder la pelouse', effects: { popularite: -1 } }
    ] },
  { id: 'cand-tondeuse-gauche', family: 'candidat', when: { candidate: 'tondeuse' }, who: { name: 'Raphaël Glucksmoule', role: 'Allié social-démocrate', portrait: '🦪' },
    text: '« Je veux bien vous soutenir à l\'Assemblée, mais il me faut les Affaires étrangères. »',
    choices: [
      { label: 'Accord', effects: { assemblee: 10, loyalty: { etrangeres: -20 } } },
      { label: 'Refuser', effects: { assemblee: -4 } }
    ] }
);
