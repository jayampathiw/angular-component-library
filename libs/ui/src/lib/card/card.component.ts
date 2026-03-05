import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

@Component({
  selector: 'ui-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-card',
    '[class]': 'hostClasses()',
    role: 'region',
  },
  template: `
    <div class="ui-card__header" role="heading" aria-level="3">
      <ng-content select="[card-header]" />
    </div>
    <div class="ui-card__body">
      <ng-content />
    </div>
    <div class="ui-card__footer">
      <ng-content select="[card-footer]" />
    </div>
  `,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  /** Visual style variant */
  readonly variant = input<CardVariant>('elevated');

  /** Whether the card has hover interaction styles */
  readonly interactive = input(false);

  /** Whether to remove default padding */
  readonly noPadding = input(false);

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-card--${this.variant()}`];
    if (this.interactive()) classes.push('ui-card--interactive');
    if (this.noPadding()) classes.push('ui-card--no-padding');
    return classes.join(' ');
  });
}
