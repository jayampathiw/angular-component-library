import { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Data Display/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ui-badge [variant]="variant" [size]="size">Default</ui-badge>`,
  }),
  args: { variant: 'neutral', size: 'md' },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center">
        <ui-badge variant="neutral">Neutral</ui-badge>
        <ui-badge variant="info">Info</ui-badge>
        <ui-badge variant="success">Success</ui-badge>
        <ui-badge variant="warning">Warning</ui-badge>
        <ui-badge variant="error">Error</ui-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center">
        <ui-badge size="sm" variant="info">Small</ui-badge>
        <ui-badge size="md" variant="info">Medium</ui-badge>
        <ui-badge size="lg" variant="info">Large</ui-badge>
      </div>
    `,
  }),
};

export const Removable: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <ui-badge variant="info" [removable]="true">Angular</ui-badge>
        <ui-badge variant="success" [removable]="true">TypeScript</ui-badge>
        <ui-badge variant="warning" [removable]="true">RxJS</ui-badge>
      </div>
    `,
  }),
};
