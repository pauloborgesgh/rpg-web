import { Player, Skill } from './player.model';

export interface Enemy {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  xpReward: number;
  lootTable: LootItem[];
  skills: string[];
  isElite: boolean;
  isBoss: boolean;
  region: string;
}

export interface Boss extends Enemy {
  phases: BossPhase[];
  currentPhase: number;
  learnedSkills: string[];
  aiPattern: AIPattern[];
  resistances: string[];
}

export interface BossPhase {
  healthThreshold: number;
  newSkills: string[];
  attackPattern: string;
  visualEffect?: string;
}

export interface LootItem {
  itemId: string;
  dropRate: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface AIPattern {
  type: 'aggressive' | 'defensive' | 'adaptive';
  condition: string;
  action: string;
  learned: boolean;
}

export const ELEMENTAL_STRENGTHS: Record<string, string[]> = {
  fogo: ['gelo', 'vento'],
  gelo: ['vento', 'sombra'],
  luz: ['sombra'],
  sombra: ['luz', 'raio'],
  raio: ['agua'],
  vento: ['fogo']
};

export const ELEMENTAL_WEAKNESSES: Record<string, string[]> = {
  fogo: ['agua', 'gelo'],
  gelo: ['fogo', 'raio'],
  luz: ['sombra'],
  sombra: ['luz'],
  raio: ['vento'],
  vento: ['gelo']
};
