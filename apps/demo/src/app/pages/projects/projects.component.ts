import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ContainerComponent,
  GridComponent,
  CardComponent,
  ProgressBarComponent,
  BadgeComponent,
  StepperComponent,
  StepItem,
  AvatarComponent,
  DividerComponent,
} from '@showcase/ui';
import { PROJECTS } from '../../shared/data/mock-data';

@Component({
  selector: 'demo-projects',
  standalone: true,
  imports: [
    ContainerComponent,
    GridComponent,
    CardComponent,
    ProgressBarComponent,
    BadgeComponent,
    StepperComponent,
    AvatarComponent,
    DividerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects = PROJECTS;

  readonly workflowSteps: StepItem[] = [
    { label: 'Planning', description: 'Define scope and requirements' },
    { label: 'Design', description: 'Create wireframes and prototypes' },
    { label: 'Development', description: 'Build and implement features' },
    { label: 'Review', description: 'QA testing and code review' },
    { label: 'Launch', description: 'Deploy to production' },
  ];

  statusVariant(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'review': return 'warning';
      default: return 'neutral';
    }
  }

  statusToStep(status: string): number {
    switch (status) {
      case 'planning': return 0;
      case 'in-progress': return 2;
      case 'review': return 3;
      case 'completed': return 5;
      default: return 0;
    }
  }

  progressVariant(progress: number): 'primary' | 'success' | 'warning' {
    if (progress === 100) return 'success';
    if (progress >= 75) return 'primary';
    return 'warning';
  }
}
