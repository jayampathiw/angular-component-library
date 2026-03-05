import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ContainerComponent,
  GridComponent,
  CardComponent,
  DividerComponent,
  BreadcrumbsComponent,
  BreadcrumbItem,
  TabsComponent,
  TabComponent,
  StepperComponent,
  StepItem,
  DataTableComponent,
  ColumnDef,
  BadgeComponent,
  AvatarComponent,
  SkeletonComponent,
  StatCardComponent,
  EmptyStateComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  TextareaComponent,
  ModalComponent,
  ConfirmDialogComponent,
  ProgressBarComponent,
} from '@showcase/ui';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'demo-components',
  standalone: true,
  imports: [
    ContainerComponent,
    GridComponent,
    CardComponent,
    DividerComponent,
    BreadcrumbsComponent,
    TabsComponent,
    TabComponent,
    StepperComponent,
    DataTableComponent,
    BadgeComponent,
    AvatarComponent,
    SkeletonComponent,
    StatCardComponent,
    EmptyStateComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ModalComponent,
    ConfirmDialogComponent,
    ProgressBarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss',
})
export class ComponentsComponent {
  private readonly toastService = inject(ToastService);

  readonly showModal = signal(false);
  readonly showConfirm = signal(false);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Catalog' },
  ];

  readonly stepperSteps: StepItem[] = [
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review', optional: true },
    { label: 'Complete' },
  ];

  readonly tableColumns: ColumnDef[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status' },
  ];

  readonly tableData = [
    { name: 'Container', type: 'Layout', status: 'Stable' },
    { name: 'Grid', type: 'Layout', status: 'Stable' },
    { name: 'Card', type: 'Layout', status: 'Stable' },
    { name: 'Badge', type: 'Data Display', status: 'Stable' },
    { name: 'Avatar', type: 'Data Display', status: 'Stable' },
    { name: 'Modal', type: 'Feedback', status: 'Stable' },
  ];

  readonly selectOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ];

  showToast(variant: 'info' | 'success' | 'warning' | 'error'): void {
    this.toastService.show(`This is a ${variant} toast message`, variant);
  }
}
