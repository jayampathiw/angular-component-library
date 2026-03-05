import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-badge',
    '[class]': 'hostClasses()',
  },
  template: `
    <span class="ui-badge__content">
      <ng-content />
    </span>
    @if (removable()) {
      <button
        class="ui-badge__remove"
        type="button"
        aria-label="Remove"
        (click)="removed.emit()"
      >
        &times;
      </button>
    }
  `,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  /** Visual variant */
  readonly variant = input<BadgeVariant>('neutral');

  /** Size of the badge */
  readonly size = input<BadgeSize>('md');

  /** Whether the badge shows a remove button */
  readonly removable = input(false);

  /** Emitted when the remove button is clicked */
  readonly removed = output<void>();

  protected readonly hostClasses = computed(() =>
    `ui-badge--${this.variant()} ui-badge--${this.size()}`
  );
}
