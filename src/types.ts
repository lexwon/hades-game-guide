export type Weapon = 'Blade' | 'Spear' | 'Shield' | 'Bow' | 'Fists' | 'Rail';

export type BoonSlot = 'Attack' | 'Special' | 'Cast' | 'Dash' | 'Call' | 'Support';

export type RewardKind =
  | 'god'
  | 'hammer'
  | 'heart'
  | 'pom'
  | 'obol'
  | 'shop'
  | 'chaos'
  | 'trial'
  | 'blue';

export interface CoreSynergy {
  primaryGod: string;
  essentialBoon: string;
  slot: BoonSlot;
}

export interface DuoBoon {
  name: string;
  pair: [string, string];
  priority: number;
}

export interface BuildDefinition {
  id: string;
  weapon: Weapon;
  aspect: string;
  summary: string;
  flexMirror: 'Privileged Status' | 'Family Favorite';
  coreSynergies: CoreSynergy[];
  targetDuoBoons: DuoBoon[];
  hammerPriorities: string[];
}

export interface ChamberReward {
  id: string;
  label: string;
  shortLabel: string;
  kind: RewardKind;
  god?: string;
  laurel: 'gold' | 'blue' | 'none';
}

export interface InventoryState {
  Attack: string;
  Special: string;
  Cast: string;
  Dash: string;
  Call: string;
  Support: string;
}

export interface RunState {
  hpPercent: number;
  gold: number;
  hammers: number;
  chamberOptions: string[];
  inventory: InventoryState;
  desiredBoonOffered: boolean;
}

export interface Recommendation {
  reward: ChamberReward | null;
  score: number;
  title: string;
  reasons: string[];
  rerollAlert: string | null;
}
