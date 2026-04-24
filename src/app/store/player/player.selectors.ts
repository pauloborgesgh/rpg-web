import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';
import { ITEMS_DATA } from '../../data/items.data';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectPlayer = createSelector(
  selectPlayerState,
  (state) => state.player
);

export const selectPlayerLevel = createSelector(
  selectPlayer,
  (player) => player?.level ?? 1
);

export const selectPlayerHealth = createSelector(
  selectPlayer,
  (player) => player ? { current: player.health, max: player.maxHealth } : { current: 100, max: 100 }
);

export const selectPlayerMana = createSelector(
  selectPlayer,
  (player) => player ? { current: player.mana, max: player.maxMana } : { current: 50, max: 50 }
);

export const selectPlayerCorruption = createSelector(
  selectPlayer,
  (player) => player?.corruption ?? 0
);

export const selectPlayerSkills = createSelector(
  selectPlayer,
  (player) => player?.skills ?? []
);

export const selectPlayerInventory = createSelector(
  selectPlayer,
  (player) => {
    const inventory = player?.inventory ?? [];
    console.log('[SELECTOR] selectPlayerInventory:', inventory);
    return inventory;
  }
);

export const selectEquippedItems = createSelector(
  selectPlayer,
  (player) => player?.equippedItems ?? []
);

export const selectPlayerAttributes = createSelector(
  selectPlayer,
  (player) => player?.attributes ?? { str: 5, dex: 5, int: 5, vit: 5, lck: 5 }
);

export const selectPlayerXP = createSelector(
  selectPlayer,
  (player) => player ? { current: player.xp, required: player.xpToNextLevel } : { current: 0, required: 100 }
);

export const selectSkillPoints = createSelector(
  selectPlayer,
  (player) => player?.skillPoints ?? 0
);

export const selectAttributePoints = createSelector(
  selectPlayer,
  (player) => player?.attributePoints ?? 0
);

export const selectPlayerClass = createSelector(
  selectPlayer,
  (player) => player?.class ?? 'warrior'
);

export const selectPlayerAvatar = createSelector(
  selectPlayer,
  (player) => player?.avatar ?? '⚔️'
);

export const selectIsPlayerDead = createSelector(
  selectPlayer,
  (player) => (player?.health ?? 100) <= 0
);

export const selectPlayerGold = createSelector(
  selectPlayer,
  (player) => player?.gold ?? 100
);

export const selectInventoryCount = createSelector(
  selectPlayerInventory,
  (inventory) => inventory.length
);

export const selectConsumablesInInventory = createSelector(
  selectPlayer,
  (player) => {
    if (!player) return [];
    return player.inventory.filter(id => {
      const item = ITEMS_DATA[id];
      return item?.type === 'consumable';
    });
  }
);

export const selectPotionsCount = createSelector(
  selectPlayer,
  (player) => {
    if (!player) return { healthPotions: 0, manaPotions: 0 };
    const healthPotions = player.inventory.filter(id => id === 'potion_hp').length;
    const manaPotions = player.inventory.filter(id => id === 'potion_mp').length;
    return { healthPotions, manaPotions };
  }
);
