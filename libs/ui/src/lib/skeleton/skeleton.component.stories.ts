import { Meta, StoryObj } from '@storybook/angular';
import { SkeletonComponent } from './skeleton.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Data Display/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Text: Story = {
  args: { variant: 'text', width: '80%' },
};

export const Circular: Story = {
  args: { variant: 'circular', width: '48px', height: '48px' },
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: '100%', height: '200px' },
};

export const Rounded: Story = {
  args: { variant: 'rounded', width: '100%', height: '120px' },
};

export const CardPlaceholder: Story = {
  render: () => ({
    template: `
      <div style="max-width: 320px; padding: 16px; display: flex; flex-direction: column; gap: 12px; border: 1px solid var(--ui-color-border); border-radius: 8px">
        <div style="display: flex; gap: 12px; align-items: center">
          <ui-skeleton variant="circular" width="40px" height="40px" />
          <div style="flex: 1; display: flex; flex-direction: column; gap: 6px">
            <ui-skeleton variant="text" width="60%" />
            <ui-skeleton variant="text" width="40%" />
          </div>
        </div>
        <ui-skeleton variant="rounded" width="100%" height="160px" />
        <ui-skeleton variant="text" width="100%" />
        <ui-skeleton variant="text" width="70%" />
      </div>
    `,
  }),
};
