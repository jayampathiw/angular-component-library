import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ContainerComponent,
  GridComponent,
  StatCardComponent,
  CardComponent,
  ProgressBarComponent,
  BadgeComponent,
  DividerComponent,
  SkeletonComponent,
  AvatarComponent,
} from '@showcase/ui';
import {
  DASHBOARD_STATS,
  ACTIVITY_ITEMS,
  PROJECTS,
} from '../../shared/data/mock-data';

@Component({
  selector: 'demo-dashboard',
  standalone: true,
  imports: [
    ContainerComponent,
    GridComponent,
    StatCardComponent,
    CardComponent,
    ProgressBarComponent,
    BadgeComponent,
    DividerComponent,
    SkeletonComponent,
    AvatarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly stats = DASHBOARD_STATS;
  readonly activities = ACTIVITY_ITEMS;
  readonly projects = PROJECTS.slice(0, 4);
  readonly showSkeleton = signal(false);

  toggleSkeleton(): void {
    this.showSkeleton.update(v => !v);
  }

  statusVariant(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'review': return 'warning';
      default: return 'neutral';
    }
  }
}
