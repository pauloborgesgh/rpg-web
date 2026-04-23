import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Player } from '../models';

const STORAGE_KEY = 'rpg_player';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  savePlayer(player: Player): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    }
  }

  loadPlayer(): Player | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        try {
          return JSON.parse(data);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  clearPlayer(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  hasPlayer(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(STORAGE_KEY);
    }
    return false;
  }
}