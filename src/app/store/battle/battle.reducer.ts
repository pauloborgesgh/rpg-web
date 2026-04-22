import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Enemy, Boss } from '../../models';
import { BattleActions, BattleStatus, BattleLog } from './battle.actions';
import { PlayerActions } from '../player';

export interface BattleState {
  status: BattleStatus;
  enemy: Enemy | Boss | null;
  playerTurn: boolean;
  battleLogs: BattleLog[];
  turn: number;
  playerStats: {
    attack: number;
    defense: number;
  };
  playerDamageTaken: number;
}

const initialState: BattleState = {
  status: 'idle',
  enemy: null,
  playerTurn: true,
  battleLogs: [],
  turn: 0,
  playerStats: {
    attack: 10,
    defense: 5
  },
  playerDamageTaken: 0
};

const calculatePlayerDamage = (playerAttack: number, enemyDefense: number): number => {
  const base = playerAttack * 2;
  const variance = Math.random() * 0.4 + 0.8;
  const mitigation = enemyDefense * 0.5;
  return Math.max(1, Math.floor((base * variance) - mitigation));
};

const calculateEnemyDamage = (enemyAttack: number, playerDefense: number): number => {
  const base = enemyAttack;
  const variance = Math.random() * 0.4 + 0.8;
  const mitigation = playerDefense * 0.5;
  return Math.max(1, Math.floor((base * variance) - mitigation));
};

export const battleReducer = createReducer(
  initialState,
  on(BattleActions.startBattle, (state, { enemy }) => {
    const logs: BattleLog[] = [{
      id: crypto.randomUUID(),
      message: `⚔️ Batalha começou contra ${enemy.name}!`,
      type: 'system',
      timestamp: Date.now()
    }];
    logs.push({
      id: crypto.randomUUID(),
      message: `👾 ${enemy.name} - HP: ${enemy.health}/${enemy.maxHealth}`,
      type: 'system',
      timestamp: Date.now()
    });
    
    return {
      ...initialState,
      status: 'in_progress' as BattleStatus,
      enemy,
      playerTurn: true,
      battleLogs: logs,
      turn: 1
    };
  }),
  on(BattleActions.playerAttack, (state) => {
    if (!state.enemy || !state.playerTurn) return state;
    
    const damage = calculatePlayerDamage(state.playerStats.attack, state.enemy.defense);
    const newEnemyHealth = Math.max(0, state.enemy.health - damage);
    
    const logs = [...state.battleLogs, {
      id: crypto.randomUUID(),
      message: `🗡️ Você atacou ${state.enemy.name} causando ${damage} danos!`,
      type: 'player_attack' as const,
      timestamp: Date.now()
    }];
    
    if (newEnemyHealth <= 0) {
      logs.push({
        id: crypto.randomUUID(),
        message: `🎉 Você derrotou ${state.enemy.name}!`,
        type: 'system' as const,
        timestamp: Date.now()
      });
      logs.push({
        id: crypto.randomUUID(),
        message: `💰 +${Math.floor(state.enemy.xpReward * 0.5)} XP`,
        type: 'system' as const,
        timestamp: Date.now()
      });
      const goldReward = Math.floor(state.enemy.xpReward * 0.3);
      if (goldReward > 0) {
        logs.push({
          id: crypto.randomUUID(),
          message: `🪙 +${goldReward} ouro`,
          type: 'system' as const,
          timestamp: Date.now()
        });
      }
      
      return {
        ...state,
        status: 'victory' as BattleStatus,
        enemy: { ...state.enemy, health: 0 },
        battleLogs: logs,
        playerTurn: false
      };
    }
    
    logs.push({
      id: crypto.randomUUID(),
      message: `👾 ${state.enemy.name} - HP: ${newEnemyHealth}/${state.enemy.maxHealth}`,
      type: 'system' as const,
      timestamp: Date.now()
    });
    
    return {
      ...state,
      enemy: { ...state.enemy, health: newEnemyHealth },
      battleLogs: logs,
      playerTurn: false
    };
  }),
  on(BattleActions.enemyAttack, (state) => {
    if (!state.enemy || state.playerTurn) return state;
    
    const damage = calculateEnemyDamage(state.enemy.attack, state.playerStats.defense);
    
    const logs = [...state.battleLogs, {
      id: crypto.randomUUID(),
      message: `👹 ${state.enemy.name} atacou causando ${damage} danos!`,
      type: 'enemy_attack' as const,
      timestamp: Date.now()
    }];
    
    logs.push({
      id: crypto.randomUUID(),
      message: `❤️ Você perdeu ${damage} de HP!`,
      type: 'damage' as const,
      timestamp: Date.now()
    });
    
    logs.push({
      id: crypto.randomUUID(),
      message: `⚔️ Seu turno!`,
      type: 'system' as const,
      timestamp: Date.now()
    });
    
    return {
      ...state,
      battleLogs: logs,
      playerTurn: true,
      turn: state.turn + 1,
      playerDamageTaken: damage
    };
  }),
  on(BattleActions.addBattleLog, (state, { log }) => ({
    ...state,
    battleLogs: [...state.battleLogs, log]
  })),
  on(BattleActions.clearBattleLog, (state) => ({
    ...state,
    battleLogs: []
  })),
  on(BattleActions.flee, (state) => {
    const success = Math.random() > 0.5;
    const logs = [...state.battleLogs, {
      id: crypto.randomUUID(),
      message: success ? '🏃 Você fugiu da batalha!' : '❌ Falha ao tentar fugir!',
      type: 'system' as const,
      timestamp: Date.now()
    }];
    
    if (success) {
      return {
        ...state,
        status: 'idle' as BattleStatus,
        enemy: null,
        turn: 0,
        battleLogs: logs
      };
    }
    
    return {
      ...state,
      battleLogs: logs,
      playerTurn: false
    };
  }),
  on(BattleActions.endBattle, (state) => ({
    ...state,
    status: 'idle' as BattleStatus,
    enemy: null,
    turn: 0
  }))
);

export const selectBattleState = createFeatureSelector<BattleState>('battle');

export const selectBattleStatus = createSelector(
  selectBattleState,
  (state) => state.status
);

export const selectEnemy = createSelector(
  selectBattleState,
  (state) => state.enemy
);

export const selectIsPlayerTurn = createSelector(
  selectBattleState,
  (state) => state.playerTurn
);

export const selectBattleLogs = createSelector(
  selectBattleState,
  (state) => state.battleLogs
);

export const selectTurn = createSelector(
  selectBattleState,
  (state) => state.turn
);