import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { WorldState, WorldEvent, Region, Faction, EconomyState, WORLD_LEVEL_THRESHOLDS } from '../../models';
import { WorldActions } from './world.actions';
import { PlayerActions } from '../player';

const createInitialRegion = (id: string, name: string, difficulty: number, description: string): Region => ({
  id,
  name,
  description,
  difficulty,
  conqueredBy: null,
  events: []
});

const createInitialWorldState = (): WorldState => ({
  worldLevel: 1,
  regions: [
    createInitialRegion('forest', 'Floresta Ancestral', 1, 'Uma floresta antiga cheia de segredos'),
    createInitialRegion('mountains', 'Montanhas do Norte', 3, 'Montanhas geladas e perigosas'),
    createInitialRegion('cave', 'Caverna Sombria', 5, 'Cavernas escuras habitadas por criaturas'),
    createInitialRegion('castle', 'Castelo Amaldiçoado', 8, 'Um castelo assombrado por forças sombrias'),
    createInitialRegion('abyss', 'Abismo Eterno', 10, 'O abyss onde poucos retornam')
  ],
  factions: [
    { id: 'knights', name: 'Cavaleiros da Luz', power: 100, territory: ['forest'], atWar: [] },
    { id: 'shadows', name: 'Sombras Eternas', power: 80, territory: ['cave'], atWar: [] },
    { id: 'beasts', name: 'Bestas Selvagens', power: 90, territory: ['mountains'], atWar: [] }
  ],
  economy: {
    basePriceModifier: 1.0,
    supplyDemand: {},
    rareItemsAvailable: [],
    lastUpdate: Date.now()
  },
  activeEvents: [],
  timeSinceLastEvent: 0
});

export interface WorldStoreState {
  worldState: WorldState;
  loading: boolean;
}

const initialState: WorldStoreState = {
  worldState: createInitialWorldState(),
  loading: false
};

export const worldReducer = createReducer(
  initialState,
  on(WorldActions.initializeWorld, () => ({
    worldState: createInitialWorldState(),
    loading: false
  })),
  on(WorldActions.loadWorld, (_, { worldState }) => ({
    worldState,
    loading: false
  })),
  on(WorldActions.evolveWorldLevel, (state, { playerLevel }) => {
    const newWorldLevel = Math.min(100, Math.floor(playerLevel / 2) + 1);
    return {
      ...state,
      worldState: { ...state.worldState, worldLevel: newWorldLevel }
    };
  }),
  on(WorldActions.addEvent, (state, { event }) => ({
    ...state,
    worldState: {
      ...state.worldState,
      activeEvents: [...state.worldState.activeEvents, event]
    }
  })),
  on(WorldActions.resolveEvent, (state, { eventId }) => ({
    ...state,
    worldState: {
      ...state.worldState,
      activeEvents: state.worldState.activeEvents.filter(e => e.id !== eventId)
    }
  })),
  on(WorldActions.conquerRegion, (state, { regionId, factionId }) => ({
    ...state,
    worldState: {
      ...state.worldState,
      regions: state.worldState.regions.map(r => 
        r.id === regionId ? { ...r, conqueredBy: factionId } : r
      )
    }
  })),
  on(WorldActions.applyTimeSkip, (state, { ticks }) => ({
    ...state,
    worldState: {
      ...state.worldState,
      timeSinceLastEvent: state.worldState.timeSinceLastEvent + ticks
    }
  }))
);

export const selectWorldState = createFeatureSelector<WorldStoreState>('world');

export const selectWorld = createSelector(
  selectWorldState,
  (state) => state.worldState
);

export const selectWorldLevel = createSelector(
  selectWorld,
  (world) => world.worldLevel
);

export const selectRegions = createSelector(
  selectWorld,
  (world) => world.regions
);

export const selectActiveEvents = createSelector(
  selectWorld,
  (world) => world.activeEvents
);