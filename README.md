# TabStudio

## Demarrage rapide
```bash
npm install
npm run dev
```

Scripts utiles:
- `npm run build`
- `npm run preview`
- `npm run lint`

## Routes principales
- `/` Accueil
- `/library` Bibliotheque
- `/reader/:id` Lecteur
- `/about` A propos

## Import de tablatures (JSON)
Le lecteur accepte un objet JSON unique ou un tableau d'objets. Chaque tablature doit respecter ce schema :

```json
{
  "id": "sunrise-groove",
  "title": "Sunrise Groove",
  "artist": "The Morning Lines",
  "instrument": "Guitare",
  "tuning": "Standard (E A D G B E)",
  "capo": "2",
  "difficulty": "Facile",
  "tags": ["acoustique", "pop"],
  "content": "E|-----0-----0-----0-----0---|\nB|---1-----1-----1-----1-----|",
  "source": "https://example.com"
}
```

Notes:
- `tags` doit etre un tableau de textes.
- `capo` accepte un nombre ou un texte.
- `source` est optionnel.
