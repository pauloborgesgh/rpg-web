import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerActions } from '../../store/player';
import { WorldActions } from '../../store/world';
import { INITIAL_ATTRIBUTES, Attributes } from '../../models';

@Component({
  selector: 'app-character-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-game text-primary mb-2">
          CRIAÇÃO DE PERSONAGEM
        </h1>
        <p class="text-gray-400 font-game text-xs">
          Defina seus atributos iniciais
        </p>
      </div>

      <div class="card-game p-8 max-w-2xl w-full">
        <div class="mb-6">
          <label class="block text-gray-300 font-game text-xs mb-2">NOME</label>
          <input 
            type="text"
            [(ngModel)]="playerName"
            placeholder="Digite seu nome..."
            class="w-full bg-gray-700 border-2 border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div class="text-center">
            <label class="block text-red-400 font-game text-xs mb-2">STR</label>
            <span class="text-2xl text-white block mb-2">{{ attributes.str }}</span>
            <div class="flex gap-1 justify-center">
              <button (click)="adjustAttribute('str', -1)" class="btn-game text-xs px-2 py-1">-</button>
              <button (click)="adjustAttribute('str', 1)" class="btn-game text-xs px-2 py-1">+</button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Força</p>
          </div>

          <div class="text-center">
            <label class="block text-green-400 font-game text-xs mb-2">DEX</label>
            <span class="text-2xl text-white block mb-2">{{ attributes.dex }}</span>
            <div class="flex gap-1 justify-center">
              <button (click)="adjustAttribute('dex', -1)" class="btn-game text-xs px-2 py-1">-</button>
              <button (click)="adjustAttribute('dex', 1)" class="btn-game text-xs px-2 py-1">+</button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Destreza</p>
          </div>

          <div class="text-center">
            <label class="block text-blue-400 font-game text-xs mb-2">INT</label>
            <span class="text-2xl text-white block mb-2">{{ attributes.int }}</span>
            <div class="flex gap-1 justify-center">
              <button (click)="adjustAttribute('int', -1)" class="btn-game text-xs px-2 py-1">-</button>
              <button (click)="adjustAttribute('int', 1)" class="btn-game text-xs px-2 py-1">+</button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Inteligência</p>
          </div>

          <div class="text-center">
            <label class="block text-yellow-400 font-game text-xs mb-2">VIT</label>
            <span class="text-2xl text-white block mb-2">{{ attributes.vit }}</span>
            <div class="flex gap-1 justify-center">
              <button (click)="adjustAttribute('vit', -1)" class="btn-game text-xs px-2 py-1">-</button>
              <button (click)="adjustAttribute('vit', 1)" class="btn-game text-xs px-2 py-1">+</button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Vitalidade</p>
          </div>

          <div class="text-center">
            <label class="block text-purple-400 font-game text-xs mb-2">LCK</label>
            <span class="text-2xl text-white block mb-2">{{ attributes.lck }}</span>
            <div class="flex gap-1 justify-center">
              <button (click)="adjustAttribute('lck', -1)" class="btn-game text-xs px-2 py-1">-</button>
              <button (click)="adjustAttribute('lck', 1)" class="btn-game text-xs px-2 py-1">+</button>
            </div>
            <p class="text-gray-500 text-xs mt-2">Sorte</p>
          </div>
        </div>

        <div class="mb-6 text-center">
          <p class="text-gray-400 font-game text-xs">
            Pontos restantes: <span class="text-primary">{{ remainingPoints }}</span>
          </p>
        </div>

        <div class="flex gap-4 justify-center">
          <button 
            (click)="createCharacter()"
            [disabled]="!canCreate()"
            class="btn-game text-lg px-6 py-3"
          >
            CRIAR
          </button>
          
          <button 
            (click)="resetAttributes()"
            class="btn-game px-6 py-3"
          >
            RESETAR
          </button>
        </div>
      </div>
    </div>
  `
})
export class CharacterCreateComponent {
  playerName = '';
  attributes: Attributes = { ...INITIAL_ATTRIBUTES };
  basePoints = 25;

  get remainingPoints(): number {
    const used = Object.values(this.attributes).reduce((a, b) => a + b, 0);
    return this.basePoints - used;
  }

  canCreate(): boolean {
    return this.playerName.trim().length >= 3 && this.remainingPoints === 0;
  }

  adjustAttribute(attr: keyof Attributes, amount: number) {
    const newValue = this.attributes[attr] + amount;
    const used = this.remainingPoints;
    
    if (amount > 0 && used <= 0) return;
    if (newValue < 1) return;
    if (newValue > 20) return;
    
    this.attributes = { ...this.attributes, [attr]: newValue };
  }

  resetAttributes() {
    this.attributes = { ...INITIAL_ATTRIBUTES };
  }

  createCharacter() {
    if (!this.canCreate()) return;
    
    this.store.dispatch(PlayerActions.createPlayer({ 
      name: this.playerName, 
      attributes: this.attributes 
    }));
    
    this.store.dispatch(WorldActions.initializeWorld());
    this.router.navigate(['/game']);
  }

  constructor(private store: Store, private router: Router) {}
}