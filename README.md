# Discordmoji

Bot Discord Node.js qui détecte des émotes 7TV au format `/NOM_EMOTE` ou `/NOM_EMOTE:2x`, supprime le message original si au moins une émote valide est trouvée, puis republie le texte et les émotes via webhook avec le pseudo et l'avatar de l'auteur. Une commande `/emotes` permet d'afficher la liste des émotes disponibles ou d'en envoyer une depuis une liste de choix, et `/info` permet de retrouver l'émote utilisée à partir de l'identifiant d'un message relayé.

La liste des émotes est stockée dans `data/emotes.json` et le bot la recharge automatiquement quand le fichier change. Il n'est donc plus nécessaire de redémarrer le bot après une modification de cette liste.

## Prérequis

- Node.js 20 ou plus récent
- Un bot Discord invité sur votre serveur
- Un fichier `.env` dérivé de `.env.example`

## Permissions bot nécessaires

- `View Channels`
- `Read Message History`
- `Send Messages`
- `Manage Messages`
- `Manage Webhooks`

## Intents nécessaires

- `Guilds`
- `GuildMessages`
- `MessageContent`

Activez aussi l'intent privilégié `MESSAGE CONTENT INTENT` dans le portail développeur Discord.

## Création de webhook

Le bot crée automatiquement un webhook dédié dans le salon concerné lors du premier message à relayer, si aucun webhook compatible n'existe déjà. Il lui faut donc la permission `Manage Webhooks`.

## Installation

```bash
npm install
Copy-Item .env.example .env
```

Renseignez ensuite au minimum :

- `DISCORD_TOKEN`
- `WEBHOOK_NAME` si vous voulez changer le nom du webhook

La liste d'émotes éditable à chaud se trouve dans `data/emotes.json`.

Filtrage optionnel des serveurs :

- laissez `TARGET_GUILD_IDS` vide pour autoriser le bot sur tous les serveurs où il est invité
- renseignez `TARGET_GUILD_IDS` avec plusieurs IDs séparés par des virgules si vous voulez le limiter à certains serveurs

Évitez le mot `discord` dans `WEBHOOK_NAME`, car Discord le refuse pour les webhooks.

## Lancement

```bash
npm start
```

Pour le mode watch local :

```bash
npm run dev
```

## Comportement attendu

- `/KEKW` est accepté si l'émote existe dans la configuration.
- `/KEKW:1x`, `/KEKW:2x`, `/KEKW:3x` et `/KEKW:4x` permettent de choisir la taille envoyée. Sans précision, la taille par défaut est `2x`.
- Plusieurs tokens dans un même message sont supportés.
- Le message original est supprimé puis reposté via webhook avec le texte nettoyé des tokens et les émotes trouvées.
- Le texte normal peut maintenant coexister avec des émotes.
- Si le message contient des tokens inconnus ou des pièces jointes, rien n'est relayé dans le salon.
- Le bot n'envoie pas de message de refus, pour éviter le spam.
- Le bot ignore ses propres messages et les messages envoyés par webhook.
- Si un message non relayable est modifié ensuite vers un format valide, le bot le prendra aussi en charge lors de l'édition.
- La commande `/emotes` sans option affiche la liste des émotes disponibles avec 10 émotes par page, un bouton `Envoyer`, un bouton de filtre et un bouton pour effacer le filtre.
- La commande `/emotes` avec l'option `nom` utilise l'autocomplétion, envoie directement l'émote choisie, l'option `taille` accepte `1x`, `2x`, `3x` ou `4x`, et l'option `texte` permet d'ajouter un message.
- La commande `/info` avec l'option `message_id` affiche l'émote enregistrée pour un message relayé dans le même serveur.
- Si `TARGET_GUILD_IDS` est vide, le bot fonctionne sur tous les serveurs où il est invité.
- Si `TARGET_GUILD_IDS` est renseigné, le bot fonctionne uniquement sur les serveurs listés.
- Quand le message contient jusqu'à 10 émotes, le bot les affiche via des embeds avec `image.url`, sans URL visible dans le contenu ni nom d'émote affiché dans l'embed.

## Ce qui est possible dans Discord

Discord ne permet pas d'afficher arbitrairement une image distante inline au milieu d'un texte comme une vraie émote native. Cette implémentation affiche donc les émotes 7TV comme images d'embed séparées du texte. Si le message dépasse la limite de 10 embeds, le bot retombe sur l'ancien envoi en pièces jointes.

## Limites connues

- Si `data/emotes.json` est invalide pendant une sauvegarde, le bot garde la dernière configuration valide chargée.
- Les fils de discussion et certains types de salons spéciaux ne sont pas ciblés.
