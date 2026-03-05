import type { Meta, StoryObj } from '@storybook/angular';
import { ContainerComponent } from './container.component';

const meta: Meta<ContainerComponent> = {
  title: 'Layout/Container',
  component: ContainerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width of the container',
      table: { defaultValue: { summary: 'lg' } },
    },
    padded: {
      control: 'boolean',
      description: 'Whether to add horizontal padding',
      table: { defaultValue: { summary: 'true' } },
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the container',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-container [size]="size" [padded]="padded" [centered]="centered">
        <div style="
          padding: var(--ui-space-6);
          background: var(--ui-color-surface-container);
          border-radius: var(--ui-radius-lg);
          border: 1px dashed var(--ui-color-border-variant);
          text-align: center;
          color: var(--ui-color-on-surface-variant);
          font-family: var(--ui-font-sans);
        ">
          Container — size: <strong>{{ size }}</strong>
        </div>
      </ui-container>
    `,
  }),
};

export default meta;

type Story = StoryObj<ContainerComponent>;

export const Default: Story = {
  args: { size: 'lg', padded: true, centered: true },
};

export const Small: Story = {
  args: { size: 'sm', padded: true, centered: true },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', padded: true, centered: true },
};

export const FullWidth: Story = {
  args: { size: 'full', padded: false, centered: false },
};
