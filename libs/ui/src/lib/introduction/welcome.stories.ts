import type { Meta, StoryObj } from '@storybook/angular';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-welcome',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="welcome">
      <h1>@showcase/ui</h1>
      <p class="subtitle">Angular Component Library</p>

      <div class="info-grid">
        <div class="info-card">
          <span class="label">Framework</span>
          <span class="value">Angular 21</span>
        </div>
        <div class="info-card">
          <span class="label">Components</span>
          <span class="value">20 planned</span>
        </div>
        <div class="info-card">
          <span class="label">Theming</span>
          <span class="value">Light / Dark</span>
        </div>
        <div class="info-card">
          <span class="label">Accessibility</span>
          <span class="value">WCAG 2.1 AA</span>
        </div>
      </div>

      <h2>Design Tokens</h2>
      <div class="color-grid">
        <div class="swatch" style="background: var(--ui-color-primary)">
          <span>Primary</span>
        </div>
        <div class="swatch" style="background: var(--ui-color-secondary)">
          <span>Secondary</span>
        </div>
        <div class="swatch" style="background: var(--ui-color-success)">
          <span>Success</span>
        </div>
        <div class="swatch" style="background: var(--ui-color-warning)">
          <span>Warning</span>
        </div>
        <div class="swatch" style="background: var(--ui-color-error)">
          <span>Error</span>
        </div>
        <div class="swatch" style="background: var(--ui-color-info)">
          <span>Info</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome {
      max-width: 720px;
      font-family: var(--ui-font-sans);
    }

    h1 {
      font-size: var(--ui-text-4xl);
      font-weight: var(--ui-font-bold);
      color: var(--ui-color-primary);
      margin: 0 0 4px;
    }

    h2 {
      font-size: var(--ui-text-xl);
      font-weight: var(--ui-font-semibold);
      color: var(--ui-color-on-surface);
      margin: 32px 0 16px;
    }

    .subtitle {
      font-size: var(--ui-text-lg);
      color: var(--ui-color-on-surface-variant);
      margin: 0 0 24px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 12px;
    }

    .info-card {
      padding: 16px;
      border-radius: var(--ui-radius-lg);
      background: var(--ui-color-surface-container);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .label {
      font-size: var(--ui-text-xs);
      font-weight: var(--ui-font-medium);
      color: var(--ui-color-on-surface-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: var(--ui-text-base);
      font-weight: var(--ui-font-semibold);
      color: var(--ui-color-on-surface);
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 8px;
    }

    .swatch {
      height: 64px;
      border-radius: var(--ui-radius-md);
      display: flex;
      align-items: flex-end;
      padding: 8px;
    }

    .swatch span {
      font-size: var(--ui-text-xs);
      font-weight: var(--ui-font-medium);
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
  `],
})
class WelcomeComponent {}

const meta: Meta<WelcomeComponent> = {
  title: 'Introduction/Welcome',
  component: WelcomeComponent,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<WelcomeComponent>;

export const Default: Story = {};
