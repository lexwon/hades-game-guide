# Hades Decision Support Tree (DST)

An interactive, Hades-themed companion web application built with **React, TypeScript, and Vite** that provides real-time decision recommendations for room door rewards during a run of the game *Hades*.

This app is formatted as a compact **Mini-HUD** that can sit in a side window on your PC or run on a mobile device next to your keyboard.

---

## Key Features

1.  **Weapon-First Build Setup**:
    - Choose one of the 6 weapons.
    - Displays the **optimal weapon aspect** and preloaded build archetype.
2.  **Interactive Run Tracker**:
    - Input the options available at your current chamber doors (e.g. Zeus Boon vs. Centaur Heart vs. Daedalus Hammer).
    - Get instant, color-coded recommendations and rationale based on your target build.
3.  **Dynamic HP Shift**:
    - Input your current HP percentage. If it drops below 40%, the engine automatically prioritizes healing and max-HP rooms (Centaur Hearts) above core boons.
4.  **Fated Persuasion Reroll Alerts**:
    - Flags when you should roll for better options at doors or boon offerings.
5.  **Slot-Based Quick Inventory**:
    - Manage your acquired upgrades (Attack, Special, Cast, Dash, Call, Support) in a compact, high-density HUD element.

---

## Tech Stack & Setup

- **Core**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS (Hades aesthetic with crimson, obsidian, gold, and glowing states)
- **Package Manager**: `pnpm`

### Installation

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Start the local development server:
    ```bash
    pnpm run dev
    ```
3.  Build the production bundle:
    ```bash
    pnpm run build
    ```

---

## Project Structure

- `documentation/plan.md` - Technical implementation details.
- `documentation/concept.md` - Core logical structure schema.
- `src/`
  - `components/` - React components (BuildSelector, ChamberSelector, BoonInventory)
  - `data/` - Static JSON files representing the builds and upgrades
  - `hooks/` - Core logic hook (`useRunEngine.ts`)
  - `styles/` - Custom themes (`variables.css`, `hud.css`)
  - `types.ts` - TypeScript interfaces
