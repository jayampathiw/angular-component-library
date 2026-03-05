import { Meta, StoryObj } from '@storybook/angular';
import { EmptyStateComponent } from './empty-state.component';

const meta: Meta<EmptyStateComponent> = {
  title: 'Data Display/Empty State',
  component: EmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<EmptyStateComponent>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Try adjusting your search or filter to find what you are looking for.',
    icon: '?',
    actionLabel: 'Clear Filters',
  },
};

export const NoData: Story = {
  args: {
    title: 'No data yet',
    description: 'Start by creating your first item.',
    actionLabel: 'Create Item',
  },
};

export const Small: Story = {
  args: {
    title: 'Empty list',
    description: 'No entries to display.',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    title: 'Welcome to your dashboard',
    description: 'It looks like you have not set up any widgets yet. Add your first widget to get started.',
    actionLabel: 'Add Widget',
    size: 'lg',
  },
};
