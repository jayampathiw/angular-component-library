import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'demo-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly theme = inject(ThemeService);
  readonly collapsed = model(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: '\u25A6' },
    { label: 'Team', path: '/team', icon: '\u263B' },
    { label: 'Projects', path: '/projects', icon: '\u2630' },
    { label: 'Settings', path: '/settings', icon: '\u2699' },
    { label: 'Components', path: '/components', icon: '\u29C9' },
  ];

  toggle(): void {
    this.collapsed.update(v => !v);
  }
}
