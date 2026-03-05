import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
  computed,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-tabs',
  },
  template: `
    <div class="ui-tabs__header" role="tablist" [attr.aria-label]="ariaLabel()">
      @for (tab of tabs(); track tab.label(); let i = $index) {
        <button
          class="ui-tabs__tab"
          role="tab"
          type="button"
          [class.ui-tabs__tab--active]="i === activeIndex()"
          [attr.aria-selected]="i === activeIndex()"
          [attr.aria-controls]="'tabpanel-' + i"
          [attr.tabindex]="i === activeIndex() ? 0 : -1"
          [disabled]="tab.disabled()"
          (click)="selectTab(i)"
          (keydown)="onKeydown($event)"
        >
          {{ tab.label() }}
        </button>
      }
      <div
        class="ui-tabs__indicator"
        [style.width.%]="indicatorWidth()"
        [style.left.%]="indicatorLeft()"
      ></div>
    </div>
    @if (activeTab(); as active) {
      <div
        class="ui-tabs__panel"
        role="tabpanel"
        [attr.id]="'tabpanel-' + activeIndex()"
        [attr.aria-labelledby]="'tab-' + activeIndex()"
        tabindex="0"
      >
        <ng-container [ngTemplateOutlet]="active.contentTemplate()" />
      </div>
    }
  `,
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  /** The index of the active tab */
  readonly activeIndex = model(0);

  /** Accessible label for the tab list */
  readonly ariaLabel = input('Tabs');

  /** Projected tab components */
  readonly tabs = contentChildren(TabComponent);

  protected readonly activeTab = computed(() => {
    const allTabs = this.tabs();
    const idx = this.activeIndex();
    return allTabs[idx] ?? allTabs[0];
  });

  protected readonly indicatorWidth = computed(() => {
    const count = this.tabs().length;
    return count > 0 ? 100 / count : 0;
  });

  protected readonly indicatorLeft = computed(() => {
    const count = this.tabs().length;
    const idx = this.activeIndex();
    return count > 0 ? (idx * 100) / count : 0;
  });

  selectTab(index: number): void {
    const tab = this.tabs()[index];
    if (tab && !tab.disabled()) {
      this.activeIndex.set(index);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const allTabs = this.tabs();
    const current = this.activeIndex();
    let next = current;

    switch (event.key) {
      case 'ArrowRight':
        next = (current + 1) % allTabs.length;
        while (allTabs[next]?.disabled() && next !== current) {
          next = (next + 1) % allTabs.length;
        }
        break;
      case 'ArrowLeft':
        next = (current - 1 + allTabs.length) % allTabs.length;
        while (allTabs[next]?.disabled() && next !== current) {
          next = (next - 1 + allTabs.length) % allTabs.length;
        }
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = allTabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectTab(next);
    const buttons = (event.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  }
}
