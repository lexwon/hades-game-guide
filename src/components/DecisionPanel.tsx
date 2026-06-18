import { AlertTriangle, Flame } from 'lucide-react';
import type { Recommendation } from '../types';

interface DecisionPanelProps {
  recommendation: Recommendation;
}

export function DecisionPanel({ recommendation }: DecisionPanelProps) {
  return (
    <section className="decision-panel" aria-live="polite">
      <div className="decision-title">
        <Flame size={18} />
        <div>
          <span>Recommendation</span>
          <h2>{recommendation.title}</h2>
        </div>
      </div>
      <ul>
        {recommendation.reasons.slice(0, 3).map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
      {recommendation.rerollAlert ? (
        <div className="reroll-alert">
          <AlertTriangle size={16} />
          <span>{recommendation.rerollAlert}</span>
        </div>
      ) : null}
    </section>
  );
}
