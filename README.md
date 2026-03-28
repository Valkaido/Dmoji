# Dmoji Documentation Site

Site statique utilise pour la documentation GitHub Pages de Dmoji.

## Fichiers principaux

- `index.html` : structure de la page
- `styles.css` : styles du site
- `app.js` : logique des tutoriels et boutons de copie
- `assets/logo.png` : logo principal affiche dans l'en-tete
- `assets/logo_small.png` : favicon
- `assets/exemple_*.png` : captures d'exemple utilisees dans la documentation
- `assets/catjam4x.mp4` : apercu video pour l'exemple `/catJAM:4x`
- `videos/emotes.mp4` : tuto video local pour la commande `/emotes`
- `videos/emotes_parameters.mp4` : tuto video local pour `/emotes <nom> <taille> <texte>`
- `videos/info.mp4` : tuto video local pour `/info <message_id>`

## Modifier les tutos

Les tutoriels sont declares dans `app.js` via le tableau `INTEGRATIONS`.

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
