# AGENTS.md — Site de lecture de tablatures (Vue 3 + Vite + TailwindCSS + daisyUI)

## Mission
Tu es un agent de développement. Ton objectif est de construire et maintenir un site web de lecture de tablatures pour instruments.
Priorités : simplicité d’usage, UI propre, code clair, composants réutilisables, navigation fluide.

---

## Stack & contraintes
- Front : Vue 3 (Composition API) + Vite
- Styling : TailwindCSS + daisyUI
- Router : Vue Router
- State (si besoin) : Pinia
- Qualité : ESLint + Prettier
- Tests (si besoin) : Vitest + @vue/test-utils
- **Ne pas ajouter de dépendance** sans justification claire (problème résolu + alternative évaluée).

---

## Règles de travail
1. Toujours travailler par petites étapes (1 feature = 1 PR/lot de commits).
2. Modifier le minimum de fichiers nécessaires.
3. Respecter l’architecture existante.
4. Écrire des messages de commit clairs si demandé.
5. Après chaque changement significatif : lancer lint + build (et tests si présents).

---

## Commandes du projet
> Adapte si le projet utilise pnpm/yarn.

- Installer : `npm install`
- Dev : `npm run dev`
- Build : `npm run build`
- Preview : `npm run preview`
- Lint : `npm run lint`
- Format : `npm run format` (si présent)
- Tests : `npm run test` (si présent)

---

## Architecture recommandée
- `src/`
  - `assets/` (images, fonts)
  - `components/` (UI réutilisable)
  - `layouts/` (layout principal, header/sidebar)
  - `pages/` (vues routées : Home, Reader, Library, About)
  - `router/` (routes)
  - `stores/` (Pinia)
  - `services/` (API, fetch, stockage)
  - `utils/` (helpers)
  - `styles/` (tailwind.css, overrides)

---

## Conventions de code
- Utiliser **Composition API** (`<script setup>`) par défaut.
- Typage :
  - Si TypeScript est activé : pas de `any`, préférer des types explicites.
  - Sinon : JSDoc sur les objets complexes (tablature, instrument, track).
- Nommage :
  - Composants : `PascalCase.vue` (ex: `TabReader.vue`)
  - Fichiers utilitaires : `camelCase.ts|js`
- Composants :
  - Les composants UI purs vont dans `components/`
  - Les pages routées vont dans `pages/`
- Ne pas dupliquer la logique : factoriser dans `utils/` ou `services/`.
- Accessibilité :
  - Boutons = `<button>` (pas des `<div>` cliquables)
  - Labels et `aria-*` quand nécessaire
  - Navigation clavier minimale OK

---

## UI/UX (daisyUI + Tailwind)
- Utiliser les classes daisyUI (`btn`, `card`, `navbar`, `drawer`, `modal`, etc.) en priorité.
- Définir un thème daisyUI (dans `tailwind.config.*`) et rester cohérent.
- Responsive :
  - Mobile-first
  - Éviter le scroll horizontal
- États UI obligatoires sur les écrans clés :
  - chargement
  - vide (pas de tablatures)
  - erreur

---

## Fonctionnalités attendues (vision produit)
- Bibliothèque de tablatures (liste, recherche, filtres : instrument / difficulté / style).
- Lecteur de tablature :
  - affichage lisible (monospace, lignes, mesures)
  - zoom (taille de police)
  - transpose / accordage (si possible)
  - autoscroll (optionnel)
- Support multi-instruments (guitare, basse, ukulélé…).
- Stockage :
  - MVP : données locales (JSON) + éventuellement LocalStorage pour favoris/réglages
  - Évolutions : backend/API plus tard (prévoir une couche `services/`)

---

## Format des données (MVP conseillé)
Si on stocke les tablatures en JSON :
- `id`, `title`, `artist`, `instrument`, `tuning`, `capo`, `difficulty`, `tags`
- `content` (texte brut de tablature)
- `source` (optionnel)
Garder la structure stable et documentée dans `README` ou `docs/`.

---

## Sécurité & bonnes pratiques
- Ne jamais committer de secrets (clés, tokens).
- Ajouter `.env.example` si `.env` est utilisé.
- Valider/sanitizer l’affichage de contenu texte si on supporte du HTML (éviter `v-html`).

---

## Definition of Done (DoD)
Une tâche est terminée seulement si :
- L’écran/feature fonctionne en local (`npm run dev`)
- `npm run build` passe
- `npm run lint` passe (et tests si présents)
- UI responsive minimale OK (mobile + desktop)
- Aucun warning/erreur console évidente
- La doc/README est mise à jour si l’usage change (routes, format data, scripts)

---

## Comment répondre quand tu termines une tâche
Toujours fournir :
- Résumé des changements (bullet points)
- Fichiers principaux modifiés
- Commandes à lancer pour vérifier
- Limitations connues / next steps

---

## Si une instruction est ambiguë
Fais une hypothèse raisonnable, implémente la version la plus simple (MVP), et documente l’hypothèse dans la réponse.
