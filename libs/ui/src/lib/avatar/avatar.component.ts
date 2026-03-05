import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-avatar',
    '[class]': 'hostClasses()',
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    @if (src() && !imgError()) {
      <img
        class="ui-avatar__image"
        [src]="src()"
        [alt]="alt() || name()"
        (error)="onImageError()"
      />
    } @else {
      <span class="ui-avatar__initials">{{ initials() }}</span>
    }
  `,
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  /** Image source URL */
  readonly src = input<string>('');

  /** Alt text for the image */
  readonly alt = input<string>('');

  /** Full name (used for initials fallback) */
  readonly name = input('');

  /** Size of the avatar */
  readonly size = input<AvatarSize>('md');

  protected readonly imgError = signal(false);

  protected readonly initials = computed(() => {
    const n = this.name();
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  protected readonly ariaLabel = computed(() =>
    this.alt() || this.name() || 'Avatar'
  );

  protected readonly hostClasses = computed(() => `ui-avatar--${this.size()}`);

  protected onImageError(): void {
    this.imgError.set(true);
  }
}
