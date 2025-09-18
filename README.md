
# La Délicieuserie — Site vitrine (v3, images locales)

## Contenu
- `index.html`, `styles.css`, `script.js`
- `assets/logo.png`, `assets/favicon.png`
- `assets/images/` : **placeholders** prêts à être remplacés
  - `hero.jpg`, `produit1.jpg`, `produit2.jpg`, `produit3.jpg`, `produit4.jpg`, `atelier.jpg`, `personnalisation.jpg`, `contact.jpg`

## Changer les images
- Remplacez les fichiers dans `assets/images/` par vos photos (gardez les mêmes noms), **aucune modification de code nécessaire**.
- Le **hero** est défini dans `styles.css` via :
  ```css
  .hero { background: linear-gradient(...), url("assets/images/hero.jpg") center/cover no-repeat; }
  ```

## Formulaire (Formspree)
- Remplacez `https://formspree.io/f/your-id` dans `index.html` par votre endpoint Formspree.
- Alternative Netlify Forms possible si vous migrez l'hébergement.

## Optimisations mobile & tablette
- Menu mobile collé à la barre (positionné via `.navbar` + `top: calc(100% + 8px)` et transition douce).
- Sections compressées (marges, tailles d’images), CTA flex wrap, sliders scrollables.
