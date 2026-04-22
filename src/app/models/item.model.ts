export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'material';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  value: number;
  stats?: ItemStats;
  effects?: ItemEffect[];
  levelRequired: number;
  icon: string;
}

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ItemStats {
  attack?: number;
  defense?: number;
  health?: number;
  mana?: number;
  str?: number;
  dex?: number;
  int?: number;
  vit?: number;
  lck?: number;
}

export interface ItemEffect {
  type: string;
  value: number;
  duration?: number;
  chance?: number;
}

export interface Equipment extends Item {
  slot: EquipmentSlot;
  setName?: string;
}

export type EquipmentSlot = 'weapon' | 'head' | 'chest' | 'legs' | 'accessory1' | 'accessory2';

export interface Consumable extends Item {
  healAmount?: number;
  manaAmount?: number;
  buffDuration?: number;
  buffEffect?: ItemEffect;
}

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#9ca3af',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#f59e0b'
};
