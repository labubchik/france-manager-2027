# France Manager 2027 — Document de conception

*Date : 22 octobre 2026*

## 1. Intention

Un jeu web **fun et satirique** dans lequel tu deviens Président de la République après l'élection de 2027 et tu dois tenir 5 ans. L'esprit « Football Manager » vient du choix du président et du casting du gouvernement. La boucle de jeu, elle, reprend **Reigns** : une carte à la fois, on tranche, les jauges bougent, on enchaîne.

Le **fun** passe avant tout le reste. Ce n'est pas un simulateur économique sérieux. Ce qu'on veut :
- rire des textes et des noms parodiques ;
- sentir que chaque choix coûte quelque chose ;
- avoir envie de relancer une partie avec un autre candidat.

## 2. Objectifs, non-objectifs, anti-objectifs

**Objectifs**
- Une partie complète (5 ans) jouable dans le navigateur, du choix du candidat à la fin.
- Un point de départ sur de **vrais chiffres d'octobre 2026** : dette, baril, conflits.
- Une grande variété d'événements : manifs, grèves, services publics, lois, géopolitique, guerres, presse, allocutions TV.
- De vraies personnalités reconnaissables, avec des **noms parodiques**.
- Une base de cartes facile à enrichir (données séparées du code).

**Non-objectifs (pour la v1)**
- Pas de multijoueur, pas de compte, pas de serveur.
- Pas de modèle économique réaliste : les chiffres bougent selon des règles simples et lisibles.
- Pas d'illustrations dessinées : emojis ou portraits simples dans un premier temps.
- Pas de version mobile native (le site doit cependant rester jouable sur téléphone).

**Anti-objectifs (ce qui rendrait le jeu raté même s'il fonctionne)**
- Un jeu lent, chargé de menus, où on lit des tableaux. On doit pouvoir trancher une carte en quelques secondes.
- Un jeu qui prend parti : tous les camps sont moqués de la même façon.
- Des cartes répétitives : la même carte qui revient trop souvent tue le fun.
- Des choix sans conséquence visible.

## 3. Déroulé d'une partie

1. **Écran titre**, puis « Nouvelle partie » ou « Continuer ».
2. **Choix du candidat** parmi une douzaine de candidats jouables (voir §5).
3. **Composition du gouvernement** : tu choisis un ministre par grand poste parmi une sélection de personnalités (voir §6).
4. **Le mandat** : une suite de cartes de mai 2027 à mai 2032.
5. **La fin** : victoire si tu tiens 5 ans, sinon une des fins de défaite (voir §8). Un écran de bilan conclut la partie.

## 4. La boucle de jeu (style Reigns)

- Une **carte** s'affiche. Elle montre un personnage avec son portrait, son nom parodique et sa fonction ou son pays, puis une situation en une ou deux phrases.
- Le joueur choisit l'une des **deux réponses** (glisser à gauche ou à droite, ou cliquer). Certaines cartes spéciales en ont trois (voir allocutions et presse).
- Avant de valider, le jeu **indique quelles jauges vont bouger**, sans dire dans quel sens, comme dans Reigns.
- Les jauges bougent, puis la carte suivante arrive.
- **Le temps** avance au fil des cartes : environ 1 mois toutes les 3 ou 4 cartes, soit 150 à 200 cartes pour un mandat complet. La date est toujours affichée.
- Une carte peut **déclencher des suites** : un choix ajoute des cartes futures à la pile, par exemple « tu as envoyé les CRS → 2 mois plus tard, carte bavure ».

## 5. Les candidats jouables

Les candidats sont tirés de la liste des déclarés d'octobre 2026, avec des **noms parodiques**. Chacun donne un **bonus et un malus de départ** (jauges initiales différentes, cartes spécifiques). Exemple imposé par l'utilisateur : Jean-Luc Mélenchon devient **« Jean-Luc Aichonchon »**.

Liste de base à parodier (le builder choisit les jeux de mots, sauf celui de Mélenchon) : Marine Le Pen, Raphaël Glucksmann, Jean-Luc Mélenchon, Édouard Philippe, Gabriel Attal, Bruno Retailleau, Éric Zemmour, François Ruffin, Fabien Roussel, Xavier Bertrand, Natacha Polony, Marine Tondelier (vise une douzaine).

## 6. Le gouvernement

- **Postes** (minimum) : Premier ministre, Économie et Finances, Intérieur, Affaires étrangères, Armées, Santé, Éducation, Travail, Écologie et Énergie.
- Pour chaque poste, le joueur choisit parmi **3 ou 4 personnalités réelles parodiées**, issues de tous les bords.
- Chaque ministre a :
  - un **caractère**, parmi : cogneur, gaffeur, ambitieux, loyal, technocrate, populiste… Le caractère change les cartes que le ministre apporte. Un Intérieur « cogneur » propose plus souvent les CRS, un « gaffeur » déclenche des cartes de presse.
  - une **compétence**, qui joue sur l'ampleur des effets positifs de ses propositions ;
  - une **loyauté**, qui monte et descend selon tes choix. À zéro, le ministre peut fuiter dans la presse, comploter ou démissionner avec fracas.
- **Les ministres apportent les cartes** de leur domaine.
- **Remaniement** : on peut virer un ministre, ce qui a des conséquences. Il est remplacé par un autre de la liste du poste. *(Choix du concepteur : on ne vire un ministre que par des cartes, comme la presse, un scandale ou une carte « remaniement » proposée de temps en temps. Il n'y a pas de menu. Un petit panneau en lecture seule permet de consulter le gouvernement, les relations par pays et le soutien à l'Assemblée sans interrompre les cartes.)*
- **Majorité à l'Assemblée** : le casting (bords politiques des ministres) et le candidat déterminent le soutien parlementaire, qui sert pour les votes de lois.

## 7. Les jauges et les indicateurs

**Les jauges principales** (une fin de partie si elles vont trop loin) :

| Jauge | Défaite si… |
|---|---|
| 💶 **Dette** (en milliards d'euros et en % du PIB) | elle dépasse un seuil de faillite : les marchés ne prêtent plus |
| ❤️ **Popularité** | elle tombe trop bas : destitution |
| 🔥 **Tension sociale** | elle monte trop haut : émeutes et chute du régime |
| 🌍 **Relations internationales / danger** | trop d'ennemis puissants : « accident » |

**Les indicateurs du monde**, affichés mais pas directement contrôlés :
- **Prix du baril de Brent** : il évolue selon les événements mondiaux (guerres, Ormuz, OPEP…). Il pèse sur la dette, le prix à la pompe et la tension sociale.
- **Soutien à l'Assemblée** : il sert aux votes de lois.
- **Relations par pays** (États-Unis, Russie, Chine, Arabie saoudite, Iran, Israël, Ukraine, Allemagne/UE…) : elles influencent les cartes diplomatiques et le risque d'« accident ».

## 8. Les fins

- **Victoire** : 5 ans tenus. Un écran final raconte si tu es réélu, d'après tes jauges, avec un bilan façon « livre d'histoire » moqueur.
- **Faillite** : la dette explose et le FMI débarque.
- **Destitution** : popularité au plancher. *(Choix du concepteur : l'Assemblée n'est pas une condition de défaite séparée. Des lois rejetées en série font baisser la popularité.)*
- **Émeutes** : la tension sociale déborde.
- **« Accident »** : un assassinat maquillé, déclenché quand la jauge 🌍 Danger atteint son seuil. *(Choix du concepteur : 🌍 Danger est une jauge à part entière, qui ne se calcule pas à partir des relations par pays. Les cartes la font monter directement : humilier une puissance, trahir un ministre devenu déloyal, fâcher un « lobby » comme les pétroliers, les narcos ou les marchands d'armes. Les lobbies ne sont que de la saveur dans les textes des cartes, pas un système. Le seuil est fixe, et un ministre trahi ne déclenche jamais la fin à lui seul.)* Il est annoncé par une fausse version officielle absurde (« Le Président a glissé dans sa baignoire »).

- **Apocalypse nucléaire** *(demandée par l'utilisateur)* : si la tension avec une puissance nucléaire devient trop forte, ça finit en guerre nucléaire. *(Choix du concepteur sur le mécanisme : quand la relation avec une puissance nucléaire (Russie, Chine, États-Unis, Corée du Nord, Iran si le programme aboutit, Pakistan, Inde, Israël) tombe au minimum pendant une crise ouverte, une carte « point de non-retour » apparaît. La mauvaise réponse déclenche la fin, ce qui laisse toujours une dernière chance de désescalade. Le texte reste dans l'absurde (« Bilan du mandat : introuvable »), sans montrer de victimes.)*

Chaque fin a son écran, son texte drôle et un rappel du nombre de jours tenus.

## 9. Les familles de cartes

1. **Manifs et grèves** : céder (coûte de l'argent), négocier, ou **envoyer les CRS** (calme vite, mais fait baisser la popularité et risque de déraper).
2. **Services publics** : hôpitaux, école, SNCF, police, justice. Investir alourdit la dette, couper la réduit mais fait monter la colère.
3. **Lois** : un ministre propose une loi, tu décides de la porter ou non, puis le vote passe ou échoue selon le soutien à l'Assemblée. Le 49.3 reste possible, à un coût.
4. **Géopolitique** : des dirigeants étrangers avec des noms parodiques font des demandes (contrats, alliances, menaces, reconnaissance de la Palestine, ventes d'armes, droits de douane…). Le pays doit toujours être clairement indiqué, avec drapeau et nom du pays.
5. **Guerres et crises mondiales** : basées sur les tensions réelles d'octobre 2026, elles peuvent escalader ou se calmer selon tes choix et le hasard (voir §11).
6. **Presse** : une « Une de journal » rapporte une déclaration idiote d'un opposant ou d'un de tes ministres. Tu choisis : **recadrer**, **ignorer**, **contre-attaquer**, ou **virer** (ministre uniquement). *(Choix du concepteur : une carte de presse propose au maximum 3 réponses parmi ces 4, selon qu'il s'agit d'un ministre ou d'un opposant.)*
7. **Allocutions TV** : une séquence spéciale en 2 ou 3 étapes (le ton, puis l'annonce). C'est une arme puissante mais limitée, avec environ 4 ou 5 allocutions par mandat. Elle est proposée après une grosse crise ou avant une grande loi.
8. **Événements aléatoires du monde** : variations du baril, catastrophes, scandales, faits divers absurdes.
9. **Immigration** : par exemple « une vague de X migrants arrive à Lampedusa / sur les côtes de la Manche / via la Méditerranée ». Le nombre X est tiré au hasard et peut grossir selon les guerres en cours (Soudan, Moyen-Orient, Sahel…). Les choix possibles : accueillir, répartir dans les régions, fermer les frontières, négocier avec l'UE ou le pays de départ, payer un pays tiers… Ils jouent sur la popularité (différemment selon le candidat choisi), la tension sociale, la dette et les relations avec l'UE, l'Italie et le Royaume-Uni.
10. **Sujets brûlants de l'actualité française** *(demandé par l'utilisateur : « des trucs bien d'actualité »)*. Ils reviennent régulièrement, avec des cartes inspirées des débats réels de 2026 :
    - insécurité et narcotrafic (Marseille, points de deal) ;
    - retraites ;
    - pouvoir d'achat et prix de l'essence (liés au baril) ;
    - colère des agriculteurs (tracteurs, Mercosur) ;
    - Nouvelle-Calédonie ;
    - canicules, sécheresses et inondations ;
    - nucléaire et énergie ;
    - laïcité ;
    - IA et emploi ;
    - logement ;
    - déserts médicaux.

    Le builder peut ajouter d'autres sujets d'actualité. Le principe : le joueur doit reconnaître les débats qu'il voit à la télé.

## 10. Ton et noms parodiques

- Tous les personnages réels ont un **nom parodique** reconnaissable : candidats, ministres, opposants, dirigeants étrangers. Les jeux de mots peuvent être volontairement mauvais (« jeux de mots de merde », dixit l'utilisateur).
- Le seul nom imposé est **Jean-Luc Aichonchon** pour Mélenchon. Exemples d'idées pour le reste : « Donald Tromp » 🇺🇸 États-Unis, « Vladimir Poutrine » 🇷🇺 Russie.
- Les **dirigeants étrangers affichent toujours le drapeau et le nom de leur pays** pour qu'on sache de qui il s'agit.
- La satire vise tout le monde de façon égale, sans prendre parti.
- **Les vraies guerres** (Gaza, Ukraine, Soudan, Iran…) *(décidé par l'utilisateur)* : il n'y a pas d'humour sur la guerre ni sur les victimes. Les cartes de guerre posent des **choix simples et sobres** : condamner, rester neutre, sanctionner, livrer des armes, envoyer des troupes, prendre part au conflit, proposer une médiation, reconnaître un État. L'humour peut porter sur les politiques et leurs réactions (chantage d'un dirigeant, gaffe d'un ministre), jamais sur les morts, les réfugiés ou les victimes. Rien de gênant.
- Les textes sont courts et piquants : 1 ou 2 phrases par carte, et des réponses en quelques mots.

## 11. Données réelles de départ (octobre 2026)

- **Dette publique** : 3 595,5 Md€, soit 119,0 % du PIB, fin juin 2026 (Insee, publication du 29/09/2026). Bercy prévoit 121,7 % en 2027. Le jeu démarre en mai 2027 avec une valeur extrapolée d'environ 3 700 Md€ *(choix du concepteur)*.
- **Brent** : environ 110 $ le baril (22/10/2026), poussé par la guerre dans le Golfe et le blocage du détroit d'Ormuz.
- **Foyers de tension à modéliser** :
  - Golfe et Iran : détroit d'Ormuz, conflit dans son 7e mois ;
  - Israël, Gaza (trêve fragile depuis le 10/10) et Liban ;
  - Russie-Ukraine (négociations en cours) ;
  - Chine-États-Unis, avec Taïwan ;
  - Soudan ;
  - Pakistan-Afghanistan ;
  - Sahel ;
  - émeutes en France (mairie de Limoges incendiée le 17/10/2026).
- Le jeu peut afficher un écran « situation au départ » qui résume ces faits.

## 12. Technique (choix du concepteur)

- **Jeu web statique** en HTML, CSS et JavaScript, qui s'ouvre dans le navigateur, sans serveur ni compte.
- **Sauvegarde automatique** dans le navigateur (localStorage), avec possibilité de reprendre la partie.
- **Les cartes, personnages, candidats et ministres sont dans des fichiers de données** (JSON ou modules JS) séparés du moteur, pour pouvoir en ajouter facilement.
- Jouable à la souris, au clavier (flèches gauche/droite) et au toucher (glissement sur mobile).
- Visuels : emojis ou portraits simples, palette bleu-blanc-rouge.

## 13. Laissé au builder

- Les jeux de mots exacts des noms parodiques (sauf Aichonchon).
- Les valeurs chiffrées : seuils de défaite, ampleur des effets, vitesse d'évolution du baril.
- Le nombre exact de cartes de la v1. Il en faut assez pour qu'un mandat complet ne soit pas répétitif : **au moins 150 cartes uniques** visé. *(Choix du concepteur : ces 150 cartes forment un tronc commun. S'y ajoutent 3 à 5 cartes spécifiques par candidat. Pour les ministres, le caractère est un tag qui change le poids des cartes existantes et le texte de certaines réponses, pas un jeu de cartes séparé par ministre.)*
- *(Choix du concepteur)* Le jeu doit fonctionner en ouvrant simplement `index.html` par double-clic, sans serveur local. Les données et le code sont donc en scripts JS classiques (`<script src>`), sans `import` ES ni JSON chargé par fetch, car les deux sont bloqués en `file://`.
- L'architecture du code et le découpage en fichiers.
- Le détail visuel.
