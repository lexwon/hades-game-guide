This plan document outlines the logic and data structure for a React-based **Hades Decision Support Tree (DST)**. It codifies the "optimal" configurations and room-priority logic found in the sources to guide a player through a high-performance run.

### 1. The Core Foundation (Static Rules)

#### Optimal Mirror of Night Build
Based on the sources, certain Mirror talents are almost universally considered superior for completing the game and are "locked" into the base configuration:
*   **Dark Foresight (Green):** Critical for increasing the frequency of "Gold Laurel" rooms (Boons, Hammers, Hearts), allowing you to complete your build faster.
*   **Fated Persuasion (Green):** Essential for re-rolling Boon choices to find specific prerequisites for Duo or Legendary boons.
*   **Greater Reflex (Red):** Provides an extra dash, which is vital for both survivability and the DPS of dash-strike-focused aspects.
*   **Boiling Blood (Red):** Provides a +50% damage boost to Attack and Special when a Cast crystal is lodged in an enemy.

#### Aspect Selection
The app will initialize by requiring a **Weapon** and **Aspect** selection. The "Optimal" aspects identified in the sources include:
*   **Stygian Blade:** Aspect of Arthur (Raw power/AoE).
*   **Heart-Seeking Bow:** Aspect of Chiron (Special seeking) or Aspect of Hera (Cast loading).
*   **Shield of Chaos:** Aspect of Beowulf (Dragon Rush burst).
*   **Adamant Rail:** Aspect of Eris (Global damage bonus) or Aspect of Lucifer (Continuous beam).

---

### 2. Decision Tree Logic (Real-Time Input)

The app's real-time engine will use a **Priority Hierarchy** to recommend room choices:

1.  **Daedalus Hammer:** Always the highest priority until two are acquired, as they fundamentally change weapon mechanics.
2.  **Core God (Keepsake Target):** If the player is missing their primary Attack or Special boon required for the build.
3.  **Duo/Legendary Prerequisite:** If the player holds a boon that is one half of a required Duo (e.g., holding Artemis and being offered Aphrodite for **Heart Rend**).
4.  **Survival/Scaling:** Centaur Hearts (if HP is low) or Poms of Power (if core boons are already high rarity).
5.  **Gold Laurels > Blue Laurels:** The app will always advise choosing Boons/Hammers/Hearts over Darkness/Gems/Keys unless the player is specifically farming meta-currency.

---

### 3. Rules codified in JSON Schema

This schema defines how each "Build" is structured, allowing the app to validate its decision-making data.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "HadesBuildDefinition",
  "type": "object",
  "properties": {
    "weapon": {
      "type": "string",
      "enum": ["Blade", "Spear", "Shield", "Bow", "Fists", "Rail"]
    },
    "aspect": {
      "type": "string",
      "description": "The specific weapon aspect that dictates the build logic."
    },
    "mirror_setup": {
      "type": "object",
      "properties": {
        "locked": {
          "type": "array",
          "items": { "type": "string" },
          "default": ["Dark Foresight", "Fated Persuasion", "Greater Reflex", "Boiling Blood"]
        },
        "flex": {
          "type": "string",
          "enum": ["Privileged Status", "Family Favorite"],
          "description": "Choose Privileged Status if the build applies two status curses easily."
        }
      }
    },
    "core_synergies": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "primary_god": { "type": "string" },
          "essential_boon": { "type": "string" },
          "slot": { "type": "string", "enum": ["Attack", "Special", "Cast", "Dash"] }
        }
      }
    },
    "target_duo_boons": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "pair": { "type": "array", "items": { "type": "string" }, "minItems": 2, "maxItems": 2 },
          "priority": { "type": "integer", "minimum": 1, "maximum": 5 }
        }
      }
    },
    "hammer_priorities": {
      "type": "array",
      "items": { "type": "string" },
      "description": "List of Daedalus Hammers in order of importance for this specific aspect."
    }
  },
  "required": ["weapon", "aspect", "core_synergies", "hammer_priorities"]
}
```

### 4. Implementation Example: Aspect of Chiron (Bow)
Using the rules above, the app would load the following data for a Chiron build:
*   **Mirror:** Locked set + **Family Favorite** (since Artemis crits aren't status curses).
*   **Primary God:** **Dionysus** (Special) or **Artemis** (Special).
*   **Essential Hammer:** **Relentless Volley** or **Piercing Volley**.
*   **Decision Logic:** If the user has **Drunken Flourish**, the app will flag **Aphrodite** as a "High Priority" room to chase the **Low Tolerance** Duo Boon.