import { Item, EquipmentSlot, ItemStats } from '../models';

export interface ItemData extends Item {
  slot?: EquipmentSlot;
  healAmount?: number;
  manaAmount?: number;
}

export const ITEMS_DATA: Record<string, ItemData> = {
  potion_hp: {
    id: 'potion_hp',
    name: 'Poção de Vida',
    description: 'Restaura 30 HP',
    type: 'consumable',
    rarity: 'common',
    value: 20,
    levelRequired: 1,
    icon: '❤️',
    healAmount: 30
  },
  potion_mp: {
    id: 'potion_mp',
    name: 'Poção de Mana',
    description: 'Restaura 20 MP',
    type: 'consumable',
    rarity: 'common',
    value: 25,
    levelRequired: 1,
    icon: '💙',
    manaAmount: 20
  },
  potion_hp_green: {
    id: 'potion_hp_green',
    name: 'Poção de Vida Grande',
    description: 'Restaura 80 HP',
    type: 'consumable',
    rarity: 'uncommon',
    value: 60,
    levelRequired: 3,
    icon: '💚',
    healAmount: 80
  },
  potion_ruby: {
    id: 'potion_ruby',
    name: 'Poção Rubi',
    description: 'Restaura 100 HP e 50 MP',
    type: 'consumable',
    rarity: 'rare',
    value: 150,
    levelRequired: 5,
    icon: '💎',
    healAmount: 100,
    manaAmount: 50
  },
  sword_basic: {
    id: 'sword_basic',
    name: 'Espada de Ferro',
    description: 'Uma espada básica de ferro',
    type: 'weapon',
    rarity: 'common',
    value: 50,
    levelRequired: 1,
    icon: '⚔️',
    slot: 'weapon',
    stats: { attack: 5 }
  },
  shield_wood: {
    id: 'shield_wood',
    name: 'Escudo de Madeira',
    description: 'Um escudo de madeira',
    type: 'armor',
    rarity: 'common',
    value: 40,
    levelRequired: 1,
    icon: '🛡️',
    slot: 'chest',
    stats: { defense: 3 }
  },
  ring_copper: {
    id: 'ring_copper',
    name: 'Anel de Cobre',
    description: 'Um anel simples de cobre',
    type: 'accessory',
    rarity: 'common',
    value: 30,
    levelRequired: 1,
    icon: '💍',
    slot: 'accessory1',
    stats: { lck: 2 }
  },
  sword_steel: {
    id: 'sword_steel',
    name: 'Espada de Aço',
    description: 'Uma espada de aço resistente',
    type: 'weapon',
    rarity: 'uncommon',
    value: 120,
    levelRequired: 3,
    icon: '⚔️',
    slot: 'weapon',
    stats: { attack: 12, str: 2 }
  },
  armor_leather: {
    id: 'armor_leather',
    name: 'Armadura de Couro',
    description: 'Armadura leve de couro',
    type: 'armor',
    rarity: 'uncommon',
    value: 100,
    levelRequired: 3,
    icon: '🦺',
    slot: 'chest',
    stats: { defense: 8, vit: 1 }
  },
  ring_silver: {
    id: 'ring_silver',
    name: 'Anel de Prata',
    description: 'Um anel elegante de prata',
    type: 'accessory',
    rarity: 'rare',
    value: 180,
    levelRequired: 5,
    icon: '💍',
    slot: 'accessory1',
    stats: { lck: 5, dex: 2 }
  },
  sword_flame: {
    id: 'sword_flame',
    name: 'Espada Flamejante',
    description: 'Uma espada encantada com fogo',
    type: 'weapon',
    rarity: 'rare',
    value: 250,
    levelRequired: 5,
    icon: '🔥',
    slot: 'weapon',
    stats: { attack: 20, str: 3 }
  },
  armor_mithril: {
    id: 'armor_mithril',
    name: 'Armadura de Mithril',
    description: 'Armadura lendária de mithril',
    type: 'armor',
    rarity: 'epic',
    value: 500,
    levelRequired: 8,
    icon: '🛡️',
    slot: 'chest',
    stats: { defense: 20, vit: 5 }
  },
  sword_shadow: {
    id: 'sword_shadow',
    name: 'Espada das Sombras',
    description: 'Uma espada sombria e mortal',
    type: 'weapon',
    rarity: 'epic',
    value: 600,
    levelRequired: 8,
    icon: '🌑',
    slot: 'weapon',
    stats: { attack: 30, dex: 5 }
  },
  sword_legend: {
    id: 'sword_legend',
    name: 'Excalibur',
    description: 'A espada lendária do rei',
    type: 'weapon',
    rarity: 'legendary',
    value: 2000,
    levelRequired: 10,
    icon: '👑',
    slot: 'weapon',
    stats: { attack: 50, str: 10, lck: 5 }
  },
  ring_gold: {
    id: 'ring_gold',
    name: 'Anel do Rei',
    description: 'O anel da realeza',
    type: 'accessory',
    rarity: 'legendary',
    value: 1500,
    levelRequired: 10,
    icon: '💍',
    slot: 'accessory1',
    stats: { lck: 15, vit: 5, int: 5 }
  },
  staff_magic: {
    id: 'staff_magic',
    name: 'Cajado Arcano',
    description: 'Um cajado imbuído de magia',
    type: 'weapon',
    rarity: 'uncommon',
    value: 100,
    levelRequired: 1,
    icon: '🪄',
    slot: 'weapon',
    stats: { attack: 8, int: 2 }
  },
  robe_cloth: {
    id: 'robe_cloth',
    name: 'Manto do Mago',
    description: 'Um manto mystical',
    type: 'armor',
    rarity: 'common',
    value: 35,
    levelRequired: 1,
    icon: '🧥',
    slot: 'chest',
    stats: { defense: 2, int: 1 }
  },
  dagger_steel: {
    id: 'dagger_steel',
    name: 'Adaga de Aço',
    description: 'Uma adaga mortal',
    type: 'weapon',
    rarity: 'uncommon',
    value: 90,
    levelRequired: 1,
    icon: '🗡️',
    slot: 'weapon',
    stats: { attack: 10, dex: 2 }
  },
  bow_basic: {
    id: 'bow_basic',
    name: 'Arco Simples',
    description: 'Um arco de madeira',
    type: 'weapon',
    rarity: 'common',
    value: 45,
    levelRequired: 1,
    icon: '🏹',
    slot: 'weapon',
    stats: { attack: 7, dex: 1 }
  },
  helmet_leather: {
    id: 'helmet_leather',
    name: 'Elmo de Couro',
    description: 'Uma proteção leve de couro',
    type: 'armor',
    rarity: 'common',
    value: 30,
    levelRequired: 1,
    icon: '🧢',
    slot: 'helmet',
    stats: { defense: 2 }
  },
  helmet_iron: {
    id: 'helmet_iron',
    name: 'Elmo de Ferro',
    description: 'Um elmo resistente de ferro',
    type: 'armor',
    rarity: 'uncommon',
    value: 80,
    levelRequired: 3,
    icon: '⛑️',
    slot: 'helmet',
    stats: { defense: 6, vit: 1 }
  },
  helmet_steel: {
    id: 'helmet_steel',
    name: 'Elmo de Aço',
    description: 'Um elmo robusto de aço',
    type: 'armor',
    rarity: 'rare',
    value: 160,
    levelRequired: 5,
    icon: '🪖',
    slot: 'helmet',
    stats: { defense: 12, vit: 2 }
  },
  helmet_mithril: {
    id: 'helmet_mithril',
    name: 'Elmo de Mithril',
    description: 'Um elmo lendário de mithril',
    type: 'armor',
    rarity: 'epic',
    value: 450,
    levelRequired: 8,
    icon: '💠',
    slot: 'helmet',
    stats: { defense: 18, vit: 4 }
  },
  helm_legend: {
    id: 'helm_legend',
    name: 'Elmo da Coroa',
    description: 'O elmo sagrado do rei',
    type: 'armor',
    rarity: 'legendary',
    value: 1800,
    levelRequired: 10,
    icon: '👑',
    slot: 'helmet',
    stats: { defense: 25, vit: 8, lck: 5 }
  },
  ring_bronze: {
    id: 'ring_bronze',
    name: 'Anel de Bronze',
    description: 'Um anel simples de bronze',
    type: 'accessory',
    rarity: 'common',
    value: 25,
    levelRequired: 1,
    icon: '💍',
    slot: 'accessory1',
    stats: { lck: 1 }
  },
  ring_mithril: {
    id: 'ring_mithril',
    name: 'Anel de Mithril',
    description: 'Um anel élfico de mithril',
    type: 'accessory',
    rarity: 'epic',
    value: 400,
    levelRequired: 8,
    icon: '💍',
    slot: 'accessory1',
    stats: { lck: 10, dex: 3, vit: 3 }
  }
};

export const getItemById = (id: string): ItemData | undefined => {
  return ITEMS_DATA[id];
};

export const getItemStats = (itemId: string): ItemStats | null => {
  const item = ITEMS_DATA[itemId];
  return item?.stats || null;
};

export const getConsumableEffect = (itemId: string): { heal?: number; mana?: number } | null => {
  const item = ITEMS_DATA[itemId];
  if (item?.type === 'consumable') {
    return {
      heal: item.healAmount,
      mana: item.manaAmount
    };
  }
  return null;
};

export const isConsumable = (itemId: string): boolean => {
  const item = ITEMS_DATA[itemId];
  return item?.type === 'consumable';
};

export const isEquipment = (itemId: string): boolean => {
  const item = ITEMS_DATA[itemId];
  return item?.type === 'weapon' || item?.type === 'armor' || item?.type === 'accessory';
};

export const getItemSlot = (itemId: string): EquipmentSlot | null => {
  const item = ITEMS_DATA[itemId];
  return item?.slot || null;
};

export const getItemsByLevel = (level: number): ItemData[] => {
  return Object.values(ITEMS_DATA).filter(item => item.levelRequired <= level);
};

export const getAllConsumables = (): ItemData[] => {
  return Object.values(ITEMS_DATA).filter(item => item.type === 'consumable');
};

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export const RARITY_CHANCES: Record<Rarity, number> = {
  common: 0.50,
  uncommon: 0.25,
  rare: 0.15,
  epic: 0.08,
  legendary: 0.02
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: 'gray-500',
  uncommon: 'green-500',
  rare: 'blue-500',
  epic: 'purple-500',
  legendary: 'yellow-400'
};

export const RARITY_BORDER_COLORS: Record<Rarity, string> = {
  common: 'gray-600',
  uncommon: 'green-600',
  rare: 'blue-600',
  epic: 'purple-600',
  legendary: 'yellow-600'
};

export const getEquipmentByRarity = (rarity: Rarity): ItemData[] => {
  return Object.values(ITEMS_DATA).filter(
    item => item.rarity === rarity && isEquipment(item.id)
  );
};

export const getDropsByRarity = (): { item: ItemData; rarity: Rarity } | null => {
  const roll = Math.random();
  let cumulative = 0;
  
  const rarities: Rarity[] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
  
  for (const rarity of rarities) {
    cumulative += RARITY_CHANCES[rarity];
    if (roll < cumulative) {
      const items = getEquipmentByRarity(rarity);
      if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        return { item: randomItem, rarity };
      }
    }
  }
  
  const commonItems = getEquipmentByRarity('common');
  if (commonItems.length > 0) {
    return { item: commonItems[Math.floor(Math.random() * commonItems.length)], rarity: 'common' };
  }
  
  return null;
};

export const CLASS_STARTING_ITEMS: Record<string, { weapon: string; armor: string; accessory: string }> = {
  warrior: { weapon: 'sword_basic', armor: 'armor_leather', accessory: 'shield_wood' },
  mage: { weapon: 'staff_magic', armor: 'robe_cloth', accessory: 'ring_copper' },
  rogue: { weapon: 'dagger_steel', armor: 'armor_leather', accessory: 'ring_copper' },
  ranger: { weapon: 'bow_basic', armor: 'armor_leather', accessory: 'helmet_leather' }
};