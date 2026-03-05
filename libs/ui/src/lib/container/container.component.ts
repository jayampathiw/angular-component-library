import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'ui-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
  template: `<ng-content />`,
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  /** Maximum width of the container */
  readonly size = input<ContainerSize>('lg');

  /** Whether to add horizontal padding */
  readonly padded = input(true);

  /** Whether to center the container horizontally */
  readonly centered = input(true);

  protected readonly hostClasses = computed(() => {
    const classes = [`ui-container--${this.size()}`];
    if (this.padded()) classes.push('ui-container--padded');
    if (this.centered()) classes.push('ui-container--centered');
    return classes.join(' ');
  });
}
