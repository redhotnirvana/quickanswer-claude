QUICKANSWER (app macOS)

Même fonctionnement que l'extension, mais hors de la page : rien n'est ajouté au HTML,
et le navigateur reste l'application active (nom en haut à gauche inchangé).

INSTALLATION (QuickAnswer-1.1.pkg)
Double-clic sur le .pkg -> installe QuickAnswer.app dans /Applications. Aucune clé API incluse.
Si macOS bloque l'ouverture (paquet non notarisé) : clic droit sur le .pkg -> Ouvrir, ou
Réglages Système -> Confidentialité et sécurité -> "Ouvrir quand même".
Sur un autre Mac : saisir sa propre clé au premier lancement, puis accorder Accessibilité
et Enregistrement de l'écran.

PREMIER LANCEMENT
1. Double-clic sur QuickAnswer.app (icône "QA" dans la barre des menus, pas d'icône dans le Dock).
2. Saisis ta clé API (stockée dans le trousseau macOS). Modifiable via QA -> Clé API…
3. Réglages Système -> Confidentialité et sécurité :
   - Accessibilité : active QuickAnswer (nécessaire pour détecter ⌃⌥ partout).
   - Enregistrement de l'écran : active QuickAnswer (demandé à la première capture).
   Puis quitte (QA -> Quitter) et relance l'app.
4. Désactive l'extension Chrome pour ne pas avoir deux sélecteurs en même temps.

RÉGLAGES (QA -> Réglages…, ou ⌘, quand le menu est ouvert)
- Général : activer/désactiver le raccourci ; Raccourci : clique dessus et appuie sur une combinaison
  (au moins deux modificateurs comme ⌃⌥, ou modificateur + touche comme ⌘⇧A ; une touche seule est refusée,
  Échap annule). Une combinaison avec touche est interceptée : elle n'écrit rien dans la page. Thème de la bulle (Clair = blanc #FFFFFF sans bordure ni ombre, Sombre = gris très foncé #1E1E1E,
  Verre = transparent, texte seul : noir sur fond clair, blanc sur fond sombre, détecté automatiquement), longueur des réponses (Très court, Court, Moyen, Détaillé ; QCM inchangés), clé API.
- Général → Autorisations : état de l'Accessibilité et de l'Enregistrement de l'écran (vert = OK,
  orange = bloqué). « Ouvrir » amène directement à la bonne page de Réglages Système ;
  « Relancer QuickAnswer » redémarre l'app pour appliquer une autorisation.
- Général → Consommation : plafond mensuel en € (10 € par défaut) avec barre de progression, coût du mois,
  nombre de questions, tokens envoyés (dont relus en cache), tokens générés, coût de la dernière question.
  Calculé après chaque réponse ; au plafond, l'app n'envoie plus de questions.
  Limite stricte possible aussi : console Anthropic → Settings → Limits.
- Documents : documents de contexte envoyés à Claude avec chaque question.
  + ou glisser-déposer pour ajouter (PDF, TXT, Markdown), − ou Suppr pour retirer (va à la Corbeille),
  interrupteur pour activer/désactiver un document sans le supprimer.
  Dans les PDF (slides exportées depuis PowerPoint/Keynote), seules les pages qui ont besoin de leur image
  partent en image (≈ 1 600 tokens par page) : photo, capture, scan, tableau ou figure sans texte lisible,
  graphique dense. Les autres partent en texte seul. Logos et fonds de modèle répétés sont ignorés.
  Sur un cours de 5 PDF (236 pages) : ≈ 195 000 tokens au lieu de ≈ 396 000.
  Les .pptx ne sont pas acceptés : exporte-les en PDF.
  Blocage au-delà des limites de l'API (600 pages de PDF, 24 Mo, ≈ 900k tokens).
- Mémoire de la conversation : les questions de la dernière heure (au plus 10, sélections et questions
  tapées, avec leurs images) sont renvoyées avec la suivante, pour que "le tableau", "la question
  précédente"… soient compris. Claude les ignore si sans rapport.
- Consommation : une ligne par question dans ~/Library/Application Support/QuickAnswer/usage.log
  (cache_read = tokens relus à tarif réduit).

PLACEMENT DE LA BULLE
La bulle apparaît juste à côté du coin bas droit de la sélection (décalée de 8 pt), et reste à au moins 48 pt des bords
de l'écran (pas collée aux bords ni dans les coins), même si la sélection est près d'un bord. Thème Verre : l'app prend une capture basse résolution de l'écran
(sans appel API) pour choisir un texte noir sur fond clair ou blanc sur fond sombre.

UTILISATION
⌃⌥ -> glisse un rectangle (fin cadre gris clair, l'écran n'est pas assombri) -> la bulle apparaît à côté. Echap annule / ferme la bulle.
Le texte de la bulle est sélectionnable (copie avec clic droit -> Copier).
Champ « Demander une précision… » sous la réponse : tape une question sur la réponse (sans nouvelle capture),
Entrée pour envoyer. La bulle ne prend le clavier que quand tu cliques dans ce champ ; le navigateur reste
l'app active.
Bouton « – » à côté de la croix : réduit la bulle en un petit rond blanc ; un clic sur le rond la rouvre.
Glisse le titre « QA » pour déplacer la bulle. Taille du texte : Réglages → Général.

RECOMPILER (après modification de main.swift)
  ./build.sh
NOUVELLE VERSION
  Change le numéro dans VERSION (ex. 1.2), puis ./package.sh : recompile l'app avec ce numéro et crée
  QuickAnswer-<version>.pkg avec le même numéro (vérifie aussi : aucune clé, signature valide).
La signature "JARVIS Local Code Signing" garde les permissions entre deux compilations.
Après une recompilation, macOS peut redemander l'accès au trousseau : "Toujours autoriser".

LIMITES
- Echap est vu aussi par l'application au premier plan (l'app l'observe sans l'intercepter).
- Si VoiceOver est actif, ⌃⌥ est sa touche "VO".
- Le curseur en croix peut ne pas s'afficher, car l'app ne prend jamais le focus.
