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

### Programming Languages

- JavaScript (ES6)
- HTML5
- CSS3

### Libraries & Frameworks

- Three.js
- PointerLockControls
- GLTFLoader
- Vite

### Development Tools

- Visual Studio Code
- Git
- GitHub
- GitHub Pages

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

```text
final-project-etruscan_tombs
│
├── .github/
│   └── workflows/             GitHub Actions workflow for automatic deployment
│
├── public/
│   └── assets/
│       ├── models/            GLB models (tools, relics, sarcophagus and decorative objects)
│       └── textures/          Environment, terrain, frescoes and UI textures
│
├── src/
│   ├── js/
│   │   ├── tombs/             Tombs, puzzles and Sacred Chamber logic
│   │   ├── world.js           World generation
│   │   ├── player.js          First-person player controller
│   │   ├── gate.js            Main gate interaction
│   │   ├── environment.js     Trees, clouds and environment
│   │   ├── inventory.js       Inventory system
│   │   ├── documents.js       Historical documents and information panels
│   │   ├── loadingManager.js  Loading screen management
│   │   └── ...                Additional gameplay modules
│   │
│   ├── main.js                Application entry point
│   └── style1.css             Main stylesheet
│
├── index.html                 Main HTML page
├── package.json               Project dependencies
├── vite.config.js             Vite configuration
├── README.md                  Project documentation
├── The_Etruscan_Tombs.pdf     Project report
└── The-Etruscan-Tombs-Secrets-of-Tarquinia.pptx
                               Final presentation
```

---

## Credits

### Developed by

**Martina Leggiero**

Interactive Graphics

Sapienza University of Rome

Academic Year 2025–2026

---

## Acknowledgements

This project was developed using open-source software and publicly available resources.

### Software

- Three.js
- Vite
- Visual Studio Code
- Git & GitHub

### 3D Models

Some 3D models used in the project (including archaeological tools, relics and decorative objects) were obtained from **Sketchfab** under their respective licenses and adapted for integration into the game.

### Historical References

The archaeological environment, frescoes and tomb reconstructions were inspired by the **Necropolis of Tarquinia**, a UNESCO World Heritage Site, using publicly available historical and archaeological references.

### Textures

Several textures were created specifically for this project, while others were adapted from freely available resources to match the visual style of the game.

---

## Future Improvements

Future developments could include:

- Environmental audio and ambient sound effects.
- Additional explorable tombs.
- More advanced environmental puzzles.
- Dynamic weather and day/night cycles.
- Non-player characters (NPCs) to enrich the exploration experience.
- Support for mobile devices through responsive touch controls and an optimized user interface.
