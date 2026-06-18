import { useMemo, useState } from 'react';
import builds from '../data/builds.json';
import { rewardById } from '../data/rewards';
import type { BuildDefinition, InventoryState, Recommendation, RunState } from '../types';

const typedBuilds = builds as BuildDefinition[];

const emptyInventory: InventoryState = {
  Attack: '',
  Special: '',
  Cast: '',
  Dash: '',
  Call: '',
  Support: '',
};

const initialRunState: RunState = {
  hpPercent: 100,
  gold: 0,
  hammers: 0,
  chamberOptions: [],
  inventory: emptyInventory,
  desiredBoonOffered: true,
};

function hasGodInInventory(inventory: InventoryState, god: string) {
  return Object.values(inventory).some((boon) => boon.includes(god));
}

function scoreReward(build: BuildDefinition, state: RunState, rewardId: string) {
  const reward = rewardById.get(rewardId);

  if (!reward) {
    return { reward: null, score: -1, reasons: ['Unknown chamber reward.'] };
  }

  const reasons: string[] = [];
  let score = 0;

  if (reward.kind === 'hammer') {
    score += state.hammers < 2 ? 100 : 24;
    reasons.push(state.hammers < 2 ? 'Hammer is the top priority until you have two.' : 'Third hammer is useful, but no longer mandatory.');
  }

  if (state.hpPercent < 40 && reward.kind === 'heart') {
    score += 92;
    reasons.push('Low HP mode is active, so survivability jumps above build chasing.');
  }

  const missingCore = build.coreSynergies.filter((core) => !state.inventory[core.slot]);
  const matchingCore = missingCore.find((core) => core.primaryGod === reward.god);

  if (matchingCore) {
    score += 82;
    reasons.push(`Missing ${matchingCore.essentialBoon} for ${matchingCore.slot}.`);
  }

  const duoMatches = build.targetDuoBoons.filter((duo) => {
    if (!reward.god || !duo.pair.includes(reward.god)) return false;
    const partner = duo.pair.find((god) => god !== reward.god);
    return Boolean(partner && hasGodInInventory(state.inventory, partner));
  });

  for (const duo of duoMatches) {
    score += 68 + duo.priority;
    reasons.push(`You have one half of ${duo.name}; ${reward.god} can unlock the chase.`);
  }

  if (reward.kind === 'heart') {
    score += state.hpPercent < 70 ? 42 : 25;
    reasons.push(state.hpPercent < 70 ? 'Extra max HP is good while your health is pressured.' : 'Centaur Heart is solid scaling.');
  }

  if (reward.kind === 'pom') {
    const hasCore = build.coreSynergies.some((core) => state.inventory[core.slot]);
    score += hasCore ? 36 : 18;
    reasons.push(hasCore ? 'Pom can scale an acquired core boon.' : 'Pom is better after core boons are online.');
  }

  if (reward.kind === 'god') {
    score += 34;
    reasons.push(`${reward.god} is a gold-laurel boon room.`);
  }

  if (reward.kind === 'shop') {
    score += state.gold >= 150 ? 35 : 14;
    reasons.push(state.gold >= 150 ? 'You have enough obols for a useful shop stop.' : 'Shop is weaker without spending money.');
  }

  if (reward.kind === 'obol') {
    score += state.gold < 150 ? 28 : 20;
    reasons.push('Obols help fund shops and wells.');
  }

  if (reward.kind === 'chaos') {
    score += state.hpPercent > 60 ? 32 : 10;
    reasons.push(state.hpPercent > 60 ? 'Chaos is worth considering while healthy.' : 'Chaos is risky at low HP.');
  }

  if (reward.laurel === 'blue') {
    score += 4;
    reasons.push('Blue-laurel rooms are lowest priority during a completion push.');
  }

  return { reward, score, reasons };
}

function getRecommendation(build: BuildDefinition, state: RunState): Recommendation {
  if (state.chamberOptions.length === 0) {
    return {
      reward: null,
      score: 0,
      title: 'Select chamber doors',
      reasons: ['Pick two or three visible rewards to get a recommendation.'],
      rerollAlert: null,
    };
  }

  const ranked = state.chamberOptions
    .map((rewardId) => scoreReward(build, state, rewardId))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const reward = best.reward;
  const title = reward ? `Choose ${reward.label}` : 'No recommendation';
  const coreTarget = reward?.god
    ? build.coreSynergies.find((core) => core.primaryGod === reward.god && !state.inventory[core.slot])
    : undefined;
  const duoTarget = reward?.god
    ? build.targetDuoBoons.find((duo) => {
        const partner = duo.pair.find((god) => god !== reward.god);
        return duo.pair.includes(reward.god!) && Boolean(partner && hasGodInInventory(state.inventory, partner));
      })
    : undefined;
  const rerollAlert =
    reward?.kind === 'god' && !state.desiredBoonOffered && (coreTarget || duoTarget)
      ? `Use Fated Persuasion if ${reward.god} does not show ${coreTarget?.essentialBoon ?? duoTarget?.name}.`
      : null;

  return {
    reward,
    score: best.score,
    title,
    reasons: best.reasons,
    rerollAlert,
  };
}

export function useRunEngine() {
  const [activeBuildId, setActiveBuildId] = useState<string | null>(null);
  const [state, setState] = useState<RunState>(initialRunState);

  const activeBuild = useMemo(
    () => typedBuilds.find((build) => build.id === activeBuildId) ?? typedBuilds[0],
    [activeBuildId],
  );

  const recommendation = useMemo(() => getRecommendation(activeBuild, state), [activeBuild, state]);

  const startRun = (buildId: string) => {
    setActiveBuildId(buildId);
    setState(initialRunState);
  };

  const resetRun = () => {
    setActiveBuildId(null);
    setState(initialRunState);
  };

  const updateState = (patch: Partial<RunState>) => {
    setState((current) => ({ ...current, ...patch }));
  };

  const updateInventory = (slot: keyof InventoryState, value: string) => {
    setState((current) => ({
      ...current,
      inventory: { ...current.inventory, [slot]: value },
    }));
  };

  const toggleChamberOption = (rewardId: string) => {
    setState((current) => {
      const exists = current.chamberOptions.includes(rewardId);
      const next = exists
        ? current.chamberOptions.filter((id) => id !== rewardId)
        : [...current.chamberOptions, rewardId].slice(-3);

      return { ...current, chamberOptions: next };
    });
  };

  return {
    builds: typedBuilds,
    activeBuildId,
    activeBuild,
    state,
    recommendation,
    startRun,
    resetRun,
    updateState,
    updateInventory,
    toggleChamberOption,
  };
}
