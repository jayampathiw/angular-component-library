import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ui-tab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
})
export class TabComponent {
  /** Label displayed in the tab header */
  readonly label = input.required<string>();

  /** Whether the tab is disabled */
  readonly disabled = input(false);

  /** Reference to the tab content template */
  readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('content');
}
