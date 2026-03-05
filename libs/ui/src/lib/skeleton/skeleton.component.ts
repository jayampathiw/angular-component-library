import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-skeleton',
    '[class]': 'hostClasses()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[attr.role]': '"status"',
    '[attr.aria-label]': '"Loading"',
  },
  template: ``,
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  /** Shape variant */
  readonly variant = input<SkeletonVariant>('text');

  /** Width (CSS value) */
  readonly width = input('100%');

  /** Height (CSS value) */
  readonly height = input<string | null>(null);

  /** Whether to animate */
  readonly animate = input(true);

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-skeleton--${this.variant()}`];
    if (this.animate()) classes.push('ui-skeleton--animated');
    return classes.join(' ');
  });
}
