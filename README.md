Documentation officielle du bot **Dmoji**.

Site en ligne : [https://valkaido.github.io/Dmoji/](https://valkaido.github.io/Dmoji/)

## Présentation

Dmoji permet d'écrire des émotes 7TV ou d'autres émotes directement dans un message Discord avec une syntaxe simple et rapide.

Exemples de syntaxe :

```text
/KEKW
/KEKW:4x
Bonjour /catJAM
/D:
```

Lorsqu'un message est valide, le bot :

- détecte les émotes présentes dans le contenu ;
- supprime le message d'origine ;
- republie le message avec le pseudo et l'avatar de l'auteur ;
- conserve le texte normal autour des émotes ;
- relaie les pièces jointes lorsque cela est possible.

## Fonctionnalités prises en charge

Dmoji fonctionne avec :

- les salons textuels classiques ;
- les fils de discussion ;
- les publications de forum ;
- plusieurs émotes dans un même message ;
- les tailles `1x`, `2x`, `3x` et `4x` ;
- les favoris et les émotes récentes via `/emotes` ;
- les noms d'émotes spéciaux, comme `/D:`.

## Commandes

### `/emotes`

Affiche une interface permettant de :

- parcourir les émotes disponibles ;
- rechercher rapidement une émote ;
- envoyer l'émote sélectionnée ;
- gérer ses favoris ;
- retrouver ses émotes récentes.

### `/emotes nom:<émote> taille:<taille> texte:<message>`

Permet d'envoyer directement une émote précise, avec une taille et un texte optionnels.

```text
/emotes nom:KEKW taille:4x texte:Salut
```

### `/info message_id:<id>`

Permet d'identifier l'émote utilisée sur un message déjà renvoyé par le bot.

### `/aide`

Ouvre la documentation.

## Commandes d'administration

Les commandes suivantes sont réservées au serveur d'administration configuré :

- `/emote add`
- `/emote remove`
- `/emote edit`
- `/emote test`
- `/stats`
- `/debug`

## Points importants

- Si un message contient au moins une émote invalide, le bot ne renvoie rien.
- Le bot ne publie pas de message d'erreur public afin d'éviter le spam.
- Les émotes 7TV ne peuvent pas être intégrées exactement comme des émotes natives Discord au milieu d'une phrase.
- Selon l'endroit où vous écrivez dans Discord, les émotes sont envoyées sous forme d'images intégrées ou de fichiers joints.
- Une pièce jointe trop lourde ou inaccessible peut empêcher son renvoi.
- Dans les fils et les forums, les permissions du salon parent doivent être correctement configurées.
