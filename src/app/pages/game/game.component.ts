import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { 
  selectPlayer, 
  selectPlayerHealth, 
  selectPlayerMana, 
  selectPlayerCorruption,
  selectPlayerXP,
  selectPlayerLevel,
  selectPlayerSkills,
  selectPlayerAttributes,
  selectSkillPoints,
  selectIsPlayerDead,
  selectPlayerGold,
  PlayerActions
} from '../../store/player';
import { 
  selectWorldLevel, 
  selectRegions, 
  selectActiveEvents 
} from '../../store/world';
import { 
  selectBattleStatus, 
  selectEnemy, 
  selectBattleLogs,
  selectIsPlayerTurn,
  selectTurn,
  BattleActions 
} from '../../store/battle';
import { 
  selectShopItems, 
  selectIsShopOpen,
  ShopActions 
} from '../../store/shop';
import { WorldActions } from '../../store/world';
import { Player, Enemy, Region, WorldEvent, Skill, Attributes, Item, ElementType } from '../../models';
import { BattleLog } from '../../store/battle';
import { ShopItem } from '../../store/shop';
import { AVAILABLE_SKILLS, SkillData, getSkillsByLevel } from '../../data/skills.data';
import { AdsComponent, AdsBottomComponent } from '../../components/ads/ads.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, AdsComponent, AdsBottomComponent],
  template: `
    <div class="min-h-screen bg-gray-900 flex flex-col">
      <!-- Propaganda Topo -->
      <app-ads position="top"></app-ads>
      
      <!-- Header com stats -->
      <header class="bg-gray-800 border-b border-gray-700 p-4">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 class="text-primary font-game text-sm">
                {{ (player$ | async)?.name || 'Aventureiro' }}
                <span class="text-gray-400"> - Nv. {{ (level$ | async) || 1 }}</span>
              </h1>
              <p class="text-gray-500 text-xs">Mundo Nv. {{ (worldLevel$ | async) || 1 }}</p>
            </div>
            
            <!-- Gold -->
            <div class="flex items-center gap-2 text-yellow-400">
              <span class="text-lg">🪙</span>
              <span class="font-game text-sm">{{ gold$ | async }}</span>
            </div>
            
            <!-- HP Bar -->
            <div class="flex-1 min-w-[200px] max-w-md">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-red-400">HP</span>
                <span class="text-white">{{ (health$ | async)?.current }}/{{ (health$ | async)?.max }}</span>
              </div>
              <div class="stats-bar">
                <div 
                  class="stats-bar-fill bg-red-500"
                  [style.width.%]="getHealthPercent()"
                ></div>
              </div>
            </div>

            <!-- Mana Bar -->
            <div class="flex-1 min-w-[200px] max-w-md">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-blue-400">MP</span>
                <span class="text-white">{{ (mana$ | async)?.current }}/{{ (mana$ | async)?.max }}</span>
              </div>
              <div class="stats-bar">
                <div 
                  class="stats-bar-fill bg-blue-500"
                  [style.width.%]="getManaPercent()"
                ></div>
              </div>
            </div>

            <!-- Corruption -->
            <div class="min-w-[150px]">
              <div class="flex justify-between text-xs mb-1">
                <span class="text-purple-400">C</span>
                <span class="text-white">{{ (corruption$ | async) || 0 }}%</span>
              </div>
              <div class="stats-bar">
                <div 
                  class="stats-bar-fill"
                  [class.bg-green-500]="(corruption$ | async)! < 33"
                  [class.bg-yellow-500]="(corruption$ | async)! >= 33 && (corruption$ | async)! < 66"
                  [class.bg-red-500]="(corruption$ | async)! >= 66"
                  [style.width.%]="(corruption$ | async) || 0"
                ></div>
              </div>
            </div>
          </div>

          <!-- XP Bar -->
          <div class="mt-3">
            <div class="flex justify-between text-xs">
              <span class="text-yellow-400">XP</span>
              <span class="text-gray-400">{{ (xp$ | async)?.current }}/{{ (xp$ | async)?.required }}</span>
            </div>
            <div class="stats-bar">
              <div 
                class="stats-bar-fill bg-yellow-500"
                [style.width.%]="getXPPercent()"
              ></div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 flex">
        <!-- Sidebar - Regions -->
        <aside class="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
          <h2 class="text-gray-400 font-game text-xs mb-4">REGIÕES</h2>
          <div class="space-y-2">
            @for (region of regions$ | async; track region.id) {
              <div 
                class="card-game p-3 cursor-pointer hover:border-primary transition-colors"
                (click)="selectRegion(region)"
              >
                <div class="flex justify-between items-center">
                  <span class="text-white text-xs">{{ region.name }}</span>
                  <span 
                    class="text-xs px-2 py-0.5 rounded"
                    [class.bg-red-900]="region.conqueredBy"
                    [class.bg-green-900]="!region.conqueredBy"
                  >
                    {{ region.conqueredBy ? '👑' : '🗡️' }}
                  </span>
                </div>
                <p class="text-gray-500 text-xs mt-1">Dificuldade: {{ region.difficulty }}</p>
              </div>
            }
          </div>

          <!-- Atributos -->
          <h2 class="text-gray-400 font-game text-xs mb-4 mt-8">ATRIBUTOS</h2>
          @if (attributes$ | async; as attrs) {
            <div class="space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-red-400">STR</span>
                <span class="text-white">{{ attrs.str }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-green-400">DEX</span>
                <span class="text-white">{{ attrs.dex }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-blue-400">INT</span>
                <span class="text-white">{{ attrs.int }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-yellow-400">VIT</span>
                <span class="text-white">{{ attrs.vit }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-purple-400">LCK</span>
                <span class="text-white">{{ attrs.lck }}</span>
              </div>
            </div>
          }

          <!-- Skill Points -->
          @if ((skillPoints$ | async)! > 0) {
            <div class="mt-4 p-3 bg-primary/20 rounded border border-primary">
              <p class="text-primary text-xs">Pontos de habilidade: {{ skillPoints$ | async }}</p>
            </div>
          }
        </aside>

        <!-- Game Area -->
        <div class="flex-1 p-4 overflow-auto">
          <!-- Battle Area -->
          @if (battleStatus$ | async; as status) {
            @if (status === 'in_progress') {
              <div class="card-game mb-4">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-game text-red-400">
                    ⚔️ BATALHA
                  </h2>
                  <span class="text-gray-400 text-sm">
                    Turno: {{ turn$ | async }}
                  </span>
                </div>

                <!-- Enemy -->
                @if (enemy$ | async; as enemy) {
                  <div class="flex justify-center mb-6">
                    <div class="text-center">
                      <div class="w-32 h-32 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span class="text-4xl">{{ enemy.isBoss ? '👹' : enemy.isElite ? '💀' : '👾' }}</span>
                      </div>
                      <h3 class="text-white font-game text-sm">{{ enemy.name }}</h3>
                      <p class="text-gray-400 text-xs">Nv. {{ enemy.level }}</p>
                      
                      <div class="mt-2 w-48 mx-auto">
                        <div class="flex justify-between text-xs text-red-400">
                          <span>HP</span>
                          <span>{{ enemy.health }}/{{ enemy.maxHealth }}</span>
                        </div>
                        <div class="stats-bar">
                          <div 
                            class="stats-bar-fill bg-red-500"
                            [style.width.%]="(enemy.health / enemy.maxHealth) * 100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                }

                <!-- Battle Logs -->
                <div class="bg-gray-900 p-3 rounded h-48 overflow-auto mb-4">
                  @for (log of battleLogs$ | async; track log.id) {
                    <p 
                      class="text-xs mb-1"
                      [class.text-red-400]="log.type === 'enemy_attack'"
                      [class.text-green-400]="log.type === 'player_attack' || log.type === 'heal'"
                      [class.text-blue-400]="log.type === 'skill'"
                      [class.text-yellow-400]="log.type === 'damage'"
                      [class.text-gray-500]="log.type === 'system'"
                    >
                      {{ log.message }}
                    </p>
                  }
                </div>

                <!-- Actions -->
                @if (isPlayerTurn$ | async) {
                  <div class="flex gap-2 flex-wrap">
                    <button (click)="playerAttack()" class="btn-game">
                      ⚔️ ATACAR
                    </button>
                    <button (click)="useSkill()" class="btn-game bg-blue-600 hover:bg-blue-700">
                      ✨ HABILIDADE
                    </button>
                    <button (click)="flee()" class="btn-game bg-gray-600 hover:bg-gray-700">
                      🏃 FUGIR
                    </button>
                  </div>
                } @else {
                  <p class="text-yellow-400 text-center text-sm animate-pulse">
                    Turno do inimigo...
                  </p>
                }
              </div>
            }

            <!-- Victory -->
            @if (status === 'victory') {
              <div class="card-game mb-4 border-yellow-500 bg-yellow-900/20">
                <h2 class="text-2xl font-game text-yellow-400 text-center mb-4">
                  🎉 VITÓRIA!
                </h2>
                <p class="text-gray-300 text-center text-sm mb-4">
                  Você derrotou o inimigo!
                </p>
                <div class="flex justify-center gap-4">
                  <button (click)="endBattle()" class="btn-game bg-green-600 hover:bg-green-700">
                    CONTINUAR
                  </button>
                </div>
              </div>
            }
          }

          <!-- Shop Modal -->
          @if (isShopOpen$ | async) {
            <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div class="card-game max-w-3xl w-full max-h-[80vh] overflow-auto">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-game text-yellow-400">🏪 LOJA</h2>
                  <button (click)="closeShop()" class="btn-game bg-red-600">✕</button>
                </div>
                
                <p class="text-gray-400 text-xs mb-4">Compre itens com ouro</p>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  @for (item of shopItems$ | async; track item.id) {
                    <div class="bg-gray-900 p-3 rounded border"
                         [class.border-yellow-600]="item.rarity === 'legendary'"
                         [class.border-purple-600]="item.rarity === 'epic'"
                         [class.border-blue-600]="item.rarity === 'rare'"
                         [class.border-green-600]="item.rarity === 'uncommon'"
                         [class.border-gray-600]="item.rarity === 'common'">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">{{ item.icon || '📦' }}</span>
                        <div>
                          <p class="text-white text-xs">{{ item.name }}</p>
                          <p class="text-gray-500 text-xs">{{ item.type }} - Nv.{{ item.levelRequired }}</p>
                        </div>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-yellow-400 text-xs">🪙 {{ item.value }}</span>
                        <span class="text-gray-500 text-xs">x{{ item.quantity }}</span>
                      </div>
                      <button 
                        (click)="buyItem(item)"
                        [disabled]="(gold$ | async)! < item.value"
                        class="btn-game w-full mt-2 text-xs"
                      >
                        COMPRAR
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- Skills Shop Modal -->
          @if (isSkillsOpen) {
            <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div class="card-game max-w-3xl w-full max-h-[80vh] overflow-auto">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-game text-purple-400">✨ LOJA DE HABILIDADES</h2>
                  <button (click)="closeSkills()" class="btn-game bg-red-600">✕</button>
                </div>
                
                <p class="text-gray-400 text-xs mb-4">Desbloqueie habilidades com pontos de habilidade</p>
                <p class="text-gray-500 text-xs mb-4">Pontos disponíveis: {{ skillPoints$ | async }}</p>
                
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  @for (skill of getAvailableSkills(); track skill.id) {
                    <div class="bg-gray-900 p-3 rounded border"
                         [class.border-purple-600]="skill.levelRequired > 7"
                         [class.border-blue-600]="skill.levelRequired > 3 && skill.levelRequired <= 7"
                         [class.border-green-600]="skill.levelRequired <= 3">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">{{ skill.icon }}</span>
                        <div>
                          <p class="text-white text-xs">{{ skill.name }}</p>
                          <p class="text-gray-500 text-xs">{{ skill.element }} - Nv.{{ skill.levelRequired }}</p>
                        </div>
                      </div>
                      <p class="text-gray-400 text-xs mb-2">💥 {{ skill.power }} | 💧 {{ skill.manaCost }}</p>
                      <button 
                        (click)="unlockSkill(skill)"
                        [disabled]="(skillPoints$ | async)! < 1"
                        class="btn-game w-full mt-2 text-xs"
                      >
                        DESBLOQUEAR
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- World Events -->
          @if (activeEvents$ | async; as events) {
            @if (events.length > 0) {
              <div class="card-game mb-4 border-yellow-500">
                <h2 class="text-yellow-400 font-game text-sm mb-3">⚡ EVENTOS DO MUNDO</h2>
                @for (event of events; track event.id) {
                  <div class="bg-gray-900 p-2 rounded mb-2">
                    <p class="text-white text-xs">{{ event.description }}</p>
                  </div>
                }
              </div>
            }
          }

          <!-- No Battle - Main Menu -->
          @if ((battleStatus$ | async) !== 'in_progress' && (battleStatus$ | async) !== 'victory') {
            <div class="text-center py-12">
              <h2 class="text-2xl font-game text-gray-400 mb-8">
                🗺️ ESCOLHA UMA AÇÃO
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <button 
                  (click)="startRandomBattle()"
                  class="card-game p-6 hover:border-red-500 transition-colors cursor-pointer"
                >
                  <div class="text-4xl mb-3">⚔️</div>
                  <h3 class="text-white font-game text-sm mb-2">BATALHAR</h3>
                  <p class="text-gray-500 text-xs">Encontre inimigos</p>
                </button>

                <button 
                  (click)="openShop()"
                  class="card-game p-6 hover:border-yellow-500 transition-colors cursor-pointer"
                >
                  <div class="text-4xl mb-3">🏪</div>
                  <h3 class="text-white font-game text-sm mb-2">LOJA</h3>
                  <p class="text-gray-500 text-xs">Compre itens</p>
                </button>

                <button class="card-game p-6 hover:border-blue-500 transition-colors cursor-pointer">
                  <div class="text-4xl mb-3">🎒</div>
                  <h3 class="text-white font-game text-sm mb-2">INVENTÁRIO</h3>
                  <p class="text-gray-500 text-xs">Gerencie itens</p>
                </button>

                <button (click)="openSkills()" class="card-game p-6 hover:border-purple-500 transition-colors cursor-pointer">
                  <div class="text-4xl mb-3">✨</div>
                  <h3 class="text-white font-game text-sm mb-2">HABILIDADES</h3>
                  <p class="text-gray-500 text-xs">Desbloqueie habilidades</p>
                </button>
              </div>

              <!-- Propaganda Meio -->
              <div class="my-4">
                <app-ads position="middle"></app-ads>
              </div>

              <!-- Skills List -->
              <div class="mt-8 max-w-2xl mx-auto">
                <h3 class="text-gray-400 font-game text-sm mb-4">SUAS HABILIDADES</h3>
                @if (skills$ | async; as skills) {
                  @if (skills.length > 0) {
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      @for (skill of skills; track skill.id) {
                        <div class="bg-gray-800 p-2 rounded text-xs flex items-center gap-2">
                          <span class="text-xl">{{ skill.icon || '✨' }}</span>
                          <div>
                            <span class="text-white">{{ skill.name }}</span>
                            <span class="text-gray-500 block text-[10px]">{{ skill.element }}</span>
                          </div>
                        </div>
                      }
                    </div>
                  } @else {
                    <p class="text-gray-500 text-sm">Nenhuma habilidade ainda. Use a loja de habilidades!</p>
                  }
                }
              </div>
            </div>
          }
        </div>
      
      <!-- Propaganda Rodapé -->
      <app-ads-bottom></app-ads-bottom>
      </main>
    </div>
  `
})
export class GameComponent implements OnInit {
  player$: Observable<Player | null>;
  level$: Observable<number>;
  health$: Observable<{ current: number; max: number }>;
  mana$: Observable<{ current: number; max: number }>;
  corruption$: Observable<number>;
  xp$: Observable<{ current: number; required: number }>;
  attributes$: Observable<Attributes>;
  skills$: Observable<Skill[]>;
  skillPoints$: Observable<number>;
  gold$: Observable<number>;
  worldLevel$: Observable<number>;
  regions$: Observable<Region[]>;
  activeEvents$: Observable<WorldEvent[]>;
  battleStatus$: Observable<string>;
  enemy$: Observable<Enemy | null>;
  battleLogs$: Observable<BattleLog[]>;
  isPlayerTurn$: Observable<boolean>;
  turn$: Observable<number>;
  isDead$: Observable<boolean>;
  shopItems$: Observable<ShopItem[]>;
  isShopOpen$: Observable<boolean>;
  isSkillsOpen = false;
  private playerLevelValue = 1;

  private healthData: { current: number; max: number } = { current: 0, max: 0 };
  private manaData: { current: number; max: number } = { current: 0, max: 0 };
  private xpData: { current: number; required: number } = { current: 0, required: 0 };
  private battleStatusValue = 'idle';
  private enemyValue: Enemy | null = null;
  private isPlayerTurnValue = true;

  constructor(private store: Store) {
    this.player$ = this.store.select(selectPlayer);
    this.level$ = this.store.select(selectPlayerLevel);
    this.health$ = this.store.select(selectPlayerHealth);
    this.mana$ = this.store.select(selectPlayerMana);
    this.corruption$ = this.store.select(selectPlayerCorruption);
    this.xp$ = this.store.select(selectPlayerXP);
    this.attributes$ = this.store.select(selectPlayerAttributes);
    this.skills$ = this.store.select(selectPlayerSkills);
    this.skillPoints$ = this.store.select(selectSkillPoints);
    this.gold$ = this.store.select(selectPlayerGold);
    this.worldLevel$ = this.store.select(selectWorldLevel);
    this.regions$ = this.store.select(selectRegions);
    this.activeEvents$ = this.store.select(selectActiveEvents);
    this.battleStatus$ = this.store.select(selectBattleStatus);
    this.enemy$ = this.store.select(selectEnemy);
    this.battleLogs$ = this.store.select(selectBattleLogs);
    this.isPlayerTurn$ = this.store.select(selectIsPlayerTurn);
    this.turn$ = this.store.select(selectTurn);
    this.isDead$ = this.store.select(selectIsPlayerDead);
    this.shopItems$ = this.store.select(selectShopItems);
    this.isShopOpen$ = this.store.select(selectIsShopOpen);
  }

  ngOnInit() {
    this.health$.subscribe(h => {
      this.healthData = h;
    });
    this.mana$.subscribe(m => {
      this.manaData = m;
    });
    this.xp$.subscribe(x => this.xpData = x);
    
    this.battleStatus$.subscribe(s => {
      this.battleStatusValue = s;
      if (s === 'victory') {
        this.handleVictory();
      }
    });
    this.enemy$.subscribe(e => this.enemyValue = e);
    this.isPlayerTurn$.subscribe(t => {
      if (this.battleStatusValue === 'in_progress' && !t && this.isPlayerTurnValue) {
        this.onEnemyAttack();
      }
      this.isPlayerTurnValue = t;
    });
    this.level$.subscribe(l => this.playerLevelValue = l);
  }

  handleVictory() {
    setTimeout(() => {
      if (this.enemyValue && this.battleStatusValue === 'victory') {
        const goldReward = Math.floor(this.enemyValue.xpReward * 0.3);
        const xpReward = Math.floor(this.enemyValue.xpReward * 0.5);
        
        this.store.dispatch(PlayerActions.addGold({ amount: goldReward }));
        this.store.dispatch(PlayerActions.gainXP({ amount: xpReward }));
        
        const droppedItems = this.calculateDrops();
        if (droppedItems.length > 0) {
          this.store.dispatch(PlayerActions.addToInventory({ itemId: droppedItems[0] }));
        }
        
        this.store.dispatch(PlayerActions.heal({ amount: Math.floor(this.healthData.max * 0.3) }));
        this.store.dispatch(BattleActions.endBattle());
      }
    }, 1000);
  }

  getAvailableSkills(): SkillData[] {
    return getSkillsByLevel(this.playerLevelValue);
  }

  openSkills() {
    this.isSkillsOpen = true;
  }

  closeSkills() {
    this.isSkillsOpen = false;
  }

  unlockSkill(skillData: SkillData) {
    const skill: Skill = {
      id: crypto.randomUUID(),
      name: skillData.name,
      description: skillData.description,
      element: skillData.element,
      power: skillData.power,
      manaCost: skillData.manaCost,
      isCustom: skillData.isCustom,
      combinationElements: skillData.combinationElements,
      efficiency: 100,
      cooldown: 0,
      icon: skillData.icon,
      levelRequired: skillData.levelRequired
    };
    
    this.store.dispatch(PlayerActions.learnSkill({ skill }));
  }

  getHealthPercent(): number {
    return this.healthData.max > 0 ? (this.healthData.current / this.healthData.max) * 100 : 0;
  }

  getManaPercent(): number {
    return this.manaData.max > 0 ? (this.manaData.current / this.manaData.max) * 100 : 0;
  }

  getXPPercent(): number {
    return this.xpData.required > 0 ? (this.xpData.current / this.xpData.required) * 100 : 0;
  }

  selectRegion(region: Region) {
    console.log('Selected region:', region);
  }

  startRandomBattle() {
    const enemy: Enemy = {
      id: crypto.randomUUID(),
      name: this.getRandomEnemyName(),
      level: Math.floor(Math.random() * 5) + 1,
      health: 50 + Math.floor(Math.random() * 50),
      maxHealth: 50 + Math.floor(Math.random() * 50),
      attack: 10 + Math.floor(Math.random() * 10),
      defense: 5 + Math.floor(Math.random() * 5),
      xpReward: 20 + Math.floor(Math.random() * 30),
      lootTable: [],
      skills: [],
      isElite: Math.random() > 0.8,
      isBoss: false,
      region: 'forest'
    };
    enemy.health = enemy.maxHealth;
    this.store.dispatch(BattleActions.startBattle({ enemy }));
  }

  getRandomEnemyName(): string {
    const names = ['Goblin', 'Orc', 'Esqueleto', 'Morcego', 'Aranha', 'Slime', 'Lobo Sombrio'];
    return names[Math.floor(Math.random() * names.length)];
  }

  playerAttack() {
    this.store.dispatch(BattleActions.playerAttack());
    
    setTimeout(() => {
      if (this.enemyValue && this.enemyValue.health > 0) {
        const damage = Math.floor(Math.random() * 15) + 5;
        this.store.dispatch(PlayerActions.takeDamage({ amount: damage }));
        this.store.dispatch(BattleActions.enemyAttack());
      }
    }, 1000);
  }

  onEnemyAttack() {
    const damage = Math.floor(Math.random() * 15) + 5;
    this.store.dispatch(PlayerActions.takeDamage({ amount: damage }));
    this.store.dispatch(BattleActions.enemyAttack());
  }

  useSkill() {
    this.store.dispatch(PlayerActions.useMana({ amount: 15 }));
    this.store.dispatch(BattleActions.useSkill({ skillId: 'fireball' }));
  }

  flee() {
    this.store.dispatch(BattleActions.flee());
  }

  endBattle() {
    if (this.enemyValue) {
      const goldReward = Math.floor(this.enemyValue.xpReward * 0.3);
      const xpReward = Math.floor(this.enemyValue.xpReward * 0.5);
      
      const droppedItems = this.calculateDrops();
      
      this.store.dispatch(PlayerActions.addLoot({ 
        items: droppedItems, 
        gold: goldReward, 
        xp: xpReward 
      }));
      
      this.store.dispatch(BattleActions.addBattleLog({
        log: {
          id: crypto.randomUUID(),
          message: droppedItems.length > 0 ? `🎁 Item Dropado: ${this.getItemName(droppedItems[0])}!` : '',
          type: 'system',
          timestamp: Date.now()
        }
      }));
      
      this.store.dispatch(PlayerActions.heal({ amount: Math.floor(this.healthData.max * 0.3) }));
    }
    this.store.dispatch(BattleActions.endBattle());
  }

  calculateDrops(): string[] {
    const drops: string[] = [];
    const roll = Math.random();
    const playerLvl = this.playerLevelValue;
    
    if (roll > 0.7) {
      const possibleDrops = [
        { id: 'sword_basic', name: 'Espada de Ferro', type: 'weapon', level: 1 },
        { id: 'shield_wood', name: 'Escudo de Madeira', type: 'armor', level: 1 },
        { id: 'ring_copper', name: 'Anel de Cobre', type: 'accessory', level: 1 },
        { id: 'sword_steel', name: 'Espada de Aço', type: 'weapon', level: 3 },
        { id: 'armor_leather', name: 'Armadura de Couro', type: 'armor', level: 3 },
        { id: 'ring_silver', name: 'Anel de Prata', type: 'accessory', level: 5 },
        { id: 'sword_flame', name: 'Espada Flamejante', type: 'weapon', level: 5 },
      ];
      
      const availableDrops = possibleDrops.filter(d => d.level <= playerLvl + 2);
      const dropRoll = Math.floor(Math.random() * availableDrops.length);
      const item = availableDrops[dropRoll];
      drops.push(item.id);
    }
    
    return drops;
  }

  getItemName(itemId: string): string {
    const names: Record<string, string> = {
      'sword_basic': 'Espada de Ferro',
      'shield_wood': 'Escudo de Madeira',
      'ring_copper': 'Anel de Cobre',
      'sword_steel': 'Espada de Aço',
      'armor_leather': 'Armadura de Couro',
      'ring_silver': 'Anel de Prata',
      'sword_flame': 'Espada Flamejante'
    };
    return names[itemId] || itemId;
  }

  openShop() {
    this.store.dispatch(ShopActions.openShop());
  }

  closeShop() {
    this.store.dispatch(ShopActions.closeShop());
  }

  buyItem(item: ShopItem) {
    this.store.dispatch(PlayerActions.spendGold({ amount: item.value }));
    this.store.dispatch(PlayerActions.addToInventory({ itemId: item.id }));
    this.store.dispatch(ShopActions.buyItem({ item }));
  }
}