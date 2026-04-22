import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game/game.component').then(m => m.GameComponent)
  },
  {
    path: 'character-create',
    loadComponent: () => import('./pages/character-create/character-create.component').then(m => m.CharacterCreateComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];