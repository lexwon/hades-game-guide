import { ChevronDown } from 'lucide-react';
import type { BuildDefinition, BoonSlot, InventoryState } from '../types';

interface BoonInventoryProps {
  build: BuildDefinition;
  inventory: InventoryState;
  onChange: (slot: BoonSlot, value: string) => void;
}

const slots: BoonSlot[] = ['Attack', 'Special', 'Cast', 'Dash', 'Call', 'Support'];

const supportBoons = [
  'Zeus Support',
  'Poseidon Support',
  'Athena Support',
  'Aphrodite Support',
  'Artemis Support',
  'Ares Support',
  'Dionysus Support',
  'Demeter Support',
];

export function BoonInventory({ build, inventory, onChange }: BoonInventoryProps) {
  const optionsBySlot = slots.reduce<Record<BoonSlot, string[]>>((options, slot) => {
    const core = build.coreSynergies.filter((synergy) => synergy.slot === slot).map((synergy) => synergy.essentialBoon);
    options[slot] = [...core, ...supportBoons];
    return options;
  }, {} as Record<BoonSlot, string[]>);

  return (
    <details className="hud-section inventory" open>
      <summary>
        <span>Inventory</span>
        <ChevronDown size={16} />
      </summary>
      <div className="inventory-grid">
        {slots.map((slot) => (
          <label key={slot}>
            <span>{slot}</span>
            <select value={inventory[slot]} onChange={(event) => onChange(slot, event.target.value)}>
              <option value="">Empty</option>
              {optionsBySlot[slot].map((boon) => (
                <option key={`${slot}-${boon}`} value={boon}>
                  {boon}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="hammer-list">
        <span>Hammer chase</span>
        <p>{build.hammerPriorities.join(' -> ')}</p>
      </div>
    </details>
  );
}
