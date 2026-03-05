import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ContainerComponent,
  CardComponent,
  TabsComponent,
  TabComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  TextareaComponent,
  DividerComponent,
} from '@showcase/ui';
import { ToastService } from '../../shared/services/toast.service';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'demo-settings',
  standalone: true,
  imports: [
    ContainerComponent,
    CardComponent,
    TabsComponent,
    TabComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    DividerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private readonly toast = inject(ToastService);
  readonly theme = inject(ThemeService);

  readonly name = signal('Admin User');
  readonly email = signal('admin@acme.io');
  readonly bio = signal('Passionate about building great products and leading high-performing teams.');
  readonly timezone = signal('utc-0');
  readonly language = signal('en');

  readonly timezones: SelectOption[] = [
    { value: 'utc-8', label: 'Pacific Time (UTC-8)' },
    { value: 'utc-5', label: 'Eastern Time (UTC-5)' },
    { value: 'utc-0', label: 'UTC' },
    { value: 'utc+1', label: 'Central European (UTC+1)' },
    { value: 'utc+5.5', label: 'India Standard (UTC+5:30)' },
    { value: 'utc+8', label: 'Singapore (UTC+8)' },
    { value: 'utc+9', label: 'Japan (UTC+9)' },
  ];

  readonly languages: SelectOption[] = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' },
  ];

  readonly notificationOptions: SelectOption[] = [
    { value: 'all', label: 'All notifications' },
    { value: 'important', label: 'Important only' },
    { value: 'none', label: 'None' },
  ];

  saveProfile(): void {
    this.toast.show('Profile updated successfully', 'success');
  }

  savePreferences(): void {
    this.toast.show('Preferences saved', 'success');
  }

  saveNotifications(): void {
    this.toast.show('Notification settings updated', 'info');
  }
}
