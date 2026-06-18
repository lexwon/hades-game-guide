import { rewards } from '../data/rewards';
import type { RunState } from '../types';

interface ChamberSelectorProps {
  selectedOptions: string[];
  desiredBoonOffered: boolean;
  onToggleOption: (rewardId: string) => void;
  onDesiredBoonOfferedChange: (value: boolean) => void;
}

export function ChamberSelector({
  selectedOptions,
  desiredBoonOffered,
  onToggleOption,
  onDesiredBoonOfferedChange,
}: ChamberSelectorProps) {
  const groupedRewards = {
    Build: rewards.filter((reward) => ['hammer', 'god'].includes(reward.kind)),
    Scaling: rewards.filter((reward) => ['heart', 'pom', 'obol', 'shop', 'chaos'].includes(reward.kind)),
    Other: rewards.filter((reward) => reward.laurel === 'blue'),
  };

  return (
    <section className="hud-section">
      <div className="section-title">
        <h2>Chamber Doors</h2>
        <span>{selectedOptions.length}/3</span>
      </div>
      {Object.entries(groupedRewards).map(([group, groupRewards]) => (
        <div className="reward-group" key={group}>
          <p>{group}</p>
          <div className="reward-grid">
            {groupRewards.map((reward) => (
              <button
                className={`reward-button ${selectedOptions.includes(reward.id) ? 'selected' : ''} ${reward.laurel}`}
                key={reward.id}
                onClick={() => onToggleOption(reward.id)}
                title={reward.label}
                type="button"
              >
                <span>{reward.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <label className="toggle-row">
        <input
          checked={desiredBoonOffered}
          onChange={(event) => onDesiredBoonOfferedChange(event.target.checked)}
          type="checkbox"
        />
        Desired boon appeared
      </label>
    </section>
  );
}
