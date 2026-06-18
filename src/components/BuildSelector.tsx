import { Check, Swords } from 'lucide-react';
import type { BuildDefinition } from '../types';

interface BuildSelectorProps {
  builds: BuildDefinition[];
  selectedBuildId: string;
  onSelect: (buildId: string) => void;
  onStart: (buildId: string) => void;
}

export function BuildSelector({ builds, selectedBuildId, onSelect, onStart }: BuildSelectorProps) {
  const selectedBuild = builds.find((build) => build.id === selectedBuildId) ?? builds[0];

  return (
    <main className="setup-shell">
      <section className="brand-panel">
        <div className="sigil" aria-hidden="true">
          <Swords size={34} strokeWidth={1.7} />
        </div>
        <div>
          <p className="eyebrow">Decision Support Tree</p>
          <h1>Hades Run HUD</h1>
        </div>
      </section>

      <section className="weapon-grid" aria-label="Weapon selection">
        {builds.map((build) => (
          <button
            className={`weapon-tile ${build.id === selectedBuildId ? 'selected' : ''}`}
            key={build.id}
            onClick={() => onSelect(build.id)}
            type="button"
          >
            <span>{build.weapon}</span>
            <strong>{build.aspect.replace('Aspect of ', '')}</strong>
          </button>
        ))}
      </section>

      <section className="aspect-panel">
        <div className="panel-heading">
          <span className="badge">
            <Check size={14} /> Optimal
          </span>
          <span>{selectedBuild.flexMirror}</span>
        </div>
        <h2>{selectedBuild.aspect}</h2>
        <p>{selectedBuild.summary}</p>
        <div className="target-list">
          {selectedBuild.coreSynergies.map((core) => (
            <span key={`${core.slot}-${core.essentialBoon}`}>
              {core.slot}: {core.essentialBoon}
            </span>
          ))}
        </div>
        <button className="primary-action" onClick={() => onStart(selectedBuild.id)} type="button">
          Start Run
        </button>
      </section>
    </main>
  );
}
