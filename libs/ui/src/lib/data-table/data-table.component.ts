import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';

export interface ColumnDef<T = Record<string, unknown>> {
  key: string & keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PageEvent {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'ui-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-data-table',
  },
  template: `
    <div class="ui-data-table__wrapper" role="region" [attr.aria-label]="ariaLabel()" tabindex="0">
      <table class="ui-data-table__table" role="table">
        <thead>
          <tr>
            @for (col of columns(); track col.key) {
              <th
                class="ui-data-table__th"
                [class.ui-data-table__th--sortable]="col.sortable"
                [style.width]="col.width ?? 'auto'"
                [style.text-align]="col.align ?? 'left'"
                [attr.aria-sort]="getAriaSortValue(col.key)"
                scope="col"
              >
                @if (col.sortable) {
                  <button
                    class="ui-data-table__sort-btn"
                    type="button"
                    (click)="onSort(col.key)"
                  >
                    {{ col.label }}
                    <span class="ui-data-table__sort-icon" aria-hidden="true">
                      {{ getSortIcon(col.key) }}
                    </span>
                  </button>
                } @else {
                  {{ col.label }}
                }
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of paginatedData(); track $index) {
            <tr
              class="ui-data-table__row"
              [class.ui-data-table__row--striped]="striped() && $index % 2 === 1"
            >
              @for (col of columns(); track col.key) {
                <td
                  class="ui-data-table__td"
                  [style.text-align]="col.align ?? 'left'"
                >
                  {{ getCellValue(row, col.key) }}
                </td>
              }
            </tr>
          } @empty {
            <tr>
              <td class="ui-data-table__empty" [attr.colspan]="columns().length">
                {{ emptyText() }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    @if (paginated() && totalPages() > 1) {
      <div class="ui-data-table__pagination" role="navigation" aria-label="Table pagination">
        <span class="ui-data-table__page-info">
          Page {{ currentPage() }} of {{ totalPages() }}
        </span>
        <div class="ui-data-table__page-controls">
          <button
            class="ui-data-table__page-btn"
            type="button"
            [disabled]="currentPage() <= 1"
            (click)="goToPage(currentPage() - 1)"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          <button
            class="ui-data-table__page-btn"
            type="button"
            [disabled]="currentPage() >= totalPages()"
            (click)="goToPage(currentPage() + 1)"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
        </div>
      </div>
    }
  `,
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Column definitions */
  readonly columns = input.required<ColumnDef<T>[]>();

  /** Table data */
  readonly data = input.required<T[]>();

  /** Current sort state */
  readonly sort = model<SortState | null>(null);

  /** Whether to show pagination */
  readonly paginated = input(false);

  /** Page size */
  readonly pageSize = input(10);

  /** Current page (1-based) */
  readonly currentPage = model(1);

  /** Striped rows */
  readonly striped = input(true);

  /** Text shown when no data */
  readonly emptyText = input('No data available');

  /** Accessible label */
  readonly ariaLabel = input('Data table');

  /** Emitted when sort changes */
  readonly sortChange = output<SortState>();

  /** Emitted when page changes */
  readonly pageChange = output<PageEvent>();

  protected readonly sortedData = computed(() => {
    const d = [...this.data()];
    const s = this.sort();
    if (!s) return d;

    return d.sort((a, b) => {
      const aVal = a[s.column];
      const bVal = b[s.column];
      const dir = s.direction === 'asc' ? 1 : -1;

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return dir;
      if (bVal == null) return -dir;
      if (aVal < bVal) return -dir;
      if (aVal > bVal) return dir;
      return 0;
    });
  });

  protected readonly totalPages = computed(() => {
    if (!this.paginated()) return 1;
    return Math.ceil(this.data().length / this.pageSize());
  });

  protected readonly paginatedData = computed(() => {
    const sorted = this.sortedData();
    if (!this.paginated()) return sorted;
    const start = (this.currentPage() - 1) * this.pageSize();
    return sorted.slice(start, start + this.pageSize());
  });

  getCellValue(row: T, key: string): unknown {
    return row[key] ?? '';
  }

  getAriaSortValue(key: string): string | null {
    const s = this.sort();
    if (!s || s.column !== key) return null;
    return s.direction === 'asc' ? 'ascending' : 'descending';
  }

  getSortIcon(key: string): string {
    const s = this.sort();
    if (!s || s.column !== key) return '\u2195';
    return s.direction === 'asc' ? '\u2191' : '\u2193';
  }

  onSort(column: string): void {
    const current = this.sort();
    let direction: 'asc' | 'desc' = 'asc';
    if (current?.column === column) {
      direction = current.direction === 'asc' ? 'desc' : 'asc';
    }
    const newSort: SortState = { column, direction };
    this.sort.set(newSort);
    this.sortChange.emit(newSort);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.pageChange.emit({ page, pageSize: this.pageSize() });
  }
}
