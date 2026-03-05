import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-divider',
    '[class]': 'hostClasses()',
    '[attr.role]': '"separator"',
    '[attr.aria-orientation]': 'orientation()',
  },
  template: ``,
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  /** Direction of the divider */
  readonly orientation = input<DividerOrientation>('horizontal');

  /** Spacing around the divider */
  readonly spacing = input<DividerSpacing>('md');

  /** Whether to use a dashed line */
  readonly dashed = input(false);

  protected readonly hostClasses = computed(() => {
    const classes = [
      `ui-divider--${this.orientation()}`,
      `ui-divider--spacing-${this.spacing()}`,
    ];
    if (this.dashed()) classes.push('ui-divider--dashed');
    return classes.join(' ');
  });
}
