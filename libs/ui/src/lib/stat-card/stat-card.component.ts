import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type TrendDirection = 'up' | 'down' | 'neutral';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-stat-card',
  },
  template: `
    <div class="ui-stat-card__header">
      <span class="ui-stat-card__label">{{ label() }}</span>
      @if (icon()) {
        <span class="ui-stat-card__icon" aria-hidden="true">{{ icon() }}</span>
      }
    </div>
    <div class="ui-stat-card__value">{{ value() }}</div>
    @if (trend() !== null) {
      <div class="ui-stat-card__trend" [class]="trendClasses()">
        <span class="ui-stat-card__trend-arrow" aria-hidden="true">{{ trendArrow() }}</span>
        <span class="ui-stat-card__trend-value">{{ trend() }}%</span>
        @if (trendLabel()) {
          <span class="ui-stat-card__trend-label">{{ trendLabel() }}</span>
        }
      </div>
    }
    @if (description()) {
      <div class="ui-stat-card__description">{{ description() }}</div>
    }
  `,
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  /** Label/title for the stat */
  readonly label = input.required<string>();

  /** Main value display */
  readonly value = input.required<string>();

  /** Trend percentage (positive = up, negative = down) */
  readonly trend = input<number | null>(null);

  /** Label for the trend (e.g., "vs last month") */
  readonly trendLabel = input('');

  /** Optional icon character */
  readonly icon = input('');

  /** Optional description text */
  readonly description = input('');

  protected readonly trendDirection = computed<TrendDirection>(() => {
    const t = this.trend();
    if (t === null || t === 0) return 'neutral';
    return t > 0 ? 'up' : 'down';
  });

  protected readonly trendArrow = computed(() => {
    const dir = this.trendDirection();
    if (dir === 'up') return '\u2191';
    if (dir === 'down') return '\u2193';
    return '\u2192';
  });

  protected readonly trendClasses = computed(
    () => `ui-stat-card__trend--${this.trendDirection()}`
  );
}
