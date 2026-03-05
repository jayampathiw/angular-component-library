import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

const GAP_MAP: Record<GridGap, string> = {
  none: '0',
  xs: 'var(--ui-space-1)',
  sm: 'var(--ui-space-2)',
  md: 'var(--ui-space-4)',
  lg: 'var(--ui-space-6)',
  xl: 'var(--ui-space-8)',
};

@Component({
  selector: 'ui-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-grid',
    '[style.--grid-columns]': 'columns()',
    '[style.--grid-gap]': 'gapValue()',
    '[style.align-items]': 'align()',
  },
  template: `<ng-content />`,
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  /** Number of columns in the grid */
  readonly columns = input<GridColumns>(3);

  /** Gap between grid items */
  readonly gap = input<GridGap>('md');

  /** Vertical alignment of grid items */
  readonly align = input<GridAlign>('stretch');

  protected readonly gapValue = computed(() => GAP_MAP[this.gap()]);
}
