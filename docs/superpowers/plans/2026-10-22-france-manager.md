# France Manager 2027 — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un jeu web satirique à la Reigns : on est Président de 2027 à 2032, on tranche des cartes et on doit garder 4 jauges hors des zones mortelles.

**Architecture:** Un site statique ouvert par double-clic sur `index.html`. Tout le code est en scripts classiques qui s'accrochent à un espace de noms global `FM` (`globalThis.FM`), sans `import` ES ni `fetch`. Le moteur (fonctions pures + RNG à graine) est séparé de l'UI et des données. Les tests Node chargent les mêmes scripts via `require`, qui les exécute et peuple `globalThis.FM`.

**Tech Stack:** HTML/CSS/JS vanilla (ES2020), Node 22 `node:test` + `node:assert` pour les tests, git.

**Spec:** `docs/superpowers/specs/2026-10-22-france-manager-design.md`

## Global Constraints

- Ouvrable en `file://` par double-clic : uniquement des `<script src>` classiques, pas d'`import`/`export`, pas de `fetch`, aucune dépendance externe ni CDN.
- Chaque fichier JS commence par `var FM = (globalThis.FM = globalThis.FM || {});` et n'ajoute que des propriétés à `FM`.
- Langue du jeu : français. Identifiants de code en anglais, sauf les clés de jauges : `dette`, `popularite`, `tension`, `danger`.
- Noms parodiques pour **toutes** les personnalités réelles ; Mélenchon = **« Jean-Luc Aichonchon »** (imposé). Les dirigeants étrangers affichent toujours drapeau + nom du pays.
- Guerres réelles : aucun humour sur la guerre ni les victimes ; choix sobres (condamner, neutre, sanctionner, livrer des armes, troupes, médiation, reconnaître un État). Satire équilibrée entre tous les camps.
- Textes de carte : 1–2 phrases ; libellés de réponse : quelques mots.
- Données réelles de départ : dette 3 700 Md€ en mai 2027 (extrapolé de 3 595,5 Md€ / 119,0 % du PIB, Insee fin juin 2026), Brent 110 $.
- Mandat : mai 2027 → mai 2032 = 60 mois ; 3 cartes par mois.
- Jouable souris, clavier (← →, et 1/2/3) et tactile (glissement), utilisable à 360 px de large.

## Review Focus

1. **localStorage indisponible ou qui lève** (Firefox en `file://`, navigation privée) → le jeu reste jouable, seule la reprise de partie disparaît. Test : Task 6.
2. **Sauvegarde corrompue ou d'une ancienne version** → ignorée, retour à l'écran titre sans crash. Test : Task 6.
3. **Pioche épuisée** (toutes les cartes éligibles déjà vues récemment) → une carte est toujours tirée, la règle anti-répétition se relâche. Test : Task 4.
4. **Plusieurs fins déclenchées au même tour** → ordre de priorité fixe, une seule fin. Test : Task 3.
5. **Double clic ou glissement pendant l'animation** → un seul choix résolu. Test : Task 8 (verrou dans le contrôleur, testé sans DOM).

---

## Modèle de données (référencé par toutes les tâches)

```js
// GameState
{
  version: 1, seed, rngState,           // RNG sérialisable
  candidateId, camp,                    // camp: 'extreme-gauche'|'gauche'|'centre'|'droite'|'extreme-droite'
  month: 0, cardInMonth: 0,             // month 0 = mai 2027, 60 = fin du mandat
  dette, pib,                           // Md€
  popularite, tension, danger,          // 0..100
  assemblee,                            // 0..100 soutien parlementaire
  baril,                                // $ ; borné 40..200
  relations: { US, RU, CN, SA, IR, IL, UA, DE, IT, GB, DZ, IN, PK, KP }, // -100..100
  wars: { golfe, ukraine, gaza, liban, taiwan, soudan, sahel, pakafghan }, // niveau 0..5
  cabinet: { [post]: { ministerId, loyalty } },  // loyalty 0..100
  usedMinisters: [ministerId],
  tvLeft: 5, lawFailStreak: 0,
  flags: { [name]: true },
  queue: [{ cardId, inCards }],         // suites programmées
  recent: [cardId],                     // 30 derniers ids
  seen: { [cardId]: count },
  log: [string],                        // dernières lignes pour l'écran de bilan
  ending: null | endingId
}

// Card (données)
{
  id: 'social-tracteurs-periph', family: 'social',
  // famille ∈ social|services|hot|lois|presse|tv|geo|guerre|immigration|monde|candidat|ministre|nucleaire
  who: { name: 'Arnaud Rousseau-Tracteur', role: 'Patron de la FNSEA', portrait: '🚜' },
  // ou who: { leader: 'US' } → nom/drapeau/pays lus dans FM.COUNTRIES ;
  // ou who: { minister: 'interieur' } → le ministre en poste.
  text: 'Monsieur le Président, 3 000 tracteurs bloquent le périph. On fait quoi ?',
  post: 'agriculture'?,                 // poste qui « apporte » la carte (pondération par trait)
  when: { minMonth, maxMonth, flags:[], notFlags:[], candidate, camp:[], trait, war:{golfe:3}, tvLeft:true, relationBelow:{RU:-90} }?,
  weight: 1?, once: false?, repeatAfter: 30?,
  choices: [{
    label: 'Céder',
    effects: { dette:+5, popularite:+4, tension:-10, danger:0, assemblee:0, baril:0,
               relations:{US:-10}, loyalty:{interieur:+5}, wars:{golfe:+1} },
    campMod: { 'droite': { popularite:-4 } }?,     // ajouté aux effects selon le camp du candidat
    setFlags: ['crs_envoyes']?, clearFlags: []?,
    followups: [{ cardId: 'social-bavure', inCards: 6 }]?,
    vote: { difficulty: 55, onPass: {effects}, onFail: {effects} }?,  // loi
    use493: true?,                     // force la loi, coût fixe
    fire: 'interieur'?,                // limoge le ministre de ce poste
    tv: true?,                         // consomme une allocution
    ending: 'nucleaire'?               // déclenche directement cette fin
  }]                                    // 2 ou 3 choix
}
```

Effets de `dette` : en Md€. Effets de jauges 0..100 : typiquement ±3 à ±15. Le portrait est un emoji.

---

### Task 1: Squelette, RNG à graine, harnais de test

**Files:**
- Create: `package.json`, `.gitignore`, `js/rng.js`, `tests/helpers/load.js`, `tests/rng.test.js`

**Interfaces:**
- Produces: `FM.createRng(seed: number) -> { next(): number /*[0,1)*/, int(min, max): number /*inclusif*/, pick(arr), chance(p): boolean, state(): number }` ; `FM.createRng(seed, state)` reprend depuis un état sauvegardé. `tests/helpers/load.js` exporte `load(...relPaths) -> FM` qui supprime `globalThis.FM`, vide le cache `require` des fichiers concernés et les `require` dans l'ordre.

- [ ] **Step 1:** `git init`, `.gitignore` contenant `.superpowers/` et `node_modules/`, `package.json` avec `"scripts": { "test": "node --test tests/" }`, sans dépendances.
- [ ] **Step 2: Write the failing test** `tests/rng.test.js` :
  - `same seed gives same sequence` : deux `createRng(42)`, 100 `next()` égaux.
  - `resume from state` : après 10 appels, `createRng(42, r.state())` produit les mêmes 10 valeurs suivantes que `r`.
  - `int is inclusive and bounded` : 1000 tirages de `int(1,3)` sont dans {1,2,3} et chaque valeur apparaît.
- [ ] **Step 3:** Run `npm test` → FAIL (`FM.createRng is not a function`).
- [ ] **Step 4:** Implémenter `js/rng.js` avec mulberry32 (l'état est l'entier 32 bits interne).
- [ ] **Step 5:** Run `npm test` → PASS.
- [ ] **Step 6:** Commit `chore: scaffold project with seeded rng and test harness`.

### Task 2: Données de référence et création de partie

**Files:**
- Create: `data/countries.js`, `data/candidates.js`, `data/ministers.js`, `js/state.js`, `tests/state.test.js`

**Interfaces:**
- Consumes: `FM.createRng`.
- Produces:
  - `FM.START = { dette: 3700, pib: 3085, baril: 110, popularite: 50, tension: 55, danger: 30, assemblee: 45, tvLeft: 5, wars: { golfe:4, ukraine:3, gaza:3, liban:2, taiwan:1, soudan:4, sahel:2, pakafghan:2 } }`
  - `FM.COUNTRIES[code] = { name, flag, leader, nuclear: boolean, startRelation }` pour US, RU, CN, SA, IR, IL, UA, DE, IT, GB, DZ, IN, PK, KP. `nuclear: true` pour US, RU, CN, IL, IN, PK, KP, GB ; IR devient nucléaire si le flag `iran_bombe` est posé.
  - `FM.CANDIDATES = [{ id, name, realName, party, camp, portrait, bonus, malus, start: { popularite?, tension?, danger?, assemblee?, relations?: {} } }]` : 12 candidats (Le Pen, Glucksmann, Mélenchon → `'Jean-Luc Aichonchon'`, Philippe, Attal, Retailleau, Zemmour, Ruffin, Roussel, Bertrand, Polony, Tondelier). Les autres jeux de mots sont au choix de l'implémenteur.
  - `FM.POSTS = ['premier','economie','interieur','etrangeres','armees','sante','education','travail','ecologie']` avec `FM.POST_LABELS`.
  - `FM.MINISTERS = [{ id, name, realName, post, camp, trait, competence /*1..5*/, portrait }]` : 3 ou 4 par poste, issus de tous les bords ; `trait ∈ 'cogneur'|'gaffeur'|'ambitieux'|'loyal'|'technocrate'|'populiste'`.
  - `FM.createGame({ candidateId, cabinet: { [post]: ministerId }, seed }) -> GameState`. Applique `START`, puis `candidate.start` (ajouts), `relations` = `startRelation` + modifs du candidat, loyauté 60 pour chaque ministre, puis `assemblee += 3` par ministre du même camp que le candidat et `−2` sinon.
  - `FM.applyEffects(state, effects) -> state` (mute et retourne). Bornes : jauges 0..100, relations −100..100, wars 0..5, baril 40..200, loyalty 0..100 ; `dette` non bornée.

- [ ] **Step 1: Write the failing test** `tests/state.test.js` :
  - `createGame uses real start data` : `dette === 3700`, `baril === 110`, `month === 0`, `wars.golfe === 4`.
  - `candidate modifiers apply` : un candidat de test avec `start.popularite: 5` → `popularite === 55`.
  - `cabinet loyalty starts at 60` pour tous les postes.
  - `applyEffects clamps` : `popularite` 98 + 10 → 100 ; `relations.US` −95 − 20 → −100 ; `dette` 3700 + 50 → 3750.
  - `data integrity` : 12 candidats, un nommé exactement `'Jean-Luc Aichonchon'` ; chaque poste de `FM.POSTS` a 3 ou 4 ministres ; ids uniques ; chaque pays a `flag` et `name` non vides.
- [ ] **Step 2:** Run `npm test` → FAIL.
- [ ] **Step 3:** Écrire les trois fichiers de données et `js/state.js`.
- [ ] **Step 4:** Run `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: real start data, candidates, ministers, game creation`.

### Task 3: Règles du temps, du monde et des fins

**Files:**
- Create: `js/rules.js`, `data/endings.js`, `tests/rules.test.js`

**Interfaces:**
- Consumes: `FM.applyEffects`, `FM.COUNTRIES`, `FM.START`.
- Produces:
  - `FM.CARDS_PER_MONTH = 3`, `FM.TERM_MONTHS = 60`.
  - `FM.monthTick(state, rng)`, appelé quand un mois se termine :
    - `pib *= 1.0025` ;
    - `dette += 13 + (baril - 80) * 0.1` ;
    - `baril += rng.int(-6, 6) + (wars.golfe - 2) * 1.5`, borné ;
    - `tension += (baril - 100) * 0.05` ;
    - pour chaque guerre de niveau > 0, avec une probabilité de 10 %, le niveau varie de ±1.
  - `FM.ENDINGS[id] = { title, text, icon }` pour `victoire`, `reelu` (variante de victoire si `popularite >= 50`), `faillite`, `destitution`, `emeutes`, `accident`, `nucleaire`. Le texte d'`accident` est une fausse version officielle absurde. Celui de `nucleaire` est absurde mais sans victimes (« Bilan du mandat : introuvable »).
  - `FM.checkEnding(state) -> endingId | null`, par ordre de priorité : `state.ending` déjà posé (par exemple `nucleaire`) → `danger >= 100` : `accident` → `dette / pib >= 1.5` : `faillite` → `tension >= 100` : `emeutes` → `popularite <= 0` : `destitution` → `month >= 60` : `reelu` si `popularite >= 50`, sinon `victoire` → `null`.
  - `FM.debtRatio(state) -> number` (en %, une décimale).

- [ ] **Step 1: Write the failing test** `tests/rules.test.js` :
  - `monthTick grows debt` : avec baril 110, sur une graine fixe, la dette augmente de 16 Md€ (13 + 3).
  - `faillite at 150 percent` : `dette = 1.5 * pib` → `'faillite'`.
  - `priority when several endings` : `danger 100`, `tension 100`, `popularite 0` → `'accident'`.
  - `pre-set ending wins` : `state.ending = 'nucleaire'`, autres jauges mortelles → `'nucleaire'`.
  - `term end` : `month 60`, `popularite 60` → `'reelu'` ; `popularite 30` → `'victoire'`.
  - `start ratio about 120` : `debtRatio(createGame(...))` entre 119 et 121.
- [ ] **Step 2:** Run `npm test` → FAIL.
- [ ] **Step 3:** Implémenter.
- [ ] **Step 4:** Run `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: monthly world tick and ending rules`.

### Task 4: La pioche

**Files:**
- Create: `js/deck.js`, `tests/deck.test.js`

**Interfaces:**
- Consumes: `GameState`, `Card`, `FM.MINISTERS`.
- Produces:
  - `FM.CARDS = []`. Chaque fichier `data/cards/*.js` fait `FM.CARDS.push(...)`.
  - `FM.cardById(id) -> Card`.
  - `FM.isEligible(card, state) -> boolean` : vérifie tous les champs de `when` ; `once` n'est jamais revu ; `repeatAfter` (30 par défaut) interdit les cartes présentes dans `state.recent` ; les cartes `tv` exigent `tvLeft > 0`.
  - `FM.cardWeight(card, state) -> number` : `weight`, × 3 si `when.trait` correspond au trait du ministre du poste `card.post`, × 2 pour les familles `guerre` et `immigration` quand la somme des `wars` est ≥ 15.
  - `FM.drawCard(state, rng) -> Card` :
    1. si une entrée de `queue` a `inCards <= 0`, la retirer et renvoyer cette carte, même si elle n'est pas éligible par ailleurs ;
    2. sinon, tirage pondéré parmi les cartes éligibles ;
    3. si aucune carte n'est éligible, nouvel essai en ignorant `recent` ;
    4. sinon, `FM.cardById('monde-calme')`, carte de secours toujours présente.

- [ ] **Step 1: Write the failing test** `tests/deck.test.js`, avec un petit `FM.CARDS` de test :
  - `queued followup comes first when due`.
  - `queued followup waits` : `inCards: 2` → pas encore tirée.
  - `when.flags filters` / `when.notFlags filters` / `when.candidate filters` / `when.minMonth filters`.
  - `once cards never repeat`.
  - `recent cards are skipped`.
  - `exhausted deck still returns a card` : toutes les cartes dans `recent` → une carte est renvoyée.
  - `trait triples weight` : un ministre de l'Intérieur `cogneur` et une carte `post:'interieur', when.trait:'cogneur'` → `cardWeight === 3`.
- [ ] **Step 2:** Run `npm test` → FAIL.
- [ ] **Step 3:** Implémenter.
- [ ] **Step 4:** Run `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: weighted deck with followups and anti-repeat`.

### Task 5: Moteur de résolution d'un choix

**Files:**
- Create: `js/engine.js`, `tests/engine.test.js`

**Interfaces:**
- Consumes: `FM.applyEffects`, `FM.monthTick`, `FM.checkEnding`, `FM.drawCard`, `FM.MINISTERS`, `FM.COUNTRIES`.
- Produces:
  - `FM.resolveChoice(state, card, choiceIndex, rng) -> { state, outcome: { text: string|null, ending: endingId|null } }`, dans cet ordre :
    1. `effects`, plus `campMod[state.camp]`. Si la carte a un `post`, les effets favorables (popularité en hausse, tension en baisse, danger en baisse) sont multipliés par `0.8 + 0.1 * competence` du ministre en poste, puis arrondis ;
    2. `vote` : succès si `assemblee + rng.int(-10, 10) >= difficulty`. En cas de succès, appliquer `onPass` et remettre `lawFailStreak` à 0. En cas d'échec, appliquer `onFail`, faire `lawFailStreak++`, et à partir de 3 échecs appliquer `popularite −5`. `outcome.text` vaut « Loi adoptée » ou « Loi rejetée ».
    3. `use493` : `popularite −8`, `tension +6`, `assemblee −5`, et la loi passe (`onPass`).
    4. `fire` : remplace le ministre du poste par un ministre du même poste absent de `usedMinisters`, avec une loyauté de 60. Si le poste est épuisé, le choix est absent à l'affichage (voir `FM.visibleChoices`).
    5. `tv` : `tvLeft--`.
    6. `setFlags` / `clearFlags`, puis `followups` ajoutés à `queue`.
    7. `ending` : `state.ending = ending`.
    8. Bookkeeping : `recent` (30 derniers), `seen`, chaque `queue[].inCards--`, `cardInMonth++`. Quand `cardInMonth === 3`, appeler `monthTick` et incrémenter `month`.
    9. Programmer les cartes système :
       - pour tout ministre de loyauté 0 sans flag `trahison_<post>`, poser le flag et mettre `ministre-trahison` (ciblant ce poste via le flag) en `queue` avec `inCards: 0`, puis appliquer `danger +10` ;
       - pour tout pays `nuclear` (IR seulement si `iran_bombe`) dont la relation est ≤ −90, avec une guerre concernée de niveau ≥ 3 et sans flag `nonretour_<code>`, poser le flag et mettre `nucleaire-<code>` en `queue` avec `inCards: 0`.
    10. `outcome.ending = FM.checkEnding(state)`.
  - `FM.visibleChoices(card, state) -> [{ choice, index }]` : masque `fire` si le poste est épuisé et `tv` si `tvLeft === 0`.
  - `FM.affectedGauges(choice) -> { dette, popularite, tension, danger }`, chaque valeur valant `0` (rien), `1` (petit, |Δ| < 8, ou < 20 Md€ pour la dette) ou `2` (gros). Sert à l'aperçu à la Reigns, sans direction.
  - `FM.renderWho(card, state) -> { name, role, portrait }` : résout `who.leader` en « nom, drapeau + pays » et `who.minister` en ministre en poste.
  - Table guerre → pays utilisée à l'étape 9 : `{ ukraine:['RU'], golfe:['IR','US'], gaza:['IL'], liban:['IL'], taiwan:['CN'], pakafghan:['PK'] }`, avec `KP` concerné si `taiwan >= 3`.

- [ ] **Step 1: Write the failing test** `tests/engine.test.js` :
  - `applies effects and campMod`.
  - `competence scales favourable effects` : ministre `competence 5`, `popularite:+10` → +13 ; un `popularite:-10` n'est pas modifié.
  - `third card of month ticks month` : `month` passe de 0 à 1 et la dette augmente.
  - `vote passes with high support` (`assemblee 90`, `difficulty 50`) et `vote fails with low support` (`assemblee 10`).
  - `three failed votes cost popularity`.
  - `49.3 forces the law and costs popularity`.
  - `fire replaces minister with unused one of same post`.
  - `fire hidden when post exhausted`.
  - `tv decrements and hides at zero`.
  - `zero loyalty queues betrayal once` : deux résolutions → une seule entrée `ministre-trahison`.
  - `nuclear point of no return queued` : `relations.RU = -95`, `wars.ukraine = 4` → `queue` contient `nucleaire-RU` ; une seconde résolution ne la remet pas.
  - `ending choice ends game` : un choix `ending:'nucleaire'` → `outcome.ending === 'nucleaire'`.
  - `affectedGauges sizes` : `{ popularite: -3, dette: 50 }` → `popularite: 1`, `dette: 2`, `tension: 0`.
  - `renderWho leader shows flag and country`.
- [ ] **Step 2:** Run `npm test` → FAIL.
- [ ] **Step 3:** Implémenter. Les cartes système `ministre-trahison`, `nucleaire-<code>` et `monde-calme` sont créées dans le test et écrites pour de vrai dans la Task 11.
- [ ] **Step 4:** Run `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: choice resolution engine`.

### Task 6: Sauvegarde

**Files:**
- Create: `js/save.js`, `tests/save.test.js`

**Interfaces:**
- Produces : `FM.SAVE_KEY = 'france-manager-2027'`, `FM.saveGame(state, storage?) -> boolean`, `FM.loadGame(storage?) -> GameState | null`, `FM.clearSave(storage?)`. Le paramètre `storage` vaut par défaut `globalThis.localStorage`. Tout accès est entouré de `try/catch`. `loadGame` renvoie `null` si la valeur est absente, si le JSON est invalide ou si `version !== 1`.

- [ ] **Step 1: Write the failing test** `tests/save.test.js` avec un faux storage (un objet avec `getItem`, `setItem` et `removeItem`) :
  - `round trip`.
  - `throwing storage` : chaque méthode lève → `saveGame` renvoie `false`, `loadGame` renvoie `null`, sans exception.
  - `undefined storage` → idem.
  - `corrupt json` → `null`.
  - `wrong version` → `null`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implémenter.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat: safe local save`.

### Task 7: Coquille UI : titre, choix du candidat, gouvernement

**Files:**
- Create: `index.html`, `css/style.css`, `js/ui/app.js`, `js/ui/screens-setup.js`

**Interfaces:**
- Consumes: `FM.CANDIDATES`, `FM.MINISTERS`, `FM.POSTS`, `FM.createGame`, `FM.loadGame`, `FM.saveGame`, `FM.START`, `FM.COUNTRIES`.
- Produces: `FM.ui.show(screenName, params)`, où `screenName ∈ 'title'|'candidate'|'cabinet'|'briefing'|'play'|'ending'`, et `FM.ui.root`, l'élément `#app`.
- `index.html` charge dans l'ordre : `js/rng.js`, `data/countries.js`, `data/candidates.js`, `data/ministers.js`, `js/state.js`, `data/endings.js`, `js/rules.js`, `js/deck.js`, tous les `data/cards/*.js` (liste explicite), `js/engine.js`, `js/save.js`, `js/ui/*.js`, et enfin `FM.ui.show('title')` au `DOMContentLoaded`.
- Écrans :
  - **title** : « Nouvelle partie », et « Continuer » seulement si `loadGame()` renvoie un état.
  - **candidate** : grille de cartes avec portrait, nom parodique, parti, bonus et malus.
  - **cabinet** : un poste à la fois, 3 ou 4 cartes de ministres avec trait, compétence (★) et camp. Bouton « Former le gouvernement » à la fin.
  - **briefing** : « Situation au départ » avec dette (Md€ et % du PIB), baril, guerres en cours (texte statique tiré du §11 de la spec), puis bouton « Prendre ses fonctions ».
- Style : tokens CSS sur `:root`, palette bleu-blanc-rouge, thème sombre via `prefers-color-scheme`, mise en page en une colonne à 360 px.

- [ ] **Step 1:** Implémenter les écrans et le style.
- [ ] **Step 2:** Vérifier : ouvrir `index.html` par double-clic dans Chrome. Les 4 écrans s'enchaînent jusqu'à `play` (qui peut rester un écran vide) sans erreur dans la console. À 360 px de large, pas de défilement horizontal.
- [ ] **Step 3:** Commit `feat: setup screens`.

### Task 8: Écran de jeu et écran de fin

**Files:**
- Create: `js/ui/controller.js`, `js/ui/screen-play.js`, `js/ui/screen-ending.js`, `tests/controller.test.js`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `FM.drawCard`, `FM.resolveChoice`, `FM.visibleChoices`, `FM.affectedGauges`, `FM.renderWho`, `FM.saveGame`, `FM.clearSave`, `FM.ENDINGS`, `FM.debtRatio`.
- Produces: `FM.createController(state, rng, { onChange(state, card, outcome), onEnding(state, endingId) }) -> { current(): Card, choose(index): boolean, unlock(): void }`. Le contrôleur pose un verrou dans `choose` : il renvoie `false` si un choix est déjà en cours, jusqu'à `unlock()`, que l'UI appelle à la fin de l'animation. Il sauvegarde après chaque choix et efface la sauvegarde à la fin de partie.
- **Écran play** :
  - en haut, les 4 jauges : dette en Md€ et %, plus 3 barres ;
  - la date (« Juin 2028 ») et le baril ;
  - la carte au centre : portrait, nom, rôle, texte ;
  - 2 choix : glissement à gauche ou à droite, flèches du clavier ou boutons ;
  - 3 choix : trois boutons, ou touches 1, 2, 3 ;
  - au survol, au focus ou pendant le glissement, des points apparaissent sous les jauges touchées (petits ou gros selon `affectedGauges`) ;
  - `outcome.text` s'affiche brièvement (toast) ;
  - les cartes `tv` ont un habillage « allocution TV », les cartes `presse` un habillage « Une de journal » ;
  - un bouton ☰ ouvre un panneau en lecture seule (gouvernement avec loyauté, relations par pays avec drapeaux, soutien à l'Assemblée, allocutions restantes) sans interrompre la partie.
- **Écran ending** : icône, titre, texte, nombre de mois tenus, 5 dernières lignes du `log`, bouton « Rejouer ».

- [ ] **Step 1: Write the failing test** `tests/controller.test.js` :
  - `double choose resolves once` : deux `choose(0)` d'affilée → le second renvoie `false` et `onChange` n'est appelé qu'une fois.
  - `unlock allows next choice`.
  - `ending calls onEnding and clears save` (faux storage injecté via `FM.saveGame` et `FM.clearSave` espionnés).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implémenter le contrôleur, puis les deux écrans.
- [ ] **Step 4:** Run `npm test` → PASS. Créer `data/cards/_demo.js` (une dizaine de cartes provisoires, dont `monde-calme`, chargées par `index.html`). Ce fichier sera supprimé dans la Task 11. Lancer une partie dans Chrome et jouer 20 cartes au clavier, à la souris et en glissement (via le mode responsive des DevTools). Pas d'erreur console. Recharger la page puis « Continuer » reprend la partie au même endroit.
- [ ] **Step 5:** Commit `feat: play and ending screens`.

### Task 9: Validateur de contenu

**Files:**
- Create: `tests/content.test.js`

**Interfaces:**
- Consumes: tous les fichiers de `data/` chargés via `load(...)`, dans l'ordre d'`index.html`.

- [ ] **Step 1:** Écrire les tests (ils échouent tant que le contenu des Tasks 10 à 13 manque) :
  - `card ids unique`.
  - `every card has 2 or 3 choices with labels <= 40 chars`.
  - `card text <= 220 chars`.
  - `effects keys valid` : seulement `dette|popularite|tension|danger|assemblee|baril|relations|loyalty|wars`, avec des codes de pays, de postes et de guerres existants.
  - `followups and system cards resolve` : tout `cardId` référencé existe, ainsi que `monde-calme`, `ministre-trahison` et `nucleaire-<code>` pour chaque pays nucléaire et pour IR.
  - `leader cards reference known countries`.
  - `common pool >= 150` : cartes sans `when.candidate`, hors familles système.
  - `each candidate has 3 to 5 specific cards`.
  - `family coverage` : au moins `social 15, services 12, hot 20, lois 15, presse 15, tv 6, geo 20, guerre 15, immigration 8, monde 15`.
  - `every nuclear card has a de-escalation choice` : au moins un choix sans `ending`.
  - `Aichonchon present`.
- [ ] **Step 2:** Run → FAIL (attendu).
- [ ] **Step 3:** Commit `test: content validator`.

### Task 10: Cartes : social, services publics, sujets brûlants

**Files:**
- Create: `data/cards/social.js`, `data/cards/services.js`, `data/cards/hot.js`
- Modify: `index.html` (balises de script)

- [ ] **Step 1:** Écrire au moins 15 cartes `social`, 12 `services` et 20 `hot`.
  - **social** : manifs et grèves (SNCF, profs, agriculteurs, gilets jaunes, étudiants). Elles proposent toujours un choix CRS (tension en baisse, popularité en baisse, `setFlags:['crs_envoyes']`), avec une suite `social-bavure` possible à 4–8 cartes. Quelques cartes portées par un ministre de l'Intérieur `cogneur`.
  - **services** : hôpitaux, école, SNCF, police, justice. Investir alourdit la dette, couper la réduit mais fait monter la tension.
  - **hot** : narcotrafic à Marseille, retraites, essence (texte et effets liés au baril via `when`), agriculteurs et Mercosur, Nouvelle-Calédonie, canicule, sécheresse, inondations, nucléaire, laïcité, IA et emploi, logement, déserts médicaux, émeutes de Limoges.
- [ ] **Step 2:** Run `npm test`. Les tests de comptage de ces familles passent, les autres échouent encore.
- [ ] **Step 3:** Commit `content: social, public services and hot topic cards`.

### Task 11: Cartes : lois, presse, allocutions TV, ministres, cartes système

**Files:**
- Create: `data/cards/lois.js`, `data/cards/presse.js`, `data/cards/tv.js`, `data/cards/ministre.js`, `data/cards/systeme.js`
- Modify: `index.html`

- [ ] **Step 1:** Écrire les cartes :
  - **lois** (≥ 15) : chacune a un choix « Porter la loi » avec `vote`, un choix « 49.3 » avec `use493` pour certaines, et un choix « Enterrer ».
  - **presse** (≥ 15) : des Unes avec la déclaration d'un opposant ou d'un ministre (`who.minister`). Au plus 3 réponses parmi recadrer, ignorer, contre-attaquer et virer (`fire`). Les gaffes viennent surtout de ministres `gaffeur`.
  - **tv** (≥ 6) : l'étape 1 choisit le ton (ferme, empathique ou solennel) avec `tv: true` et une suite immédiate (`inCards: 0`) vers l'étape 2, l'annonce. Condition : `tension >= 70`, ou flag `grande_loi` posé par certaines lois.
  - **ministre** : les cartes `ambitieux` (complot), `loyal` et `technocrate`, plus `ministre-trahison` (fuite, démission fracassante, choix entre virer et pardonner) et une carte « remaniement » de temps en temps.
  - Supprimer `data/cards/_demo.js` et sa balise dans `index.html`.
  - **systeme** : `monde-calme`, et `nucleaire-<code>` pour chaque pays nucléaire et pour IR, avec choix « désescalade » et « tenir bon » (`ending:'nucleaire'`). Texte sobre.
- [ ] **Step 2:** Run `npm test`. Les tests de ces familles et des cartes système passent.
- [ ] **Step 3:** Commit `content: laws, press, tv, minister and system cards`.

### Task 12: Cartes : géopolitique, guerres, immigration

**Files:**
- Create: `data/cards/geo.js`, `data/cards/guerre.js`, `data/cards/immigration.js`
- Modify: `index.html`

- [ ] **Step 1:** Écrire les cartes :
  - **geo** (≥ 20) : des dirigeants parodiés (`who.leader`) pour Trump (taxes, F-35, OTAN), Poutine, la Chine (Airbus, terres rares), l'Arabie saoudite (Rafale, argent du Golfe), l'Algérie, l'Allemagne/UE, l'Italie et le Royaume-Uni (Manche), plus la reconnaissance de la Palestine. Effets sur `relations` et `danger`.
  - **guerre** (≥ 15) : Golfe et Ormuz (escorte navale, baril), Ukraine, Gaza, Liban, Taïwan, Soudan, Sahel, Pakistan-Afghanistan. Les choix restent sobres : condamner, neutre, sanctions, armes, troupes, médiation. Effets sur `wars`, `baril`, `relations`, `danger` et `dette`. Une carte pose le flag `iran_bombe`. **Aucun humour sur la guerre ni les victimes.**
  - **immigration** (≥ 8) : « une vague de N migrants arrive à Lampedusa / dans la Manche ». N figure dans le texte via des variantes selon `when.war` (Soudan ≥ 4 → plus gros). Choix : accueillir, répartir, fermer les frontières, accord UE, payer un pays tiers. `campMod` rend l'effet sur la popularité différent selon le camp.
- [ ] **Step 2:** Run `npm test`.
- [ ] **Step 3:** Commit `content: geopolitics, war and immigration cards`.

### Task 13: Cartes : monde, candidats

**Files:**
- Create: `data/cards/monde.js`, `data/cards/candidat.js`
- Modify: `index.html`

- [ ] **Step 1:** Écrire les cartes :
  - **monde** (≥ 15) : variations du baril (OPEP, Ormuz rouvert ou fermé), catastrophes, scandales, faits divers absurdes.
  - **candidat** : 3 à 5 cartes par candidat avec `when.candidate`, qui jouent sur ses tics et ses promesses de campagne.
- [ ] **Step 2:** Run `npm test` → tous les tests de `content.test.js` passent.
- [ ] **Step 3:** Commit `content: world and candidate cards`.

### Task 14: Simulation d'équilibrage

**Files:**
- Create: `tests/balance.test.js`, `tools/simulate.js`
- Modify: les valeurs numériques des cartes ou de `FM.START` et `monthTick` selon les résultats

**Interfaces:**
- Produces: `node tools/simulate.js [n]`, qui affiche pour `n` parties d'un joueur aléatoire (choix uniforme, candidat et gouvernement aléatoires) la répartition des fins et la médiane du nombre de cartes jouées.

- [ ] **Step 1: Write the test** `tests/balance.test.js`, qui simule 500 parties à graines fixes :
  - `games are not instantly lost` : médiane du nombre de cartes ≥ 45 (15 mois).
  - `random play rarely wins` : taux de `victoire` + `reelu` entre 2 % et 35 %.
  - `defeats are varied` : au moins 4 fins de défaite différentes apparaissent.
  - `no crash` : aucune exception sur 500 parties.
- [ ] **Step 2:** Run → probablement FAIL. Ajuster les nombres et relancer `node tools/simulate.js 2000` jusqu'à ce que le test passe.
- [ ] **Step 3:** Run `npm test` → tout passe.
- [ ] **Step 4:** Partie complète manuelle dans Chrome jusqu'à une fin, sans erreur console.
- [ ] **Step 5:** Commit `balance: tune values with simulation`.
