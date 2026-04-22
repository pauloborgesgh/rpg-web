import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Item, ItemRarity, ItemType } from '../../models';
import { ShopActions, ShopItem } from './shop.actions';

export interface ShopState {
  isOpen: boolean;
  items: ShopItem[];
  worldLevel: number;
}

const getItemIcon = (type: ItemType): string => {
  switch (type) {
    case 'weapon': return '⚔️';
    case 'armor': return '🛡️';
    case 'accessory': return '💍';
    case 'consumable': return '🧪';
    case 'material': return '🪨';
    default: return '📦';
  }
};

const createShopItem = (id: string, name: string, type: ItemType, rarity: ItemRarity, value: number, levelRequired: number): ShopItem => ({
  id,
  name,
  description: `Um(a) ${name.toLowerCase()} ${rarity}.`,
  type,
  rarity,
  value,
  levelRequired,
  icon: getItemIcon(type),
  quantity: Math.floor(Math.random() * 3) + 1
});

const generateShopItems = (worldLevel: number): ShopItem[] => {
  const baseItems: ShopItem[] = [
    createShopItem('potion_hp', 'Poção de Vida', 'consumable', 'common', 20, 1),
    createShopItem('potion_mp', 'Poção de Mana', 'consumable', 'common', 25, 1),
    createShopItem('sword_basic', 'Espada de Ferro', 'weapon', 'common', 50, 1),
    createShopItem('shield_wood', 'Escudo de Madeira', 'armor', 'common', 40, 1),
    createShopItem('ring_copper', 'Anel de Cobre', 'accessory', 'common', 30, 1),
  ];

  if (worldLevel >= 3) {
    baseItems.push(
      createShopItem('potion_hp_green', 'Poção de Vida Grande', 'consumable', 'uncommon', 60, 3),
      createShopItem('sword_steel', 'Espada de Aço', 'weapon', 'uncommon', 120, 3),
      createShopItem('armor_leather', 'Armadura de Couro', 'armor', 'uncommon', 100, 3)
    );
  }

  if (worldLevel >= 5) {
    baseItems.push(
      createShopItem('sword_flame', 'Espada Flamejante', 'weapon', 'rare', 250, 5),
      createShopItem('ring_silver', 'Anel de Prata', 'accessory', 'rare', 180, 5),
      createShopItem('potion_ruby', 'Poção Rubi', 'consumable', 'rare', 150, 5)
    );
  }

  if (worldLevel >= 8) {
    baseItems.push(
      createShopItem('armor_mithril', 'Armadura de Mithril', 'armor', 'epic', 500, 8),
      createShopItem('sword_shadow', 'Espada das Sombras', 'weapon', 'epic', 600, 8)
    );
  }

  if (worldLevel >= 10) {
    baseItems.push(
      createShopItem('sword_legend', 'Excalibur', 'weapon', 'legendary', 2000, 10),
      createShopItem('ring_gold', 'Anel do Rei', 'accessory', 'legendary', 1500, 10)
    );
  }

  const priceMultiplier = 1 + (worldLevel * 0.1);
  return baseItems.map(item => ({
    ...item,
    value: Math.floor(item.value * priceMultiplier)
  }));
};

const initialState: ShopState = {
  isOpen: false,
  items: generateShopItems(1),
  worldLevel: 1
};

export const shopReducer = createReducer(
  initialState,
  on(ShopActions.openShop, (state) => ({
    ...state,
    isOpen: true
  })),
  on(ShopActions.closeShop, (state) => ({
    ...state,
    isOpen: false
  })),
  on(ShopActions.refreshShop, (state) => ({
    ...state,
    items: generateShopItems(state.worldLevel)
  })),
  on(ShopActions.buyItem, (state, { item }) => ({
    ...state,
    items: state.items.map(i => 
      i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
    ).filter(i => i.quantity > 0)
  }))
);

export const selectShopState = createFeatureSelector<ShopState>('shop');

export const selectShopItems = createSelector(
  selectShopState,
  (state) => state.items
);

export const selectIsShopOpen = createSelector(
  selectShopState,
  (state) => state.isOpen
);