# Focus Production — Site officiel

Site web de **Olivier Shapiro / Focus_Production**, vidéaste & réalisateur basé à Fribourg, Suisse romande.

## Stack

| Couche | Technologie |
|--------|-------------|
| HTML | Vanilla, sémantique |
| CSS | Custom Properties, zero framework |
| JS | Vanilla ES5/ES6+, zero dépendance NPM |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Formulaire | [Web3Forms](https://web3forms.com) |
| Déploiement | [Vercel](https://vercel.com) |

## Structure

```
├── index.html          # Page principale (one-page)
├── portfolio.html      # Page dédiée portfolio
├── services.html       # Page dédiée services
├── contact.html        # Page dédiée contact
├── admin.html          # Interface admin (status)
├── status.json         # Badge disponibilité + bannière
├── bg.mp4              # Vidéo hero parallaxe
├── vercel.json         # Config Vercel (headers, rewrites, cleanUrls)
└── assets/
    ├── css/
    │   ├── main.css        # Variables, reset, base, scroll-progress
    │   ├── animations.css  # @keyframes + système reveal
    │   ├── components.css  # Tous les composants
    │   └── responsive.css  # Media queries consolidées
    └── js/
        ├── main.js         # Logique principale (cursor, nav, modal…)
        ├── animations.js   # Reveals au scroll + split-text hero
        └── contact.js      # Validation + soumission Web3Forms
```

## Aperçu local

Ouvrir `index.html` directement dans un navigateur suffit. Aucun serveur local requis — le site fonctionne en `file://`.

Pour un serveur local (CORS sur `bg.mp4` sur certains navigateurs) :

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```

## Variables CSS clés

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--gold` | `#c8a96e` | Accent principal |
| `--teal` | `#3abcb1` | Accent secondaire |
| `--amber` | `#c47c2e` | Lumière hero |
| `--bg-primary` | `#09080a` | Fond principal |
| `--text-primary` | `#f2ede6` | Texte principal |
| `--font-serif` | Cormorant Garamond | Titres |
| `--font-sans` | DM Sans | Corps |

## status.json

Contrôle le badge de disponibilité (nav) et la bannière flottante.

```json
{
  "available": true,
  "text": "Disponible",
  "banner": {
    "show": false,
    "message": "Texte de la bannière",
    "link": "#contact"
  }
}
```

Modifier via `admin.html` ou directement dans le fichier.

## Déploiement

Push sur `main` → Vercel déploie automatiquement.

```bash
git add -p
git commit -m "description"
git push origin main
```

URL de production : https://focus--production.vercel.app

## Règles DA

- `border-radius: 0` — aucun coin arrondi
- Palette noirs chauds (#09080a) + or (#c8a96e) + teal (#3abcb1)
- Fonts : Cormorant Garamond (serif) + DM Sans (sans-serif)
- Curseur custom : dot 4px + anneau 24px
- Grain pellicule animé (`body::before`)
- Marques cinéma (╔ ╗ ╚ ╝) dans le hero
