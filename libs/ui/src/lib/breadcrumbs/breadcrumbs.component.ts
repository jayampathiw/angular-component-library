import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-breadcrumbs',
  },
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ol class="ui-breadcrumbs__list">
        @for (item of visibleItems(); track item.label; let last = $last) {
          <li class="ui-breadcrumbs__item">
            @if (!last && item.href) {
              <a class="ui-breadcrumbs__link" [href]="item.href">{{ item.label }}</a>
            } @else if (!last) {
              <span class="ui-breadcrumbs__text">{{ item.label }}</span>
            } @else {
              <span class="ui-breadcrumbs__current" aria-current="page">{{ item.label }}</span>
            }
            @if (!last) {
              <span class="ui-breadcrumbs__separator" aria-hidden="true">{{ separator() }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  /** Breadcrumb items to display */
  readonly items = input.required<BreadcrumbItem[]>();

  /** Separator character between items */
  readonly separator = input('/');

  /** Accessible label for the navigation landmark */
  readonly ariaLabel = input('Breadcrumb');

  /** Number of visible items (0 = show all) */
  readonly maxItems = input(0);

  protected readonly visibleItems = computed(() => {
    const all = this.items();
    const max = this.maxItems();
    if (max <= 0 || all.length <= max) return all;
    return [all[0], ...all.slice(all.length - (max - 1))];
  });
}
