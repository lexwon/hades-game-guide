import { RotateCcw, Settings } from 'lucide-react';
import type { BuildDefinition } from '../types';

interface RunHeaderProps {
  build: BuildDefinition;
  onReset: () => void;
}

export function RunHeader({ build, onReset }: RunHeaderProps) {
  return (
    <header className="run-header">
      <div>
        <p className="eyebrow">{build.weapon}</p>
        <h1>{build.aspect}</h1>
        <span className="duo-target">{build.targetDuoBoons.map((duo) => duo.name).join(' / ')}</span>
      </div>
      <div className="header-actions">
        <button className="icon-button" type="button" title="Settings">
          <Settings size={18} />
        </button>
        <button className="icon-button" type="button" title="Reset run" onClick={onReset}>
          <RotateCcw size={18} />
        </button>
      </div>
    </header>
  );
}
