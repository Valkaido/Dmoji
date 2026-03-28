# Dmoji Docs

Documentation statique pour la page GitHub Pages de Dmoji.

## Fichiers principaux

- `index.html` : structure de la page
- `user-guide.css` : styles
- `user-guide.js` : logique des tutos et boutons de copie
- `logo.png` : logo principal affiche dans l'en-tete
- `logo_small.png` : favicon
- `videos/emotes.mp4` : tuto video local pour la commande `/emotes`

## Modifier les tutos

Les tutos sont declares dans `user-guide.js` via le tableau `INTEGRATIONS`.

Types utilises :

- `video` pour un fichier local
- `link` pour un emplacement ou un lien externe

Exemple :

```js
{
  type: "video",
  title: "Commande /emotes",
  description: "Tutoriel video",
  src: "./videos/emotes.mp4",
  url: "./videos/emotes.mp4"
}
```

## Publication

Le depot est prevu pour GitHub Pages avec `index.html` a la racine.
