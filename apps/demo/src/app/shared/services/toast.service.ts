import { Injectable, signal } from '@angular/core';
import { ToastVariant } from '@showcase/ui';

export interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

let nextToastId = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<ToastItem[]>([]);

  show(message: string, variant: ToastVariant = 'info', duration = 4000): void {
    const id = nextToastId++;
    this.toasts.update(list => [...list, { id, message, variant }]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
