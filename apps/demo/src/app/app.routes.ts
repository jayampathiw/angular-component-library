import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./pages/team/team.component').then(m => m.TeamComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        m => m.ProjectsComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(
        m => m.SettingsComponent
      ),
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./pages/components/components.component').then(
        m => m.ComponentsComponent
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
