import { ElementType } from '../models';

export interface SkillData {
  id: string;
  name: string;
  description: string;
  element: ElementType;
  power: number;
  manaCost: number;
  levelRequired: number;
  icon: string;
  isCustom: boolean;
  combinationElements?: ElementType[];
}

export const AVAILABLE_SKILLS: SkillData[] = [
  // Level 1
  {
    id: 'fireball',
    name: 'Bola de Fogo',
    description: 'Uma bola de fogo que causa dano de fogo',
    element: 'fogo',
    power: 15,
    manaCost: 10,
    levelRequired: 1,
    icon: '🔥',
    isCustom: false
  },
  {
    id: 'ice_shard',
    name: 'Pedaço de Gelo',
    description: 'Fragmento de gelo que causa dano de gelo',
    element: 'gelo',
    power: 15,
    manaCost: 10,
    levelRequired: 1,
    icon: '❄️',
    isCustom: false
  },
  {
    id: 'wind_slash',
    name: 'Corte de Vento',
    description: 'Um corte de vento cortante',
    element: 'vento',
    power: 12,
    manaCost: 8,
    levelRequired: 1,
    icon: '🌀',
    isCustom: false
  },

  // Level 2
  {
    id: 'light_arrow',
    name: 'Flecha de Luz',
    description: 'Uma flecha luminosa sagrada',
    element: 'luz',
    power: 18,
    manaCost: 12,
    levelRequired: 2,
    icon: '✨',
    isCustom: false
  },
  {
    id: 'shadow_bite',
    name: 'Mordida Sombria',
    description: 'Ataque das trevas que drena energia',
    element: 'sombra',
    power: 18,
    manaCost: 12,
    levelRequired: 2,
    icon: '🌑',
    isCustom: false
  },

  // Level 3
  {
    id: 'thunder_bolt',
    name: 'Raio',
    description: 'Descarga elétrica fulminante',
    element: 'raio',
    power: 22,
    manaCost: 15,
    levelRequired: 3,
    icon: '⚡',
    isCustom: false
  },
  {
    id: 'fire_wave',
    name: 'Onda de Fogo',
    description: 'Onda flamejante que queima tudo',
    element: 'fogo',
    power: 25,
    manaCost: 18,
    levelRequired: 3,
    icon: '🌊',
    isCustom: false
  },
  {
    id: 'ice_prison',
    name: 'Prisão de Gelo',
    description: 'Congela o inimigo no gelo',
    element: 'gelo',
    power: 20,
    manaCost: 15,
    levelRequired: 3,
    icon: '🔒',
    isCustom: false
  },

  // Level 5
  {
    id: 'holy_light',
    name: 'Luz Sagrada',
    description: 'Luz divina que purifica o mal',
    element: 'luz',
    power: 35,
    manaCost: 25,
    levelRequired: 5,
    icon: '☀️',
    isCustom: false
  },
  {
    id: 'dark_void',
    name: 'Vazio Sombrio',
    description: 'Absorve a alma do inimigo',
    element: 'sombra',
    power: 35,
    manaCost: 25,
    levelRequired: 5,
    icon: '🕳️',
    isCustom: false
  },
  {
    id: 'tornado',
    name: 'Tornado',
    description: 'Redemoinho devastador',
    element: 'vento',
    power: 30,
    manaCost: 20,
    levelRequired: 5,
    icon: '🌪️',
    isCustom: false
  },

  // Level 7
  {
    id: 'thunder_storm',
    name: 'Tempestade Elétrica',
    description: 'Tempestade de raios devastadora',
    element: 'raio',
    power: 40,
    manaCost: 30,
    levelRequired: 7,
    icon: '⛈️',
    isCustom: false
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: 'Chamas do inferno consumem tudo',
    element: 'fogo',
    power: 45,
    manaCost: 35,
    levelRequired: 7,
    icon: '🔥',
    isCustom: false
  },
  {
    id: 'blizzard',
    name: 'Nevasca',
    description: 'Tempestade de gelo devastadora',
    element: 'gelo',
    power: 40,
    manaCost: 30,
    levelRequired: 7,
    icon: '🌨️',
    isCustom: false
  },

  // Level 10 - Habilidades combinadas
  {
    id: 'fire_tornado',
    name: 'Tornado de Fogo',
    description: 'Fogo + Vento: Redemoinho flamejante',
    element: 'fogo',
    power: 60,
    manaCost: 45,
    levelRequired: 10,
    icon: '🌋',
    isCustom: true,
    combinationElements: ['fogo', 'vento']
  },
  {
    id: 'ice_shadow',
    name: 'Prisão Congelante',
    description: 'Gelo + Sombra: Gelo negro letal',
    element: 'gelo',
    power: 55,
    manaCost: 40,
    levelRequired: 10,
    icon: '🌑',
    isCustom: true,
    combinationElements: ['gelo', 'sombra']
  },
  {
    id: 'lightning_storm',
    name: 'Tempestade Sagrada',
    description: 'Luz + Raio: Tempestade divina',
    element: 'luz',
    power: 65,
    manaCost: 50,
    levelRequired: 10,
    icon: '⚡',
    isCustom: true,
    combinationElements: ['luz', 'raio']
  },
  {
    id: 'dark_fire',
    name: 'Fogo das Trevas',
    description: 'Fogo + Sombra: Chamas negras',
    element: 'sombra',
    power: 60,
    manaCost: 45,
    levelRequired: 10,
    icon: '💀',
    isCustom: true,
    combinationElements: ['fogo', 'sombra']
  }
];

export const getSkillsByLevel = (playerLevel: number): SkillData[] => {
  return AVAILABLE_SKILLS.filter(skill => skill.levelRequired <= playerLevel);
};

export const getSkillById = (id: string): SkillData | undefined => {
  return AVAILABLE_SKILLS.find(skill => skill.id === id);
};
