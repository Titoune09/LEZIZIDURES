# LEZIZIDURES

Base d’un site web intelligent de découverte culturelle et intellectuelle.

## Démarrage rapide

> ⚠️ Ouvrir le fichier `index.html` directement dans un navigateur peut bloquer `localStorage` selon les règles de sécurité.
> Pour une expérience fiable, lancez un petit serveur local :

```bash
python -m http.server 8000
```

Ensuite ouvrez [http://127.0.0.1:8000/index.html](http://127.0.0.1:8000/index.html) dans votre navigateur.

## Fonctionnalités incluses

- Sélection de domaines personnalisés (modal onboarding).
- Stockage des préférences avec repli en mémoire si `localStorage` est indisponible.
- Messages inspirants quotidiens et contenus de découverte.
- Sections prêtes pour intégrer des APIs externes (news, médias, etc.).

## Structure

- `index.html` : structure du site et sections principales.
- `styles.css` : design moderne et responsive.
- `app.js` : logique de rendu, gestion des préférences et données mock.
