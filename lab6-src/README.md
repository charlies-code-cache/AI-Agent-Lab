# Trading Card Lab (React)

Charlie Gray, CSEN 163L, Lab 6 Part 2 (folder named `gray_charlie_lab7` as the slides ask).

My Lab 4 trading card site rebuilt with **React** (set up with **Vite**) and **React Router**. It has the same three
pages and the same look and accessibility features as Lab 4:

| Path       | Page                 | Component               |
| ---------- | -------------------- | ----------------------- |
| `/`        | The card + Click Rush game | `src/pages/Home.jsx`    |
| `/help`    | How to Use           | `src/pages/Help.jsx`    |
| `/support` | Support (contact form) | `src/pages/Support.jsx` |

## How to run

You need [Node.js](https://nodejs.org/en/download) (v20 or newer) and npm.

```
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

To check a production build: `npm run build` (output goes to `dist/`), then `npm run preview`.

## What's where

- `src/main.jsx`: starts React and wraps the app in `BrowserRouter`.
- `src/App.jsx`: the routes.
- `src/components/`: shared pieces. `Layout` (skip link, header, footer), `Header`, `Footer`, `SiteNav`, `Dialog`
  (focus trap + Esc), `WelcomeDialog`, `TradingCard`, `GamePanel`.
- `src/pages/`: one component per Lab 4 page (`Home`, `Help`, `Support`) plus `NotFound`.
- `src/hooks/useClickRush.js`: the game logic from Lab 4's `script.js`, as React state.
- `src/hooks/usePageHeading.js`: sets the tab title and moves focus to the page's `<h1>` after each route change.
- `src/styles/`: `style.css` and `help.css` from Lab 4, nearly unchanged.
- `src/assets/tutorial/`: the four tutorial screenshots.

## Changes from Lab 4 (from Lab 5 Wizard of Oz testing)

- How to Use: a short "What is this site?" paragraph.
- Game panel: a line explaining that the level is the score you need, and that a new best raises it.
- Support: a note above the form saying where the message goes (nowhere, it's a class demo) before it is sent.
