import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-modal',
    '[class.ui-modal--open]': 'open()',
  },
  template: `
    @if (open()) {
      <div class="ui-modal__backdrop" (click)="onBackdropClick()" (keydown.escape)="onEscape()" role="presentation"></div>
      <div
        class="ui-modal__dialog"
        [class]="dialogClasses()"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-labelledby]="titleId"
        tabindex="-1"
        (keydown.escape)="onEscape()"
      >
        <div class="ui-modal__header">
          <h2 class="ui-modal__title" [id]="titleId">{{ title() }}</h2>
          @if (showClose()) {
            <button
              class="ui-modal__close"
              type="button"
              aria-label="Close dialog"
              (click)="close()"
            >
              &times;
            </button>
          }
        </div>
        @if (subtitle()) {
          <p class="ui-modal__subtitle">{{ subtitle() }}</p>
        }
        <div class="ui-modal__body">
          <ng-content />
        </div>
        <div class="ui-modal__footer">
          <ng-content select="[modal-footer]" />
        </div>
      </div>
    }
  `,
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  private readonly doc = inject(DOCUMENT);
  private readonly el = inject(ElementRef);

  /** Whether the modal is open */
  readonly open = model(false);

  /** Modal title */
  readonly title = input.required<string>();

  /** Optional subtitle */
  readonly subtitle = input('');

  /** Modal size */
  readonly size = input<ModalSize>('md');

  /** Whether to show the close button */
  readonly showClose = input(true);

  /** Whether clicking the backdrop closes the modal */
  readonly closeOnBackdrop = input(true);

  /** Whether pressing Escape closes the modal */
  readonly closeOnEscape = input(true);

  /** Emitted when the modal is closed */
  readonly closed = output<void>();

  readonly titleId = `ui-modal-title-${Math.random().toString(36).slice(2, 8)}`;

  protected readonly dialogClasses = computed(
    () => `ui-modal__dialog--${this.size()}`
  );

  constructor() {
    effect(() => {
      if (this.open()) {
        this.doc.body.style.overflow = 'hidden';
      } else {
        this.doc.body.style.overflow = '';
      }
    });
  }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected onBackdropClick(): void {
    if (this.closeOnBackdrop()) this.close();
  }

  protected onEscape(): void {
    if (this.closeOnEscape()) this.close();
  }
}
