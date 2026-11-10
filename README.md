# AI-Agent-Lab
My first trading card site, built with an AI coding agent (CSEN 163L Lab 3).

## Lab 4: accessibility and help pages
- `index.html`: the card, now with a welcome pop-up (focus moves in, Esc closes, "don't show again"), skip link, nav to the help pages, a live game-status region, focus-trapped dialogs, reduced-motion support, and a stacked layout on phones.
- `help.html`: How to Use. Step-by-step screenshot tutorial with keyboard shortcuts, plus FAQs.
- `support.html`: Support. Contact form with a custom error message (error summary + inline errors) and a success message.
- `wireframes/`: low-fidelity Penpot wireframes for both help pages.

## Lab 6: the same site in React
Live: https://charlies-code-cache.github.io/AI-Agent-Lab/lab6/

- `lab6-src/`: the source. React set up with Vite, routing with React Router. See `lab6-src/README.md` to run it (`npm install`, `npm run dev`).
- `lab6/`: the built site GitHub Pages serves (`BASE_PATH=/AI-Agent-Lab/lab6/ npm run build`).
- `404.html`: lets links like `/lab6/help` load the React app on GitHub Pages.
- The Lab 4 pages at the root are unchanged.
