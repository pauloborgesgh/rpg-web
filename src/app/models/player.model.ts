export interface Attributes {
  str: number;
  dex: number;
  int: number;
  vit: number;
  lck: number;
}

export type ElementType = 'fogo' | 'gelo' | 'luz' | 'sombra' | 'raio' | 'vento';
export type PlayerClass = 'warrior' | 'mage' | 'rogue' | 'ranger';

export const CLASS_INFO: Record<PlayerClass, { name: string; icon: string; description: string; bonus: Partial<Attributes> }> = {
  warrior: { name: 'Guerreiro', icon: '⚔️', description: 'lutador corpo a corpo com alta defesa', bonus: { str: 2 } },
  mage: { name: 'Mago', icon: '🔮', description: 'mestre das artes arcanas', bonus: { int: 2 } },
  rogue: { name: 'Ladrão', icon: '🗡️', description: 'veloz e furtivo', bonus: { dex: 2 } },
  ranger: { name: 'Caçador', icon: '🏹', description: 'expert em combate à distância', bonus: { dex: 1, lck: 1 } }
};

export const CLASS_AVATARS: Record<PlayerClass, string[]> = {
  warrior: ['🛡️', '🪖', '⚔️', '👹', '🧙‍♂️', '🦾'],
  mage: ['🔮', '🧙', '🧙‍♀️', '🌙', '⭐', '🌟'],
  rogue: ['🗡️', '🥷', '🌑', '💨', '⚔️', '🌚'],
  ranger: ['🏹', '🧝', '🧝‍♂️', '🌲', '🐺', '🎯']
};

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
  attributePoints: number;
  skills: Skill[];
  unlockedSkills: string[];
  corruption: number;
  equippedItems: string[];
  inventory: string[];
  prestigeLevel: number;
  gold: number;
  class: PlayerClass;
  avatar: string;
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
