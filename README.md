# ASCEND showcase

The public page for **ASCEND**, a private, game-style life system for Android: daily quests, dungeon gates, ranks E to S, coins and a monthly review.

Live page: https://techknowledgedev.github.io/Ascend-showcase/

This repo holds only the page, the playable demo, the 40 second film and the artwork shown on it. The app itself lives in a separate private repository.

## What is here

| Path | What it is |
| --- | --- |
| `index.html` | The whole page. Plain HTML, CSS and a little JavaScript. No build step. |
| `privacy.html` | The ASCEND privacy policy. |
| `assets/ui/` | The playable demo on the page: a small replica of the app's screens drawn from its design system (`ascend-ui.css`, `ascend-ui.js`) and the page's own glue code (`ascend-app.js`). It stores and sends nothing. |
| `assets/video/` | The film (720p MP4) and its poster. |
| `assets/shots/` | Screenshots from the app, status bar cropped. |
| `assets/art/` | Rank crests, title crests, coins, bosses and avatars. |
| `assets/fonts/` | Orbitron and Rajdhani, Latin subsets, SIL Open Font License. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

## Turning on GitHub Pages

Settings, then Pages, then set the source to **Deploy from a branch**, branch **main**, folder **/ (root)**. The page appears at the address above within a minute or two.

## Credits

ASCEND is a personal project. Fonts are Orbitron and Rajdhani under the SIL Open Font License 1.1.

Questions and bug reports: open an issue on this repository.
