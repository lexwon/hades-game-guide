# Hades Decision Support Tree (DST) - Compact Web Application

This document outlines the architecture and design of the Hades Decision Support Tree (DST) companion app. This app is designed as a **Mini HUD / Compact** interface to fit easily in a small side window or on a mobile device next to your screen, providing **real-time manual tracking** as you play.

---

## Technical Stack & Aesthetics
- **Core**: React + TypeScript (built with Vite for fast HMR)
- **Package Manager**: `pnpm`
- **Styling**: Vanilla CSS with custom design tokens for a premium, immersive **Hades** aesthetic (gold, crimson, dark slate, glowing states, and clean typography).
- **Layout**: Mini HUD format (optimized for narrow widths, e.g., 360px - 450px, but responsive to expand cleanly).

---

## Real-Time Tracking & Decision Logic

### Build Setup Flow (Weapon-First)
1.  **Weapon Selection**: The user is first prompted to select a weapon (e.g., Bow, Rail, Blade, Spear, Shield, Fists).
2.  **Optimal Aspect Recommendation**: Once a weapon is selected, the UI immediately displays and highlights the **optimal aspect** (e.g., choosing Bow shows Chiron as the optimal selection, Rail shows Eris, etc.) along with its corresponding preloaded build archetype.
3.  **Confirm & Start**: The user can accept the recommended optimal aspect (or choose another supported aspect) and click "Start Run" to enter the tracking interface.

### Real-Time Companion Tracking Workflow
1.  **Chamber Selection**: When presented with a choice of doors (chambers) in-game, the player clicks the corresponding reward icons in the Chamber Selector (e.g., **Zeus** vs. **Centaur Heart** vs. **Poseidon**). The app **instantly** computes and displays the recommended door with the rationale (e.g., *"Choose Zeus: High Priority target for Eris Rail build"*).
2.  **Inventory Updates**: When the player picks up a Boon or Daedalus Hammer, they click the corresponding slot (e.g. *Attack*) and select the acquired Boon. This updates the engine state.

### 1. Supported Top-Tier Builds (6 Weapons, 6 Aspects)
We preload 6 highly optimized builds:
1.  **Bow - Aspect of Chiron (Optimal Bow)**: Target Dionysus Special + Aphrodite Attack -> seeking **Low Tolerance** Duo Boon. Relentless Volley hammer.
2.  **Rail - Aspect of Eris (Optimal Rail)**: Target Zeus Attack + Poseidon Dash -> seeking **Sea Storm** Duo Boon. Rocket Bomb/Triple Bomb hammer.
3.  **Blade - Aspect of Arthur (Optimal Blade)**: Target Athena Dash/Attack + Aphrodite Special/Attack -> seeking **Heart Rend** Duo Boon. Shadow Slash/Flurry Slash hammer.
4.  **Spear - Aspect of Achilles (Optimal Spear)**: Target Ares Cast + Artemis Dash/Boon -> seeking **Hunting Blades** Duo Boon. Flurry Jab hammer.
5.  **Shield - Aspect of Beowulf (Optimal Shield)**: Target Poseidon Cast + Artemis Attack/Boon -> seeking **Mirage Shot** Duo Boon. Charged Flight/Sudden Rush hammer.
6.  **Fists - Aspect of Demeter (Optimal Fists)**: Target Ares Attack + Athena Special/Dash -> seeking **Merciful End** Duo Boon. Long Knuckle/Breaker Cutter hammer.

### 2. Decision Engine Priority Rules
The engine recommends room choices based on real-time inputs using these priorities:
1.  **Daedalus Hammer**: Highest priority until 2 are acquired.
2.  **Target God / Core Boon**: If the player is missing their primary Attack, Special, or Cast boon required for the build.
3.  **Duo/Legendary Prerequisite**: If the player has a prerequisite and the offered room features one of the Duo partners.
4.  **Survival/Scaling**: Centaur Hearts (HP) or Poms of Power.
5.  **Gold Laurels > Blue Laurels**: Priority for Boons/Hammers/Hearts over Darkness/Gems/Keys.

#### Situational Adjustments:
- **Low HP Mode**: If the user sets their current HP percentage below **40%**, the priority of **Centaur Hearts / Healing** dynamically jumps above Core Boons/Duo chases.
- **Reroll Alerts**: If the player visits a target god but the offered boons do not match the target prerequisites, the app fires a **Reroll Alert** advising the use of *Fated Persuasion*.

---

## UI Components (Mini HUD Layout)
1.  **Build Selector Screen (Weapon-First)**:
    - Grid of weapons. Clicking a weapon expands/highlights the recommended optimal aspect and details of the build.
    - "Start Run" button.
2.  **Header & Build Banner (Active Run)**: Displays active weapon, aspect, and target Duo boon with a settings/reset toggle.
3.  **Status Tracker**: Small inputs for:
    - Current HP % (slider or fast input)
    - Gold / Coins
    - Hammers acquired (0, 1, or 2)
4.  **Chamber Selector**:
    - Interactive icons representing room options (e.g. Zeus, Poseidon, Hammer, Pom, Heart, Obol, Darkness).
    - Player clicks 2 or 3 options they are currently facing.
5.  **Decision & Recommendation Panel**:
    - Instantly displays the recommended choice in a bold, styled banner with reasons.
    - Highlights Fated Persuasion alerts if applicable.
6.  **Compact Inventory**:
    - A collapsable/high-density inventory grid showing acquired boons categorized by slot.

---

## Project Structure
- `package.json` & `vite.config.js`
- `src/`
  - `data/`
    - `builds.json` - Complete definitions of the 6 core builds, their prerequisites, and priority rules.
  - `hooks/`
    - `useRunEngine.ts` - State machine tracking inventory, HP, gold, and running the decision logic.
  - `styles/`
    - `variables.css` - Custom variables (colors, fonts, shadow glows).
    - `hud.css` - Styles for the compact HUD.
  - `components/`
    - `BuildSelector.tsx` - Weapon selection and optimal aspect recommendation.
    - `ChamberSelector.tsx` - Quick-select panel for room choices.
    - `BoonInventory.tsx` - Compact checklist of active upgrades.
  - `App.tsx` - Central assembly.
  - `types.ts` - TypeScript interfaces/types for Builds, Boons, and RunState.

---

## Verification Plan

### Automated Verification
- Verify code compiles cleanly with `pnpm run build`.

### Manual Testing Protocol
1.  **Build Setup Flow**: Click "Bow". Verify "Aspect of Chiron" is marked as optimal and highlighted. Click "Start Run".
2.  **Hammer Priority**: Input room options: "Daedalus Hammer" vs. "Dionysus Boon". Verify Hammer is recommended. Set Hammers acquired to 2; verify Dionysus is now recommended.
3.  **Low HP Shift**: Input room options: "Centaur Heart" vs. "Aphrodite Boon" (Chiron build). Default recommend: Aphrodite Boon. Set HP slider to 25%; verify recommendation changes to Centaur Heart.
4.  **Reroll Trigger**: Add Dionysus Boon, select Aphrodite Room. Toggle "Needs Reroll Alert" state to verify a notification tells the player when they don't get the desired prerequisite boon.
