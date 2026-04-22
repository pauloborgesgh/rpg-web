export interface Region {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  boss?: string;
  conqueredBy: string | null;
  events: WorldEvent[];
}

export interface Faction {
  id: string;
  name: string;
  power: number;
  territory: string[];
  atWar: string[];
}

export interface WorldEvent {
  id: string;
  type: EventType;
  description: string;
  timestamp: number;
  affectedRegion?: string;
  resolved: boolean;
}

export type EventType = 
  | 'boss_conquest'
  | 'city_destruction'
  | 'faction_war'
  | 'economic_change'
  | 'natural_disaster'
  | 'player_achievement';

export interface WorldState {
  worldLevel: number;
  regions: Region[];
  factions: Faction[];
  economy: EconomyState;
  activeEvents: WorldEvent[];
  timeSinceLastEvent: number;
}

export interface EconomyState {
  basePriceModifier: number;
  supplyDemand: Record<string, number>;
  rareItemsAvailable: string[];
  lastUpdate: number;
}

export interface TimelineChange {
  id: string;
  timestamp: number;
  description: string;
  affectedAreas: string[];
  playerChoice: string;
}

export const WORLD_LEVEL_THRESHOLDS = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const WORLD_LEVEL_EFFECTS: Record<number, string> = {
  1: 'Mundo em paz',
  10: 'Primeiras ameaças surgem',
  20: 'Florestas começam a corromper',
  30: 'Cidades se fortificam',
  40: 'Bosses evoluem',
  50: 'Novas ameaças aparecem',
  60: 'Reinos entram em conflito',
  70: 'Forças das treias dominam',
  80: 'Mundo à beira do colapso',
  90: 'Apocalypse se aproxima',
  100: 'Novo ciclo começa'
};
