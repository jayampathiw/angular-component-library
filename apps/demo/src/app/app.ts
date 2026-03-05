import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ToastComponent } from '@showcase/ui';
import { ToastService } from './shared/services/toast.service';
import { inject } from '@angular/core';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly toastService = inject(ToastService);
  readonly sidebarCollapsed = signal(false);

  onMenuToggle(): void {
    this.sidebarCollapsed.update(v => !v);
  }
}
