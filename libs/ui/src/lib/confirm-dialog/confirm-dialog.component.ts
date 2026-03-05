import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

export type ConfirmVariant = 'default' | 'danger';

@Component({
  selector: 'ui-confirm-dialog',
  standalone: true,
  imports: [ModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-modal
      [(open)]="open"
      [title]="title()"
      size="sm"
      [closeOnBackdrop]="false"
      (closed)="onCancel()"
    >
      <p class="ui-confirm-dialog__message">{{ message() }}</p>
      <div modal-footer>
        <div class="ui-confirm-dialog__actions">
          <button
            class="ui-confirm-dialog__btn ui-confirm-dialog__btn--cancel"
            type="button"
            (click)="onCancel()"
          >
            {{ cancelLabel() }}
          </button>
          <button
            class="ui-confirm-dialog__btn"
            [class.ui-confirm-dialog__btn--confirm]="variant() === 'default'"
            [class.ui-confirm-dialog__btn--danger]="variant() === 'danger'"
            type="button"
            (click)="onConfirm()"
          >
            {{ confirmLabel() }}
          </button>
        </div>
      </div>
    </ui-modal>
  `,
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  /** Whether the dialog is open */
  readonly open = model(false);

  /** Dialog title */
  readonly title = input.required<string>();

  /** Message to display */
  readonly message = input.required<string>();

  /** Confirm button label */
  readonly confirmLabel = input('Confirm');

  /** Cancel button label */
  readonly cancelLabel = input('Cancel');

  /** Visual variant */
  readonly variant = input<ConfirmVariant>('default');

  /** Emitted when confirmed */
  readonly confirmed = output<void>();

  /** Emitted when cancelled */
  readonly cancelled = output<void>();

  onConfirm(): void {
    this.open.set(false);
    this.confirmed.emit();
  }

  onCancel(): void {
    this.open.set(false);
    this.cancelled.emit();
  }
}
