# QuickAnswer

Encadre une question à l'écran, Claude (Haiku 5.5, vision) répond dans une petite bulle à côté. Tu peux poser une question de suivi dans la bulle, ou la réduire en petit rond.

Deux versions :

- **App macOS** (`macos/`) — app de barre des menus en un seul fichier Swift. Raccourci configurable (⌃⌥ par défaut), capture de la zone via ScreenCaptureKit, bulle flottante au coin bas droit de la sélection, qui ne prend pas le focus. Réglages : thème de la bulle, longueur des réponses, documents de contexte (PDF/TXT/Markdown, mis en cache), plafond de dépense mensuel en €, état des autorisations macOS.
- **Extension Chrome** (racine) — même principe, dans le navigateur (Manifest V3).

## Installation (macOS 14+, Apple Silicon)

Télécharge `QuickAnswer-1.0.pkg` dans les [Releases](../../releases), ou compile :

```bash
cd macos && ./build.sh
```

Au premier lancement : saisis ta clé API Anthropic (stockée dans le trousseau macOS, jamais dans le code), puis autorise QuickAnswer dans Accessibilité et Enregistrement de l'écran (Réglages → Général → Autorisations). Détails : [macos/README.txt](macos/README.txt).

## Confidentialité

Seule la zone encadrée (et les documents de contexte que tu ajoutes) est envoyée à l'API Anthropic, avec ta propre clé. Aucune clé n'est incluse dans ce dépôt ni dans le paquet. L'app ne masque pas son activité et ne contourne aucun contrôle : à utiliser là où l'aide d'une IA est autorisée.

## Licence

MIT
