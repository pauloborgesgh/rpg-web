import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      @for (toast of toastService.toasts$(); track toast.id) {
        <div 
          class="toast-animate px-4 py-3 rounded-lg shadow-lg border"
          [class.bg-green-900]="toast.type === 'success'"
          [class.border-green-500]="toast.type === 'success'"
          [class.text-green-200]="toast.type === 'success'"
          [class.bg-red-900]="toast.type === 'error'"
          [class.border-red-500]="toast.type === 'error'"
          [class.text-red-200]="toast.type === 'error'"
          [class.bg-blue-900]="toast.type === 'info'"
          [class.border-blue-500]="toast.type === 'info'"
          [class.text-blue-200]="toast.type === 'info'"
          [class.bg-yellow-900]="toast.type === 'warning'"
          [class.border-yellow-500]="toast.type === 'warning'"
          [class.text-yellow-200]="toast.type === 'warning'"
          [class.bg-gradient-to-r]="toast.type === 'loot'"
          [class.from-purple-900]="toast.type === 'loot'"
          [class.to-yellow-900]="toast.type === 'loot'"
          [class.border-yellow-500]="toast.type === 'loot'"
          [class.text-yellow-200]="toast.type === 'loot'"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">
              @switch (toast.type) {
                @case ('success') { ✅ }
                @case ('error') { ❌ }
                @case ('warning') { ⚠️ }
                @case ('loot') { 🎉 }
                @default { ℹ️ }
              }
            </span>
            <span class="text-sm font-medium">{{ toast.message }}</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-animate {
      animation: slideIn 0.3s ease-out;
      min-width: 200px;
      max-width: 320px;
    }
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}