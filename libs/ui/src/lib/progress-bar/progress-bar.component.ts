import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-progress-bar',
    '[class]': 'hostClasses()',
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.aria-valuemin]': 'indeterminate() ? null : 0',
    '[attr.aria-valuemax]': 'indeterminate() ? null : max()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    <div class="ui-progress-bar__track">
      <div
        class="ui-progress-bar__fill"
        [class.ui-progress-bar__fill--indeterminate]="indeterminate()"
        [style.width.%]="indeterminate() ? null : percentage()"
      ></div>
    </div>
    @if (showLabel()) {
      <span class="ui-progress-bar__label">{{ percentage() }}%</span>
    }
  `,
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  /** Current value */
  readonly value = input(0);

  /** Maximum value */
  readonly max = input(100);

  /** Visual variant */
  readonly variant = input<ProgressBarVariant>('primary');

  /** Size */
  readonly size = input<ProgressBarSize>('md');

  /** Indeterminate mode (animated, no specific value) */
  readonly indeterminate = input(false);

  /** Whether to show percentage label */
  readonly showLabel = input(false);

  /** Accessible label */
  readonly ariaLabel = input('Progress');

  protected readonly percentage = computed(() => {
    const max = this.max();
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((this.value() / max) * 100)));
  });

  protected readonly hostClasses = computed(
    () => `ui-progress-bar--${this.variant()} ui-progress-bar--${this.size()}`
  );
}
