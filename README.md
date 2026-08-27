# The Etruscan Tombs – Secrets of Tarquinia

Interactive Graphics Project – Sapienza University of Rome

---

## Project Overview

**The Etruscan Tombs – Secrets of Tarquinia** is a first-person exploration game developed as the final project for the *Interactive Graphics* course at Sapienza University of Rome.

The game recreates a virtual archaeological environment inspired by the UNESCO World Heritage Site of the **Necropolis of Tarquinia**. Rather than reproducing the site with complete historical accuracy, the project aims to provide an immersive educational experience that combines real-time computer graphics, environmental storytelling, and interactive gameplay.

Players explore ancient Etruscan tombs, discover historical information, collect archaeological equipment, solve environmental puzzles, recover sacred relics, and finally unlock the Sacred Chamber.

---

## Gameplay

The player progresses through the following steps:

1. Read the introduction.
2. Select three archaeological tools.
3. Explore the necropolis.
4. Visit the Etruscan tombs.
5. Read historical information panels.
6. Solve the puzzles hidden inside each tomb.
7. Recover the three Sacred Relics.
8. Unlock the Sacred Chamber.
9. Complete the archaeological expedition.

---

## Features

- First-person exploration
- Interactive archaeological environment
- Six explorable Etruscan tombs
- Equipment selection system
- Inventory management
- Interactive historical documents
- Environmental puzzles
- Collectable archaeological relics
- Dynamic lighting and shadows
- Sacred Chamber final puzzle
- Pause menu
- Loading screen

---

## Controls

| Key | Action |
|------|--------|
| **W A S D** | Move |
| **Mouse** | Look Around |
| **E** | Interact |
| **F** | Open Inventory |
| **Esc** | Pause Menu |

---

## Technologies

- JavaScript (ES6)
- Three.js
- Vite
- HTML5
- CSS3

---

## Run Locally

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Play Online

The project is available on GitHub Pages:

https://sapienzainteractivegraphicscourse.github.io/final-project-etruscan_tombs/

---

## Project Structure

```
final-project-etruscan_tombs
│
├── .github/
│   └── workflows/             GitHub Actions workflow for automatic deployment
│
├── public/
│   └── assets/
│       ├── models/            GLB models (tools, relics, sarcophagus, decorative objects)
│       └── textures/          Environment, tomb, UI and terrain textures
│
├── src/
│   ├── js/
│   │   ├── tombs/            Tombs, puzzles and Sacred Chamber logic
│   │   ├── world.js          Terrain generation and world creation
│   │   ├── player.js         First-person movement and player controls
│   │   ├── gate.js           Main entrance gate logic
│   │   ├── environment.js    Trees, clouds and environmental objects
│   │   ├── inventory.js      Inventory and equipment management
│   │   ├── documents.js      Historical documents and information panels
│   │   ├── loadingManager.js Loading screen management
│   │   └── ...               Additional gameplay modules
│   │
│   ├── main.js               Application entry point and render loop
│   └── style1.css            Main application styles
│
├── index.html                Main HTML page
├── package.json              Project dependencies and scripts
├── vite.config.js            Vite configuration for GitHub Pages
├── README.md                 Project documentation
├── The_Etruscan_Tombs.pdf    Project report
└── The-Etruscan-Tombs-Secrets-of-Tarquinia.pptx
                              Project presentation
```

---

## Authors

Developed by:

**Martina Leggiero**

Interactive Graphics

Sapienza University of Rome

Academic Year 2025–2026
