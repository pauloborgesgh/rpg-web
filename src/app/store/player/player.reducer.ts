import { createReducer, on } from '@ngrx/store';
import { Player, Attributes, INITIAL_ATTRIBUTES, BASE_HEALTH, BASE_MANA, Skill, PlayerClass } from '../../models';
import { PlayerActions } from './player.actions';
import { getConsumableEffect, getItemSlot, CLASS_STARTING_ITEMS, ITEMS_DATA } from '../../data/items.data';

export interface PlayerState {
  player: Player | null;
  loading: boolean;
  error: string | null;
}

const calculateXPToNextLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const createInitialPlayer = (name: string, attributes: Attributes, playerClass: PlayerClass, avatar: string): Player => {
  const startingItems = CLASS_STARTING_ITEMS[playerClass];
  return {
    id: crypto.randomUUID(),
    name,
    level: 1,
    xp: 0,
    xpToNextLevel: calculateXPToNextLevel(1),
    attributes,
    health: BASE_HEALTH + (attributes.vit * 5),
    maxHealth: BASE_HEALTH + (attributes.vit * 5),
    mana: BASE_MANA + (attributes.int * 3),
    maxMana: BASE_MANA + (attributes.int * 3),
    skillPoints: 0,
    attributePoints: 0,
    skills: [],
    unlockedSkills: [],
    corruption: 0,
    equippedItems: [startingItems.weapon, startingItems.armor, startingItems.accessory],
    inventory: [startingItems.weapon, startingItems.armor, startingItems.accessory],
    prestigeLevel: 0,
    gold: 100,
    class: playerClass,
    avatar
  };
};

export const initialState: PlayerState = {
  player: null,
  loading: false,
  error: null
};

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.createPlayer, (state, { name, attributes, playerClass, avatar }) => ({
    ...state,
    player: createInitialPlayer(name, attributes, playerClass, avatar),
    loading: false,
    error: null
  })),
  on(PlayerActions.loadPlayer, (state, { player }) => ({
    ...state,
    player,
    loading: false
  })),
  on(PlayerActions.gainXP, (state, { amount }) => {
    if (!state.player) return state;
    let newXP = state.player.xp + amount;
    let newLevel = state.player.level;
    let newXPToNext = state.player.xpToNextLevel;
    let skillPoints = state.player.skillPoints;
    let attributePoints = state.player.attributePoints;
    let maxHealth = state.player.maxHealth;
    let maxMana = state.player.maxMana;
    let health = state.player.health;
    let mana = state.player.mana;
    
    while (newXP >= newXPToNext) {
      newXP -= newXPToNext;
      newLevel++;
      newXPToNext = calculateXPToNextLevel(newLevel);
      skillPoints += 3;
      attributePoints += 5;
      const healthBonus = 10 + Math.floor(state.player.attributes.vit * 0.5);
      const manaBonus = 5 + Math.floor(state.player.attributes.int * 0.3);
      maxHealth += healthBonus;
      maxMana += manaBonus;
      health += healthBonus;
      mana += manaBonus;
    }
    
    return {
      ...state,
      player: { 
        ...state.player, 
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext,
        skillPoints: skillPoints,
        attributePoints: attributePoints,
        maxHealth: maxHealth,
        maxMana: maxMana,
        health: health,
        mana: mana
      }
    };
  }),
  on(PlayerActions.levelUp, (state) => {
    if (!state.player) return state;
    const newLevel = state.player.level + 1;
    const newXPToNext = calculateXPToNextLevel(newLevel);
    const healthBonus = 10 + Math.floor(state.player.attributes.vit * 0.5);
    const manaBonus = 5 + Math.floor(state.player.attributes.int * 0.3);
    const newMaxHealth = state.player.maxHealth + healthBonus;
    const newMaxMana = state.player.maxMana + manaBonus;
    return {
      ...state,
      player: {
        ...state.player,
        level: newLevel,
        xp: state.player.xp - state.player.xpToNextLevel,
        xpToNextLevel: newXPToNext,
        skillPoints: state.player.skillPoints + 3,
        attributePoints: state.player.attributePoints + 5,
        maxHealth: newMaxHealth,
        health: newMaxHealth,
        maxMana: newMaxMana,
        mana: newMaxMana
      }
    };
  }),
  on(PlayerActions.distributeAttributePoint, (state, { attribute, amount }) => {
    if (!state.player) return state;
    if (state.player.attributePoints < 1) return state;
    const newValue = state.player.attributes[attribute] + amount;
    if (newValue < 1 || newValue > 100) return state;
    return {
      ...state,
      player: {
        ...state.player,
        attributes: { ...state.player.attributes, [attribute]: newValue },
        attributePoints: state.player.attributePoints - 1
      }
    };
  }),
  on(PlayerActions.learnSkill, (state, { skill }) => {
    if (!state.player) return state;
    if (state.player.skillPoints < 1) return state;
    return {
      ...state,
      player: {
        ...state.player,
        skills: [...state.player.skills, skill],
        skillPoints: state.player.skillPoints - 1
      }
    };
  }),
  on(PlayerActions.unlockSkill, (state, { skillId }) => {
    if (!state.player) return state;
    if (state.player.unlockedSkills.includes(skillId)) return state;
    return {
      ...state,
      player: {
        ...state.player,
        unlockedSkills: [...state.player.unlockedSkills, skillId]
      }
    };
  }),
  on(PlayerActions.takeDamage, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        health: Math.max(0, state.player.health - amount)
      }
    };
  }),
  on(PlayerActions.heal, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        health: Math.min(state.player.maxHealth, state.player.health + amount)
      }
    };
  }),
  on(PlayerActions.useMana, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        mana: Math.max(0, state.player.mana - amount)
      }
    };
  }),
  on(PlayerActions.restoreMana, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        mana: Math.min(state.player.maxMana, state.player.mana + amount)
      }
    };
  }),
  on(PlayerActions.addCorruption, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        corruption: Math.min(100, state.player.corruption + amount)
      }
    };
  }),
  on(PlayerActions.reduceCorruption, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        corruption: Math.max(0, state.player.corruption - amount)
      }
    };
  }),
  on(PlayerActions.addToInventory, (state, { itemId }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        inventory: [...state.player.inventory, itemId]
      }
    };
  }),
  on(PlayerActions.removeFromInventory, (state, { itemId }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        inventory: state.player.inventory.filter(id => id !== itemId)
      }
    };
  }),
  on(PlayerActions.updateSkillEfficiency, (state, { skillId, efficiency }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        skills: state.player.skills.map(s => 
          s.id === skillId ? { ...s, efficiency } : s
        )
      }
    };
  }),
  on(PlayerActions.addGold, (state, { amount }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        gold: state.player.gold + amount
      }
    };
  }),
  on(PlayerActions.spendGold, (state, { amount }) => {
    if (!state.player || state.player.gold < amount) return state;
    return {
      ...state,
      player: {
        ...state.player,
        gold: state.player.gold - amount
      }
    };
  }),
  on(PlayerActions.addLoot, (state, { items, gold, xp }) => {
    if (!state.player) return state;
    return {
      ...state,
      player: {
        ...state.player,
        gold: state.player.gold + gold,
        xp: state.player.xp + xp,
        inventory: [...state.player.inventory, ...items]
      }
    };
  }),
  on(PlayerActions.sellItem, (state, { itemId }) => {
    if (!state.player) return state;
    if (!state.player.inventory.includes(itemId)) return state;
    const item = ITEMS_DATA[itemId];
    if (!item) return state;
    const sellValue = Math.floor(item.value / 2);
    return {
      ...state,
      player: {
        ...state.player,
        gold: state.player.gold + sellValue,
        inventory: state.player.inventory.filter(id => id !== itemId)
      }
    };
  }),
  on(PlayerActions.equipItem, (state, { itemId }) => {
    if (!state.player) return state;
    if (!state.player.inventory.includes(itemId)) return state;
    const slot = getItemSlot(itemId);
    if (!slot) return state;
    let newEquipped = state.player.equippedItems.filter(id => getItemSlot(id) !== slot);
    newEquipped.push(itemId);
    const newInventory = state.player.inventory.filter(id => id !== itemId);
    return {
      ...state,
      player: {
        ...state.player,
        equippedItems: newEquipped,
        inventory: newInventory
      }
    };
  }),
  on(PlayerActions.unequipItem, (state, { slot }) => {
    if (!state.player) return state;
    const itemId = state.player.equippedItems.find(id => getItemSlot(id) === slot);
    if (!itemId) return state;
    return {
      ...state,
      player: {
        ...state.player,
        equippedItems: state.player.equippedItems.filter(id => id !== itemId),
        inventory: [...state.player.inventory, itemId]
      }
    };
  }),
  on(PlayerActions.useConsumable, (state, { itemId }) => {
    if (!state.player) return state;
    if (!state.player.inventory.includes(itemId)) return state;
    const effect = getConsumableEffect(itemId);
    if (!effect) return state;
    let newHealth = state.player.health;
    let newMana = state.player.mana;
    if (effect.heal) {
      newHealth = Math.min(state.player.maxHealth, state.player.health + effect.heal);
    }
    if (effect.mana) {
      newMana = Math.min(state.player.maxMana, state.player.mana + effect.mana);
    }
    return {
      ...state,
      player: {
        ...state.player,
        health: newHealth,
        mana: newMana,
        inventory: state.player.inventory.filter(id => id !== itemId)
      }
    };
  }),
  on(PlayerActions.resetPlayer, () => initialState)
);
