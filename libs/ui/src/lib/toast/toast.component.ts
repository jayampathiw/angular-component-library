import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

const TOAST_ICONS: Record<ToastVariant, string> = {
  info: '\u2139',
  success: '\u2713',
  warning: '\u26A0',
  error: '\u2717',
};

@Component({
  selector: 'ui-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-toast',
    '[class]': 'hostClasses()',
    '[class.ui-toast--visible]': 'visible()',
    '[attr.role]': '"alert"',
    '[attr.aria-live]': '"polite"',
  },
  template: `
    <span class="ui-toast__icon" aria-hidden="true">{{ icon() }}</span>
    <div class="ui-toast__content">
      @if (title()) {
        <strong class="ui-toast__title">{{ title() }}</strong>
      }
      <span class="ui-toast__message">{{ message() }}</span>
    </div>
    @if (dismissible()) {
      <button
        class="ui-toast__dismiss"
        type="button"
        aria-label="Dismiss"
        (click)="dismiss()"
      >
        &times;
      </button>
    }
  `,
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  /** Whether the toast is visible */
  readonly visible = model(true);

  /** Toast message */
  readonly message = input.required<string>();

  /** Optional title */
  readonly title = input('');

  /** Visual variant */
  readonly variant = input<ToastVariant>('info');

  /** Whether dismissible */
  readonly dismissible = input(true);

  /** Emitted when dismissed */
  readonly dismissed = output<void>();

  protected readonly icon = computed(() => TOAST_ICONS[this.variant()]);

  protected readonly hostClasses = computed(
    () => `ui-toast--${this.variant()}`
  );

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
