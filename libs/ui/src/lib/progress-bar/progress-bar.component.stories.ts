import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Feedback/Progress Bar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'error'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: { value: 60, showLabel: true },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <ui-progress-bar [value]="75" variant="primary" [showLabel]="true" />
        <ui-progress-bar [value]="100" variant="success" [showLabel]="true" />
        <ui-progress-bar [value]="45" variant="warning" [showLabel]="true" />
        <ui-progress-bar [value]="20" variant="error" [showLabel]="true" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <ui-progress-bar [value]="60" size="sm" />
        <ui-progress-bar [value]="60" size="md" />
        <ui-progress-bar [value]="60" size="lg" />
      </div>
    `,
  }),
};
