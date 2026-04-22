import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Player, Attributes, Skill } from '../../models';

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Create Player': props<{ name: string; attributes: Attributes }>(),
    'Load Player': props<{ player: Player }>(),
    'Gain XP': props<{ amount: number }>(),
    'Level Up': emptyProps(),
    'Unlock Skill': props<{ skillId: string }>(),
    'Learn Skill': props<{ skill: Skill }>(),
    'Take Damage': props<{ amount: number }>(),
    'Heal': props<{ amount: number }>(),
    'Use Mana': props<{ amount: number }>(),
    'Restore Mana': props<{ amount: number }>(),
    'Add Corruption': props<{ amount: number }>(),
    'Reduce Corruption': props<{ amount: number }>(),
    'Equip Item': props<{ itemId: string }>(),
    'Unequip Item': props<{ slot: string }>(),
    'Add To Inventory': props<{ itemId: string }>(),
    'Remove From Inventory': props<{ itemId: string }>(),
    'Update Skill Efficiency': props<{ skillId: string; efficiency: number }>(),
    'Add Gold': props<{ amount: number }>(),
    'Spend Gold': props<{ amount: number }>(),
    'Add Loot': props<{ items: string[]; gold: number; xp: number }>(),
    'Prestige': emptyProps(),
    'Reset Player': emptyProps(),
  }
});
