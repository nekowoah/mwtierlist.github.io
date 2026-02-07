# mwtierlist
MWR tier list viewer.  
Live site: https://nekowoah.github.io/mwtierlist/

## Project structure (modular)

```
mwtierlist/
├── index.html              # Entry HTML (Vite)
├── index.legacy.html        # Original single-file app (backup)
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx            # React mount
│   ├── App.jsx              # Main app + layout
│   ├── index.css            # Global styles (scrollbar, body)
│   ├── config/
│   │   ├── constants.js     # RANK_ORDER, RANK_COLORS, CLASSES
│   │   └── sheet.js         # Google Sheets config
│   ├── data/
│   │   ├── preloadedHeroes.json   # Fallback tier data
│   │   └── preloadedHeroes.js     # Re-export for app
│   ├── utils/
│   │   ├── csv.js           # CSV parsing
│   │   └── sheet.js         # fetchSheetData, mapSheetRowToHero
│   └── components/
│       ├── index.js         # Barrel exports
│       ├── Icons.jsx        # SVG icons
│       ├── Modal.jsx
│       ├── HeroCard.jsx
│       └── TierRow.jsx
└── README.md
```

## Commands

- **Develop:** `npm install` then `npm run dev`
- **Build:** `npm run build` → output in `dist/`
- **Preview build:** `npm run preview`

## Deploy to GitHub Pages

1. Build: `npm run build`
2. Deploy the **contents of `dist/`** to the branch GitHub Pages uses (e.g. `gh-pages` or the repo root if configured).  
   The app uses `base: '/mwtierlist/'` in `vite.config.js` for correct asset paths on `https://nekowoah.github.io/mwtierlist/`.

## Google Sheets (optional)

See `src/config/sheet.js`. Set `SHEET_ID` and optionally `DATA_SHEET_GID` to load tier data from a published sheet. Share the sheet as “Anyone with the link can view” and use **File → Publish to the web** for the data tab.
