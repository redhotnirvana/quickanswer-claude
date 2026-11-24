QUICKANSWER CLAUDE 1.1.0 - Installation / mise à jour

MISE À JOUR depuis 1.0.x
1. chrome://extensions -> supprime l'ancienne QuickAnswer Claude (ou garde-la si c'est ce dossier).
2. "Charger l'extension non empaquetée" -> sélectionne ce dossier (ou "Actualiser" ↻ si c'est déjà lui).
3. Chrome demande maintenant l'accès "lire et modifier les données de tous les sites" :
   nécessaire pour capturer l'onglet depuis un raccourci clavier de la page.
4. La clé API et la case "Activer" sont conservées si tu actualises la même extension ;
   si tu as chargé un autre dossier, ressaisis-les dans le popup.
5. Recharge les onglets déjà ouverts (le script ne s'injecte pas dans les anciens onglets).

UTILISATION
- Appuie sur Control + Option (⌃⌥) : un léger voile apparaît, curseur en croix.
- Clique-glisse un rectangle autour de la question (et de ses propositions), relâche.
- La bulle apparaît à côté de la zone avec la réponse. Echap annule la sélection / ferme la bulle.
- ⌃⌥ suivi d'une lettre (autre raccourci) annule automatiquement le mode sélection.

NOTES
- Modèle : claude-haiku-5-5 (vision, ~0,10 $ / 0,50 $ par million de tokens ; une question ≈ 1 000-1 500 tokens d'image).
- Seule la zone dessinée est envoyée à Anthropic (JPEG, max 1568 px). N'encadre pas de données sensibles.
- Clé stockée en clair dans chrome.storage.local : toute personne ayant accès à ton profil Chrome peut la lire.
  Utilise une clé dédiée avec un plafond de dépense dans la console Anthropic.
- Raccourci : ignoré si le focus est dans une iframe (le script tourne seulement dans la page principale).
  Si VoiceOver est activé, ⌃⌥ est sa touche "VO" et entrera en conflit.
- L'extension ne masque pas son activité et ne contourne aucun contrôle. Usage réservé aux exercices autorisant l'IA.
- test/demo.html : petit questionnaire de démo. Pour l'ouvrir en double-clic (file://), active
  "Autoriser l'accès aux URL de fichier" dans les détails de l'extension (chrome://extensions).
  demo.html?stub est un banc de test qui simule l'extension (réponse fixe marquée [STUB]).
- Ne fonctionne pas sur les pages internes de Chrome (chrome://, nouvel onglet, Chrome Web Store).
