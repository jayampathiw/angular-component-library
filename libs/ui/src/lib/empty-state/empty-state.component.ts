import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-empty-state',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (icon()) {
      <div class="ui-empty-state__icon" aria-hidden="true">{{ icon() }}</div>
    }
    <h3 class="ui-empty-state__title">{{ title() }}</h3>
    @if (description()) {
      <p class="ui-empty-state__description">{{ description() }}</p>
    }
    @if (actionLabel()) {
      <button
        class="ui-empty-state__action"
        type="button"
        (click)="action.emit()"
      >
        {{ actionLabel() }}
      </button>
    }
    <ng-content />
  `,
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  /** Title text */
  readonly title = input.required<string>();

  /** Description text */
  readonly description = input('');

  /** Icon character or emoji */
  readonly icon = input('');

  /** Action button label */
  readonly actionLabel = input('');

  /** Size variant */
  readonly size = input<EmptyStateSize>('md');

  /** Emitted when the action button is clicked */
  readonly action = output<void>();

  protected readonly hostClasses = computed(() => `ui-empty-state--${this.size()}`);
}
