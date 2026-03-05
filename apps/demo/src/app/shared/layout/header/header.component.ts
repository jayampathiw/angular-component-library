import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
  AvatarComponent,
} from '@showcase/ui';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'demo-header',
  standalone: true,
  imports: [BreadcrumbsComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly theme = inject(ThemeService);
  readonly menuToggled = output<void>();

  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  readonly breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const url = this.currentUrl();
    const segments = url.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: 'Home' }];
    segments.forEach(seg => {
      items.push({ label: seg.charAt(0).toUpperCase() + seg.slice(1) });
    });
    return items;
  });
}
