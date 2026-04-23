import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'loot';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private idCounter = 0;

  readonly toasts$ = this.toasts.asReadonly();

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = ++this.idCounter;
    const toast: Toast = { id, message, type, duration };
    
    this.toasts.update(t => [...t, toast]);
    
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  loot(message: string) {
    this.show(message, 'loot', 4000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error', 5000);
  }

  warning(message: string) {
    this.show(message, 'warning', 4000);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}