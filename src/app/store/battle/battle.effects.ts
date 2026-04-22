import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, map, withLatestFrom, filter } from 'rxjs/operators';
import { BattleActions } from './battle.actions';
import { PlayerActions } from '../player/player.actions';
import { selectBattleStatus, selectEnemy } from './battle.reducer';
import { selectPlayer } from '../player/player.selectors';

@Injectable()
export class BattleEffects {
  applyEnemyDamage$ = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.enemyAttack),
    filter(() => true),
    map(() => {
      const damage = Math.floor(Math.random() * 15) + 5;
      return PlayerActions.takeDamage({ amount: damage });
    })
  ));

  grantVictoryRewards$ = createEffect(() => this.actions$.pipe(
    ofType(BattleActions.playerAttack),
    withLatestFrom(this.store.select(selectBattleStatus)),
    filter(([_, status]) => status === 'victory'),
    map(() => {
      return PlayerActions.gainXP({ amount: 50 });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}