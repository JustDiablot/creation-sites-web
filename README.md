# Vitrine création de sites web

Site de présentation des modèles, à publier sur GitHub Pages. Aucun build, aucune dépendance.

## Contenu

- `index.html`, `vitrine.css`, `vitrine.js` : la vitrine (modèles, étapes, formulaire qui prépare le mail de demande).
- `moteur/` : moteur commun à tous les sites clients (`app.js`, `style.css`, polices).
- `demos/cafe`, `demos/commerce`, `demos/artisan` : les démos, chacune décrite par son `site.config.js`.

## Réglages de la vitrine

En haut de `vitrine.js`, objet `CONFIG` : adresse mail de réception et tarif affiché (vide = pas de tarif).

## Créer le site d'un client

1. Copier le dossier de la démo la plus proche et le dossier `moteur/` dans un nouveau dossier.
2. Dans les deux fichiers HTML, remplacer `../../moteur/` par `moteur/`.
3. Modifier `site.config.js` : `sections` choisit les blocs affichés et leur ordre (`apropos`, `carte`, `produits`, `savoirfaire`, `realisations`, `horaires`, `devis`, `infos`), `theme.police` le style (`fraunces`, `bricolage`, `archivo`), `accueil.disposition` la mise en page de l'accueil (`cote` ou `large`).

## Aperçu local

```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000
