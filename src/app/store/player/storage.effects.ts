import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom, map } from 'rxjs/operators';
import { PlayerActions } from './player.actions';
import { selectPlayer } from './player.selectors';
import { StorageService } from '../../services/storage.service';

@Injectable()
export class StorageEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private storage = inject(StorageService);

  savePlayer$ = createEffect(() => 
    this.actions$.pipe(
      ofType(
        PlayerActions.addToInventory,
        PlayerActions.addGold,
        PlayerActions.gainXP,
        PlayerActions.equipItem,
        PlayerActions.unequipItem,
        PlayerActions.sellItem,
        PlayerActions.heal,
        PlayerActions.takeDamage,
        PlayerActions.distributeAttributePoint,
        PlayerActions.useConsumable,
        PlayerActions.levelUp,
        PlayerActions.updateSkillEfficiency,
        PlayerActions.addCorruption,
        PlayerActions.reduceCorruption,
      ),
      withLatestFrom(this.store.select(selectPlayer)),
      tap(([action, player]) => {
        console.log('[StorageEffects] Saving player:', player?.name);
        if (player) {
          this.storage.savePlayer(player);
        } else {
          console.warn('[StorageEffects] Player is null, cannot save!');
        }
      })
    ),
    { dispatch: false }
  );
}