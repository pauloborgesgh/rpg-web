import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { StorageService } from '../../services/storage.service';
import { PlayerActions } from '../../store/player';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-game text-primary mb-4 animate-pulse">
          RPG EVOLUÇÃO VIVA
        </h1>
        <p class="text-gray-400 font-game text-sm md:text-base max-w-xl mx-auto">
          Um mundo que evolui com você. Inimigos que aprendem. Poder que cobra seu preço.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-12">
        <div class="card-game p-6 hover:border-primary transition-colors">
          <h3 class="text-primary font-game text-sm mb-3">🌍 MUNDO VIVO</h3>
          <p class="text-gray-400 text-xs">
            O mundo continua evoluindo mesmo quando você está offline. 
            Cidades são destruídas, facções entram em guerra.
          </p>
        </div>

        <div class="card-game p-6 hover:border-primary transition-colors">
          <h3 class="text-primary font-game text-sm mb-3">🧠 IA ADAPTATIVA</h3>
          <p class="text-gray-400 text-xs">
            Bosses aprendem seus padrões e se adaptam ao seu estilo de combate.
          </p>
        </div>

        <div class="card-game p-6 hover:border-primary transition-colors">
          <h3 class="text-primary font-game text-sm mb-3">⚔️ HABILIDADES ÚNICAS</h3>
          <p class="text-gray-400 text-xs">
            Crie suas próprias habilidades combinando elementos. 
            Fogo + Vento = Tornado de Fogo!
          </p>
        </div>

        <div class="card-game p-6 hover:border-primary transition-colors">
          <h3 class="text-primary font-game text-sm mb-3">💀 CORRUPÇÃO</h3>
          <p class="text-gray-400 text-xs">
            Poder extremo tem seu custo. Use habilidades raras com moderação.
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <button 
          (click)="startGame()"
          class="btn-game text-lg px-8 py-4 bg-green-600 hover:bg-green-700"
        >
          NOVO JOGO
        </button>
        
        <button 
          (click)="continueGame()"
          [disabled]="!storage.hasPlayer()"
          class="btn-game text-lg px-8 py-4 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CONTINUAR
        </button>
      </div>

      <div class="mt-16 text-gray-500 text-xs font-game text-center">
        <p>v1.0.0 - Projeto Angular RPG</p>
      </div>
    </div>
  `
})
export class HomeComponent {
  private router = inject(Router);
  private store = inject(Store);
  storage = inject(StorageService);

  startGame() {
    this.router.navigate(['/character-create']);
  }

  continueGame() {
    const player = this.storage.loadPlayer();
    if (player) {
      this.store.dispatch(PlayerActions.loadPlayer({ player }));
      this.router.navigate(['/game']);
    }
  }
}