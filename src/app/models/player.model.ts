export interface Attributes {
  str: number;
  dex: number;
  int: number;
  vit: number;
  lck: number;
}

export type ElementType = 'fogo' | 'gelo' | 'luz' | 'sombra' | 'raio' | 'vento';

export interface Skill {
  id: string;
  name: string;
  description: string;
  element: ElementType;
  power: number;
  manaCost: number;
  isCustom: boolean;
  combinationElements?: ElementType[];
  efficiency: number;
  cooldown: number;
  icon: string;
  levelRequired: number;
}

export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  attributes: Attributes;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  skillPoints: number;
  skills: Skill[];
  unlockedSkills: string[];
  corruption: number;
  equippedItems: string[];
  inventory: string[];
  prestigeLevel: number;
  gold: number;
}

export const INITIAL_ATTRIBUTES: Attributes = {
  str: 5,
  dex: 5,
  int: 5,
  vit: 5,
  lck: 5
};

export const BASE_HEALTH = 100;
export const BASE_MANA = 50;
