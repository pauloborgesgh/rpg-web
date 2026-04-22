import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { WorldState, Region, WorldEvent } from '../../models';

export const WorldActions = createActionGroup({
  source: 'World',
  events: {
    'Initialize World': emptyProps(),
    'Load World': props<{ worldState: WorldState }>(),
    'Evolve World Level': props<{ playerLevel: number }>(),
    'Process World Events': emptyProps(),
    'Add Event': props<{ event: WorldEvent }>(),
    'Resolve Event': props<{ eventId: string }>(),
    'Conquer Region': props<{ regionId: string; factionId: string }>(),
    'Update Economy': emptyProps(),
    'Trigger Random Event': emptyProps(),
    'Apply Time Skip': props<{ ticks: number }>(),
  }
});