import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Layout/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Spacing around the divider',
      table: { defaultValue: { summary: 'md' } },
    },
    dashed: {
      control: 'boolean',
      description: 'Use a dashed line',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = {
  args: { orientation: 'horizontal', spacing: 'md', dashed: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="font-family: var(--ui-font-sans);">
        <p style="color: var(--ui-color-on-surface);">Content above the divider</p>
        <ui-divider [orientation]="orientation" [spacing]="spacing" [dashed]="dashed" />
        <p style="color: var(--ui-color-on-surface);">Content below the divider</p>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', spacing: 'md', dashed: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; height: 40px; font-family: var(--ui-font-sans); color: var(--ui-color-on-surface);">
        <span>Left</span>
        <ui-divider [orientation]="orientation" [spacing]="spacing" [dashed]="dashed" />
        <span>Right</span>
      </div>
    `,
  }),
};

export const Dashed: Story = {
  args: { orientation: 'horizontal', spacing: 'md', dashed: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="font-family: var(--ui-font-sans);">
        <p style="color: var(--ui-color-on-surface);">Content above</p>
        <ui-divider [orientation]="orientation" [spacing]="spacing" [dashed]="dashed" />
        <p style="color: var(--ui-color-on-surface);">Content below</p>
      </div>
    `,
  }),
};

export const SpacingVariants: Story = {
  render: () => ({
    template: `
      <div style="font-family: var(--ui-font-sans); color: var(--ui-color-on-surface-variant); font-size: var(--ui-text-sm);">
        <p>spacing="none"</p>
        <ui-divider spacing="none" />
        <p>spacing="sm"</p>
        <ui-divider spacing="sm" />
        <p>spacing="md" (default)</p>
        <ui-divider spacing="md" />
        <p>spacing="lg"</p>
        <ui-divider spacing="lg" />
        <p>End</p>
      </div>
    `,
  }),
};
