import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Enemy, Boss } from '../../models';

export type BattleStatus = 'idle' | 'in_progress' | 'victory' | 'defeat';

export interface BattleLog {
  id: string;
  message: string;
  type: 'player_attack' | 'enemy_attack' | 'skill' | 'damage' | 'heal' | 'system';
  timestamp: number;
}

export const BattleActions = createActionGroup({
  source: 'Battle',
  events: {
    'Start Battle': props<{ enemy: Enemy | Boss }>(),
    'End Battle': emptyProps(),
    'Player Attack': emptyProps(),
    'Enemy Attack': emptyProps(),
    'Use Skill': props<{ skillId: string }>(),
    'Enemy Use Skill': props<{ skillId: string }>(),
    'Add Battle Log': props<{ log: BattleLog }>(),
    'Clear Battle Log': emptyProps(),
    'Skip Turn': emptyProps(),
    'Flee': emptyProps(),
  }
});