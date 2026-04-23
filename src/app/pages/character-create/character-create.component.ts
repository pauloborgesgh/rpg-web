import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerActions } from '../../store/player';
import { WorldActions } from '../../store/world';
import { INITIAL_ATTRIBUTES, Attributes, PlayerClass, CLASS_INFO, CLASS_AVATARS } from '../../models';

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
          Defina seu personagem
        </p>
      </div>

      <div class="card-game p-8 max-w-4xl w-full">
        <!-- Nome -->
        <div class="mb-6">
          <label class="block text-gray-300 font-game text-xs mb-2">NOME</label>
          <input 
            type="text"
            [(ngModel)]="playerName"
            placeholder="Digite seu nome..."
            class="w-full bg-gray-700 border-2 border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <!-- Seleção de Classe -->
        <div class="mb-6">
          <label class="block text-gray-300 font-game text-xs mb-3">CLASSE</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            @for (cls of classes; track cls.id) {
              <button 
                (click)="selectClass(cls.id)"
                class="p-4 rounded-lg border-2 transition-all text-center"
                [class.border-primary]="selectedClass === cls.id"
                [class.border-gray-600]="selectedClass !== cls.id"
                [class.bg-green-900]="selectedClass === cls.id"
                [class.bg-gray-800]="selectedClass !== cls.id"
              >
                <span class="text-3xl block mb-2">{{ cls.icon }}</span>
                <span class="text-white text-sm block">{{ cls.name }}</span>
                <span class="text-gray-500 text-xs block mt-1">{{ cls.description }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Seleção de Avatar -->
        @if (selectedClass) {
          <div class="mb-6">
            <label class="block text-gray-300 font-game text-xs mb-3">AVATAR</label>
            <div class="flex flex-wrap gap-2 justify-center">
              @for (avatar of availableAvatars; track avatar) {
                <button 
                  (click)="selectAvatar(avatar)"
                  class="w-14 h-14 rounded-full border-2 text-2xl flex items-center justify-center transition-all"
                  [class.border-primary]="selectedAvatar === avatar"
                  [class.border-gray-600]="selectedAvatar !== avatar"
                  [class.bg-gray-700]="selectedAvatar === avatar"
                  [class.bg-gray-800]="selectedAvatar !== avatar"
                  [class.hover:border-gray-400]="selectedAvatar !== avatar"
                >
                  {{ avatar }}
                </button>
              }
            </div>
          </div>
        }

        <!-- Atributos com bônus da classe -->
        <div class="mb-6">
          <label class="block text-gray-300 font-game text-xs mb-3">
            ATRIBUTOS
            <span class="text-gray-500 ml-2">({{ attributeBonusText }})</span>
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div class="text-center">
              <label class="block text-red-400 font-game text-xs mb-2">STR</label>
              <span class="text-2xl text-white block mb-2">{{ getAttributeWithBonus('str') }}</span>
              <div class="flex gap-1 justify-center">
                <button (click)="adjustAttribute('str', -1)" class="btn-game text-xs px-2 py-1">-</button>
                <button (click)="adjustAttribute('str', 1)" class="btn-game text-xs px-2 py-1">+</button>
              </div>
              <p class="text-gray-500 text-xs mt-2">Força</p>
            </div>

            <div class="text-center">
              <label class="block text-green-400 font-game text-xs mb-2">DEX</label>
              <span class="text-2xl text-white block mb-2">{{ getAttributeWithBonus('dex') }}</span>
              <div class="flex gap-1 justify-center">
                <button (click)="adjustAttribute('dex', -1)" class="btn-game text-xs px-2 py-1">-</button>
                <button (click)="adjustAttribute('dex', 1)" class="btn-game text-xs px-2 py-1">+</button>
              </div>
              <p class="text-gray-500 text-xs mt-2">Destreza</p>
            </div>

            <div class="text-center">
              <label class="block text-blue-400 font-game text-xs mb-2">INT</label>
              <span class="text-2xl text-white block mb-2">{{ getAttributeWithBonus('int') }}</span>
              <div class="flex gap-1 justify-center">
                <button (click)="adjustAttribute('int', -1)" class="btn-game text-xs px-2 py-1">-</button>
                <button (click)="adjustAttribute('int', 1)" class="btn-game text-xs px-2 py-1">+</button>
              </div>
              <p class="text-gray-500 text-xs mt-2">Inteligência</p>
            </div>

            <div class="text-center">
              <label class="block text-yellow-400 font-game text-xs mb-2">VIT</label>
              <span class="text-2xl text-white block mb-2">{{ getAttributeWithBonus('vit') }}</span>
              <div class="flex gap-1 justify-center">
                <button (click)="adjustAttribute('vit', -1)" class="btn-game text-xs px-2 py-1">-</button>
                <button (click)="adjustAttribute('vit', 1)" class="btn-game text-xs px-2 py-1">+</button>
              </div>
              <p class="text-gray-500 text-xs mt-2">Vitalidade</p>
            </div>

            <div class="text-center">
              <label class="block text-purple-400 font-game text-xs mb-2">LCK</label>
              <span class="text-2xl text-white block mb-2">{{ getAttributeWithBonus('lck') }}</span>
              <div class="flex gap-1 justify-center">
                <button (click)="adjustAttribute('lck', -1)" class="btn-game text-xs px-2 py-1">-</button>
                <button (click)="adjustAttribute('lck', 1)" class="btn-game text-xs px-2 py-1">+</button>
              </div>
              <p class="text-gray-500 text-xs mt-2">Sorte</p>
            </div>
          </div>

          <div class="mt-4 text-center">
            <p class="text-gray-400 font-game text-xs">
              Pontos restantes: <span class="text-primary">{{ remainingPoints }}</span>
            </p>
          </div>
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
  selectedClass: PlayerClass | null = null;
  selectedAvatar: string | null = null;
  attributes: Attributes = { ...INITIAL_ATTRIBUTES };
  basePoints = 25;

  get classes() {
    return [
      { id: 'warrior' as PlayerClass, ...CLASS_INFO.warrior },
      { id: 'mage' as PlayerClass, ...CLASS_INFO.mage },
      { id: 'rogue' as PlayerClass, ...CLASS_INFO.rogue },
      { id: 'ranger' as PlayerClass, ...CLASS_INFO.ranger }
    ];
  }

  get availableAvatars(): string[] {
    if (!this.selectedClass) return [];
    return CLASS_AVATARS[this.selectedClass];
  }

  get attributeBonusText(): string {
    if (!this.selectedClass) return '';
    const bonus = CLASS_INFO[this.selectedClass].bonus;
    const parts: string[] = [];
    if (bonus.str) parts.push(`+${bonus.str} STR`);
    if (bonus.dex) parts.push(`+${bonus.dex} DEX`);
    if (bonus.int) parts.push(`+${bonus.int} INT`);
    if (bonus.vit) parts.push(`+${bonus.vit} VIT`);
    if (bonus.lck) parts.push(`+${bonus.lck} LCK`);
    return `Bônus: ${parts.join(', ')}`;
  }

  get remainingPoints(): number {
    const used = Object.values(this.attributes).reduce((a, b) => a + b, 0);
    return this.basePoints - used;
  }

  canCreate(): boolean {
    return !!(
      this.playerName.trim().length >= 3 && 
      this.remainingPoints === 0 && 
      this.selectedClass && 
      this.selectedAvatar
    );
  }

  selectClass(cls: PlayerClass) {
    this.selectedClass = cls;
    this.selectedAvatar = CLASS_AVATARS[cls][0];
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  getAttributeWithBonus(attr: keyof Attributes): number {
    if (!this.selectedClass) return this.attributes[attr];
    const bonus = CLASS_INFO[this.selectedClass].bonus[attr] || 0;
    return this.attributes[attr] + bonus;
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
    this.selectedClass = null;
    this.selectedAvatar = null;
  }

  createCharacter() {
    if (!this.canCreate() || !this.selectedClass || !this.selectedAvatar) return;
    
    const bonus = CLASS_INFO[this.selectedClass].bonus;
    const finalAttributes: Attributes = {
      str: this.attributes.str + (bonus.str || 0),
      dex: this.attributes.dex + (bonus.dex || 0),
      int: this.attributes.int + (bonus.int || 0),
      vit: this.attributes.vit + (bonus.vit || 0),
      lck: this.attributes.lck + (bonus.lck || 0)
    };
    
    this.store.dispatch(PlayerActions.createPlayer({ 
      name: this.playerName, 
      attributes: finalAttributes,
      playerClass: this.selectedClass,
      avatar: this.selectedAvatar
    }));
    
    this.store.dispatch(WorldActions.initializeWorld());
    this.router.navigate(['/game']);
  }

  constructor(private store: Store, private router: Router) {}
}