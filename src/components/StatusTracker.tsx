import { Heart, Pickaxe, WalletCards } from 'lucide-react';
import type { RunState } from '../types';

interface StatusTrackerProps {
  state: RunState;
  onChange: (patch: Partial<RunState>) => void;
}

export function StatusTracker({ state, onChange }: StatusTrackerProps) {
  return (
    <section className="status-grid" aria-label="Run status">
      <label className="meter-card hp-meter">
        <span>
          <Heart size={16} /> HP
        </span>
        <strong>{state.hpPercent}%</strong>
        <input
          min="1"
          max="100"
          type="range"
          value={state.hpPercent}
          onChange={(event) => onChange({ hpPercent: Number(event.target.value) })}
        />
      </label>
      <label className="meter-card">
        <span>
          <WalletCards size={16} /> Gold
        </span>
        <input
          min="0"
          inputMode="numeric"
          type="number"
          value={state.gold}
          onChange={(event) => onChange({ gold: Number(event.target.value) })}
        />
      </label>
      <label className="meter-card">
        <span>
          <Pickaxe size={16} /> Hammers
        </span>
        <select value={state.hammers} onChange={(event) => onChange({ hammers: Number(event.target.value) })}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>
    </section>
  );
}
