import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ContainerComponent,
  AvatarComponent,
  BadgeComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  ModalComponent,
  ConfirmDialogComponent,
  EmptyStateComponent,
} from '@showcase/ui';
import { TEAM_MEMBERS, TeamMember } from '../../shared/data/mock-data';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'demo-team',
  standalone: true,
  imports: [
    ContainerComponent,
    AvatarComponent,
    BadgeComponent,
    InputComponent,
    SelectComponent,
    ModalComponent,
    ConfirmDialogComponent,
    EmptyStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  private readonly toast = inject(ToastService);

  readonly searchQuery = signal('');
  readonly departmentFilter = signal('');
  readonly showAddModal = signal(false);
  readonly showDeleteDialog = signal(false);
  readonly selectedMember = signal<TeamMember | null>(null);

  readonly departments: SelectOption[] = [
    { value: '', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Analytics', label: 'Analytics' },
  ];

  readonly filteredMembers = computed(() => {
    let members = [...TEAM_MEMBERS];
    const query = this.searchQuery().toLowerCase();
    const dept = this.departmentFilter();

    if (query) {
      members = members.filter(
        m =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.role.toLowerCase().includes(query)
      );
    }

    if (dept) {
      members = members.filter(m => m.department === dept);
    }

    return members;
  });

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  onAddModalClosed(): void {
    this.toast.show('Add member form closed', 'info');
  }

  confirmDelete(member: TeamMember): void {
    this.selectedMember.set(member);
    this.showDeleteDialog.set(true);
  }

  onDeleteConfirmed(): void {
    const member = this.selectedMember();
    if (member) {
      this.toast.show(`${member.name} removed from team`, 'success');
    }
    this.selectedMember.set(null);
  }

  onDeleteCancelled(): void {
    this.selectedMember.set(null);
  }

  statusVariant(status: string): 'success' | 'warning' | 'neutral' {
    switch (status) {
      case 'active': return 'success';
      case 'away': return 'warning';
      default: return 'neutral';
    }
  }
}
