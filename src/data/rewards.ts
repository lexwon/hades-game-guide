import type { ChamberReward } from '../types';

export const rewards: ChamberReward[] = [
  { id: 'hammer', label: 'Daedalus Hammer', shortLabel: 'Hm', kind: 'hammer', laurel: 'gold' },
  { id: 'zeus', label: 'Zeus Boon', shortLabel: 'Zs', kind: 'god', god: 'Zeus', laurel: 'gold' },
  { id: 'poseidon', label: 'Poseidon Boon', shortLabel: 'Po', kind: 'god', god: 'Poseidon', laurel: 'gold' },
  { id: 'athena', label: 'Athena Boon', shortLabel: 'At', kind: 'god', god: 'Athena', laurel: 'gold' },
  { id: 'aphrodite', label: 'Aphrodite Boon', shortLabel: 'Af', kind: 'god', god: 'Aphrodite', laurel: 'gold' },
  { id: 'artemis', label: 'Artemis Boon', shortLabel: 'Ar', kind: 'god', god: 'Artemis', laurel: 'gold' },
  { id: 'ares', label: 'Ares Boon', shortLabel: 'Ae', kind: 'god', god: 'Ares', laurel: 'gold' },
  { id: 'dionysus', label: 'Dionysus Boon', shortLabel: 'Di', kind: 'god', god: 'Dionysus', laurel: 'gold' },
  { id: 'demeter', label: 'Demeter Boon', shortLabel: 'De', kind: 'god', god: 'Demeter', laurel: 'gold' },
  { id: 'heart', label: 'Centaur Heart', shortLabel: 'HP', kind: 'heart', laurel: 'gold' },
  { id: 'pom', label: 'Pom of Power', shortLabel: 'Pom', kind: 'pom', laurel: 'gold' },
  { id: 'obol', label: 'Obols', shortLabel: '$', kind: 'obol', laurel: 'gold' },
  { id: 'shop', label: 'Charon Shop', shortLabel: 'Sh', kind: 'shop', laurel: 'none' },
  { id: 'chaos', label: 'Chaos Gate', shortLabel: 'Ch', kind: 'chaos', laurel: 'none' },
  { id: 'darkness', label: 'Darkness', shortLabel: 'Dk', kind: 'blue', laurel: 'blue' },
  { id: 'gemstones', label: 'Gemstones', shortLabel: 'Gm', kind: 'blue', laurel: 'blue' },
  { id: 'key', label: 'Chthonic Key', shortLabel: 'Ky', kind: 'blue', laurel: 'blue' }
];

export const rewardById = new Map(rewards.map((reward) => [reward.id, reward]));
